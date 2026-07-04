import events from '../data/core/world-events.json'
import timelineProductizationContract from '../data/domains/experience/timeline-productization-contract.json'

function main() {
  const publicEvents = events.filter((event) => event.visibility !== 'private')
  console.log(`${timelineProductizationContract.name}`)
  console.log(`publicEvents=${publicEvents.length}`)
  console.log(`eventTypes=${Array.from(new Set(publicEvents.map((event) => event.type))).join(', ')}`)
  console.log(`actors=${Array.from(new Set(publicEvents.map((event) => event.actor ?? 'system'))).join(', ')}`)
  console.log(`pageParts=${timelineProductizationContract.pageParts.length}`)
}

main()
