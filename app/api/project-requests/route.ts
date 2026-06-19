import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  budgetRange: z.string().min(1),
  projectType: z.string().min(1),
  subCategory: z.string().optional(),
  description: z.string().min(20),
  deadline: z.string().optional()
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  await prisma.projectRequest.create({
    data: {
      ...parsed.data,
      deadline: parsed.data.deadline ? new Date(parsed.data.deadline) : null
    }
  });

  return NextResponse.redirect(new URL("/en/request-project?submitted=1", request.url), { status: 303 });
}

export async function GET() {
  const requests = await prisma.projectRequest.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json({ requests });
}
