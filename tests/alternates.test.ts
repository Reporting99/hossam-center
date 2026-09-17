import { describe, it, expect } from 'vitest';
import { getAlternates } from '~/utils/utils';

describe('getAlternates', () => {
  it('includes an x-default entry pointing at the default locale (ar)', () => {
    const { languages } = getAlternates('en', '/about');
    expect(languages['x-default']).toBe(languages.ar);
    expect(languages['x-default']).toBe('https://housam-honda.com/ar/about');
  });

  it('builds canonical urls consistently regardless of the requested locale', () => {
    const en = getAlternates('en', '/about');
    const ar = getAlternates('ar', '/about');
    expect(en.languages).toEqual(ar.languages);
  });
});
