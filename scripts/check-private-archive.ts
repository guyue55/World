import fs from 'node:fs'
import path from 'node:path'
import privateArchiveIndex from '../data/private-archive-index.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (privateArchiveIndex.items.length < 6) errors.push('private archive placeholders too few')
  for (const item of privateArchiveIndex.items) {
    if (item.contentStored !== false) errors.push(`private placeholder stores content: ${item.id}`)
    if (item.publicBuild !== 'excluded') errors.push(`private placeholder not excluded: ${item.id}`)
  }

  ;[
    'src/app/private-archive/page.tsx',
    'src/lib/private-archive.ts',
    'src/components/private-archive/PrivateArchiveHero.tsx',
    'src/components/private-archive/PrivateArchiveBoundaryPanel.tsx',
    'src/components/private-archive/PrivateArchivePlaceholderGrid.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing private archive file: ${file}`)
  })

  const page = read('src/app/private-archive/page.tsx')
  if (!page.includes('PrivateArchiveHero')) errors.push('private archive page missing hero')

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:private-archive']) errors.push('package missing check:private-archive')
  if (!pkg.scripts['private-archive:print']) errors.push('package missing private-archive:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Private archive check passed.')
}

main()
