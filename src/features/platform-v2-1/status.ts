import apiRoutes from '../../../data/v2-1/stage-02-real-api-routes.json'
import dashboard from '../../../data/v2-1/stage-03-integration-dashboard.json'
import foundation from '../../../data/v2-1/stage-01-real-service-foundation.json'
import { getRolePermissions } from '@/server/v2/permissions'

export function getV21Status() {
  return {
    foundation,
    apiRoutes,
    dashboard,
    permissions: {
      owner: getRolePermissions('owner'),
      viewer: getRolePermissions('viewer'),
    },
    summary: {
      batches: 3,
      routes: apiRoutes.routes.length,
      checks: dashboard.checks.length,
      ready: false,
      v3Allowed: false,
    },
  }
}
