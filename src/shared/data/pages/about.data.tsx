import {
  IconAdjustments,
  IconAward,
  IconBook,
  IconBulb,
  IconCirclesRelation,
  IconHeartHandshake,
  IconNumber1,
  IconNumber2,
  IconNumber3,
  IconPalette,
  IconPuzzle2,
  IconUser,
  IconShieldCheckFilled
} from '@tabler/icons-react';
import {
  FAQsProps,
  FeaturesProps,
  HeroProps,
  StepsProps,
} from '~/shared/types';

export const getAboutData = (lang: string) => {
  const isAr = lang === 'ar';

  const hero2About: HeroProps = {
    title: isAr ? 'مرحباً بكم في مركز حسام للصيانة' : 'Welcome to Hossam Maintenance Center',
    subtitle: isAr
      ? 'شريكك الموثوق لصيانة سيارات هوندا المتخصصة في عمان، الأردن. مع أكثر من 30 عاماً من الخبرة، نفخر بتقديم التميز والاحترافية والالتزام بالمعايير المهنية العالية لحفظ كفاءة سيارتك.'
      : 'Your trusted partner for specialized Honda car maintenance. With over 30 years of experience, we pride ourselves on delivering excellence, professionalism, and ethical standards to keep your Honda running at its best.',
    callToAction: {
      text: isAr ? 'احجز خدمة' : 'Book a Service',
      href: `/${lang}/contact`,
    },
    image: {
      src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1729420448/honda_accord_ehev_2023_8k-2560x1440_l57tzd.webp',
      alt: 'Honda Accord eHEV',
    },
  };

  const featuresFourAbout: FeaturesProps = {
    id: 'features-four-on-about',
    hasBackground: false,
    header: {
      title: isAr ? 'رسالتنا وهدفنا' : 'Our mission',
      subtitle: isAr
        ? 'تقديم خدمات صيانة سيارات هوندا على أعلى مستوى من الجودة والمهنية، وتوفير قطع غيار أصلية موثوقة لضمان سلامة وأمان وراحة عملائنا التامة وتوفير أقصى عمر افتراضي لمركباتهم.'
        : 'To provide top-tier maintenance services and genuine spare parts, ensuring reliability, safety, and optimal performance for Honda vehicles. We aim to exceed customer expectations.',
      tagline: isAr ? 'الرسالة والقيم' : 'Mission and Values',
    },
  };

  const featuresFourAboutTwo: FeaturesProps = {
    id: 'features-four-on-about-two',
    hasBackground: false,
    header: {
      title: isAr ? 'قيمنا المهنية' : 'Our values',
      subtitle: isAr 
        ? 'مركز حسام للصيانة - شريكك الدائم للحفاظ على أمان وجاهزية سيارتك الهوندا.' 
        : 'Hossam Maintenance Center—your partner in keeping your Honda in peak condition.',
    },
    isAfterContent: true,
    columns: 2,
    items: [
      {
        title: isAr ? 'التركيز على رضا العميل' : 'Customer-centricity',
        description: isAr ? 'نضع مصلحة العميل ورضاه التام في مقدمة أولوياتنا في كل خدمة صيانة.' : 'We prioritize your satisfaction with every service.',
        icon: IconUser,
      },
      {
        title: isAr ? 'الابتكار والتحديث التكنولوجي' : 'Innovation and adaptability',
        description: isAr
          ? 'نستخدم أحدث أجهزة تشخيص الفحص بالكمبيوتر وتحديث البرمجيات ومعايرة الرادارات.'
          : 'Utilizing the latest tools and technologies to enhance your vehicle\'s performance.',
        icon: IconBulb,
      },
      {
        title: isAr ? 'ضمان الجودة الفنية' : 'Quality assurance',
        description: isAr ? 'نضمن جودة العمل ونستخدم فقط قطع الغيار الأصلية المعتمدة لضمان الأداء الأقصى.' : 'Ensuring every part and service meets the highest standards.',
        icon: IconThumbUpPlaceholder as any || IconUser,
      },
      {
        title: isAr ? 'الالتزام والشفافية والأمانة' : 'Collaboration and Trust',
        description: isAr
          ? 'نبني علاقات طويلة الأمد مع عملائنا قائمة على الأمانة والوضوح وتقديم النصائح الصادقة.'
          : 'Building lasting relationships through honesty and transparency.',
        icon: IconHeartHandshake,
      },
      {
        title: isAr ? 'المهنية والمعايير الأخلاقية' : 'Ethical Practices',
        description: isAr ? 'نلتزم بالمعايير الأخلاقية والمهنية العالية والصدق والنزاهة في تسعير وتنفيذ الخدمات.' : 'Upholding integrity in all aspects of our work.',
        icon: IconShieldCheckFilled,
      },
    ],
  };

  const stepsAbout: StepsProps = {
    id: 'steps-on-about',
    hasBackground: true,
    isImageDisplayed: false,
    header: {
      title: isAr ? 'تاريخ مسيرتنا وخبرتنا' : 'History of Hossam Maintenance Center',
      subtitle: isAr
        ? 'تأسس مركز حسام منذ أكثر من ثلاثة عقود، ونما من ورشة صغيرة متخصصة ليصبح اسماً رائداً ومرجعاً أولاً في عمان لصيانة سيارات هوندا. تتميز مسيرتنا بالالتزام الكامل بالجودة والابتكار وخدمة المجتمع.'
        : 'Founded over three decades ago, Hossam Maintenance Center has grown into a leading name in Honda car maintenance in Amman, Jordan.',
      tagline: isAr ? 'تاريخ المركز' : 'Company History',
    },
    items: [
      {
        title: isAr ? 'التأسيس والانطلاق' : 'Our foundation',
        description: isAr
          ? 'بدأنا بورشة متخصصة وهدف واضح: توفير صيانة هوندا موثوقة واحترافية تسد الفجوة في السوق المحلي.'
          : 'Established with a mission to provide reliable and professional car maintenance services.',
        icon: IconNumber1,
      },
      {
        title: isAr ? 'التوسع واكتساب الثقة' : 'Growth and Expertise',
        description: isAr
          ? 'توسيع خدماتنا وتدريب الفنيين والتعاقد لتأمين قطع الغيار الأصلية لجميع الفئات والموديلات.'
          : 'Expanding our services and expertise to meet evolving customer needs.',
        icon: IconNumber2,
      },
      {
        title: isAr ? 'الريادة والتحديث الإلكتروني' : 'Commitment to Excellence',
        description: isAr
          ? 'إدخال أجهزة فحص السيارات الذكية، وتحديث برمجيات الـ ECU ومعايرة رادارات Honda Sensing.'
          : 'Continuously upgrading our facilities, tools, and training to remain at the forefront of the industry.',
        icon: IconNumber3,
      },
    ],
  };

  const features3About: FeaturesProps = {
    id: 'featuresThree-on-about',
    hasBackground: false,
    columns: 3,
    header: {
      title: isAr ? 'ثقافة العمل والتميز لدينا' : 'Our culture',
      subtitle: isAr
        ? 'نحن نؤمن بالتدريب المستمر والعمل بروح الفريق وتطوير المهارات لضمان تقديم أفضل خدمة.'
        : 'At Hossam Maintenance Center, we foster a culture of excellence and teamwork.',
      tagline: isAr ? 'ثقافة العمل' : 'culture',
    },
    items: [
      {
        title: isAr ? 'التواصل الصادق مع العميل' : 'Customer engagement',
        description: isAr ? 'نستمع لمخاوف العميل حول سيارته ونشرح له الخلل بوضوح ونقدم حلولاً مخصصة.' : 'We listen, adapt, and deliver personalized solutions.',
        icon: IconCirclesRelation,
      },
      {
        title: isAr ? 'التطوير المستمر والتعلم' : 'Continuous learning',
        description: isAr ? 'نستثمر في تدريب وتطوير فنيينا باستمرار للتعامل مع أحدث موديلات سيارات هوندا الهجينة والكهربائية.' : 'Investing in training to ensure our team remains highly skilled.',
        icon: IconBook,
      },
      {
        title: isAr ? 'النزاهة والشفافية' : 'Integrity & Transparency',
        description: isAr ? 'توفير التقديرات المالية الحقيقية وتقديم قطع الغيار الأصلية مع الضمان دون أي تلاعب.' : 'Providing honest estimates and genuine parts with clear communication.',
        icon: IconAdjustments,
      },
    ],
  };

  const featuresAbout: FeaturesProps = {
    id: 'features-on-about',
    hasBackground: true,
    header: {
      title: isAr ? 'سجل التميز والإنجازات لدينا' : 'Our record of excellence',
      tagline: isAr ? 'الإنجازات' : 'Achievements',
    },
    columns: 1,
    items: [
      {
        title: isAr ? 'السمعة الطيبة والتقييمات الممتازة' : 'Local Recognition',
        description: isAr
          ? 'حاصلون على مئات التقييمات الممتازة على خرائط جوجل وشبكات التواصل الاجتماعي لثقة عملائنا بنا.'
          : 'Recognized locally for exceptional service and high customer satisfaction ratings.',
        icon: IconAward,
      },
      {
        title: isAr ? 'الريادة في صيانة سيارات هوندا الحديثة' : 'Honda Tech Leadership',
        description: isAr
          ? 'من أوائل المراكز المجهزة خارج الوكالة لمعايرة رادارات Honda Sensing وبرمجة الـ ECU.'
          : 'A pioneer center in Amman offering advanced Honda Sensing radar and camera calibrations.',
        icon: IconAward,
      },
    ],
  };

  return {
    hero2About,
    featuresFourAbout,
    featuresFourAboutTwo,
    stepsAbout,
    features3About,
    featuresAbout,
  };
};

const IconThumbUpPlaceholder = IconUser; // Fallback for IconThumbUp if not in scope
export const hero2About = {} as any;
export const featuresFourAbout = {} as any;
export const featuresFourAboutTwo = {} as any;
export const stepsAbout = {} as any;
export const features3About = {} as any;
export const featuresAbout = {} as any;
