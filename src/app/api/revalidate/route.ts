import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export const runtime = "nodejs";

function isAuthorized(req: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  const provided = req.nextUrl.searchParams.get("secret") || "";
  return Boolean(expected && provided && provided === expected);
}

function ok(payload: Record<string, unknown>) {
  return Response.json({ revalidated: true, ...payload, now: Date.now() });
}
function unauthorized() {
  return new Response("Unauthorized", { status: 401 });
}

/**
 * Manual browser test:
 *   GET /api/revalidate?secret=...&slug=optional-slug
 * Accepts GET for convenience only.
 */
export async function GET(req: NextRequest) {
  const authorized = isAuthorized(req);
  if (!authorized) return unauthorized();

  const slug = req.nextUrl.searchParams.get("slug") || undefined;
  // Always refresh the listings grid
  revalidateTag("properties");
  // If a slug is provided, also refresh that property page
  if (slug) revalidateTag(`property:${slug}`);

  return ok({ method: "GET", tag: "properties", slug: slug || null });
}

/**
 * Webhook from Sanity (recommended)
 * Configure:
 *  - Method: POST
 *  - URL: https://YOUR-DOMAIN/api/revalidate?secret=YOUR_SECRET
 *  - Filter: _type == "property"
 *  - Projection: {"slug": slug.current}
 */
export async function POST(req: NextRequest) {
  const authorized = isAuthorized(req);
  if (!authorized) return unauthorized();

  let slug: string | undefined;
  try {
    const body = await req.json();
    // Prefer explicit projection { "slug": slug.current }
    slug = body?.slug;
    // Fallbacks for other webhook formats:
    if (!slug) slug = body?.document?.slug?.current;
    if (!slug) slug = body?.slug?.current;
  } catch {
    // no body → still fine; we’ll at least refresh the list
  }

  revalidateTag("properties");
  if (slug) revalidateTag(`property:${slug}`);

  return ok({ method: "POST", tag: "properties", slug: slug || null });
}
