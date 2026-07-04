export const PRODUCT_PUBLIC_ROUTES = [
  '/',
  '/atlas',
  '/timeline',
  '/archive',
  '/paths',
  '/ask',
  '/manifesto',
  '/status',
] as const

export const PRODUCT_DEEP_PUBLIC_PREFIXES = [
  '/node/',
  '/paths/',
] as const

export const PRODUCT_LEGACY_REDIRECTS: Record<string, string> = {
  '/world': '/atlas',
  '/world-map': '/atlas',
  '/time-river': '/timeline',
  '/lighthouse': '/ask',
  '/r2-world': '/atlas',
  '/r3-content-life': '/archive',
  '/r5-lighthouse': '/ask',
  '/r8-public': '/status',
}

export const PRODUCT_PRIVATE_ROUTES = [
  '/private-archive',
  '/private-ai',
  '/r4-creator',
  '/r6-service',
  '/r7-evolution',
  '/ai-workbench',
  '/ai-workbench-v2',
] as const

export const PRODUCT_INTERNAL_ROUTE_PATTERNS = [
  /^\/v\d+(?:-|\/|$)/,
  /^\/r\d+(?:-|\/|$)/,
  /^\/phase-/,
  /^\/evidence(?:-|\/|$)/,
  /^\/governance(?:\/|$)/,
  /^\/hardening(?:\/|$)/,
  /^\/observability(?:\/|$)/,
  /^\/operator(?:\/|$)/,
  /^\/production(?:-|\/|$)/,
  /^\/release(?:\/|$)/,
  /^\/service-adapters(?:\/|$)/,
] as const

export function isProductPublicRoute(pathname: string) {
  return PRODUCT_PUBLIC_ROUTES.includes(pathname as typeof PRODUCT_PUBLIC_ROUTES[number])
    || PRODUCT_DEEP_PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

export function getLegacyRedirect(pathname: string) {
  return PRODUCT_LEGACY_REDIRECTS[pathname]
}

export function isPrivateProductRoute(pathname: string) {
  return PRODUCT_PRIVATE_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

export function isInternalProductRoute(pathname: string) {
  return PRODUCT_INTERNAL_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname))
}
