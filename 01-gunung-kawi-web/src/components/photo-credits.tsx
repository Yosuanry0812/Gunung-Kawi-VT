import { ExternalLink } from "lucide-react";
import { photography } from "@/content/photography";
import { dictionary } from "@/i18n";
import type { Locale } from "@/i18n/routing";
export function PhotoCredits({ locale }: { locale: Locale }) {
  const d = dictionary(locale).photography;
  return (
    <section id="photo-credits" className="glass-panel photo-credits">
      <h2>{d.title}</h2>
      <p>{d.description}</p>
      <ul>
        {photography.map((photo) => (
          <li key={photo.id}>
            <div>
              <a
                href={photo.sourcePage}
                target="_blank"
                rel="noopener noreferrer"
              >
                {photo.alt[locale]}
                <ExternalLink size={14} aria-hidden="true" />
              </a>
              <p>
                {photo.author} ·{" "}
                <a
                  href={photo.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {photo.license}
                </a>
              </p>
              <small>{d.changes}</small>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
