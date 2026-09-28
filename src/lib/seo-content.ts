// Indexability layer: the one place that decides which static pages and
// which dynamic content items are eligible for the sitemap, hreflang and
// listing pages. The sitemap, robots, the blog listing and the blog post
// page all call through here -- no exclusion logic is scattered elsewhere.

import { LOCALES, DEFAULT_LOCALE, getLocalizedItemPath, isLocale, type Locale, type StaticPageKey, STATIC_PAGE_KEYS } from "./page-mappings"
import { findForbiddenUrlPatterns } from "./url-invariants"

// Static pages that render but must not be indexed (robots noindex, absent
// from the sitemap). None today -- every static page on this site is public
// content.
export const NOINDEX_PAGE_KEYS: ReadonlySet<StaticPageKey> = new Set<StaticPageKey>()

// Static pages that are private (disallowed in robots.txt, noindexed,
// absent from the sitemap). None today -- the site has no auth/account area.
export const PRIVATE_PAGE_KEYS: ReadonlySet<StaticPageKey> = new Set<StaticPageKey>()

export function isIndexableStaticPage(key: StaticPageKey): boolean {
  return !NOINDEX_PAGE_KEYS.has(key) && !PRIVATE_PAGE_KEYS.has(key)
}

/** Static page keys that belong in the sitemap, in registry order. */
export const SITEMAP_STATIC_PAGE_KEYS: readonly StaticPageKey[] = STATIC_PAGE_KEYS.filter(isIndexableStaticPage)

// Blog post slugs retired via a redirect whose markdown file must stay in
// the repo for now. Filtering here keeps a retired slug out of the sitemap,
// hreflang pairs and the listing page in one place. None today.
export const RETIRED_BLOG_POST_SLUGS: ReadonlySet<string> = new Set<string>()

/** Frontmatter fields (plus the filename slug) the SEO layer relies on. */
export interface BlogPostSeoCandidate {
  slug?: unknown
  title?: unknown
  description?: unknown
  lang?: unknown
  draft?: unknown
  publishDate?: unknown
  updateDate?: unknown
  image?: unknown
  // Explicit translation link: the en and ar versions of the same article
  // carry the same value. Filenames are NOT used for pairing -- a "-en"/"-ar"
  // suffix is a naming convention, not a contract.
  translationKey?: unknown
}

function isUsableSlug(slug: unknown): slug is string {
  if (typeof slug !== "string") return false
  const normalized = slug.trim().toLowerCase()
  return normalized !== "" && normalized !== "null" && normalized !== "undefined"
}

/**
 * A post is indexable when it is published (not `draft: true`), has a usable
 * slug and a title, its slug carries no hidden control/format characters,
 * and it is not retired.
 */
export function isIndexableBlogPost(post: BlogPostSeoCandidate | null | undefined): boolean {
  if (!post) return false
  if (post.draft === true) return false
  if (!isUsableSlug(post.slug)) return false
  if (typeof post.title !== "string" || !post.title.trim()) return false
  if (findForbiddenUrlPatterns(`/${post.slug}`).some((match) => match.reason === "HIDDEN_UNICODE_CONTROL_CHAR")) {
    return false
  }
  if (RETIRED_BLOG_POST_SLUGS.has(post.slug)) return false
  return true
}

/**
 * The locale a post is written in: its `lang` frontmatter, or the site
 * default for a post without one (matching the pre-existing
 * generateStaticParams fallback).
 */
export function getBlogPostLocale(post: BlogPostSeoCandidate): Locale {
  return isLocale(post.lang) ? post.lang : DEFAULT_LOCALE
}

/** The post's one canonical path: its own slug under its own locale. */
export function getBlogPostPath(post: BlogPostSeoCandidate & { slug: string }): string {
  return getLocalizedItemPath("blogPost", post.slug, getBlogPostLocale(post))
}

function getTranslationKey(post: BlogPostSeoCandidate): string | undefined {
  return typeof post.translationKey === "string" && post.translationKey.trim() ? post.translationKey.trim() : undefined
}

/**
 * Paths of `post` and of its real translations, keyed by locale. A sibling
 * is included only when it is indexable, shares the post's translationKey,
 * and is the ONLY indexable post with that key in its locale (an ambiguous
 * pair is dropped, never guessed). A post without a translationKey maps to
 * its own locale only -- no hreflang is emitted for it.
 */
export function getBlogPostPathsByLocale(
  post: BlogPostSeoCandidate & { slug: string },
  allPosts: readonly BlogPostSeoCandidate[],
): Partial<Record<Locale, string>> {
  const ownLocale = getBlogPostLocale(post)
  const paths: Partial<Record<Locale, string>> = { [ownLocale]: getBlogPostPath(post) }
  const key = getTranslationKey(post)
  if (!key) return paths

  const postsWithKeyIn = (locale: Locale) =>
    allPosts.filter(
      (candidate) =>
        isIndexableBlogPost(candidate) && getBlogPostLocale(candidate) === locale && getTranslationKey(candidate) === key,
    ) as (BlogPostSeoCandidate & { slug: string })[]

  // Pairing must be mutual: if another post in the SAME locale claims this
  // key, every post with it is ambiguous and none gets a sibling -- otherwise
  // A-en -> B-ar could be declared while B-ar cannot point back.
  if (postsWithKeyIn(ownLocale).filter((candidate) => candidate.slug !== post.slug).length > 0) return paths

  for (const locale of LOCALES) {
    if (locale === ownLocale) continue
    const siblings = postsWithKeyIn(locale)
    if (siblings.length === 1) paths[locale] = getBlogPostPath(siblings[0])
  }
  return paths
}

/**
 * Parses a real content timestamp (frontmatter publishDate/updateDate) into
 * a Date, or undefined when absent/unparseable -- never "now". Frontmatter
 * dates on this site use the "Jun 24 2026" form, which JavaScript would
 * otherwise parse in the server's local time zone; they are pinned to UTC so
 * the sitemap lastmod and Article dates never depend on the host's TZ.
 * gray-matter turns unquoted YAML dates into Date objects, so those are
 * accepted as well.
 */
export function toValidLastModified(value: unknown): Date | undefined {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? undefined : value
  if (typeof value !== "string" || !value.trim()) return undefined
  const trimmed = value.trim()

  const candidates = /^\d{4}-\d{2}-\d{2}T/.test(trimmed) ? [trimmed] : [`${trimmed} UTC`, trimmed]
  for (const candidate of candidates) {
    const parsed = new Date(candidate)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }
  return undefined
}

/** ISO 8601 form of a content timestamp (for schema.org dates), or undefined. */
export function toIsoDateString(value: unknown): string | undefined {
  return toValidLastModified(value)?.toISOString()
}
