import { describe, expect, it } from 'vitest';
import { verifyAddress } from '../../../build/audit-output';
import { validateDisclosures } from '../../../build/protected-contact';
import { loadSite } from '../../../build/site-input';

const alias='team@seamless.example';
const locations=[{ path:'/terms/', elementId:'legal-contact', count:1 }];
describe('email exposure',()=>{
  it('allows the exact node and disallows a second or hidden occurrence',()=>{
    const args={file:'terms/index.html',alias,locations};
    expect(verifyAddress({...args,content:`<p id="legal-contact">${alias}</p>`})).toBe(true);
    expect(verifyAddress({...args,content:`<p id="legal-contact">${alias}</p><script>${alias}</script>`})).toBe(false);
    expect(verifyAddress({...args,content:`<p id="elsewhere">${alias}</p>`})).toBe(false);
  });
  it('allows no occurrence for an empty allowlist and validates independent approved routes',()=>{
    expect(verifyAddress({file:'index.html',content:'contact',alias,locations:[]})).toBe(true);
    const second={path:'/privacy/',elementId:'contact-two',count:1};
    expect(verifyAddress({file:'privacy/index.html',alias,locations:[...locations,second],content:`<p id="contact-two">${alias}</p>`})).toBe(true);
    expect(validateDisclosures(loadSite(false))).toEqual([]);
  });
});
