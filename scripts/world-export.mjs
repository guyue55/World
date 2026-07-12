#!/usr/bin/env node
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const root = path.resolve(import.meta.dirname, '..')

if (process.env.WORLDOS_EXPORT_TSX_BOOTSTRAPPED !== '1') {
  const executable = path.join(root, 'node_modules/.bin/tsx')
  const child = spawnSync(executable, [import.meta.filename, ...process.argv.slice(2)], {
    cwd: root,
    env: { ...process.env, WORLDOS_EXPORT_TSX_BOOTSTRAPPED: '1' },
    stdio: 'inherit',
  })
  process.exit(child.status ?? 1)
}

const [command, ...tokens] = process.argv.slice(2)
const args = Object.fromEntries(tokens.reduce((pairs, token, index, all) => {
  if (!token.startsWith('--')) return pairs
  const value = all[index + 1] && !all[index + 1].startsWith('--') ? all[index + 1] : true
  return [...pairs, [token.slice(2), value]]
}, []))

try {
  if (command === 'create') {
    const output = typeof args.output === 'string' ? args.output : 'exports/living-world-current'
    const { buildPublicWorldExport } = await import('../src/server/export/build-export.ts')
    const result = buildPublicWorldExport(root, output)
    console.log(JSON.stringify({ command, output: result.output, worldCommit: result.manifest.worldCommit, createdAt: result.manifest.createdAt, rootChecksum: result.manifest.rootChecksum, counts: result.manifest.counts, checksumEntries: result.checksumEntries }, null, 2))
  } else if (command === 'verify-restore') {
    if (typeof args.input !== 'string' || typeof args.output !== 'string') throw new Error('verify-restore 需要 --input <export-root> --output <empty-temp-dir>。')
    const { restoreVerifiedWorldExport } = await import('../src/server/export/restore-export.ts')
    console.log(JSON.stringify({ command, ...restoreVerifiedWorldExport(path.resolve(root, args.input), path.resolve(root, args.output)) }, null, 2))
  } else {
    throw new Error('命令只支持 create 或 verify-restore。')
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}
