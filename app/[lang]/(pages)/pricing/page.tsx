import type { Metadata } from 'next';
import Hero from '~/components/widgets/Hero';
import Pricing from '~/components/widgets/Pricing';
import Comparison from '~/components/widgets/Comparison';
import FAQs3 from '~/components/widgets/FAQs3';
import Contact from '~/components/widgets/Contact';
import { getPricingData } from '~/shared/data/pages/pricing.data';
import { getHomeData } from '~/shared/data/pages/home.data';
import { buildStaticPageMetadata } from '~/lib/page-metadata';
import { toLocale } from '~/lib/page-mappings';
import { serializeJsonLd } from '~/lib/schema';
import { buildStaticPageJsonLd, faqItemsFromFaqsProps } from '~/lib/page-jsonld';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return buildStaticPageMetadata('pricing', toLocale(lang));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const { heroPricing, pricingPricing, comparisonPricing, faqs3Pricing } = getPricingData(lang);
  const { contactHome } = getHomeData(lang);

  const locale = toLocale(lang);
  const jsonLdSchemas = buildStaticPageJsonLd('pricing', locale, { faqs: faqItemsFromFaqsProps(faqs3Pricing) });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdSchemas) }} />
      <Hero {...heroPricing} />
      <Pricing {...pricingPricing} />
      <Comparison {...comparisonPricing} />
      <FAQs3 {...faqs3Pricing} />
      
      {/* Contact Section instead of CallToAction block */}
      <Contact {...contactHome} />
    </>
  );
}
