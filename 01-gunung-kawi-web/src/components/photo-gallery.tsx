"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X, Camera } from "lucide-react";
import { photography } from "@/content/photography";
import type { Locale } from "@/i18n/routing";

export function PhotoGallery({
  locale,
  priority = false,
}: {
  locale: Locale;
  priority?: boolean;
}) {
  const [active, setActive] = useState(2);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef("");
  const photo = photography[active];
  const id = locale === "id";
  const move = (delta: number) =>
    setActive(
      (value) => (value + delta + photography.length) % photography.length,
    );
  function openPhoto() {
    if (!dialog.current || dialog.current.open) return;
    previousOverflow.current = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = "hidden";
    setExpanded(true);
  }
  function closePhoto() {
    document.body.style.overflow = previousOverflow.current;
    setExpanded(false);
  }
  const controls = (
    <>
      <button
        type="button"
        className="gallery-control"
        onClick={() => move(-1)}
        aria-label={id ? "Foto sebelumnya" : "Previous photo"}
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <span className="gallery-counter" aria-live="polite">
        {String(active + 1).padStart(2, "0")} /{" "}
        {String(photography.length).padStart(2, "0")}
      </span>
      <button
        type="button"
        className="gallery-control"
        onClick={() => move(1)}
        aria-label={id ? "Foto berikutnya" : "Next photo"}
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </>
  );
  return (
    <div className="photo-gallery">
      <figure className="media-panel gallery-photo">
        <Image
          src={photo.publicPath}
          alt={photo.alt[locale]}
          fill
          sizes="(max-width: 800px) 100vw, 55vw"
          preload={priority}
          quality={75}
        />
        <span className="gallery-tag">
          <Camera size={15} aria-hidden="true" />
          {id ? "Galeri kawasan" : "Site gallery"}
        </span>
        <button
          type="button"
          className="gallery-expand gallery-control"
          onClick={openPhoto}
          aria-label={id ? "Perbesar foto" : "Enlarge photo"}
        >
          <Expand size={18} aria-hidden="true" />
        </button>
        <figcaption>
          <span>
            {id ? "Gunung Kawi, dalam bingkai" : "A closer look at Gunung Kawi"}
          </span>
          <a href={photo.sourcePage} target="_blank" rel="noopener noreferrer">
            {photo.author} · {photo.license}
          </a>
        </figcaption>
      </figure>
      <div className="gallery-toolbar">
        <p>{"Tampaksiring \u00b7 Bali"}</p>
        <div className="gallery-navigation">{controls}</div>
      </div>
      <dialog
        ref={dialog}
        className="photo-dialog"
        onClose={closePhoto}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
        aria-label={
          id ? "Galeri foto Gunung Kawi" : "Gunung Kawi photo gallery"
        }
      >
        <button
          type="button"
          className="dialog-close gallery-control"
          onClick={() => dialog.current?.close()}
          aria-label={id ? "Tutup galeri" : "Close gallery"}
        >
          <X size={22} aria-hidden="true" />
        </button>
        {expanded && (
          <figure>
            <div className="dialog-image">
              <Image
                src={photo.publicPath}
                alt={photo.alt[locale]}
                fill
                sizes="95vw"
                quality={75}
              />
            </div>
            <figcaption>
              {photo.alt[locale]}{" "}
              <a
                href={photo.sourcePage}
                target="_blank"
                rel="noopener noreferrer"
              >
                {photo.author} · {photo.license}
              </a>
            </figcaption>
          </figure>
        )}
        <div className="gallery-navigation">{controls}</div>
      </dialog>
    </div>
  );
}
