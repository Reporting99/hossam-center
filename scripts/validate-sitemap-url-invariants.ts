// Live gate: every <loc> (and every hreflang alternate) in every sitemap
// declared by robots.txt must be free of the malformed URL shapes in
// src/lib/url-invariants.ts, must be SITE_URL-prefixed, must answer 200
// directly (no redirect), and must be the page's own canonical.
//
// Sitemap/loc URLs carry the production origin (SITE_URL) even when served
// by a local build; they are fetched from SEO_VALIDATION_BASE_URL (same
// path) and compared against SITE_URL.
//
// Usage: SEO_VALIDATION_BASE_URL=http://127.0.0.1:3462 node_modules/.bin/jiti scripts/validate-sitemap-url-invariants.ts

import { findForbiddenUrlPatterns } from "../src/lib/url-invariants"
import { SITE_URL } from "../src/lib/site-url"
import {
  VALIDATION_BASE_URL,
  fetchWithTimeout,
  getCanonicalFromHtml,
  isEntryPoint,
  printResults,
  safeCheck,
  summarize,
  toValidationUrl,
  type CheckResult,
} from "./seo-validation-shared"

export { summarize }

async function discoverSitemapUrls(): Promise<string[]> {
  const response = await fetchWithTimeout(`${VALIDATION_BASE_URL}/robots.txt`)
  if (!response.ok) throw new Error(`robots.txt returned ${response.status}`)
  const text = await response.text()
  return Array.from(new Set(Array.from(text.matchAll(/^Sitemap:\s*(\S+)/gim), (m) => m[1])))
}

function extractLocs(xml: string): string[] {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1].trim())
}

function extractAlternateHrefs(xml: string): string[] {
  return Array.from(xml.matchAll(/<xhtml:link[^>]*href="([^"]+)"/g), (m) => m[1].replace(/&amp;/g, "&"))
}

async function validateLoc(loc: string): Promise<CheckResult> {
  const failures: string[] = []
  for (const match of findForbiddenUrlPatterns(loc)) failures.push(`${match.reason}: ${match.detail}`)
  if (!loc.startsWith(`${SITE_URL}/`)) failures.push(`not under SITE_URL (${SITE_URL})`)
  const response = await fetchWithTimeout(toValidationUrl(loc))
  if (response.status !== 200) {
    failures.push(`returned ${response.status}${response.headers.get("location") ? ` -> ${response.headers.get("location")}` : ""}, expected a direct 200`)
  } else {
    const canonical = getCanonicalFromHtml(await response.text())
    if (canonical !== loc) failures.push(`page canonical ${canonical} !== <loc>`)
  }
  return { route: loc, ok: failures.length === 0, failures }
}

export async function runAllChecks(): Promise<CheckResult[]> {
  const results: CheckResult[] = []
  const sitemapUrls = await discoverSitemapUrls()
  if (sitemapUrls.length === 0) return [{ route: "robots.txt", ok: false, failures: ["no Sitemap: declared"] }]

  for (const sitemapUrl of sitemapUrls) {
    const sitemapFailures: string[] = []
    if (!sitemapUrl.startsWith(`${SITE_URL}/`)) sitemapFailures.push(`Sitemap: ${sitemapUrl} is not under SITE_URL`)
    const response = await fetchWithTimeout(toValidationUrl(sitemapUrl))
    if (!response.ok) {
      results.push({ route: sitemapUrl, ok: false, failures: [`returned ${response.status}`] })
      continue
    }
    const xml = await response.text()
    const locs = extractLocs(xml)
    if (locs.length === 0) sitemapFailures.push("no <loc> entries")
    if (new Set(locs).size !== locs.length) sitemapFailures.push("duplicate <loc> entries")
    for (const href of extractAlternateHrefs(xml)) {
      const matches = findForbiddenUrlPatterns(href)
      if (matches.length > 0) sitemapFailures.push(`alternate ${href}: ${matches.map((m) => m.reason).join(",")}`)
      if (!locs.includes(href)) sitemapFailures.push(`alternate ${href} is not itself a <loc> (non-reciprocal)`)
    }
    results.push({ route: `${sitemapUrl} (${locs.length} <loc>)`, ok: sitemapFailures.length === 0, failures: sitemapFailures })
    for (const loc of locs) results.push(await safeCheck(loc, () => validateLoc(loc)))
  }
  return results
}

async function main() {
  try {
    process.exit(printResults("validate:sitemap-url-invariants", await runAllChecks()))
  } catch (error) {
    console.error(`validate:sitemap-url-invariants FAILED: ${error instanceof Error ? error.message : String(error)}`)
    process.exit(1)
  }
}

if (isEntryPoint(import.meta.url)) {
  main()
}
