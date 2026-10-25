"use client";
import { usePathname } from "next/navigation";
import { dictionary } from "@/i18n";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = usePathname().startsWith("/en") ? "en" : "id";
  const d = dictionary(locale);
  return (
    <div className="container error-page">
      <h1>{d.common.error}</h1>
      <p>{d.common.errorDetail}</p>
      <button className="button button-primary" onClick={reset}>
        {d.common.retry}
      </button>
    </div>
  );
}
