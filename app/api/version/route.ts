import { readReleaseSha } from '~/lib/release-identity';

export const dynamic = 'force-dynamic';

export function GET(): Response {
  const sha = readReleaseSha();
  return Response.json({ sha }, { status: sha ? 200 : 503, headers: { 'Cache-Control': 'no-store' } });
}
