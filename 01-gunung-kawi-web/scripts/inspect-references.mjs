import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const results = [];
await mkdir("../03-dokumen/reference-audit", { recursive: true });
for (const [name, url] of [
  ["information", "https://pura-pengukur-ukuran.vercel.app/"],
  ["panorama", "https://panorama-beta-one.vercel.app/"],
]) {
  try {
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 25000,
    });
    await page.waitForTimeout(1000);
    results.push({
      url,
      status: response.status(),
      title: await page.title(),
      headings: await page.locator("h1,h2").allTextContents(),
      links: await page
        .locator("nav a")
        .evaluateAll((a) =>
          a.map((x) => ({ text: x.textContent, href: x.getAttribute("href") })),
        ),
    });
    await page.screenshot({
      path: `../03-dokumen/reference-audit/${name}-desktop.png`,
      fullPage: true,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
      path: `../03-dokumen/reference-audit/${name}-mobile.png`,
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
  } catch (error) {
    results.push({ url, error: error.message });
  }
}
await browser.close();
await writeFile(
  "../03-dokumen/reference-audit/results.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results));
