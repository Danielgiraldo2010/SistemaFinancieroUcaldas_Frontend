import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL ?? 'https://cidt.runasp.net').replace(/\/$/, '');

const ALLOWED_PREFIXES = [
  'api/Authentication',
  'api/Security',
  'api/Presupuesto',
];

const isAllowedPath = (pathString: string): boolean =>
  ALLOWED_PREFIXES.some((prefix) => pathString.startsWith(prefix));

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
  const { path } = await params;
  const pathString = (path ?? []).join('/');

  if (!isAllowedPath(pathString))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const url = `${BACKEND_URL}/${pathString}`;

  try {
    const body = await request.json();
    
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
  const { path } = await params;
  const pathString = (path ?? []).join('/');

  if (!isAllowedPath(pathString))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const url = `${BACKEND_URL}/${pathString}${request.nextUrl.search}`;

  try {
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
  const { path } = await params;
  const pathString = (path ?? []).join('/');

  if (!isAllowedPath(pathString))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const url = `${BACKEND_URL}/${pathString}`;

  try {
    const body = await request.json();
    
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
  const { path } = await params;
  const pathString = (path ?? []).join('/');

  if (!isAllowedPath(pathString))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const url = `${BACKEND_URL}/${pathString}`;

  try {
    const response = await fetch(url, {
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
