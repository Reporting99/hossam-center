import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import Features from '~/components/widgets/Features';
import Features3 from '~/components/widgets/Features3';
import Features4 from '~/components/widgets/Features4';
import Hero from '~/components/widgets/Hero';
import Steps from '~/components/widgets/Steps';
import { getAboutData } from '~/shared/data/pages/about.data';
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
    title: isAr ? 'من نحن | مركز صيانة هوندا' : 'About Us | Honda Service Center',
    description: isAr 
      ? 'تعرف على مركز حسام لصيانة سيارات هوندا في عمان، الأردن. خبرة تمتد لأكثر من 30 عاماً في الصيانة وقطع الغيار ومعايرة الرادار.'
      : 'Learn about Hossam Honda Maintenance Center in Amman, Jordan. Over 30 years of experience in repair, spare parts, and ADAS calibrations.',
    alternates: getAlternates(lang, '/about'),
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const {
    hero2About,
    featuresFourAbout,
    featuresFourAboutTwo,
    stepsAbout,
    features3About,
    featuresAbout,
  } = getAboutData(lang);

  const { contactHome } = getHomeData(lang);
  const isAr = lang === 'ar';

  return (
    <>
      <Hero {...hero2About} />
      <Features4 {...featuresFourAbout} />
      <Features4 {...featuresFourAboutTwo} />
      <Steps {...stepsAbout} />
      <Features3 {...features3About} />
      <Features {...featuresAbout} />
      
      {/* Dynamic contact details block (no form!) */}
      <Contact {...contactHome} />
    </>
  );
}
