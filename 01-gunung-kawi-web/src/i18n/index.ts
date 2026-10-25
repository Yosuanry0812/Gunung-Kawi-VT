import { id } from "./dictionaries/id";
import { en } from "./dictionaries/en";
import type { Locale } from "./routing";
export function dictionary(locale: Locale) {
  return locale === "en" ? en : id;
}
