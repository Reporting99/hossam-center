import { beforeAll, describe, expect, it } from 'vitest';
import type { MetadataRoute } from 'next';
import sitemap from '../app/sitemap';
import { buildStaticPageMetadata } from '~/lib/page-metadata';
import { LOCALES, STATIC_PAGE_KEYS } from '~/lib/page-mappings';
import { buildHomeJsonLd, buildServicePageJsonLd, buildServicesListingJsonLd, buildBlogListingJsonLd, buildStaticPageJsonLd } from '~/lib/page-jsonld';
import { SERVICE_PAGE_KEYS } from '~/lib/page-mappings';

let entries: Map<string, MetadataRoute.Sitemap[number]>;
beforeAll(async () => {
  entries = new Map((await sitemap()).map((entry) => [entry.url, entry]));
});

function webPageUrlFor(key: (typeof STATIC_PAGE_KEYS)[number], lang: (typeof LOCALES)[number]): unknown {
  const nodes =
    key === 'home'
      ? buildHomeJsonLd(lang)
      : key === 'servicesListing'
        ? buildServicesListingJsonLd(lang)
        : key === 'blogListing'
          ? buildBlogListingJsonLd(lang, [])
          : (SERVICE_PAGE_KEYS as readonly string[]).includes(key)
            ? buildServicePageJsonLd(key as (typeof SERVICE_PAGE_KEYS)[number], lang)
            : buildStaticPageJsonLd(key as Parameters<typeof buildStaticPageJsonLd>[0], lang);
  return nodes.find((node) => String(node['@id']).endsWith('#webpage'))?.url;
}

describe.each(LOCALES)('metadata consistency (%s)', (lang) => {
  it.each(STATIC_PAGE_KEYS)('%s: canonical === og:url === sitemap <loc> === hreflang self === WebPage url', (key) => {
    const metadata = buildStaticPageMetadata(key, lang);
    const canonical = metadata.alternates?.canonical as string;
    const languages = metadata.alternates?.languages as Record<string, string>;
    const openGraph = metadata.openGraph as { url: string; title: string; description: string; siteName: string; locale: string; type: string };

    expect(canonical).toMatch(/^https:\/\/housam-honda\.com\/(en|ar)/);
    expect(openGraph.url).toBe(canonical);
    expect(languages[lang]).toBe(canonical);
    expect(languages['x-default']).toBe(languages.ar);
    expect(entries.get(canonical)?.url).toBe(canonical);
    expect(entries.get(canonical)?.alternates?.languages).toEqual(languages);
    expect(webPageUrlFor(key, lang)).toBe(canonical);

    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
    expect(openGraph.title).toBeTruthy();
    expect(openGraph.description).toBe(metadata.description);
    expect(openGraph.siteName).toBeTruthy();
    expect(openGraph.locale).toBe(lang === 'ar' ? 'ar_JO' : 'en_US');
    expect(openGraph.type).toBe('website');
    expect(metadata.robots).toBeUndefined();
  });

  it('homepage keeps its exact pre-refactor <title> (bypasses the layout template)', () => {
    expect(buildStaticPageMetadata('home', lang).title).toEqual({
      absolute: lang === 'ar' ? 'مركز حسام لصيانة سيارات هوندا' : 'Hossam Maintenance Center',
    });
  });
});
