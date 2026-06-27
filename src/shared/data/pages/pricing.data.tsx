/* eslint-disable */
import { ComparisonProps, FAQsProps, PricingProps } from '~/shared/types';
import { HeroProps } from '~/shared/types';
import { getLocalizedHref } from '~/utils/permalinks';

export const getPricingData = (lang: string) => {
  const isAr = lang === 'ar';

  const heroPricing: HeroProps = {
    title: isAr ? 'باقات الخدمات والأسعار' : 'Service Packages and Prices',
    subtitle: isAr ? (
      <>
        تفاصيل واضحة لخطط وباقات صيانة سيارات هوندا المتوفرة في مركزنا. اختر الباقة التي تناسب احتياجات مركبتك لضمان أفضل أداء وسلامة على الطريق.
      </>
    ) : (
      <>
        Clear breakdown of our Honda service plans and their respective features. Choose the plan that best suits your vehicle&apos;s needs.
      </>
    ),
    tagline: isAr ? 'أسعار خدمات مركز حسام' : 'Hossam Center Service Pricing',
  };

  const pricingPricing: PricingProps = {
    id: 'pricing-on-pricing',
    hasBackground: true,
    header: {
      title: isAr ? 'باقات الصيانة والخدمات المتوفرة' : 'Our Service Plans',
      subtitle: isAr ? (
        <>
          نقدم خيارات مرنة ومدروسة لتناسب جدول الصيانة الدوري والطارئ لسيارتك الهوندا.
        </>
      ) : (
        <>
          Discover our flexible servicing options designed to keep your Honda in peak condition.
        </>
      ),
    },
    prices: [
      {
        title: isAr ? 'باقة الصيانة الدورية البسيطة' : 'Minor Service Package',
        subtitle: isAr ? 'الخيار الأفضل للفحص الدوري كل 5000 كم' : 'Optimal choice for routine checks every 5000 km',
        price: isAr ? 'د.أ 25' : '25 JOD',
        period: isAr ? 'تبدأ من' : 'starts at',
        items: isAr ? [
          { description: 'تغيير الزيت والفلتر الأصلي للمحرك.' },
          { description: 'فحص وضبط مستويات السوائل (المبرد، زيت البريك، مساحات).' },
          { description: 'فحص نظام الفرامل والبريكات لضمان التوقف الآمن.' },
          { description: 'فحص ضغط الهواء وتدوير الإطارات.' },
          { description: 'فحص مبدئي لسلامة الكهرباء والأنوار.' }
        ] : [
          { description: 'Genuine engine oil and filter change.' },
          { description: 'Check and top up all critical fluid levels.' },
          { description: 'Inspection of brake pads and brake systems.' },
          { description: 'Check tire pressures and perform rotation.' },
          { description: 'Basic safety and lights check.' }
        ],
        callToAction: {
          targetBlank: false,
          text: isAr ? 'احجز الباقة الآن' : 'Book Package Now',
          href: getLocalizedHref('/contact', lang),
        },
        hasRibbon: false,
      },
      {
        title: isAr ? 'باقة الصيانة الكبرى والشاملة' : 'Major Service Package',
        subtitle: isAr ? 'الخيار الموصى به كل 20,000 كم أو سنوياً' : 'Recommended every 20,000 km or annually',
        price: isAr ? 'د.أ 75' : '75 JOD',
        period: isAr ? 'تبدأ من' : 'starts at',
        items: isAr ? [
          { description: 'جميع ميزات باقة الصيانة البسيطة.' },
          { description: 'استبدال شمعات الاحتراق (البواجي) وفلتر الهواء وفلتر المكيف.' },
          { description: 'فحص ميكانيكي كامل للمحرك وناقل الحركة (الجير) ونظام العادم.' },
          { description: 'فحص نظام التعليق الأمامي والخلفي (الهيئة الأمامية).' },
          { description: 'فحص وتنظيف البخاخات وبوابة الهواء.' }
        ] : [
          { description: 'All features of the Minor Service.' },
          { description: 'Replace spark plugs, engine air filter, and cabin filter.' },
          { description: 'Full mechanical check of engine, gearbox, and exhaust.' },
          { description: 'Complete front/rear suspension inspection.' },
          { description: 'Fuel injector and throttle body cleaning.' }
        ],
        callToAction: {
          targetBlank: false,
          text: isAr ? 'احجز الباقة الكبرى' : 'Book Major Service',
          href: getLocalizedHref('/contact', lang),
        },
        hasRibbon: true,
        ribbonTitle: isAr ? 'الأكثر طلباً' : 'Popular',
      },
      {
        title: isAr ? 'باقة الفحص البرمجي والمعايرة الذكية' : 'ADAS & Diagnostic Package',
        subtitle: isAr ? 'باقة خاصة بمعايرة الرادار وتحديث البرمجيات' : 'Specialized radar calibration & software updates',
        price: isAr ? 'د.أ 50' : '50 JOD',
        period: isAr ? 'تبدأ من' : 'starts at',
        items: isAr ? [
          { description: 'فحص كمبيوتر ذكي شامل وقراءة أكواد الأنظمة الإلكترونية.' },
          { description: 'تحديث برمجيات كمبيوتر السيارة (ECU/ECM) للنسخة الأحدث.' },
          { description: 'معايرة رادار المصد وكاميرا الزجاج الأمامي (Honda Sensing).' },
          { description: 'فحص وضبط رادارات النقطة العمياء الجانبية.' },
          { description: 'توفير تقرير تشخيصي رقمي كامل لصاحب المركبة.' }
        ] : [
          { description: 'Full computer diagnostic scan with error code printouts.' },
          { description: 'ECU/ECM control module firmware updates.' },
          { description: 'ADAS front radar and camera target calibration.' },
          { description: 'Side blind spot monitor calibration.' },
          { description: 'Provide complete digital diagnostic report.' }
        ],
        callToAction: {
          targetBlank: false,
          text: isAr ? 'احجز باقة البرمجة' : 'Book ADAS Service',
          href: getLocalizedHref('/contact', lang),
        },
        hasRibbon: false,
      },
    ],
  };

  const comparisonPricing: ComparisonProps = {
    id: 'comparison-on-pricing',
    hasBackground: false,
    header: {
      title: isAr ? 'مقارنة تفصيلية بين باقات صيانة سيارات هوندا' : 'Detailed Comparison of Service Packages',
      subtitle: isAr ? (
        <>
          قارن بين الميزات المتضمنة في كل مستوى صيانة لاختيار الخدمة المناسبة لحالة سيارتك.
        </>
      ) : (
        <>
          Compare the features included in each service tier to select the right package for your car.
        </>
      ),
    },
    columns: [
      {
        title: isAr ? 'مقارنة الميزات' : 'compare packages',
        items: [
          { title: isAr ? 'غيار الزيت والفلتر' : 'Oil & Filter Change' },
          { title: isAr ? 'فحص الفرامل والبريكات' : 'Brake System Check' },
          { title: isAr ? 'فحص الهيئة الأمامية' : 'Suspension Check' },
          { title: isAr ? 'فحص كمبيوتر السيارة' : 'Computer Diagnostic' },
          { title: isAr ? 'تحديث البرمجيات والـ ECU' : 'ECU Software Updates' },
          { title: isAr ? 'معايرة الرادار والكاميرا' : 'ADAS Radar Calibration' },
        ],
      },
      {
        title: isAr ? 'الصيانة البسيطة' : 'Minor Service',
        items: [
          { title: true },
          { title: true },
          { title: false },
          { title: false },
          { title: false },
          { title: false },
        ],
        callToAction: {
          text: isAr ? 'اختر البسيطة' : 'Select Minor',
          href: getLocalizedHref('/contact', lang),
        },
      },
      {
        title: isAr ? 'الصيانة الكبرى' : 'Major Service',
        items: [
          { title: true },
          { title: true },
          { title: true },
          { title: true },
          { title: false },
          { title: false },
        ],
        callToAction: {
          text: isAr ? 'اختر الكبرى' : 'Select Major',
          href: getLocalizedHref('/contact', lang),
        },
      },
      {
        title: isAr ? 'فحص ومعايرة ADAS' : 'ADAS & OBD',
        items: [
          { title: false },
          { title: false },
          { title: false },
          { title: true },
          { title: true },
          { title: true },
        ],
        callToAction: {
          text: isAr ? 'اختر البرمجة' : 'Select ADAS',
          href: getLocalizedHref('/contact', lang),
        },
      },
    ],
  };

  const faqs3Pricing: FAQsProps = {
    id: 'faqsThree-on-pricing',
    hasBackground: true,
    header: {
      title: isAr ? 'الأسئلة الشائعة حول أسعار الخدمات' : 'Pricing FAQs',
      subtitle: isAr ? 'لديك استفسارات أخرى حول تكلفة الصيانة؟' : 'Do you have other questions about costs?',
    },
    items: isAr ? [
      {
        title: 'هل تشمل الأسعار المعروضة تكلفة قطع الغيار؟',
        description: 'تشمل باقة الصيانة البسيطة تكلفة الزيت والفلتر الأصليين. أما باقة الصيانة الكبرى، فقد تختلف تكلفتها بناءً على نوع شمعات الاحتراق (البواجي) والفلاتر الخاصة بموديل سيارتك الهوندا (هايبرد أو بنزين).',
      },
      {
        title: 'ما هي طرق الدفع المتاحة في مركز حسام؟',
        description: 'نقبل الدفع نقداً، بالإضافة إلى الدفع عبر المحافظ الإلكترونية (زين كاش، كليك CliQ) والبطاقات الائتمانية تسهيلاً لعملائنا.',
      },
      {
        title: 'هل هناك أي تكاليف مخفية غير معلنة؟',
        description: 'لا على الإطلاق. نلتزم بالشفافية الكاملة، ولن نقوم بإجراء أي إصلاح إضافي دون الاتصال بك مسبقاً وتوضيح التكلفة والحصول على موافقتك الصريحة.',
      },
    ] : [
      {
        title: 'Do the package prices include the cost of parts?',
        description: 'The Minor Service includes the engine oil and filter cost. The Major Service price is a starting base and can vary depending on spark plug/filter types specific to your Honda hybrid or gasoline model.',
      },
      {
        title: 'What payment methods do you accept?',
        description: 'We accept cash, local mobile wallets (Zain Cash, CliQ transfer), and credit cards at our front office.',
      },
      {
        title: 'Are there any hidden charges?',
        description: 'Never. We uphold complete transparency, and our technicians will always contact you to explain active faults and obtain your approval before carrying out any additional repairs.',
      },
    ],
  };

  return { heroPricing, pricingPricing, comparisonPricing, faqs3Pricing };
};

// Legacy placeholders for TS compile
export const heroPricing = {} as any;
export const pricingPricing = {} as any;
export const comparisonPricing = {} as any;
export const faqs3Pricing = {} as any;
