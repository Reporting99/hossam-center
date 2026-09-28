import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import FAQs from '~/components/widgets/FAQs';
import Features from '~/components/widgets/Features';
import Hero2 from '~/components/widgets/Hero2';
import Stats from '~/components/widgets/Stats';
import Steps from '~/components/widgets/Steps';
import { getSparePartsData } from '~/shared/data/pages/spare parts.data';
import { getHomeData } from '~/shared/data/pages/home.data';
import { buildStaticPageMetadata } from '~/lib/page-metadata';
import { toLocale } from '~/lib/page-mappings';
import { serializeJsonLd } from '~/lib/schema';
import { buildServicePageJsonLd, faqItemsFromFaqsProps } from '~/lib/page-jsonld';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return buildStaticPageMetadata('servicesSpareParts', toLocale(lang));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  
  const {
    herospareparts,
    statsspareparts,
    featuresspareparts,
    stepsspareparts,
    faqsspareparts,
  } = getSparePartsData(lang);

  const { contactHome } = getHomeData(lang);
  const isAr = lang === 'ar';

  const locale = toLocale(lang);
  const jsonLdSchemas = buildServicePageJsonLd('servicesSpareParts', locale, { faqs: faqItemsFromFaqsProps(faqsspareparts) });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdSchemas) }} />
      <Hero2 {...herospareparts} />
      <Stats {...statsspareparts} />
      <Features {...featuresspareparts} />
      <Steps
        id={stepsspareparts.id}
        header={{
          title: isAr ? 'كيفية الحصول على قطع الغيار' : 'Our Process',
          subtitle: isAr ? 'عملية مبسطة لطلب وتركيب قطع الغيار المناسبة تماماً لسيارتك.' : 'A simplified process to order and install the right parts.',
        }}
        items={stepsspareparts.items}
        image={stepsspareparts.image}
      />
      <FAQs {...faqsspareparts} />
      
      {/* Contact Section (with new phone numbers and WhatsApp, no form!) */}
      <Contact {...contactHome} />
    </>
  );
}
