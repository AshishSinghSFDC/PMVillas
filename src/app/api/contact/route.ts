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

    // TODO: wire up an email/CRM provider here (Resend/SendGrid/Webhook)
    console.log("[Lead]", {
      at: new Date().toISOString(),
      ...data,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    let errorMessage = "Invalid request";
    if (err instanceof z.ZodError) {
      errorMessage = err.issues.map((i) => i.message).join(", ");
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 400 }
    );
  }
}
