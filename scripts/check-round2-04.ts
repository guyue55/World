import fs from 'node:fs'
const required = ['data/round-02/stage-01/01-global-visual-language.json','data/round-02/stage-01/02-home-hero-deep-universe.json','data/round-02/stage-01/03-background-light-depth.json','data/round-02/stage-01/04-visual-foundation-qa.json','src/components/visual/WorldGatewayHero.tsx','src/components/visual/AtmosphereShell.tsx','src/components/visual/SpatialCard.tsx']
const errors: string[] = []
for (const item of required) if (!fs.existsSync(item)) errors.push(`missing ${item}`)
const qa = JSON.parse(fs.readFileSync('data/round-02/stage-01/04-visual-foundation-qa.json','utf8'))
if (!qa.conceptExpansionDecision?.needExpansion) errors.push('stage expansion decision missing')
if (errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 04 checks passed.')
