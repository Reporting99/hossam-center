import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import FAQs from '~/components/widgets/FAQs';
import Features from '~/components/widgets/Features';
import Hero2 from '~/components/widgets/Hero2';
import Stats from '~/components/widgets/Stats';
import Steps from '~/components/widgets/Steps';
import { getACGasServiceData } from '~/shared/data/pages/ac-gas-service.data';
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
  return buildStaticPageMetadata('servicesAcGasService', toLocale(lang));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  
  const {
    heroACGas,
    statsACGas,
    featuresACGas,
    stepsACGas,
    faqsACGas,
  } = getACGasServiceData(lang);

  const { contactHome } = getHomeData(lang);
  const isAr = lang === 'ar';

  const locale = toLocale(lang);
  const jsonLdSchemas = buildServicePageJsonLd('servicesAcGasService', locale, { faqs: faqItemsFromFaqsProps(faqsACGas) });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdSchemas) }} />
      <Hero2 {...heroACGas} />
      <Stats {...statsACGas} />
      <Features {...featuresACGas} />
      <Steps
        id={stepsACGas.id}
        header={{
          title: isAr ? 'خطوات فحص وشحن مكيف السيارة' : 'Our Process',
          subtitle: isAr ? 'دقة وسرعة لضمان أفضل قوة دفع تبريد.' : 'Precise vacuum testing and recharging for optimal cooling power.',
        }}
        items={stepsACGas.items}
        image={stepsACGas.image}
      />
      <FAQs {...faqsACGas} />
      
      {/* Contact Section */}
      <Contact {...contactHome} />
    </>
  );
}
