import { CallToActionProps, FAQsProps, HeroProps } from '~/shared/types';

export const getMaintenanceData = (lang: string) => {
  const isAr = lang === 'ar';

  const heromaintenance: HeroProps = {
    title: isAr ? 'خدمات صيانة وإصلاح سيارات هوندا' : 'Honda Repair & Maintenance Services',
    subtitle: isAr
      ? 'خدمات إصلاح هوندا الاحترافية بالقرب منك للحفاظ على سيارتك في أفضل حالة.'
      : 'Expert Honda repair services near you to keep your vehicle in top condition.',
    tagline: isAr ? 'صيانة وإصلاح هوندا الموثوقة' : 'Reliable Honda Repair & Service',
    callToAction: {
      text: isAr ? 'احجز خدمة' : 'Book a Service',
      href: `/${lang}/contact`,
    },
    callToAction2: {
      text: isAr ? 'من نحن' : 'Learn more',
      href: `/${lang}/about`,
    },
    videoSrc: '/videos/maintenance hero cover.mp4',
  };

  const statsmaintenance = {
    id: 'stats-honda-maintenance',
    items: [
      { 
        title: '30+', 
        description: isAr ? 'عاما من الخبرة في صيانة سيارات هوندا.' : 'Years of experience in Honda repair and maintenance.' 
      },
      { 
        title: '5000+', 
        description: isAr ? 'مالك سيارة هوندا راضٍ عن خدماتنا.' : 'Satisfied Honda owners.' 
      },
      { 
        title: '100%', 
        description: isAr ? 'الالتزام بجودة الخدمة والاحترافية.' : 'Commitment to quality service.' 
      },
    ],
  };

  const featuresmaintenance = {
    id: 'features-honda-maintenance',
    header: {
      title: isAr ? 'لماذا تختار مركز حسام؟' : 'Why Choose Hossam Center?',
      subtitle: isAr
        ? 'نحن متخصصون في تحديد وحل مختلف المشاكل الخاصة بسيارات هوندا.'
        : 'We specialize in identifying and solving a variety of issues specific to Honda vehicles.',
    },
    items: [
      { 
        title: isAr ? 'فنيون خبراء' : 'Expert Technicians', 
        description: isAr 
          ? 'فريقنا مدرب ولديه كفاءة عالية في تشخيص وإصلاح سيارات هوندا.' 
          : 'Our technicians are highly skilled in diagnosing and repairing Honda vehicles.' 
      },
      { 
        title: isAr ? 'أدوات فحص متقدمة' : 'Advanced Diagnostic Tools', 
        description: isAr 
          ? 'نستخدم أحدث الأجهزة والتكنولوجيا لتقديم إصلاحات دقيقة.' 
          : 'We use the latest tools and technology to provide precise repairs.' 
      },
      { 
        title: isAr ? 'قطع غيار هوندا أصلية' : 'Genuine Honda Parts', 
        description: isAr 
          ? 'نستخدم فقط قطع الغيار الأصلية لضمان أعلى مستويات الجودة والأمان.' 
          : 'We only use original Honda parts to ensure the highest quality of service.' 
      },
      { 
        title: isAr ? 'رضا العملاء' : 'Customer Satisfaction', 
        description: isAr 
          ? 'نضمن تقديم خدمات عالية الجودة تضمن رضا عملائنا التام.' 
          : 'We guarantee high-quality service and customer satisfaction.' 
      },
    ],
    additionalContent: [
      { 
        title: isAr ? 'مركز خدمة هوندا وتعبئة غاز المكيف' : 'Honda Service Center & AC Gas Refilling', 
        description: isAr
          ? 'مركز حسام هو محطة خدمة هوندا مجهزة بالكامل ومكرسة لتقديم خدمات إصلاح وصيانة عالية الجودة. يضم مرفقنا المتقدم فنيين مؤهلين على دراية تامة بنماذج وتقنيات هوندا. نحن نقدم خدمات شاملة مثل الصيانة الروتينية، الفحوصات التشخيصية، صيانة مكيف السيارة، وتعبئة غاز المكيف الأصلي بدقة عالية. مع التركيز على استخدام قطع غيار هوندا الأصلية وأدوات متطورة، نضمن حصول مركبتك على أفضل رعاية وأعلى مستويات التبريد.'
          : 'Hossam Center is a fully equipped Honda service station dedicated to offering high-quality repair services and maintenance. Our advanced facility is staffed by qualified professionals who are highly familiar with Honda models and technologies. We provide comprehensive services such as routine maintenance, diagnostic checks, specialized Honda air conditioner gas refilling, and leak repair using genuine refrigerants to guarantee optimal cabin cooling.'
      },
      { 
        title: isAr ? 'صيانة هوندا وتكييف سيارات بالقرب مني' : 'Honda Service & Car AC Repair Near Me', 
        description: isAr
          ? 'إذا كنت تبحث عن صيانة هوندا أو تعبئة غاز مكيف سيارة بالقرب منك، فإن مركز حسام يقع في مكان مناسب في عمان. نحن نقدم مجموعة متنوعة من الخدمات مثل تعبئة غاز المكيف لكافة موديلات هوندا (هايبرد وبنزين)، غيار الزيت، فحص الفرامل، وتدوير الإطارات. يوفر فريقنا المتفاني خدمة عالية الجودة لتعزيز أداء مركبتك ونظام التكييف وطول عمرها.'
          : 'If you’re looking for Honda service or car AC gas recharge near you, Hossam Center is conveniently located nearby in Amman. We gladly provide a variety of services such as genuine AC gas refilling for all Honda hybrid and petrol models, oil changes, brake inspections, and tire rotations. Our committed team offers quality service to enhance your vehicle’s performance, air conditioning cooling, and longevity.'
      },
    ],
  };

  const stepsmaintenance = {
    id: 'steps-honda-maintenance',
    items: [
      { 
        title: isAr ? 'الاستشارة وفحص الشكوى' : 'Consultation', 
        description: isAr 
          ? 'مناقشة أي مشاكل لاحظتها في مركبتك مع فنيينا ذوي الخبرة.' 
          : 'Discuss any issues you’ve noticed with our experienced technicians.' 
      },
      { 
        title: isAr ? 'الفحص والتشخيص' : 'Diagnostic Check', 
        description: isAr 
          ? 'نقوم بفحص تشخيصي كامل لتحديد أي مشاكل بدقة.' 
          : 'We perform a full diagnostic to identify any potential problems.' 
      },
      { 
        title: isAr ? 'الخدمة والإصلاح' : 'Service & Repair', 
        description: isAr 
          ? 'يقدم فريق الخبراء لدينا حلول إصلاح فعالة، مما يضمن عودة مركبتك إلى الطريق بأمان.' 
          : 'Our expert team provides efficient repair solutions, ensuring your vehicle is back on the road safely.' 
      },
    ],
    image: {
      src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1727950615/honda_maintenance_bfgb4g.webp',
      alt: isAr ? 'صيانة هوندا' : 'Image of Honda maintenance service',
    },
  };

  const faqsmaintenance: FAQsProps = {
    id: 'faqs-honda-maintenance',
    hasBackground: false,
    header: {
      title: isAr ? 'الأسئلة الشائعة حول صيانة هوندا' : 'Honda Service FAQs',
      subtitle: isAr 
        ? 'اعثر على إجابات للأسئلة الشائعة حول خدمات إصلاح وصيانة سيارات هوندا لدينا.'
        : 'Find answers to common questions about our Honda repair and maintenance services.',
      position: 'center',
    },
    tabs: [
      {
        link: { label: isAr ? 'الخدمات العامة' : 'General Services', href: `/${lang}/services` },
        items: isAr ? [
          { 
            title: 'ما هي الخدمات التي تقدمونها؟', 
            description: 'نقدم خدمات غيار الزيت والفلتر، وفحص الفرامل، وتعبئة غاز مكيف هوندا، وتصليح تسريب المكيف، وتدوير الإطارات، وفحص الكمبيوتر، والإصلاحات الميكانيكية والكهربائية الشاملة.' 
          },
          { 
            title: 'كم مرة يجب أن أقوم بصيانة سيارتي الهوندا؟', 
            description: 'يُنصح بالصيانة الدورية كل 6 أشهر أو كل 5000 إلى 7500 كم. كما يُنصح بفحص غاز المكيف وتنظيف الفلاتر قبل بداية فصل الصيف.' 
          },
          {
            title: 'ماذا يشمل فحص كمبيوتر هوندا؟',
            description: 'يشمل الفحص مسحاً كاملاً لأنظمة مركبتك الإلكترونية وقراءة أكواد الأعطال في جميع الوحدات لتحديد المشاكل بدقة.'
          },
          {
            title: 'هل تستخدمون قطع غيار أصلية؟',
            description: 'نعم، نحن نستخدم قطع غيار هوندا الأصلية لضمان أفضل جودة وأداء وحماية لسيارتك.'
          },
        ] : [
          { 
            title: 'What services do you offer?', 
            description: 'We offer oil changes, brake inspections, tire rotations, Honda AC gas refilling, cooling system repairs, diagnostic checks, and complete mechanical/electrical services.' 
          },
          { 
            title: 'How often should I service my Honda?', 
            description: 'Routine maintenance is recommended every 6 months or 5,000 miles. We also suggest checking your AC gas pressure and cabin filter before summer.' 
          },
          {
            title: 'What is included in a Honda diagnostic check?',
            description: 'A diagnostic check includes a full scan of your vehicle’s systems to identify potential issues.'
          },
          {
            title: 'Do you use authentic Honda parts?',
            description: 'Yes, we use genuine Honda parts to ensure the best quality and performance for your vehicle.'
          },
        ],
      },
    ],
  };

  return {
    heromaintenance,
    statsmaintenance,
    featuresmaintenance,
    stepsmaintenance,
    faqsmaintenance,
  };
};

// Static placeholders for TS compile
export const heromaintenance = {} as any;
export const statsmaintenance = {} as any;
export const featuresmaintenance = {} as any;
export const stepsmaintenance = {} as any;
export const faqsmaintenance = {} as any;
export const contactmaintenance = {} as any;
