import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
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

        try {
          // Replace 'YOUR_API_URL' with your actual API endpoint
          const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          });

          // Check if the response is successful
          if (!response.ok) {
            throw new Error("Invalid credentials");
          }

          // Parse the response JSON
          const user = await response.json();

          // Assuming the API returns a user object on successful login
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      // Add username to the token if user is available
      if (user) {
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
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
