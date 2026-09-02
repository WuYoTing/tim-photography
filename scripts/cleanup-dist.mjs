// Astro's content-collection `image()` helper makes Vite treat each source photo as a
// static asset import, so every build also emits an unmodified, full-resolution copy of
// the original file into dist/_astro alongside the actual optimized variants. No page
// ever links to that raw copy, but it still gets deployed. This script deletes any file
// under dist/_astro that isn't referenced by the built HTML, shrinking the deploy output.
import { readdir, readFile, stat, unlink } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const assetsDir = join(distDir, "_astro");

async function listHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listHtmlFiles(fullPath)));
    } else if (entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = await listHtmlFiles(distDir);
const referenced = new Set();
const assetRefPattern = /_astro\/[^\s"'<>,)]+/g;

for (const file of htmlFiles) {
  const content = await readFile(file, "utf-8");
  for (const match of content.matchAll(assetRefPattern)) {
    referenced.add(match[0].slice("_astro/".length));
  }
}

const assetFiles = await readdir(assetsDir);
let removedCount = 0;
let removedBytes = 0;

for (const fileName of assetFiles) {
  if (referenced.has(fileName)) continue;
  const filePath = join(assetsDir, fileName);
  const { size } = await stat(filePath);
  await unlink(filePath);
  removedCount += 1;
  removedBytes += size;
}

const removedMb = (removedBytes / 1024 / 1024).toFixed(1);
console.log(`[cleanup-dist] removed ${removedCount} unreferenced file(s) from dist/_astro (${removedMb} MB)`);
