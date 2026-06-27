import { CallToActionProps, FAQsProps, HeroProps } from '~/shared/types';

export const getRadarCalibrationData = (lang: string) => {
  const isAr = lang === 'ar';

  const heroradarcalibration: HeroProps = {
    title: isAr ? 'معايرة الرادار وأنظمة أمان هوندا' : 'Honda Sensing Radar Calibration',
    subtitle: isAr
      ? 'خدمات معايرة أنظمة ADAS والرادار والكاميرات الأمامية لسيارات هوندا لضمان دقة عمل أنظمة السلامة.'
      : 'Expert ADAS radar and front camera calibration services to ensure safety systems function accurately for Honda cars.',
    tagline: isAr ? 'تقنية ADAS المستخدمة في سيارات هوندا' : 'ADAS technology used by Honda',
    callToAction: {
      text: isAr ? 'طلب تسعيرة' : 'Get a Quote',
      href: `/${lang}/contact`,
    },
    callToAction2: {
      text: isAr ? 'من نحن' : 'Learn more',
      href: `/${lang}/about`,
    },
    videoSrc: '/videos/Radar Calibration hero cover.mp4',
  };

  const statsradarcalibration = {
    id: 'stats-radar-calibration',
    items: [
      { 
        title: '30+', 
        description: isAr ? 'عاماً من الخبرة والريادة في صيانة سيارات هوندا.' : 'Years of experience in Honda vehicle maintenance.' 
      },
      { 
        title: '1500+', 
        description: isAr ? 'عملية معايرة ناجحة للرادارات والكاميرات.' : 'Radars and safety systems successfully calibrated.' 
      },
      { 
        title: '100%', 
        description: isAr ? 'الالتزام التام بالدقة والتوافق مع المعايير.' : 'Commitment to manufacturer specifications.' 
      },
    ],
  };

  const stepsradarcalibration = {
    id: 'steps-radar-calibration',
    items: [
      { 
        title: isAr ? 'الفحص المبدئي للأعطال' : 'Diagnostic Scan', 
        description: isAr 
          ? 'نقوم بفحص الكمبيوتر لقراءة أي أكواد أعطال تتعلق بنظام الرادار والكاميرا.' 
          : 'We perform a full computer scan to inspect active faults in the radar/camera system.' 
      },
      { 
        title: isAr ? 'المعايرة والضبط الدقيق' : 'Precision Calibration', 
        description: isAr 
          ? 'تثبيت ألواح المعايرة الخاصة بهوندا وضبط الزوايا بدقة باستخدام أجهزة متطورة.' 
          : 'Setting up specific Honda target boards and calibrating angles with specialized tools.' 
      },
      { 
        title: isAr ? 'التأكيد والتحقق من الطريق' : 'Road Verification', 
        description: isAr 
          ? 'إجراء اختبار ديناميكي للتأكد من عمل أنظمة التنبيه من التصادم والمحافظة على المسار.' 
          : 'Conducting final diagnostic checks to ensure lane keep assist and collision mitigation systems work.' 
      },
    ],
    image: {
      src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1727953573/Radar_Calibration_oh0s0a.webp',
      alt: isAr ? 'معايرة رادارات هوندا' : 'Radar Calibration Process Image',
    },
  };

  const featuresradarcalibration = {
    id: 'features-radar-calibration',
    header: {
      title: isAr ? 'لماذا تختار مركز حسام لمعايرة رادار هوندا؟' : 'Why Choose Hossam Center for Honda Radar Calibration?',
      subtitle: isAr
        ? 'اعتمدت هوندا تقنية ADAS المتقدمة (نظام مساعدة السائق المتقدم) والمعروف بنظام Honda Sensing لزيادة أمان القيادة. عند استبدال الزجاج الأمامي أو التعرض لحادث، يجب إعادة معايرة الكاميرا والرادار فوراً.'
        : 'Honda uses advanced ADAS (Advanced Driving Assistance System) technology like Honda Sensing to ensure safety. Following a windshield replacement or collision, camera and radar calibration is mandatory.',
    },
    items: [
      { 
        title: isAr ? 'أنظمة التصادم والفرملة التلقائية' : 'Collision Mitigation & Emergency Braking', 
        description: isAr 
          ? 'ضبط رادارات المصد للتأكد من قياس المسافات بدقة أمام السيارات الأخرى لتفادي الحوادث.' 
          : 'Calibrating bumper radar sensors to ensure accurate obstacle distance measurements for emergency brake triggers.' 
      },
      { 
        title: isAr ? 'كاميرات الزجاج الأمامي (الكاميرا الأمامية)' : 'Windshield Front Camera Calibration', 
        description: isAr 
          ? 'معايرة الكاميرات الأمامية المسؤولة عن نظام المحافظة على المسار (LKAS) وقراءة الشواخص المرورية.' 
          : 'Precise alignment of the front camera responsible for Lane Keeping Assist System (LKAS) and traffic sign recognition.' 
      },
      { 
        title: isAr ? 'رادار النقطة العمياء (BSI)' : 'Blind Spot Radar Calibration', 
        description: isAr 
          ? 'ضبط رادارات الزوايا الخلفية للكشف الفعال عن السيارات التي تدخل النطاق غير المرئي للسائق.' 
          : 'Adjusting rear quarter radar sensors responsible for Blind Spot Information (BSI) warning systems.' 
      },
    ],
  };

  const faqsradarcalibration: FAQsProps = {
    id: 'faqs-radar-calibration',
    hasBackground: false,
    header: {
      title: isAr ? 'الأسئلة الشائعة حول معايرة الرادار' : 'Radar Calibration FAQs',
      subtitle: isAr
        ? 'إجابات على الأسئلة الشائعة حول نظام Honda Sensing ومعايرة رادار سيارتك.'
        : 'Find answers to common questions about our radar calibration services.',
      position: 'center',
    },
    tabs: [
      {
        link: { label: isAr ? 'معايرة رادار هوندا' : 'Honda Radar Calibration', href: `/${lang}/services` },
        items: isAr ? [
          { title: 'متى يجب علي معايرة رادار سيارتي الهوندا؟', description: 'يجب إجراء المعايرة عند استبدال الزجاج الأمامي، أو عند فك الدعامية (المصد الأمامي)، أو بعد التعرض لحادث بسيط، أو عند ظهور لمبة تحذير Radar / Camera Malfunction.' },
          { title: 'ما هو نظام Honda Sensing؟', description: 'هو حزمة الأمان الذكية من هوندا التي تشمل المحافظة على المسار، ومثبت السرعة التفاعلي، والفرملة التلقائية لتفادي الاصطدام.' },
          { title: 'هل تقدمون معايرة رادارات النقطة العمياء؟', description: 'نعم، نحن مجهزون بأحدث أجهزة ضبط ومعايرة رادارات النقطة العمياء الجانبية والخلفية لجميع فئات هوندا.' },
        ] : [
          { title: 'When is radar calibration required on my Honda?', description: 'You must calibrate when replacing the windshield, after a collision or bumper removal, following suspension changes, or if a Radar Malfunction warning light appears.' },
          { title: 'What is Honda Sensing?', description: 'It is Honda’s advanced suite of safety technologies, including lane keep assist, adaptive cruise control, and collision mitigation braking.' },
          { title: 'Do you calibrate blind spot monitors?', description: 'Yes, we calibrate side-rear blind spot radars for all Honda models using official target tools.' },
        ],
      },
    ],
  };

  return {
    heroradarcalibration,
    statsradarcalibration,
    stepsradarcalibration,
    featuresradarcalibration,
    faqsradarcalibration,
  };
};

// Static placeholders for TS
export const heroradarcalibration = {} as any;
export const statsradarcalibration = {} as any;
export const stepsradarcalibration = {} as any;
export const featuresradarcalibration = {} as any;
export const faqsradarcalibration = {} as any;
export const contactradarcalibration = {} as any;
