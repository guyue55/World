import fs from 'node:fs'
import path from 'node:path'
import events from '../data/world-events.json'
import timelineQualityGate from '../data/timeline-quality-gate.json'
import timelineProductizationContract from '../data/timeline-productization-contract.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const publicEvents = events.filter((event) => event.visibility !== 'private')
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
  ;['TimelineHero', 'TimelineStats', 'TimelineEventStream'].forEach((token) => {
    if (!page.includes(token)) errors.push(`timeline page missing ${token}`)
  })

  if (page.includes('WorldFoundationStack')) errors.push('timeline page must not load WorldFoundationStack')
  if (timelineProductizationContract.pageParts.length < 6) errors.push('timeline contract pageParts too small')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Timeline productization check passed.')
}

main()
