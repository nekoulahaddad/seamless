import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { assemblePages } from './build/assemble-pages';
import { renderDiscovery } from './build/render-discovery-files';
import { outputFor } from './build/routes';
import { loadSite } from './build/site-input';
import { cinematicEnv } from './build/cinematic-config';

export default defineConfig(({ mode }) => {
  const root = resolve('.generated');
  const isRelease = mode === 'release';
  const pages = assemblePages(root,isRelease,cinematicEnv(mode));
  const { profile } = loadSite(isRelease);
  const discovery = renderDiscovery(pages,profile.origin,isRelease);
  return {
    root, publicDir: resolve('assets'), appType: 'mpa',
    server: { fs: { allow: [resolve('.')] } },
    build: { outDir: resolve('dist'), emptyOutDir: true, rollupOptions: {
      input: pages.map((page)=>resolve(root,outputFor(page.path))),
    } },
    plugins: [{ name:'seamless-discovery', generateBundle() {
      for (const [fileName,source] of Object.entries(discovery)) this.emitFile({type:'asset',fileName,source});
    } }],
  };
});
