import fs from 'node:fs'
const errors:string[]=[]
for(const item of ['src/components/theme/ThemeAwareSurface.tsx','src/components/theme/ThemePreviewPanel.tsx','data/round-02/stage-06/22-theme-modes-implementation.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
const surface=fs.readFileSync('src/components/theme/ThemeAwareSurface.tsx','utf8')
if(!surface.includes('getThemeVariant')||!surface.includes('motion')) errors.push('surface must expose variant/motion')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 22 checks passed.')
