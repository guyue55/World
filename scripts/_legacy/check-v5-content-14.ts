import fs from 'node:fs'
import { realContentReadiness } from '../src/features/real-content-v5'
const errors:string[]=[]
for(const item of ['src/components/real-content/RealContentReadinessPanel.tsx','data/v5-real-content/stage-04/14-content-readiness-panel.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(realContentReadiness.length < 4) errors.push('readiness metrics too few')
if(!realContentReadiness.some((item)=>item.status==='needs-real-content')) errors.push('must keep real asset/content gap visible')
if(!realContentReadiness.some((item)=>item.status==='pending-real-run')) errors.push('must keep production pending visible')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V5 content batch 14 checks passed.')
