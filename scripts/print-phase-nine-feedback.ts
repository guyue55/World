import communityFeedbackLoopPlan from '../data/community-feedback-loop-plan.json'
import contentQualityReviewStandard from '../data/content-quality-review-standard.json'
import publicWorldBookPublishingPlan from '../data/public-world-book-publishing-plan.json'

function main() {
  console.log(`${publicWorldBookPublishingPlan.name}`)
  console.log(`stageProgress=${publicWorldBookPublishingPlan.stageProgress}`)
  console.log(`worldBookReady=${publicWorldBookPublishingPlan.worldBookReady}`)
  console.log(`worldBookSections=${publicWorldBookPublishingPlan.sections.length}`)
  console.log(`qualityCriteria=${contentQualityReviewStandard.criteria.length}`)
  console.log(`feedbackChannels=${communityFeedbackLoopPlan.feedbackChannels.length}`)
}

main()
