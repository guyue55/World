import { PRODUCT_INTERNAL_EXACT_ROUTES, PRODUCT_LEGACY_REDIRECTS, PRODUCT_PRIVATE_ROUTES } from './product-routes'
import { getLegacyRuntimePolicy } from './world-kernel-runtime'

export const WORLD_KERNEL_LEGACY_ROUTE_SUMMARY = {
  legacyRedirects: PRODUCT_LEGACY_REDIRECTS,
  privateRoutes: PRODUCT_PRIVATE_ROUTES,
  internalExactRoutes: PRODUCT_INTERNAL_EXACT_ROUTES,
  runtimePolicy: getLegacyRuntimePolicy(),
} as const

export function explainLegacyRoute(pathname: string) {
  if (pathname in PRODUCT_LEGACY_REDIRECTS) return '旧入口：仅保留兼容重定向。'
  if (PRODUCT_PRIVATE_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))) return '私密入口：服务端守门。'
  if (PRODUCT_INTERNAL_EXACT_ROUTES.includes(pathname as typeof PRODUCT_INTERNAL_EXACT_ROUTES[number])) return '内部入口：不作为公开产品路径。'
  return '未登记入口：需要进入路由审计。'
}
