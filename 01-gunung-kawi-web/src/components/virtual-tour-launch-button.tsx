import { ArrowUpRight, Clock3 } from "lucide-react";
import { dictionary } from "@/i18n";
import type { Locale } from "@/i18n/routing";
import { tourUrl } from "@/lib/config";
export function VirtualTourLaunchButton({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  if (tourUrl)
    return (
      <a
        className="button button-gold"
        href={tourUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={d.common.tourExternal}
      >
        {d.common.tourLaunch}
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    );
  return (
    <div className="tour-status" role="status">
      <span className="status-label">
        <Clock3 size={16} aria-hidden="true" />
        {d.common.planned}
      </span>
      <p>{d.common.tourPending}</p>
      <small>{d.common.tourPendingDetail}</small>
      <button className="button button-disabled" disabled>
        {d.common.tourLaunch}
      </button>
    </div>
  );
}
