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
  if (command !== 'create') throw new Error('当前仅支持 create；verify-restore 将在固定恢复检查项中启用。')
  const output = typeof args.output === 'string' ? args.output : 'exports/living-world-current'
  const { buildPublicWorldExport } = await import('../src/server/export/build-export.ts')
  const result = buildPublicWorldExport(root, output)
  console.log(JSON.stringify({
    command,
    output: result.output,
    worldCommit: result.manifest.worldCommit,
    createdAt: result.manifest.createdAt,
    rootChecksum: result.manifest.rootChecksum,
    counts: result.manifest.counts,
    checksumEntries: result.checksumEntries,
  }, null, 2))
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}
