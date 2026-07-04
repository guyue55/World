import { NextResponse, type NextRequest } from 'next/server'
import {
  getLegacyRedirect,
  isInternalProductRoute,
  isPrivateProductRoute,
} from './src/lib/product-routes'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const legacyTarget = getLegacyRedirect(pathname)

  if (legacyTarget) {
    return NextResponse.redirect(new URL(legacyTarget, request.url), 308)
  }

  if (isPrivateProductRoute(pathname)) {
    return NextResponse.redirect(new URL('/forbidden', request.url), 307)
  }

  if (isInternalProductRoute(pathname)) {
    return NextResponse.redirect(new URL('/archive', request.url), 307)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*|api/).*)',
  ],
}
