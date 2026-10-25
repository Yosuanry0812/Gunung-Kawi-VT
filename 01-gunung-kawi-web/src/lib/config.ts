export function validateTourUrl(
  raw: string | undefined,
  production = process.env.NODE_ENV === "production",
): string | null {
  if (!raw?.trim()) return null;
  try {
    const url = new URL(raw.trim());
    if (url.username || url.password) return null;
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if (
      url.protocol !== "https:" &&
      !(url.protocol === "http:" && local && !production)
    )
      return null;
    if (url.hostname.endsWith(".example") || url.hostname === "example.com")
      return null;
    return url.href;
  } catch {
    return null;
  }
}
export const tourUrl = validateTourUrl(
  process.env.NEXT_PUBLIC_VIRTUAL_TOUR_URL,
);
export function getSiteOrigin() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return "http://localhost:3000";
  const parsed = new URL(value);
  if (
    !["https:", "http:"].includes(parsed.protocol) ||
    parsed.username ||
    parsed.password
  )
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without credentials.",
    );
  return parsed.origin;
}
