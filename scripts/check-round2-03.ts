import fs from 'node:fs'
const required = ['src/features/visual-foundation/backgrounds.ts','src/components/visual/AtmosphereShell.tsx','src/components/visual/LightRayField.tsx','src/components/visual/SpatialCard.tsx','data/round-02/stage-01/03-background-light-depth.json','docs/10-development-history/round-02/stage-01-visual-foundation/03-background-light-depth.md']
const errors: string[] = []
for (const item of required) if (!fs.existsSync(item)) errors.push(`missing ${item}`)
const data = JSON.parse(fs.readFileSync('data/round-02/stage-01/03-background-light-depth.json','utf8'))
if (!data.dependencyPolicy.includes('不引入 WebGL')) errors.push('must avoid hard WebGL dependency')
if (errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 03 checks passed.')
