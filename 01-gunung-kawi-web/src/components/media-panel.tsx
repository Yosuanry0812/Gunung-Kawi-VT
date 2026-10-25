import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { media, type MediaKey } from "@/content/media";
import { photographByPath } from "@/content/photography";
import { dictionary } from "@/i18n";
import type { Locale } from "@/i18n/routing";
export function MediaPanel({
  name,
  locale,
  className = "",
  caption,
  priority = false,
}: {
  name: MediaKey;
  locale: Locale;
  className?: string;
  caption?: string;
  priority?: boolean;
}) {
  const item: { src: string | null; path: string; id: string } = media[name];
  const d = dictionary(locale);
  const photograph = photographByPath.get(item.src ?? "");
  return (
    <figure className={`media-panel ${className}`}>
      {item.src ? (
        <Image
          src={item.src}
          alt={photograph?.alt[locale] ?? caption ?? d.common.photoAlt}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 60vw, 50vw"
          priority={priority}
        />
      ) : (
        <div className="media-placeholder">
          <div className="media-empty">
            <ImageIcon size={24} strokeWidth={1} aria-hidden="true" />
            <p>{d.common.missing}</p>
            <span>{d.common.missingDetail}</span>
          </div>
        </div>
      )}
      {caption && (
        <figcaption>
          <span>{caption}</span>
          {photograph && (
            <a
              href={photograph.sourcePage}
              target="_blank"
              rel="noopener noreferrer"
            >
              {d.common.photoCredit}: {photograph.author} · {photograph.license}
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}

export function SiteBackdrop({ name = "hero" }: { name?: MediaKey }) {
  const item: { src: string | null } = media[name];
  return (
    <div className="site-backdrop" aria-hidden="true">
      {item.src && (
        <Image src={item.src} alt="" fill sizes="100vw" priority quality={75} />
      )}
      <div className="backdrop-shade" />
    </div>
  );
}
