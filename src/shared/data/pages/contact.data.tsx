import { IconClock, IconHeadset, IconHelp, IconMapPin, IconMessages, IconPhoneCall } from '@tabler/icons-react';
import { ContactProps, FeaturesProps } from '~/shared/types';
import { HeroProps } from '~/shared/types';
import HossamCenterBuilding from '~/assets/images/Hossam Center Building.webp';
import { getLocalizedHref } from '~/utils/permalinks';

export const getContactData = (lang: string) => {
  const isAr = lang === 'ar';

  const heroContact: HeroProps = {
    title: isAr ? 'تواصل معنا' : 'Get in touch with us',
    subtitle: isAr ? (
      <>
        نشكرك على اختيارك لمركز حسام لصيانة سيارات هوندا. نحن حريصون على تقديم خدمة استثنائية وضمان رضاك. تواصل معنا اليوم ودعنا نساعدك.
      </>
    ) : (
      <>
        Thank you for choosing Hossam Maintenance Center for your Honda car maintenance needs. We are dedicated to providing exceptional service and ensuring your satisfaction. Reach out to us today and let us assist you.
      </>
    ),
  };

  const contactData: ContactProps = {
    id: 'contact-on-contact',
    hasBackground: true,
    header: {
      title: isAr ? 'معلومات الاتصال بنا' : 'Contact Information',
      subtitle: isAr ? (
        <>
          تفضل بزيارة مركزنا أو تواصل معنا مباشرة عبر الهاتف أو الواتساب لحجز موعد صيانة.
        </>
      ) : (
        <>
          Please visit our center or get in touch with us directly by phone or WhatsApp to schedule service.
        </>
      ),
    },
    items: [
      {
        title: isAr ? 'عنواننا' : 'Our Address',
        description: isAr 
          ? ['مركز حسام لصيانة سيارات هوندا', 'شارع الشهيد، عمان، الأردن'] 
          : ['Hossam Honda Service Center', 'Al-Shahid Road, Amman, Jordan'],
        icon: IconMapPin,
      },
      {
        title: isAr ? 'الاتصال والواتساب' : 'Contact & WhatsApp',
        description: isAr ? [
          'هاتف 1: 07 9799 6020',
          'هاتف 2: 07 9532 8713',
          'واتساب: 07 9799 6020'
        ] : [
          'Phone 1: 07 9799 6020',
          'Phone 2: 07 9532 8713',
          'WhatsApp: 07 9799 6020'
        ],
        icon: IconPhoneCall,
      },
      {
        title: isAr ? 'ساعات العمل' : 'Working hours',
        description: isAr 
          ? ['الأحد - الخميس: 09:00 - 18:00', 'الجمعة: مغلق'] 
          : ['Sunday - Thursday: 09:00 - 18:00', 'Friday: Closed'],
        icon: IconClock,
      },
    ],
    image: {
      src: HossamCenterBuilding,
      alt: 'Hossam Honda Maintenance Center Building',
    }
  };

  const features2Contact: FeaturesProps = {
    columns: 3,
    header: {
      title: isAr ? 'مركز الدعم والمساعدة' : 'Support Center',
      subtitle: isAr ? 'تبحث عن شيء معين؟' : 'Looking for something in particular?',
    },
    items: [
      {
        title: isAr ? 'لديك سؤال؟' : 'Have a question?',
        description: isAr ? 'اطلع على الأسئلة الشائعة لدينا' : 'See our frequently asked questions',
        icon: IconHelp,
        callToAction: {
          text: isAr ? 'ذهاب لصفحة الأسئلة الشائعة' : 'Go to FAQ page',
          href: getLocalizedHref('/faqs', lang),
        },
      },
      {
        title: isAr ? 'دردش معنا' : 'Chat with us',
        description: isAr ? 'تحدث مباشرة معنا عبر الواتساب' : 'Live chat with our support team',
        icon: IconMessages,
        callToAction: {
          text: isAr ? 'راسلنا الآن' : 'Write to us',
          href: 'https://wa.me/962797996020',
        },
      },
      {
        title: isAr ? 'اتصل بنا' : 'Call us',
        description: isAr ? 'تحدث مع فريقنا اليوم هاتفياً' : 'Speak to our team today',
        icon: IconHeadset,
        callToAction: {
          text: isAr ? 'اتصل الآن' : 'Call us',
          href: 'tel:+962797996020',
        },
      },
    ],
  };

  return { heroContact, contactData, features2Contact };
};

// Static exports for TS safety
export const heroContact = {} as any;
export const contact2Contact = {} as any;
export const features2Contact = {} as any;
