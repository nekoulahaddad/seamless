const capsule='M-20-9h40a9 9 0 010 18h-40a9 9 0 010-18Z';
const twoTone=(fill:string)=>`<path d="${capsule}" fill="url(#orbit-white)"/><path d="M0-9h20a9 9 0 010 18H0Z" fill="url(#${fill})"/>`;

export const orbitalPills=[
  twoTone('orbit-blue'),
  `<path d="${capsule}" fill="url(#orbit-white)"/><path d="M0-8V8" stroke="#a8bdca" stroke-width="1.2"/>`,
  '<circle r="16" fill="url(#orbit-white)"/><path d="M-11 8 10-9" stroke="#9aadb7" stroke-width="1.5"/>',
  '<rect x="-26" y="-12" width="52" height="24" rx="12" fill="url(#orbit-teal)" stroke="#9debee" stroke-width="1"/>',
  '<ellipse rx="21" ry="13" fill="url(#orbit-gel)" stroke="#ffe59b" stroke-width="1.2"/><ellipse cx="-6" cy="-6" rx="9" ry="2" fill="#fff3c2" opacity=".65"/>',
  twoTone('orbit-teal'),
] as const;

export function pillMaterials():string {
  return `<linearGradient id="orbit-white" x2="0" y2="1"><stop stop-color="#fffef6"/><stop offset=".4" stop-color="#edf6f9"/><stop offset="1" stop-color="#7a97ab"/></linearGradient>
  <linearGradient id="orbit-blue" x2="0" y2="1"><stop stop-color="#97e7fa"/><stop offset=".35" stop-color="#0987bd"/><stop offset="1" stop-color="#062f59"/></linearGradient>
  <linearGradient id="orbit-teal" x2="0" y2="1"><stop stop-color="#c4faff"/><stop offset=".4" stop-color="#4cbac4"/><stop offset="1" stop-color="#177582"/></linearGradient>
  <radialGradient id="orbit-gel" cy=".38" r=".67"><stop stop-color="#b97323"/><stop offset=".62" stop-color="#efac34"/><stop offset="1" stop-color="#ffecb3"/></radialGradient>`;
}
