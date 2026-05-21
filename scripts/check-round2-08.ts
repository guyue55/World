import fs from 'node:fs'
import { getWorldMapA11ySummary, worldMapAccessibility } from '../src/features/world-map-experience/accessibility'
const errors:string[]=[]
for(const item of ['src/features/world-map-experience/accessibility.ts','data/round-02/stage-02/08-navigation-a11y-fallback.json','docs/10-development-history/round-02/stage-02-world-map/08-navigation-a11y-fallback.md']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const s=getWorldMapA11ySummary()
if(s.nodeCount<8 || !s.keyboardReachable || !s.mobileFallback || s.legacyRouteCount<5) errors.push('invalid a11y summary')
if(worldMapAccessibility.legacyRoutes.length<5) errors.push('legacy routes missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 08 checks passed.')
