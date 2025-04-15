import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Pool } from "./db";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        const [rows] = await Pool.execute<RowDataPacket[]>(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email]
        );

        const user = Array.isArray(rows) ? rows[0] : null;
        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        return passwordMatch ? {
            name: user.name,
            email: user.email
        } : null;
      },
    }),
  ],
});
