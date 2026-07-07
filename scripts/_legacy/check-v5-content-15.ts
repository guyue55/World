import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['src/components/real-content/V6HandoffPanel.tsx','data/v5-real-content/stage-04/15-v6-handoff.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const panel=fs.readFileSync('src/components/real-content/V6HandoffPanel.tsx','utf8')
if(!panel.includes('AI 世界助手') || !panel.includes('private-redacted')) errors.push('V6 handoff must mention AI assistant and private-redacted')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V5 content batch 15 checks passed.')
