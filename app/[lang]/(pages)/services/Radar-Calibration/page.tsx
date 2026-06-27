import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import FAQs from '~/components/widgets/FAQs';
import Features from '~/components/widgets/Features';
import Hero2 from '~/components/widgets/Hero2';
import Stats from '~/components/widgets/Stats';
import Steps from '~/components/widgets/Steps';
import { getRadarCalibrationData } from '~/shared/data/pages/radar calibration.data';
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
    title: isAr ? 'معايرة رادار هوندا Sensing وADAS' : 'Honda Sensing ADAS Radar Calibration',
    description: isAr 
      ? 'مركز حسام المتخصص في معايرة الرادارات والكاميرات الأمامية لسيارات هوندا لضمان عمل أنظمة الأمان بدقة عالية في عمان، الأردن.'
      : 'Hossam Center specializes in radar and front camera calibration for Honda Sensing safety systems in Amman, Jordan.',
    alternates: getAlternates(lang, '/services/Radar-Calibration'),
  };
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

  return (
    <>
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
