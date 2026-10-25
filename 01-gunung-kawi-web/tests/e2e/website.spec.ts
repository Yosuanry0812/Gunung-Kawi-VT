import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/id",
  "/en",
  "/id/sejarah",
  "/en/history",
  "/id/lokasi",
  "/en/location",
  "/id/informasi",
  "/en/information",
  "/id/virtual-tour",
  "/en/virtual-tour",
];
test("root redirects to Indonesian", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/id$/);
});
test("header server markup matches hydration on virtual tour pages", async ({
  browser,
  page,
  baseURL,
}) => {
  test.setTimeout(60000);
  const hydrationErrors: string[] = [];
  page.on("pageerror", (error) => hydrationErrors.push(error.message));
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /hydrat|server rendered|didn't match/i.test(message.text())
    ) {
      hydrationErrors.push(message.text());
    }
  });
  const serverContext = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  const serverPage = await serverContext.newPage();
  try {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await serverPage.setViewportSize({ width, height: 900 });
      for (const route of ["/id/virtual-tour", "/en/virtual-tour"]) {
        await serverPage.goto(route);
        const serverBrand = await serverPage.locator(".brand").innerHTML();
        if (width === 390) {
          await expect(serverPage.locator(".menu-toggle")).toBeDisabled();
        }
        await page.goto(route, { waitUntil: "networkidle" });
        await expect(page.locator(".brand")).toHaveJSProperty(
          "innerHTML",
          serverBrand,
        );
        await expect(page.locator(".brand-symbol svg")).toHaveCount(1);
        await expect(page.locator(".brand-symbol")).toHaveText("");
        if (width === 390) {
          const menu = page.locator(".menu-toggle");
          await expect(menu).toBeEnabled();
          await menu.click();
          await expect(menu).toHaveAttribute("aria-expanded", "true");
          await page.keyboard.press("Escape");
          await expect(menu).toHaveAttribute("aria-expanded", "false");
        }
      }
    }
    expect(hydrationErrors).toEqual([]);
  } finally {
    await serverContext.close();
  }
});
test("all routes, metadata, assets and local links work", async ({
  page,
  request,
}) => {
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const checked = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      route.startsWith("/en") ? "en" : "id",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `http://localhost:3000${route}`,
    );
    expect(
      await page.locator('meta[name="description"]').getAttribute("content"),
    ).toBeTruthy();
    expect(await page.locator('link[hreflang="en"]').count()).toBe(1);
    const broken = await page.locator("img").evaluateAll(async (images) => {
      const photos = images as HTMLImageElement[];
      photos.forEach((img) => {
        img.loading = "eager";
      });
      await Promise.allSettled(photos.map((img) => img.decode()));
      return photos
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.src);
    });
    expect(broken).toEqual([]);
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((a) =>
        a.map((link) => link.getAttribute("href")!.split("#")[0]),
      );
    for (const link of links)
      if (!checked.has(link)) {
        checked.add(link);
        expect((await request.get(link)).status(), link).toBe(200);
      }
  }
  expect(errors).toEqual([]);
});
test("locale switch preserves the equivalent page", async ({ page }) => {
  for (const [id, en] of [
    ["/id", "/en"],
    ["/id/sejarah", "/en/history"],
    ["/id/lokasi", "/en/location"],
    ["/id/informasi", "/en/information"],
    ["/id/virtual-tour", "/en/virtual-tour"],
  ]) {
    await page.goto(id);
    await page
      .locator(".header-actions")
      .getByRole("link", { name: "EN", exact: true })
      .click();
    await expect(page).toHaveURL(en);
    await page
      .locator(".header-actions")
      .getByRole("link", { name: "ID", exact: true })
      .click();
    await expect(page).toHaveURL(id);
  }
});
test("missing tour URL has a disabled launch and no external tour link", async ({
  page,
}) => {
  await page.goto("/id/virtual-tour");
  await expect(
    page.getByRole("button", { name: "Mulai Virtual Tour 360°", exact: true }),
  ).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("sedang dipersiapkan");
  await expect(page.locator('a[href*="panorama-beta"]')).toHaveCount(0);
});
test("mobile keyboard menu traps focus, closes on Escape and navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/id");
  const button = page.locator(".menu-toggle");
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  expect(await page.locator("body").evaluate((b) => b.style.overflow)).toBe(
    "hidden",
  );
  await page
    .locator("#mobile-menu")
    .getByRole("link", { name: "EN", exact: true })
    .focus();
  await page.keyboard.press("Tab");
  await expect(button).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.locator("#mobile-menu").getByRole("link", { name: "EN", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(button).toBeFocused();
  await button.click();
  await page
    .locator("#mobile-menu nav")
    .getByRole("link", { name: /Sejarah/ })
    .click();
  await expect(page).toHaveURL("/id/sejarah");
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  expect(await page.locator("body").evaluate((b) => b.style.overflow)).toBe("");
});
test("responsive pages have no horizontal overflow", async ({ page }) => {
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} at ${width}`,
      ).toBe(true);
    }
  }
});
test("reduced motion and keyboard skip link work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});
test("map requires consent and always provides a fallback link", async ({
  page,
}) => {
  await page.goto("/en/location");
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Open Google Maps" }),
  ).toHaveAttribute("href", /maps\/search/);
  await page.route("**/maps.google.com/**", (route) => route.abort());
  await page.getByRole("button", { name: "Show interactive map" }).click();
  await expect(page.locator("iframe")).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: "Open Google Maps" }),
  ).toBeVisible();
});
test("WCAG AA checks for every page", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      results.violations,
      `${route}: ${JSON.stringify(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
    ).toEqual([]);
  }
});
test("sitemap and robots expose bilingual routes", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  for (const route of routes)
    expect(await sitemap.text()).toContain(`http://localhost:3000${route}`);
  expect((await request.get("/robots.txt")).status()).toBe(200);
});
test("unknown pages return an understandable localized 404", async ({
  page,
}) => {
  for (const [route, title] of [
    ["/id/halaman-tidak-ada", "Halaman tidak ditemukan"],
    ["/en/missing-page", "Page not found"],
    ["/en/history/missing-page", "Page not found"],
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
  }
  const response = await page.goto("/unknown-locale");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Halaman tidak ditemukan", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Page not found", exact: true }),
  ).toBeVisible();
});
test("capture representative desktop and mobile screens", async ({
  page,
}, testInfo) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/id");
    await page.screenshot({
      path: testInfo.outputPath(`home-${width}.png`),
      fullPage: true,
    });
    await page.screenshot({
      path: testInfo.outputPath(`home-viewport-${width}.png`),
      fullPage: false,
    });
  }
});
