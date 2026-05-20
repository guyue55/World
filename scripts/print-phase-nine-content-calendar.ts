import contentCalendarPlan from '../data/content-calendar-plan.json'
import contentColumnOperationsPlan from '../data/content-column-operations-plan.json'
import contentCommunicationChannels from '../data/content-communication-channels.json'

function main() {
  console.log(`${contentCalendarPlan.name}`)
  console.log(`stageProgress=${contentCalendarPlan.stageProgress}`)
  console.log(`publicationReady=${contentCalendarPlan.publicationReady}`)
  console.log(`monthlyPlan=${contentCalendarPlan.monthlyPlan.length}`)
  console.log(`columns=${contentColumnOperationsPlan.columns.length}`)
  console.log(`channels=${contentCommunicationChannels.channels.length}`)
}

main()
