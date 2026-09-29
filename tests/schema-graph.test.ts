import { describe, expect, it } from 'vitest';
import {
  buildBlogListingJsonLd,
  buildBlogPostJsonLd,
  buildHomeJsonLd,
  buildServicePageJsonLd,
  buildServicesListingJsonLd,
  buildStaticPageJsonLd,
  faqItemsFromFaqsProps,
  type JsonLdNode,
} from '~/lib/page-jsonld';
import { getCanonicalUrl } from '~/lib/canonical-url';
import { LOCALES, SERVICE_PAGE_KEYS, getLocalizedStaticPath, type Locale, type StaticPageKey } from '~/lib/page-mappings';
import { ORGANIZATION_ID, serializeJsonLd } from '~/lib/schema';
import { getBlogPostPath } from '~/lib/seo-content';
import { fetchPosts } from '~/utils/posts';
// The SAME data objects the pages render.
import { getHomeData } from '~/shared/data/pages/home.data';
import { getFaqsData } from '~/shared/data/pages/faqs.data';
import { getPricingData } from '~/shared/data/pages/pricing.data';
import { getServicesData } from '~/shared/data/pages/services.data';
import { getMaintenanceData } from '~/shared/data/pages/maintenance.data';
import { getACGasServiceData } from '~/shared/data/pages/ac-gas-service.data';
import { getCarComputerDiagnosticData } from '~/shared/data/pages/car-computer-diagnostic.data';
import { getComputerSoftwareUpdateData } from '~/shared/data/pages/computer-software-update.data';
import { getRadarCalibrationData } from '~/shared/data/pages/radar calibration.data';
import { getSparePartsData } from '~/shared/data/pages/spare parts.data';

const SERVICE_FAQS: Record<(typeof SERVICE_PAGE_KEYS)[number], (lang: string) => unknown> = {
  servicesMaintenance: (lang) => getMaintenanceData(lang).faqsmaintenance,
  servicesAcGasService: (lang) => getACGasServiceData(lang).faqsACGas,
  servicesCarComputerDiagnostic: (lang) => getCarComputerDiagnosticData(lang).faqsCarDiagnostic,
  servicesComputerSoftwareUpdate: (lang) => getComputerSoftwareUpdateData(lang).faqsSoftwareUpdate,
  servicesRadarCalibration: (lang) => getRadarCalibrationData(lang).faqsradarcalibration,
  servicesSpareParts: (lang) => getSparePartsData(lang).faqsspareparts,
};

const typesOf = (node: JsonLdNode) => ([] as unknown[]).concat(node['@type']);

/** The graph-level invariants every page's jsonLdSchemas array must satisfy. */
function assertValidGraph(nodes: JsonLdNode[], canonical: string, lang: Locale, opts: { breadcrumb: boolean }) {
  // Valid JSON round-trip through the one serializer.
  expect(JSON.parse(serializeJsonLd(nodes))).toEqual(nodes);
  for (const node of nodes) expect(node['@context']).toBe('https://schema.org');

  const ids = nodes.map((node) => node['@id']).filter(Boolean);
  expect(new Set(ids).size).toBe(ids.length);

  const webPages = nodes.filter((node) => typeof node['@id'] === 'string' && (node['@id'] as string).endsWith('#webpage'));
  expect(webPages).toHaveLength(1);
  const webPage = webPages[0];
  expect(webPage['@id']).toBe(`${canonical}#webpage`);
  expect(webPage.url).toBe(canonical);
  expect(webPage.inLanguage).toBe(lang);

  const breadcrumb = nodes.find((node) => typesOf(node).includes('BreadcrumbList'));
  if (opts.breadcrumb) {
    expect(breadcrumb?.['@id']).toBe(`${canonical}#breadcrumb`);
    expect(webPage.breadcrumb).toEqual({ '@id': breadcrumb?.['@id'] });
    const items = breadcrumb!.itemListElement as { item: string; position: number }[];
    expect(items[0].item).toBe(getCanonicalUrl(`/${lang}`));
    expect(items[items.length - 1].item).toBe(canonical);
  } else {
    expect(breadcrumb).toBeUndefined();
  }

  for (const node of nodes) {
    if ('inLanguage' in node) expect(node.inLanguage).toBe(lang);
  }

  // Every Organization reference (provider/publisher/author/about/...) is the one stable @id.
  const json = JSON.stringify(nodes);
  for (const match of Array.from(json.matchAll(/\{"@type":"AutoRepair","@id":"([^"]+)"/g))) {
    expect(match[1]).toBe(ORGANIZATION_ID);
  }
  // At most one full Organization node per page.
  expect(nodes.filter((node) => node['@id'] === ORGANIZATION_ID).length).toBeLessThanOrEqual(1);
}

const canonicalOf = (key: StaticPageKey, lang: Locale) => getCanonicalUrl(getLocalizedStaticPath(key, lang));

describe.each(LOCALES)('JSON-LD graphs (%s)', (lang) => {
  it('home: full Organization + WebSite + WebPage + FAQPage from the rendered FAQs', () => {
    const faqs = faqItemsFromFaqsProps(getHomeData(lang).faqs2Home);
    expect(faqs.length).toBeGreaterThan(0);
    const nodes = buildHomeJsonLd(lang, { faqs });
    assertValidGraph(nodes, canonicalOf('home', lang), lang, { breadcrumb: false });
    expect(nodes.map((node) => node['@type'])).toEqual(['AutoRepair', 'WebSite', 'WebPage', 'FAQPage']);
    const org = nodes[0];
    expect(org['@id']).toBe(ORGANIZATION_ID);
    // Offers reference each service page's own Service node.
    expect((org.makesOffer as { itemOffered: { '@id': string } }[]).map((offer) => offer.itemOffered['@id'])).toEqual(
      SERVICE_PAGE_KEYS.map((key) => `${canonicalOf(key, lang)}#service`),
    );
    expect((nodes[3].mainEntity as unknown[]).length).toBe(faqs.length);
  });

  it.each(['about', 'contact', 'terms', 'privacy'] as const)('%s: BreadcrumbList + WebPage', (key) => {
    const nodes = buildStaticPageJsonLd(key, lang);
    assertValidGraph(nodes, canonicalOf(key, lang), lang, { breadcrumb: true });
    expect(nodes.map((node) => node['@type'])).toEqual([
      'BreadcrumbList',
      key === 'about' ? 'AboutPage' : key === 'contact' ? 'ContactPage' : 'WebPage',
    ]);
  });

  it('faqs: FAQPage flattened from every tab the FAQs4 widget renders', () => {
    const props = getFaqsData(lang).faqs4Faqs;
    const faqs = faqItemsFromFaqsProps(props);
    expect(faqs.length).toBe((props.tabs ?? []).reduce((sum, tab) => sum + tab.items.length, 0));
    const url = canonicalOf('faqs', lang);
    const nodes = buildStaticPageJsonLd('faqs', lang, { faqs });
    assertValidGraph(nodes, url, lang, { breadcrumb: true });
    expect(nodes.map((node) => node['@type'])).toEqual(['BreadcrumbList', 'WebPage', 'FAQPage']);
    expect(nodes[1].mainEntity).toEqual({ '@id': `${url}#faq` });
  });

  it('pricing: FAQPage from the rendered FAQs3 items', () => {
    const faqs = faqItemsFromFaqsProps(getPricingData(lang).faqs3Pricing);
    const nodes = buildStaticPageJsonLd('pricing', lang, { faqs });
    assertValidGraph(nodes, canonicalOf('pricing', lang), lang, { breadcrumb: true });
    expect(nodes.map((node) => node['@type'])).toEqual(['BreadcrumbList', 'WebPage', 'FAQPage']);
  });

  it('services listing: CollectionPage whose mainEntity is the ItemList of service pages', () => {
    const url = canonicalOf('servicesListing', lang);
    const nodes = buildServicesListingJsonLd(lang, { faqs: faqItemsFromFaqsProps(getServicesData(lang).faqsServices) });
    assertValidGraph(nodes, url, lang, { breadcrumb: true });
    expect(nodes.map((node) => node['@type'])).toEqual(['BreadcrumbList', 'CollectionPage', 'ItemList', 'FAQPage']);
    expect(nodes[1].mainEntity).toEqual({ '@id': `${url}#itemlist` });
    expect((nodes[2].itemListElement as { url: string }[]).map((item) => item.url)).toEqual(
      SERVICE_PAGE_KEYS.map((key) => canonicalOf(key, lang)),
    );
  });

  it.each(SERVICE_PAGE_KEYS)('%s: BreadcrumbList (Home > Services > page) + WebPage + Service + FAQPage', (key) => {
    const url = canonicalOf(key, lang);
    const faqs = faqItemsFromFaqsProps(SERVICE_FAQS[key](lang) as never);
    expect(faqs.length).toBeGreaterThan(0);
    const nodes = buildServicePageJsonLd(key, lang, { faqs });
    assertValidGraph(nodes, url, lang, { breadcrumb: true });
    expect(nodes.map((node) => node['@type'])).toEqual(['BreadcrumbList', 'WebPage', 'Service', 'FAQPage']);
    expect(nodes[2]['@id']).toBe(`${url}#service`);
    expect((nodes[0].itemListElement as { item: string }[]).map((item) => item.item)).toEqual([
      canonicalOf('home', lang),
      canonicalOf('servicesListing', lang),
      url,
    ]);
  });

  it('blog listing: CollectionPage + ItemList of this locale\'s real posts', async () => {
    const posts = ((await fetchPosts()) as any[]).filter((post) => post.lang === lang);
    const url = canonicalOf('blogListing', lang);
    const nodes = buildBlogListingJsonLd(lang, posts);
    assertValidGraph(nodes, url, lang, { breadcrumb: true });
    expect(nodes.map((node) => node['@type'])).toEqual(['BreadcrumbList', 'CollectionPage', 'ItemList']);
    for (const item of nodes[2].itemListElement as { url: string }[]) expect(item.url).toMatch(new RegExp(`^https://housam-honda\\.com/${lang}/[a-z-]+-${lang}$`));
  });

  it('blog post: BreadcrumbList + WebPage + BlogPosting with ISO 8601 dates', async () => {
    const post = ((await fetchPosts()) as any[]).find((candidate) => candidate.lang === lang);
    const url = getCanonicalUrl(getBlogPostPath(post));
    const nodes = buildBlogPostJsonLd(post);
    assertValidGraph(nodes, url, lang, { breadcrumb: true });
    expect(nodes.map((node) => node['@type'])).toEqual(['BreadcrumbList', 'WebPage', 'BlogPosting']);
    const article = nodes[2];
    expect(article['@id']).toBe(`${url}#article`);
    expect(article.mainEntityOfPage).toEqual({ '@id': `${url}#webpage` });
    expect(article.datePublished).toBe('2026-06-24T00:00:00.000Z');
    expect(nodes[1].datePublished).toBe(article.datePublished);
  });
});
