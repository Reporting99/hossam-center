import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import FAQs from '~/components/widgets/FAQs';
import Features from '~/components/widgets/Features';
import Hero2 from '~/components/widgets/Hero2';
import Stats from '~/components/widgets/Stats';
import Steps from '~/components/widgets/Steps';
import { getComputerSoftwareUpdateData } from '~/shared/data/pages/computer-software-update.data';
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
    title: isAr ? 'تحديث برمجيات كمبيوتر سيارات هوندا' : 'Honda Car Computer Software Update',
    description: isAr 
      ? 'مركز حسام يقدم خدمات برمجة وتحديث كمبيوتر سيارات هوندا والـ ECU وإعادة التهيأة بأعلى المعايير في عمان، الأردن.'
      : 'Hossam Center provides official computer software updates and ECU flashes for Honda cars in Amman, Jordan.',
    alternates: getAlternates(lang, '/services/Computer-Software-Update'),
  };
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

  return (
    <>
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
