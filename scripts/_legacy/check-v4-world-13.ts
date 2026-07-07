import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['src/components/worldification/MobileWorldDock.tsx','data/v4-worldification/stage-04/13-mobile-world-dock.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const page=fs.readFileSync('src/app/world/page.tsx','utf8')
if(!page.includes('MobileWorldDock')) errors.push('world page must include MobileWorldDock')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V4 world batch 13 checks passed.')
