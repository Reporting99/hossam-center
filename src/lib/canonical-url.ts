import { SITE_URL } from "./site-url"

// Central normalization so sitemap <loc> values textually match the
// canonical/og:url/hreflang-self URL Next.js's Metadata API emits for the
// same page.
//
// Root cause this guards against: app/[lang]/layout.tsx sets
// `metadataBase`, so every string Next.js receives for
// `alternates.canonical`, `openGraph.url`, and `alternates.languages` is
// resolved via `new URL(value, metadataBase)` internally -- and per the
// WHATWG URL spec, that resolution always percent-encodes characters that
// are not URL-safe in the serialized `.href` (non-ASCII path segments, the
// space in a public file name such as "/Website Logo.png", ...). There is no
// supported way to make the Metadata API emit the decoded form.
//
// app/sitemap.ts (Next's built-in Sitemap Route convention) and JSON-LD do
// not go through that resolution -- they serialize whatever string they're
// given verbatim. Without this function the same resource could be declared
// under two different strings (sitemap vs. canonical), which is exactly the
// "Duplicate, Google chose different canonical" failure mode.
//
// This function makes every other URL producer match canonical/og/hreflang
// (the side that cannot be changed), never the reverse. It re-serializes via
// the same URL class Next's own metadata resolution uses, so the two are
// guaranteed to agree byte-for-byte. It never changes which resource a URL
// points to, never changes letter case (the mixed-case /services/... slugs
// are live URLs), never translates a slug and never guesses a route mapping
// -- pure string re-serialization of an already-correct absolute URL. It is
// idempotent on already-encoded input.
export function toCanonicalUrlString(absoluteUrl: string): string {
  return new URL(absoluteUrl).href
}

/**
 * The single site-relative-path -> absolute-URL builder. Used by metadata
 * canonical, hreflang (via getLanguageAlternates), og:url, sitemap <loc>,
 * and every JSON-LD url/@id, so all of them are the same string for the
 * same page.
 *
 * `path` is a site-relative path ("/en/about", "/ar", "/Website Logo.png").
 * A missing leading slash is added; a trailing slash is removed (the site
 * runs with trailingSlash: false, so "/en/about/" is never a canonical
 * form). "" and "/" resolve to the bare origin.
 */
export function getCanonicalUrl(path: string): string {
  let normalizedPath = path.trim()
  if (normalizedPath && !normalizedPath.startsWith("/")) normalizedPath = `/${normalizedPath}`
  normalizedPath = normalizedPath.replace(/\/+$/, "")
  return toCanonicalUrlString(`${SITE_URL}${normalizedPath}`)
}
