import fs from 'node:fs'
import { realContentItems } from '../src/features/real-content-v5'
const errors:string[]=[]
for(const domain of ['world','technology','life','memory','ai']) {
  if(!realContentItems.some((item)=>item.domain===domain)) errors.push(`missing domain ${domain}`)
}
if(!fs.existsSync('data/v5-real-content/stage-01/02-content-domains.json')) errors.push('batch 02 data missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V5 content batch 02 checks passed.')
