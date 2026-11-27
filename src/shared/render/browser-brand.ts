const pngSizes=[16,32,48] as const;

export function renderBrowserBrand():string {
  const icons=pngSizes.map((size)=>
    `<link rel="icon" type="image/png" sizes="${size}x${size}" href="/brand/favicon-${size}.png">`).join('');
  return `<meta name="theme-color" content="#061623">
    <link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48" href="/favicon.ico">${icons}
    <link rel="icon" type="image/png" sizes="192x192" href="/brand/icon-192.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png">
    <link rel="manifest" href="/brand/site.webmanifest">`;
}
