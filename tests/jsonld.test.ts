import { describe, it, expect } from 'vitest';
import { serializeJsonLd } from '~/utils/jsonld';

describe('serializeJsonLd', () => {
  it('escapes "<" so an injected </script><script> cannot break out of the JSON-LD tag', () => {
    const malicious = {
      description: '</script><script>alert(1)</script>',
    };

    const serialized = serializeJsonLd(malicious);

    expect(serialized).not.toContain('</script>');
    expect(serialized).not.toContain('<script>');
    expect(serialized).toContain('\\u003c/script>');
  });

  it('still produces valid JSON for normal input', () => {
    const schema = { '@type': 'Thing', name: 'Hossam Center' };
    expect(JSON.parse(serializeJsonLd(schema))).toEqual(schema);
  });
});
