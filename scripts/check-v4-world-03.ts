import fs from 'node:fs'
const errors:string[]=[]
const home=fs.readFileSync('src/app/page.tsx','utf8')
if(!home.includes('WorldPortalHero') || !home.includes('AtlasWorldMap')) errors.push('home must be world portal')
if(!fs.existsSync('data/v4-worldification/stage-01/03-navigation-to-map.json')) errors.push('batch 03 data missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V4 world batch 03 checks passed.')
