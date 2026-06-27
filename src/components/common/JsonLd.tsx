import { SITE } from '~/config.js';

interface JsonLdProps {
  lang: string;
}

export default function JsonLd({ lang }: JsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    'name': lang === 'ar' ? 'مركز حسام لصيانة سيارات هوندا' : 'Hossam Honda Maintenance Center',
    'image': 'https://housam-honda.com/assets/images/Hossam Center Building.webp',
    '@id': 'https://housam-honda.com/#hossam-center',
    'url': 'https://housam-honda.com/',
    'telephone': ['+962797996020', '+962795328713'],
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': lang === 'ar' ? 'شارع الشهيد، عمان' : 'Al-Shahid Road, Amman',
      'addressLocality': lang === 'ar' ? 'عمان' : 'Amman',
      'addressCountry': 'JO',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 31.999758,
      'longitude': 36.000426,
    },
    'hasMap': 'https://share.google/S6jgdB6WK3Iy9qppS',
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday'
        ],
        'opens': '09:00',
        'closes': '18:00'
      }
    ],
    'sameAs': [
      'https://www.facebook.com/HondaHousam',
      'https://www.instagram.com/housammainten/',
      'https://www.tiktok.com/@housam.maintenance.honda'
    ],
    'description': lang === 'ar' 
      ? 'مركز حسام المتخصص في صيانة سيارات هوندا وتوفير قطع الغيار الأصلية ومعايرة الرادار وفحص كمبيوتر وتحديث برمجيات هوندا في عمان، الأردن.'
      : 'Hossam Maintenance Center specialized in Honda car maintenance, original spare parts, radar calibration, computer diagnostics, and software updates in Amman, Jordan.',
    'makesOffer': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': lang === 'ar' ? 'صيانة سيارات هوندا' : 'Honda Car Maintenance',
          'description': lang === 'ar' ? 'خدمات صيانة هوندا الشاملة والدورية والميكانيك والكهرباء.' : 'Comprehensive and periodic Honda maintenance, mechanical, and electrical services.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': lang === 'ar' ? 'معايرة الرادار وكاميرات هوندا' : 'Honda Sensing Radar Calibration',
          'description': lang === 'ar' ? 'معايرة أنظمة الأمان والرادار والكاميرات لسيارات هوندا.' : 'Calibration of safety systems, radars, and cameras for Honda sensing cars.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': lang === 'ar' ? 'فحص كمبيوتر وتحديث البرمجيات' : 'Honda Computer Diagnostic & Software Update',
          'description': lang === 'ar' ? 'تحديث برمجيات هوندا وفحص الأعطال بأحدث الأجهزة الذكية.' : 'Honda software updates and diagnostic scans with smart diagnostic tools.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': lang === 'ar' ? 'قطع غيار هوندا الأصلية' : 'Honda Genuine Spare Parts',
          'description': lang === 'ar' ? 'توفير وتركيب قطع غيار هوندا الأصلية وبدائل عالية الجودة.' : 'Supply and installation of genuine Honda parts and high-quality alternatives.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': lang === 'ar' ? 'تعبئة غاز مكيف هوندا وصيانة التكييف' : 'Honda Air Conditioner Gas Refilling & AC Service',
          'description': lang === 'ar' ? 'تعبئة غاز المكيف الأصلي، كشف تسريب الغاز، وصيانة مكيف سيارات هوندا في عمان.' : 'Refilling genuine AC refrigerant gas, detecting leaks, and repairing Honda air conditioning systems in Amman.'
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
