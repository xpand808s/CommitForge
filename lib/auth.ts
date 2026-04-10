import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";

import { getAuthSecret, hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";

const credentialSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).optional()
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: hasDatabaseUrl() ? PrismaAdapter(prisma) : undefined,
  secret: getAuthSecret(),
  session: {
    strategy: hasDatabaseUrl() ? "database" : "jwt"
  },
  pages: {
    signIn: "/auth/sign-in"
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        name: { label: "Name", type: "text" }
      },
      authorize: async (credentials) => {
        const parsed = credentialSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const { email, name } = parsed.data;
        const user = await prisma.user.upsert({
          where: { email },
          update: {
            name: name ?? undefined
          },
          create: {
            email,
            name,
            settings: {
              create: {
                preferredTheme: "dark"
              }
            }
          }
        });

        return user;
      }
    }),
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
          })
        ]
      : []),
    ...(process.env.EMAIL_FROM && process.env.AUTH_EMAIL_SERVER
      ? [
          Email({
            from: process.env.EMAIL_FROM,
            server: process.env.AUTH_EMAIL_SERVER
          })
        ]
      : [])
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    }
  }
});
