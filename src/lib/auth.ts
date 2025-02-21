import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { log } from "console";


interface CustomSession extends Session {
  oauth_token?: string;
  oauth_token_secret?: string;
  access_token?: string;
}

type ProfileData = {
  id: string;
  name: string;
  email: string | null;
  image: string;
  username: string;
  avatar_url: string;
}

export const authOptions: AuthOptions = {
  providers: [
    {
      id: "discogs",
      name: "Discogs",
      type: "oauth",
      version: "1.0",
      requestTokenUrl: "https://api.discogs.com/oauth/request_token",
      authorization: "https://www.discogs.com/oauth/authorize",
      accessTokenUrl: "https://api.discogs.com/oauth/access_token",
      profileUrl: "https://api.discogs.com/oauth/identity",
      clientId: process.env.DISCOGS_ID,
      clientSecret: process.env.DISCOGS_SECRET,
      async profile(profileData: ProfileData) { 
        log("Profile Data:", profileData);
        return {
          id: profileData.id,
          name: profileData.username,
          email: null, // Discogs doesn't provide an email
          image: profileData.avatar_url,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.oauth_token = account.oauth_token;
        token.oauth_token_secret = account.oauth_token_secret;
        token.access_token = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      session.oauth_token = token.oauth_token as string;
      session.oauth_token_secret = token.oauth_token_secret as string;
      session.access_token = token.access_token as string;
      return session;
    },
  },
};