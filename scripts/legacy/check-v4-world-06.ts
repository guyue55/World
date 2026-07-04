import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['src/components/worldification/JourneyPathwayRail.tsx','data/v4-worldification/stage-02/06-journey-pathway-rail.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const page=fs.readFileSync('src/app/world/page.tsx','utf8')
if(!page.includes('JourneyPathwayRail')) errors.push('world page must include JourneyPathwayRail')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V4 world batch 06 checks passed.')
