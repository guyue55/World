import { NextResponse } from 'next/server'
import civilizationData from '../../../../../data/r8-civilization-universe/civilization-universe.json'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json({
    status: 'static-safe',
    productionWrite: false,
    databaseRequired: false,
    aiRequired: false,
    version: civilizationData.version,
    title: civilizationData.title,
    layers: civilizationData.civilizationLayers.length,
    objects: civilizationData.worldObjects.length,
    nodeLives: civilizationData.nodeLives.length,
    routeAnchors: civilizationData.routeAnchors.length,
    principles: civilizationData.principles,
  })
}
