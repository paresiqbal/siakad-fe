import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "secret",
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const user: any = { id: 1, name: "Admin", username: "admin" };

        // Replace this with your actual user authentication logic
        if (username === "admin" && password === "admin") {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }: any) {
      // Add username to the token if using the credentials provider
      if (account?.provider === "credentials" && user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }: any) {
      // Attach username to the session object
      if ("username" in token) {
        session.user.username = token.username;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
