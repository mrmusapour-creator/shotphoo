export const locales = ["en", "fa", "ar"] as const;
export type Locale = (typeof locales)[number];

export const localeMeta: Record<Locale, { label: string; dir: "ltr" | "rtl"; name: string }> = {
  en: { label: "EN", dir: "ltr", name: "English" },
  fa: { label: "FA", dir: "rtl", name: "فارسی" },
  ar: { label: "AR", dir: "rtl", name: "العربية" }
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

type Messages = Record<string, unknown>;

import en from "@/locales/en.json";
import fa from "@/locales/fa.json";
import ar from "@/locales/ar.json";

const messages: Record<Locale, Messages> = { en, fa, ar };

function readPath(source: Messages, path: string): unknown {
  return path.split(".").reduce<unknown>((value, segment) => {
    if (value && typeof value === "object" && segment in value) {
      return (value as Record<string, unknown>)[segment];
    }
    return undefined;
  }, source);
}

export function getI18n(locale: Locale) {
  const source = messages[locale] ?? messages.en;
  return {
    t(path: string) {
      const value = readPath(source, path);
      return typeof value === "string" ? value : path;
    },
    list<T = Record<string, string>>(path: string) {
      const value = readPath(source, path);
      return Array.isArray(value) ? (value as T[]) : [];
    },
    value<T>(path: string, fallback: T) {
      const value = readPath(source, path);
      return (value ?? fallback) as T;
    }
  };
}
