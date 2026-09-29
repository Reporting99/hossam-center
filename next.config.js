const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const SITE = require('./src/config.js').SITE;

const LOCALES = ['en', 'ar'];
const DEFAULT_LOCALE = 'ar';

/**
 * One permanent redirect per blog post from its wrong-locale URL to its own.
 *
 * A post is written in one locale (frontmatter `lang`, same rule as
 * getBlogPostLocale in src/lib/seo-content.ts) and lives only at
 * /<lang>/<slug>. Its slug under the other prefix used to render a duplicate
 * and was even advertised as its hreflang alternate. The page itself also
 * redirects as a backstop, but a redirect thrown while rendering a
 * prerendered route answers a first (uncached) request with two identical
 * Location headers; issuing it here, before rendering, gives one clean 308.
 */
function wrongLocaleBlogRedirects() {
  const dir = path.join(__dirname, 'src/content/blog');
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .flatMap((file) => {
      const slug = file.replace(/\.md$/, '');
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
      if (data.draft === true) return [];
      const lang = LOCALES.includes(data.lang) ? data.lang : DEFAULT_LOCALE;
      return LOCALES.filter((other) => other !== lang).map((other) => ({
        source: `/${other}/${slug}`,
        destination: `/${lang}/${slug}`,
        permanent: true,
      }));
    });
}

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  trailingSlash: SITE.trailingSlash,
  basePath: SITE.basePathname !== '/' ? SITE.basePathname : '',

  // Turbopack is default in Next 16; keep empty config to silence warnings
  turbopack: {},
  // swcMinify is no longer a valid top-level option in Next 16
  poweredByHeader: false,
  async redirects() {
    return wrongLocaleBlogRedirects();
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
    ],
  }
};
