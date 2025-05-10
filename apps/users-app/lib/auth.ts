import { prisma } from "@repo/database";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt-ts";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials: Record<string, string> | undefined) {
        try {
          if (!credentials?.phone || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          // Find existing user
          const existingUser = await prisma.user.findFirst({
            where: {
              number: credentials.phone
            }
          });

          if (existingUser) {

            const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);
            if (passwordMatch) {
              return {
                id: existingUser.id.toString(),
                name: existingUser.name || "User",
                email: existingUser.email || credentials.phone
              };
            }

            else {
              throw new Error("Invalid password");
            };
          }

          else {

            throw new Error("User not found");
          }
        } catch (e) {
          console.error("Auth error:", e);
          throw new Error("Invalid credentials");
        }
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
    error: '/signin?error=true'
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async session({ token, session }: any) {
      if (token && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  }
};

