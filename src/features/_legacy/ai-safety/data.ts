import type { AiForbiddenAction, AiRiskLogEntry } from './model'
export const aiForbiddenActions: AiForbiddenAction[] = ['publish','delete','change-visibility','read-private-raw']
export const aiRiskLog: AiRiskLogEntry[] = [
 { id:'risk-private-raw', level:'blocked', source:'private-raw-request', message:'AI workflow attempted to represent private raw access and was rejected.' },
 { id:'risk-high-review', level:'warning', source:'flag-privacy-risk', message:'High risk workflow requires human review before any downstream use.' },
]
