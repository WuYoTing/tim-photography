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
    slug: "portrait",
    label: { en: "Portrait", "zh-TW": "人像" },
    description: {
      en: "Portrait sessions, including the Dadaocheng Fireworks slow sync flash series.",
      "zh-TW": "人像作品,包含大稻埕煙火節慢速同步閃燈系列。",
    },
  },
  {
    slug: "event",
    label: { en: "Event", "zh-TW": "活動紀實" },
    description: {
      en: "Event documentation. More coming soon.",
      "zh-TW": "活動紀實,內容陸續更新中。",
    },
  },
  {
    slug: "still",
    label: { en: "Still", "zh-TW": "劇照" },
    description: {
      en: "Stills. More coming soon.",
      "zh-TW": "劇照作品,內容陸續更新中。",
    },
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
