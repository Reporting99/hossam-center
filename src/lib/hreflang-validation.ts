// Defensive validation for dynamic (markdown-sourced) hreflang alternate
// URLs.
//
// Blog-post hreflang used to be built as getAlternates(lang, "/" + slug),
// i.e. "the same slug under the other locale prefix" -- which declared
// /ar/honda-maintenance-amman-en as the Arabic alternate of an English
// post: a URL that only rendered the English article again (duplicate
// content). Post pairs are now resolved explicitly (translationKey, see
// seo-content.ts), and every resulting alternate URL is checked here before
// it is emitted -- by the post page's metadata and by the sitemap. Invalid
// alternates are dropped, never repaired.
//
// Deliberately NOT a "contains Arabic characters" heuristic -- legitimate
// Arabic pages can contain English terms (Honda, ECU, ADAS) and vice versa.
// Instead this validates against the site's own route families
// (pageSlugTranslations in ./page-mappings, the authoritative route
// architecture).

import { getCanonicalUrl } from "./canonical-url"
import { LOCALES, getLanguageAlternates, pageSlugTranslations, type LanguageAlternates, type Locale } from "./page-mappings"
import { findForbiddenUrlPatterns } from "./url-invariants"
import { SITE_URL } from "./site-url"

export const SUPPORTED_LOCALES: readonly Locale[] = LOCALES

export type AlternateRejectionReason =
  | "UNSUPPORTED_LOCALE"
  | "EMPTY_URL"
  | "MALFORMED_URL"
  | "CROSS_ORIGIN"
  | "WRONG_LOCALE_PREFIX"
  | "MIXED_ROUTE_FAMILY"
  | "HIDDEN_CONTROL_CHARACTER"

export interface AlternateValidationResult {
  valid: boolean
  normalizedUrl?: string
  reason?: AlternateRejectionReason
}

function firstSegment(slug: string): string | undefined {
  return slug.split("/")[0] || undefined
}

// First path segment of each locale's own route families -- the ar-family
// roots that must never appear under /en/, and the en-family roots that must
// never appear under /ar/. Derived from pageSlugTranslations so this can
// never drift from the real route architecture: a family whose en and ar
// segments are identical (every family on this site today: "services",
// "blog", "about", ...) contributes nothing to either set, which is exactly
// correct -- /ar/services/Maintenance is a legitimate URL, not a mismatch.
// The moment a translated segment is introduced, it is guarded here
// automatically.
export function buildFamilyRootSets(
  translations: Record<string, Partial<Record<Locale, string>>> = pageSlugTranslations,
): { enOnly: Set<string>; arOnly: Set<string> } {
  const enOnly = new Set<string>()
  const arOnly = new Set<string>()
  for (const entry of Object.values(translations)) {
    const enSeg = entry.en ? firstSegment(entry.en) : undefined
    const arSeg = entry.ar ? firstSegment(entry.ar) : undefined
    if (enSeg && arSeg && enSeg !== arSeg) {
      enOnly.add(enSeg)
      arOnly.add(arSeg)
    }
  }
  return { enOnly, arOnly }
}

const { enOnly: EN_ONLY_FAMILY_ROOTS, arOnly: AR_ONLY_FAMILY_ROOTS } = buildFamilyRootSets()

export function validateAlternateLocale(locale: string): locale is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale)
}

/**
 * Validates that `url` (absolute, or site-relative) is a well-formed,
 * same-origin URL whose locale-prefixed path is internally consistent with
 * `locale` -- both the prefix itself and, where the route family is known,
 * the segment after it. Never fixes or invents a corrected URL; callers
 * must drop the alternate entirely on any non-valid result.
 */
export function validateAlternateUrlForLocale(
  url: string,
  locale: Locale,
  siteOrigin: string,
  familyRoots: { enOnly: Set<string>; arOnly: Set<string> } = { enOnly: EN_ONLY_FAMILY_ROOTS, arOnly: AR_ONLY_FAMILY_ROOTS },
): AlternateValidationResult {
  if (!url || !url.trim()) {
    return { valid: false, reason: "EMPTY_URL" }
  }

  let origin: URL
  try {
    origin = new URL(siteOrigin)
  } catch {
    return { valid: false, reason: "MALFORMED_URL" }
  }

  let parsed: URL
  try {
    parsed = new URL(url, origin)
  } catch {
    return { valid: false, reason: "MALFORMED_URL" }
  }

  if (parsed.origin !== origin.origin) {
    return { valid: false, reason: "CROSS_ORIGIN" }
  }

  let decodedPath: string
  try {
    decodedPath = decodeURIComponent(parsed.pathname)
  } catch {
    return { valid: false, reason: "MALFORMED_URL" }
  }

  const localeMatch = /^\/([a-z]{2})(\/.*)?$/.exec(decodedPath)
  if (!localeMatch || localeMatch[1] !== locale) {
    return { valid: false, reason: "WRONG_LOCALE_PREFIX" }
  }

  const rest = (localeMatch[2] ?? "").replace(/^\/+/, "")
  const routeSeg = firstSegment(rest)
  if (routeSeg) {
    const forbiddenRoots = locale === "en" ? familyRoots.arOnly : familyRoots.enOnly
    if (forbiddenRoots.has(routeSeg)) {
      return { valid: false, reason: "MIXED_ROUTE_FAMILY" }
    }
  }

  // A slug can carry a hidden Unicode bidi/format/control character even
  // when its route family and locale prefix are both otherwise correct (see
  // url-invariants.ts -- the same check the sitemap layer uses to drop
  // tainted entries), so a tainted URL is never offered as an hreflang
  // alternate on a sibling page either. The raw input is checked too because
  // URL parsing strips tab/CR/LF.
  if (
    [url, decodedPath].some((value) =>
      findForbiddenUrlPatterns(value).some((match) => match.reason === "HIDDEN_UNICODE_CONTROL_CHAR"),
    )
  ) {
    return { valid: false, reason: "HIDDEN_CONTROL_CHARACTER" }
  }

  return { valid: true, normalizedUrl: `${origin.origin}${decodedPath}${parsed.search}` }
}

/** Decodes and re-serializes `url` for comparison/output; null if malformed. */
export function normalizeAlternateUrl(url: string, siteOrigin: string): string | null {
  try {
    const parsed = new URL(url, siteOrigin)
    return `${parsed.origin}${decodeURIComponent(parsed.pathname)}${parsed.search}`
  } catch {
    return null
  }
}

export interface ShouldEmitParams {
  alternateLocale: string
  alternateUrl: string
  siteOrigin: string
}

/** Single entry point combining the locale and URL/route-family checks. */
export function shouldEmitHreflangAlternate(params: ShouldEmitParams): AlternateValidationResult {
  const { alternateLocale, alternateUrl, siteOrigin } = params
  if (!validateAlternateLocale(alternateLocale)) {
    return { valid: false, reason: "UNSUPPORTED_LOCALE" }
  }
  return validateAlternateUrlForLocale(alternateUrl, alternateLocale, siteOrigin)
}

export type AlternateSource = "blog-post-metadata" | "sitemap-blog-posts"

/**
 * Structured, single-line, greppable warning for a dropped alternate.
 * Never throws; invalid alternates are dropped, not fatal.
 */
export function logRejectedAlternate(context: {
  source: AlternateSource
  currentUrl: string
  alternateLocale: string
  alternateUrl: string
  reason: AlternateRejectionReason
}): void {
  console.warn(
    `[hreflang] timestamp="${new Date().toISOString()}" action="rejectAlternate" source="${context.source}" ` +
      `currentUrl="${context.currentUrl}" alternateLocale="${context.alternateLocale}" ` +
      `alternateUrl="${context.alternateUrl}" reason="${context.reason}"`,
  )
}

/**
 * hreflang for a dynamic item (blog post): returns the full reciprocal set
 * (every locale + x-default) only when a real item exists in EVERY locale
 * and every one of those URLs passes shouldEmitHreflangAlternate(). Anything
 * less returns undefined -- the page then declares no alternates at all,
 * rather than a partial or invented pair. Used by both the post page's
 * generateMetadata and the sitemap, so they always agree.
 */
export function getValidatedItemLanguageAlternates(
  pathsByLocale: Partial<Record<Locale, string>>,
  context: { source: AlternateSource; currentPath: string },
): LanguageAlternates | undefined {
  const complete: Partial<Record<Locale, string>> = {}
  for (const locale of LOCALES) {
    const path = pathsByLocale[locale]
    if (!path) return undefined
    const alternateUrl = getCanonicalUrl(path)
    const result = shouldEmitHreflangAlternate({ alternateLocale: locale, alternateUrl, siteOrigin: SITE_URL })
    if (!result.valid) {
      logRejectedAlternate({
        source: context.source,
        currentUrl: getCanonicalUrl(context.currentPath),
        alternateLocale: locale,
        alternateUrl,
        reason: result.reason ?? "MALFORMED_URL",
      })
      return undefined
    }
    complete[locale] = path
  }
  // Validated -- build through the one shared hreflang builder.
  return getLanguageAlternates(complete as Record<Locale, string>)
}
