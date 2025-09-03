import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Autenticación básica para desarrollo
        if (credentials?.email === "admin@tickbase.com" && credentials?.password === "admin") {
          return {
            id: "1",
            email: "admin@tickbase.com",
            name: "Admin",
            role: "admin"
          }
        }
        return null
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "development-secret-key-change-in-production",
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.role = token.role
      }
      return session
    }
  },
  debug: process.env.NODE_ENV === 'development',
}
