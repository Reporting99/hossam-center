import { readFileSync } from 'node:fs';
import path from 'node:path';

// Reads the .release-sha written into the artifact by the release job. Shape
// checked; anything else is "unknown", never a guess.
export function readReleaseSha(cwd: string = process.cwd()): string | null {
  try {
    const v = readFileSync(path.join(cwd, '.release-sha'), 'utf8').trim();
    return /^[0-9a-f]{40}$/.test(v) ? v : null;
  } catch {
    return null;
  }
}
