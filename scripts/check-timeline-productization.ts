// 用途：检查timeline productization
import fs from 'node:fs'
import path from 'node:path'
import events from '../data/core/world-events.json'
import timelineQualityGate from '../data/domains/experience/timeline-quality-gate.json'
import timelineProductizationContract from '../data/domains/experience/timeline-productization-contract.json'
import type { Visibility } from '../src/lib/types'
import { isPublicVisible } from '../src/lib/visibility'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const publicEvents = events.filter((event) => !event.visibility || isPublicVisible(event.visibility as Visibility))
  const eventTypes = new Set(publicEvents.map((event) => event.type))
  const actors = new Set(publicEvents.map((event) => event.actor ?? 'system'))
  const linked = publicEvents.filter((event) => (event.nodeIds?.length ?? 0) > 0 || (event.areaIds?.length ?? 0) > 0)

  const checks = {
    publicEvents: publicEvents.length,
    eventTypes: eventTypes.size,
    eventsWithNodeOrAreaLinks: linked.length,
    actors: actors.size,
    requiredComponents: timelineQualityGate.requiredComponents.length,
  }

  Object.entries(checks).forEach(([key, value]) => {
    const expected = timelineQualityGate.minimums[key as keyof typeof timelineQualityGate.minimums]
    if (value < expected) errors.push(`${key} below minimum: ${value} < ${expected}`)
  })

  timelineQualityGate.requiredComponents.forEach((component) => {
    const files = [
      `src/components/timeline/${component}.tsx`,
    ]

    if (!files.some((file) => fs.existsSync(path.join(process.cwd(), file)))) {
      errors.push(`missing timeline component: ${component}`)
    }
  })

  const page = read('src/app/timeline/page.tsx')
  ;['TimelineHero', 'TimelineStats', 'TimelineEventStream', 'buildTimelineRiverSurface'].forEach((token) => {
    if (!page.includes(token)) errors.push(`timeline page missing ${token}`)
  })

  const timelineLib = read('src/lib/timeline.ts')
  ;['formatWorldEventType', 'formatWorldEventActor', 'isPublicVisible'].forEach((token) => {
    if (!timelineLib.includes(token)) errors.push(`timeline lib missing public label/boundary helper: ${token}`)
  })
  if (timelineLib.includes('a.title.localeCompare(b.title)')) {
    errors.push('timeline grouped events must not rely on default locale title sorting')
  }
  if (!timelineLib.includes('a.id.localeCompare(b.id)')) {
    errors.push('timeline grouped events must use stable id sorting to avoid hydration mismatch')
  }

  const filters = read('src/components/timeline/TimelineFilters.tsx')
  if (!filters.includes('type.label') || !filters.includes('actor.label')) {
    errors.push('timeline filters must render Chinese labels from domain helpers')
  }

  const stream = read('src/components/timeline/TimelineEventStream.tsx')
  if (!stream.includes('这段时间河暂时没有水纹')) errors.push('timeline stream must explain empty filter state')

  if (page.includes('WorldFoundationStack')) errors.push('timeline page must not load WorldFoundationStack')
  if (timelineProductizationContract.pageParts.length < 6) errors.push('timeline contract pageParts too small')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Timeline productization check passed.')
}

main()
