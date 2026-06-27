import {
  IconArrowDown,
  IconPhone,
  IconClock,
  IconCarTurbine,
  IconCarGarage,
  IconDeviceDesktopAnalytics,
  IconRotate2,
  IconCarCrash,
  IconAddressBook,
  IconPhoneCall,
  IconMapPin,
} from '@tabler/icons-react';
import {
  ContactProps,
  ContentProps,
  FAQsProps,
  FeaturesProps,
  HeroProps,
  StepsProps,
  TestimonialsProps,
} from '../../types';
import hondalogo from '~/assets/images/hondalogo.webp';
import oemparts from '~/assets/images/honda-genuine.webp';
import AutoHonda from '~/assets/images/Auto Honda Body & Parts.png';
import bosch from '~/assets/images/Bosch-Logo.png';
import MaintenanceProcess from '~/assets/images/Maintenance Process.webp';
import HossamCenterBuilding from '~/assets/images/Hossam Center Building.webp';
import { getLocalizedHref } from '~/utils/permalinks';

export const getHomeData = (lang: string) => {
  const isAr = lang === 'ar';

  const heroHome: HeroProps = {
    title: isAr ? (
      <>
        مرحباً بكم في <span>مركز حسام للصيانة</span> - المتخصص في صيانة سيارات <span>هوندا</span>
      </>
    ) : (
      <>
        Welcome to <span>Hossam Maintenance Center</span> - Specialized in <span>Honda</span> Car Maintenance
      </>
    ),
    subtitle: isAr ? (
      <>
        <span>مركز حسام للصيانة</span> هو مركز موثوق يقدم خدمات صيانة متخصصة وقطع غيار أصلية لسيارات هوندا. نحن ملتزمون بالتميز والمهنية والمعايير الأخلاقية. مع أكثر من 30 عاماً من الخبرة، نقدم أفضل الخدمات لضمان تشغيل سيارتك الهوندا بسلاسة.
      </>
    ) : (
      <>
        Hossam Maintenance Center is a trusted center offering specialized maintenance and original spare parts for Honda cars. We are committed to excellence, professionalism, and ethical standards. With over 30 years of experience, we provide top-tier services to ensure your Honda runs smoothly.
      </>
    ),
    callToAction: {
      text: isAr ? 'احجز خدمة' : 'Book a Service',
      href: getLocalizedHref('/contact', lang),
      icon: IconAddressBook,
      targetBlank: false,
    },
    callToAction2: {
      text: isAr ? 'اعرف المزيد' : 'Learn more',
      href: getLocalizedHref('/about', lang),
    },
    videoSrc: '/videos/video hero cover.mp4',
  };

  const socialProofHome = {
    id: 'socialProof-on-home',
    hasBackground: false,
    images: [
      { link: 'https://www.honda.com/', src: hondalogo, alt: 'Honda Logo' },
      { link: 'https://oempartsonline.com/', src: oemparts, alt: 'OEM Parts Logo' },
      { link: 'https://auto-honda-body-parts.odoo.com/', src: AutoHonda, alt: 'Auto Honda Body & Parts Logo' },
      { link: 'https://www.bosch.com/', src: bosch, alt: 'Bosch Logo' },
    ],
  };

  const featuresHome: FeaturesProps = {
    id: 'features-on-home',
    hasBackground: false,
    columns: 3,
    header: {
      title: isAr ? 'ما يقدمه مركز حسام لسيارتك الهوندا' : 'What Hossam Center Offers for Your Honda',
      subtitle: isAr
        ? 'تقديم صيانة هوندا على أعلى مستوى وقطع الغيار الأصلية لأكثر من 30 عاماً. التزامنا بالجودة والتميز يضمن تشغيل سيارتك بسلاسة لسنوات قادمة.'
        : 'Providing top-tier Honda maintenance and original spare parts for over 30 years. Our commitment to quality and excellence ensures your car runs smoothly for years to come.',
      tagline: isAr ? 'خدماتنا' : 'Our Services',
    },
    items: [
      {
        title: isAr ? 'الصيانة' : 'Maintenance',
        description: isAr
          ? 'فنيونا المهرة مجهزون تماماً لتقديم خدمات صيانة شاملة، مما يضمن عمل مركبتك بأعلى أداء، ويوفر الموثوقية والأمان والكفاءة في كل رحلة.'
          : 'Our skilled technicians are fully equipped to provide comprehensive maintenance services, ensuring your vehicle operates at peak performance, delivering reliability, safety, and efficiency in every drive.',
        icon: IconCarGarage,
        callToAction: {
          text: isAr ? 'اعرف المزيد' : 'Learn more',
          href: getLocalizedHref('/services/Maintenance', lang),
        },
      },
      {
        title: isAr ? 'قطع الغيار' : 'Spare Parts',
        description: isAr
          ? 'احصل على قطع غيار عالية الجودة لسيارتك الهوندا، مما يضمن الأداء الأمثل والسلامة.'
          : 'Get high-quality spare parts for your Honda, ensuring optimal performance and safety.',
        icon: IconCarTurbine,
        callToAction: {
          text: isAr ? 'اعرف المزيد' : 'Learn more',
          href: getLocalizedHref('/services/Spare-Parts', lang),
        },
      },
      {
        title: isAr ? 'معايرة الرادار' : 'Radar Calibration',
        description: isAr
          ? 'تأكد من عمل أنظمة السلامة في مركبتك بدقة من خلال معايرة الرادار الدقيقة بواسطة فنيينا الخبراء.'
          : 'Ensure your vehicles safety systems function accurately with precise radar calibration by our expert technicians.',
        icon: IconCarCrash,
        callToAction: {
          text: isAr ? 'اكتشف الآن' : 'Discover now',
          href: getLocalizedHref('/services/Radar-Calibration', lang),
        },
      },
      {
        title: isAr ? 'فحص كمبيوتر السيارة' : 'Car Computer Diagnostic',
        description: isAr
          ? 'تضمن أدوات فحص كمبيوتر السيارة المتقدمة لدينا إجراء تقييمات دقيقة للحفاظ على أداء مركبتك.'
          : 'Our advanced car computer diagnostic tools ensure accurate assessments to maintain your vehicle’s performance.',
        icon: IconDeviceDesktopAnalytics,
        callToAction: {
          text: isAr ? 'اعرف المزيد' : 'Learn more',
          href: getLocalizedHref('/services/Car-Computer-Diagnostic', lang),
        },
      },
      {
        title: isAr ? 'تحديث برمجيات السيارة' : 'Computer Software Update',
        description: isAr
          ? 'حافظ على تحديث أنظمة مركبتك من خلال تحديثات برمجيات كمبيوتر السيارة، مما يضمن الأداء الأمثل.'
          : 'Keep your vehicles systems up-to-date with our computer software updates, ensuring optimal performance.',
        icon: IconRotate2,
        callToAction: {
          text: isAr ? 'اعرف المزيد' : 'Learn more',
          href: getLocalizedHref('/services/Computer-Software-Update', lang),
        },
      },
    ],
  };

  const contentHomeOne: ContentProps = {
    id: 'contact-section-one',
    hasBackground: true,
    header: {
      title: isAr ? 'تواصل مع مركز حسام' : 'Get in Touch with Hossam Center',
      subtitle: isAr ? 'نحن هنا لمساعدتك في جميع احتياجات صيانة سيارتك الهوندا.' : 'We are here to assist you with all your Honda maintenance needs.',
      tagline: isAr ? 'اتصل بنا' : 'Contact Us',
    },
    content: isAr
      ? 'سواء كنت بحاجة إلى حجز موعد، أو الاستفسار عن خدماتنا، أو تحتاج إلى مساعدة بشأن سيارتك الهوندا، فلا تتردد في الاتصال بنا. فريقنا مستعد دائماً لتقديم المساعدة المهنية.'
      : 'Whether you need to schedule an appointment, inquire about our services, or need help with your Honda, feel free to reach out. Our team is always ready to provide professional assistance.',
    items: [
      {
        title: isAr ? 'عنواننا' : 'Our Address',
        description: isAr ? ['مركز حسام للصيانة', 'شارع الشهيد، عمان، الأردن'] : ['Hossam Center for Maintenance', 'Al-Shahid Road, Amman, Jordan'],
        icon: IconMapPin,
      },
      {
        title: isAr ? 'أرقام الهواتف' : 'Phone Numbers',
        description: ['07 9799 6020', '07 9532 8713'],
        icon: IconPhone,
      },
      {
        title: isAr ? 'ساعات العمل' : 'Business Hours',
        description: isAr ? ['الأحد - الخميس: 9 صباحاً - 6 مساءً', 'الجمعة: مغلق'] : ['Sunday - Thursday: 9 AM - 6 PM', 'Friday: Closed'],
        icon: IconClock,
      },
    ],
    image: {
      src: HossamCenterBuilding,
      alt: 'Hossam Center Building',
    },
  };

  const stepsHome: StepsProps = {
    id: 'steps-on-home',
    hasBackground: false,
    isReversed: false,
    isImageDisplayed: true,
    image: {
      src: MaintenanceProcess,
      alt: 'Maintenance Process',
    },
    header: {
      title: isAr ? 'دليل خطوة بخطوة لصيانة عالية الجودة لسيارتك' : 'Step-by-Step Guide to Quality Car Maintenance',
    },
    items: [
      {
        title: isAr ? 'الخطوة 1: فحص شامل للمركبة' : 'Step 1: Comprehensive Inspection',
        description: isAr
          ? 'نبدأ كل خدمة بفحص شامل لسيارتك الهوندا، لتحديد أي مناطق تحتاج إلى اهتمام فوري.'
          : 'We begin every service with a thorough inspection of your Honda vehicle, identifying any areas that need immediate attention.',
        icon: IconArrowDown,
      },
      {
        title: isAr ? 'الخطوة 2: فحص المحرك والأجزاء الميكانيكية' : 'Step 2: Engine and Mechanical Work',
        description: isAr
          ? 'يقدم خبراؤنا تشخيصاً دقيقاً للمحرك وإجراء الإصلاحات اللازمة لضمان الأداء الأمثل وكفاءة استهلاك الوقود.'
          : 'Our experts provide in-depth engine diagnostics and repairs to ensure optimal performance and fuel efficiency.',
        icon: IconArrowDown,
      },
      {
        title: isAr ? 'الخطوة 3: غيار زيت وفحص الفرامل' : 'Step 3: Oil Change and Brake Check',
        description: isAr
          ? 'نستخدم فقط زيوتاً عالية الجودة ونقوم بفحص نظام الفرامل لضمان السلامة والموثوقية على المدى الطويل.'
          : 'We use only high-quality oil and perform a brake check to ensure safety and long-term reliability.',
        icon: IconArrowDown,
      },
      {
        title: isAr ? 'الخطوة 4: جاهز للانطلاق' : 'Step 4: Ready for the Road',
        description: isAr
          ? 'بمجرد الانتهاء من جميع أعمال الصيانة اللازمة، نتأكد من أن مركبتك جاهزة تماماً للانطلاق على الطريق بأمان.'
          : 'Once we’ve completed all necessary maintenance, we ensure that your vehicle is fully ready to hit the road.',
      },
    ],
  };

  const testimonialsHome: TestimonialsProps = {
    id: 'testimonials-on-home',
    hasBackground: true,
    header: {
      title: isAr ? 'ماذا يقول عملاؤنا عنا' : 'What our customers say about us',
      subtitle: isAr
        ? 'اكتشف كيف صنعت خدماتنا فرقاً لعملائنا الكرام.'
        : 'Discover how our services have made a difference for our valued clients.',
    },
    testimonials: [
      {
        name: 'Mohammad Shatarah',
        job: isAr ? 'تقييمات جوجل' : 'From Google Reviews',
        testimonial: isAr
          ? 'خدمة رائعة وأشخاص متعاونون جداً، اسأل عن يزيد. لقد وفروا علي الكثير من المال وأعادوا سيارتي لحالتها الأصلية.'
          : `Amazing helpful people, ask for yazeed, they saved me a ton of money and restored my car`,
        image: {
          src: 'https://lh3.googleusercontent.com/a/ACg8ocLUoX8k2HZ8wOF4IOjONv6psceKZFnxM9j-1c_0sPeABNuo5g=w60-h60-p-rp-mo-br100',
          alt: 'Mohammad Shatarah',
        },
        href: 'https://g.co/kgs/sifbydC',
      },
      {
        name: 'Mohammad Hasan',
        job: isAr ? 'تقييمات جوجل' : 'From Google Reviews',
        testimonial: isAr
          ? 'خدمات ممتازة من كل من حسام وزياد. شكراً لكم!'
          : `Great services from both Husam and Ziad Thank you !`,
        image: {
          src: 'https://lh3.googleusercontent.com/a/ACg8ocJYEFSDB2ZkcNULPNevDkW2J5mGgtTUQqvSNvkCGMF1vsaWvw=w60-h60-p-rp-mo-ba3-br100',
          alt: 'Mohammad Hasan',
        },
        href: 'https://g.co/kgs/h6QjfFE',
      },
      {
        name: 'Hazem Hamadneh',
        job: isAr ? 'تقييمات جوجل' : 'From Google Reviews',
        testimonial: isAr
          ? 'موظفون ذوو خبرة عالية ولديهم عقلية مهنية محترفة.'
          : `Highly experienced and professionally-minded employees.`,
        image: {
          src: 'https://lh3.googleusercontent.com/a/ACg8ocK2YViqh7PJHn9O7GNCQz7zpRdSemM6wnFB_UbBLmu-wm8rIA=w60-h60-p-rp-mo-ba2-br100',
          alt: 'Hazem Hamadneh',
        },
        href: 'https://g.co/kgs/LJtx3Ui',
      },
    ],
  };

  const faqs2Home: FAQsProps = {
    id: 'faqsTwo-on-home',
    hasBackground: false,
    header: {
      title: isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions',
      subtitle: isAr
        ? 'هنا تجد الإجابات على الأسئلة الأكثر شيوعاً حول خدمات صيانة سيارات هوندا لدينا.'
        : 'Here you can find answers to the most common questions about our Honda car maintenance services.',
      tagline: 'FAQS',
    },
    items: isAr ? [
      {
        title: 'ما هي الخدمات التي يقدمها مركز حسام للصيانة؟',
        description: 'نحن متخصصون في صيانة سيارات هوندا، ونقدم خدمات مثل الفحص الشامل للمركبة، وتغيير الزيت والفلتر، وصيانة المحرك، وفحص نظام الفرامل، وتكييف الهواء، وتركيب قطع الغيار الأصلية ومعايرة رادارات الأمان.',
      },
      {
        title: 'هل توفرون قطع غيار هوندا الأصلية؟',
        description: 'نعم، نحن نوفر قطع الغيار الأصلية وكذلك البدائل التجارية عالية الجودة لسيارات هوندا. ونضمن أن جميع الأجزاء تلبي أعلى معايير الأداء والمتانة.',
      },
      {
        title: 'كيف يمكنني حجز موعد صيانة؟',
        description: 'يمكنك بسهولة حجز موعد صيانة عن طريق الاتصال بنا عبر الهاتف أو من خلال رسائل الواتساب مباشرة. ننصح بالحجز المسبق لضمان التوفر.',
      },
      {
        title: 'هل تقدمون خدمة فحص السيارة قبل الشراء؟',
        description: 'نعم، نحن نقدم خدمة فحص شاملة للسيارة تغطي جميع المكونات الأساسية بما في ذلك المحرك، الهيكل، الفرامل، نظام التعليق، والكمبيوتر للتأكد من سلامة وحالة السيارة.',
      },
      {
        title: 'كم مرة يجب أن أقوم بصيانة سيارتي الهوندا؟',
        description: 'يُنصح بصيانة سيارتك الهوندا كل 5,000 إلى 7,500 كيلومتر (أو ميل حسب الطراز)، لضمان الأداء الأمثل وطول عمر المحرك والسيارة.',
      },
    ] : [
      {
        title: 'What services does Hossam Center for Maintenance provide?',
        description: 'We specialize in the maintenance of Honda vehicles, offering services such as comprehensive vehicle inspections, oil and filter changes, engine maintenance, brake system checks, air conditioning services, and the installation of original spare parts.',
      },
      {
        title: 'Do you offer original Honda parts?',
        description: 'Yes, we provide both original and high-quality commercial spare parts for Honda vehicles. We ensure that all parts meet the highest standards of performance and durability.',
      },
      {
        title: 'How can I book a maintenance appointment?',
        description: 'You can easily book a maintenance appointment by contacting us via phone or WhatsApp. We recommend booking in advance to ensure availability.',
      },
      {
        title: 'Do you offer a vehicle inspection service?',
        description: 'Yes, we offer a comprehensive vehicle inspection service that covers all essential components, including the engine, brakes, air conditioning, and overall vehicle performance to ensure everything is running smoothly.',
      },
      {
        title: 'How often should I service my Honda vehicle?',
        description: 'It is recommended to service your Honda vehicle every 5,000 to 7,500 miles, depending on the model and usage. Regular maintenance ensures optimal performance and longevity of your car.',
      },
    ],
  };

  const contactHome: ContactProps = {
    hasBackground: true,
    header: {
      title: isAr ? 'اتصل بنا' : 'Get in Touch',
      subtitle: isAr ? 'نحن هنا لتقديم أفضل خدمات صيانة سيارات هوندا' : 'We are here to provide the best Honda vehicle services',
      tagline: isAr ? 'معلومات الاتصال' : 'Contact Us',
    },
    content: isAr
      ? 'لا تتردد في الاتصال بنا لأي استفسارات أو حجز موعد صيانة. فريقنا مستعد لمساعدتك في كل ما يتعلق بمركبتك الهوندا.'
      : 'Feel free to reach out to us for any inquiries, appointment scheduling, or additional information about our services. Our team is here to assist you with all your Honda vehicle maintenance needs.',
    items: [
      {
        title: isAr ? 'عنواننا' : 'Our Address',
        description: isAr ? ['مركز حسام للصيانة، شارع الشهيد، عمان، الأردن'] : ['Hossam Maintenance Center, Al-Shahid Road, Amman, Jordan'],
        icon: IconMapPin,
      },
      {
        title: isAr ? 'الاتصال والمبيعات' : 'Contact',
        description: isAr ? [
          'الهاتف: 07 9799 6020',
          'الهاتف: 07 9532 8713',
          'واتساب: 07 9799 6020'
        ] : [
          'Phone: 07 9799 6020',
          'Phone: 07 9532 8713',
          'WhatsApp: 07 9799 6020'
        ],
        icon: IconPhoneCall,
      },
      {
        title: isAr ? 'ساعات العمل' : 'Working hours',
        description: isAr ? ['الأحد - الخميس: 09:00 - 18:00', 'الجمعة: مغلق'] : ['Sunday - Thursday: 09:00 - 18:00', 'Friday: Closed'],
        icon: IconClock,
      },
    ],
    // Form is removed as requested
  };

  return {
    heroHome,
    socialProofHome,
    featuresHome,
    contentHomeOne,
    stepsHome,
    testimonialsHome,
    faqs2Home,
    contactHome,
  };
};

// Legacy static fallbacks for TS compilation
export const heroHome = {} as any;
export const socialProofHome = {} as any;
export const featuresHome = {} as any;
export const contentHomeOne = {} as any;
export const contentHomeTwo = {} as any;
export const stepsHome = {} as any;
export const testimonialsHome = {} as any;
export const faqs2Home = {} as any;
export const contactHome = {} as any;
export const pricingHome = {} as any;
export const teamHome = {} as any;
export const callToAction2Home = {} as any;
