import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['src/components/worldification/LighthouseObservatory.tsx','data/v4-worldification/stage-03/10-lighthouse-observatory.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const page=fs.readFileSync('src/app/world/page.tsx','utf8')
if(!page.includes('LighthouseObservatory')) errors.push('world page must include LighthouseObservatory')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V4 world batch 10 checks passed.')
