// Small helpers shared by the two live SEO validators (no disk writes, no
// app imports beyond the pure src/lib registry modules).

import { fileURLToPath } from "node:url"
import path from "node:path"
import { SITE_URL } from "../src/lib/site-url"

// Where to fetch from (production by default; a local `next start` or a
// staging host via SEO_VALIDATION_BASE_URL). Canonicals are ALWAYS compared
// against SITE_URL -- a locally served build still declares the production
// origin, which is exactly what is being verified.
export const VALIDATION_BASE_URL = (process.env.SEO_VALIDATION_BASE_URL || SITE_URL).replace(/\/$/, "")

const REQUEST_TIMEOUT_MS = 15000
const REQUEST_ATTEMPTS = 3
const REQUEST_RETRY_DELAY_MS = 500

// Fetch as Googlebot: Next.js only guarantees blocking (non-streamed)
// metadata in <head> for known bots, which is what search engines see.
const USER_AGENT = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Bounded retry only when fetch() itself throws (network/timeout); an actual
// HTTP response of any status is returned immediately, so a real 404/500
// still fails the relevant check. Never follows redirects on its own.
export async function fetchWithTimeout(url: string, init: RequestInit = {}): Promise<Response> {
  let lastError: unknown
  for (let attempt = 1; attempt <= REQUEST_ATTEMPTS; attempt += 1) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
    try {
      return await fetch(url, {
        ...init,
        headers: { "user-agent": USER_AGENT, ...(init.headers ?? {}) },
        redirect: "manual",
        signal: controller.signal,
      })
    } catch (error) {
      lastError = error
      if (attempt < REQUEST_ATTEMPTS) await delay(REQUEST_RETRY_DELAY_MS)
    } finally {
      clearTimeout(timer)
    }
  }
  throw lastError
}

/** Maps a production (SITE_URL) URL onto the validation host, keeping path+query. */
export function toValidationUrl(productionUrl: string): string {
  const parsed = new URL(productionUrl, SITE_URL)
  return `${VALIDATION_BASE_URL}${parsed.pathname}${parsed.search}`
}

export function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
}

/** Every <tag ...> in `html` as a lower-cased attribute map. */
export function findTags(html: string, tagName: string): Record<string, string>[] {
  const tags: Record<string, string>[] = []
  for (const match of Array.from(html.matchAll(new RegExp(`<${tagName}\\b([^>]*)>`, "gi")))) {
    const attributes: Record<string, string> = {}
    for (const attr of Array.from(match[1].matchAll(/([a-zA-Z:-]+)\s*=\s*("([^"]*)"|'([^']*)')/g))) {
      attributes[attr[1].toLowerCase()] = decodeHtmlEntities(attr[3] ?? attr[4] ?? "")
    }
    tags.push(attributes)
  }
  return tags
}

export function getCanonicalFromHtml(html: string): string | null {
  return findTags(html, "link").find((tag) => tag.rel === "canonical")?.href ?? null
}

export interface CheckResult {
  route: string
  ok: boolean
  failures: string[]
}

// Runs one check function and guarantees it always resolves to a
// CheckResult, never throws, so one route's exhausted-retry failure can never
// stop the rest of the run.
export async function safeCheck(label: string, run: () => Promise<CheckResult>): Promise<CheckResult> {
  try {
    return await run()
  } catch (error) {
    return {
      route: label,
      ok: false,
      failures: [`unhandled error: ${error instanceof Error ? error.message : String(error)}`],
    }
  }
}

// Pure pass/fail aggregation, separate from console output and
// process.exit() so the exit-code decision is directly testable.
export function summarize(results: CheckResult[]): { failureCount: number; exitCode: 0 | 1 } {
  const failureCount = results.filter((result) => !result.ok).length
  return { failureCount, exitCode: failureCount > 0 ? 1 : 0 }
}

export function printResults(name: string, results: CheckResult[]): 0 | 1 {
  console.log(`Validated ${results.length} check(s) against ${VALIDATION_BASE_URL} (canonical origin ${SITE_URL})\n`)
  for (const result of results) {
    if (result.ok) {
      console.log(`PASS  ${result.route}`)
    } else {
      console.log(`FAIL  ${result.route}`)
      for (const failure of result.failures) console.log(`      - ${failure}`)
    }
  }
  const { failureCount, exitCode } = summarize(results)
  console.log(`\n${results.length - failureCount}/${results.length} checks passed.`)
  if (failureCount > 0) console.error(`\n${name} FAILED: ${failureCount} check(s) failed.`)
  else console.log(`\n${name} PASSED.`)
  return exitCode
}

/**
 * True only when `moduleUrl` is the process entry point (run via
 * `jiti scripts/<file>.ts` or node), never when imported by a test.
 */
export function isEntryPoint(moduleUrl: string): boolean {
  const modulePath = fileURLToPath(moduleUrl)
  return process.argv.slice(1, 3).some((arg) => arg && path.resolve(arg) === modulePath)
}
