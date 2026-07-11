// 用途：运行可被 next start 验证的生产构建
import { spawn } from 'node:child_process'
import { execFileSync } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const distDirName = process.env.WORLDOS_DIST_DIR ?? '.next'
if (!/^\.next(?:-[a-z0-9-]+)?$/i.test(distDirName)) {
  console.error('WORLDOS_DIST_DIR 只允许仓库内 .next 或 .next-* 隔离目录')
  process.exit(1)
}
const nextDir = path.join(root, distDirName)
const nextBin = path.join(root, 'node_modules', '.bin', 'next')
const buildStartedAt = new Date().toISOString()

if (!fs.existsSync(nextBin)) {
  console.error('缺少 node_modules/.bin/next，请先执行 npm ci')
  process.exit(1)
}

if (fs.existsSync(nextDir)) fs.rmSync(nextDir, { recursive: true, force: true })

const child = spawn(nextBin, ['build'], {
  cwd: root,
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
  stdio: 'inherit',
})

function collectBuildFiles(directory) {
  const files = []
  const visit = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolutePath = path.join(current, entry.name)
      if (entry.isDirectory()) visit(absolutePath)
      else files.push(absolutePath)
    }
  }
  visit(directory)
  return files
}

function writeBuildIdentity() {
  const excludedFiles = new Set([`${distDirName}/trace`, `${distDirName}/worldos-build-identity.json`])
  const excludedPrefixes = [`${distDirName}/cache/`, `${distDirName}/diagnostics/`]
  const files = collectBuildFiles(nextDir)
    .map((absolutePath) => path.relative(root, absolutePath).split(path.sep).join('/'))
    .filter((relativePath) => !excludedFiles.has(relativePath) && !excludedPrefixes.some((prefix) => relativePath.startsWith(prefix)))
    .map((relativePath) => ({
      path: relativePath,
      sha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(root, relativePath))).digest('hex'),
    }))
    .sort((left, right) => left.path.localeCompare(right.path))
  const sourceCommit = process.env.WORLDOS_SOURCE_COMMIT || execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim()
  const sourceDirty = execFileSync('git', ['status', '--porcelain', '--', 'src', 'data', 'content', 'scripts', 'public/world', 'package.json', 'package-lock.json', 'next.config.ts'], { cwd: root, encoding: 'utf8' }).trim() !== ''
  const identity = {
    schemaVersion: '1.0.0',
    buildId: fs.readFileSync(path.join(nextDir, 'BUILD_ID'), 'utf8').trim(),
    sourceCommit,
    sourceDirty,
    distDir: distDirName,
    buildStartedAt,
    generatedAt: new Date().toISOString(),
    fileCount: files.length,
    buildRootHash: crypto.createHash('sha256').update(JSON.stringify(files)).digest('hex'),
  }
  fs.writeFileSync(path.join(nextDir, 'worldos-build-identity.json'), `${JSON.stringify(identity, null, 2)}\n`)
  console.log(`WorldOS build identity: buildId=${identity.buildId} files=${identity.fileCount} root=${identity.buildRootHash}`)
}

child.on('exit', (code, signal) => {
  if (code === 0) {
    // 生产本地 RC 只需要可被 next start 读取的产物；构建缓存会随机器波动，不进入门禁预算。
    fs.rmSync(path.join(nextDir, 'cache'), { recursive: true, force: true })
    fs.rmSync(path.join(nextDir, 'diagnostics'), { recursive: true, force: true })
    writeBuildIdentity()
  }
  process.exit(code ?? (signal ? 1 : 0))
})
