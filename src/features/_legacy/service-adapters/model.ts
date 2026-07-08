export type AdapterStatus = 'mocked'|'planned'|'blocked'|'production-ready'
export type AdapterRisk = 'low'|'medium'|'high'
export type SecretPolicy = 'env-only'|'no-secret-required'|'blocked'
export type ServiceAdapterContract = { id:string; name:string; status:AdapterStatus; risk:AdapterRisk; purpose:string; secretPolicy:SecretPolicy; secretPolicyNote:string; productionReady:boolean }
