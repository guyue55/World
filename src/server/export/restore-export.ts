import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { verifyPublicWorldExport } from './verify-export'

function sha256(bytes: Buffer) {
  return crypto.createHash('sha256').update(bytes).digest('hex')
}

function copyFile(source: string, target: string) {
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.copyFileSync(source, target)
}

function writeJson(target: string, value: unknown) {
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`)
}

function listFiles(root: string): string[] {
  const files: string[] = []
  function visit(directory: string) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const absolute = path.join(directory, entry.name)
      if (entry.isDirectory()) visit(absolute)
      else if (entry.isFile()) files.push(path.relative(root, absolute).split(path.sep).join('/'))
    }
  }
  visit(root)
  return files
}

export function restoreVerifiedWorldExport(inputRoot: string, outputRoot: string) {
  const verified = verifyPublicWorldExport(inputRoot)
  const output = path.resolve(outputRoot)
  if (!fs.existsSync(output) || !fs.statSync(output).isDirectory()) throw new Error('恢复输出必须是已存在的空目录。')
  if (fs.lstatSync(output).isSymbolicLink()) throw new Error('恢复输出不得是符号链接。')
  if (fs.readdirSync(output).length > 0) throw new Error('恢复输出目录非空，拒绝覆盖。')
  const realOutput = fs.realpathSync(output)
  if (realOutput === verified.root || realOutput.startsWith(`${verified.root}${path.sep}`) || verified.root.startsWith(`${realOutput}${path.sep}`)) throw new Error('恢复输出不得与导出输入互相包含。')

  const facts = [
    ['facts/nodes.json', 'data/domains/experience/nodes.json'],
    ['facts/areas.json', 'data/domains/experience/areas.json'],
    ['facts/paths.json', 'data/domains/experience/paths.json'],
    ['facts/relations.json', 'data/core/relations.json'],
    ['facts/events.json', 'data/core/world-events.json'],
    ['facts/visibility.json', 'data/core/public-export-visibility.json'],
  ]
  for (const [source, target] of facts) copyFile(path.join(verified.root, source), path.join(realOutput, target))
  for (const file of verified.manifest.files.filter((item) => item.kind === 'content')) copyFile(path.join(verified.root, file.path), path.join(realOutput, file.path))
  for (const asset of verified.assets) copyFile(path.join(verified.root, asset.exportedPath), path.join(realOutput, `public${asset.publicPath}`))
  copyFile(path.join(verified.root, 'manifest.json'), path.join(realOutput, 'preservation/source-export-manifest.json'))
  copyFile(path.join(verified.root, 'checksums.sha256'), path.join(realOutput, 'preservation/source-export-checksums.sha256'))

  const publicIndex = {
    schemaVersion: verified.manifest.schemaVersion,
    scope: 'public',
    sourceWorldCommit: verified.manifest.worldCommit,
    sourceRootChecksum: verified.manifest.rootChecksum,
    nodes: verified.nodes.map((node) => ({ id: node.id, slug: node.slug, title: node.title, summary: node.summary ?? '', areaId: node.areaId, contentPath: node.contentPath, cover: node.cover ?? null })),
    areas: verified.areas,
    paths: verified.paths,
    events: verified.events,
    relations: verified.relations,
  }
  writeJson(path.join(realOutput, 'public/world-index.json'), publicIndex)
  fs.writeFileSync(path.join(realOutput, 'README.md'), `# 已恢复的古月浮屿公开世界\n\n来源提交：\`${verified.manifest.worldCommit}\`\n\n该目录由公开导出包在空目录中重建，包含标准事实路径、原始正文、公开封面和 \`public/world-index.json\`。它不包含私密数据，也不会覆盖原工作区。\n`)

  const restoredFiles = listFiles(realOutput)
  const restoredChecksums = restoredFiles.map((relativePath) => {
    const bytes = fs.readFileSync(path.join(realOutput, relativePath))
    return { path: relativePath, sha256: sha256(bytes), bytes: bytes.byteLength }
  })
  writeJson(path.join(realOutput, 'restore-manifest.json'), {
    schemaVersion: '1.0.0',
    restoredAt: new Date().toISOString(),
    sourceRootChecksum: verified.manifest.rootChecksum,
    sourceWorldCommit: verified.manifest.worldCommit,
    scope: 'public',
    counts: verified.manifest.counts,
    files: restoredChecksums,
  })

  const rebuiltIndex = JSON.parse(fs.readFileSync(path.join(realOutput, 'public/world-index.json'), 'utf8')) as typeof publicIndex
  if (rebuiltIndex.nodes.length !== verified.nodes.length || rebuiltIndex.nodes.some((node) => !fs.existsSync(path.join(realOutput, node.contentPath)))) throw new Error('最小恢复索引无法回到全部公开正文。')
  if (rebuiltIndex.nodes.some((node) => node.cover && !fs.existsSync(path.join(realOutput, `public${node.cover}`)))) throw new Error('最小恢复索引存在缺失封面。')

  return { input: verified.root, output: realOutput, sourceRootChecksum: verified.manifest.rootChecksum, counts: verified.manifest.counts, checksumEntries: verified.checksumEntries, restoredFiles: listFiles(realOutput).length }
}
