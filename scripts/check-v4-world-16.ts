import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['data/v4-worldification/final-report.json','data/v4-worldification/stage-04/16-v4-world-final-closure.json','docs/10-development-history/v4-worldification/final-closure.md']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const report=JSON.parse(fs.readFileSync('data/v4-worldification/final-report.json','utf8'))
const closure=JSON.parse(fs.readFileSync('data/v4-worldification/stage-04/16-v4-world-final-closure.json','utf8'))
if(report.status!=='complete' || report.completedStages!==4 || report.completedBatches!==16) errors.push('final report counts invalid')
if(report.worldificationReady!==true) errors.push('worldificationReady must be true')
if(report.productionLive!==false || closure.productionLive!==false) errors.push('productionLive must remain false')
if(!closure.conceptExpansionDecision?.needExpansion) errors.push('V5 expansion decision missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V4 world batch 16 checks passed.')
