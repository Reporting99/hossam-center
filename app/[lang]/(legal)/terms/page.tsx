import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import md from 'markdown-it';
import { buildStaticPageMetadata } from '~/lib/page-metadata';
import { toLocale } from '~/lib/page-mappings';
import { serializeJsonLd } from '~/lib/schema';
import { buildStaticPageJsonLd } from '~/lib/page-jsonld';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return buildStaticPageMetadata('terms', toLocale(lang));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  
  const localizedPath = path.join(process.cwd(), `src/content/terms/terms.${lang}.md`);
  const defaultPath = path.join(process.cwd(), 'src/content/terms/terms.md');
  
  let fileContent = '';
  try {
    fileContent = fs.readFileSync(localizedPath, 'utf8');
  } catch (err) {
    try {
      fileContent = fs.readFileSync(defaultPath, 'utf8');
    } catch (e) {}
  }

  const locale = toLocale(lang);
  const jsonLdSchemas = buildStaticPageJsonLd('terms', locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdSchemas) }} />
      <div
        className="prose-md prose-headings:font-heading prose-headings:leading-tighter container prose prose-lg mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-6 lg:prose-xl"
        dangerouslySetInnerHTML={{
          __html: md({
            html: true,
          }).render(fileContent),
        }}
      />
    </>
  );
}
