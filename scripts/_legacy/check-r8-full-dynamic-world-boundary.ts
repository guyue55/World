import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dynamicDir = path.join(root, 'src/components/r8-full-dynamic-world')
const files = fs.readdirSync(dynamicDir).filter((file) => file.endsWith('.tsx'))

for (const file of files) {
  const source = fs.readFileSync(path.join(dynamicDir, file), 'utf8')
  if (!source.includes("'use client'")) throw new Error(`${file} must be a client component because it owns interaction/motion`)
  if (source.includes('process.env') || source.includes('fs.') || source.includes('node:')) {
    throw new Error(`${file} must not depend on server-only runtime`)
  }
  if (!source.includes('reducedMotion') && file !== 'WorldModeSwitcher.tsx') {
    throw new Error(`${file} must include reduced-motion handling`)
  }
}

const api = fs.readFileSync(path.join(root, 'src/app/api/r8/dynamic-world/route.ts'), 'utf8')
if (!api.includes('requiresDatabase: false') || !api.includes('requiresRealAI: false')) {
  throw new Error('R8.3 dynamic API must explicitly remain static-runtime safe')
}

console.log('R8.3 full dynamic world boundary check passed')
