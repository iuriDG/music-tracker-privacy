const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const svgContent = `
<svg width="128" height="128" viewBox="0 0 128 128"
     xmlns="http://www.w3.org/2000/svg" fill="none">

  <!-- Background -->
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#312E81"/>
    </linearGradient>

    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#A78BFA"/>
    </linearGradient>
  </defs>

  <rect x="6" y="6" width="116" height="116" rx="26" fill="url(#bg)"/>

  <!-- Sound fingerprint spiral -->
  <path d="
    M64 36
    C48 36 36 48 36 64
    C36 80 48 92 64 92
    C76 92 86 82 86 70
    C86 58 76 50 66 50
    C58 50 52 56 52 64
    C52 72 58 76 62 76
  "
    stroke="url(#accent)"
    stroke-width="4"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"/>

  <!-- Inner audio pulse -->
  <circle cx="64" cy="64" r="6" fill="url(#accent)"/>

  <!-- Time arc -->
  <path d="M64 28 A36 36 0 0 1 100 64"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        opacity="0.7"/>

  <!-- Time hand -->
  <line x1="64" y1="64" x2="64" y2="44"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"/>

</svg>
`;

async function createIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Convert SVG to data URL
  const svgBuffer = Buffer.from(svgContent);
  const img = await loadImage(svgBuffer);

  // Draw the image scaled to the target size
  ctx.drawImage(img, 0, 0, size, size);

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filename, buffer);
  console.log(`Created ${filename}`);
}

// Create all three icon sizes
(async () => {
  await createIcon(16, 'icons/icon16.png');
  await createIcon(48, 'icons/icon48.png');
  await createIcon(128, 'icons/icon128.png');
  console.log('All icons created successfully!');
})();
