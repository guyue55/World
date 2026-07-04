import fs from 'node:fs'
const required = ['src/features/visual-foundation/tokens.ts','src/features/visual-foundation/model.ts','src/components/visual/CosmicBackdrop.tsx','src/components/visual/FloatingLayer.tsx','src/components/visual/WorldSectionHeader.tsx','data/round-02/stage-01/01-global-visual-language.json','docs/10-development-history/round-02/stage-01-visual-foundation/01-global-visual-language.md']
const errors: string[] = []
for (const item of required) if (!fs.existsSync(item)) errors.push(`missing ${item}`)
const tokens = fs.readFileSync('src/features/visual-foundation/tokens.ts','utf8')
for (const word of ['nature','cosmos','library','atelier','震撼']) if (!tokens.includes(word)) errors.push(`missing ${word}`)
if (errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 01 checks passed.')
