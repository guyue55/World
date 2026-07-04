import fs from 'node:fs'
const errors:string[]=[]
const closure=JSON.parse(fs.readFileSync('data/v4-worldification/stage-03/12-stage-03-closure.json','utf8'))
if(closure.completedBatches.length!==4) errors.push('stage 03 completion count invalid')
if(!closure.conceptExpansionDecision?.needExpansion) errors.push('stage 03 expansion missing')
if(closure.productionLive!==false) errors.push('productionLive must remain false')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V4 world batch 12 checks passed.')
