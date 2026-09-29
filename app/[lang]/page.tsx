import type { Metadata } from 'next';
import Hero from '~/components/widgets/Hero2';
import Features from '~/components/widgets/Features';
import Content from '~/components/widgets/Content';
import Steps from '~/components/widgets/Steps';
import Testimonials from '~/components/widgets/Testimonials';
import FAQs2 from '~/components/widgets/FAQs2';
import Contact from '~/components/widgets/Contact';
import { InfiniteSlider } from '~/components/widgets/InfiniteSlider';
import { getHomeData } from '~/shared/data/pages/home.data';
import { buildStaticPageMetadata } from '~/lib/page-metadata';
import { toLocale } from '~/lib/page-mappings';
import { serializeJsonLd } from '~/lib/schema';
import { buildHomeJsonLd, faqItemsFromFaqsProps } from '~/lib/page-jsonld';

interface PageProps {
  params: Promise<{ lang: string }>;
}

// The homepage previously inherited its canonical/hreflang from the layout
// and had no description/OpenGraph of its own; it now declares them like
// every other page (same title/description strings as before).
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return buildStaticPageMetadata('home', toLocale(lang));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  
  const {
    heroHome,
    featuresHome,
    contentHomeOne,
    stepsHome,
    testimonialsHome,
    faqs2Home,
    contactHome,
  } = getHomeData(lang);

  const locale = toLocale(lang);
  const jsonLdSchemas = buildHomeJsonLd(locale, { faqs: faqItemsFromFaqsProps(faqs2Home) });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdSchemas) }} />
      <Hero {...heroHome} />
      <InfiniteSlider />
      <Features {...featuresHome} />
      <Content {...contentHomeOne} />
      <Steps {...stepsHome} />
      <Testimonials {...testimonialsHome} />
      <FAQs2 {...faqs2Home} />
      <Contact {...contactHome} />
    </>
  );
}
