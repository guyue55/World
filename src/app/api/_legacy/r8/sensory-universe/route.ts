import { NextResponse } from 'next/server'
import sensoryScenes from '../../../../../data/r8-sensory-universe/sensory-scenes.json'
import worldObjects from '../../../../../data/r8-sensory-universe/world-objects.json'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json({
    ok: true,
    version: 'R8.6',
    mode: 'static-safe-sensory-universe',
    productionMutation: false,
    aiRequired: false,
    databaseRequired: false,
    scenes: sensoryScenes.scenes,
    objectLayers: worldObjects.layers,
    acceptance: worldObjects.acceptance,
  })
}
