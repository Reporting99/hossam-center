import { readReleaseSha } from '~/lib/release-identity';

export const dynamic = 'force-dynamic';

export function GET(): Response {
  const release = readReleaseSha();
  return Response.json(
    { status: release ? 'ok' : 'error', release },
    { status: release ? 200 : 503, headers: { 'Cache-Control': 'no-store' } },
  );
}
