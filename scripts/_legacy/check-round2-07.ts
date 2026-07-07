import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['src/components/world-map/DesktopWorldMap.tsx','src/components/world-map/MobileWorldCompass.tsx','src/components/world-map/WorldMapLegend.tsx','src/app/world-map/page.tsx','data/round-02/stage-02/07-desktop-mobile-world-map.json','docs/10-development-history/round-02/stage-02-world-map/07-desktop-mobile-world-map.md']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const mobile=fs.readFileSync('src/components/world-map/MobileWorldCompass.tsx','utf8')
if(!mobile.includes('lg:hidden')) errors.push('mobile must be scoped')
if(!mobile.includes('worldMapNodes')) errors.push('mobile must share data')
const desktop=fs.readFileSync('src/components/world-map/DesktopWorldMap.tsx','utf8')
if(!desktop.includes('hidden lg:block')) errors.push('desktop must be scoped')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 07 checks passed.')
