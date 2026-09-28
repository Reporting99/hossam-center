import md from 'markdown-it';
import Image from 'next/image';
import { notFound, permanentRedirect } from 'next/navigation';
import { Metadata } from 'next';
import { fetchPosts, findPostBySlug, findLatestPosts } from '~/utils/posts';
import { getValidatedItemLanguageAlternates } from '~/lib/hreflang-validation';
import { buildPageMetadata } from '~/lib/page-metadata';
import { buildBlogPostJsonLd } from '~/lib/page-jsonld';
import { serializeJsonLd } from '~/lib/schema';
import {
  getBlogPostLocale,
  getBlogPostPath,
  getBlogPostPathsByLocale,
  isIndexableBlogPost,
  toIsoDateString,
  type BlogPostSeoCandidate,
} from '~/lib/seo-content';

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

type BlogPost = BlogPostSeoCandidate & { slug: string; title: string; description?: string; image?: string; content: string };

const getFormattedDate = (date: any) => date;

/**
 * Loads the post for this route and enforces its one canonical URL.
 *
 * Blog posts are addressed by filename slug, and findPostBySlug() ignores the
 * locale prefix, so every post used to render under BOTH /en/<slug> and
 * /ar/<slug> -- e.g. /ar/honda-maintenance-amman-en served the English
 * article again, and the old hreflang (getAlternates(lang, "/" + slug))
 * even advertised that duplicate as the post's Arabic alternate. A post is
 * written in exactly one locale (seo-content getBlogPostLocale), so a
 * request under the other prefix is now permanently redirected to the post's
 * own URL. This is a deliberate fix of a demonstrably wrong duplicate URL;
 * none of those wrong-locale URLs was ever in the sitemap.
 */
async function loadPostOrRedirect(lang: string, slug: string): Promise<BlogPost> {
  const post = (await findPostBySlug(slug)) as BlogPost | null;
  if (!post) notFound();
  const ownPath = getBlogPostPath(post);
  if (getBlogPostLocale(post) !== lang) permanentRedirect(ownPath);
  return post;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  // No redirect/notFound here: the page component below performs it. Throwing
  // the same permanentRedirect from BOTH generateMetadata and the page made a
  // first (uncached) render answer with two identical Location headers.
  const post = (await findPostBySlug(slug)) as BlogPost | null;
  if (!post || getBlogPostLocale(post) !== lang) return {};
  const path = getBlogPostPath(post);
  const indexable = isIndexableBlogPost(post);
  // hreflang only when a real translation (same translationKey, other
  // locale) exists -- never "the same slug under the other prefix".
  const languages = indexable
    ? getValidatedItemLanguageAlternates(
        getBlogPostPathsByLocale(post, (await fetchPosts()) as BlogPostSeoCandidate[]),
        { source: 'blog-post-metadata', currentPath: path },
      )
    : undefined;

  return buildPageMetadata({
    lang: getBlogPostLocale(post),
    title: post.title,
    description: post.description ?? '',
    path,
    languages,
    ogType: 'article',
    images: post.image ? [post.image] : undefined,
    publishedTime: toIsoDateString(post.publishDate),
    modifiedTime: toIsoDateString(post.updateDate),
    indexable,
  });
}

export async function generateStaticParams() {
  const posts = await findLatestPosts({ count: 100 });
  // One route per post, under its own locale only.
  return posts.map((post: any) => ({
    lang: getBlogPostLocale(post),
    slug: post.slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const { lang, slug } = await params;
  const post = await loadPostOrRedirect(lang, slug);
  const jsonLdSchemas = buildBlogPostJsonLd(post);

  return (
    <section className="mx-auto py-8 sm:py-16 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdSchemas) }}
      />
      <article>
        <header className={post.image ? 'text-center' : ''}>
          <p className="mx-auto max-w-3xl px-4 sm:px-6">
            <time dateTime={toIsoDateString(post.publishDate)}>{getFormattedDate(post.publishDate)}</time>
          </p>
          <h1 className="leading-tighter font-heading mx-auto mb-8 max-w-3xl px-4 text-4xl font-bold tracking-tighter sm:px-6 md:text-5xl">
            {post.title}
          </h1>
          {post.image ? (
            <Image
              src={post.image}
              className="mx-auto mt-4 mb-6 max-w-full bg-gray-400 dark:bg-slate-700 sm:rounded-md lg:max-w-6xl"
              sizes="(max-width: 900px) 400px, 900px"
              alt={post.description ?? post.title}
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
