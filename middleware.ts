import { NextResponse, type NextRequest } from 'next/server'
import { getWorldKernelRouteDecision } from './src/lib/world-kernel-boundary'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const decision = getWorldKernelRouteDecision(pathname)

  if (decision.kind === 'legacy-redirect' && decision.target) {
    return NextResponse.redirect(new URL(decision.target, request.url), 308)
  }

  if ((decision.kind === 'private-guarded' || decision.kind === 'internal-guarded') && decision.target) {
    return NextResponse.redirect(new URL(decision.target, request.url), 307)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*|api/).*)',
  ],
}
