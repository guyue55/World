export type AiForbiddenAction = 'publish'|'delete'|'change-visibility'|'read-private-raw'
export type AiRiskLogLevel = 'info'|'warning'|'blocked'
export type AiRiskLogEntry = { id:string; level:AiRiskLogLevel; source:string; message:string }
