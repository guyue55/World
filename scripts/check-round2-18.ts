import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['src/components/lighthouse/RiskBadge.tsx','src/components/lighthouse/SuggestionFlow.tsx','src/components/lighthouse/AuditQueue.tsx','src/app/lighthouse/page.tsx','data/round-02/stage-05/18-suggestion-flow-audit-queue-ui.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const page=fs.readFileSync('src/app/lighthouse/page.tsx','utf8')
if(!page.includes('SuggestionFlow')||!page.includes('AuditQueue')) errors.push('lighthouse page missing components')
const queue=fs.readFileSync('src/components/lighthouse/AuditQueue.tsx','utf8')
if(!queue.includes('suggestionRequiresHuman')) errors.push('queue must use human logic')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 18 checks passed.')
