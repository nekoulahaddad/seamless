import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { renderMetadata } from '../build/render-metadata';
import { previewAssets } from '../build/preview-assets';
import { cinematicEnv, footerLinks, previewAlias } from '../build/cinematic-config';
import { encodeAlias } from '../build/protected-contact';
import { validateServices } from '../build/service-schema';
import { fixtureProfile } from '../content/site-fixture';
import { homeSeo, socialCard } from '../content/seo';
import { serviceCatalog } from '../content/services/catalog';
import { renderCinematicHome } from '../src/pages/home/render-cinematic-home';

export default defineConfig(({mode})=>{
  const root=fileURLToPath(new URL('../',import.meta.url));
  const env=cinematicEnv(mode);
  const alias=previewAlias(env);
  const head=renderMetadata({id:'home',path:'/',locale:'en',direction:'ltr',sections:[],socialImage:socialCard.path,...homeSeo},fixtureProfile,false);
  return {
    server:{fs:{allow:[root]}},
    plugins:[previewAssets(fileURLToPath(new URL('../assets',import.meta.url))),{
      name:'seamless-cinematic-preview',
      transformIndexHtml:{order:'pre',handler:()=>renderCinematicHome({
        head,entry:'../src/features/cinematic/main.ts',encodedAlias:alias?encodeAlias(alias):undefined,
        disclosure:'',services:validateServices(serviceCatalog),footer:footerLinks(env,false),
      })},
    }],
  };
});
