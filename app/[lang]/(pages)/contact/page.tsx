import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import Features2 from '~/components/widgets/Features2';
import Hero from '~/components/widgets/Hero';
import { getContactData } from '~/shared/data/pages/contact.data';

interface PageProps {
  params: Promise<{ lang: string }>;
}

import { getAlternates } from '~/utils/utils';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const isAr = lang === 'ar';
  return {
    title: isAr ? 'اتصل بنا' : 'Contact Us',
    description: isAr 
      ? 'تواصل مع مركز حسام لصيانة سيارات هوندا في عمان، الأردن. أرقام الهواتف، والواتساب، وخريطة الموقع وساعات العمل.'
      : 'Get in touch with Hossam Honda Maintenance Center in Amman, Jordan. Phone numbers, WhatsApp, map location, and business hours.',
    alternates: getAlternates(lang, '/contact'),
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const { heroContact, contactData, features2Contact } = getContactData(lang);
  const isAr = lang === 'ar';

  return (
    <>
      <Hero {...heroContact} />
      
      {/* Contact Info (no form) */}
      <Contact {...contactData} />

      {/* Embedded Google Map */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center md:text-left rtl:md:text-right">
          {isAr ? 'موقعنا الجغرافي على الخريطة' : 'Our Google Maps Location'}
        </h2>
        <div className="overflow-hidden rounded-lg shadow-lg border border-gray-200 dark:border-slate-850">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6767.133491741691!2d36.000425899999996!3d31.999758399999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b612a90536ef5%3A0x643be282d9f6516!2z4oCP2YXYsdmD2LIg2K3Ys9in2YUg2LXZitin2YbYqSDYs9mK2KfYsdin2Kog2YfZiNmG2K_YpyBIb25kYSBTZXJ2aWNlIENlbnRlcuKAjw!5e0!3m2!1sen!2sjo!4v1782302624423!5m2!1sen!2sjo"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Hossam Honda Service Center Map"
          />
        </div>
      </div>

      <Features2 {...features2Contact} />
    </>
  );
}
