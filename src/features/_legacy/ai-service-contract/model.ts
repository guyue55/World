export type AiServiceMode = 'mock'|'preview'|'production'
export type AiServicePermission = 'read-public'|'read-redacted-metadata'|'draft-suggestion'|'flag-risk'
export type AiAdapterContract = { id:string; mode:AiServiceMode; permissions:AiServicePermission[]; forbidden:string[]; envKeys:string[] }
