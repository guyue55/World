import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['src/components/worldification/ExhibitionGardenWorld.tsx','data/v4-worldification/stage-03/09-exhibition-garden-world.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const page=fs.readFileSync('src/app/world/page.tsx','utf8')
if(!page.includes('ExhibitionGardenWorld')) errors.push('world page must include ExhibitionGardenWorld')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V4 world batch 09 checks passed.')
