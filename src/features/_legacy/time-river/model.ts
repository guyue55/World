export type TimeEventType = 'version' | 'experience' | 'document' | 'release' | 'decision'
export type TimeEventStatus = 'complete' | 'planned' | 'blocked' | 'handoff'
export type TimeRiverEvent = { id:string; version:string; title:string; description:string; type:TimeEventType; status:TimeEventStatus; order:number; href?:string }
