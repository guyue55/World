import type { ContentSeed } from '@/features/content-ingestion'
import type { ContentReviewResult, ReviewRiskLevel } from './model'
import { contentReviewRules } from './rules'
const riskRank: Record<ReviewRiskLevel, number> = { low:0, medium:1, high:2, blocked:3 }
export function reviewContentSeed(seed: ContentSeed): ContentReviewResult {
 const haystack = `${seed.title}\n${seed.summary}\n${seed.tags.join(' ')}`.toLowerCase()
 const matched = contentReviewRules.filter(rule=>rule.forbiddenSignals.some(signal=>haystack.includes(signal.toLowerCase())))
 const visibilityReasons = seed.visibility==='private-redacted' && !seed.summary.includes('脱敏') && !seed.summary.includes('不暴露') ? ['private-redacted seed must explicitly state redaction'] : []
 const reasons = [...matched.map(rule=>rule.title), ...visibilityReasons]
 if (reasons.length===0) return { seedId:seed.id, decision:'allow', riskLevel:'low', reasons:[] }
 const highest = matched.reduce<ReviewRiskLevel>((current, rule)=>riskRank[rule.riskLevel]>riskRank[current]?rule.riskLevel:current, visibilityReasons.length>0?'high':'low')
 return { seedId:seed.id, decision:highest==='blocked'?'reject':'requires-review', riskLevel:highest, reasons }
}
export const getUnsafePublicSeeds=(seeds:ContentSeed[])=>seeds.map(reviewContentSeed).filter(r=>r.decision==='reject')
