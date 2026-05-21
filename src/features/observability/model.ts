export type ObservabilitySignalType = 'performance'|'privacy'|'content'|'release'|'asset'|'ai'
export type ObservabilityStatus = 'tracked'|'planned'|'pending-real-run'
export type ObservabilitySignal = { id:string; title:string; type:ObservabilitySignalType; status:ObservabilityStatus; description:string }
