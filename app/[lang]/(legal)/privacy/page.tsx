import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import md from 'markdown-it';

interface PageProps {
  params: Promise<{ lang: string }>;
}

import { getAlternates } from '~/utils/utils';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const isAr = lang === 'ar';
  return {
    title: isAr ? 'سياسة الخصوصية' : 'Privacy Policy',
    description: isAr 
      ? 'سياسة الخصوصية لمركز حسام لصيانة سيارات هوندا في عمان، الأردن.'
      : 'Privacy Policy for Hossam Honda Maintenance Center in Amman, Jordan.',
    alternates: getAlternates(lang, '/privacy'),
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  
  const localizedPath = path.join(process.cwd(), `src/content/privacy/privacy.${lang}.md`);
  const defaultPath = path.join(process.cwd(), 'src/content/privacy/privacy.md');
  
  let fileContent = '';
  try {
    fileContent = fs.readFileSync(localizedPath, 'utf8');
  } catch (err) {
    try {
      fileContent = fs.readFileSync(defaultPath, 'utf8');
    } catch (e) {}
  }

  return (
    <div
      className="prose-md prose-headings:font-heading prose-headings:leading-tighter container prose prose-lg mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-6 lg:prose-xl"
      dangerouslySetInnerHTML={{
        __html: md({
          html: true,
        }).render(fileContent),
      }}
    />
  );
}
