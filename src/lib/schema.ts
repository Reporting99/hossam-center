// All JSON-LD builders and the one serializer. Every builder returns ONE
// node carrying its own "@context" (never a @graph); a page composes the
// nodes it needs into a single array and renders it in exactly one
// <script type="application/ld+json"> via serializeJsonLd(). No schema
// object literals live anywhere else (pages, layouts, components).
//
// Every `currentUrl` argument is the page's canonical URL, i.e. the output
// of getCanonicalUrl() -- the same string used for <link rel=canonical>,
// og:url, hreflang-self and the sitemap <loc>.

import { getCanonicalUrl } from "./canonical-url"
import type { Locale } from "./page-mappings"
import { ORGANIZATION_ID, ORGANIZATION_TYPE, WEBSITE_ID, getOrganizationRef, getWebsiteRef } from "./schema-refs"
import { SITE_URL } from "./site-url"

export { ORGANIZATION_ID, ORGANIZATION_TYPE, WEBSITE_ID, getOrganizationRef, getWebsiteRef }

const SCHEMA_CONTEXT = "https://schema.org" as const

export const ORG_NAME: Record<Locale, string> = {
  en: "Hossam Maintenance Center",
  ar: "مركز حسام لصيانة سيارات هوندا",
}

/**
 * The one safe way to serialize JSON-LD into a <script> tag's
 * dangerouslySetInnerHTML. JSON.stringify alone does not escape "<", so any
 * content string (a post title, an FAQ answer, ...) containing "</script>"
 * would otherwise close the script element early and let the rest of its
 * value be parsed as HTML. Escaping "<" to its unicode escape neutralizes
 * that without changing the decoded JSON value. U+2028/U+2029 are escaped as
 * well (valid in JSON, historically line terminators in JS source). Every
 * JSON-LD script must go through this instead of calling JSON.stringify.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029")
}

export function getWebPageRef(pageUrl: string): string {
  return `${pageUrl}#webpage`
}

export function getBreadcrumbRef(pageUrl: string): string {
  return `${pageUrl}#breadcrumb`
}

export function getServiceRef(pageUrl: string): string {
  return `${pageUrl}#service`
}

export function getArticleRef(pageUrl: string): string {
  return `${pageUrl}#article`
}

export function getFaqRef(pageUrl: string): string {
  return `${pageUrl}#faq`
}

export function getItemListRef(pageUrl: string): string {
  return `${pageUrl}#itemlist`
}

function slugifyEnglish(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function getPersonRef(name: string): string {
  return `${SITE_URL}/#person-${slugifyEnglish(name)}`
}

// ---------------------------------------------------------------------------
// Organization / WebSite (homepage only)
// ---------------------------------------------------------------------------

// Real business facts, taken only from this repository's own content (the
// contact page, footer, FAQ answers and llms.txt). Deliberately absent: an
// email address (the site publishes none), Saturday hours (not stated
// anywhere -- only "Sunday to Thursday, Friday closed"), ratings (no review
// data exists), and a building photo (the only one lives under src/assets and
// was never served at the URL the old inline schema claimed).
const LOGO_PATH = "/Website Logo.png"
const LOGO_WIDTH = 430
const LOGO_HEIGHT = 185

export interface OrganizationOffer {
  name: string
  /** Canonical URL of the service page that defines the Service node. */
  url: string
}

/**
 * Full Organization (AutoRepair) node. Emitted ONLY on the homepage; every
 * other page references it via getOrganizationRef(). `offers` lists the
 * site's service pages: each becomes an Offer whose itemOffered references
 * the Service node that page defines (by @id) instead of duplicating it.
 */
export function generateOrganizationSchema(lang: Locale, options: { offers?: OrganizationOffer[] } = {}) {
  const isAr = lang === "ar"
  const logoUrl = getCanonicalUrl(LOGO_PATH)
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": ORGANIZATION_TYPE,
    "@id": ORGANIZATION_ID,
    name: ORG_NAME[lang],
    alternateName: ORG_NAME[isAr ? "en" : "ar"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: LOGO_WIDTH,
      height: LOGO_HEIGHT,
    },
    image: logoUrl,
    description: isAr
      ? "مركز حسام المتخصص في صيانة سيارات هوندا وتوفير قطع الغيار الأصلية ومعايرة الرادار وفحص كمبيوتر وتحديث برمجيات هوندا في عمان، الأردن."
      : "Hossam Maintenance Center specialized in Honda car maintenance, original spare parts, radar calibration, computer diagnostics, and software updates in Amman, Jordan.",
    telephone: ["+962797996020", "+962795328713"],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: isAr ? "شارع الشهيد" : "Al-Shahid Road",
      addressLocality: isAr ? "عمان" : "Amman",
      addressCountry: "JO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.999758,
      longitude: 36.000426,
    },
    hasMap: "https://share.google/S6jgdB6WK3Iy9qppS",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/HondaHousam",
      "https://www.instagram.com/housammainten/",
      "https://www.tiktok.com/@housam.maintenance.honda",
    ],
    ...(options.offers && options.offers.length > 0
      ? {
          makesOffer: options.offers.map((offer) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": getServiceRef(offer.url),
              name: offer.name,
            },
          })),
        }
      : {}),
  }
}

export function generateWebsiteSchema(lang: Locale) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: ORG_NAME[lang],
    url: SITE_URL,
    inLanguage: lang,
    publisher: getOrganizationRef(),
  }
}

// ---------------------------------------------------------------------------
// Per-page nodes
// ---------------------------------------------------------------------------

export type WebPageType = "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage" | "FAQPage" | "ItemPage"

export function generateWebPageSchema(
  data: {
    name: string
    description: string
    type?: WebPageType
    /** true when the page also emits generateBreadcrumbsSchema() for currentUrl. */
    breadcrumb?: boolean
    primaryImageOfPage?: string
    datePublished?: string
    dateModified?: string
    about?: { "@type"?: string; "@id": string }
    mainEntity?: { "@id": string }
  },
  currentUrl: string,
  lang: Locale,
) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": data.type ?? "WebPage",
    "@id": getWebPageRef(currentUrl),
    name: data.name,
    description: data.description,
    url: currentUrl,
    inLanguage: lang,
    isPartOf: {
      ...getWebsiteRef(),
      publisher: getOrganizationRef(),
    },
    about: data.about ?? getOrganizationRef(),
    ...(data.breadcrumb ? { breadcrumb: { "@id": getBreadcrumbRef(currentUrl) } } : {}),
    ...(data.mainEntity ? { mainEntity: data.mainEntity } : {}),
    ...(data.primaryImageOfPage
      ? { primaryImageOfPage: { "@type": "ImageObject", url: data.primaryImageOfPage } }
      : {}),
    // Only emit dates when a real content timestamp exists (blog posts).
    // Fabricating "now" on static pages falsely signals fresh updates.
    ...(data.datePublished ? { datePublished: data.datePublished } : {}),
    ...(data.dateModified ? { dateModified: data.dateModified } : {}),
  }
}

export interface BreadcrumbTrailItem {
  name: string
  url: string
}

/**
 * BreadcrumbList for currentUrl. `trail` is built by the caller from
 * page-mappings paths + the page's labels, Home first, ending with the
 * current page.
 */
export function generateBreadcrumbsSchema(trail: BreadcrumbTrailItem[], currentUrl: string) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    "@id": getBreadcrumbRef(currentUrl),
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateServiceSchema(
  service: { name: string; description: string; serviceType?: string },
  currentUrl: string,
  lang: Locale,
  areaServed?: { "@type": string; name: string } | { "@type": string; name: string }[],
) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Service",
    "@id": getServiceRef(currentUrl),
    name: service.name,
    serviceType: service.serviceType ?? service.name,
    description: service.description,
    url: currentUrl,
    provider: getOrganizationRef(),
    areaServed: areaServed ?? { "@type": "City", name: lang === "ar" ? "عمان" : "Amman" },
  }
}

export interface FaqItem {
  question: string
  answer: string
}

/**
 * FAQPage from the SAME array the page renders visibly. Returns null for an
 * empty list so callers can push it conditionally.
 */
export function generateFaqSchema(faqItems: FaqItem[], currentUrl?: string) {
  if (!faqItems.length) return null
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    ...(currentUrl ? { "@id": getFaqRef(currentUrl) } : {}),
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

/**
 * Article/BlogPosting for a post page. Author and publisher reference the
 * Organization -- the site attributes posts to the business, not to a named
 * person. Dates must already be ISO 8601 (see toIsoDateString in
 * ./seo-content).
 */
export function generateArticleSchema(
  data: {
    headline: string
    description: string
    image?: string
    datePublished: string
    dateModified?: string
    type?: "Article" | "BlogPosting"
    inLanguage: Locale
  },
  currentUrl: string,
) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": data.type ?? "Article",
    "@id": getArticleRef(currentUrl),
    headline: data.headline,
    description: data.description,
    ...(data.image ? { image: data.image } : {}),
    datePublished: data.datePublished,
    ...(data.dateModified ? { dateModified: data.dateModified } : {}),
    inLanguage: data.inLanguage,
    url: currentUrl,
    author: getOrganizationRef(),
    publisher: getOrganizationRef(),
    mainEntityOfPage: { "@id": getWebPageRef(currentUrl) },
  }
}

/** ItemList used as a listing page's mainEntity (services, blog). */
export function generateListingItemListSchema(items: { name: string; url: string }[], currentUrl: string) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "ItemList",
    "@id": getItemListRef(currentUrl),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  }
}

/** Person linked back to the Organization (no page on this site uses it yet). */
export function generatePersonSchema(member: { name: string; jobTitle?: string; image?: string }) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Person",
    "@id": getPersonRef(member.name),
    name: member.name,
    ...(member.jobTitle ? { jobTitle: member.jobTitle } : {}),
    ...(member.image ? { image: member.image } : {}),
    worksFor: getOrganizationRef(),
  }
}
