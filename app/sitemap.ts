import type { MetadataRoute } from 'next';
import { SITE } from '~/config.js';
import { fetchPosts } from '~/utils/posts';

const cleanOrigin = SITE.origin.endsWith('/') ? SITE.origin.slice(0, -1) : SITE.origin;

const STATIC_PATHS = [
  '',
  '/about',
  '/contact',
  '/pricing',
  '/faqs',
  '/services',
  '/services/Car-Computer-Diagnostic',
  '/services/Computer-Software-Update',
  '/services/Maintenance',
  '/services/AC-Gas-Service',
  '/services/Radar-Calibration',
  '/services/Spare-Parts',
  '/blog',
  '/terms',
  '/privacy',
];

const LOCALES = ['en', 'ar'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${cleanOrigin}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: path === '' ? 1.0 : 0.8,
      });
    }
  }

  const posts = (await fetchPosts()) as any[];
  for (const post of posts) {
    if (!post?.slug) continue;
    const locale = post.lang === 'en' ? 'en' : 'ar';
    entries.push({
      url: `${cleanOrigin}/${locale}/${post.slug}`,
      lastModified: post.publishDate ? new Date(post.publishDate) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  return entries;
}
