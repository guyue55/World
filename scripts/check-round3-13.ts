import fs from 'node:fs'; import { getPendingProductionGates, isProductionLiveAllowed, productionGates } from '../src/features/production-readiness'
const errors:string[]=[]; for(const item of ['src/features/production-readiness/model.ts','src/features/production-readiness/data.ts','src/components/production-readiness/ProductionReadinessBoard.tsx','src/app/production-readiness/page.tsx','data/production/production-gates.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(productionGates.length<6) errors.push('gates too few'); if(getPendingProductionGates().length<2) errors.push('pending too few'); if(isProductionLiveAllowed()) errors.push('live allowed')
if(errors.length) throw new Error(errors.join('\n')); console.log('Round 03 batch 13 checks passed.')
