export type AiWorkflowStatus = 'draft'|'review'|'approved'|'rejected'
export type AiWorkflowRisk = 'low'|'medium'|'high'
export type AiSuggestionWorkflow = { id:string; title:string; status:AiWorkflowStatus; risk:AiWorkflowRisk; source:'public-content'|'redacted-metadata'; humanRequired:boolean; autoExecute:false; description:string }
