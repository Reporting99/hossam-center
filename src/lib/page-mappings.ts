// Route registry: the single source of truth for every public page's path
// in each locale, the locale set, the x-default target, and the one
// hreflang builder used by page metadata AND the sitemap.
//
// This is a refactor of the previously hand-written paths
// (getAlternates(lang, "/about"), the sitemap's STATIC_PATHS list, ...),
// NOT a URL migration: every path below reproduces the live URL exactly,
// including the mixed-case service slugs (/services/AC-Gas-Service, ...),
// which are real, indexed URLs and must never be lowercased.

import { getCanonicalUrl } from "./canonical-url"

export type Locale = "en" | "ar"

export const LOCALES: readonly Locale[] = ["en", "ar"]

// The x-default hreflang target and the locale unprefixed requests are
// redirected to by middleware.ts. Arabic has always been this site's
// default; keep it.
export const DEFAULT_LOCALE: Locale = "ar"

export type CanonicalPageKey =
  | "home"
  | "about"
  | "contact"
  | "pricing"
  | "faqs"
  | "servicesListing"
  | "servicesCarComputerDiagnostic"
  | "servicesComputerSoftwareUpdate"
  | "servicesMaintenance"
  | "servicesAcGasService"
  | "servicesRadarCalibration"
  | "servicesSpareParts"
  | "blogListing"
  | "blogPost"
  | "terms"
  | "privacy"

export type ItemType = "blogPost"

export type StaticPageKey = Exclude<CanonicalPageKey, ItemType>

// Path segment(s) after the locale prefix; "" for the locale root. For an
// item type ("blogPost") this is the base path its items live under --
// blog posts are served directly under the locale root (/{lang}/{slug}),
// so it is "".
export const pageSlugTranslations: Record<CanonicalPageKey, Record<Locale, string>> = {
  home: { en: "", ar: "" },
  about: { en: "about", ar: "about" },
  contact: { en: "contact", ar: "contact" },
  pricing: { en: "pricing", ar: "pricing" },
  faqs: { en: "faqs", ar: "faqs" },
  servicesListing: { en: "services", ar: "services" },
  servicesCarComputerDiagnostic: { en: "services/Car-Computer-Diagnostic", ar: "services/Car-Computer-Diagnostic" },
  servicesComputerSoftwareUpdate: { en: "services/Computer-Software-Update", ar: "services/Computer-Software-Update" },
  servicesMaintenance: { en: "services/Maintenance", ar: "services/Maintenance" },
  servicesAcGasService: { en: "services/AC-Gas-Service", ar: "services/AC-Gas-Service" },
  servicesRadarCalibration: { en: "services/Radar-Calibration", ar: "services/Radar-Calibration" },
  servicesSpareParts: { en: "services/Spare-Parts", ar: "services/Spare-Parts" },
  blogListing: { en: "blog", ar: "blog" },
  blogPost: { en: "", ar: "" },
  terms: { en: "terms", ar: "terms" },
  privacy: { en: "privacy", ar: "privacy" },
}

const ITEM_TYPES: ReadonlySet<CanonicalPageKey> = new Set<CanonicalPageKey>(["blogPost"])

export const STATIC_PAGE_KEYS: readonly StaticPageKey[] = (Object.keys(pageSlugTranslations) as CanonicalPageKey[]).filter(
  (key): key is StaticPageKey => !ITEM_TYPES.has(key),
)

export const SERVICE_PAGE_KEYS = [
  "servicesCarComputerDiagnostic",
  "servicesComputerSoftwareUpdate",
  "servicesMaintenance",
  "servicesAcGasService",
  "servicesRadarCalibration",
  "servicesSpareParts",
] as const satisfies readonly StaticPageKey[]

export type ServicePageKey = (typeof SERVICE_PAGE_KEYS)[number]

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value)
}

/** Narrows a route param to a Locale, falling back to DEFAULT_LOCALE. */
export function toLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE
}

/**
 * Generates the full localized path for "static" or "listing" pages.
 */
export function getLocalizedStaticPath(pageKey: StaticPageKey, locale: Locale): string {
  const slugSegment = pageSlugTranslations[pageKey]?.[locale] ?? pageKey.toString()

  if (pageKey === "home" || !slugSegment) {
    return `/${locale}`
  }
  return `/${locale}/${slugSegment}`
}

const ITEM_LISTING_KEY: Record<ItemType, StaticPageKey> = {
  blogPost: "blogListing",
}

/**
 * A slug that cannot address a real item. `itemSlug` is typed `string`, but
 * it is populated from markdown frontmatter/filenames, which are untyped at
 * the boundary -- a missing value arrives as `null`/`undefined` and template
 * interpolation would silently emit `/en/null`. The literal strings are
 * checked as well as the values, since both produce the same broken URL.
 */
function isUnusableSlug(itemSlug: unknown): boolean {
  if (typeof itemSlug !== "string") return true

  const normalized = itemSlug.trim().toLowerCase()
  return normalized === "" || normalized === "null" || normalized === "undefined"
}

/**
 * Generates the full localized path for a dynamic item (a blog post).
 *
 * When the item has no usable slug this returns the item type's localized
 * listing page instead of a URL built around the missing value, so a link
 * stays useful and never points at a guaranteed 404.
 */
export function getLocalizedItemPath(itemType: ItemType, itemSlug: string, locale: Locale): string {
  if (isUnusableSlug(itemSlug)) {
    return getLocalizedStaticPath(ITEM_LISTING_KEY[itemType], locale)
  }

  const basePath = pageSlugTranslations[itemType]?.[locale] ?? ""
  return basePath ? `/${locale}/${basePath}/${itemSlug}` : `/${locale}/${itemSlug}`
}

export type LanguageAlternates = Record<Locale | "x-default", string>

/**
 * The single hreflang builder, used by page metadata (alternates.languages)
 * AND the sitemap (xhtml:link alternates), so the two can never disagree.
 * Takes one site-relative path per locale and returns absolute canonical
 * URLs for every locale plus x-default (-> DEFAULT_LOCALE's URL).
 */
export function getLanguageAlternates(pathsByLocale: Record<Locale, string>): LanguageAlternates {
  const alternates = {} as LanguageAlternates
  for (const locale of LOCALES) {
    alternates[locale] = getCanonicalUrl(pathsByLocale[locale])
  }
  alternates["x-default"] = getCanonicalUrl(pathsByLocale[DEFAULT_LOCALE])
  return alternates
}

/** Paths of a static page in every locale, for getLanguageAlternates(). */
export function getStaticPagePathsByLocale(pageKey: StaticPageKey): Record<Locale, string> {
  return Object.fromEntries(LOCALES.map((locale) => [locale, getLocalizedStaticPath(pageKey, locale)])) as Record<
    Locale,
    string
  >
}
