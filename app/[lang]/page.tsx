import type { Metadata } from 'next';
import { SITE } from '~/config.js';
import Hero from '~/components/widgets/Hero2';
import Features from '~/components/widgets/Features';
import Content from '~/components/widgets/Content';
import Steps from '~/components/widgets/Steps';
import Testimonials from '~/components/widgets/Testimonials';
import FAQs2 from '~/components/widgets/FAQs2';
import Contact from '~/components/widgets/Contact';
import { InfiniteSlider } from '~/components/widgets/InfiniteSlider';
import { getHomeData } from '~/shared/data/pages/home.data';

interface PageProps {
  params: Promise<{ lang: string }>;
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

  return (
    <>
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
