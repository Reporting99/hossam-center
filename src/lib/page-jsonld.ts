// Per-page JSON-LD composition (the Dfeelings `jsonLdSchemas` pattern),
// as pure functions so tests can build exactly what each page renders.
// Each page.tsx calls one of these and renders the result in exactly ONE
// <script type="application/ld+json"> via serializeJsonLd().

import type { FAQsProps } from "~/shared/types"
import { getCanonicalUrl } from "./canonical-url"
import { getPageCopy } from "./page-metadata"
import {
  SERVICE_PAGE_KEYS,
  getLocalizedStaticPath,
  type Locale,
  type ServicePageKey,
  type StaticPageKey,
} from "./page-mappings"
import {
  generateArticleSchema,
  generateBreadcrumbsSchema,
  generateFaqSchema,
  generateListingItemListSchema,
  generateOrganizationSchema,
  generateServiceSchema,
  generateWebPageSchema,
  generateWebsiteSchema,
  getFaqRef,
  getItemListRef,
  type BreadcrumbTrailItem,
  type FaqItem,
  type WebPageType,
} from "./schema"
import { getBlogPostLocale, getBlogPostPath, toIsoDateString, type BlogPostSeoCandidate } from "./seo-content"

export type JsonLdNode = Record<string, unknown>

function asText(value: unknown): string {
  if (typeof value === "string") return value.trim()
  if (typeof value === "number") return String(value)
  if (Array.isArray(value)) return value.filter((part) => typeof part === "string").join(" ").trim()
  return ""
}

/**
 * The FAQ question/answer pairs a FAQs widget renders, read from the SAME
 * props object the page passes to that widget: `items` (FAQs2/FAQs3) and
 * every tab's `items` (FAQs/FAQs4), flattened in render order. Entries
 * without both a text question and a text answer are skipped.
 */
export function faqItemsFromFaqsProps(props: FAQsProps | undefined): FaqItem[] {
  if (!props) return []
  const items = [...(props.items ?? []), ...(props.tabs ?? []).flatMap((tab) => tab.items ?? [])]
  return items
    .map((item) => ({ question: asText(item.title), answer: asText(item.description) }))
    .filter((item) => item.question && item.answer)
}

const PARENT_PAGE: Partial<Record<StaticPageKey, StaticPageKey>> = Object.fromEntries(
  SERVICE_PAGE_KEYS.map((key) => [key, "servicesListing"]),
)

function staticPageUrl(key: StaticPageKey, lang: Locale): string {
  return getCanonicalUrl(getLocalizedStaticPath(key, lang))
}

/** Home -> [parent] -> page, labels from PAGE_COPY, URLs from page-mappings. */
export function getStaticBreadcrumbTrail(key: StaticPageKey, lang: Locale): BreadcrumbTrailItem[] {
  const chain: StaticPageKey[] = []
  let cursor: StaticPageKey | undefined = key
  while (cursor && cursor !== "home") {
    chain.unshift(cursor)
    cursor = PARENT_PAGE[cursor]
  }
  return ["home" as StaticPageKey, ...chain].map((pageKey) => ({
    name: getPageCopy(pageKey, lang).breadcrumb,
    url: staticPageUrl(pageKey, lang),
  }))
}

function pushFaq(nodes: JsonLdNode[], faqs: FaqItem[] | undefined, url: string) {
  const faq = generateFaqSchema(faqs ?? [], url)
  if (faq) nodes.push(faq)
}

function getServiceOffers(lang: Locale) {
  return SERVICE_PAGE_KEYS.map((key) => ({ name: getPageCopy(key, lang).title, url: staticPageUrl(key, lang) }))
}

export function buildHomeJsonLd(lang: Locale, data: { faqs?: FaqItem[] } = {}): JsonLdNode[] {
  const url = staticPageUrl("home", lang)
  const copy = getPageCopy("home", lang)
  const nodes: JsonLdNode[] = [
    generateOrganizationSchema(lang, { offers: getServiceOffers(lang) }),
    generateWebsiteSchema(lang),
    generateWebPageSchema({ name: copy.title, description: copy.description }, url, lang),
  ]
  pushFaq(nodes, data.faqs, url)
  return nodes
}

const STATIC_PAGE_TYPE: Partial<Record<StaticPageKey, WebPageType>> = {
  about: "AboutPage",
  contact: "ContactPage",
}

/** about, contact, pricing, faqs, terms, privacy. */
export function buildStaticPageJsonLd(
  key: Exclude<StaticPageKey, "home" | "servicesListing" | "blogListing" | ServicePageKey>,
  lang: Locale,
  data: { faqs?: FaqItem[] } = {},
): JsonLdNode[] {
  const url = staticPageUrl(key, lang)
  const copy = getPageCopy(key, lang)
  const hasFaq = (data.faqs?.length ?? 0) > 0
  const nodes: JsonLdNode[] = [
    generateBreadcrumbsSchema(getStaticBreadcrumbTrail(key, lang), url),
    generateWebPageSchema(
      {
        name: copy.title,
        description: copy.description,
        type: STATIC_PAGE_TYPE[key],
        breadcrumb: true,
        // The FAQ page's primary content IS its FAQ list.
        ...(key === "faqs" && hasFaq ? { mainEntity: { "@id": getFaqRef(url) } } : {}),
      },
      url,
      lang,
    ),
  ]
  pushFaq(nodes, data.faqs, url)
  return nodes
}

export function buildServicesListingJsonLd(lang: Locale, data: { faqs?: FaqItem[] } = {}): JsonLdNode[] {
  const url = staticPageUrl("servicesListing", lang)
  const copy = getPageCopy("servicesListing", lang)
  const nodes: JsonLdNode[] = [
    generateBreadcrumbsSchema(getStaticBreadcrumbTrail("servicesListing", lang), url),
    generateWebPageSchema(
      {
        name: copy.title,
        description: copy.description,
        type: "CollectionPage",
        breadcrumb: true,
        mainEntity: { "@id": getItemListRef(url) },
      },
      url,
      lang,
    ),
    generateListingItemListSchema(getServiceOffers(lang), url),
  ]
  pushFaq(nodes, data.faqs, url)
  return nodes
}

export function buildServicePageJsonLd(key: ServicePageKey, lang: Locale, data: { faqs?: FaqItem[] } = {}): JsonLdNode[] {
  const url = staticPageUrl(key, lang)
  const copy = getPageCopy(key, lang)
  const nodes: JsonLdNode[] = [
    generateBreadcrumbsSchema(getStaticBreadcrumbTrail(key, lang), url),
    generateWebPageSchema({ name: copy.title, description: copy.description, breadcrumb: true }, url, lang),
    generateServiceSchema({ name: copy.title, description: copy.description }, url, lang),
  ]
  pushFaq(nodes, data.faqs, url)
  return nodes
}

type ListedPost = BlogPostSeoCandidate & { slug: string; title: string }

export function buildBlogListingJsonLd(lang: Locale, posts: ListedPost[]): JsonLdNode[] {
  const url = staticPageUrl("blogListing", lang)
  const copy = getPageCopy("blogListing", lang)
  const nodes: JsonLdNode[] = [
    generateBreadcrumbsSchema(getStaticBreadcrumbTrail("blogListing", lang), url),
    generateWebPageSchema(
      {
        name: copy.title,
        description: copy.description,
        type: "CollectionPage",
        breadcrumb: true,
        ...(posts.length > 0 ? { mainEntity: { "@id": getItemListRef(url) } } : {}),
      },
      url,
      lang,
    ),
  ]
  if (posts.length > 0) {
    nodes.push(
      generateListingItemListSchema(
        posts.map((post) => ({ name: post.title, url: getCanonicalUrl(getBlogPostPath(post)) })),
        url,
      ),
    )
  }
  return nodes
}

export function buildBlogPostJsonLd(post: ListedPost): JsonLdNode[] {
  const lang = getBlogPostLocale(post)
  const url = getCanonicalUrl(getBlogPostPath(post))
  const description = asText(post.description)
  const image = typeof post.image === "string" && post.image.trim() ? post.image.trim() : undefined
  const datePublished = toIsoDateString(post.publishDate)
  const dateModified = toIsoDateString(post.updateDate)
  const trail: BreadcrumbTrailItem[] = [
    ...getStaticBreadcrumbTrail("blogListing", lang),
    { name: post.title, url },
  ]
  const nodes: JsonLdNode[] = [
    generateBreadcrumbsSchema(trail, url),
    generateWebPageSchema(
      {
        name: post.title,
        description,
        breadcrumb: true,
        primaryImageOfPage: image,
        datePublished,
        dateModified,
      },
      url,
      lang,
    ),
  ]
  // An Article without a real publication date would be invalid; the post
  // page still gets its WebPage/BreadcrumbList.
  if (datePublished) {
    nodes.push(
      generateArticleSchema(
        {
          headline: post.title,
          description,
          image,
          datePublished,
          dateModified,
          type: "BlogPosting",
          inLanguage: lang,
        },
        url,
      ),
    )
  }
  return nodes
}
