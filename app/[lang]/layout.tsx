import { Metadata } from 'next';

import { SITE } from '~/config.js';

import Providers from '~/components/atoms/Providers';
import Header from '~/components/widgets/Header';
import Announcement from '~/components/widgets/Announcement';
import Footer from '~/components/widgets/Footer';
import JsonLd from '~/components/common/JsonLd';
import FloatingActions from '~/components/common/FloatingActions';

import { Inter as CustomFont } from 'next/font/google';
import '~/assets/styles/base.css';

const customFont = CustomFont({ subsets: ['latin'], variable: '--font-custom' });

export interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

import { getAlternates } from '~/utils/utils';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const isAr = lang === 'ar';
  return {
    title: {
      template: isAr ? `%s — مركز حسام` : `%s — ${SITE.name}`,
      default: isAr ? 'مركز حسام لصيانة سيارات هوندا' : SITE.title,
    },
    description: isAr 
      ? 'مركز حسام المتخصص في صيانة سيارات هوندا وتوفير قطع الغيار الأصلية ومعايرة الرادار وفحص كمبيوتر وتحديث برمجيات هوندا في عمان، الأردن.'
      : SITE.description,
    alternates: getAlternates(lang),
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const isRtl = lang === 'ar';

  return (
    <html lang={lang} dir={isRtl ? 'rtl' : 'ltr'} className={`motion-safe:scroll-smooth 2xl:text-[24px] ${customFont.variable} font-sans`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <JsonLd lang={lang} />
      </head>
      <body className="tracking-tight antialiased text-gray-900 dark:text-slate-300 dark:bg-black">
        <Providers>
          <Announcement lang={lang} />
          <Header lang={lang} />
          <main>{children}</main>
          <Footer lang={lang} />
          <FloatingActions lang={lang} />
        </Providers>
      </body>
    </html>
  );
}

