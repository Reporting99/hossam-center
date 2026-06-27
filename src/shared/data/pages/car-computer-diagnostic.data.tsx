import { CallToActionProps, FAQsProps, HeroProps } from '~/shared/types';

export const getCarComputerDiagnosticData = (lang: string) => {
  const isAr = lang === 'ar';

  const heroCarDiagnostic: HeroProps = {
    title: isAr ? 'فحص كمبيوتر سيارات هوندا' : 'Car Computer Diagnostic',
    subtitle: isAr 
      ? 'خدمات فحص كمبيوتر ذكية وشاملة للكشف الفوري عن الأعطال وحفظ أداء سيارتك.' 
      : 'Advanced Smart diagnostics tool and computer diagnostic services to keep your vehicle running efficiently.',
    tagline: isAr ? 'فحوصات كمبيوتر موثوقة في مركز حسام' : 'Reliable Diagnostics at Hossam Center',
    callToAction: {
      text: isAr ? 'احجز فحصاً' : 'Book a Service',
      href: `/${lang}/contact`,
    },
    callToAction2: {
      text: isAr ? 'من نحن' : 'Learn more',
      href: `/${lang}/about`,
    },
    videoSrc: '/videos/Car Computer Diagnostic hero cover.mp4',
  };

  const statsCarDiagnostic = {
    id: 'stats-car-diagnostic',
    items: [
      { 
        title: '30+', 
        description: isAr ? 'عاماً من الخبرة في فحص كمبيوتر السيارات وتشخيصها.' : 'Years of experience in car diagnostics and repair.' 
      },
      { 
        title: '5000+', 
        description: isAr ? 'سيارة تم فحصها وتشخيصها بنجاح ودقة.' : 'Vehicles diagnosed and serviced successfully.' 
      },
      { 
        title: '100%', 
        description: isAr ? 'الالتزام بتقديم أدق تقارير الفحص الفني.' : 'Commitment to quality and customer satisfaction.' 
      },
    ],
  };

  const featuresCarDiagnostic = {
    id: 'features-car-diagnostic',
    header: {
      title: isAr ? 'لماذا تختار مركز حسام لفحص كمبيوتر سيارتك؟' : 'Why Choose Hossam Center for Car Diagnostics?',
      subtitle: isAr 
        ? 'نستخدم أحدث أجهزة فحص السيارات الذكية لقراءة وتحليل بيانات الأنظمة الإلكترونية والميكانيكية بدقة.' 
        : 'We use state-of-the-art tools to identify and solve any issues with your vehicle efficiently.',
    },
    items: [
      { 
        title: isAr ? 'أدوات فحص ذكية ومتقدمة' : 'Advanced Smart Diagnostics Tools', 
        description: isAr 
          ? 'نستخدم أحدث أجهزة الفحص المتصلة لقراءة كمبيوتر هوندا بدقة متناهية.' 
          : 'We use car Smart diagnostics tool to quickly diagnose vehicle issues and provide effective solutions.' 
      },
      { 
        title: isAr ? 'فحص كمبيوتر المحرك (ECU)' : 'Engine Diagnostic Scanner', 
        description: isAr 
          ? 'قراءة وتفسير أكواد أعطال المحرك وتشخيص مشاكل استهلاك الوقود والانبعاثات.' 
          : 'Our engine Smart diagnostics tool allows us to diagnose engine-related issues accurately and efficiently.' 
      },
      { 
        title: isAr ? 'تقارير أنظمة المركبة الإلكترونية' : 'Detailed Electronics Scan', 
        description: isAr 
          ? 'تحديد المشاكل والأعطال المخفية في أنظمة الأمان والوسائد الهوائية والتكييف والفرامل.' 
          : 'Our car computer readers ensure precise diagnostics, helping us fix even the smallest issues in your vehicle.' 
      },
    ],
  };

  const stepsCarDiagnostic = {
    id: 'steps-car-diagnostic',
    items: [
      { 
        title: isAr ? 'الفحص المبدئي والربط' : 'Scanner Connection', 
        description: isAr 
          ? 'ربط سيارتك بجهاز الفحص الذكي للوصول إلى وحدات التحكم الإلكترونية.' 
          : 'Connecting your vehicle to our smart diagnostic scanner to access the ECU.' 
      },
      { 
        title: isAr ? 'تحليل البيانات والأعطال' : 'Data Analysis', 
        description: isAr 
          ? 'قراءة الأكواد الحية والتحذيرية وتقديم تقرير فني دقيق عن حالة كل نظام.' 
          : 'Reading live values and error codes to generate a precise vehicle health report.' 
      },
      { 
        title: isAr ? 'الإصلاح وإعادة الضبط' : 'Repair & Reset', 
        description: isAr 
          ? 'تنفيذ الإصلاحات ومسح الأكواد القديمة للتأكد من زوال المشكلة بالكامل.' 
          : 'Performing the necessary repairs and clearing code faults to confirm vehicle safety.' 
      },
    ],
    image: {
      src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1727955088/Car_Computer_Diagnostic_q6yprr.webp',
      alt: isAr ? 'فحص كمبيوتر هوندا' : 'Image of car computer diagnostic service',
    },
  };

  const faqsCarDiagnostic: FAQsProps = {
    id: 'faqs-car-diagnostic',
    hasBackground: false,
    header: {
      title: isAr ? 'الأسئلة الشائعة حول فحص كمبيوتر السيارات' : 'Car Diagnostic FAQs',
      subtitle: isAr 
        ? 'ابحث عن إجابات للأسئلة الشائعة حول خدمات فحص كمبيوتر هوندا لدينا.'
        : 'Find answers to common questions about our car diagnostic services.',
      position: 'center',
    },
    tabs: [
      {
        link: { label: isAr ? 'خدمات فحص الكمبيوتر' : 'Car Diagnostics', href: `/${lang}/services` },
        items: isAr ? [
          { title: 'ماذا يكشف فحص كمبيوتر السيارة؟', description: 'يكشف الفحص عن أعطال المحرك، ناقل الحركة (الجير)، الوسائد الهوائية (SRS)، مانع الانزلاق (ABS)، الحساسات، والكهرباء العامة.' },
          { title: 'كم يستغرق فحص كمبيوتر السيارة؟', description: 'يستغرق الفحص وتوليد التقرير الفني حوالي 30 إلى 60 دقيقة في الظروف العادية.' },
          { title: 'هل يجب علي الفحص عند ظهور لمبة Check Engine؟', description: 'نعم، ظهور هذه اللمبة يعني وجود كود عطل مسجل في كمبيوتر المحرك يجب قراءته فوراً لتجنب تفاقم المشكلة.' },
        ] : [
          { title: 'What does a car diagnostic check reveal?', description: 'It uncovers faults in the engine, transmission, SRS airbag, ABS brake, body electrical, and general sensors.' },
          { title: 'How long does a diagnostic test take?', description: 'Most computer diagnostic scans and analyses take between 30 and 60 minutes.' },
          { title: 'Should I scan my car when the Check Engine light is on?', description: 'Yes, the Check Engine light indicates a registered fault code in the ECU that must be scanned immediately to prevent damages.' },
        ],
      },
    ],
  };

  return {
    heroCarDiagnostic,
    statsCarDiagnostic,
    featuresCarDiagnostic,
    stepsCarDiagnostic,
    faqsCarDiagnostic,
  };
};

// Static placeholders for TS compile
export const heroCarDiagnostic = {} as any;
export const statsCarDiagnostic = {} as any;
export const featuresCarDiagnostic = {} as any;
export const stepsCarDiagnostic = {} as any;
export const faqsCarDiagnostic = {} as any;
export const contactCarDiagnostic = {} as any;
