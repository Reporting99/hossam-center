const SITE = require('./src/config.js').SITE;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `${SITE.origin}${SITE.basePathname}`,
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    const locales = ['ar', 'en'];
    const paths = [
      '',
      '/about',
      '/contact',
      '/pricing',
      '/faqs',
      '/services',
      '/services/Car-Computer-Diagnostic',
      '/services/Computer-Software-Update',
      '/services/Maintenance',
      '/services/AC-Gas-Service',
      '/services/Radar-Calibration',
      '/services/Spare-Parts',
      '/blog',
    ];

    const posts = [
      'honda-maintenance-amman-ar',
      'honda-maintenance-amman-en',
      'honda-sensing-calibration-ar',
      'honda-sensing-calibration-en',
      'honda-software-update-ar',
      'honda-software-update-en',
    ];

    const result = [];
    
    // Add main pages
    for (const locale of locales) {
      for (const p of paths) {
        const path = `/${locale}${p}`;
        result.push({
          loc: path,
          changefreq: 'daily',
          priority: p === '' ? 1.0 : 0.8,
          lastmod: new Date().toISOString(),
        });
      }
    }

    // Add blog posts
    for (const slug of posts) {
      const isEn = slug.endsWith('-en');
      const locale = isEn ? 'en' : 'ar';
      result.push({
        loc: `/${locale}/${slug}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    }

    return result;
  }
};
