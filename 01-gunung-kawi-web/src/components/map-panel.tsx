"use client";
import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  ArrowUpRight,
  Navigation,
  Copy,
  Check,
  RefreshCw,
} from "lucide-react";
import { dictionary } from "@/i18n";
import type { Locale } from "@/i18n/routing";
import { locationConfig } from "@/content/locations";

export function MapPanel({ locale }: { locale: Locale }) {
  const d = dictionary(locale).locationPage;
  const container = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  useEffect(() => {
    if (!container.current) return;
    if (typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setShow(true), 0);
      return () => window.clearTimeout(timer);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "180px" },
    );
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!show || loaded) return;
    const timer = window.setTimeout(() => setUnavailable(true), 12000);
    return () => window.clearTimeout(timer);
  }, [show, loaded, attempt]);
  useEffect(() => {
    if (copyStatus === "idle") return;
    const timer = window.setTimeout(() => setCopyStatus("idle"), 3000);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);
  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(
        `Gunung Kawi Tampaksiring, ${d.mapDescription}`,
      );
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }
  return (
    <div className="map-block" ref={container}>
      <div className="map-place">
        <span className="map-place-icon">
          <MapPin size={24} aria-hidden="true" />
        </span>
        <div>
          <h3>Gunung Kawi Tampaksiring</h3>
          <p>Tampaksiring, Gianyar, Bali</p>
        </div>
        <span className="map-badge">
          Google Maps <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>
      <div className="map-canvas">
        {show ? (
          <iframe
            key={attempt}
            src={`${locationConfig.embedUrl}&hl=${locale}`}
            title={d.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            onLoad={() => {
              setLoaded(true);
              setUnavailable(false);
            }}
            onError={() => setUnavailable(true)}
          />
        ) : (
          <div className="map-consent">
            <MapPin size={32} aria-hidden="true" />
            <p>{d.mapPrivacy}</p>
            <button
              className="button button-primary"
              onClick={() => setShow(true)}
            >
              {d.loadMap}
            </button>
          </div>
        )}
        {show && !loaded && !unavailable && (
          <p className="map-loading" role="status">
            {d.mapLoading}
          </p>
        )}
        {unavailable && (
          <div className="map-fallback" role="status">
            <p>{d.mapUnavailable}</p>
            <a
              className="button button-primary"
              href={locationConfig.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {d.mapLink}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <button
              className="text-link"
              onClick={() => {
                setUnavailable(false);
                setLoaded(false);
                setAttempt(attempt + 1);
              }}
            >
              <RefreshCw size={16} aria-hidden="true" />
              {d.retryMap}
            </button>
          </div>
        )}
      </div>
      <div className="map-caption">
        <p>{d.mapDescription}</p>
        <div className="map-actions">
          <a
            className="button button-primary"
            href={locationConfig.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Navigation size={17} aria-hidden="true" />
            {d.directions}
          </a>
          <a
            className="text-link"
            href={locationConfig.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {d.mapLink}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <button className="text-link copy-address" onClick={copyAddress}>
            {copyStatus === "copied" ? (
              <Check size={16} aria-hidden="true" />
            ) : (
              <Copy size={16} aria-hidden="true" />
            )}
            {copyStatus === "copied" ? d.copied : d.copyAddress}
          </button>
        </div>
      </div>
      <p className="copy-feedback" role="status">
        {copyStatus === "failed" ? d.copyFailed : ""}
      </p>
    </div>
  );
}
