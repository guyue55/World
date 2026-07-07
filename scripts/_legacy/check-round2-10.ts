import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['src/components/constellation/ContentStarMap.tsx','src/components/constellation/TopicIslandGrid.tsx','src/components/constellation/ReadingPathView.tsx','src/app/constellation/page.tsx','data/round-02/stage-03/10-star-island-path-views.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const page=fs.readFileSync('src/app/constellation/page.tsx','utf8')
for(const term of ['ContentStarMap','TopicIslandGrid','ReadingPathView']) if(!page.includes(term)) errors.push(`missing ${term}`)
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 10 checks passed.')
