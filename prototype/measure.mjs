import { readdir, readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { chromium } from 'playwright';

const url=process.env.SEAMLESS_PROTO_URL??'http://127.0.0.1:4181/';
const profiles=[
  {name:'desktop',viewport:{width:1440,height:900},cpu:1},
  {name:'phone emulation',viewport:{width:390,height:844},cpu:4},
];

async function bundle() {
  const directory=new URL('./dist/assets/',import.meta.url);
  const files=(await readdir(directory)).filter(name=>name.endsWith('.js'));
  const scripts=await Promise.all(files.map(async name=>({name,gzipBytes:gzipSync(await readFile(new URL(name,directory))).length})));
  return {scripts,gzipBytes:scripts.reduce((sum,item)=>sum+item.gzipBytes,0)};
}

function observeMetrics(){
  const values={lcp:0,cls:0,events:[]};
  let first=-Infinity,last=-Infinity,sum=0;
  window.__prototypeMeasures=values;
  new PerformanceObserver(list=>{
    for(const item of list.getEntries()) values.lcp=item.startTime;
  }).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(list=>{
    for(const item of list.getEntries()){
      if(item.hadRecentInput) continue;
      const time=item.startTime;
      if(time-last>1000||time-first>5000){first=time;sum=0;}
      last=time;
      sum+=item.value;
      values.cls=Math.max(values.cls,sum);
    }
  }).observe({type:'layout-shift',buffered:true});
  new PerformanceObserver(list=>{
    for(const item of list.getEntries()) if(item.interactionId) values.events.push({id:item.interactionId,duration:item.duration});
  }).observe({type:'event',buffered:true,durationThreshold:16});
}

async function sample(page) {
  return page.evaluate(async()=>{
    const targets=['hero','about','expertise','approach','markets','why-work-with-us','partners','finale'];
    const frames=[];
    for(const name of targets){
      const item=document.getElementById(name);
      const top=item.getBoundingClientRect().top+scrollY;
      const travel=item.offsetHeight-(item.querySelector('.shot')?.offsetHeight??innerHeight*.3);
      let before=await new Promise(requestAnimationFrame);
      for(let index=0;index<22;index++){
        scrollTo(0,top+Math.max(travel,innerHeight*.3)*index/21);
        const now=await new Promise(requestAnimationFrame);
        if(index>1) frames.push(now-before);
        before=now;
      }
    }
    frames.sort((a,b)=>a-b);
    return {frames:frames.length,p95FrameMs:Math.round(frames[Math.ceil(frames.length*.95)-1]*10)/10};
  });
}

async function interact(page) {
  await page.locator('#market-syria summary').press('Enter');
  await page.locator('#market-yemen summary').click();
  await page.locator('#finale .button').click();
  await page.getByRole('button',{name:'Reveal Email Address'}).press('Enter');
  await page.waitForTimeout(200);
  return page.evaluate(()=>{
    const {lcp,cls,events}=window.__prototypeMeasures;
    const interactions=new Map();
    for(const {id,duration} of events) interactions.set(id,Math.max(duration,interactions.get(id)??0));
    return {lcpMs:Math.round(lcp),cumulativeCls:Math.round(cls*1000)/1000,
      observedInteractions:interactions.size,worstObservedEventMs:interactions.size?Math.max(...interactions.values()):null};
  });
}

async function measure(browser,profile) {
  const phone=profile.cpu>1;
  const page=await browser.newPage({viewport:profile.viewport,isMobile:phone,hasTouch:phone});
  const cdp=await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:profile.cpu});
  await page.addInitScript(observeMetrics);
  try {
    await page.goto(url,{waitUntil:'networkidle'});
    await page.locator('.hero-art[data-vial-ready="true"]').waitFor({state:'attached'});
    const initialLcpMs=await page.evaluate(()=>Math.round(window.__prototypeMeasures.lcp));
    const frames=await sample(page);
    const metrics=await interact(page);
    return {profile,...frames,...metrics,initialLcpMs};
  } finally {
    await page.close();
  }
}

const browser=await chromium.launch();
try{
  const runs=[];
  for(const profile of profiles) runs.push(await measure(browser,profile));
  console.log(JSON.stringify({bundle:await bundle(),runs},null,2));
} finally {
  await browser.close();
}
