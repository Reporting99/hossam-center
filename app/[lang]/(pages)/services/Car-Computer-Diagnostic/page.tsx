import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import FAQs from '~/components/widgets/FAQs';
import Features from '~/components/widgets/Features';
import Hero2 from '~/components/widgets/Hero2';
import Stats from '~/components/widgets/Stats';
import Steps from '~/components/widgets/Steps';
import { getCarComputerDiagnosticData } from '~/shared/data/pages/car-computer-diagnostic.data';
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
  return buildStaticPageMetadata('servicesCarComputerDiagnostic', toLocale(lang));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  
  const {
    heroCarDiagnostic,
    statsCarDiagnostic,
    featuresCarDiagnostic,
    stepsCarDiagnostic,
    faqsCarDiagnostic,
  } = getCarComputerDiagnosticData(lang);

  const { contactHome } = getHomeData(lang);
  const isAr = lang === 'ar';

  const locale = toLocale(lang);
  const jsonLdSchemas = buildServicePageJsonLd('servicesCarComputerDiagnostic', locale, { faqs: faqItemsFromFaqsProps(faqsCarDiagnostic) });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdSchemas) }} />
      <Hero2 {...heroCarDiagnostic} />
      <Stats {...statsCarDiagnostic} />
      <Features {...featuresCarDiagnostic} />
      <Steps
        id={stepsCarDiagnostic.id}
        header={{
          title: isAr ? 'خطوات فحص كمبيوتر السيارة' : 'Our Process',
          subtitle: isAr ? 'دقة وسرعة في الكشف عن الأعطال الإلكترونية والميكانيكية.' : 'Fast and precise scanning to identify mechanical and electrical issues.',
        }}
        items={stepsCarDiagnostic.items}
        image={stepsCarDiagnostic.image}
      />
      <FAQs {...faqsCarDiagnostic} />
      
      {/* Contact Section (with new phone numbers and WhatsApp, no form!) */}
      <Contact {...contactHome} />
    </>
  );
}
