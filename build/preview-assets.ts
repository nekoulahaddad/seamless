import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

export function previewAssets(assets:string):Plugin {
  const folders=['brand','art'];
  const paths=['favicon.ico',...folders.flatMap((folder)=>{
    const directory=resolve(assets,folder);
    if(!existsSync(directory)) return [];
    return readdirSync(directory,{withFileTypes:true}).filter((entry)=>entry.isFile()).map(({name})=>folder+'/'+name);
  })];
  return {
    name:'seamless-preview-assets',
    generateBundle() {
      for(const fileName of paths) this.emitFile({type:'asset',fileName,source:readFileSync(resolve(assets,fileName))});
    },
    configureServer(server) {
      server.middlewares.use((request,response,next)=>{
        const path=request.url?.split('?')[0]?.slice(1);
        if(!path||!paths.includes(path)) return next();
        response.setHeader('Content-Type',mediaType(path));
        response.end(readFileSync(resolve(assets,path)));
      });
    },
  };
}

function mediaType(path:string):string {
  if(path.endsWith('.png')) return 'image/png';
  if(path.endsWith('.jpg')) return 'image/jpeg';
  if(path.endsWith('.ico')) return 'image/x-icon';
  if(path.endsWith('.webp')) return 'image/webp';
  return 'application/manifest+json';
}
