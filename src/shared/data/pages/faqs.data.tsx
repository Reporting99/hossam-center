import { CallToActionProps, FAQsProps, HeroProps } from '~/shared/types';

export const getFaqsData = (lang: string) => {
  const isAr = lang === 'ar';

  const heroFaqs: HeroProps = {
    title: isAr ? 'الأسئلة الشائعة والاستفسارات' : 'Frequently Asked Questions',
    subtitle: isAr ? (
      <>
        مرحبًا بك في صفحة الأسئلة الشائعة لمركز حسام. هنا ستجد إجابات على جميع استفساراتك حول صيانة سيارتك الهوندا وقطع الغيار الأصلية وأسعار الخدمات.
      </>
    ) : (
      <>
        Welcome to Hossam Center FAQs page. Here you can find answers to all your inquiries about Honda car maintenance, original spare parts, and service pricing.
      </>
    ),
    tagline: isAr ? 'مركز مساعدة عملاء مركز حسام' : 'Hossam Center Help Center',
  };

  const faqs4Faqs: FAQsProps = {
    id: 'faqsFour-on-faqs',
    hasBackground: true,
    header: {
      title: isAr ? 'ابحث عن إجابة لسؤالك' : 'Find what you need',
      subtitle: isAr ? 'إجابات سريعة وواضحة: كل ما تحتاج معرفته في مكان واحد.' : 'Get quick answers to your questions: Everything you need in one spot.',
      position: 'center',
    },
    tabs: [
      {
        link: {
          label: isAr ? 'أسئلة عامة' : 'General',
          href: '/tab1',
        },
        items: isAr ? [
          {
            title: 'هل أنتم متخصصون في سيارات هوندا فقط؟',
            description: 'نعم، نحن متخصصون بشكل رئيسي في صيانة وإصلاح سيارات هوندا بكافة طرازاتها وفئاتها، ونوفر لها أفضل خدمات الفحص والمعايرة المتخصصة.',
          },
          {
            title: 'ما هي ساعات وأيام الدوام في المركز؟',
            description: 'نعمل من يوم الأحد إلى يوم الخميس، من الساعة 09:00 صباحاً وحتى الساعة 06:00 مساءً. ويوم الجمعة هو يوم العطلة الأسبوعية.',
          },
          {
            title: 'أين يقع مركز حسام للصيانة؟',
            description: 'يقع مركزنا في عمان، الأردن، على شارع الشهيد. يمكنك الاطلاع على موقعنا الجغرافي الدقيق على الخريطة في صفحة اتصل بنا.',
          },
        ] : [
          {
            title: 'Do you only service Honda vehicles?',
            description: 'Yes, we are highly specialized in Honda vehicle repair and maintenance services, providing expert tools and technicians for all Honda models.',
          },
          {
            title: 'What are your working hours?',
            description: 'We are open from Sunday to Thursday, 09:00 AM to 06:00 PM. We are closed on Fridays.',
          },
          {
            title: 'Where is Hossam Maintenance Center located?',
            description: 'Our center is located on Al-Shahid Road, Amman, Jordan. You can see our exact location on the map in the Contact page.',
          },
        ],
      },
      {
        link: {
          label: isAr ? 'قطع الغيار والضمان' : 'Spare Parts & Warranty',
          href: '/tab2',
        },
        items: isAr ? [
          {
            title: 'هل توفرون قطع غيار هوندا الأصلية؟',
            description: 'نعم، نحن نوفر قطع الغيار الأصلية المستوردة والمطابقة لمواصفات المصنع بالكامل، بالإضافة لقطع غيار بوش الأصلية عالية الجودة والاعتمادية.',
          },
          {
            title: 'هل تأتي قطع الغيار مع ضمان؟',
            description: 'نعم، جميع قطع الغيار التي يتم تركيبها في مركزنا تأتي مع ضمان المصنع وضمان التركيب لضمان راحة بالك وجودة الخدمة.',
          },
        ] : [
          {
            title: 'Do you provide genuine Honda spare parts?',
            description: 'Yes, we supply genuine Honda spare parts directly matching factory standards, as well as premium Bosch parts.',
          },
          {
            title: 'Do the spare parts come with a warranty?',
            description: 'Yes, all spare parts supplied and installed at our facility come with a standard manufacturer and service warranty for peace of mind.',
          },
        ],
      },
      {
        link: {
          label: isAr ? 'الحجز والتسعير' : 'Booking & Pricing',
          href: '/tab3',
        },
        items: isAr ? [
          {
            title: 'هل يجب علي حجز موعد قبل الحضور؟',
            description: 'نعم، لتجنب فترات الانتظار الطويلة وضمان فحص سيارتك فوراً، ننصح بحجز موعد مسبق عبر الهاتف أو رسائل الواتساب.',
          },
          {
            title: 'هل تقدمون تقديرات مجانية لتكلفة الصيانة؟',
            description: 'نعم، بعد إجراء الفحص التشخيصي المبدئي لسيارتك، نقدم تقديراً مفصلاً ودقيقاً للتكلفة المطلوبة قبل البدء بأي أعمال إصلاح.',
          },
        ] : [
          {
            title: 'Do I need to book an appointment before visiting?',
            description: 'Yes, we highly recommend scheduling your appointment via phone or WhatsApp in advance to ensure prompt inspection.',
          },
          {
            title: 'Do you provide cost estimates before starting work?',
            description: 'Yes, following a diagnostic scan, we provide a detailed cost estimate for transparency before performing any repairs.',
          },
        ],
      },
    ],
  };

  return { heroFaqs, faqs4Faqs };
};

// Legacy placeholders for TS compile
export const heroFaqs = {} as any;
export const faqs4Faqs = {} as any;
export const callToActionFaqs = {} as any;
export const faqsAbout = {} as any;
