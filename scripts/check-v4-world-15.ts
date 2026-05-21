import fs from 'node:fs'
const errors:string[]=[]
const requiredComponents = ['WorldPortalHero','AtlasWorldMap','ContentNodeField','JourneyPathwayRail','MemoryRiverWorld','ExhibitionGardenWorld','LighthouseObservatory','WorldStateOrbit','V5ContentHandoffPanel','MobileWorldDock']
const page=fs.readFileSync('src/app/world/page.tsx','utf8')
for(const component of requiredComponents) if(!page.includes(component)) errors.push(`world page missing ${component}`)
if(!fs.existsSync('data/v4-worldification/stage-04/15-v4-world-audit.json')) errors.push('batch 15 data missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V4 world batch 15 checks passed.')
