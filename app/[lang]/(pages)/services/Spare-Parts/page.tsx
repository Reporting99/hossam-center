import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import FAQs from '~/components/widgets/FAQs';
import Features from '~/components/widgets/Features';
import Hero2 from '~/components/widgets/Hero2';
import Stats from '~/components/widgets/Stats';
import Steps from '~/components/widgets/Steps';
import { getSparePartsData } from '~/shared/data/pages/spare parts.data';
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
    title: isAr ? 'قطع غيار سيارات هوندا الأصلية' : 'Honda Genuine Spare Parts',
    description: isAr 
      ? 'نوفر قطع غيار هوندا الأصلية وبدائل عالية الجودة وبوش لضمان أداء وأمان سيارتك في عمان، الأردن.'
      : 'We supply genuine Honda parts, high-quality alternatives, and Bosch parts to ensure performance and safety in Amman, Jordan.',
    alternates: getAlternates(lang, '/services/Spare-Parts'),
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  
  const {
    herospareparts,
    statsspareparts,
    featuresspareparts,
    stepsspareparts,
    faqsspareparts,
  } = getSparePartsData(lang);

  const { contactHome } = getHomeData(lang);
  const isAr = lang === 'ar';

  return (
    <>
      <Hero2 {...herospareparts} />
      <Stats {...statsspareparts} />
      <Features {...featuresspareparts} />
      <Steps
        id={stepsspareparts.id}
        header={{
          title: isAr ? 'كيفية الحصول على قطع الغيار' : 'Our Process',
          subtitle: isAr ? 'عملية مبسطة لطلب وتركيب قطع الغيار المناسبة تماماً لسيارتك.' : 'A simplified process to order and install the right parts.',
        }}
        items={stepsspareparts.items}
        image={stepsspareparts.image}
      />
      <FAQs {...faqsspareparts} />
      
      {/* Contact Section (with new phone numbers and WhatsApp, no form!) */}
      <Contact {...contactHome} />
    </>
  );
}
