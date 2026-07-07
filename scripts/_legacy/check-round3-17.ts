import fs from 'node:fs'; import { getPendingRealRunSignals, getTrackedSignals, observabilitySignals } from '../src/features/observability'
const errors:string[]=[]; for(const item of ['src/features/observability/model.ts','src/features/observability/data.ts','src/components/observability/ObservabilityDashboard.tsx','src/app/observability/page.tsx','data/observability/signals.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(observabilitySignals.length<6) errors.push('signals too few'); if(getTrackedSignals().length<4) errors.push('tracked too few'); if(getPendingRealRunSignals().length<1) errors.push('pending real run missing')
if(errors.length) throw new Error(errors.join('\n')); console.log('Round 03 batch 17 checks passed.')
