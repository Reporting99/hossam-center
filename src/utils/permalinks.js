/**
 * Localizes internal links by prepending the language prefix.
 * @param {string} href
 * @param {string} lang
 * @returns {string}
 */
export const getLocalizedHref = (href, lang) => {
  if (!href) return '';
  if (
    href.startsWith('http') ||
    href.startsWith('tel:') ||
    href.startsWith('mailto:') ||
    href.startsWith('#') ||
    href.startsWith('https://wa.me')
  ) {
    return href;
  }
  
  // Remove existing locale prefix if any (to avoid doubling up /ar/ar/about)
  let cleanHref = href;
  if (cleanHref.startsWith('/en/') || cleanHref === '/en') {
    cleanHref = cleanHref.substring(3);
  } else if (cleanHref.startsWith('/ar/') || cleanHref === '/ar') {
    cleanHref = cleanHref.substring(3);
  }

  if (!cleanHref.startsWith('/')) {
    cleanHref = '/' + cleanHref;
  }

  // Prepend current language
  return `/${lang}${cleanHref === '/' ? '' : cleanHref}`;
};
