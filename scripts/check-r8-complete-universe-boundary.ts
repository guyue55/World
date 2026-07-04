import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const forbidden = ['three', '@react-three', 'webgl', 'navigator.gpu', 'window.fetch(', 'openai', 'anthropic', 'audio.play(', 'getusermedia']
const files = [
  'src/components/r8-complete-universe/CompleteUniverseEngine.tsx',
  'src/components/r8-complete-universe/UniverseObjectConstellation.tsx',
  'src/components/r8-complete-universe/TodayWorldPanel.tsx',
  'src/components/r8-complete-universe/CompleteUniverseSection.tsx',
  'src/app/api/r8/complete-universe/route.ts',
]

for (const file of files) {
  const content = fs.readFileSync(path.join(root, file), 'utf8').toLowerCase()
  for (const token of forbidden) {
    if (content.includes(token)) throw new Error(`R8.5 boundary violation in ${file}: ${token}`)
  }
}

for (const file of files.filter((item) => item.endsWith('.tsx'))) {
  const content = fs.readFileSync(path.join(root, file), 'utf8')
  if (!content.includes('reducedMotion') && !file.includes('TodayWorldPanel')) {
    throw new Error(`R8.5 component lacks reduced-motion handling: ${file}`)
  }
}

const data = fs.readFileSync(path.join(root, 'data/r8-complete-universe/complete-scenes.json'), 'utf8').toLowerCase()
for (const privateWord of ['password', 'secret', 'token', '真实地址', '手机号']) {
  if (data.includes(privateWord)) throw new Error(`R8.5 scene data contains sensitive boundary word: ${privateWord}`)
}

console.log('R8.5 complete universe boundary check passed.')
