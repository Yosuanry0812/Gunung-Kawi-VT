import type { MetadataRoute } from "next";
import { href, locales, pageKeys } from "@/i18n/routing";
import { getSiteOrigin } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  return locales.flatMap((locale) =>
    pageKeys.map((page) => ({
      url: `${origin}${href(locale, page)}`,
      alternates: {
        languages: {
          id: `${origin}${href("id", page)}`,
          en: `${origin}${href("en", page)}`,
        },
      },
    })),
  );
}
