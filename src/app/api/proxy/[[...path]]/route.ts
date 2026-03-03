import { NextRequest, NextResponse } from "next/server";

const getBackendUrl = () => {
  const url = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
  if (!url) return null;
  return url.replace(/\/$/, "");
};

const buildUrl = (backendUrl: string, pathString: string) => {
  const cleanPath = pathString.startsWith("/") ? pathString : `/${pathString}`;
  return `${backendUrl}${cleanPath}`;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  try {
    const { path } = await params;
    const pathString = (path ?? []).join("/");
    const backendUrl = getBackendUrl();

    if (!backendUrl) {
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 },
      );
    }

    const url = buildUrl(backendUrl, pathString);

    let body: unknown = undefined;
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    console.log(`[Proxy POST] → ${url}`);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(request.headers.get("authorization") && {
          Authorization: request.headers.get("authorization")!,
        }),
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("[Proxy POST] Error:", error);
    return NextResponse.json(
      { error: "Proxy request failed", detail: String(error) },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  try {
    const { path } = await params;
    const pathString = (path ?? []).join("/");
    const backendUrl = getBackendUrl();

    if (!backendUrl) {
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 },
      );
    }

    const url = new URL(buildUrl(backendUrl, pathString));
    url.search = request.nextUrl.search;

    console.log(`[Proxy GET] → ${url.toString()}`);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(request.headers.get("authorization") && {
          Authorization: request.headers.get("authorization")!,
        }),
      },
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("[Proxy GET] Error:", error);
    return NextResponse.json(
      { error: "Proxy request failed", detail: String(error) },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  try {
    const { path } = await params;
    const pathString = (path ?? []).join("/");
    const backendUrl = getBackendUrl();

    if (!backendUrl) {
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 },
      );
    }

    const url = buildUrl(backendUrl, pathString);

    let body: unknown = undefined;
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    console.log(`[Proxy PUT] → ${url}`);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(request.headers.get("authorization") && {
          Authorization: request.headers.get("authorization")!,
        }),
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("[Proxy PUT] Error:", error);
    return NextResponse.json(
      { error: "Proxy request failed", detail: String(error) },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  try {
    const { path } = await params;
    const pathString = (path ?? []).join("/");
    const backendUrl = getBackendUrl();

    if (!backendUrl) {
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 },
      );
    }

    const url = buildUrl(backendUrl, pathString);

    console.log(`[Proxy DELETE] → ${url}`);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(request.headers.get("authorization") && {
          Authorization: request.headers.get("authorization")!,
        }),
      },
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("[Proxy DELETE] Error:", error);
    return NextResponse.json(
      { error: "Proxy request failed", detail: String(error) },
      { status: 500 },
    );
  }
}
