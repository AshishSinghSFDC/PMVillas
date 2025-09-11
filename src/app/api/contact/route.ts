import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  property: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = ContactSchema.parse(body);

    // TODO: integrate email provider (Resend, SendGrid) or CRM webhook here
    console.log("[Lead]", {
      at: new Date().toISOString(),
      ...data,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const msg = err?.message || "Invalid request";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
