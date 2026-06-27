import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { findLatestPosts } from '~/utils/posts';
import { getLocalizedHref } from '~/utils/permalinks';
import Contact from '~/components/widgets/Contact';
import { getHomeData } from '~/shared/data/pages/home.data';

interface PageProps {
  params: Promise<{ lang: string }>;
}

import { getAlternates } from '~/utils/utils';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const isAr = lang === 'ar';
  return {
    title: isAr ? 'المقالات والمدونة' : 'Blog & Articles',
    description: isAr 
      ? 'نصائح ومقالات متخصصة حول صيانة سيارات هوندا، ومعايرة رادار Honda Sensing، وتحديثات البرمجيات في عمان، الأردن.'
      : 'Expert articles and tips on Honda maintenance, Honda Sensing calibrations, and computer software updates in Amman, Jordan.',
    alternates: getAlternates(lang, '/blog'),
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const isAr = lang === 'ar';
  
  const posts = (await findLatestPosts({ count: 20 })) as any[];
  // Filter posts based on language
  const filteredPosts = posts.filter(post => post.lang === lang);
  const { contactHome } = getHomeData(lang);

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20">
        <header>
          <h1 className="leading-tighter font-heading mb-8 text-center text-4xl font-bold tracking-tighter md:mb-16 md:text-5xl">
            {isAr ? 'مدونة مركز حسام' : 'Hossam Center Blog'}
          </h1>
        </header>
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            {isAr ? 'لا توجد مقالات متوفرة حالياً باللغة العربية.' : 'No articles available in English at the moment.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 p-4 md:p-0 lg:grid-cols-2">
            {filteredPosts.map(({ slug, title, image }: { slug: string, title: string, image: string }) => (
              <div key={slug} className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg dark:border-slate-800">
                <Link href={getLocalizedHref(`/${slug}`, lang)}>
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <Image fill className="object-cover" alt={title} src={`${image}`} />
                  </div>
                  <h2 className="p-4 font-bold text-gray-800 dark:text-slate-200 hover:text-primary-600 transition-colors">{title}</h2>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
      
      {/* Contact Section at bottom */}
      <Contact {...contactHome} />
    </>
  );
}