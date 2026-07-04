import communityFeedbackLoopPlan from '../data/domains/content/community-feedback-loop-plan.json'
import contentQualityReviewStandard from '../data/domains/content/content-quality-review-standard.json'
import publicWorldBookPublishingPlan from '../data/core/public-world-book-publishing-plan.json'

function main() {
  console.log(`${publicWorldBookPublishingPlan.name}`)
  console.log(`stageProgress=${publicWorldBookPublishingPlan.stageProgress}`)
  console.log(`worldBookReady=${publicWorldBookPublishingPlan.worldBookReady}`)
  console.log(`worldBookSections=${publicWorldBookPublishingPlan.sections.length}`)
  console.log(`qualityCriteria=${contentQualityReviewStandard.criteria.length}`)
  console.log(`feedbackChannels=${communityFeedbackLoopPlan.feedbackChannels.length}`)
}

main()
