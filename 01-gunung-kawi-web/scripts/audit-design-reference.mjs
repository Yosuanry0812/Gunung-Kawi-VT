import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const directory = "../03-dokumen/reference-audit/revamp";
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage();
const audit = [];
try {
  for (const [name, path] of [
    ["home", "/"],
    ["history", "/history"],
    ["location", "/location"],
    ["information", "/information"],
    ["tour", "/virtual-tour"],
  ]) {
    for (const [device, width, height] of [
      ["desktop", 1440, 1000],
      ["mobile", 390, 844],
    ]) {
      await page.setViewportSize({ width, height });
      const response = await page.goto(
        `https://pura-pengukur-ukuran.vercel.app${path}`,
        { waitUntil: "domcontentloaded", timeout: 45000 },
      );
      await page.waitForTimeout(3500);
      for (
        let offset = 0;
        offset <
        (await page.evaluate(() => document.documentElement.scrollHeight));
        offset += height * 0.8
      ) {
        await page.evaluate((y) => window.scrollTo(0, y), offset);
        await page.waitForTimeout(180);
        if (offset > 14000) break;
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(700);
      const details = await page.evaluate(() => {
        const describe = (element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return {
            tag: element.tagName,
            text: element.textContent.trim().slice(0, 120),
            font: style.fontFamily,
            size: style.fontSize,
            weight: style.fontWeight,
            color: style.color,
            background: style.backgroundColor,
            radius: style.borderRadius,
            position: style.position,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          };
        };
        return {
          title: document.title,
          height: document.documentElement.scrollHeight,
          bodyFont: getComputedStyle(document.body).fontFamily,
          bodyBackground: getComputedStyle(document.body).backgroundColor,
          headings: [...document.querySelectorAll("h1,h2,h3")].map(describe),
          navigation: [...document.querySelectorAll("header a,nav a")].map(
            (a) => ({
              text: a.textContent.trim(),
              href: a.getAttribute("href"),
            }),
          ),
          buttons: [
            ...document.querySelectorAll(
              "button, a[class*='button'], a[class*='btn']",
            ),
          ]
            .map(describe)
            .slice(0, 15),
          images: [...document.images].map((img) => ({
            alt: img.alt,
            loaded: img.complete && img.naturalWidth > 0,
          })),
          animations: document
            .getAnimations()
            .map((a) => ({
              state: a.playState,
              timing: a.effect?.getTiming(),
            })),
        };
      });
      audit.push({ name, device, status: response.status(), ...details });
      await page.screenshot({
        path: `${directory}/${name}-${device}.png`,
        fullPage: true,
      });
      if (name === "home")
        await page.screenshot({
          path: `${directory}/home-viewport-${device}.png`,
        });
    }
  }
} finally {
  await browser.close();
}
await writeFile(`${directory}/audit.json`, JSON.stringify(audit, null, 2));
console.log(
  JSON.stringify(
    audit.map(
      ({
        name,
        device,
        status,
        bodyFont,
        bodyBackground,
        headings,
        navigation,
        height,
      }) => ({
        name,
        device,
        status,
        bodyFont,
        bodyBackground,
        height,
        headings: headings.map((h) => ({
          text: h.text,
          size: h.size,
          weight: h.weight,
          color: h.color,
        })),
        navigation: device === "desktop" ? navigation : undefined,
      }),
    ),
  ),
);
