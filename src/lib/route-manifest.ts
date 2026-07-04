import routeManifest from '../../data/domains/experience/route-manifest.json'

export type RouteManifestItem = {
  path: string
  id: string
  layer: string
  required: boolean
  fallback: string
}

export type RouteManifestIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getRouteManifest() {
  return routeManifest
}

export function getRegisteredRoutes(): RouteManifestItem[] {
  return routeManifest.routes as RouteManifestItem[]
}

export function validateRouteManifest(): RouteManifestIssue[] {
  const issues: RouteManifestIssue[] = []
  const paths = new Set<string>()

  getRegisteredRoutes().forEach((route) => {
    if (paths.has(route.path)) {
      issues.push({
        id: `duplicate-route-${route.path}`,
        severity: 'error',
        message: `重复路由：${route.path}`,
      })
    }

    paths.add(route.path)

    if (route.required && !route.fallback) {
      issues.push({
        id: `missing-route-fallback-${route.path}`,
        severity: 'error',
        message: `核心路由 ${route.path} 缺少 fallback。`,
      })
    }
  })

  return issues
}
