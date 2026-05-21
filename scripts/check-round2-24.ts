import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['data/round-02/stage-06/24-round2-final-closure.json','data/round-02/final-report.json','docs/10-development-history/round-02/stage-06-theme-final/24-round2-final-closure.md','docs/10-development-history/round-02/final-closure.md']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const finalReport=JSON.parse(fs.readFileSync('data/round-02/final-report.json','utf8'))
if(finalReport.status!=='complete'||finalReport.completedStages!==6||finalReport.completedBatches!==24||finalReport.productionLive!==false) errors.push('invalid final report')
const closure=JSON.parse(fs.readFileSync('data/round-02/stage-06/24-round2-final-closure.json','utf8'))
if(!closure.conceptExpansionDecision?.needExpansion || closure.completedBatches.length!==24) errors.push('invalid closure')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 24 checks passed.')
