import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Layers3,
  MapPin,
  MousePointer2,
  Headphones,
  CircleHelp,
  MoveUpRight,
  Camera,
  Leaf,
  HeartHandshake,
} from "lucide-react";
import { dictionary } from "@/i18n";
import { href, type Locale, type PageKey } from "@/i18n/routing";
import { historySections } from "@/content/history";
import { scenes } from "@/content/locations";
import { sources } from "@/content/sources";
import { tourFeatures } from "@/content/visitor-information";
import { MediaPanel, SiteBackdrop } from "./media-panel";
import { MapPanel } from "./map-panel";
import { PhotoCredits } from "./photo-credits";
import { Closing, Eyebrow, PageLink } from "./shared";
import { Reveal } from "./reveal";
import { VirtualTourLaunchButton } from "./virtual-tour-launch-button";

export function HomePage({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <>
      <SiteBackdrop />
      <section className="home-hero">
        <div className="container hero-layout">
          <Reveal className="hero-copy">
            <Eyebrow>{d.home.eyebrow}</Eyebrow>
            <h1>
              {d.home.title} <span>{d.home.titleAccent}</span>
            </h1>
            <p className="hero-description">{d.home.description}</p>
            <div className="button-group">
              <PageLink locale={locale} page="history" variant="gold">
                {d.common.history}
              </PageLink>
              <PageLink locale={locale} page="tour" variant="light">
                {d.nav.tour} 360°
              </PageLink>
            </div>
            <Link href={href(locale, "location")} className="hero-location">
              <MapPin size={16} aria-hidden="true" />
              Tampaksiring, Gianyar, Bali
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal className="hero-art" delay={0.12}>
            <MediaPanel
              name="hero"
              locale={locale}
              caption={d.home.heroCaption}
              priority
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function PageHero({
  locale,
  page,
}: {
  locale: Locale;
  page: Exclude<PageKey, "home">;
}) {
  const d = dictionary(locale);
  const content = d.pages[page];
  return (
    <section className="page-hero">
      <div className="container">
        <Reveal>
          <h1>
            {content.title} <span>{content.accent}</span>
          </h1>
          <p>{content.description}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function HistoryPage({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  const groups = [
    historySections.slice(0, 2),
    historySections.slice(2, 4),
    historySections.slice(4),
  ];
  const images = ["history", "hero", "introduction"] as const;
  return (
    <>
      <SiteBackdrop name="history" />
      <PageHero locale={locale} page="history" />
      <section className="container page-content history-content">
        {groups.map((group, index) => (
          <div
            className={`history-row ${index % 2 ? "row-reverse" : ""}`}
            key={index}
          >
            <Reveal className="glass-panel history-copy">
              {group.map((item) => (
                <section key={item.en.title}>
                  <h2>{item[locale].title}</h2>
                  <p>{item[locale].text}</p>
                </section>
              ))}
            </Reveal>
            <Reveal className="history-visual" delay={0.1}>
              <MediaPanel
                name={images[index]}
                locale={locale}
                caption={d.home.heroCaption}
              />
            </Reveal>
          </div>
        ))}
        <Reveal className="glass-panel conservation-panel">
          <Leaf size={30} strokeWidth={1.5} aria-hidden="true" />
          <div>
            <h2>{d.historyPage.conservationTitle}</h2>
            <p>{d.historyPage.conservationText}</p>
          </div>
        </Reveal>
        <section className="glass-panel sources">
          <h2>{d.common.source}</h2>
          <p className="source-note">{d.historyPage.sourceNote}</p>
          <ul>
            {sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.title}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </section>
      <Closing locale={locale} />
    </>
  );
}

export function LocationPage({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  return (
    <>
      <SiteBackdrop name="rice" />
      <PageHero locale={locale} page="location" />
      <section className="container page-content location-content">
        <Reveal className="glass-panel location-introduction">
          <div>
            <h2>{d.home.locationEyebrow}</h2>
            <p>{d.home.locationText}</p>
            <div className="address-block">
              <MapPin size={23} aria-hidden="true" />
              <div>
                <h3>Gunung Kawi Tampaksiring</h3>
                <p>{d.locationPage.mapDescription}</p>
              </div>
            </div>
            <PageLink locale={locale} page="information" variant="text">
              {d.nav.information}
            </PageLink>
          </div>
          <MediaPanel
            name="rice"
            locale={locale}
            caption={d.locationPage.environmentTitle}
          />
        </Reveal>
        <Reveal className="glass-panel map-section">
          <h2>{d.locationPage.mapTitle}</h2>
          <MapPanel locale={locale} />
        </Reveal>
        <div className="location-details">
          <Reveal className="glass-panel">
            <h2>{d.locationPage.accessTitle}</h2>
            <p>{d.locationPage.accessText}</p>
          </Reveal>
          <Reveal className="glass-panel" delay={0.08}>
            <h2>{d.locationPage.environmentTitle}</h2>
            <p>{d.locationPage.environmentText}</p>
          </Reveal>
        </div>
      </section>
      <Closing locale={locale} />
    </>
  );
}

export function InformationPage({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  const info = d.informationPage;
  const rows = [
    {
      title: info.careTitle,
      items: info.ethics.slice(0, 2),
      image: "history" as const,
      icon: HeartHandshake,
    },
    {
      title: info.preserveTitle,
      items: info.ethics.slice(2, 4),
      image: "introduction" as const,
      icon: Leaf,
    },
    {
      title: info.permissionTitle,
      items: info.ethics.slice(4),
      image: "rice" as const,
      icon: Camera,
    },
  ];
  return (
    <>
      <SiteBackdrop name="introduction" />
      <PageHero locale={locale} page="information" />
      <section className="container page-content information-content">
        {rows.map(({ title, items, image, icon: Icon }) => (
          <div className="information-row" key={title}>
            <Reveal className="information-visual">
              <MediaPanel name={image} locale={locale} />
            </Reveal>
            <Reveal className="glass-panel information-copy" delay={0.08}>
              <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
              <h2>{title}</h2>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}
        <Reveal className="glass-panel visitor-note">
          <h2>{info.visitTitle}</h2>
          <p>{info.visitText}</p>
          <PageLink locale={locale} page="location" variant="text">
            {d.common.location}
          </PageLink>
        </Reveal>
        <section className="glass-panel site-plan-section">
          <div className="section-heading">
            <h2>{info.planTitle}</h2>
            <p>{info.planText}</p>
          </div>
          <div className="site-inventory">
            <div className="site-plan-placeholder">
              <Layers3 size={36} strokeWidth={1.3} aria-hidden="true" />
              <h3>{info.mapMissing}</h3>
              <p>{info.mapDetail}</p>
            </div>
            <ol className="scene-list">
              {scenes.map((scene) => (
                <li id={scene.sceneId} key={scene.sceneId}>
                  <span>{scene.sceneId}</span>
                  <h3>{locale === "id" ? scene.nameId : scene.nameEn}</h3>
                  <small>{d.common.planned}</small>
                </li>
              ))}
            </ol>
          </div>
          <div className="facilities">
            <h3>{info.facilitiesTitle}</h3>
            <ul>
              {info.facilities.map((facility) => (
                <li key={facility}>{facility}</li>
              ))}
            </ul>
            <p>{info.facilitiesNote}</p>
          </div>
        </section>
        <PhotoCredits locale={locale} />
      </section>
      <Closing locale={locale} />
    </>
  );
}

export function TourPage({ locale }: { locale: Locale }) {
  const d = dictionary(locale);
  const icons = [Compass, MousePointer2, MoveUpRight, Headphones, CircleHelp];
  return (
    <>
      <SiteBackdrop />
      <PageHero locale={locale} page="tour" />
      <section className="container page-content tour-content">
        <aside className="tour-sidebar">
          <Reveal className="tour-site-photo">
            <MediaPanel
              name="hero"
              locale={locale}
              caption={d.tourPage.previewLabel}
            />
          </Reveal>
          <Reveal className="glass-panel tour-features-panel">
            <h2>
              <Compass size={26} aria-hidden="true" />
              {d.nav.tour} 360°
            </h2>
            <p className="feature-note">{d.tourPage.featuresNote}</p>
            <ul className="tour-features">
              {tourFeatures[locale].map(([title, text], index) => {
                const Icon = icons[index];
                return (
                  <li key={title}>
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </aside>
        <div className="tour-main">
          <Reveal className="glass-panel tour-introduction">
            <h2>{d.tourPage.previewTitle}</h2>
            <p>{d.tourPage.previewText}</p>
            <p>{d.home.tourDescription}</p>
          </Reveal>
          <Reveal className="glass-panel tour-launch-card" delay={0.1}>
            <MediaPanel
              name="introduction"
              locale={locale}
              caption={d.tourPage.previewLabel}
            />
            <div className="tour-launch">
              <VirtualTourLaunchButton locale={locale} />
              <PageLink locale={locale} page="home" variant="text">
                {d.common.back}
              </PageLink>
            </div>
          </Reveal>
          <Reveal className="glass-panel tour-instructions">
            <h2>{d.tourPage.howTitle}</h2>
            <ol>
              {d.tourPage.instructions.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ol>
          </Reveal>
        </div>
        <details className="glass-panel tour-inventory">
          <summary>
            {d.tourPage.inventoryTitle}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{d.tourPage.inventoryNote}</p>
          <ol className="scene-list scene-list-wide">
            {scenes.map((scene) => (
              <li key={scene.sceneId}>
                <span>{scene.sceneId}</span>
                <h3>{locale === "id" ? scene.nameId : scene.nameEn}</h3>
                <small>{d.common.planned}</small>
              </li>
            ))}
          </ol>
        </details>
      </section>
    </>
  );
}
