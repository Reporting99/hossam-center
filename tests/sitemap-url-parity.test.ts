import { describe, expect, it } from 'vitest';
import sitemap from '../app/sitemap';

// Every <loc> of the live https://housam-honda.com/sitemap.xml captured before
// the SEO architecture refactor (2026-09-28). The refactor is NOT a URL
// migration: the rebuilt sitemap must emit exactly this set, byte-for-byte,
// from the real markdown posts and route registry (no mocks here).
const LIVE_SITEMAP_LOCS_BEFORE_REFACTOR = [
  'https://housam-honda.com/en',
  'https://housam-honda.com/en/about',
  'https://housam-honda.com/en/contact',
  'https://housam-honda.com/en/pricing',
  'https://housam-honda.com/en/faqs',
  'https://housam-honda.com/en/services',
  'https://housam-honda.com/en/services/Car-Computer-Diagnostic',
  'https://housam-honda.com/en/services/Computer-Software-Update',
  'https://housam-honda.com/en/services/Maintenance',
  'https://housam-honda.com/en/services/AC-Gas-Service',
  'https://housam-honda.com/en/services/Radar-Calibration',
  'https://housam-honda.com/en/services/Spare-Parts',
  'https://housam-honda.com/en/blog',
  'https://housam-honda.com/en/terms',
  'https://housam-honda.com/en/privacy',
  'https://housam-honda.com/ar',
  'https://housam-honda.com/ar/about',
  'https://housam-honda.com/ar/contact',
  'https://housam-honda.com/ar/pricing',
  'https://housam-honda.com/ar/faqs',
  'https://housam-honda.com/ar/services',
  'https://housam-honda.com/ar/services/Car-Computer-Diagnostic',
  'https://housam-honda.com/ar/services/Computer-Software-Update',
  'https://housam-honda.com/ar/services/Maintenance',
  'https://housam-honda.com/ar/services/AC-Gas-Service',
  'https://housam-honda.com/ar/services/Radar-Calibration',
  'https://housam-honda.com/ar/services/Spare-Parts',
  'https://housam-honda.com/ar/blog',
  'https://housam-honda.com/ar/terms',
  'https://housam-honda.com/ar/privacy',
  'https://housam-honda.com/ar/honda-maintenance-amman-ar',
  'https://housam-honda.com/en/honda-maintenance-amman-en',
  'https://housam-honda.com/ar/honda-sensing-calibration-ar',
  'https://housam-honda.com/en/honda-sensing-calibration-en',
  'https://housam-honda.com/ar/honda-software-update-ar',
  'https://housam-honda.com/en/honda-software-update-en',
];

describe('sitemap URL parity with production (refactor, not migration)', () => {
  it('emits exactly the pre-refactor URL set', async () => {
    const urls = (await sitemap()).map((entry) => entry.url);
    expect([...urls].sort()).toEqual([...LIVE_SITEMAP_LOCS_BEFORE_REFACTOR].sort());
  });

  it('pairs the real en/ar blog posts via translationKey (x-default -> ar)', async () => {
    const entries = await sitemap();
    const en = entries.find((entry) => entry.url === 'https://housam-honda.com/en/honda-maintenance-amman-en');
    const ar = entries.find((entry) => entry.url === 'https://housam-honda.com/ar/honda-maintenance-amman-ar');
    const expected = {
      en: 'https://housam-honda.com/en/honda-maintenance-amman-en',
      ar: 'https://housam-honda.com/ar/honda-maintenance-amman-ar',
      'x-default': 'https://housam-honda.com/ar/honda-maintenance-amman-ar',
    };
    expect(en?.alternates?.languages).toEqual(expected);
    expect(ar?.alternates?.languages).toEqual(expected);
    // Real publishDate ("Jun 24 2026"), pinned to UTC -- same lastmod as production today.
    expect(new Date(en!.lastModified!).toISOString()).toBe('2026-06-24T00:00:00.000Z');
    // The wrong-locale duplicate the old hreflang advertised is never emitted anywhere.
    const everyUrl = entries.flatMap((entry) => [entry.url, ...Object.values(entry.alternates?.languages ?? {})]);
    expect(everyUrl).not.toContain('https://housam-honda.com/ar/honda-maintenance-amman-en');
    expect(everyUrl).not.toContain('https://housam-honda.com/en/honda-maintenance-amman-ar');
  });
});
