import { CallToActionProps, FAQsProps, HeroProps } from '~/shared/types';

export const getComputerSoftwareUpdateData = (lang: string) => {
  const isAr = lang === 'ar';

  const heroSoftwareUpdate: HeroProps = {
    title: isAr ? 'تحديث برمجيات كمبيوتر سيارات هوندا' : 'Car Computer Software Update',
    subtitle: isAr
      ? 'حافظ على تحديث برمجيات أنظمة سيارتك لتحسين الأداء والأمان وتفادي أعطال الكهرباء والتحكم.'
      : 'Keep your car’s systems up-to-date for improved performance, safety, and security.',
    tagline: isAr ? 'تحديثات برمجية خبيرة في مركز حسام' : 'Expert Software Updates at Hossam Center',
    callToAction: {
      text: isAr ? 'احجز خدمة' : 'Book a Service',
      href: `/${lang}/contact`,
    },
    callToAction2: {
      text: isAr ? 'من نحن' : 'Learn more',
      href: `/${lang}/about`,
    },
    videoSrc: '/videos/Computer Software Update hero cover.mp4',
  };

  const statsSoftwareUpdate = {
    id: 'stats-software-update',
    items: [
      { 
        title: '30+', 
        description: isAr ? 'عاماً من الخبرة في صيانة كمبيوتر وبرمجيات السيارات.' : 'Years of expertise in car diagnostics and software updates.' 
      },
      { 
        title: '3000+', 
        description: isAr ? 'عملية تحديث وبرمجة ناجحة لوحدات التحكم.' : 'Software updates performed on various car models.' 
      },
      { 
        title: '100%', 
        description: isAr ? 'الالتزام التام بتعليمات الشركة الصانعة.' : 'Commitment to quality and customer satisfaction.' 
      },
    ],
  };

  const featuresSoftwareUpdate = {
    id: 'features-software-update',
    header: {
      title: isAr ? 'لماذا تختار مركز حسام لتحديث برمجيات سيارتك؟' : 'Why Choose Hossam Center for Software Updates?',
      subtitle: isAr 
        ? 'نوفر التحديثات الرسمية الموصى بها من المصنع لضمان كفاءة أداء سيارتك الهوندا وسلامتها.' 
        : 'We provide manufacturer-recommended updates to enhance your car’s performance and safety.',
    },
    items: [
      { 
        title: isAr ? 'تحسين كفاءة الأداء' : 'Enhanced Performance', 
        description: isAr 
          ? 'تحديث وحدة التحكم في المحرك (ECU) لتحسين التسارع، التبديلات، وكفاءة استهلاك الوقود.' 
          : 'Software updates can improve engine performance, fuel efficiency, and overall vehicle efficiency by updating critical parts like the ECU.' 
      },
      { 
        title: isAr ? 'تعزيز أنظمة الأمان' : 'Improved Safety Features', 
        description: isAr 
          ? 'تحديث برمجيات أنظمة مانع الانزلاق (ABS) والوسائد الهوائية (Airbags) لضمان العمل الصحيح.' 
          : 'Updates often include enhancements to safety systems such as anti-lock brakes, traction control, and airbag activation methods.' 
      },
      { 
        title: isAr ? 'معالجة الأخطاء البرمجية (Bugs)' : 'Fixes for Software Bugs', 
        description: isAr 
          ? 'حل مشكلات البرمجيات السابقة والعيوب المصنعية الإلكترونية التي تعيق تشغيل السيارة بكفاءة.' 
          : 'Just like any other software, vehicle systems may contain bugs. Updates can fix known issues that may affect your car’s operation.' 
      },
    ],
  };

  const stepsSoftwareUpdate = {
    id: 'steps-software-update',
    items: [
      { 
        title: isAr ? 'فحص الإصدار الحالي' : 'Version Check', 
        description: isAr 
          ? 'قراءة الإصدار الحالي لوحدة التحكم ومقارنته بأحدث التحديثات الرسمية المتوفرة.' 
          : 'We check the car’s software version to see if an update is available.' 
      },
      { 
        title: isAr ? 'التحضير والتنزيل' : 'Software Prep', 
        description: isAr 
          ? 'توصيل السيارة بمصدر طاقة ثابت وتنزيل التحديث الرسمي المناسب للشاصي.' 
          : 'Connecting the vehicle to stable power and downloading official factory software files.' 
      },
      { 
        title: isAr ? 'التنصيب والبرمجة' : 'Update Installation', 
        description: isAr 
          ? 'برمجة وإعادة تهيئة وحدة التحكم واختبار الأنظمة للتأكد من استقرار العمل.' 
          : 'We install the latest software updates to ensure optimal performance and safety.' 
      },
    ],
    image: {
      src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1727960473/Computer_Software_Update_j6ualp.webp',
      alt: isAr ? 'برمجة سيارات هوندا' : 'Image of car computer software update service',
    },
  };

  const faqsSoftwareUpdate: FAQsProps = {
    id: 'faqs-software-update',
    hasBackground: false,
    header: {
      title: isAr ? 'الأسئلة الشائعة حول تحديث البرمجيات' : 'Software Update FAQs',
      subtitle: isAr 
        ? 'اعثر على إجابات للأسئلة الشائعة حول خدمات تحديث برمجيات كمبيوتر سيارتك.'
        : 'Find answers to common questions about our software update services.',
      position: 'center',
    },
    tabs: [
      {
        link: { label: isAr ? 'تحديث برمجيات السيارة' : 'Software Updates', href: `/${lang}/services` },
        items: isAr ? [
          { title: 'لماذا يجب علي تحديث برمجيات سيارتي؟', description: 'تساعد التحديثات في تحسين أداء المحرك والجير، وتقليل استهلاك البنزين، وحل المشاكل البرمجية والعيوب المصنعية الإلكترونية.' },
          { title: 'كم من الوقت يستغرق تحديث برمجيات السيارة؟', description: 'يستغرق التحديث عادة بين 30 دقيقة إلى ساعة واحدة حسب النظام وحجم التحديث.' },
          { title: 'هل يمكنني إجراء التحديث بنفسي؟', description: 'لا، يتطلب التحديث أجهزة متخصصة من الوكالة ومصدراً كهربائياً ثابتاً لتفادي تلف وحدات التحكم (الكمبيوتر) نهائياً.' },
        ] : [
          { title: 'Why is it important to update my car’s software?', description: 'Software updates improve performance, safety, and ensure compatibility with new technologies.' },
          { title: 'How long does a software update take?', description: 'Most updates take between 30 minutes to 1 hour, depending on the system being updated.' },
          { title: 'Can I update the software myself?', description: 'No, professional tools and stable power support are required to avoid rendering the computer control units unresponsive.' },
        ],
      },
    ],
  };

  return {
    heroSoftwareUpdate,
    statsSoftwareUpdate,
    featuresSoftwareUpdate,
    stepsSoftwareUpdate,
    faqsSoftwareUpdate,
  };
};

// Static placeholders for TS compile
export const heroSoftwareUpdate = {} as any;
export const statsSoftwareUpdate = {} as any;
export const featuresSoftwareUpdate = {} as any;
export const stepsSoftwareUpdate = {} as any;
export const faqsSoftwareUpdate = {} as any;
export const contactSoftwareUpdate = {} as any;
