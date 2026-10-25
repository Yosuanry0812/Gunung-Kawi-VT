"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dictionary } from "@/i18n";
export default function NotFound() {
  const locale = usePathname().startsWith("/en") ? "en" : "id";
  const d = dictionary(locale);
  return (
    <div className="container error-page">
      <span className="eyebrow">404 / GUNUNG KAWI</span>
      <h1>{d.common.notFound}</h1>
      <p>{d.common.notFoundDetail}</p>
      <Link className="button button-primary" href={`/${locale}`}>
        {d.common.back}
      </Link>
    </div>
  );
}
