// Stable, sitewide JSON-LD @id references (Organization/WebSite) and the
// helpers that build them. Deliberately free of any framework, page-data or
// translation dependency so every schema builder (and tests/scripts) can
// reference the Organization/WebSite nodes without pulling in anything else.
//
// The full Organization node is emitted only on the homepage
// (generateOrganizationSchema in ./schema); every other page references it
// through getOrganizationRef().

import { SITE_URL } from "./site-url"

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

// The business's real schema.org type: an independent car repair workshop.
export const ORGANIZATION_TYPE = "AutoRepair" as const

export function getOrganizationRef() {
  return { "@type": ORGANIZATION_TYPE, "@id": ORGANIZATION_ID }
}

export function getWebsiteRef() {
  return { "@type": "WebSite" as const, "@id": WEBSITE_ID }
}
