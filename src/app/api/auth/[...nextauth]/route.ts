import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
      GithubProvider({
          clientId: process.env.GITHUB_CLIENT_ID || "",
          clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
        // GoogleProvider({
        //   clientId: process.env.GOOGLE_CLIENT_ID || "",
        //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        // }),
    ],
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       // Optional: Add logic for sign-in
//       return true;
//     },
//     async redirect({ url, baseUrl }) {
//       // Optional: Redirect after sign-in
//       return baseUrl;
//     },
//     async session({ session, user }) {
//       // Add custom fields to the session
//       return session;
//     },
//     async jwt({ token, user, account }) {
//       // Add custom fields to JWT token
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//   },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  secret: process.env.NEXTAUTH_SECRET || "",
  // debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
