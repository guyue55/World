import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['src/components/time-river/TimeRiverFlow.tsx','src/components/time-river/TimeEventCard.tsx','src/components/time-river/TimeRiverFilter.tsx','src/app/time-river/page.tsx','data/round-02/stage-04/14-time-river-visual-interaction.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const page=fs.readFileSync('src/app/time-river/page.tsx','utf8')
if(!page.includes('TimeRiverFilter')||!page.includes('TimeRiverFlow')) errors.push('page missing components')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 14 checks passed.')
