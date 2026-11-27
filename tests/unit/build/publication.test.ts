import { expect, it } from 'vitest';
import { publishClaims } from '../../../build/publication';
import { validateGeography } from '../../../build/geography-schema';
import { validateServices } from '../../../build/service-schema';
import { marketCatalog } from '../../../content/markets/catalog';
import { networkLocations } from '../../../content/network/locations';
import { serviceCatalog } from '../../../content/services/catalog';

it('filters unapproved and withdrawn entries without returning private source fields',()=>{
  const claims=[{id:'proof',text:'Reviewable'}, {id:'removed',text:'Old'}];
  const common={scope:'Local review',source:'private',date:'2026-11-27',isApproved:true};
  const approved=publishClaims(claims,[
    {...common,ref:'a',claimId:'proof',status:'published'},
    {...common,ref:'b',claimId:'removed',status:'withdrawn'},
  ]);
  expect(approved).toEqual([{id:'proof',text:'Reviewable'}]);
});
it('rejects invalid market service references',()=>{
  const services=validateServices(serviceCatalog);
  expect(validateGeography(marketCatalog,networkLocations,services).markets).toHaveLength(5);
  const invalid=marketCatalog.map((market)=>({...market,services:['unknown']}));
  expect(()=>validateGeography(invalid,networkLocations,services)).toThrow();
});
