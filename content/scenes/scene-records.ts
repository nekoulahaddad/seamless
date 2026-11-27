import { heroAsset, sceneIds, stageArt } from './asset-manifest';

const treatments = [
  ['hero','Introduce the advisory journey','Advance toward the vial and dome'],
  ['connections','Distinguish target countries and network locations','Reveal the schematic marks'],
  ['expertise','Present the six service areas','Advance through the service sequence'],
  ['approach','Review the portfolio','Focus on the vial through the glass lens'],
  ['approach','Select target markets','Shift the glass reflection before the market view'],
  ['approach','Prepare for registration','Pan across the lens and widen the light field'],
  ['approach','Identify potential partners','Shift the light toward the edges'],
  ['approach','Support entry activity','Open the composition into the wider frame'],
  ['markets','Make all target markets accessible','Highlight the selected country'],
  ['finale','Return to the initial vial and invite contact','Reprise the dome and reflected light'],
] as const;

export function sceneRecords(isApproved: boolean) {
  return sceneIds.map((id,order)=>{
    const [section,goal,cue]=treatments[order] ?? ['hero','Introduce the journey','Camera approach'];
    const isDome=id==='hero'||id==='finale';
    const isMap=section==='connections'||section==='markets';
    const inline=isMap?'inline:map':'inline:expertise';
    const isInline=isMap||section==='expertise';
    const desktop=isDome?heroAsset.desktop:(isInline?inline:stageArt);
    const mobile=isDome?heroAsset.mobile:(isInline?inline:stageArt);
    return {id,order,section,goal,cue,treatment:'Midnight blue and restrained white-blue edge light',
      start:'Centered still and readable copy',end:'Section text remains visible',
      layers:['base still or map','local light and reflection'],
      desktop,mobile,width:isDome?heroAsset.width:1200,height:isDome?heroAsset.height:600,
      rights:isInline?'Original schematic or instrument illustration':heroAsset.rights,
      fallback:'Static still or schematic and the complete scene text',priority:id==='hero'?'high':'lazy',isApproved};
  });
}
