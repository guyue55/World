import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const componentDir = path.join(root, 'src/components/r8-dynamic-world')
const files = fs.readdirSync(componentDir).filter((file) => file.endsWith('.tsx'))
const contents = files.map((file) => [file, fs.readFileSync(path.join(componentDir, file), 'utf8')] as const)

const clientFiles = contents.filter(([, content]) => content.includes('useWorldRuntime') || content.includes('useState') || content.includes('useEffect'))
const missingClientDirective = clientFiles.filter(([, content]) => !content.startsWith("'use client'"))
if (missingClientDirective.length > 0) {
  console.error(`Interactive R8.1 components missing use client: ${missingClientDirective.map(([file]) => file).join(', ')}`)
  process.exit(1)
}

const reducedMotionConsumers = contents.filter(([, content]) => content.includes('reducedMotion'))
if (reducedMotionConsumers.length < 4) {
  console.error('R8.1 dynamic components must include reducedMotion handling across key surfaces.')
  process.exit(1)
}

const allText = contents.map(([, content]) => content).join('\n')
const forbidden = ['dangerouslySetInnerHTML', 'window.localStorage.setItem(lastJourneyKey, raw', 'eval(']
const detected = forbidden.filter((marker) => allText.includes(marker))
if (detected.length > 0) {
  console.error(`R8.1 dynamic boundary detected forbidden markers: ${detected.join(', ')}`)
  process.exit(1)
}

const outputFiles = fs.readdirSync('/mnt/data').filter((file) => file.includes('R8.1') || file.includes('dynamic'))
const nonAsciiOutputs = outputFiles.filter((file) => Array.from(file).some((char) => char.charCodeAt(0) > 127))
if (nonAsciiOutputs.length > 0) {
  console.error(`R8.1 output filenames must remain ASCII-safe: ${nonAsciiOutputs.join(', ')}`)
  process.exit(1)
}

console.log('R8.1 dynamic world boundary check passed.')
