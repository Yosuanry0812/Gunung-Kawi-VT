import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = {
  title: "404 — Gunung Kawi",
  robots: { index: false, follow: true },
};
export default function GlobalNotFound() {
  return (
    <html lang="id">
      <body>
        <main className="container error-page">
          <span className="eyebrow">404 / GUNUNG KAWI</span>
          <h1>Halaman tidak ditemukan</h1>
          <p>Alamat ini tidak tersedia. Lanjutkan perjalanan dari beranda.</p>
          <h2 lang="en">Page not found</h2>
          <p lang="en">
            This address is unavailable. Continue exploring from the home page.
          </p>
          <div className="button-group">
            <Link className="button button-primary" href="/id" lang="id">
              Beranda Indonesia
            </Link>
            <Link className="button button-primary" href="/en" lang="en">
              English Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
