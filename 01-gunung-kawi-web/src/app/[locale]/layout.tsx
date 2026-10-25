import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/shared";
import { dictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/routing";
import { getSiteOrigin } from "@/lib/config";
import "../globals.css";
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  applicationName: "Gunung Kawi",
  icons: { icon: "/icon.svg" },
};
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = dictionary(locale);
  return (
    <html lang={locale} className={sans.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          {d.common.skip}
        </a>
        <Header locale={locale} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
