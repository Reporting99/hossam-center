import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import FAQs from '~/components/widgets/FAQs';
import Features from '~/components/widgets/Features';
import Hero2 from '~/components/widgets/Hero2';
import Stats from '~/components/widgets/Stats';
import Steps from '~/components/widgets/Steps';
import { getMaintenanceData } from '~/shared/data/pages/maintenance.data';
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
    title: isAr ? 'صيانة وإصلاح سيارات هوندا' : 'Honda Maintenance & Repair Services',
    description: isAr 
      ? 'مركز حسام المتخصص في تقديم خدمات صيانة ميكانيكية وكهربائية شاملة لسيارات هوندا في عمان، الأردن.'
      : 'Hossam Center provides comprehensive mechanical and electrical maintenance services for Honda cars in Amman, Jordan.',
    alternates: getAlternates(lang, '/services/Maintenance'),
  };
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

  return (
    <>
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
