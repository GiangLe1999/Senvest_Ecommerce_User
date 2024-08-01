import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";

import axios from "axios";

import axiosInstance from "@/configs/axios";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        const { name, email, password } = credentials as {
          name: string;
          email: string;
          password: string;
        };

        if (!email || !password) {
          return null;
        }

        try {
          const { data } = await axiosInstance.post("/login", {
            name,
            email,
            password,
          });

          const { ok } = data;

          if (ok) {
            return {
              user: { ...data?.user },
              backendTokens: {
                accessToken: data?.accessToken,
                refreshToken: data?.refreshToken,
                expiresIn: data?.expiresIn,
              },
            };
          } else {
            return null;
          }
        } catch (error: any) {
          console.error("Error during authentication:", error);

          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn) {
        return token;
      }

      try {
        const { data } = await axios.post(
          `${process.env.API_BASE_URL}/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Refresh ${token.backendTokens.refreshToken}`,
            },
          }
        );

        return {
          ...token,
          backendTokens: {
            accessToken: data?.accessToken,
            refreshToken: data?.refreshToken,
            expiresIn: data?.expiresIn,
          },
        };
      } catch (error) {
        console.log(error);
        return token;
      }
    },
    async session({ session, token }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },

    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const { data } = await axiosInstance.post("/google-login", {
            name: profile?.name,
            email: profile?.email,
          });

          if (data.ok) {
            user.backendTokens = {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              expiresIn: data.expiresIn,
            };
            user.user = { ...data.user };
          }
        } catch (error: any) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }
      return true;
    },
  },

  pages: {
    signIn: "/login",
  },
};
