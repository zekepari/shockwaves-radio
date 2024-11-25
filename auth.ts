import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  }
})