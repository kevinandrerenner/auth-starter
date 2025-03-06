import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { adminRoutes, privateRoutes } from "@/routes";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = await !!req.auth;
  const { nextUrl } = req;
  const url = "http://localhost:3000";
  // const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.includes("/auth");
  const isApiRoute = nextUrl.pathname.includes("/api");
  
  if (isApiRoute) {
    return
  }
  
  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(`${url}/dashboard`);
  }
  
  if (isAuthRoute && !isLoggedIn) {
    return;
  }
  
  if(!isLoggedIn && isPrivateRoute) {
    return Response.redirect(`${url}/auth/sign-in`);
  }
  
  // console.log("Middleware called", req.nextUrl.pathname);
  // console.log(req.auth);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/',
    '/(api|trpc)(.*)',
  ],
};
