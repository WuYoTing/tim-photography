import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const localizedText = z.object({
  en: z.string(),
  "zh-TW": z.string(),
});

const photos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/photos" }),
  schema: ({ image }) =>
    z.object({
      title: localizedText,
      slug: z.string(),
      category: z.enum(["travel", "portrait", "art"]),
      image: image(),
      alt: localizedText,
      featured: z.boolean().default(false),
      date: z.coerce.date().optional(),
      caption: localizedText.partial().optional(),
      order: z.number().default(999),
    }),
});

export const collections = { photos };
