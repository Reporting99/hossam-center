import type { Metadata } from 'next';
import Hero from '~/components/widgets/Hero';
import FAQs4 from '~/components/widgets/FAQs4';
import Contact from '~/components/widgets/Contact';
import { getFaqsData } from '~/shared/data/pages/faqs.data';
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
  return buildStaticPageMetadata('faqs', toLocale(lang));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const { heroFaqs, faqs4Faqs } = getFaqsData(lang);
  const { contactHome } = getHomeData(lang);

  const locale = toLocale(lang);
  const jsonLdSchemas = buildStaticPageJsonLd('faqs', locale, { faqs: faqItemsFromFaqsProps(faqs4Faqs) });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdSchemas) }} />
      <Hero {...heroFaqs} />
      <FAQs4 {...faqs4Faqs} />
      
      {/* Contact Section instead of CallToAction block */}
      <Contact {...contactHome} />
    </>
  );
}
