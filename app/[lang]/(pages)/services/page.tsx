import { Metadata } from 'next';
import Content from '~/components/widgets/Content';
import FAQs2 from '~/components/widgets/FAQs2';
import Features2 from '~/components/widgets/Features2';
import Features4 from '~/components/widgets/Features4';
import Hero from '~/components/widgets/Hero';
import Contact from '~/components/widgets/Contact';
import { getServicesData } from '~/shared/data/pages/services.data';
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
    title: isAr ? 'خدمات صيانة هوندا المميزة' : 'Honda Car Maintenance Services',
    description: isAr 
      ? 'اكتشف خدماتنا لسيارات هوندا: صيانة عامة، قطع غيار أصلية، معايرة الرادار، فحص كمبيوتر وتحديث برمجيات هوندا في عمان، الأردن.'
      : 'Explore our services for Honda vehicles: general maintenance, spare parts, radar calibration, OBD diagnostics, and software updates in Amman, Jordan.',
    alternates: getAlternates(lang, '/services'),
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const {
    heroServices,
    features2Services,
    contentServicesOne,
    contentServicesTwo,
    features4Services,
    faqsServices,
  } = getServicesData(lang);

  const { contactHome } = getHomeData(lang);

  return (
    <>
      <Hero {...heroServices} />
      <Features2 {...features2Services} />
      <Content {...contentServicesOne} />
      <Content {...contentServicesTwo} />
      <Features4 {...features4Services} />
      <FAQs2 {...faqsServices} />
      
      {/* Contact Section instead of CallToAction block */}
      <Contact {...contactHome} />
    </>
  );
}
