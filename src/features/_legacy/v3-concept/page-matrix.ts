import matrix from '../../../data/v3-concept/02-page-module-matrix.json'

export function getV3PageModuleMatrix() {
  return {
    matrix,
    summary: {
      routes: matrix.routes.length,
      moduleBoundaries: matrix.moduleBoundaries.length,
      ownerOnlyRoutes: matrix.routes.filter((route) => route.privacyLevel === 'owner-only').length,
      mixedRedactedRoutes: matrix.routes.filter((route) => route.privacyLevel === 'mixed-redacted').length,
      ready: matrix.ready,
    },
  }
}
