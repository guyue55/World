import fs from 'node:fs'
import { getRealContentSafetyIssues, isV5ContentLocallyReady } from '../src/features/real-content-v5'
const errors:string[]=[]
for(const item of ['src/features/real-content-v5/safety.ts','src/components/real-content/RealContentSafetyPanel.tsx','data/v5-real-content/stage-04/13-content-safety-audit.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(getRealContentSafetyIssues().length !== 0) errors.push('content safety issues found')
if(!isV5ContentLocallyReady()) errors.push('V5 content should be locally ready')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V5 content batch 13 checks passed.')
