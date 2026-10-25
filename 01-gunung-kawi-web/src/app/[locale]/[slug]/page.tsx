import { notFound } from "next/navigation";
import {
  HistoryPage,
  InformationPage,
  LocationPage,
  TourPage,
} from "@/components/pages";
import {
  isLocale,
  locales,
  pageKeys,
  resolvePage,
  slugs,
} from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    pageKeys
      .filter((key) => key !== "home")
      .map((key) => ({ locale, slug: slugs[locale][key] })),
  );
}
async function getRoute(params: Promise<{ locale: string; slug: string }>) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const page = resolvePage(locale, slug);
  if (!page || page === "home") notFound();
  return { locale, page };
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, page } = await getRoute(params);
  return pageMetadata(locale, page);
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, page } = await getRoute(params);
  const Component = {
    history: HistoryPage,
    location: LocationPage,
    information: InformationPage,
    tour: TourPage,
  }[page];
  return <Component locale={locale} />;
}
