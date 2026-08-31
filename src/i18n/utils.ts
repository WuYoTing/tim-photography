import en from "./en.json";
import zhTw from "./zh-tw.json";

export const locales = ["en", "zh-tw"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, typeof en> = {
  en,
  "zh-tw": zhTw,
};

export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split("/");
  if (maybeLocale === "zh-tw") return "zh-tw";
  return defaultLocale;
}

function getByPath(obj: Record<string, unknown>, path: string): string {
  const value = path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        typeof acc === "object" && acc !== null
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      obj
    );
  return typeof value === "string" ? value : path;
}

export function useTranslations(locale: Locale) {
  const dict = dictionaries[locale];
  return function t(key: string, vars?: Record<string, string | number>): string {
    let text = getByPath(dict, key);
    if (vars) {
      for (const [name, value] of Object.entries(vars)) {
        text = text.replace(`{${name}}`, String(value));
      }
    }
    return text;
  };
}

/** Strips the locale prefix (if any) from a pathname, returning the locale-agnostic path. */
export function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/");
  if (parts[1] === "zh-tw") {
    const rest = parts.slice(2).join("/");
    return `/${rest}`;
  }
  return pathname;
}

/** Builds the equivalent path for the given locale from a locale-agnostic path (e.g. "/portfolio"). */
export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path === "/" ? "" : path;
  if (locale === defaultLocale) return cleanPath || "/";
  return `/zh-tw${cleanPath}`;
}

/** Picks the string matching the current locale out of a { en, "zh-TW": ... } localized object. */
export function pickLocalized(
  value: { en: string; "zh-TW"?: string },
  locale: Locale
): string {
  if (locale === "zh-tw") return value["zh-TW"] ?? value.en;
  return value.en;
}
