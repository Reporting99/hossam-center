import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import FAQs from '~/components/widgets/FAQs';
import Features from '~/components/widgets/Features';
import Hero2 from '~/components/widgets/Hero2';
import Stats from '~/components/widgets/Stats';
import Steps from '~/components/widgets/Steps';
import { getMaintenanceData } from '~/shared/data/pages/maintenance.data';
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
  return buildStaticPageMetadata('servicesMaintenance', toLocale(lang));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  
  const {
    heromaintenance,
    statsmaintenance,
    featuresmaintenance,
    stepsmaintenance,
    faqsmaintenance,
  } = getMaintenanceData(lang);

  const { contactHome } = getHomeData(lang);
  const isAr = lang === 'ar';

  const locale = toLocale(lang);
  const jsonLdSchemas = buildServicePageJsonLd('servicesMaintenance', locale, { faqs: faqItemsFromFaqsProps(faqsmaintenance) });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdSchemas) }} />
      {/* Hero Section */}
      <Hero2 {...heromaintenance} />

      {/* Stats Section */}
      <Stats {...statsmaintenance} />

      {/* Features Section */}
      <Features {...featuresmaintenance} />

      {/* Steps Section */}
      <Steps
        id={stepsmaintenance.id}
        header={{
          title: isAr ? 'خطوات العمل لدينا' : 'Our Process',
          subtitle: isAr ? 'عملية منظمة خطوة بخطوة لضمان جودة الخدمة.' : 'Step-by-step process to ensure quality service.',
        }}
        items={stepsmaintenance.items}
        image={stepsmaintenance.image}
      />

      {/* FAQs Section */}
      <FAQs {...faqsmaintenance} />

      {/* Contact Section (with new phone numbers and WhatsApp, no form!) */}
      <Contact {...contactHome} />
    </>
  );
}
