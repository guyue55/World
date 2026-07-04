import { NextResponse } from 'next/server'
import sceneData from '../../../../../data/r8-scene-universe/scene-universe.json'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json({
    ok: true,
    staticSafe: true,
    productionWrite: false,
    aiRequired: false,
    databaseRequired: false,
    data: sceneData,
  })
}
