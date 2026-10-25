import test from "node:test";
import assert from "node:assert/strict";
import { validateTourUrl } from "../src/lib/config";
import {
  href,
  locales,
  pageKeys,
  resolvePage,
  slugs,
} from "../src/i18n/routing";
import { scenes } from "../src/content/locations";
test("empty and unsafe tour URLs never create a launch destination", () => {
  for (const value of [
    undefined,
    "",
    "  ",
    "javascript:alert(1)",
    "data:text/html,test",
    "//tour.test",
    "/tour",
    "http://tour.test/index.htm",
    "https://user:secret@tour.test",
    "https://tour.gunungkawi.example/index.htm",
    "garbage",
  ])
    assert.equal(validateTourUrl(value, true), null, String(value));
});
test("HTTPS exports retain their path and query", () => {
  assert.equal(
    validateTourUrl(" https://tour.test/index.htm?language=en-US ", true),
    "https://tour.test/index.htm?language=en-US",
  );
});
test("HTTP localhost is development only", () => {
  for (const host of ["localhost", "127.0.0.1", "[::1]"]) {
    assert.equal(
      validateTourUrl(`http://${host}:8080/index.htm`, false),
      `http://${host}:8080/index.htm`,
    );
    assert.equal(validateTourUrl(`http://${host}:8080/index.htm`, true), null);
  }
  assert.equal(validateTourUrl("http://localhost.evil.test", false), null);
});
test("all five page keys round-trip in both locales", () => {
  for (const locale of locales)
    for (const key of pageKeys) {
      assert.equal(resolvePage(locale, slugs[locale][key]), key);
      assert.equal(href(locale, key).split("/")[1], locale);
    }
  assert.equal(resolvePage("en", "sejarah"), undefined);
  assert.equal(href("en", "history"), "/en/history");
  assert.equal(href("id", "history"), "/id/sejarah");
});
test("all nine scenes remain planned and have permission metadata", () => {
  assert.equal(scenes.length, 9);
  assert.equal(new Set(scenes.map((s) => s.sceneId)).size, 9);
  assert.ok(
    scenes.every(
      (s) =>
        s.assetStatus === "planned" && s.permissionNotes && s.narrationPlan,
    ),
  );
});
