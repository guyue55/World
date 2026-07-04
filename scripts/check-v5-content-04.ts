import fs from 'node:fs'
const closure=JSON.parse(fs.readFileSync('data/v5-real-content/stage-01/04-stage-01-closure.json','utf8'))
const errors:string[]=[]
if(closure.completedBatches.length!==4) errors.push('stage 01 completion count invalid')
if(!closure.conceptExpansionDecision?.needExpansion) errors.push('stage 01 expansion missing')
if(closure.productionLive!==false) errors.push('productionLive must remain false')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V5 content batch 04 checks passed.')
