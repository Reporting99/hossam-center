import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import FAQs from '~/components/widgets/FAQs';
import Features from '~/components/widgets/Features';
import Hero2 from '~/components/widgets/Hero2';
import Stats from '~/components/widgets/Stats';
import Steps from '~/components/widgets/Steps';
import { getComputerSoftwareUpdateData } from '~/shared/data/pages/computer-software-update.data';
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
  return buildStaticPageMetadata('servicesComputerSoftwareUpdate', toLocale(lang));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  
  const {
    heroSoftwareUpdate,
    statsSoftwareUpdate,
    featuresSoftwareUpdate,
    stepsSoftwareUpdate,
    faqsSoftwareUpdate,
  } = getComputerSoftwareUpdateData(lang);

  const { contactHome } = getHomeData(lang);
  const isAr = lang === 'ar';

  const locale = toLocale(lang);
  const jsonLdSchemas = buildServicePageJsonLd('servicesComputerSoftwareUpdate', locale, { faqs: faqItemsFromFaqsProps(faqsSoftwareUpdate) });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdSchemas) }} />
      <Hero2 {...heroSoftwareUpdate} />
      <Stats {...statsSoftwareUpdate} />
      <Features {...featuresSoftwareUpdate} />
      <Steps
        id={stepsSoftwareUpdate.id}
        header={{
          title: isAr ? 'خطوات التحديث والبرمجة' : 'Our Process',
          subtitle: isAr ? 'حلول معالجة الأخطاء وإصدار البرمجيات الرسمية بدقة وأمان.' : 'Step-by-step flashing to implement official manufacturer firmware updates.',
        }}
        items={stepsSoftwareUpdate.items}
        image={stepsSoftwareUpdate.image}
      />
      <FAQs {...faqsSoftwareUpdate} />
      
      {/* Contact Section (with new phone numbers and WhatsApp, no form!) */}
      <Contact {...contactHome} />
    </>
  );
}
