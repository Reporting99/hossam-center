import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconTools,
  IconSettings,
  IconShieldCheck,
  IconCpu,
  IconRotate2,
  IconPhone,
  IconBrandWhatsapp,
  IconHelp,
  IconHeadset,
  IconMapPin,
} from '@tabler/icons-react';
import { AnnouncementProps, FooterProps, HeaderProps } from '../types';
import Image from 'next/image';
import { getLocalizedHref } from '~/utils/permalinks';

export const getGlobalData = (lang: string) => {
  const isAr = lang === 'ar';

  const announcementData: AnnouncementProps = {
    title: isAr ? 'جديد' : 'NEW',
    callToAction: {
      text: isAr
        ? 'اكتشف الخدمات المقدمة من مركز حسام لصيانة سيارات هوندا.'
        : 'Discover the services provided by Hossam Center for Honda vehicle maintenance.',
      href: getLocalizedHref('/services', lang),
    },
    callToAction2: {
      text: isAr ? 'تابعنا على فيسبوك!' : 'Follow us on Facebook!',
      href: 'https://www.facebook.com/HondaHousam',
    },
  };

  const headerData: HeaderProps = {
    links: [
      {
        label: isAr ? 'الرئيسية' : 'Home',
        href: getLocalizedHref('/', lang),
      },
      {
        label: isAr ? 'خدماتنا' : 'Services',
        href: getLocalizedHref('/services', lang),
        links: [
          { label: isAr ? 'فحص كمبيوتر السيارة' : 'Car Computer Diagnostic', href: getLocalizedHref('/services/Car-Computer-Diagnostic', lang) },
          { label: isAr ? 'تحديث برمجيات السيارة' : 'Computer Software Update', href: getLocalizedHref('/services/Computer-Software-Update', lang) },
          { label: isAr ? 'صيانة عامة' : 'Maintenance', href: getLocalizedHref('/services/Maintenance', lang) },
          { label: isAr ? 'صيانة وتعبئة غاز المكيف' : 'AC Gas Refill & Service', href: getLocalizedHref('/services/AC-Gas-Service', lang) },
          { label: isAr ? 'معايرة الرادار' : 'Radar Calibration', href: getLocalizedHref('/services/Radar-Calibration', lang) },
          { label: isAr ? 'قطع غيار' : 'Spare Parts', href: getLocalizedHref('/services/Spare-Parts', lang) },
        ],
      },
      {
        label: isAr ? 'المقالات' : 'Blog',
        href: getLocalizedHref('/blog', lang),
      },
      {
        label: isAr ? 'من نحن' : 'About Us',
        href: getLocalizedHref('/about', lang),
      },
      {
        label: isAr ? 'اتصل بنا' : 'Contact Us',
        href: getLocalizedHref('/contact', lang),
      },
    ],
    actions: [
      {
        text: isAr ? 'اتصل الآن' : 'Call Now',
        href: 'tel:+962797996020',
        targetBlank: false,
      },
    ],
    isSticky: true,
    showToggleTheme: true,
    showRssFeed: false,
    position: 'right',
  };

  const footerData: FooterProps = {
    title: isAr ? 'مركز حسام' : 'Hossam Center',
    links: [
      {
        label: isAr ? 'الشروط والأحكام' : 'Terms & Conditions',
        href: getLocalizedHref('/terms', lang),
      },
      {
        label: isAr ? 'سياسة الخصوصية' : 'Privacy Policy',
        href: getLocalizedHref('/privacy', lang),
      },
      {
        label: isAr ? 'الأسئلة الشائعة' : 'FAQs',
        href: getLocalizedHref('/faqs', lang),
      },
    ],
    columns: [
      {
        title: isAr ? 'الخدمات' : 'Services',
        links: [
          {
            label: isAr ? 'صيانة عامة' : 'Maintenance',
            href: getLocalizedHref('/services/Maintenance', lang),
            icon: IconTools,
          },
          {
            label: isAr ? 'قطع الغيار' : 'Spare Parts',
            href: getLocalizedHref('/services/Spare-Parts', lang),
            icon: IconSettings,
          },
          {
            label: isAr ? 'معايرة الرادار' : 'Radar Calibration',
            href: getLocalizedHref('/services/Radar-Calibration', lang),
            icon: IconShieldCheck,
          },
          {
            label: isAr ? 'فحص كمبيوتر السيارة' : 'Car Computer Diagnostic',
            href: getLocalizedHref('/services/Car-Computer-Diagnostic', lang),
            icon: IconCpu,
          },
          {
            label: isAr ? 'تحديث برمجيات السيارة' : 'Computer Software Update',
            href: getLocalizedHref('/services/Computer-Software-Update', lang),
            icon: IconRotate2,
          },
        ],
      },
      {
        title: isAr ? 'اتصل بنا' : 'Contact',
        links: [
          {
            label: isAr ? 'هاتف 1: 07 9799 6020' : 'Phone 1: 07 9799 6020',
            href: 'tel:+962797996020',
            icon: IconPhone,
          },
          {
            label: isAr ? 'هاتف 2: 07 9532 8713' : 'Phone 2: 07 9532 8713',
            href: 'tel:+962795328713',
            icon: IconPhone,
          },
          {
            label: isAr ? 'واتساب: 07 9799 6020' : 'WhatsApp: 07 9799 6020',
            href: 'https://wa.me/962797996020',
            icon: IconBrandWhatsapp,
          },
        ],
      },
      {
        title: isAr ? 'الدعم' : 'Support',
        links: [
          {
            label: isAr ? 'الأسئلة الشائعة' : 'FAQs',
            href: getLocalizedHref('/faqs', lang),
            icon: IconHelp,
          },
          {
            label: isAr ? 'خدمة العملاء' : 'Customer Support',
            href: getLocalizedHref('/contact', lang),
            icon: IconHeadset,
          },
          {
            label: isAr ? 'الموقع الجغرافي' : 'Google Map Location',
            href: 'https://share.google/S6jgdB6WK3Iy9qppS',
            icon: IconMapPin,
          },
        ],
      },
    ],
    socials: [
      { label: 'Tiktok', icon: IconBrandTiktok, href: 'https://www.tiktok.com/@housam.maintenance.honda?_t=8qEW0swwCJj&_r=1' },
      { label: 'Instagram', icon: IconBrandInstagram, href: 'https://www.instagram.com/housammainten/' },
      { label: 'Facebook', icon: IconBrandFacebook, href: 'https://www.facebook.com/HondaHousam' },
    ],
    footNote: (
      <div className="mr-4 rtl:mr-0 rtl:ml-4 text-sm flex items-center gap-3 flex-wrap justify-center md:justify-start">
        <span className="text-gray-600 dark:text-gray-400">
          {isAr ? 'جميع الحقوق محفوظة لمركز حسام 2026' : 'All rights reserved to Hossam Center 2026'}
        </span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
          {isAr ? 'بدعم من' : 'Powered by'}
          <a href="https://dfeelings.com/en" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1 font-semibold text-primary-600 dark:text-primary-400">
            <Image
              src="https://ik.imagekit.io/oq92dh6zib/dfeelings-logo.png?updatedAt=1775732382228"
              alt="Dfeelings Logo"
              width={60}
              height={15}
              className="object-contain"
              style={{ height: 'auto', width: '60px' }}
            />
          </a>
        </span>
      </div>
    ),
  };

  return { announcementData, headerData, footerData };
};

// Retain legacy unused structures for TS compatibility if needed, but export empty placeholders
export const announcementData = { title: '', callToAction: {}, callToAction2: {} } as any;
export const headerData = { links: [], actions: [], isSticky: true, showToggleTheme: true, showRssFeed: false, position: 'right' } as any;
export const footerData = { title: '', links: [], columns: [], socials: [], footNote: null } as any;
export const footerData2 = { links: [], columns: [], socials: [], footNote: null } as any;
