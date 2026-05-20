import communityFeedbackLoopPlan from '../../data/community-feedback-loop-plan.json'
import contentQualityReviewStandard from '../../data/content-quality-review-standard.json'
import publicWorldBookPublishingPlan from '../../data/public-world-book-publishing-plan.json'

export function getPublicWorldBookPublishingPlan() {
  return publicWorldBookPublishingPlan
}

export function getContentQualityReviewStandard() {
  return contentQualityReviewStandard
}

export function getCommunityFeedbackLoopPlan() {
  return communityFeedbackLoopPlan
}

export function getPhaseNineFeedbackSummary() {
  return {
    stageProgress: publicWorldBookPublishingPlan.stageProgress,
    worldBookReady: publicWorldBookPublishingPlan.worldBookReady,
    worldBookSections: publicWorldBookPublishingPlan.sections.length,
    qualityCriteria: contentQualityReviewStandard.criteria.length,
    feedbackChannels: communityFeedbackLoopPlan.feedbackChannels.length,
    feedbackSteps: communityFeedbackLoopPlan.loopSteps.length,
  }
}
