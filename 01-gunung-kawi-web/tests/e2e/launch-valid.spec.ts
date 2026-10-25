import { test, expect } from "@playwright/test";
for (const locale of ["id", "en"]) {
  test(`configured tour opens a separate tab safely (${locale})`, async ({
    page,
    context,
  }) => {
    await context.route("https://tour.test/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "<title>Test tour destination</title><p>Navigation fixture, not a real panorama.</p>",
      }),
    );
    await page.goto(`/${locale}/virtual-tour`);
    const launch = page.locator(".tour-launch a[target='_blank']");
    await expect(launch).toHaveAttribute("href", "https://tour.test/index.htm");
    await expect(launch).toHaveAttribute("rel", "noopener noreferrer");
    await expect(launch).toHaveAttribute("aria-label", /.+/);
    const popupPromise = page.waitForEvent("popup");
    await launch.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL("https://tour.test/index.htm");
    await popup.waitForLoadState("domcontentloaded");
    expect(await popup.evaluate(() => window.opener === null)).toBe(true);
    await expect(page).toHaveURL(`/${locale}/virtual-tour`);
    await popup.close();
  });
}
