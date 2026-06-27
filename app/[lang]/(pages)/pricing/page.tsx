import type { Metadata } from 'next';
import Hero from '~/components/widgets/Hero';
import Pricing from '~/components/widgets/Pricing';
import Comparison from '~/components/widgets/Comparison';
import FAQs3 from '~/components/widgets/FAQs3';
import Contact from '~/components/widgets/Contact';
import { getPricingData } from '~/shared/data/pages/pricing.data';
import { getHomeData } from '~/shared/data/pages/home.data';

interface PageProps {
  params: Promise<{ lang: string }>;
}

import { getAlternates } from '~/utils/utils';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const isAr = lang === 'ar';
  return {
    title: isAr ? 'باقات أسعار صيانة سيارات هوندا' : 'Honda Servicing Plans & Prices',
    description: isAr 
      ? 'أسعار باقات صيانة هوندا الدورية والبسيطة ومعايرة الرادار وتحديثات برمجيات كمبيوتر السيارة في عمان، الأردن.'
      : 'Pricing for Honda routine maintenance, engine service, ADAS calibrations, and ECU software flashes in Amman, Jordan.',
    alternates: getAlternates(lang, '/pricing'),
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const { heroPricing, pricingPricing, comparisonPricing, faqs3Pricing } = getPricingData(lang);
  const { contactHome } = getHomeData(lang);

  return (
    <>
      <Hero {...heroPricing} />
      <Pricing {...pricingPricing} />
      <Comparison {...comparisonPricing} />
      <FAQs3 {...faqs3Pricing} />
      
      {/* Contact Section instead of CallToAction block */}
      <Contact {...contactHome} />
    </>
  );
}
