import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import FAQs from '~/components/widgets/FAQs';
import Features from '~/components/widgets/Features';
import Hero2 from '~/components/widgets/Hero2';
import Stats from '~/components/widgets/Stats';
import Steps from '~/components/widgets/Steps';
import { getRadarCalibrationData } from '~/shared/data/pages/radar calibration.data';
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
  return buildStaticPageMetadata('servicesRadarCalibration', toLocale(lang));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  
  const {
    heroradarcalibration,
    statsradarcalibration,
    stepsradarcalibration,
    featuresradarcalibration,
    faqsradarcalibration,
  } = getRadarCalibrationData(lang);

  const { contactHome } = getHomeData(lang);
  const isAr = lang === 'ar';

  const locale = toLocale(lang);
  const jsonLdSchemas = buildServicePageJsonLd('servicesRadarCalibration', locale, { faqs: faqItemsFromFaqsProps(faqsradarcalibration) });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdSchemas) }} />
      <Hero2 {...heroradarcalibration} />
      <Stats {...statsradarcalibration} />
      <Features {...featuresradarcalibration} />
      <Steps
        id={stepsradarcalibration.id}
        header={{
          title: isAr ? 'خطوات معايرة الرادار' : 'Our Process',
          subtitle: isAr ? 'دقة متناهية خطوة بخطوة لضمان أمان عائلتك على الطريق.' : 'Step-by-step precision to guarantee your safety on the road.',
        }}
        items={stepsradarcalibration.items}
        image={stepsradarcalibration.image}
      />
      <FAQs {...faqsradarcalibration} />
      
      {/* Contact Section (with new phone numbers and WhatsApp, no form!) */}
      <Contact {...contactHome} />
    </>
  );
}
