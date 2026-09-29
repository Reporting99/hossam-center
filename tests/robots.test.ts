import { afterEach, describe, expect, it, vi } from 'vitest';
import type { MetadataRoute } from 'next';

/**
 * Renders the robots() metadata object the way Next serialises it to
 * /robots.txt, so the assertions are on the literal lines a crawler reads,
 * not on our data structure.
 */
function renderRobotsTxt(result: MetadataRoute.Robots): string {
  const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
  const lines: string[] = [];
  for (const rule of rules) {
    const agents = Array.isArray(rule.userAgent) ? rule.userAgent : [rule.userAgent ?? '*'];
    for (const agent of agents) lines.push(`User-Agent: ${agent}`);
    const allow = rule.allow === undefined ? [] : Array.isArray(rule.allow) ? rule.allow : [rule.allow];
    for (const path of allow) lines.push(`Allow: ${path}`);
    const disallow = rule.disallow === undefined ? [] : Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow];
    for (const path of disallow) lines.push(`Disallow: ${path}`);
    lines.push('');
  }
  const sitemaps = result.sitemap === undefined ? [] : Array.isArray(result.sitemap) ? result.sitemap : [result.sitemap];
  for (const sitemap of sitemaps) lines.push(`Sitemap: ${sitemap}`);
  return lines.join('\n');
}

async function loadRobots(siteUrl?: string) {
  vi.resetModules();
  vi.stubEnv('NEXT_PUBLIC_SITE_URL', siteUrl ?? '');
  const { default: robots } = await import('../app/robots');
  const { SITE_URL } = await import('~/lib/site-url');
  return { txt: renderRobotsTxt(robots()), SITE_URL };
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('robots.txt (production)', () => {
  it('allows crawling, advertises exactly SITE_URL/sitemap.xml, and blocks only non-content paths', async () => {
    const { txt, SITE_URL } = await loadRobots();
    const lines = txt.split('\n');
    expect(SITE_URL).toBe('https://housam-honda.com');
    expect(lines.filter((line) => line.startsWith('User-Agent:'))).toEqual(['User-Agent: *']);
    expect(lines).toContain('Allow: /');
    expect(lines).toContain('Disallow: /api/');
    expect(lines.filter((line) => line.startsWith('Sitemap:'))).toEqual(['Sitemap: https://housam-honda.com/sitemap.xml']);
    // Never block rendering assets or whole-site content.
    expect(lines).not.toContain('Disallow: /');
    expect(lines).not.toContain('Disallow: /_next/');
    expect(lines.some((line) => /^Disallow: \/(en|ar)(\/|$)/.test(line))).toBe(false);
  });
});

describe('robots.txt (staging)', () => {
  it('disallows everything and declares no sitemap for a non-production origin', async () => {
    const { txt, SITE_URL } = await loadRobots('https://staging.example.com');
    expect(SITE_URL).toBe('https://staging.example.com');
    const lines = txt.split('\n');
    expect(lines).toContain('Disallow: /');
    expect(lines).not.toContain('Allow: /');
    expect(lines.some((line) => line.startsWith('Sitemap:'))).toBe(false);
  });

  it('ignores an unsafe NEXT_PUBLIC_SITE_URL (http / credentials / garbage) and stays on production', async () => {
    for (const unsafe of ['http://staging.example.com', 'https://user:pass@staging.example.com', 'not a url']) {
      const { SITE_URL, txt } = await loadRobots(unsafe);
      expect(SITE_URL).toBe('https://housam-honda.com');
      expect(txt).toContain('Sitemap: https://housam-honda.com/sitemap.xml');
    }
  });
});
