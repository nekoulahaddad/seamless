import { expect, it } from 'vitest';
import { validateRoutes } from '../../../build/routes';
import { loadSite } from '../../../build/site-input';

const routes=['/','/privacy/','/terms/'].map((path,index)=>({
  id:String(index),locale:'en',direction:'ltr',path,title:'Title',description:'Text',socialImage:'/a.svg',sections:['main'],
}));
it('rejects duplicate and missing launch routes',()=>{
  expect(validateRoutes(routes)).toHaveLength(3);
  expect(()=>validateRoutes([routes[0],routes[0],routes[2]])).toThrow();
  expect(()=>validateRoutes(routes.slice(1))).toThrow();
});
it('requires private launch inputs',()=>{
  const old=process.env.SEAMLESS_RELEASE_CONFIG;
  delete process.env.SEAMLESS_RELEASE_CONFIG;
  try { expect(()=>loadSite(true)).toThrow('private company-approved'); }
  finally {
    if (old) process.env.SEAMLESS_RELEASE_CONFIG=old;
  }
});
