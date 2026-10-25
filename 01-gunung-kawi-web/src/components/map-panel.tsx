"use client";
import { useState } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { dictionary } from "@/i18n";
import type { Locale } from "@/i18n/routing";
import { locationConfig } from "@/content/locations";
export function MapPanel({ locale }: { locale: Locale }) {
  const d = dictionary(locale).locationPage;
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="map-block">
      <div className="map-canvas">
        {show ? (
          <>
            <iframe
              src={locationConfig.embedUrl}
              title={d.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              onLoad={() => setLoaded(true)}
            />
            {!loaded && (
              <p className="map-loading" role="status">
                {d.mapLoading}
              </p>
            )}
          </>
        ) : (
          <div className="map-consent">
            <MapPin size={32} strokeWidth={1.2} aria-hidden="true" />
            <h3>Gunung Kawi Tampaksiring</h3>
            <p>{d.mapPrivacy}</p>
            <button
              className="button button-primary"
              onClick={() => setShow(true)}
            >
              {d.loadMap}
            </button>
          </div>
        )}
      </div>
      <div className="map-caption">
        <p>{d.mapDescription}</p>
        <a
          className="text-link"
          href={locationConfig.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {d.mapLink}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
