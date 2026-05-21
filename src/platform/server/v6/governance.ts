export type V6ProductionReview = {
  securityReviewPassed: boolean
  privacyReviewPassed: boolean
  browserSmokePassed: boolean
  externalDeployPassed: boolean
}

export function evaluateV6ProductionLive(review: V6ProductionReview) {
  return review.securityReviewPassed && review.privacyReviewPassed && review.browserSmokePassed && review.externalDeployPassed
}
