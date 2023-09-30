import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SessionUserProfile, SignInCredentials } from "@app/types";

declare module "next-auth" {
  interface Session {
    user: SessionUserProfile;
  }
}

const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, request) {
        const { email, password } = credentials as SignInCredentials;

        // send request to your api route where you can sign in your user and send error or
        //  success response to this function.
        const signInApiUrl = process.env.SIGNIN_API_URL as string;

        // OR
        // const signInApiUrl = "/api/users/signin";

        const { user, error } = await fetch(signInApiUrl, {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }).then(async (res) => await res.json());

        if (error) return null;
        return { id: user.id, ...user };
      },
    }),
  ],

  callbacks: {
    async jwt(params) {
      // console.log("jwt ------", params);
      if (params.user) {
        params.token = { ...params.token, ...params.user };
      }
      return params.token;
    },
    async session(params) {
      // console.log("session ------", params);
      const user = params.token as typeof params.token & SessionUserProfile;
      if (user) {
        params.session.user = {
          ...params.session.user,
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          verified: user.verified,
          role: user.role,
        };
      }

      return params.session;
    },
  },
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
