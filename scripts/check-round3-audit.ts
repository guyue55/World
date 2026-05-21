import fs from 'node:fs'
const errors:string[]=[]; for(const item of ['data/round-03/audit-report.json','docs/10-development-history/round-03/audit-report.md','data/round-03/stage-05/19-round3-audit.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(fs.existsSync('data/round-03/audit-report.json')){const r=JSON.parse(fs.readFileSync('data/round-03/audit-report.json','utf8')); for(const k of ['checkRound3','lint','typecheck','build','auditReport']) if(r.checks?.[k]!=='passed') errors.push(`audit ${k}`); if(r.productionLive!==false) errors.push('productionLive')}
if(errors.length) throw new Error(errors.join('\n')); console.log('Round 03 audit checks passed.')
