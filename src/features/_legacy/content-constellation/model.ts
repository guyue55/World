export type ContentNodeType = 'article' | 'path' | 'theme-island' | 'archive' | 'world-rule'
export type ContentVisibility = 'public' | 'family' | 'private-redacted'
export type ContentNode = { id:string; title:string; href:string; type:ContentNodeType; visibility:ContentVisibility; description:string; tags:string[]; weight:number }
export type ContentEdge = { id:string; source:string; target:string; relation:'continues'|'explains'|'belongs-to'|'references'|'protects'; label:string }
export type ReadingPath = { id:string; title:string; description:string; nodeIds:string[] }
