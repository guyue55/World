import { NextResponse } from 'next/server'
import interactiveData from '../../../../../data/r8-interactive-universe/interactive-scenes.json'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json({
    ok: true,
    version: interactiveData.version,
    staticSafe: true,
    requiresDatabase: false,
    requiresAi: false,
    writesProductionData: false,
    mainlineCount: interactiveData.mainlines.length,
    routeCount: interactiveData.routes.length,
    principles: interactiveData.principles,
  })
}
