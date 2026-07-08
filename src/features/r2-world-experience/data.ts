import areaPassports from '../../../data/r2-world-experience/area-passports.json'
import compassAnchors from '../../../data/r2-world-experience/compass-anchors.json'
import extensionRegistry from '../../../data/r2-world-experience/extension-registry.json'
import homeComposition from '../../../data/r2-world-experience/home-composition.json'
import progressiveDisclosure from '../../../data/r2-world-experience/progressive-disclosure.json'
import roadmap from '../../../data/r2-world-experience/roadmap.json'
import arrivalRituals from '../../../data/r2-world-experience/arrival-rituals.json'
import nodeOpeningRituals from '../../../data/r2-world-experience/node-opening-rituals.json'
import modeSwitching from '../../../data/r2-world-experience/mode-switching.json'
import type { R2AreaPassport, R2GatewayCard, R2Stage, R2Summary } from './types'

export const r2Roadmap = roadmap
export const r2Stages = roadmap.stages as R2Stage[]
export const r2Batches = roadmap.batches
export const r2Extensions = extensionRegistry.items
export const r2HomeComposition = homeComposition
export const r2ProgressiveDisclosure = progressiveDisclosure
export const r2AreaPassports = areaPassports.areas as R2AreaPassport[]
export const r2CompassAnchors = compassAnchors.anchors
export const r2ArrivalRituals = arrivalRituals.rituals
export const r2NodeOpeningRituals = nodeOpeningRituals.rituals
export const r2ModeSwitching = modeSwitching.modes

export function getR2Summary(): R2Summary {
  return {
    stages: r2Stages.length,
    batches: r2Batches.length,
    extensions: r2Extensions.length,
    areas: r2AreaPassports.length,
    anchors: r2CompassAnchors.length,
    productionLive: Boolean(roadmap.productionLive),
    releaseReady: Boolean(roadmap.releaseReady),
    cleanProductionReady: Boolean(roadmap.cleanProductionReady),
  }
}

export function getR2GatewayCards(): R2GatewayCard[] {
  return r2AreaPassports.map((area) => ({
    id: area.id,
    title: area.worldName,
    worldName: area.worldName,
    realName: area.realName,
    description: area.purpose,
    href: area.entry,
  }))
}
