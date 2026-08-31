export interface Category {
  slug: string;
  label: {
    en: string;
    "zh-TW": string;
  };
  description: {
    en: string;
    "zh-TW": string;
  };
}

export const categories: Category[] = [
  {
    slug: "travel",
    label: { en: "Travel", "zh-TW": "旅拍" },
    description: {
      en: "Photos from recent trips — people, places, and moments along the way.",
      "zh-TW": "旅途中拍下的作品,收錄遇到的人物、風景與片刻。",
    },
  },
  {
    slug: "portrait",
    label: { en: "Portrait", "zh-TW": "人物" },
    description: {
      en: "Live performers and portraits caught mid-moment on stage and off.",
      "zh-TW": "舞台上與日常間捕捉到的人物與表演者神情。",
    },
  },
  {
    slug: "art",
    label: { en: "Art", "zh-TW": "藝文紀實" },
    description: {
      en: "Gallery visits, exhibitions, and quiet compositions from art spaces.",
      "zh-TW": "美術館、展覽與藝文空間中的觀展片刻與構圖。",
    },
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
