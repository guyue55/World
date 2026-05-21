export type ReviewRiskLevel = 'low'|'medium'|'high'|'blocked'
export type ReviewDecision = 'allow'|'requires-review'|'reject'
export type ContentReviewRule = { id:string; title:string; riskLevel:ReviewRiskLevel; forbiddenSignals:string[]; decision:ReviewDecision; description:string }
export type ContentReviewResult = { seedId:string; decision:ReviewDecision; riskLevel:ReviewRiskLevel; reasons:string[] }
