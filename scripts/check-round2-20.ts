import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['data/ai-lighthouse/mock-workflows.json','data/round-02/stage-05/20-lighthouse-qa-simulated-workflow.json','docs/10-development-history/round-02/stage-05-ai-lighthouse/20-lighthouse-qa-simulated-workflow.md']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const workflows=JSON.parse(fs.readFileSync('data/ai-lighthouse/mock-workflows.json','utf8')).workflows
if(!Array.isArray(workflows)||workflows.length<4) errors.push('workflow cases too few')
for(const flow of workflows) if(flow.autoExecute!==false) errors.push(`workflow auto executes ${flow.id}`)
if(!workflows.some((flow:{result:string})=>flow.result==='rejected')) errors.push('rejected workflow missing')
const qa=JSON.parse(fs.readFileSync('data/round-02/stage-05/20-lighthouse-qa-simulated-workflow.json','utf8'))
if(!qa.conceptExpansionDecision?.needExpansion) errors.push('expansion decision missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 20 checks passed.')
