import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require(
  path.join(process.cwd(), "node_modules", "astro", "node_modules", "sharp")
);

const colors = ["#2b2b2b", "#3a3f44", "#463a3a", "#3a4046", "#4a3f36", "#33383d"];
const outDir = path.join(process.cwd(), "src", "assets", "photos", "portrait");
const width = 1200;
const height = 1600;

for (let i = 1; i <= 6; i++) {
  const color = colors[i - 1];
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}" />
      <text x="50%" y="48%" font-family="sans-serif" font-size="64" fill="#e8e8e8"
            text-anchor="middle" dominant-baseline="middle">Placeholder</text>
      <text x="50%" y="55%" font-family="sans-serif" font-size="40" fill="#b8b8b8"
            text-anchor="middle" dominant-baseline="middle">Portrait ${i}</text>
    </svg>
  `;
  const outPath = path.join(outDir, `portrait-${i}.jpg`);
  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(outPath);
  console.log(`wrote ${outPath}`);
}
