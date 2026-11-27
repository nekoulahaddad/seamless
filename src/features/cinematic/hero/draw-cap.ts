import { frame, plate, type photoGeometry, type VialPose } from './photo-geometry';

const cap = {left:1096,right:1261,top:284,bottom:356};
const liftDistance=110;
type Projection=ReturnType<typeof photoGeometry>;

export function featherPlate(image:HTMLImageElement):HTMLCanvasElement {
  const mask=document.createElement('canvas');
  mask.width=plate.width;
  mask.height=plate.height;
  const context=mask.getContext('2d');
  if (!context) return mask;
  context.drawImage(image,0,0);
  context.globalCompositeOperation='destination-in';
  for (const edge of [horizontalMask(context),verticalMask(context)]) {
    context.fillStyle=edge;
    context.fillRect(0,0,mask.width,mask.height);
  }
  return mask;
}

function horizontalMask(context:CanvasRenderingContext2D):CanvasGradient {
  const gradient=context.createLinearGradient(0,0,plate.width,0);
  gradient.addColorStop(0,'transparent');
  gradient.addColorStop(.05,'black');
  gradient.addColorStop(.95,'black');
  gradient.addColorStop(1,'transparent');
  return gradient;
}

function verticalMask(context:CanvasRenderingContext2D):CanvasGradient {
  const gradient=context.createLinearGradient(0,0,0,plate.height);
  gradient.addColorStop(0,'transparent');
  gradient.addColorStop(.09,'black');
  gradient.addColorStop(.9,'black');
  gradient.addColorStop(1,'transparent');
  return gradient;
}

function traceCap(context:CanvasRenderingContext2D,y:number):void {
  context.beginPath();
  context.moveTo(1096,y+15);
  context.bezierCurveTo(1096,y-4,1260,y-7,1260,y+17);
  context.lineTo(1261,y+63);
  context.bezierCurveTo(1258,y+77,1095,y+75,1096,y+64);
  context.closePath();
  context.clip();
}

function drawTexture(context:CanvasRenderingContext2D,poster:HTMLImageElement,geometry:Projection,y:number,angle:number):void {
  const width=cap.right-cap.left;
  const height=cap.bottom-cap.top+6;
  const sy=geometry.sourceY(cap.top-3);
  const sw=geometry.sourceX(cap.right)-geometry.sourceX(cap.left);
  const sh=geometry.sourceY(cap.top+height-3)-sy;
  context.drawImage(poster,geometry.sourceX(cap.left),sy,sw,sh,cap.left,y-3,width,height);

  // The rim is rotationally symmetric. Only reflections on the cylindrical band move.
  const beltTop=cap.top+17;
  const beltHeight=34;
  const sourceY=geometry.sourceY(beltTop);
  const sourceHeight=geometry.sourceY(beltTop+beltHeight)-sourceY;
  context.globalAlpha=.32;
  for(let column=0;column<width;column++){
    const plane=(column+.5)/width*2-1;
    const radius=Math.sqrt(1-plane*plane);
    const offset=Math.sin(angle)*radius*(1-Math.abs(plane))*.19;
    const sourceX=geometry.sourceX(cap.left+(plane+offset+1)*width/2-.5);
    context.drawImage(poster,sourceX,sourceY,sw/width,sourceHeight,cap.left+column,y+17,1,beltHeight);
  }
}

export function paintCap(context:CanvasRenderingContext2D,poster:HTMLImageElement,cleanPlate:HTMLCanvasElement,
  geometry:Projection,pose:VialPose):void {
  context.clearRect(0,0,frame.width,frame.height);
  if (pose.turn===0&&pose.lift===0) return;
  const y=cap.top-pose.lift*liftDistance;
  context.save();
  context.translate(-frame.x,-frame.y);
  if (pose.lift>0) context.drawImage(cleanPlate,plate.x,plate.y);
  traceCap(context,y);
  drawTexture(context,poster,geometry,y,pose.turn);
  context.restore();
}
