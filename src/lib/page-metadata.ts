// Shared Next Metadata builder + the per-page SEO copy for every static page.
//
// One builder guarantees, for every indexable page:
//   alternates.canonical === openGraph.url === languages[self locale]
//   === sitemap <loc> === JSON-LD WebPage url
// because all of them come from getCanonicalUrl(getLocalizedStaticPath(...))
// (or getBlogPostPath for posts) through the same code path.
//
// The titles/descriptions below are the pages' existing copy, moved here
// verbatim from each page's generateMetadata so the metadata and the
// WebPage/Service JSON-LD read the same strings.

import type { Metadata } from "next"
import { getCanonicalUrl } from "./canonical-url"
import {
  getLanguageAlternates,
  getLocalizedStaticPath,
  getStaticPagePathsByLocale,
  type LanguageAlternates,
  type Locale,
  type StaticPageKey,
} from "./page-mappings"
import { ORG_NAME } from "./schema"
import { isIndexableStaticPage } from "./seo-content"

export interface PageCopy {
  title: string
  description: string
  /** Short label used for this page in breadcrumb trails (the nav label where one exists). */
  breadcrumb: string
}

export const PAGE_COPY: Record<StaticPageKey, Record<Locale, PageCopy>> = {
  home: {
    en: {
      title: "Hossam Maintenance Center",
      description: "Specialized in Honda Car Maintenance",
      breadcrumb: "Home",
    },
    ar: {
      title: "مركز حسام لصيانة سيارات هوندا",
      description:
        "مركز حسام المتخصص في صيانة سيارات هوندا وتوفير قطع الغيار الأصلية ومعايرة الرادار وفحص كمبيوتر وتحديث برمجيات هوندا في عمان، الأردن.",
      breadcrumb: "الرئيسية",
    },
  },
  about: {
    en: {
      title: "About Us | Honda Service Center",
      description:
        "Learn about Hossam Honda Maintenance Center in Amman, Jordan. Over 30 years of experience in repair, spare parts, and ADAS calibrations.",
      breadcrumb: "About Us",
    },
    ar: {
      title: "من نحن | مركز صيانة هوندا",
      description:
        "تعرف على مركز حسام لصيانة سيارات هوندا في عمان، الأردن. خبرة تمتد لأكثر من 30 عاماً في الصيانة وقطع الغيار ومعايرة الرادار.",
      breadcrumb: "من نحن",
    },
  },
  contact: {
    en: {
      title: "Contact Us",
      description:
        "Get in touch with Hossam Honda Maintenance Center in Amman, Jordan. Phone numbers, WhatsApp, map location, and business hours.",
      breadcrumb: "Contact Us",
    },
    ar: {
      title: "اتصل بنا",
      description:
        "تواصل مع مركز حسام لصيانة سيارات هوندا في عمان، الأردن. أرقام الهواتف، والواتساب، وخريطة الموقع وساعات العمل.",
      breadcrumb: "اتصل بنا",
    },
  },
  pricing: {
    en: {
      title: "Honda Servicing Plans & Prices",
      description:
        "Pricing for Honda routine maintenance, engine service, ADAS calibrations, and ECU software flashes in Amman, Jordan.",
      breadcrumb: "Pricing",
    },
    ar: {
      title: "باقات أسعار صيانة سيارات هوندا",
      description:
        "أسعار باقات صيانة هوندا الدورية والبسيطة ومعايرة الرادار وتحديثات برمجيات كمبيوتر السيارة في عمان، الأردن.",
      breadcrumb: "الأسعار",
    },
  },
  faqs: {
    en: {
      title: "Honda Service FAQs",
      description:
        "Answers to common questions about appointment bookings, genuine parts, opening hours, and Hossam Center in Amman, Jordan.",
      breadcrumb: "FAQs",
    },
    ar: {
      title: "الأسئلة الشائعة حول صيانة هوندا",
      description:
        "إجابات على الأسئلة الشائعة حول حجز الصيانة، وقطع الغيار الأصلية، وساعات العمل وموقع مركز حسام في عمان، الأردن.",
      breadcrumb: "الأسئلة الشائعة",
    },
  },
  servicesListing: {
    en: {
      title: "Honda Car Maintenance Services",
      description:
        "Explore our services for Honda vehicles: general maintenance, spare parts, radar calibration, OBD diagnostics, and software updates in Amman, Jordan.",
      breadcrumb: "Services",
    },
    ar: {
      title: "خدمات صيانة هوندا المميزة",
      description:
        "اكتشف خدماتنا لسيارات هوندا: صيانة عامة، قطع غيار أصلية، معايرة الرادار، فحص كمبيوتر وتحديث برمجيات هوندا في عمان، الأردن.",
      breadcrumb: "خدماتنا",
    },
  },
  servicesCarComputerDiagnostic: {
    en: {
      title: "Honda Car Computer Diagnostic",
      description: "Hossam Center provides advanced computer diagnostics and OBD checks for Honda cars in Amman, Jordan.",
      breadcrumb: "Car Computer Diagnostic",
    },
    ar: {
      title: "فحص كمبيوتر سيارات هوندا",
      description:
        "مركز حسام يقدم خدمات فحص كمبيوتر هوندا وتشخيص الأعطال وقراءتها بدقة عالية باستخدام أحدث الأجهزة الذكية في عمان، الأردن.",
      breadcrumb: "فحص كمبيوتر السيارة",
    },
  },
  servicesComputerSoftwareUpdate: {
    en: {
      title: "Honda Car Computer Software Update",
      description:
        "Hossam Center provides official computer software updates and ECU flashes for Honda cars in Amman, Jordan.",
      breadcrumb: "Computer Software Update",
    },
    ar: {
      title: "تحديث برمجيات كمبيوتر سيارات هوندا",
      description:
        "مركز حسام يقدم خدمات برمجة وتحديث كمبيوتر سيارات هوندا والـ ECU وإعادة التهيأة بأعلى المعايير في عمان، الأردن.",
      breadcrumb: "تحديث برمجيات السيارة",
    },
  },
  servicesMaintenance: {
    en: {
      title: "Honda Maintenance & Repair Services",
      description:
        "Hossam Center provides comprehensive mechanical and electrical maintenance services for Honda cars in Amman, Jordan.",
      breadcrumb: "Maintenance",
    },
    ar: {
      title: "صيانة وإصلاح سيارات هوندا",
      description: "مركز حسام المتخصص في تقديم خدمات صيانة ميكانيكية وكهربائية شاملة لسيارات هوندا في عمان، الأردن.",
      breadcrumb: "صيانة عامة",
    },
  },
  servicesAcGasService: {
    en: {
      title: "Honda AC Gas Refill & Service",
      description:
        "Hossam Center provides expert AC pressure testing, genuine gas charging, and leak diagnosis for Honda cars in Amman, Jordan.",
      breadcrumb: "AC Gas Refill & Service",
    },
    ar: {
      title: "صيانة وتعبئة غاز مكيف هوندا",
      description:
        "مركز حسام يقدم خدمات فحص ضغط المكيف وتعبئة غاز الفريون الأصلي لسيارات هوندا مع الكشف عن التسريبات في عمان، الأردن.",
      breadcrumb: "صيانة وتعبئة غاز المكيف",
    },
  },
  servicesRadarCalibration: {
    en: {
      title: "Honda Sensing ADAS Radar Calibration",
      description:
        "Hossam Center specializes in radar and front camera calibration for Honda Sensing safety systems in Amman, Jordan.",
      breadcrumb: "Radar Calibration",
    },
    ar: {
      title: "معايرة رادار هوندا Sensing وADAS",
      description:
        "مركز حسام المتخصص في معايرة الرادارات والكاميرات الأمامية لسيارات هوندا لضمان عمل أنظمة الأمان بدقة عالية في عمان، الأردن.",
      breadcrumb: "معايرة الرادار",
    },
  },
  servicesSpareParts: {
    en: {
      title: "Honda Genuine Spare Parts",
      description:
        "We supply genuine Honda parts, high-quality alternatives, and Bosch parts to ensure performance and safety in Amman, Jordan.",
      breadcrumb: "Spare Parts",
    },
    ar: {
      title: "قطع غيار سيارات هوندا الأصلية",
      description: "نوفر قطع غيار هوندا الأصلية وبدائل عالية الجودة وبوش لضمان أداء وأمان سيارتك في عمان، الأردن.",
      breadcrumb: "قطع غيار",
    },
  },
  blogListing: {
    en: {
      title: "Blog & Articles",
      description:
        "Expert articles and tips on Honda maintenance, Honda Sensing calibrations, and computer software updates in Amman, Jordan.",
      breadcrumb: "Blog",
    },
    ar: {
      title: "المقالات والمدونة",
      description:
        "نصائح ومقالات متخصصة حول صيانة سيارات هوندا، ومعايرة رادار Honda Sensing، وتحديثات البرمجيات في عمان، الأردن.",
      breadcrumb: "المقالات",
    },
  },
  terms: {
    en: {
      title: "Terms & Conditions",
      description: "Terms and conditions for using the Hossam Honda Maintenance Center website in Amman, Jordan.",
      breadcrumb: "Terms & Conditions",
    },
    ar: {
      title: "الشروط والأحكام",
      description: "شروط وأحكام استخدام موقع مركز حسام لصيانة سيارات هوندا في عمان، الأردن.",
      breadcrumb: "الشروط والأحكام",
    },
  },
  privacy: {
    en: {
      title: "Privacy Policy",
      description: "Privacy Policy for Hossam Honda Maintenance Center in Amman, Jordan.",
      breadcrumb: "Privacy Policy",
    },
    ar: {
      title: "سياسة الخصوصية",
      description: "سياسة الخصوصية لمركز حسام لصيانة سيارات هوندا في عمان، الأردن.",
      breadcrumb: "سياسة الخصوصية",
    },
  },
}

export function getPageCopy(key: StaticPageKey, lang: Locale): PageCopy {
  return PAGE_COPY[key][lang]
}

export const OPEN_GRAPH_LOCALE: Record<Locale, string> = { en: "en_US", ar: "ar_JO" }

export interface PageMetadataInput {
  lang: Locale
  title: string
  description: string
  /** Site-relative path of THIS page (its canonical). */
  path: string
  /** Full reciprocal hreflang set, or undefined when the page has no real translation. */
  languages?: LanguageAlternates
  /** Bypass the layout's "%s — Site" template (homepage). */
  absoluteTitle?: boolean
  ogType?: "website" | "article"
  images?: string[]
  publishedTime?: string
  modifiedTime?: string
  indexable?: boolean
}

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const canonical = getCanonicalUrl(input.path)
  const openGraphBase = {
    title: input.title,
    description: input.description,
    url: canonical,
    siteName: ORG_NAME[input.lang],
    locale: OPEN_GRAPH_LOCALE[input.lang],
    ...(input.images && input.images.length > 0 ? { images: input.images.map((url) => ({ url })) } : {}),
  }
  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: {
      canonical,
      ...(input.languages ? { languages: input.languages } : {}),
    },
    openGraph:
      input.ogType === "article"
        ? {
            ...openGraphBase,
            type: "article",
            ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
            ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
          }
        : { ...openGraphBase, type: "website" },
    ...(input.indexable === false ? { robots: { index: false, follow: true } } : {}),
  }
}

/** generateMetadata for every static page: copy + canonical + hreflang + OG from the registry. */
export function buildStaticPageMetadata(key: StaticPageKey, lang: Locale): Metadata {
  const copy = getPageCopy(key, lang)
  return buildPageMetadata({
    lang,
    title: copy.title,
    description: copy.description,
    path: getLocalizedStaticPath(key, lang),
    languages: getLanguageAlternates(getStaticPagePathsByLocale(key)),
    absoluteTitle: key === "home",
    indexable: isIndexableStaticPage(key),
  })
}
