import { r2AreaPassports, r2CompassAnchors, r2ProgressiveDisclosure, r2Roadmap } from './data'

export function assertR2WorldExperienceBoundary(): string[] {
  const errors: string[] = []
  if (r2Roadmap.productionLive !== false) errors.push('R2 must not claim productionLive=true')
  if (r2Roadmap.releaseReady !== false) errors.push('R2 must not claim releaseReady=true')
  if (r2Roadmap.cleanProductionReady !== false) errors.push('R2 must not claim cleanProductionReady=true')
  if (r2AreaPassports.length < 7) errors.push('R2 must keep at least 7 area passports')
  if (r2CompassAnchors.length !== 7) errors.push('R2 compass must keep exactly 7 anchors')
  if (r2ProgressiveDisclosure.levels.length < 4) errors.push('R2 progressive disclosure must keep 4 visibility levels')
  return errors
}
