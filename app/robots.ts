import type { MetadataRoute } from 'next';
import { SITE } from '~/config.js';

const cleanOrigin = SITE.origin.endsWith('/') ? SITE.origin.slice(0, -1) : SITE.origin;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${cleanOrigin}/sitemap.xml`,
  };
}
