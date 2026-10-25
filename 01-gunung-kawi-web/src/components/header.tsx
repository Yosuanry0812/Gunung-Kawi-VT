"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Landmark, Menu, X } from "lucide-react";
import { dictionary } from "@/i18n";
import { href, pageKeys, resolvePage, type Locale } from "@/i18n/routing";

export function Header({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  const pathname = usePathname();
  const current = resolvePage(locale, pathname.split("/")[2] ?? "") ?? "home";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = document.querySelectorAll<HTMLElement>("main, footer");
    background.forEach((element) => {
      element.inert = true;
    });
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const nodes = [
          toggleRef.current,
          ...Array.from(
            menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? [],
          ),
        ].filter((n): n is HTMLElement => !!n);
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const media = window.matchMedia("(min-width: 1100px)");
    const onResize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onResize);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = before;
      background.forEach((element) => {
        element.inert = false;
      });
      document.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onResize);
    };
  }, [open]);
  const languages = (
    <div className="languages" role="group" aria-label={d.common.language}>
      {(["id", "en"] as const).map((lang) => (
        <Link
          key={lang}
          href={href(lang, current)}
          hrefLang={lang}
          lang={lang}
          aria-current={locale === lang ? "true" : undefined}
          onClick={() => setOpen(false)}
        >
          {lang.toUpperCase()}
        </Link>
      ))}
    </div>
  );
  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}
    >
      <div className="header-inner container">
        <Link
          className="brand"
          href={href(locale, "home")}
          onClick={() => setOpen(false)}
        >
          <span className="brand-symbol" aria-hidden="true">
            <Landmark size={28} strokeWidth={1.6} />
          </span>
          <span>
            Gunung Kawi<small>{d.home.brandSubtitle}</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label={d.footer.navigation}>
          {pageKeys.map((page) => (
            <Link
              key={page}
              href={href(locale, page)}
              aria-current={current === page ? "page" : undefined}
            >
              {d.nav[page]}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          {languages}
          <Link
            className="header-cta"
            href={href(locale, "tour")}
            aria-label={`${d.nav.tour} 360°`}
          >
            360° <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <button
          ref={toggleRef}
          className="menu-toggle"
          aria-label={open ? d.common.close : d.common.menu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div ref={menuRef} id="mobile-menu" className="mobile-menu">
          <nav aria-label={d.footer.navigation}>
            {pageKeys.map((page, i) => (
              <Link
                key={page}
                href={href(locale, page)}
                aria-current={current === page ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span>0{i + 1}</span>
                {d.nav[page]}
                <ArrowUpRight size={22} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          {languages}
          <p>{d.home.eyebrow}</p>
        </div>
      )}
    </header>
  );
}
