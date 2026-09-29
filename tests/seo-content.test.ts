import { describe, expect, it } from 'vitest';
import { getCanonicalUrl, toCanonicalUrlString } from '~/lib/canonical-url';
import {
  DEFAULT_LOCALE,
  getLanguageAlternates,
  getLocalizedItemPath,
  getLocalizedStaticPath,
  getStaticPagePathsByLocale,
} from '~/lib/page-mappings';
import {
  getBlogPostLocale,
  getBlogPostPathsByLocale,
  isIndexableBlogPost,
  toIsoDateString,
  toValidLastModified,
} from '~/lib/seo-content';

describe('canonical-url', () => {
  it('toCanonicalUrlString is WHATWG serialization: encodes, keeps case, idempotent', () => {
    expect(toCanonicalUrlString('https://housam-honda.com/ar/خدماتنا')).toBe('https://housam-honda.com/ar/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%86%D8%A7');
    const encoded = toCanonicalUrlString('https://housam-honda.com/Website Logo.png');
    expect(encoded).toBe('https://housam-honda.com/Website%20Logo.png');
    expect(toCanonicalUrlString(encoded)).toBe(encoded);
    expect(toCanonicalUrlString('https://housam-honda.com/en/services/AC-Gas-Service')).toBe('https://housam-honda.com/en/services/AC-Gas-Service');
  });

  it('getCanonicalUrl builds from SITE_URL with a leading and without a trailing slash', () => {
    expect(getCanonicalUrl('/en/about')).toBe('https://housam-honda.com/en/about');
    expect(getCanonicalUrl('en/about/')).toBe('https://housam-honda.com/en/about');
    expect(getCanonicalUrl('/ar')).toBe('https://housam-honda.com/ar');
    expect(getCanonicalUrl('')).toBe('https://housam-honda.com/');
  });
});

describe('page-mappings', () => {
  it('reproduces the live paths exactly, including mixed-case service slugs', () => {
    expect(getLocalizedStaticPath('home', 'ar')).toBe('/ar');
    expect(getLocalizedStaticPath('servicesAcGasService', 'en')).toBe('/en/services/AC-Gas-Service');
    expect(getLocalizedStaticPath('blogListing', 'ar')).toBe('/ar/blog');
    expect(getLocalizedItemPath('blogPost', 'honda-maintenance-amman-en', 'en')).toBe('/en/honda-maintenance-amman-en');
  });

  it('getLocalizedItemPath degrades an unusable slug to the listing page', () => {
    for (const slug of ['', '  ', 'null', 'undefined', 'NULL', undefined as unknown as string, null as unknown as string]) {
      expect(getLocalizedItemPath('blogPost', slug, 'en')).toBe('/en/blog');
    }
  });

  it('getLanguageAlternates: absolute, every locale, x-default -> the default locale (ar)', () => {
    expect(DEFAULT_LOCALE).toBe('ar');
    expect(getLanguageAlternates(getStaticPagePathsByLocale('about'))).toEqual({
      en: 'https://housam-honda.com/en/about',
      ar: 'https://housam-honda.com/ar/about',
      'x-default': 'https://housam-honda.com/ar/about',
    });
  });
});

describe('seo-content: blog posts', () => {
  const en = { slug: 'x-en', title: 'X', lang: 'en', translationKey: 'x' };
  const ar = { slug: 'x-ar', title: 'س', lang: 'ar', translationKey: 'x' };

  it('isIndexableBlogPost', () => {
    expect(isIndexableBlogPost(en)).toBe(true);
    expect(isIndexableBlogPost({ ...en, draft: true })).toBe(false);
    expect(isIndexableBlogPost({ ...en, slug: 'null' })).toBe(false);
    expect(isIndexableBlogPost({ ...en, slug: '' })).toBe(false);
    expect(isIndexableBlogPost({ ...en, title: '  ' })).toBe(false);
    expect(isIndexableBlogPost({ ...en, slug: 'x\u200Een' })).toBe(false);
    expect(isIndexableBlogPost({ ...en, slug: 'x\ten' })).toBe(false);
    expect(isIndexableBlogPost(null)).toBe(false);
  });

  it('a post belongs to its lang frontmatter, else the default locale', () => {
    expect(getBlogPostLocale(en)).toBe('en');
    expect(getBlogPostLocale({ slug: 'y' })).toBe('ar');
    expect(getBlogPostLocale({ slug: 'y', lang: 'fr' })).toBe('ar');
  });

  it('pairs translations only through translationKey, never through the filename', () => {
    expect(getBlogPostPathsByLocale(en, [en, ar])).toEqual({ en: '/en/x-en', ar: '/ar/x-ar' });
    // Same filename stem, no translationKey: not a pair.
    const a = { slug: 'y-en', title: 'Y', lang: 'en' };
    const b = { slug: 'y-ar', title: 'ي', lang: 'ar' };
    expect(getBlogPostPathsByLocale(a, [a, b])).toEqual({ en: '/en/y-en' });
    // A draft sibling is not a translation.
    expect(getBlogPostPathsByLocale(en, [en, { ...ar, draft: true }])).toEqual({ en: '/en/x-en' });
  });
});

describe('seo-content: dates', () => {
  it('parses frontmatter dates as UTC and never falls back to now', () => {
    expect(toValidLastModified('Jun 24 2026')?.toISOString()).toBe('2026-06-24T00:00:00.000Z');
    expect(toValidLastModified('2026-06-24')?.toISOString()).toBe('2026-06-24T00:00:00.000Z');
    expect(toValidLastModified('2026-06-24T10:30:00Z')?.toISOString()).toBe('2026-06-24T10:30:00.000Z');
    expect(toValidLastModified(new Date('2026-01-02T00:00:00Z'))?.toISOString()).toBe('2026-01-02T00:00:00.000Z');
    expect(toValidLastModified('not a date')).toBeUndefined();
    expect(toValidLastModified('')).toBeUndefined();
    expect(toValidLastModified(undefined)).toBeUndefined();
    expect(toIsoDateString('Jun 24 2026')).toBe('2026-06-24T00:00:00.000Z');
  });
});
