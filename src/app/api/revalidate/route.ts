import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

// Optional: ensure Node.js runtime (fine to omit)
// export const runtime = "nodejs"

function isAuthorized(req: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  const provided = req.nextUrl.searchParams.get("secret") || "";
  if (!expected) return false;
  return provided === expected;
}

/**
 * Manual trigger from a browser tab:
 * https://YOUR-DOMAIN/api/revalidate?secret=YOUR_SECRET
 * We accept GET purely for convenience when testing.
 */
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Revalidate the properties listing
  revalidateTag("properties");

  return Response.json({
    revalidated: true,
    method: "GET",
    tag: "properties",
    now: Date.now(),
  });
}

/**
 * Webhook trigger from Sanity (recommended)
 * Set the webhook to POST to:
 * https://YOUR-DOMAIN/api/revalidate?secret=YOUR_SECRET
 */
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return new Response("Unauthorized", { status: 401 });
  }

  // If you want, you can parse the webhook body to revalidate more tags.
  // const body = await req.json().catch(() => null)

  revalidateTag("properties");

  return Response.json({
    revalidated: true,
    method: "POST",
    tag: "properties",
    now: Date.now(),
  });
}
