import { CallToActionProps, FAQsProps, HeroProps } from '~/shared/types';
import hondaAcServiceHero from '~/assets/images/honda-ac-service-hero.png';

export const getACGasServiceData = (lang: string) => {
  const isAr = lang === 'ar';

  const heroACGas: HeroProps = {
    title: isAr ? 'تعبئة غاز وصيانة مكيف هوندا' : 'Honda AC Gas Refill & Service',
    subtitle: isAr 
      ? 'خدمات تعبئة غاز المكيف الأصلي وفحص تسريب دورة التكييف لضمان أفضل برودة وقوة دفع للهواء.' 
      : 'Professional Honda air conditioning gas charging, diagnostic leak testing, and cooling repairs in Amman.',
    tagline: isAr ? 'تكييف بارد ومنعش في صيف الأردن' : 'Keep Cool on the Road',
    callToAction: {
      text: isAr ? 'احجز خدمة' : 'Book a Service',
      href: `/${lang}/contact`,
    },
    callToAction2: {
      text: isAr ? 'من نحن' : 'Learn more',
      href: `/${lang}/about`,
    },
    videoSrc: '/videos/honda-ac-service-hero.mp4',
  };

  const statsACGas = {
    id: 'stats-ac-gas',
    items: [
      { 
        title: '100%', 
        description: isAr ? 'غاز أصلي معتمد ومطابق لمواصفات المصنع.' : 'Genuine factory-approved AC refrigerant gas.' 
      },
      { 
        title: '30+', 
        description: isAr ? 'عاماً من الخبرة في صيانة كهرباء وتكييف سيارات هوندا.' : 'Years of electrical and cooling system experience.' 
      },
      { 
        title: '15+', 
        description: isAr ? 'دقيقة لفحص وتعبئة غاز المكيف وتسليمه للعميل.' : 'Minutes for complete diagnostic and recharge service.' 
      },
    ],
  };

  const featuresACGas = {
    id: 'features-ac-gas',
    header: {
      title: isAr ? 'لماذا تختار مركز حسام لصيانة تكييف سيارتك؟' : 'Why Choose Hossam Center for AC Services?',
      subtitle: isAr 
        ? 'نحن نلتزم باستخدام أفضل أنواع الغاز الأصلي وأحدث أجهزة الشحن والضغط لضمان أفضل أداء تبريد.' 
        : 'We offer professional auto climate services using certified gases and computerized pressure gauges.',
    },
    items: [
      { 
        title: isAr ? 'تعبئة غاز أصلي (R134a & R1234yf)' : 'Genuine Refrigerant Gas', 
        description: isAr 
          ? 'نستخدم غازات تبريد أصلية معتمدة ومتوافقة تماماً مع سيارات هوندا البنزين والهايبرد.' 
          : 'We supply high-quality refrigerant gas compatible with all Honda petrol and hybrid models.' 
      },
      { 
        title: isAr ? 'فحص تسريب دورة التكييف' : 'AC Leak Diagnostic & Pressure Test', 
        description: isAr 
          ? 'فحص الضغط وتحديد مواقع التسريب في المواسير، الكومبريسور، أو الثلاجة باستخدام أجهزة الفحص المتقدمة.' 
          : 'Computerized pressure testing to identify system leaks in pipes, compressor, or evaporator core.' 
      },
      { 
        title: isAr ? 'تبديل فلاتر المكيف وتنظيف الدورة' : 'Cabin Filter & System Cleaning', 
        description: isAr 
          ? 'استبدال فلاتر مقصورة الركاب وتنظيف مجاري الهواء للتخلص من الروائح وضمان هواء نقي.' 
          : 'Replacing dirty cabin filters and sanitizing air ducts to ensure clean, odor-free airflow.' 
      },
    ],
  };

  const stepsACGas = {
    id: 'steps-ac-gas',
    image: {
      src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1728064796/services_hero_cover_khe1qq.webp',
      alt: 'Honda AC Process',
    },
    items: isAr ? [
      {
        title: 'فحص ضغط المكيف',
        description: 'قياس مستويات الغاز والضغط الداخلي لتحديد مدى كفاءة الكومبريسور ودورة التبريد.',
      },
      {
        title: 'اختبار التسريب والشفط',
        description: 'عملية تفريغ الهواء (Vacuum) وسحب الرطوبة واختبار وجود أي تسريب في أجزاء المكيف.',
      },
      {
        title: 'شحن الغاز والزيت',
        description: 'شحن دورة المكيف بالوزن الدقيق المحدد من المصنع مع إضافة زيت الكومبريسور الخاص لحمايته.',
      },
    ] : [
      {
        title: 'Pressure & Function Test',
        description: 'Testing internal pressure levels to check the health and efficiency of your Honda compressor.',
      },
      {
        title: 'Vacuum & Leak Test',
        description: 'Vacuuming the system to remove moisture and performing a tight leak hold test.',
      },
      {
        title: 'Precise Gas Recharge',
        description: 'Charging the system with the exact weight of gas recommended by Honda, plus compressor oil.',
      },
    ],
  };

  const faqsACGas: FAQsProps = {
    id: 'faqs-ac-gas',
    hasBackground: true,
    header: {
      title: isAr ? 'الأسئلة الشائعة حول صيانة مكيف هوندا' : 'AC Gas Service FAQs',
      subtitle: isAr ? 'إجابات على استفساراتك حول شحن الغاز وضعف التبريد.' : 'Common questions about Honda AC systems and repair.',
    },
    tabs: [
      {
        link: { label: isAr ? 'خدمات التكييف' : 'AC Services', href: `/${lang}/services` },
        items: isAr ? [
          {
            title: 'كم يستغرق شحن غاز مكيف السيارة؟',
            description: 'تستغرق العملية بالكامل حوالي 15 إلى 25 دقيقة فقط، وتشمل فحص الضغط، اختبار التسريب، وتعبئة الغاز بدقة.',
          },
          {
            title: 'لماذا يضعف تبريد المكيف في سيارتي الهوندا؟',
            description: 'يعود ذلك غالباً لنقص مستوى غاز الفريون بسبب تسريب بسيط، أو اتساخ فلتر المكيف، أو وجود مشكلة كهربائية في الكومبريسور.',
          },
          {
            title: 'هل تستخدمون الغاز الأصلي؟',
            description: 'نعم، نحن نستخدم الغاز الأصلي المطابق تماماً لكتيب الشركة المصنعة لضمان أداء تبريد ممتاز والحفاظ على الكومبريسور من التلف.',
          },
        ] : [
          {
            title: 'How long does a car AC recharge take?',
            description: 'A complete diagnostic test, vacuuming, leak check, and gas recharge takes around 15 to 25 minutes.',
          },
          {
            title: 'Why is my Honda AC blowing warm air?',
            description: 'This is usually caused by low refrigerant levels due to a slow leak, a clogged cabin air filter, or a faulty compressor clutch.',
          },
          {
            title: 'Do you use genuine certified gases?',
            description: 'Yes, we only use genuine factory-approved refrigerant gases to guarantee maximum cooling performance and prevent compressor damage.',
          },
        ],
      },
    ],
  };

  return {
    heroACGas,
    statsACGas,
    featuresACGas,
    stepsACGas,
    faqsACGas,
  };
};
