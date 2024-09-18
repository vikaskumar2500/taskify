import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/api/webhook(.*)"]);

const getUrl = (path: string | URL, req: Request) => new URL(path, req.url);

export default clerkMiddleware((auth, req) => {
  const url = req.nextUrl;
  const currentPath = url.pathname;

  // If user is authenticated and visiting a public route
  if (auth().userId && isPublicRoute(req)) {
    // If the user has no organization, redirect them to select-org
    if (!auth().orgId && currentPath !== "/select-org") {
      const selectOrgUrl = getUrl("/select-org", req);
      return NextResponse.redirect(selectOrgUrl);
    }

    // If the user has an organization, redirect to that organization's page
    if (auth().orgId && currentPath !== `/organization/${auth().orgId}`) {
      const orgUrl = getUrl(`/organization/${auth().orgId}`, req);
      return NextResponse.redirect(orgUrl);
    }
  }

  // If user is not authenticated and trying to access a private route
  if (!auth().userId && !isPublicRoute(req)) {
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};


// deprecated authMiddleware.

// import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export default authMiddleware({
//   publicRoutes: ["/", "/api/webhook"],
//   afterAuth(auth, req) {
//     if (auth.userId && auth.isPublicRoute) {
//       let path = "/select-org";

//       if (auth.orgId) {
//         path = `/organization/${auth.orgId}`;
//       }

//       const orgSelection = new URL(path, req.url);
//       return NextResponse.redirect(orgSelection);
//     }

//     if (!auth.userId && !auth.isPublicRoute) {
//       return redirectToSignIn({ returnBackUrl: req.url });
//     }

//     if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
//       const orgSelection = new URL("/select-org", req.url);
//       return NextResponse.redirect(orgSelection);
//     }
//   },
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
