import contentCalendarPlan from '../../data/content-calendar-plan.json'
import contentColumnOperationsPlan from '../../data/content-column-operations-plan.json'
import contentCommunicationChannels from '../../data/content-communication-channels.json'
import contentTopicPillars from '../../data/content-topic-pillars.json'
import personalBrandSystem from '../../data/personal-brand-system.json'

export function getPersonalBrandSystem() {
  return personalBrandSystem
}

export function getContentTopicPillars() {
  return contentTopicPillars
}

export function getContentCalendarPlan() {
  return contentCalendarPlan
}

export function getContentColumnOperationsPlan() {
  return contentColumnOperationsPlan
}

export function getContentCommunicationChannels() {
  return contentCommunicationChannels
}

export function getPhaseNineContentSummary() {
  return {
    stageProgress: contentCalendarPlan.stageProgress,
    publicationReady: contentCalendarPlan.publicationReady,
    pillars: contentTopicPillars.pillars.length,
    monthlyItems: contentCalendarPlan.monthlyPlan.length,
    columns: contentColumnOperationsPlan.columns.length,
    channels: contentCommunicationChannels.channels.length,
  }
}
