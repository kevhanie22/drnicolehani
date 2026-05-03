import { en } from "./en";
import { fr } from "./fr";
import type { Locale } from "../i18n";

export const translations = { en, fr } as const;

export function getT(locale: Locale) {
  return translations[locale];
}
