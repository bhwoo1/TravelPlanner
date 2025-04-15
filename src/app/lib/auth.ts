import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Pool } from "./db";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const [rows] = await Pool.execute<RowDataPacket[]>(
          "SELECT * FROM users WHERE email = ?",
          [credentials?.email]
        );

        const user = Array.isArray(rows) ? rows[0] : null;

        if (!user) throw new Error("사용자를 찾을 수 없습니다.");

        const passwordMatch = await bcrypt.compare(
          credentials!.password as string,
          user.password
        );

        if (!passwordMatch) throw new Error("비밀번호가 틀렸습니다.");

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = String(token.id);
      }
      return session;
    }
  },
  pages: {
    signIn: "/signin",
  },
});