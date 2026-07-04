export type ProductionGateStatus = 'passed'|'pending'|'blocked'
export type ProductionGateType = 'build'|'preview'|'smoke'|'privacy'|'rollback'|'assets'|'secrets'
export type ProductionGate = { id:string; title:string; type:ProductionGateType; status:ProductionGateStatus; evidence:string; requiredForProduction:boolean }
