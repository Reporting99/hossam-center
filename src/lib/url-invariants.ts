// Structural gate against known "machine-generated garbage" URL shapes,
// independent of any single generator.
//
// src/lib/hreflang-validation.ts blocks the mixed-locale family at its
// emission points (blog-post metadata and the sitemap) using
// route-architecture-aware logic (pageSlugTranslations). This module is a
// deliberately dumber, string-level backstop for that and other known
// garbage shapes -- literal "/&" segments, stray undefined/null/[object
// Object] stringification bugs, invisible Unicode bidi/format control
// characters hidden inside a slug, double percent-encoding, dev-artifact
// segments, non-production hosts, and query strings/fragments (a sitemap
// <loc> or canonical must carry neither) -- so that ANY URL producer
// (sitemap, canonical, OG, JSON-LD, a new page type) is covered even if it
// never calls hreflang-validation.ts at all.
//
// Every rule matches a structural shape (an exact path segment, a literal
// substring only meaningful as a URL artifact, or a Unicode category),
// never a keyword inside legitimate content -- e.g. "test" only matches as
// a whole path segment ("/test/"), never as a substring of a real slug.

import { PREFERRED_HOST, SITE_URL } from "./site-url"

export type ForbiddenUrlReason =
  | "LITERAL_AMPERSAND_SEGMENT"
  | "STRINGIFIED_NULLISH"
  | "DOUBLE_SLASH"
  | "HIDDEN_UNICODE_CONTROL_CHAR"
  | "DOUBLE_PERCENT_ENCODING"
  | "DEV_ARTIFACT_SEGMENT"
  | "NON_PRODUCTION_HOST"
  | "QUERY_STRING"
  | "FRAGMENT"

export interface ForbiddenUrlMatch {
  reason: ForbiddenUrlReason
  detail: string
}

// Explicit bidi/format control codepoints, plus the general Unicode "Cf"
// (format) category as a backstop for anything not individually
// enumerated, plus C0/C1 control characters.
const EXPLICIT_BIDI_CONTROL_CHARS = /[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/
// Built via the RegExp constructor: tsconfig targets ES5, where TypeScript
// rejects the /u flag in a regex literal.
const UNICODE_FORMAT_CATEGORY = new RegExp("\\p{Cf}", "u")
const C0_C1_CONTROL_CHARS = /[\u0000-\u001F\u007F-\u009F]/

// Only ever matched as a *whole* path segment, never a substring -- see
// module comment. Lowercased comparison so "/Test/" is also caught.
const DEV_ARTIFACT_SEGMENTS = new Set(["test", "fixture", "fixtures", "mock", "mocks", "temp", "debug"])

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "[::1]"])

/**
 * Returns every forbidden-shape match found in `rawUrl`. Never throws --
 * an unparseable value is itself inspected as a raw string rather than
 * skipped, since a genuinely malformed URL is a finding, not an exemption.
 * Pure and side-effect-free; callers decide what to do with the result
 * (reject/drop the URL, log it, fail a CI gate, etc.). Site-relative input
 * is resolved against SITE_URL, so it can never trip NON_PRODUCTION_HOST.
 */
export function findForbiddenUrlPatterns(rawUrl: string): ForbiddenUrlMatch[] {
  const matches: ForbiddenUrlMatch[] = []
  if (!rawUrl) return matches

  let encodedPathAndSearch = rawUrl
  let host = ""
  let search = ""
  let hash = ""
  try {
    const parsed = new URL(rawUrl, SITE_URL)
    host = parsed.hostname
    search = parsed.search
    hash = parsed.hash
    encodedPathAndSearch = parsed.pathname + parsed.search
  } catch {
    // Fall through and run the string-level checks against the raw value.
  }

  // URL's own .pathname getter percent-encodes non-ASCII characters (and
  // control/bidi characters along with them), which would otherwise hide
  // exactly the invisible characters this function exists to catch. Every
  // check below except double-percent-encoding (which must see the
  // still-encoded "%25XX" literal) runs against this decoded form.
  let pathname = encodedPathAndSearch
  try {
    pathname = decodeURIComponent(encodedPathAndSearch)
  } catch {
    // Malformed percent-encoding -- fall back to the raw (encoded) form.
  }

  // Loopback hosts are listed explicitly; any other host that is not the
  // preferred one (www.<host>, a staging host, ...) is equally non-canonical.
  if (host && (LOOPBACK_HOSTS.has(host) || host !== PREFERRED_HOST)) {
    matches.push({ reason: "NON_PRODUCTION_HOST", detail: host })
  }

  // A trailing bare "?" or "#" serializes to an empty search/hash, so the
  // raw string is checked as well.
  if (search || /\?/.test(rawUrl.replace(/#.*$/, ""))) {
    matches.push({ reason: "QUERY_STRING", detail: search || rawUrl })
  }
  if (hash || rawUrl.includes("#")) {
    matches.push({ reason: "FRAGMENT", detail: hash || rawUrl })
  }

  if (/%25[0-9A-Fa-f]{2}/.test(encodedPathAndSearch)) {
    matches.push({ reason: "DOUBLE_PERCENT_ENCODING", detail: encodedPathAndSearch })
  }

  const segments = pathname.split("/").filter(Boolean)
  if (segments.some((segment) => segment === "&" || segment.startsWith("&"))) {
    matches.push({ reason: "LITERAL_AMPERSAND_SEGMENT", detail: pathname })
  }
  if (segments.some((segment) => segment === "undefined" || segment === "null" || segment === "[object Object]")) {
    matches.push({ reason: "STRINGIFIED_NULLISH", detail: pathname })
  }
  if (segments.some((segment) => DEV_ARTIFACT_SEGMENTS.has(segment.toLowerCase()))) {
    matches.push({ reason: "DEV_ARTIFACT_SEGMENT", detail: pathname })
  }

  if (/\/\//.test(pathname)) {
    matches.push({ reason: "DOUBLE_SLASH", detail: pathname })
  }

  // The raw value is checked too: the WHATWG parser silently strips tab/CR/LF
  // from its input, so a slug carrying one would otherwise look clean after
  // parsing while the raw string still reaches whoever emits it.
  if (
    C0_C1_CONTROL_CHARS.test(rawUrl) ||
    EXPLICIT_BIDI_CONTROL_CHARS.test(pathname) ||
    UNICODE_FORMAT_CATEGORY.test(pathname) ||
    C0_C1_CONTROL_CHARS.test(pathname)
  ) {
    matches.push({ reason: "HIDDEN_UNICODE_CONTROL_CHAR", detail: pathname })
  }

  return matches
}

export function isForbiddenUrl(rawUrl: string): boolean {
  return findForbiddenUrlPatterns(rawUrl).length > 0
}
