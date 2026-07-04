import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['data/v5-real-content/final-report.json','data/v5-real-content/stage-04/16-v5-final-closure.json','docs/10-development-history/v5-real-content/final-closure.md']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const report=JSON.parse(fs.readFileSync('data/v5-real-content/final-report.json','utf8'))
const closure=JSON.parse(fs.readFileSync('data/v5-real-content/stage-04/16-v5-final-closure.json','utf8'))
if(report.status!=='complete' || report.completedStages!==4 || report.completedBatches!==16) errors.push('final report counts invalid')
if(report.localContentReady!==true) errors.push('localContentReady must be true')
if(report.productionLive!==false || closure.productionLive!==false) errors.push('productionLive must remain false')
if(!closure.conceptExpansionDecision?.needExpansion) errors.push('V6 expansion decision missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V5 content batch 16 checks passed.')
