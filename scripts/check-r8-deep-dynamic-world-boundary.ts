import fs from 'node:fs'
import path from 'node:path'

const componentsDir = path.join(process.cwd(), 'src/components/r8-deep-dynamic-world')
const files = fs.readdirSync(componentsDir).filter((file) => file.endsWith('.tsx'))
const offenders: string[] = []
for (const file of files) {
  const source = fs.readFileSync(path.join(componentsDir, file), 'utf8')
  if (!source.includes("'use client'")) offenders.push(`${file}: missing use client`)
  if (source.includes('fetch(') || source.includes('XMLHttpRequest')) offenders.push(`${file}: should not depend on network fetch`)
  if (source.includes('setInterval(') && !source.includes('clearInterval')) offenders.push(`${file}: interval without cleanup`)
  if (source.includes('localStorage') && !source.includes('try')) offenders.push(`${file}: localStorage without try/catch boundary`)
}
if (offenders.length > 0) {
  console.error(offenders.join('\n'))
  process.exit(1)
}
console.log('R8.2 deep dynamic world boundary check passed.')
