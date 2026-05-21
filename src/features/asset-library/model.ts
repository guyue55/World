export type AssetKind = 'image'|'svg'|'video'|'diagram'|'placeholder'
export type AssetUsage = 'hero'|'world-map'|'content'|'theme'|'lighthouse'
export type AssetSource = 'generated'|'curated'|'uploaded'|'placeholder'
export type AssetStatus = 'placeholder'|'candidate'|'approved'|'rejected'
export type AssetRisk = 'low'|'medium'|'high'
export type VisualAsset = { id:string; title:string; kind:AssetKind; usage:AssetUsage; source:AssetSource; status:AssetStatus; risk:AssetRisk; licenseNote:string; pathHint:string; productionReady:boolean }
