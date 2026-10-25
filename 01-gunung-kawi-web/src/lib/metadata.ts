import type { Metadata } from "next";
import { dictionary } from "@/i18n";
import { href, type Locale, type PageKey } from "@/i18n/routing";
export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const d = dictionary(locale);
  const title = d.metadata[page];
  const description =
    page === "home" ? d.home.description : d.pages[page].description;
  return {
    title,
    description,
    alternates: {
      canonical: href(locale, page),
      languages: {
        id: href("id", page),
        en: href("en", page),
        "x-default": href("id", page),
      },
    },
    openGraph: {
      title,
      description,
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? "en_US" : "id_ID",
      type: "website",
      siteName: "Gunung Kawi",
      url: href(locale, page),
    },
    twitter: { card: "summary", title, description },
  };
}
