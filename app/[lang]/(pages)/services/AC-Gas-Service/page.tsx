import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import FAQs from '~/components/widgets/FAQs';
import Features from '~/components/widgets/Features';
import Hero2 from '~/components/widgets/Hero2';
import Stats from '~/components/widgets/Stats';
import Steps from '~/components/widgets/Steps';
import { getACGasServiceData } from '~/shared/data/pages/ac-gas-service.data';
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
    title: isAr ? 'صيانة وتعبئة غاز مكيف هوندا' : 'Honda AC Gas Refill & Service',
    description: isAr 
      ? 'مركز حسام يقدم خدمات فحص ضغط المكيف وتعبئة غاز الفريون الأصلي لسيارات هوندا مع الكشف عن التسريبات في عمان، الأردن.'
      : 'Hossam Center provides expert AC pressure testing, genuine gas charging, and leak diagnosis for Honda cars in Amman, Jordan.',
    alternates: getAlternates(lang, '/services/AC-Gas-Service'),
  };
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

  return (
    <>
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
