export type ContentChannelId = 'article'|'life'|'tech'|'photo'|'world-rule'|'ai-suggestion'
export type ContentPlacementId = 'home'|'constellation'|'time-river'|'memory-graph'|'lighthouse'
export type ContentStatus = 'draft'|'reviewed'|'ready'|'published'
export type ContentChannelDefinition = { id:ContentChannelId; title:string; description:string; placements:ContentPlacementId[] }
export type ContentIndexEntry = { seedId:string; channel:ContentChannelId; placement:ContentPlacementId; status:ContentStatus; priority:number }
