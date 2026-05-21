import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['src/components/worldification/MemoryRiverWorld.tsx','data/v4-worldification/stage-02/07-memory-river-world.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const page=fs.readFileSync('src/app/world/page.tsx','utf8')
if(!page.includes('MemoryRiverWorld')) errors.push('world page must include MemoryRiverWorld')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V4 world batch 07 checks passed.')
