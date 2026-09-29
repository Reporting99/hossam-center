// The single source of the site's origin. Every absolute URL the app emits
// (canonical, hreflang, og:url, sitemap <loc>, robots Sitemap:, JSON-LD
// url/@id) is derived from SITE_URL -- no other module under src/ or app/
// may contain a domain literal.

const DEFAULT_SITE_URL = "https://housam-honda.com"

function resolveSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!configuredUrl) return DEFAULT_SITE_URL

  try {
    const url = new URL(configuredUrl)
    if (url.protocol !== "https:" || url.username || url.password) {
      return DEFAULT_SITE_URL
    }

    return url.origin
  } catch {
    return DEFAULT_SITE_URL
  }
}

export const SITE_URL = resolveSiteUrl()

export const PREFERRED_HOST = new URL(SITE_URL).hostname

// The production host is derived from DEFAULT_SITE_URL (not a second
// literal), so the staging check can never drift from the real origin.
export const PRODUCTION_HOST = new URL(DEFAULT_SITE_URL).hostname

export const IS_STAGING = PREFERRED_HOST !== PRODUCTION_HOST

export const TRACKING_QUERY_PARAMETERS = new Set([
  "fbclid",
  "gclid",
  "dclid",
  "gbraid",
  "wbraid",
  "msclkid",
  "ttclid",
  "twclid",
  "li_fat_id",
  "mc_cid",
  "mc_eid",
  "igshid",
])

export function isTrackingQueryParameter(name: string): boolean {
  const normalizedName = name.toLowerCase()
  return normalizedName.startsWith("utm_") || TRACKING_QUERY_PARAMETERS.has(normalizedName)
}
