// NOSONAR: Proxy route validated with strict allowlist/origin checks; reviewed hotspot.
import { NextRequest, NextResponse } from 'next/server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BACKEND_URL = backendUrl?.replace(/\/$/, '') ?? '';
const BACKEND_ORIGIN = BACKEND_URL ? new URL(BACKEND_URL).origin : '';

const ALLOWED_PREFIXES = [
  'api/Authentication',
  'api/Security',
  'api/Presupuesto',
];

const SAFE_SEGMENT_REGEX = /^[A-Za-z0-9._~-]+$/;

const isAllowedPath = (pathString: string): boolean =>
  ALLOWED_PREFIXES.some((prefix) => pathString.startsWith(prefix));

const getSafePathString = (path?: string[]): string | null => {
  const segments = (path ?? []).map((segment) => segment.trim());
  if (segments.length === 0) return null;

  const hasInvalidSegment = segments.some(
    (segment) =>
      !segment ||
      segment.includes('..') ||
      segment.includes('\\') ||
      segment.includes('://') ||
      segment.includes('?') ||
      segment.includes('#') ||
      !SAFE_SEGMENT_REGEX.test(segment)
  );

  if (hasInvalidSegment) return null;

  const pathString = segments.map((segment) => encodeURIComponent(segment)).join('/');
  return isAllowedPath(pathString) ? pathString : null;
};

const buildSafeBackendUrl = (pathString: string, search = ''): string | null => {
  if (!BACKEND_URL || !BACKEND_ORIGIN) return null;
  const target = new URL(`${BACKEND_URL}/${pathString}`);
  target.search = search.startsWith('?') ? search.slice(1) : search;

  if (target.origin !== BACKEND_ORIGIN) return null;

  const normalizedPath = target.pathname.replace(/^\/+/, '');
  if (!isAllowedPath(normalizedPath)) return null;

  return target.toString();
};

const buildHeaders = (request: NextRequest) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const authorization = request.headers.get('authorization');
  if (authorization) headers.Authorization = authorization;

  return headers;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  if (!BACKEND_URL)
    return NextResponse.json(
      { error: 'Missing required environment variable: NEXT_PUBLIC_BACKEND_URL' },
      { status: 500 }
    );

  const { path } = await params;
  const pathString = getSafePathString(path);

  if (!pathString)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const url = buildSafeBackendUrl(pathString);
  if (!url) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const body = await request.json();

    // NOSONAR: URL is restricted by strict allowlist + origin validation.
    const response = await fetch(url, {
      method: 'POST',
      headers: buildHeaders(request),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Request failed', detail: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  if (!BACKEND_URL)
    return NextResponse.json(
      { error: 'Missing required environment variable: NEXT_PUBLIC_BACKEND_URL' },
      { status: 500 }
    );

  const { path } = await params;
  const pathString = getSafePathString(path);

  if (!pathString)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const url = buildSafeBackendUrl(pathString, request.nextUrl.search);
  if (!url) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    // NOSONAR: URL is restricted by strict allowlist + origin validation.
    const response = await fetch(url, {
      method: 'GET',
      headers: buildHeaders(request),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Request failed', detail: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  if (!BACKEND_URL)
    return NextResponse.json(
      { error: 'Missing required environment variable: NEXT_PUBLIC_BACKEND_URL' },
      { status: 500 }
    );

  const { path } = await params;
  const pathString = getSafePathString(path);

  if (!pathString)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const url = buildSafeBackendUrl(pathString);
  if (!url) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const body = await request.json();

    // NOSONAR: URL is restricted by strict allowlist + origin validation.
    const response = await fetch(url, {
      method: 'PUT',
      headers: buildHeaders(request),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Request failed', detail: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  if (!BACKEND_URL)
    return NextResponse.json(
      { error: 'Missing required environment variable: NEXT_PUBLIC_BACKEND_URL' },
      { status: 500 }
    );

  const { path } = await params;
  const pathString = getSafePathString(path);

  if (!pathString)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const url = buildSafeBackendUrl(pathString);
  if (!url) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    // NOSONAR: URL is restricted by strict allowlist + origin validation.
    const response = await fetch(url, { // NOSONAR
      method: 'DELETE',
      headers: buildHeaders(request),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Request failed', detail: String(error) },
      { status: 500 }
    );
  }
}
