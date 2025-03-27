// 

// src/lib/auth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "./hashUtils"; // Assuming you have a password verification utility
import User from "../models/User"; // Your User model

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Validate credentials against your database
        const user = await User.findOne({ username: credentials.username });
        
        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(
          credentials.password, 
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { 
          id: user._id, 
          username: user.username, 
          role: user.role 
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    }
  }
};

export default NextAuth(authOptions);