import type { MetadataRoute } from "next"
import { LOCALES, getLocalizedStaticPath } from "~/lib/page-mappings"
import { PRIVATE_PAGE_KEYS } from "~/lib/seo-content"
import { IS_STAGING, SITE_URL } from "~/lib/site-url"

// Private pages come from the seo-content registry (none today), so a page
// added there is disallowed here automatically.
const localizedPrivatePaths = Array.from(PRIVATE_PAGE_KEYS).flatMap((key) =>
  LOCALES.map((locale) => getLocalizedStaticPath(key, locale)),
)

export default function robots(): MetadataRoute.Robots {
  // Any non-production origin (NEXT_PUBLIC_SITE_URL pointing at a staging or
  // preview host) must never be crawled, and must not advertise a sitemap.
  if (IS_STAGING) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /_next/ is deliberately NOT disallowed: it serves the CSS/JS Google
      // needs to render pages, and this site's content images are served
      // from /_next/static/media (static imports) and /_next/image.
      disallow: [...localizedPrivatePaths, "/api/"],
    },
    sitemap: [`${SITE_URL}/sitemap.xml`],
  }
}
