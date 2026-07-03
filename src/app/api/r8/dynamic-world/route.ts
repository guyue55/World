import { NextResponse } from 'next/server'
import routeScenes from '../../../../../data/r8-full-dynamic-world/route-scenes.json'
import dynamicPlan from '../../../../../data/r8-full-dynamic-world/dynamic-world-plan.json'
import dynamicActions from '../../../../../data/r8-full-dynamic-world/dynamic-actions.json'

export function GET() {
  return NextResponse.json({
    status: 'active-static-runtime',
    version: dynamicPlan.version,
    title: dynamicPlan.title,
    scenes: routeScenes.scenes.length,
    actions: dynamicActions.actions.length,
    principles: dynamicPlan.principles,
    runtime: {
      requiresDatabase: false,
      requiresRealAI: false,
      supportsReducedMotion: true,
      supportsLocalJourney: true,
      productionLive: false,
    },
  })
}
