import { Metadata } from 'next';
import Content from '~/components/widgets/Content';
import FAQs2 from '~/components/widgets/FAQs2';
import Features2 from '~/components/widgets/Features2';
import Features4 from '~/components/widgets/Features4';
import Hero from '~/components/widgets/Hero';
import Contact from '~/components/widgets/Contact';
import { getServicesData } from '~/shared/data/pages/services.data';
import { getHomeData } from '~/shared/data/pages/home.data';
import { buildStaticPageMetadata } from '~/lib/page-metadata';
import { toLocale } from '~/lib/page-mappings';
import { serializeJsonLd } from '~/lib/schema';
import { buildServicesListingJsonLd, faqItemsFromFaqsProps } from '~/lib/page-jsonld';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return buildStaticPageMetadata('servicesListing', toLocale(lang));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const {
    heroServices,
    features2Services,
    contentServicesOne,
    contentServicesTwo,
    features4Services,
    faqsServices,
  } = getServicesData(lang);

  const { contactHome } = getHomeData(lang);

  const locale = toLocale(lang);
  const jsonLdSchemas = buildServicesListingJsonLd(locale, { faqs: faqItemsFromFaqsProps(faqsServices) });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdSchemas) }} />
      <Hero {...heroServices} />
      <Features2 {...features2Services} />
      <Content {...contentServicesOne} />
      <Content {...contentServicesTwo} />
      <Features4 {...features4Services} />
      <FAQs2 {...faqsServices} />
      
      {/* Contact Section instead of CallToAction block */}
      <Contact {...contactHome} />
    </>
  );
}
