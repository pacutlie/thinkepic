import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/author")) return token?.role === "AUTHOR";
      if (req.nextUrl.pathname.startsWith("/admin")) return token?.role === "ADMIN";
      if (req.nextUrl.pathname.startsWith("/superadmin")) return token?.role === "SUPERADMIN";

      return !!token;
    },
  },
});

export const config = { matcher: ["/author/:path*", "/admin/:path*", "/superadmin/:path*"] };
