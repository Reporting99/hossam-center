import { CallToActionProps, FAQsProps, HeroProps } from '~/shared/types';

export const getSparePartsData = (lang: string) => {
  const isAr = lang === 'ar';

  const herospareparts: HeroProps = {
    title: isAr ? 'قطع غيار هوندا وسيارات أخرى' : 'Honda & Car Spare Parts',
    subtitle: isAr
      ? 'اعثر على قطع غيار عالية الجودة لسيارات هوندا والموديلات الأخرى.'
      : 'Find high-quality spare parts for Honda and other vehicle models.',
    tagline: isAr ? 'قطع غيار موثوقة في مركز حسام' : 'Reliable Car Parts at Hossam Center',
    callToAction: {
      text: isAr ? 'طلب تسعيرة' : 'Get a Quote',
      href: `/${lang}/contact`,
    },
    callToAction2: {
      text: isAr ? 'من نحن' : 'Learn more',
      href: `/${lang}/about`,
    },
    videoSrc: '/videos/spare parts hero cover.mp4',
  };

  const statsspareparts = {
    id: 'stats-honda-spare-parts',
    items: [
      { 
        title: '30+', 
        description: isAr ? 'عاماً من الخبرة في توفير قطع غيار السيارات وخدمتها.' : 'Years of experience in car spare parts sales and service.' 
      },
      { 
        title: '5000+', 
        description: isAr ? 'عميل راضٍ حصلوا على قطع غيار عالية الجودة.' : 'Satisfied customers with top-quality spare parts.' 
      },
      { 
        title: '100%', 
        description: isAr ? 'الالتزام بالجودة ورضا العملاء التام.' : 'Commitment to quality and customer satisfaction.' 
      },
    ],
  };

  const featuresspareparts = {
    id: 'features-honda-spare-parts',
    header: {
      title: isAr ? 'لماذا تختار مركز حسام لقطع الغيار؟' : 'Why Choose Hossam Center for Spare Parts?',
      subtitle: isAr
        ? 'نوفر قطع غيار أصلية ونضمن الأداء الأمثل لسيارتك.'
        : 'We provide genuine parts and ensure top performance for your vehicle.',
    },
    items: [
      { 
        title: isAr ? 'مجموعة واسعة من قطع الغيار' : 'Wide Range of Car Spares', 
        description: isAr 
          ? 'توفير قطع غيار لمختلف طرازات السيارات بما في ذلك هوندا وغيرها.' 
          : 'Find spare parts for various car models, including Honda.' 
      },
      { 
        title: isAr ? 'قطع غيار هوندا الأصلية' : 'Honda Genuine Parts', 
        description: isAr 
          ? 'نوفر مجموعة كاملة من قطع غيار هوندا الأصلية للحفاظ على جودة سيارتك وأدائها.' 
          : 'We stock a full range of original Honda parts to maintain your vehicle’s quality and performance.' 
      },
      { 
        title: isAr ? 'قطع غيار بوش الأصلية' : 'Bosch Parts', 
        description: isAr 
          ? 'نوفر أيضاً قطع غيار بوش عالية الجودة المعروفة بموثوقيتها ودقتها.' 
          : 'We also offer high-quality Bosch parts, known for reliability and precision.' 
      },
    ],
    additionalContent: [
      { 
        title: isAr ? 'قطع غيار هوندا' : 'Honda Spares', 
        description: isAr
          ? 'يتخصص مركز حسام في توفير قطع غيار عالية الجودة مصممة لضمان أفضل أداء لمركبتك الهوندا. يشتمل مخزوننا على أجزاء مهمة مثل بطانات الفرامل، قطع التعليق، والوحدات الكهربائية. يتم الحصول على كل جزء لتلبية معايير هوندا العالية للجودة والملائمة والمتانة.'
          : 'Hossam Center specializes in high-quality spare parts designed to ensure the best performance. Our inventory includes critical components such as brake pads, suspension parts, and electrical modules.'
      },
    ],
  };

  const stepsspareparts = {
    id: 'steps-honda-spare-parts',
    items: [
      { 
        title: isAr ? 'الاستشارة والطلب' : 'Consultation', 
        description: isAr 
          ? 'ناقش احتياجاتك من قطع الغيار مع خبرائنا لتحديد القطعة المناسبة بدقة.' 
          : 'Discuss your spare parts needs with our experts.' 
      },
      { 
        title: isAr ? 'اختيار قطع الغيار' : 'Parts Selection', 
        description: isAr 
          ? 'نساعدك في اختيار قطع الغيار المناسبة تماماً لسيارتك بناءً على رقم الشاصي.' 
          : 'We help you choose the right parts for your vehicle.' 
      },
      { 
        title: isAr ? 'التركيب والضمان' : 'Installation & Service', 
        description: isAr 
          ? 'نقدم خدمة تركيب احترافية بواسطة فنيينا للتأكد من الملاءمة والعمل بكفاءة.' 
          : 'We provide professional installation and ensure everything fits perfectly.' 
      },
    ],
    image: {
      src: 'https://res.cloudinary.com/dvcfefmys/image/upload/v1727952606/Honda_spares_ccrshh.webp',
      alt: isAr ? 'قطع غيار هوندا' : 'Image of Honda spare parts',
    },
  };

  const faqsspareparts: FAQsProps = {
    id: 'faqs-honda-spare-parts',
    hasBackground: false,
    header: {
      title: isAr ? 'الأسئلة الشائعة حول قطع الغيار' : 'Spare Parts FAQs',
      subtitle: isAr
        ? 'ابحث عن إجابات للأسئلة الشائعة حول قطع الغيار لدينا.'
        : 'Find answers to common questions about our spare parts.',
      position: 'center',
    },
    tabs: [
      {
        link: { label: isAr ? 'الخدمات العامة' : 'General Services', href: `/${lang}/services` },
        items: isAr ? [
          { title: 'ما هي أنواع قطع الغيار التي تقدمونها؟', description: 'نحن نقدم مجموعة واسعة من قطع الغيار الأصلية والبديلة لسيارات هوندا وغيرها.' },
          { title: 'هل قطع غيار هوندا لديكم أصلية؟', description: 'نعم، نحن نوفر قطع غيار هوندا الأصلية من مصادر معتمدة لضمان الجودة والمتانة.' },
          { title: 'هل تقدمون خدمات التركيب؟', description: 'نعم، يقدم فنيونا خدمات تركيب احترافية لجميع قطع الغيار التي نبيعها.' },
          { title: 'كيف يمكنني طلب قطع الغيار؟', description: 'يمكنك التواصل معنا عبر الهاتف أو الواتساب، أو زيارة مركزنا مباشرة لطلب القطع المطلوبة.' },
        ] : [
          { title: 'What types of spare parts do you offer?', description: 'We offer a wide range of parts for Honda and other vehicle models.' },
          { title: 'Are your Honda parts genuine?', description: 'Yes, we stock only genuine Honda parts for quality and durability.' },
          { title: 'Do you provide installation services?', description: 'Yes, we offer professional installation for all the parts we sell.' },
          { title: 'How can I order spare parts?', description: 'You can contact us through phone or WhatsApp, or visit our center to order parts.' },
        ],
      },
    ],
  };

  return {
    herospareparts,
    statsspareparts,
    featuresspareparts,
    stepsspareparts,
    faqsspareparts,
  };
};

// Static placeholders for TS compile
export const herospareparts = {} as any;
export const statsspareparts = {} as any;
export const featuresspareparts = {} as any;
export const stepsspareparts = {} as any;
export const faqsspareparts = {} as any;
export const contactspareparts = {} as any;
