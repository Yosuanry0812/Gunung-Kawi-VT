import Link from "next/link";
import { ArrowRight, ArrowUpRight, Landmark } from "lucide-react";
import { dictionary } from "@/i18n";
import { href, pageKeys, type Locale, type PageKey } from "@/i18n/routing";
import { Reveal } from "./reveal";

export function PageLink({
  locale,
  page,
  children,
  variant = "primary",
}: {
  locale: Locale;
  page: PageKey;
  children: React.ReactNode;
  variant?: "primary" | "light" | "gold" | "text";
}) {
  return (
    <Link
      className={variant === "text" ? "text-link" : `button button-${variant}`}
      href={href(locale, page)}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function Closing({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <section className="container closing">
      <Reveal className="glass-panel closing-panel">
        <div>
          <h2>{d.home.closingTitle}</h2>
          <p>{d.home.closingDescription}</p>
        </div>
        <div className="button-group">
          <PageLink locale={locale} page="history" variant="light">
            {d.common.readHistory}
          </PageLink>
          <PageLink locale={locale} page="tour" variant="gold">
            {d.nav.tour} 360°
          </PageLink>
        </div>
      </Reveal>
    </section>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link className="footer-brand" href={href(locale, "home")}>
            <Landmark size={24} aria-hidden="true" />
            <span>
              Gunung Kawi<small>Tampaksiring, Bali</small>
            </span>
          </Link>
          <nav aria-label={d.footer.navigation}>
            {pageKeys.map((page) => (
              <Link key={page} href={href(locale, page)}>
                {d.nav[page]}
              </Link>
            ))}
          </nav>
          <Link
            className="text-link"
            href={`${href(locale, "information")}#photo-credits`}
          >
            {d.common.photoCredits}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="footer-bottom">
          <p>{d.footer.project}</p>
          <span>© 2026 Gunung Kawi</span>
        </div>
      </div>
    </footer>
  );
}
