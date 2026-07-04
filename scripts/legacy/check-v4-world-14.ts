import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['src/components/worldification/V5ContentHandoffPanel.tsx','data/v4-worldification/stage-04/14-v5-content-handoff.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const page=fs.readFileSync('src/app/world/page.tsx','utf8')
if(!page.includes('V5ContentHandoffPanel')) errors.push('world page must include V5ContentHandoffPanel')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V4 world batch 14 checks passed.')
