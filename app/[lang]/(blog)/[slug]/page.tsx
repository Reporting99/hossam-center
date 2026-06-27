import md from 'markdown-it';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { findPostBySlug, findLatestPosts } from '~/utils/posts';

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

const getFormattedDate = (date: any) => date;

import { getAlternates } from '~/utils/utils';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;
  const post = (await findPostBySlug(slug)) as any;
  if (!post) {
    return notFound();
  }
  return { 
    title: post.title, 
    description: post.description,
    alternates: getAlternates(lang, `/${slug}`),
  };
}

export async function generateStaticParams() {
  const posts = await findLatestPosts({ count: 100 });
  const paramsList = posts.map((post: any) => ({
    lang: post.lang || 'ar',
    slug: post.slug,
  }));

  // Ensure we cover both languages
  const extendedParams = [...paramsList];
  posts.forEach((post: any) => {
    if (!post.lang) {
      extendedParams.push({
        lang: 'en',
        slug: post.slug,
      });
    }
  });

  return extendedParams;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const post = (await findPostBySlug(resolvedParams.slug)) as any;

  if (!post) {
    return notFound();
  }

  return (
    <section className="mx-auto py-8 sm:py-16 lg:py-20">
      <article>
        <header className={post.image ? 'text-center' : ''}>
          <p className="mx-auto max-w-3xl px-4 sm:px-6">
            <time dateTime={post.publishDate}>{getFormattedDate(post.publishDate)}</time>
          </p>
          <h1 className="leading-tighter font-heading mx-auto mb-8 max-w-3xl px-4 text-4xl font-bold tracking-tighter sm:px-6 md:text-5xl">
            {post.title}
          </h1>
          {post.image ? (
            <Image
              src={post.image}
              className="mx-auto mt-4 mb-6 max-w-full bg-gray-400 dark:bg-slate-700 sm:rounded-md lg:max-w-6xl"
              sizes="(max-width: 900px) 400px, 900px"
              alt={post.description}
              loading="eager"
              priority
              width={900}
              height={480}
            />
          ) : (
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <div className="border-t dark:border-slate-700" />
            </div>
          )}
        </header>
        <div
          className="prose-md prose-headings:font-heading prose-headings:leading-tighter container prose prose-lg mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-6 lg:prose-xl"
          dangerouslySetInnerHTML={{
            __html: md({
              html: true,
            }).render(post.content),
          }}
        />
      </article>
    </section>
  );
}
