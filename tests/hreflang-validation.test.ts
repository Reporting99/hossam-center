import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildFamilyRootSets,
  getValidatedItemLanguageAlternates,
  normalizeAlternateUrl,
  shouldEmitHreflangAlternate,
  validateAlternateUrlForLocale,
} from '~/lib/hreflang-validation';

const ORIGIN = 'https://housam-honda.com';

afterEach(() => vi.restoreAllMocks());

describe('shouldEmitHreflangAlternate', () => {
  it('accepts a same-origin URL under its own locale prefix', () => {
    expect(
      shouldEmitHreflangAlternate({ alternateLocale: 'en', alternateUrl: `${ORIGIN}/en/honda-maintenance-amman-en`, siteOrigin: ORIGIN }),
    ).toEqual({ valid: true, normalizedUrl: `${ORIGIN}/en/honda-maintenance-amman-en` });
    expect(shouldEmitHreflangAlternate({ alternateLocale: 'ar', alternateUrl: '/ar/services/Maintenance', siteOrigin: ORIGIN }).valid).toBe(true);
  });

  it.each([
    [{ alternateLocale: 'fr', alternateUrl: `${ORIGIN}/fr/x` }, 'UNSUPPORTED_LOCALE'],
    [{ alternateLocale: 'en', alternateUrl: '   ' }, 'EMPTY_URL'],
    [{ alternateLocale: 'en', alternateUrl: 'https://evil.example/en/x' }, 'CROSS_ORIGIN'],
    [{ alternateLocale: 'en', alternateUrl: 'https://www.housam-honda.com/en/x' }, 'CROSS_ORIGIN'],
    // The pre-refactor blog bug: an English post advertised under /ar/.
    [{ alternateLocale: 'ar', alternateUrl: `${ORIGIN}/en/honda-maintenance-amman-en` }, 'WRONG_LOCALE_PREFIX'],
    [{ alternateLocale: 'en', alternateUrl: `${ORIGIN}/about` }, 'WRONG_LOCALE_PREFIX'],
    [{ alternateLocale: 'ar', alternateUrl: `${ORIGIN}/ar/honda\u200F-maintenance` }, 'HIDDEN_CONTROL_CHARACTER'],
    [{ alternateLocale: 'ar', alternateUrl: `${ORIGIN}/ar/honda%E2%80%8F-maintenance` }, 'HIDDEN_CONTROL_CHARACTER'],
    [{ alternateLocale: 'ar', alternateUrl: `${ORIGIN}/ar/honda\tmaintenance` }, 'HIDDEN_CONTROL_CHARACTER'],
    [{ alternateLocale: 'ar', alternateUrl: `${ORIGIN}/ar/%E0%A4%A` }, 'MALFORMED_URL'],
  ])('rejects %j with %s', (params, reason) => {
    const result = shouldEmitHreflangAlternate({ ...params, siteOrigin: ORIGIN });
    expect(result.valid).toBe(false);
    expect(result.reason).toBe(reason);
  });
});

describe('mixed-locale route families (derived from pageSlugTranslations)', () => {
  it('derives no mixed-family roots today, because every en/ar segment on this site is identical', () => {
    const { enOnly, arOnly } = buildFamilyRootSets();
    expect(Array.from(enOnly)).toEqual([]);
    expect(Array.from(arOnly)).toEqual([]);
  });

  it('rejects a translated family root used under the wrong locale once one exists', () => {
    const roots = buildFamilyRootSets({
      servicesListing: { en: 'services', ar: 'خدماتنا' },
      blogListing: { en: 'blog', ar: 'blog' },
    });
    expect(Array.from(roots.enOnly)).toEqual(['services']);
    expect(Array.from(roots.arOnly)).toEqual(['خدماتنا']);
    expect(validateAlternateUrlForLocale(`${ORIGIN}/en/خدماتنا/x`, 'en', ORIGIN, roots)).toEqual({ valid: false, reason: 'MIXED_ROUTE_FAMILY' });
    expect(validateAlternateUrlForLocale(`${ORIGIN}/ar/services/x`, 'ar', ORIGIN, roots)).toEqual({ valid: false, reason: 'MIXED_ROUTE_FAMILY' });
    // A shared segment ("blog") is legitimate under both prefixes.
    expect(validateAlternateUrlForLocale(`${ORIGIN}/ar/blog/x`, 'ar', ORIGIN, roots).valid).toBe(true);
  });
});

describe('normalizeAlternateUrl', () => {
  it('decodes and re-serializes, or returns null', () => {
    expect(normalizeAlternateUrl('/ar/%D8%AE', ORIGIN)).toBe(`${ORIGIN}/ar/خ`);
    expect(normalizeAlternateUrl('/ar/%E0%A4%A', ORIGIN)).toBeNull();
  });
});

describe('getValidatedItemLanguageAlternates', () => {
  it('returns the full reciprocal set with x-default -> ar only when every locale has a real item', () => {
    expect(
      getValidatedItemLanguageAlternates(
        { en: '/en/honda-maintenance-amman-en', ar: '/ar/honda-maintenance-amman-ar' },
        { source: 'sitemap-blog-posts', currentPath: '/en/honda-maintenance-amman-en' },
      ),
    ).toEqual({
      en: `${ORIGIN}/en/honda-maintenance-amman-en`,
      ar: `${ORIGIN}/ar/honda-maintenance-amman-ar`,
      'x-default': `${ORIGIN}/ar/honda-maintenance-amman-ar`,
    });
  });

  it('emits nothing for an untranslated item', () => {
    expect(getValidatedItemLanguageAlternates({ en: '/en/solo' }, { source: 'sitemap-blog-posts', currentPath: '/en/solo' })).toBeUndefined();
  });

  it('drops (and logs) the whole set when one alternate is invalid, never repairing it', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    expect(
      getValidatedItemLanguageAlternates(
        { en: '/en/post-en', ar: '/en/post-en' },
        { source: 'blog-post-metadata', currentPath: '/en/post-en' },
      ),
    ).toBeUndefined();
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('reason="WRONG_LOCALE_PREFIX"');
  });
});
