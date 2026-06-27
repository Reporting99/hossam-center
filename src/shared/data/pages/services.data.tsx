import {
  IconAddressBook,
  IconCarCrash,
  IconCarGarage,
  IconCarTurbine,
  IconDeviceDesktopAnalytics,
  IconListCheck,
  IconRocket,
  IconRotate2,
  IconTools,
} from '@tabler/icons-react';
import {
  CallToActionProps,
  ContentProps,
  FAQsProps,
  FeaturesProps,
  HeroProps,
  TestimonialsProps,
} from '~/shared/types';
import { getLocalizedHref } from '~/utils/permalinks';

export const getServicesData = (lang: string) => {
  const isAr = lang === 'ar';

  const heroServices: HeroProps = {
    title: isAr ? 'خدماتنا المميزة' : 'Our Services',
    subtitle: isAr
      ? 'نقدم صيانة شاملة لسيارات هوندا وتوفير قطع الغيار الأصلية في عمان لأكثر من 30 عاماً. التزامنا بالجودة يضمن أمان وسلامة سيارتك.'
      : 'Providing top-tier Honda maintenance and original spare parts for over 30 years. Our commitment to quality and excellence ensures your car runs smoothly.',
    callToAction: {
      text: isAr ? 'احجز خدمة' : 'Book a Service',
      href: getLocalizedHref('/contact', lang),
      icon: IconAddressBook,
    },
    callToAction2: {
      text: isAr ? 'من نحن' : 'Learn more',
      href: getLocalizedHref('/about', lang),
    },
    image: {
      src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1728064796/services_hero_cover_khe1qq.webp',
      alt: 'Honda Services Hero',
    },
  };

  const features2Services: FeaturesProps = {
    id: 'featuresTwo-on-services',
    header: {
      title: isAr ? 'أهم 6 خدمات نقدمها' : 'Our Top 6 Services',
    },
    items: [
      {
        title: isAr ? 'الصيانة العامة' : 'Maintenance',
        description: isAr
          ? 'فنيونا مجهزون تماماً لتقديم خدمات صيانة وإصلاح شاملة للميكانيك والكهرباء لسيارات هوندا.'
          : 'Our skilled technicians are fully equipped to provide comprehensive maintenance services for your Honda.',
        icon: IconCarGarage,
        callToAction: {
          text: isAr ? 'اعرف المزيد' : 'Learn more',
          href: getLocalizedHref('/services/Maintenance', lang),
        },
      },
      {
        title: isAr ? 'قطع الغيار الأصلية' : 'Spare Parts',
        description: isAr
          ? 'نوفر قطع غيار هوندا الأصلية وقطع غيار بوش عالية الجودة لجميع الفئات والموديلات.'
          : 'Get high-quality genuine parts for your Honda, ensuring optimal performance and safety.',
        icon: IconCarTurbine,
        callToAction: {
          text: isAr ? 'اعرف المزيد' : 'Learn more',
          href: getLocalizedHref('/services/Spare-Parts', lang),
        },
      },
      {
        title: isAr ? 'صيانة وتعبئة غاز المكيف' : 'AC Gas Refill & Service',
        description: isAr
          ? 'تعبئة غاز مكيف هوندا الأصلي وفحص تسريب دورة التكييف لضمان أفضل برودة وقوة دفع للهواء.'
          : 'Professional Honda AC gas charging, leak detection, and cooling system maintenance for optimal cabin climate.',
        icon: IconTools,
        callToAction: {
          text: isAr ? 'اعرف المزيد' : 'Learn more',
          href: getLocalizedHref('/services/AC-Gas-Service', lang),
        },
      },
      {
        title: isAr ? 'معايرة الرادار وكاميرات الأمان' : 'Radar Calibration',
        description: isAr
          ? 'معايرة دقيقة لأنظمة الرادار الأمامي وكاميرات الزجاج الأمامي Honda Sensing لضمان عمل أنظمة الأمان.'
          : 'Ensure your vehicle\'s safety systems function accurately with precise radar calibration by our experts.',
        icon: IconCarCrash,
        callToAction: {
          text: isAr ? 'اكتشف الآن' : 'Discover now',
          href: getLocalizedHref('/services/Radar-Calibration', lang),
        },
      },
      {
        title: isAr ? 'فحص الكمبيوتر الذكي' : 'Car Computer Diagnostic',
        description: isAr
          ? 'فحص كمبيوتر هوندا بأحدث الأجهزة للكشف الدقيق عن الأعطال وقراءتها وتوليد التقارير الفنية.'
          : 'Our advanced car computer diagnostic tools ensure accurate assessments to maintain performance.',
        icon: IconDeviceDesktopAnalytics,
        callToAction: {
          text: isAr ? 'اعرف المزيد' : 'Learn more',
          href: getLocalizedHref('/services/Car-Computer-Diagnostic', lang),
        },
      },
      {
        title: isAr ? 'تحديث برمجيات السيارة (ECU)' : 'Computer Software Update',
        description: isAr
          ? 'تحديث برمجيات كمبيوتر سيارة هوندا وإعادة تهيئة وحدات التحكم لمعالجة الأعطال وتحسين الكفاءة.'
          : 'Keep your vehicle\'s systems up-to-date with our computer software updates, ensuring optimal performance.',
        icon: IconRotate2,
        callToAction: {
          text: isAr ? 'اعرف المزيد' : 'Learn more',
          href: getLocalizedHref('/services/Computer-Software-Update', lang),
        },
      },
    ],
  };

  const contentServicesOne: ContentProps = {
    id: 'contentOne-on-services-one',
    hasBackground: false,
    content: isAr
      ? 'في مركز حسام للصيانة، نفخر بتقديم خدمات متخصصة ومصممة خصيصاً للحفاظ على سيارتك الهوندا تعمل بأقصى كفاءة. من الفحص الشامل للمركبة إلى الفحوصات التشخيصية المتقدمة بالكمبيوتر، نضمن أفضل رعاية ممكنة لسيارتك.'
      : 'At Hossam Maintenance Center, we take pride in offering specialized services designed to keep your Honda running smoothly. From comprehensive inspections to advanced diagnostics, we ensure the best care for your vehicle.',
    items: [
      {
        title: isAr ? 'فحوصات شاملة ودقيقة' : 'Comprehensive Inspections',
        description: isAr
          ? 'تحدد فحوصاتنا الشاملة للمركبة أي مشاكل تحتاج إلى اهتمام أو إصلاح لضمان السلامة التامة.'
          : 'Our thorough vehicle inspections identify areas needing attention, ensuring safety and reliability.',
      },
      {
        title: isAr ? 'أعمال المحرك والميكانيك' : 'Engine & Mechanical repairs',
        description: isAr
          ? 'يقدم خبراؤنا تشخيصاً دقيقاً للمحرك وإصلاح الأعطال الميكانيكية لزيادة الأداء وتوفير الوقود.'
          : 'Our experts provide in-depth engine diagnostics and repairs to enhance performance and efficiency.',
      },
      {
        title: isAr ? 'تغيير الزيت وفحص الفرامل' : 'Oil Change & Brake Systems',
        description: isAr
          ? 'نستخدم فقط زيوتاً وفلاتر أصلية عالية الجودة ونقوم بفحص نظام الفرامل للتأكد من سلامة التوقف.'
          : 'We use only high-quality oil and perform brake checks to ensure long-term reliability and safety.',
      },
    ],
    image: {
      src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1728121857/Hossam_Maintenance_Center_u6pk8i.webp',
      alt: 'Honda Inspection',
    },
    isReversed: true,
    isAfterContent: false,
  };

  const contentServicesTwo: ContentProps = {
    id: 'contentOne-on-services-two',
    hasBackground: false,
    content: isAr
      ? 'تتبع عملية الصيانة لدينا نهجاً مفصلاً ومنظماً لضمان صيانة سيارتك الهوندا بأعلى درجات العناية والدقة.'
      : 'Our maintenance process follows a detailed, step-by-step approach to ensure your Honda is serviced with the utmost care and precision.',
    items: [
      {
        title: isAr ? 'الخطوة 1: الفحص المبدئي الشامل' : 'Step 1: Comprehensive Inspection',
        description: isAr ? 'نبدأ بفحص كامل للمركبة لتحديد المشاكل والأجزاء التي تتطلب صيانة فورية.' : 'We start with a complete vehicle inspection to identify issues and areas that require immediate attention.',
      },
      {
        title: isAr ? 'الخطوة 2: صيانة المحرك والميكانيك' : 'Step 2: Engine & Mechanical Work',
        description: isAr ? 'يقوم فنيونا بفحص كمبيوتر المحرك وإصلاح الأعطال لضمان العزم وتوفير الوقود.' : 'Our technicians perform detailed engine diagnostics and repairs to enhance performance and fuel efficiency.',
      },
      {
        title: isAr ? 'الخطوة 3: غيار الزيت ونظام الفرامل' : 'Step 3: Oil Change & Brake Check',
        description: isAr ? 'استخدام زيوت معتمدة وفلاتر أصلية، مع فحص كامل لمنظومة الفرامل والبريكات.' : 'We use high-quality oil for changes and perform thorough brake checks to ensure safety.',
      },
      {
        title: isAr ? 'الخطوة 4: جاهزية الطريق والأمان' : 'Step 4: Ready for the Road',
        description: isAr ? 'بمجرد الانتهاء، نتحقق من سلامة جميع الأنظمة لتكون مركبتك جاهزة للانطلاق تماماً.' : 'Once all maintenance is complete, we ensure your Honda is in optimal condition for your next drive.',
      },
    ],
    image: {
      src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1728121857/Oil_Change_and_Brake_Check_ad1xib.webp',
      alt: 'Maintenance Steps',
    },
    isReversed: false,
    isAfterContent: true,
  };

  const features4Services: FeaturesProps = {
    id: 'featuresFour-on-services',
    hasBackground: true,
    columns: 2,
    header: {
      title: isAr ? 'لماذا تختار مركز حسام لصيانة هوندا؟' : 'Why Choose Hossam Maintenance Center?',
      subtitle: isAr
        ? 'لأكثر من 30 عاماً، حظينا بثقة مئات من مالكي سيارات هوندا في الأردن. نلتزم بتقديم الخبرة الفنية العالية، واستخدام قطع غيار أصلية وضمان رضا العملاء التام.'
        : 'For over 30 years, we have been a trusted provider of Honda car maintenance services, offering expertise, genuine parts, and unparalleled customer satisfaction.',
    },
    isImageDisplayed: true,
    image: {
      src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1728121841/Certified_Technicians_kbnwau.jpg',
      alt: 'Certified Honda Techs',
    },
    items: [
      {
        title: isAr ? 'فنيون معتمدون وذوو خبرة' : 'Certified Technicians',
        description: isAr ? 'فنيونا مدربون ومؤهلون تماماً لصيانة سيارات هوندا وتشخيص أعقد الأعطال بدقة.' : 'Our skilled technicians are fully certified and trained in Honda vehicle maintenance.',
      },
      {
        title: isAr ? 'قطع غيار هوندا الأصلية' : 'Genuine Honda Parts',
        description: isAr ? 'نستخدم قطع الغيار الأصلية المعتمدة لضمان احتفاظ سيارتك بقيمتها وموثوقيتها وأمانها.' : 'We use only genuine Honda parts to ensure your vehicle maintains its original performance.',
      },
      {
        title: isAr ? 'أدوات فحص متقدمة' : 'State-of-the-Art Diagnostics',
        description: isAr ? 'مرفقنا مجهز بأحدث أدوات التشخيص بالكمبيوتر ومعايرة الرادارات وأنظمة الكاميرات.' : 'Our facility is equipped with the latest diagnostic tools to accurately assess and repair your Honda.',
      },
      {
        title: isAr ? 'أكثر من 30 عاماً من الخبرة' : '30+ Years of Experience',
        description: isAr ? 'خبرتنا الطويلة تمكننا من فهم جميع تفاصيل ومشاكل سيارات هوندا وحلها بمهارة.' : 'With over 30 years of experience in Honda maintenance, we have built a reputation for trust.',
      },
    ],
  };

  const faqsServices: FAQsProps = {
    id: 'faqs-on-services',
    hasBackground: true,
    header: {
      title: isAr ? 'الأسئلة الشائعة حول خدماتنا' : 'Frequently Asked Questions',
      subtitle: isAr
        ? 'إجابات على الأسئلة الشائعة حول خدمات صيانة وإصلاح سيارات هوندا.'
        : 'Here you can find answers to the most common questions about our Honda car maintenance services.',
      tagline: 'FAQS',
    },
    items: isAr ? [
      {
        title: 'ما هي الخدمات التي يقدمها مركز حسام؟',
        description: 'نحن متخصصون في صيانة سيارات هوندا، ونوفر خدمات فحص الكمبيوتر، تحديث البرمجيات، معايرة رادارات الأمان ADAS، غيار الزيت والفلتر، وإصلاح الميكانيك والكهرباء وتوفير قطع الغيار.',
      },
      {
        title: 'هل تستخدمون قطع غيار أصلية؟',
        description: 'نعم، نوفر قطع غيار هوندا الأصلية المعتمدة لضمان ملاءمتها الكاملة وأدائها المثالي لسيارتك.',
      },
      {
        title: 'كيف يمكنني حجز موعد؟',
        description: 'يمكنك الاتصال بنا هاتفياً على أرقامنا أو إرسال رسالة مباشرة عبر الواتساب لحجز الموعد المناسب لك.',
      },
    ] : [
      {
        title: 'What services does Hossam Center provide?',
        description: 'We specialize in Honda maintenance, offering computer diagnostics, software updates, ADAS radar calibration, oil/filter changes, mechanical/electrical repairs, and parts supply.',
      },
      {
        title: 'Do you offer genuine parts?',
        description: 'Yes, we source and install genuine Honda spare parts to ensure the highest standards of safety and durability.',
      },
      {
        title: 'How can I book an appointment?',
        description: 'You can easily schedule a service by calling us directly or via WhatsApp messages.',
      },
    ],
  };

  return {
    heroServices,
    features2Services,
    contentServicesOne,
    contentServicesTwo,
    features4Services,
    faqsServices,
  };
};

// Static placeholders for TS compile
export const heroServices = {} as any;
export const features2Services = {} as any;
export const contentServicesOne = {} as any;
export const contentServicesTwo = {} as any;
export const features4Services = {} as any;
export const testimonialsServices = {} as any;
export const faqsServices = {} as any;
export const callToActionServices = {} as any;
