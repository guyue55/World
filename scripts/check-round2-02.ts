import fs from 'node:fs'
const required = ['src/components/visual/WorldGatewayHero.tsx','src/components/visual/CelestialDepthScene.tsx','src/app/page.tsx','data/round-02/stage-01/02-home-hero-deep-universe.json','docs/10-development-history/round-02/stage-01-visual-foundation/02-home-hero-deep-universe.md']
const errors: string[] = []
for (const item of required) if (!fs.existsSync(item)) errors.push(`missing ${item}`)
const page = fs.readFileSync('src/app/page.tsx','utf8')
if (!page.includes('WorldGatewayHero')) errors.push('home page must use WorldGatewayHero')
if (page.includes('Date.now(') || page.includes('Math.random(')) errors.push('home page has unstable render values')
if (errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 02 checks passed.')
