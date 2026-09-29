import { describe, expect, it } from 'vitest';
import { findForbiddenUrlPatterns, isForbiddenUrl, type ForbiddenUrlReason } from '~/lib/url-invariants';

const reasons = (url: string): ForbiddenUrlReason[] => findForbiddenUrlPatterns(url).map((match) => match.reason);

describe('findForbiddenUrlPatterns', () => {
  it('accepts every real URL shape of this site (incl. mixed-case service slugs)', () => {
    for (const url of [
      'https://housam-honda.com/ar',
      'https://housam-honda.com/en/services/AC-Gas-Service',
      'https://housam-honda.com/en/services/Car-Computer-Diagnostic',
      'https://housam-honda.com/ar/honda-maintenance-amman-ar',
      '/en/blog',
      'https://housam-honda.com/Website%20Logo.png',
    ]) {
      expect(reasons(url), url).toEqual([]);
    }
  });

  it.each<[string, ForbiddenUrlReason]>([
    ['http://localhost:3000/en', 'NON_PRODUCTION_HOST'],
    ['https://127.0.0.1/en', 'NON_PRODUCTION_HOST'],
    ['https://0.0.0.0/en', 'NON_PRODUCTION_HOST'],
    ['https://www.housam-honda.com/en', 'NON_PRODUCTION_HOST'],
    ['https://staging.example.com/en', 'NON_PRODUCTION_HOST'],
    ['https://housam-honda.com/en/undefined', 'STRINGIFIED_NULLISH'],
    ['https://housam-honda.com/ar/null', 'STRINGIFIED_NULLISH'],
    ['https://housam-honda.com/en/[object Object]', 'STRINGIFIED_NULLISH'],
    ['https://housam-honda.com/en//about', 'DOUBLE_SLASH'],
    ['https://housam-honda.com/en/&', 'LITERAL_AMPERSAND_SEGMENT'],
    ['https://housam-honda.com/en/%2520about', 'DOUBLE_PERCENT_ENCODING'],
    ['https://housam-honda.com/en/test', 'DEV_ARTIFACT_SEGMENT'],
    ['https://housam-honda.com/en/Debug/x', 'DEV_ARTIFACT_SEGMENT'],
    ['https://housam-honda.com/en/about?utm_source=x', 'QUERY_STRING'],
    ['https://housam-honda.com/en/about?', 'QUERY_STRING'],
    ['https://housam-honda.com/en/about#faq', 'FRAGMENT'],
    ['https://housam-honda.com/ar/honda\u200F-maintenance', 'HIDDEN_UNICODE_CONTROL_CHAR'],
    ['https://housam-honda.com/ar/honda\u202E-maintenance', 'HIDDEN_UNICODE_CONTROL_CHAR'],
    ['https://housam-honda.com/ar/honda\u00AD-maintenance', 'HIDDEN_UNICODE_CONTROL_CHAR'],
    // The WHATWG parser strips tab/newline -- the raw-value check must still catch it.
    ['https://housam-honda.com/ar/honda\tmaintenance', 'HIDDEN_UNICODE_CONTROL_CHAR'],
    ['https://housam-honda.com/ar/honda\nmaintenance', 'HIDDEN_UNICODE_CONTROL_CHAR'],
  ])('flags %j as %s', (url, reason) => {
    expect(reasons(url)).toContain(reason);
    expect(isForbiddenUrl(url)).toBe(true);
  });

  it('only matches dev-artifact words as whole segments, never inside a real slug', () => {
    expect(reasons('https://housam-honda.com/en/testing-your-honda-brakes')).toEqual([]);
  });

  it('never throws on malformed input', () => {
    expect(() => findForbiddenUrlPatterns('%E0%A4%A')).not.toThrow();
    expect(findForbiddenUrlPatterns('')).toEqual([]);
  });
});
