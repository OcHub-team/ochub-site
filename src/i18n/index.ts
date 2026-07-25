/**
 * Locale registry and the shared Strings contract.
 *
 * `en.ts` defines the canonical shape; `ja.ts` and `zh.ts` must satisfy it,
 * so a missing translation is a compile error rather than a blank label.
 * Locale codes match crates/app/i18n/ in the app repo and docs.ochub.org.
 */

import en from "./en";

export type Strings = typeof en;

export interface Locale {
  /** Internal key. */
  key: "en" | "ja" | "zh";
  /** BCP-47 tag for <html lang> and hreflang. */
  tag: string;
  /** URL prefix segment ("" for the default locale, mounted at root). */
  prefix: string;
  /** Name in its own language, shown in the locale picker. */
  label: string;
}

export const LOCALES: readonly Locale[] = [
  { key: "en", tag: "en", prefix: "", label: "English" },
  { key: "ja", tag: "ja", prefix: "/ja", label: "日本語" },
  { key: "zh", tag: "zh-Hans", prefix: "/zh", label: "简体中文" },
] as const;

export const DEFAULT_LOCALE = LOCALES[0];

export function localeByKey(key: string): Locale {
  return LOCALES.find((l) => l.key === key) ?? DEFAULT_LOCALE;
}

/** Absolute site path for a locale's home page, honoring the base path. */
export function localeHome(locale: Locale): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${locale.prefix}/`;
}

export async function stringsFor(locale: Locale): Promise<Strings> {
  switch (locale.key) {
    case "ja":
      return (await import("./ja")).default;
    case "zh":
      return (await import("./zh")).default;
    default:
      return en;
  }
}
