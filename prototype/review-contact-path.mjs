import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const origin=process.env.SEAMLESS_PROTO_URL??'http://127.0.0.1:4181/';
const output='.generated/mobile-navigation';
await mkdir(output,{recursive:true});

function intersections(path){
  const svg=path.ownerSVGElement;
  const origin=svg.getBoundingClientRect();
  const protectedNodes=Array.from(document.querySelectorAll('.contact-copy :is(.scene-label,h2,.description,.contact-action,.contact-status)'));
  const boxes=protectedNodes.map(node=>node.getBoundingClientRect());
  const padding=7;
  const length=path.getTotalLength();
  const hits=boxes.map(()=>false);
  for(let distance=0;distance<=length;distance+=2){
    const point=path.getPointAtLength(distance);
    const x=point.x+origin.left;
    const y=point.y+origin.top;
    boxes.forEach((box,index)=>{
      if(x>=box.left-padding&&x<=box.right+padding&&y>=box.top-padding&&y<=box.bottom+padding) hits[index]=true;
    });
  }
  return hits;
}

const browser=await chromium.launch();
try{
  for(const width of [360,390,430,768,1150,1440]){
    const page=await browser.newPage({viewport:{width,height:844}});
    await page.goto(origin);
    const path=page.locator('.path-bed[d]');
    await path.waitFor({state:'attached'});
    await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));
    const hits=await path.evaluate(intersections);
    assert.ok(hits.every(hit=>!hit),`Contact path overlaps content at ${width}px: ${hits}`);
    if([390,1440].includes(width)){
      await page.locator('#contact').screenshot({path:`${output}/contact-${width}.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});
    }
    await page.close();
  }
  console.log('Contact clearance passed at 360, 390, 430, 768, 1150 and 1440 px.');
}finally{
  await browser.close();
}
