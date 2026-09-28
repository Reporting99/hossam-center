import { describe, expect, it } from 'vitest';
import {
  ORGANIZATION_ID,
  WEBSITE_ID,
  generateArticleSchema,
  generateBreadcrumbsSchema,
  generateFaqSchema,
  generateListingItemListSchema,
  generateOrganizationSchema,
  generatePersonSchema,
  generateServiceSchema,
  generateWebPageSchema,
  generateWebsiteSchema,
  getArticleRef,
  getBreadcrumbRef,
  getFaqRef,
  getPersonRef,
  getServiceRef,
  getWebPageRef,
  serializeJsonLd,
} from '~/lib/schema';
import { ORGANIZATION_TYPE, getOrganizationRef, getWebsiteRef } from '~/lib/schema-refs';

const ORG_REF = { '@type': 'AutoRepair', '@id': 'https://housam-honda.com/#organization' };
const URL_EN_MAINT = 'https://housam-honda.com/en/services/Maintenance';

describe('stable @id conventions', () => {
  it('derives every id from SITE_URL / the page canonical', () => {
    expect(ORGANIZATION_ID).toBe('https://housam-honda.com/#organization');
    expect(WEBSITE_ID).toBe('https://housam-honda.com/#website');
    expect(ORGANIZATION_TYPE).toBe('AutoRepair');
    expect(getOrganizationRef()).toEqual(ORG_REF);
    expect(getWebsiteRef()).toEqual({ '@type': 'WebSite', '@id': 'https://housam-honda.com/#website' });
    expect(getWebPageRef(URL_EN_MAINT)).toBe(`${URL_EN_MAINT}#webpage`);
    expect(getBreadcrumbRef(URL_EN_MAINT)).toBe(`${URL_EN_MAINT}#breadcrumb`);
    expect(getServiceRef(URL_EN_MAINT)).toBe(`${URL_EN_MAINT}#service`);
    expect(getArticleRef(URL_EN_MAINT)).toBe(`${URL_EN_MAINT}#article`);
    expect(getFaqRef(URL_EN_MAINT)).toBe(`${URL_EN_MAINT}#faq`);
    expect(getPersonRef('Hossam Ábc')).toBe('https://housam-honda.com/#person-hossam-abc');
  });
});

describe('builder snapshots', () => {
  it('generateOrganizationSchema (en) -- real facts only, service offers by @id', () => {
    expect(generateOrganizationSchema('en', { offers: [{ name: 'Maintenance', url: URL_EN_MAINT }] })).toEqual({
      '@context': 'https://schema.org',
      '@type': 'AutoRepair',
      '@id': 'https://housam-honda.com/#organization',
      name: 'Hossam Maintenance Center',
      alternateName: 'مركز حسام لصيانة سيارات هوندا',
      url: 'https://housam-honda.com',
      logo: { '@type': 'ImageObject', url: 'https://housam-honda.com/Website%20Logo.png', width: 430, height: 185 },
      image: 'https://housam-honda.com/Website%20Logo.png',
      description:
        'Hossam Maintenance Center specialized in Honda car maintenance, original spare parts, radar calibration, computer diagnostics, and software updates in Amman, Jordan.',
      telephone: ['+962797996020', '+962795328713'],
      priceRange: '$$',
      address: { '@type': 'PostalAddress', streetAddress: 'Al-Shahid Road', addressLocality: 'Amman', addressCountry: 'JO' },
      geo: { '@type': 'GeoCoordinates', latitude: 31.999758, longitude: 36.000426 },
      hasMap: 'https://share.google/S6jgdB6WK3Iy9qppS',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      sameAs: [
        'https://www.facebook.com/HondaHousam',
        'https://www.instagram.com/housammainten/',
        'https://www.tiktok.com/@housam.maintenance.honda',
      ],
      makesOffer: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', '@id': `${URL_EN_MAINT}#service`, name: 'Maintenance' } },
      ],
    });
  });

  it('generateOrganizationSchema never invents an email, Saturday hours, or ratings', () => {
    const json = JSON.stringify(generateOrganizationSchema('ar'));
    expect(json).not.toMatch(/email|Saturday|aggregateRating|review/i);
    expect(generateOrganizationSchema('ar')).not.toHaveProperty('makesOffer');
    expect(generateOrganizationSchema('ar').address.streetAddress).toBe('شارع الشهيد');
  });

  it('generateWebsiteSchema', () => {
    expect(generateWebsiteSchema('ar')).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://housam-honda.com/#website',
      name: 'مركز حسام لصيانة سيارات هوندا',
      url: 'https://housam-honda.com',
      inLanguage: 'ar',
      publisher: ORG_REF,
    });
  });

  it('generateWebPageSchema', () => {
    expect(generateWebPageSchema({ name: 'N', description: 'D', breadcrumb: true }, URL_EN_MAINT, 'en')).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${URL_EN_MAINT}#webpage`,
      name: 'N',
      description: 'D',
      url: URL_EN_MAINT,
      inLanguage: 'en',
      isPartOf: { '@type': 'WebSite', '@id': 'https://housam-honda.com/#website', publisher: ORG_REF },
      about: ORG_REF,
      breadcrumb: { '@id': `${URL_EN_MAINT}#breadcrumb` },
    });
    // No fabricated dates or breadcrumb on a page without them.
    const bare = generateWebPageSchema({ name: 'N', description: 'D', type: 'AboutPage' }, URL_EN_MAINT, 'en');
    expect(bare['@type']).toBe('AboutPage');
    expect(bare).not.toHaveProperty('breadcrumb');
    expect(bare).not.toHaveProperty('datePublished');
    expect(bare).not.toHaveProperty('dateModified');
  });

  it('generateBreadcrumbsSchema', () => {
    expect(
      generateBreadcrumbsSchema(
        [
          { name: 'Home', url: 'https://housam-honda.com/en' },
          { name: 'Services', url: 'https://housam-honda.com/en/services' },
          { name: 'Maintenance', url: URL_EN_MAINT },
        ],
        URL_EN_MAINT,
      ),
    ).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${URL_EN_MAINT}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://housam-honda.com/en' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://housam-honda.com/en/services' },
        { '@type': 'ListItem', position: 3, name: 'Maintenance', item: URL_EN_MAINT },
      ],
    });
  });

  it('generateServiceSchema', () => {
    expect(generateServiceSchema({ name: 'Honda Maintenance', description: 'D' }, URL_EN_MAINT, 'en')).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${URL_EN_MAINT}#service`,
      name: 'Honda Maintenance',
      serviceType: 'Honda Maintenance',
      description: 'D',
      url: URL_EN_MAINT,
      provider: ORG_REF,
      areaServed: { '@type': 'City', name: 'Amman' },
    });
  });

  it('generateFaqSchema -- null for an empty list', () => {
    expect(generateFaqSchema([])).toBeNull();
    expect(generateFaqSchema([{ question: 'Q?', answer: 'A.' }], URL_EN_MAINT)).toEqual({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${URL_EN_MAINT}#faq`,
      mainEntity: [{ '@type': 'Question', name: 'Q?', acceptedAnswer: { '@type': 'Answer', text: 'A.' } }],
    });
  });

  it('generateArticleSchema', () => {
    const url = 'https://housam-honda.com/en/honda-maintenance-amman-en';
    expect(
      generateArticleSchema(
        { headline: 'H', description: 'D', datePublished: '2026-06-24T00:00:00.000Z', type: 'BlogPosting', inLanguage: 'en' },
        url,
      ),
    ).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: 'H',
      description: 'D',
      datePublished: '2026-06-24T00:00:00.000Z',
      inLanguage: 'en',
      url,
      author: ORG_REF,
      publisher: ORG_REF,
      mainEntityOfPage: { '@id': `${url}#webpage` },
    });
  });

  it('generateListingItemListSchema and generatePersonSchema', () => {
    const url = 'https://housam-honda.com/en/blog';
    expect(generateListingItemListSchema([{ name: 'A', url: `${url}/a` }], url)).toEqual({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${url}#itemlist`,
      numberOfItems: 1,
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'A', url: `${url}/a` }],
    });
    expect(generatePersonSchema({ name: 'Jane Doe' })).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://housam-honda.com/#person-jane-doe',
      name: 'Jane Doe',
      worksFor: ORG_REF,
    });
  });
});

describe('serializeJsonLd', () => {
  it('escapes "<" so an injected </script> cannot break out of the JSON-LD tag', () => {
    const serialized = serializeJsonLd({ description: '</script><script>alert(1)</script>' });
    expect(serialized).not.toContain('</script>');
    expect(serialized).not.toContain('<script>');
    expect(serialized).toContain('\\u003c/script>');
  });

  it('escapes U+2028/U+2029 and still round-trips to the same value', () => {
    const value = [{ '@type': 'Thing', name: 'a\u2028b\u2029c <d>' }];
    const serialized = serializeJsonLd(value);
    expect(serialized).not.toMatch(/[\u2028\u2029]/);
    expect(JSON.parse(serialized)).toEqual(value);
  });
});
