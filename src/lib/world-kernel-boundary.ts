import {
  getLegacyRedirect,
  isInternalProductRoute,
  isPrivateProductRoute,
  isProductPublicRoute,
  PRODUCT_DEEP_PUBLIC_PREFIXES,
  PRODUCT_INTERNAL_EXACT_ROUTES,
  PRODUCT_INTERNAL_ROUTE_PATTERNS,
  PRODUCT_LEGACY_REDIRECTS,
  PRODUCT_PRIVATE_ROUTES,
  PRODUCT_PUBLIC_ROUTES,
} from './product-routes'

export type WorldKernelRouteKind =
  | 'public'
  | 'legacy-redirect'
  | 'private-guarded'
  | 'internal-guarded'
  | 'unknown'

export type WorldKernelRouteDecision = {
  kind: WorldKernelRouteKind
  pathname: string
  target?: string
  reason: string
}

export const WORLD_KERNEL_BASELINE = {
  name: 'WorldOS v1 产品化旅程基线',
  sourcePackage: 'word-life_productization_journey_paths_v1_full-package.zip',
  freezePolicy: 'data/world-kernel/kernel-freeze-policy.json',
  auditReport: 'docs/10-development-history/world-kernel/world-kernel-architecture-audit-v1.md',
  consolidationReport: 'docs/10-development-history/world-kernel/world-kernel-consolidation-v1.md',
} as const

export const WORLD_KERNEL_ROUTE_POLICY = {
  publicRoutes: PRODUCT_PUBLIC_ROUTES,
  deepPublicPrefixes: PRODUCT_DEEP_PUBLIC_PREFIXES,
  legacyRedirects: PRODUCT_LEGACY_REDIRECTS,
  privateRoutes: PRODUCT_PRIVATE_ROUTES,
  internalExactRoutes: PRODUCT_INTERNAL_EXACT_ROUTES,
  internalPatterns: PRODUCT_INTERNAL_ROUTE_PATTERNS.map((pattern) => pattern.source),
} as const

export function getWorldKernelRouteDecision(pathname: string): WorldKernelRouteDecision {
  const legacyTarget = getLegacyRedirect(pathname)
  if (legacyTarget) {
    return {
      kind: 'legacy-redirect',
      pathname,
      target: legacyTarget,
      reason: '旧阶段入口仅作为兼容入口，必须重定向到产品主路径。',
    }
  }

  if (isPrivateProductRoute(pathname)) {
    return {
      kind: 'private-guarded',
      pathname,
      target: '/forbidden',
      reason: '私密、创世台、服务桥和 AI 工作台不能依赖前端隐藏，必须由路由边界拦截。',
    }
  }

  if (isInternalProductRoute(pathname)) {
    return {
      kind: 'internal-guarded',
      pathname,
      target: '/archive',
      reason: '阶段页、治理页、生产页和审计页不再作为公开产品入口。',
    }
  }

  if (isProductPublicRoute(pathname)) {
    return {
      kind: 'public',
      pathname,
      reason: '公开产品路径允许访问，并应保证当前位置、现实解释和返回路径清晰。',
    }
  }

  return {
    kind: 'unknown',
    pathname,
    reason: '未知路由交给 Next.js 404/动态路由处理，不能自动放入产品主导航。',
  }
}

export function isWorldKernelPublicPath(pathname: string) {
  return getWorldKernelRouteDecision(pathname).kind === 'public'
}
