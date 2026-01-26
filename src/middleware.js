import { NextRequest, NextResponse } from 'next/server'
 
export async function middleware(req) {
   const locales =  ['id', 'jp']

   const { pathname } = req.nextUrl
   const pathnameHasLocale = locales.some(
     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
   )
   if (pathnameHasLocale) return

   const locale = "id"
   req.nextUrl.pathname = `/${locale}${pathname}`
   return NextResponse.redirect(req.nextUrl)
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(id|jp)/:path*']
  };