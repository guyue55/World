import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['src/components/world-map/ConstellationMap.tsx','src/components/world-map/WorldOrbitNode.tsx','src/components/world-map/WorldConnectionLine.tsx','data/round-02/stage-02/06-constellation-navigation.json','docs/10-development-history/round-02/stage-02-world-map/06-constellation-navigation.md']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const map=fs.readFileSync('src/components/world-map/ConstellationMap.tsx','utf8')
if(!map.includes('worldMapNodes')) errors.push('map must use nodes')
if(map.includes('canvas')||map.includes('WebGL')) errors.push('must not depend on canvas/WebGL')
const node=fs.readFileSync('src/components/world-map/WorldOrbitNode.tsx','utf8')
if(!node.includes('aria-label')) errors.push('node must include aria-label')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 06 checks passed.')
