import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

const SUPPORTED = new Set(locales as readonly string[]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // skip static, api, and existing-locale paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const first = pathname.split("/")[1];
  if (SUPPORTED.has(first)) return NextResponse.next();

  // rewrite "/about" -> "/en/about", "/" -> "/en"
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
