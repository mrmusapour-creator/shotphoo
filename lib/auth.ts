import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
        if (!user?.passwordHash) return null;
        const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!valid) return null;
        return { id: user.id, email: user.email, name: user.name, image: user.image };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
        token.roles = dbUser?.roles ?? ["CLIENT"];
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.roles = (token.roles as string[]) ?? ["CLIENT"];
      }
      return session;
    }
  }
} satisfies NextAuthConfig;

export function canAccess(userRoles: string[] = [], allowed: string[]) {
  return userRoles.some((role) => allowed.includes(role));
}
