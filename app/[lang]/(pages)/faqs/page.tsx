import type { Metadata } from 'next';
import Hero from '~/components/widgets/Hero';
import FAQs4 from '~/components/widgets/FAQs4';
import Contact from '~/components/widgets/Contact';
import { getFaqsData } from '~/shared/data/pages/faqs.data';
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
    title: isAr ? 'الأسئلة الشائعة حول صيانة هوندا' : 'Honda Service FAQs',
    description: isAr 
      ? 'إجابات على الأسئلة الشائعة حول حجز الصيانة، وقطع الغيار الأصلية، وساعات العمل وموقع مركز حسام في عمان، الأردن.'
      : 'Answers to common questions about appointment bookings, genuine parts, opening hours, and Hossam Center in Amman, Jordan.',
    alternates: getAlternates(lang, '/faqs'),
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const { heroFaqs, faqs4Faqs } = getFaqsData(lang);
  const { contactHome } = getHomeData(lang);

  return (
    <>
      <Hero {...heroFaqs} />
      <FAQs4 {...faqs4Faqs} />
      
      {/* Contact Section instead of CallToAction block */}
      <Contact {...contactHome} />
    </>
  );
}
