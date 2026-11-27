import { sceneIds } from './asset-manifest';

type SceneId=(typeof sceneIds)[number];
const photoRights='ImageGen artwork prepared for the approved cinematic prototype';
const svgRights='Original browser-rendered path and stage artwork';

const treatments={
  hero:['hero','Introduce the advisory journey','Open and close the pharmaceutical vial'],
  about:['about','Bridge the pharmaceutical story into advisory services','Reveal the capsule and scanning light'],
  expertise:['expertise','Present the six service areas','Advance through the service sequence'],
  understand:['approach','Review the portfolio','Illuminate Understand'],
  evaluate:['approach','Select target markets','Illuminate Evaluate'],
  prepare:['approach','Prepare for registration','Illuminate Prepare'],
  connect:['approach','Identify potential partners','Illuminate Connect'],
  facilitate:['approach','Support entry activity','Illuminate Facilitate'],
  markets:['markets','Distinguish target markets and network locations','Connect the static photograph to the continuous path'],
  finale:['contact','Return to the opening vial and invite contact','Close the story with the gold path and illuminated horizon'],
} as const satisfies Record<SceneId,readonly [string,string,string]>;

const timeline={desktop:'inline:timeline',mobile:'inline:timeline',width:1200,height:600,rights:svgRights};
const artwork:Partial<Record<SceneId,typeof timeline>>={
  hero:{desktop:'/art/hero.webp',mobile:'/art/hero-mobile.webp',width:1672,height:941,rights:photoRights},
  about:{desktop:'/art/expert.webp',mobile:'/art/expert-mobile.webp',width:1672,height:941,rights:photoRights},
  expertise:{...timeline,desktop:'inline:expertise',mobile:'inline:expertise'},
  markets:{desktop:'/art/regional-wide.webp',mobile:'/art/regional-compact.webp',width:3840,height:1860,
    rights:'Natural Earth geographic data and NASA Blue Marble terrain and Black Marble night imagery'},
  finale:{desktop:'/art/contact.webp',mobile:'/art/contact-mobile.webp',width:1440,height:810,rights:photoRights},
};

export function sceneRecords(isApproved:boolean) {
  return sceneIds.map((id,order)=>{
    const [section,goal,cue]=treatments[id];
    return {id,order,section,goal,cue,treatment:'Midnight navy, turquoise light and champagne-gold accents',
      start:'Readable text and responsive artwork',end:'Section text remains visible',
      layers:['Static or inline art','Continuous path'],
      ...(artwork[id]??timeline),
      fallback:'Complete text and unanimated artwork',priority:id==='hero'?'high':'lazy',isApproved};
  });
}
