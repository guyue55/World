export type MemoryVisibility = 'public' | 'family' | 'private-redacted'
export type MemoryNode = { id:string; title:string; visibility:MemoryVisibility; weight:number; summary:string; related:string[] }
export type MemoryGraphSummary = { total:number; publicCount:number; redactedCount:number }
