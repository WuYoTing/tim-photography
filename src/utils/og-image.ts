import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

export async function getOgImagePath(image: ImageMetadata): Promise<string> {
  const optimized = await getImage({ src: image, width: 1200, format: "jpg" });
  return optimized.src;
}
