import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { readReleaseSha } from '~/lib/release-identity';

const dir = (content?: string) => {
  const d = mkdtempSync(path.join(tmpdir(), 'rel-'));
  if (content !== undefined) writeFileSync(path.join(d, '.release-sha'), content);
  return d;
};

describe('readReleaseSha', () => {
  it('returns a 40-hex sha (trailing newline allowed)', () => {
    const sha = 'a'.repeat(40);
    expect(readReleaseSha(dir(`${sha}\n`))).toBe(sha);
  });
  it('returns null when the file is missing', () => {
    expect(readReleaseSha(dir())).toBeNull();
  });
  it('rejects anything that is not exactly 40 lowercase hex', () => {
    expect(readReleaseSha(dir('deadbeef'))).toBeNull();
    expect(readReleaseSha(dir('A'.repeat(40)))).toBeNull();
    expect(readReleaseSha(dir(`${'a'.repeat(40)}x`))).toBeNull();
  });
});
