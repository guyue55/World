import { NextResponse } from 'next/server'
import completeScenes from '../../../../../data/r8-complete-universe/complete-scenes.json'
import completeRituals from '../../../../../data/r8-complete-universe/complete-rituals.json'
import completePlan from '../../../../../data/r8-complete-universe/complete-universe-plan.json'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json({
    version: completePlan.version,
    title: completePlan.title,
    scenes: completeScenes.scenes,
    fallback: completeScenes.fallback,
    rituals: completeRituals.rituals,
    boundaries: completeRituals.boundaries,
    runtime: {
      databaseRequired: false,
      realAiRequired: false,
      heavy3dRequired: false,
      remoteAssetRequired: false,
    },
  })
}
