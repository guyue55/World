export type ContentSeedType = 'article' | 'photo' | 'diary' | 'project-log' | 'world-rule' | 'ai-suggestion' | 'event' | 'exhibition'
export type EditorialStatus = 'draft' | 'reviewed' | 'ready' | 'published'
export type ContentChannel = 'home' | 'constellation' | 'time-river' | 'memory-graph' | 'lighthouse'
export type ContentVisibility = 'public' | 'private-redacted'
export type ContentSeed = { id:string; title:string; summary:string; type:ContentSeedType; channel:ContentChannel; status:EditorialStatus; visibility:ContentVisibility; tags:string[]; assetIds:string[] }
