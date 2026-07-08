export type SuggestionRisk = 'low' | 'medium' | 'high'
export type SuggestionStatus = 'preview' | 'requires-audit' | 'approved' | 'rejected'
export type SuggestionAction = 'summarize' | 'recommend-path' | 'flag-risk' | 'draft-content' | 'publish' | 'delete' | 'change-visibility' | 'read-private-raw'
export type LighthouseSuggestion = { id:string; title:string; description:string; risk:SuggestionRisk; status:SuggestionStatus; action:SuggestionAction; humanRequired:boolean; boundary:string }
