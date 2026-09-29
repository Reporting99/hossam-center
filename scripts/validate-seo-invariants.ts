// SEO regression gate. Validates every indexable static route -- resolved
// from src/lib/page-mappings.ts + seo-content.ts, never hardcoded -- in both
// locales against a fixed set of SEO/schema invariants, plus the unknown-
// route 404 and the wrong-locale blog redirect. Prints concise pass/fail
// findings only; writes nothing to disk.
//
// Usage: SEO_VALIDATION_BASE_URL=http://127.0.0.1:3462 node_modules/.bin/jiti scripts/validate-seo-invariants.ts

import { getCanonicalUrl } from "../src/lib/canonical-url"
import { LOCALES, getLanguageAlternates, getLocalizedStaticPath, getStaticPagePathsByLocale, type Locale, type StaticPageKey } from "../src/lib/page-mappings"
import { ORGANIZATION_ID } from "../src/lib/schema-refs"
import { SITEMAP_STATIC_PAGE_KEYS } from "../src/lib/seo-content"
import { SITE_URL, isTrackingQueryParameter } from "../src/lib/site-url"
import {
  VALIDATION_BASE_URL,
  fetchWithTimeout,
  findTags,
  isEntryPoint,
  printResults,
  safeCheck,
  summarize,
  type CheckResult,
} from "./seo-validation-shared"

export { summarize }
export type { CheckResult }

const UNKNOWN_ROUTE = "/unknown-route-validation-xyz"

async function resolveFinal(url: string, maxHops = 10): Promise<{ status: number; finalUrl: string; html: string | null; hopCount: number }> {
  let currentUrl = url
  for (let hop = 0; hop < maxHops; hop++) {
    const response = await fetchWithTimeout(currentUrl)
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location")
      if (!location) return { status: response.status, finalUrl: currentUrl, html: null, hopCount: hop + 1 }
      currentUrl = new URL(location, currentUrl).toString()
      continue
    }
    const html = response.status === 200 ? await response.text() : null
    return { status: response.status, finalUrl: currentUrl, html, hopCount: hop }
  }
  return { status: 0, finalUrl: currentUrl, html: null, hopCount: maxHops }
}

export function validatePageHtml(html: string, expected: { canonical: string; locale: Locale; languages: Record<string, string> }): string[] {
  const failures: string[] = []
  const title = /<title>([^<]*)<\/title>/i.exec(html)?.[1]?.trim()
  const metas = findTags(html, "meta")
  const links = findTags(html, "link")
  const description = metas.find((tag) => tag.name === "description")?.content
  const ogUrl = metas.find((tag) => tag.property === "og:url")?.content
  const canonicals = links.filter((tag) => tag.rel === "canonical").map((tag) => tag.href)
  const hreflangs = links.filter((tag) => tag.rel === "alternate" && tag.hreflang)
  const htmlTag = findTags(html, "html")[0] ?? {}
  const jsonLdBlocks = Array.from(html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi), (m) => m[1])

  if (!title) failures.push("missing <title>")
  if (!description) failures.push("missing meta description")

  if (canonicals.length !== 1) failures.push(`expected exactly 1 canonical, found ${canonicals.length}`)
  const canonical = canonicals[0]
  if (canonical) {
    if (!canonical.startsWith("https://")) failures.push(`canonical is not HTTPS: ${canonical}`)
    if (/^https?:\/\/www\./i.test(canonical)) failures.push(`canonical uses www host: ${canonical}`)
    try {
      const tracking = Array.from(new URL(canonical).searchParams.keys()).filter(isTrackingQueryParameter)
      if (tracking.length > 0) failures.push(`canonical has tracking parameters: ${tracking.join(",")}`)
    } catch {
      failures.push(`canonical is not a valid URL: ${canonical}`)
    }
    if (canonical !== expected.canonical) failures.push(`canonical ${canonical} !== expected ${expected.canonical}`)
  }
  if (ogUrl !== canonical) failures.push(`og:url (${ogUrl}) does not match canonical (${canonical})`)

  const hreflangMap = Object.fromEntries(hreflangs.map((tag) => [tag.hreflang, tag.href]))
  for (const [hreflang, href] of Object.entries(expected.languages)) {
    if (hreflangMap[hreflang] !== href) failures.push(`hreflang=${hreflang} is ${hreflangMap[hreflang]}, expected ${href}`)
  }
  if (hreflangMap[expected.locale] !== canonical) failures.push("hreflang self does not equal canonical")

  const expectedDir = expected.locale === "ar" ? "rtl" : "ltr"
  if (htmlTag.lang !== expected.locale) failures.push(`html lang is "${htmlTag.lang}", expected "${expected.locale}"`)
  if (htmlTag.dir !== expectedDir) failures.push(`html dir is "${htmlTag.dir}", expected "${expectedDir}"`)

  if (jsonLdBlocks.length !== 1) failures.push(`expected exactly ONE ld+json script, found ${jsonLdBlocks.length}`)
  const nodes: Record<string, unknown>[] = []
  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block)
      nodes.push(...(Array.isArray(parsed) ? parsed : [parsed]))
    } catch {
      failures.push("invalid JSON-LD syntax")
    }
  }
  // Each top-level node is one entity definition; nested {"@id"} objects
  // (isPartOf, publisher, breadcrumb, ...) are references, not definitions.
  const ids = nodes.map((node) => node["@id"]).filter((id): id is string => typeof id === "string")
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index)
  if (duplicates.length > 0) failures.push(`duplicate JSON-LD @id: ${Array.from(new Set(duplicates)).join(", ")}`)
  for (const node of nodes) {
    if (node["@context"] !== "https://schema.org") failures.push(`JSON-LD node without @context: ${String(node["@type"])}`)
  }
  const webPage = nodes.find((node) => typeof node["@id"] === "string" && (node["@id"] as string).endsWith("#webpage"))
  if (!webPage) failures.push("no WebPage node")
  else {
    if (webPage["@id"] !== `${canonical}#webpage`) failures.push(`WebPage @id ${String(webPage["@id"])} !== ${canonical}#webpage`)
    if (webPage.url !== canonical) failures.push(`WebPage url ${String(webPage.url)} !== canonical`)
  }
  const orgNodes = nodes.filter((node) =>
    ([] as unknown[]).concat(node["@type"]).some((type) => /Organization|AutoRepair|LocalBusiness/.test(String(type))),
  )
  for (const org of orgNodes) {
    if (org["@id"] !== ORGANIZATION_ID) failures.push(`Organization node @id ${String(org["@id"])} !== ${ORGANIZATION_ID}`)
  }
  return failures
}

async function validateStaticPage(key: StaticPageKey, locale: Locale): Promise<CheckResult> {
  const path = getLocalizedStaticPath(key, locale)
  const route = `${key} (${locale}) ${path}`
  const { status, html, hopCount } = await resolveFinal(`${VALIDATION_BASE_URL}${path}`)
  if (status !== 200) return { route, ok: false, failures: [`final status is ${status}, expected 200`] }
  if (!html) return { route, ok: false, failures: ["no HTML body returned"] }
  const failures = validatePageHtml(html, {
    canonical: getCanonicalUrl(path),
    locale,
    languages: getLanguageAlternates(getStaticPagePathsByLocale(key)),
  })
  if (hopCount > 0) failures.push(`canonical path redirected (${hopCount} hop(s)) instead of a direct 200`)
  if (key.startsWith("services") && key !== "servicesListing" && !/"@type":"Service"/.test(html)) {
    failures.push("service page missing Service schema")
  }
  return { route, ok: failures.length === 0, failures }
}

async function validateUnknownRoute(): Promise<CheckResult> {
  const { status } = await resolveFinal(`${VALIDATION_BASE_URL}${UNKNOWN_ROUTE}`)
  return { route: `unknown route ${UNKNOWN_ROUTE}`, ok: status === 404, failures: status === 404 ? [] : [`expected 404, got ${status}`] }
}

// A blog post requested under the other locale's prefix must permanently
// redirect (single hop) to its own URL. Post URLs are discovered from the
// served sitemap (hreflang pairs), never hardcoded.
async function validateWrongLocaleBlogRedirects(): Promise<CheckResult[]> {
  const response = await fetchWithTimeout(`${VALIDATION_BASE_URL}/sitemap.xml`)
  if (response.status !== 200) return [{ route: "wrong-locale blog redirect", ok: false, failures: [`sitemap.xml returned ${response.status}`] }]
  const xml = await response.text()
  const staticUrls = new Set(SITEMAP_STATIC_PAGE_KEYS.flatMap((key) => LOCALES.map((locale) => getCanonicalUrl(getLocalizedStaticPath(key, locale)))))
  const postUrls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1].trim()).filter((url) => !staticUrls.has(url))
  const results: CheckResult[] = []
  for (const postUrl of postUrls.slice(0, 2)) {
    const { pathname } = new URL(postUrl)
    const [, locale, ...rest] = pathname.split("/")
    const otherLocale = LOCALES.find((candidate) => candidate !== locale)
    const wrongPath = `/${otherLocale}/${rest.join("/")}`
    const redirect = await fetchWithTimeout(`${VALIDATION_BASE_URL}${wrongPath}`)
    const failures: string[] = []
    if (redirect.status !== 308 && redirect.status !== 301) failures.push(`expected a permanent redirect, got ${redirect.status}`)
    const location = redirect.headers.get("location")
    const target = location ? new URL(location, VALIDATION_BASE_URL).pathname : null
    if (target !== pathname) failures.push(`redirected to ${target}, expected single hop to ${pathname}`)
    results.push({ route: `wrong-locale blog redirect ${wrongPath}`, ok: failures.length === 0, failures })
  }
  if (results.length === 0) results.push({ route: "wrong-locale blog redirect", ok: false, failures: ["no blog post URL found in sitemap"] })
  return results
}

export async function runAllChecks(): Promise<CheckResult[]> {
  const results: CheckResult[] = []
  for (const key of SITEMAP_STATIC_PAGE_KEYS) {
    for (const locale of LOCALES) {
      results.push(await safeCheck(`${key} (${locale})`, () => validateStaticPage(key, locale)))
    }
  }
  results.push(await safeCheck(`unknown route ${UNKNOWN_ROUTE}`, () => validateUnknownRoute()))
  try {
    results.push(...(await validateWrongLocaleBlogRedirects()))
  } catch (error) {
    results.push({ route: "wrong-locale blog redirect", ok: false, failures: [`unhandled error: ${String(error)}`] })
  }
  return results
}

async function main() {
  if (!SITE_URL.startsWith("https://")) throw new Error("SITE_URL must be https")
  process.exit(printResults("validate:seo", await runAllChecks()))
}

if (isEntryPoint(import.meta.url)) {
  main()
}
