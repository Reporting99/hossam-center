import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import FAQs from '~/components/widgets/FAQs';
import Features from '~/components/widgets/Features';
import Hero2 from '~/components/widgets/Hero2';
import Stats from '~/components/widgets/Stats';
import Steps from '~/components/widgets/Steps';
import { getCarComputerDiagnosticData } from '~/shared/data/pages/car-computer-diagnostic.data';
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
    title: isAr ? 'فحص كمبيوتر سيارات هوندا' : 'Honda Car Computer Diagnostic',
    description: isAr 
      ? 'مركز حسام يقدم خدمات فحص كمبيوتر هوندا وتشخيص الأعطال وقراءتها بدقة عالية باستخدام أحدث الأجهزة الذكية في عمان، الأردن.'
      : 'Hossam Center provides advanced computer diagnostics and OBD checks for Honda cars in Amman, Jordan.',
    alternates: getAlternates(lang, '/services/Car-Computer-Diagnostic'),
  };
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

  return (
    <>
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
