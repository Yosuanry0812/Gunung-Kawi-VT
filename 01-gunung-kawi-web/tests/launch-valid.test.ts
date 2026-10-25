import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
test("configured tour renders an accessible new-tab link in each language", async () => {
  process.env.NEXT_PUBLIC_VIRTUAL_TOUR_URL = "https://tour.test/index.htm";
  const { VirtualTourLaunchButton } =
    await import("../src/components/virtual-tour-launch-button");
  for (const locale of ["id", "en"] as const) {
    const html = renderToStaticMarkup(
      createElement(VirtualTourLaunchButton, { locale }),
    );
    assert.match(html, /href="https:\/\/tour.test\/index.htm"/);
    assert.match(html, /target="_blank"/);
    assert.match(html, /rel="noopener noreferrer"/);
    assert.match(html, /aria-label="[^"]+"/);
    assert.doesNotMatch(html, /disabled/);
  }
});
