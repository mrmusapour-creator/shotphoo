import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  type: z.enum(["CEO", "SUPPORT", "PROJECT"]),
  priority: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  body: z.string().min(10)
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  await prisma.leadMessage.create({ data: parsed.data });
  return NextResponse.redirect(new URL("/en/ceo-contact?sent=1", request.url), { status: 303 });
}
