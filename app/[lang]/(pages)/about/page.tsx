import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import Features from '~/components/widgets/Features';
import Features3 from '~/components/widgets/Features3';
import Features4 from '~/components/widgets/Features4';
import Hero from '~/components/widgets/Hero';
import Steps from '~/components/widgets/Steps';
import { getAboutData } from '~/shared/data/pages/about.data';
import { getHomeData } from '~/shared/data/pages/home.data';
import { buildStaticPageMetadata } from '~/lib/page-metadata';
import { toLocale } from '~/lib/page-mappings';
import { serializeJsonLd } from '~/lib/schema';
import { buildStaticPageJsonLd } from '~/lib/page-jsonld';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return buildStaticPageMetadata('about', toLocale(lang));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const {
    hero2About,
    featuresFourAbout,
    featuresFourAboutTwo,
    stepsAbout,
    features3About,
    featuresAbout,
  } = getAboutData(lang);

  const { contactHome } = getHomeData(lang);
  const isAr = lang === 'ar';

  const locale = toLocale(lang);
  const jsonLdSchemas = buildStaticPageJsonLd('about', locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdSchemas) }} />
      <Hero {...hero2About} />
      <Features4 {...featuresFourAbout} />
      <Features4 {...featuresFourAboutTwo} />
      <Steps {...stepsAbout} />
      <Features3 {...features3About} />
      <Features {...featuresAbout} />
      
      {/* Dynamic contact details block (no form!) */}
      <Contact {...contactHome} />
    </>
  );
}
