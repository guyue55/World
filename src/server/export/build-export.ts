import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'

const TOOL_VERSION = 'worldos-export/1.0.0'
const SCHEMA_VERSION = '1.0.0'

type ExportFile = {
  path: string
  sha256: string
  bytes: number
  kind: 'fact' | 'content' | 'asset' | 'preservation' | 'documentation'
}

export type WorldExportManifest = {
  schemaVersion: string
  worldCommit: string
  createdAt: string
  scope: 'public'
  toolVersion: string
  counts: Record<'nodes' | 'areas' | 'relations' | 'paths' | 'events' | 'assets', number>
  rootChecksum: string
  preservationEventId: string
  files: ExportFile[]
}

function sha256(value: string | Buffer) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

function writeJson(root: string, relativePath: string, value: unknown) {
  const target = path.join(root, relativePath)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`)
}

function assertRelativeFile(root: string, relativePath: string) {
  const normalized = path.normalize(relativePath)
  const target = path.resolve(root, normalized)
  if (path.isAbsolute(relativePath) || normalized.startsWith('..') || !target.startsWith(`${path.resolve(root)}${path.sep}`)) {
    throw new Error(`导出源路径越界：${relativePath}`)
  }
  if (!fs.statSync(target).isFile()) throw new Error(`导出源不是文件：${relativePath}`)
  return target
}

function copyManagedFile(sourceRoot: string, outputRoot: string, sourcePath: string, outputPath = sourcePath) {
  const source = assertRelativeFile(sourceRoot, sourcePath)
  const target = path.join(outputRoot, outputPath)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.copyFileSync(source, target)
}

function listManagedFiles(root: string): string[] {
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

function classify(relativePath: string): ExportFile['kind'] {
  if (relativePath.startsWith('facts/')) return 'fact'
  if (relativePath.startsWith('content/')) return 'content'
  if (relativePath.startsWith('assets/')) return 'asset'
  if (relativePath.startsWith('preservation/')) return 'preservation'
  return 'documentation'
}

function getCommit(root: string) {
  return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim()
}

function safelyReplaceOutput(output: string, temporary: string) {
  if (fs.existsSync(output)) {
    const existingManifest = path.join(output, 'manifest.json')
    if (!fs.existsSync(existingManifest)) throw new Error(`拒绝覆盖非 WorldOS 导出目录：${output}`)
    const parsed = JSON.parse(fs.readFileSync(existingManifest, 'utf8')) as { toolVersion?: string; scope?: string }
    if (!parsed.toolVersion?.startsWith('worldos-export/') || parsed.scope !== 'public') {
      throw new Error(`拒绝覆盖来源不明的导出目录：${output}`)
    }
    fs.rmSync(output, { recursive: true })
  }
  fs.renameSync(temporary, output)
}

export function buildPublicWorldExport(workspaceRoot: string, requestedOutput: string) {
  const root = path.resolve(workspaceRoot)
  const output = path.resolve(root, requestedOutput)
  if (output === root || !output.startsWith(`${root}${path.sep}`)) throw new Error('导出目录必须位于当前工作区内。')

  const temporary = `${output}.tmp-${process.pid}-${Date.now()}`
  fs.rmSync(temporary, { recursive: true, force: true })
  fs.mkdirSync(temporary, { recursive: true })

  try {
    const index = getPublicWorldObjectIndex()
    const publicNodeIds = new Set(index.nodes.map((node) => node.id))
    const publicNodeSlugs = new Set(index.nodes.map((node) => node.slug))
    const areaIds = new Set(index.nodes.map((node) => node.areaId))
    const areas = index.areas.filter((area) => areaIds.has(area.id))
    const paths = index.paths.map((item) => ({
      ...item,
      nodeSlugs: item.nodeSlugs.filter((slug) => publicNodeSlugs.has(slug)),
      nextPathIds: item.nextPathIds?.filter((id) => index.paths.some((candidate) => candidate.id === id)),
    }))
    const events = index.events.map((item) => ({
      ...item,
      nodeIds: item.nodeIds?.filter((id) => publicNodeIds.has(id)),
      areaIds: item.areaIds?.filter((id) => areaIds.has(id)),
    }))
    const relations = index.relations.filter((item) => publicNodeIds.has(item.from) && publicNodeIds.has(item.to))

    writeJson(temporary, 'facts/nodes.json', index.nodes)
    writeJson(temporary, 'facts/areas.json', areas)
    writeJson(temporary, 'facts/relations.json', relations)
    writeJson(temporary, 'facts/paths.json', paths)
    writeJson(temporary, 'facts/events.json', events)
    writeJson(temporary, 'facts/visibility.json', {
      scope: 'public',
      included: ['public', 'semiPublic'],
      excluded: ['private', 'family', 'partner', 'vault', 'sealed', 'silent', 'unlisted'],
      rule: '导出只消费服务端公开投影；前端不参与权限判定。',
    })

    const contentPaths = [...new Set(index.nodes.map((node) => node.contentPath).filter((contentPath): contentPath is string => Boolean(contentPath)))].sort()
    for (const contentPath of contentPaths) copyManagedFile(root, temporary, contentPath)

    const coverConfig = JSON.parse(fs.readFileSync(path.join(root, 'data/core/home-cover-assets.json'), 'utf8')) as { fallback: string }
    const coverPaths = [...new Set(index.nodes.map((node) => node.cover).filter((cover): cover is string => Boolean(cover)))].sort()
    const assets = coverPaths.map((publicPath) => {
      const requestedSourcePath = `public${publicPath}`
      const sourcePath = fs.existsSync(path.join(root, requestedSourcePath)) ? requestedSourcePath : `public${coverConfig.fallback}`
      const exportedPath = `assets/files${publicPath}`
      copyManagedFile(root, temporary, sourcePath, exportedPath)
      const bytes = fs.readFileSync(path.join(temporary, exportedPath))
      return {
        id: path.basename(publicPath, path.extname(publicPath)),
        publicPath,
        exportedPath,
        sourcePath,
        requestedSourcePath,
        resolution: sourcePath === requestedSourcePath ? 'direct' : 'configured-fallback',
        sha256: sha256(bytes),
        bytes: bytes.byteLength,
        rightsRecordId: `rights-${sha256(sourcePath).slice(0, 16)}`,
      }
    })
    writeJson(temporary, 'assets/registry.json', { schemaVersion: SCHEMA_VERSION, assets })

    const createdAt = new Date().toISOString()
    const preservationEventId = `export-${createdAt.replace(/\D/g, '').slice(0, 17)}`
    writeJson(temporary, 'preservation/objects.json', {
      schemaVersion: SCHEMA_VERSION,
      objects: [
        ...contentPaths.map((sourcePath) => ({ id: `content-${sha256(sourcePath).slice(0, 16)}`, kind: 'content', sourcePath })),
        ...assets.map((asset) => ({ id: `asset-${sha256(asset.exportedPath).slice(0, 16)}`, kind: 'asset', sourcePath: asset.sourcePath, exportedPath: asset.exportedPath })),
      ],
    })
    writeJson(temporary, 'preservation/events.json', {
      schemaVersion: SCHEMA_VERSION,
      events: [{ id: preservationEventId, type: 'public-export-created', createdAt, agent: TOOL_VERSION, outcome: 'success' }],
    })
    writeJson(temporary, 'preservation/rights.json', {
      schemaVersion: SCHEMA_VERSION,
      rights: [...new Map(assets.map((asset) => [asset.rightsRecordId, {
        id: asset.rightsRecordId,
        sourcePath: asset.sourcePath,
        status: 'metadata-not-registered',
        statement: '仓库仅登记为本地静态资产；导出不补造许可、作者或来源声明。',
      }])).values()],
    })
    fs.writeFileSync(path.join(temporary, 'README.md'), `# 古月浮屿公开世界导出\n\n这是 WorldOS 的公开、可移植目录包。它包含公开事实、原始内容、本地内容封面、保存记录与逐文件 SHA-256；不包含私密事实、构建缓存、验收报告、访问记忆或作者事务备份。\n\n- 范围：\`public\`（沿用服务端公开投影，包含 \`public\` 与 \`semiPublic\`）\n- 创建时间：${createdAt}\n- 来源提交：\`${getCommit(root)}\`\n- 校验与临时恢复：\`node scripts/world-export.mjs verify-restore --input <export-root> --output <empty-temp-dir>\`\n- 校验清单：\`checksums.sha256\` 覆盖包内全部受管文件，仅排除清单自身以避免自引用。\n\n恢复验证只允许写入显式指定的空目录，不会覆盖真实工作区。资产权利记录只复述仓库已有元数据；缺失处明确标为未登记。\n`)

    const payloadFiles = listManagedFiles(temporary)
    const rootChecksum = sha256(payloadFiles.map((relativePath) => `${sha256(fs.readFileSync(path.join(temporary, relativePath)))}  ${relativePath}`).join('\n'))
    const preliminaryFiles = payloadFiles.map((relativePath) => {
      const bytes = fs.readFileSync(path.join(temporary, relativePath))
      return { path: relativePath, sha256: sha256(bytes), bytes: bytes.byteLength, kind: classify(relativePath) }
    })
    const manifest: WorldExportManifest = {
      schemaVersion: SCHEMA_VERSION,
      worldCommit: getCommit(root),
      createdAt,
      scope: 'public',
      toolVersion: TOOL_VERSION,
      counts: { nodes: index.nodes.length, areas: areas.length, relations: relations.length, paths: paths.length, events: events.length, assets: assets.length },
      rootChecksum,
      preservationEventId,
      files: preliminaryFiles,
    }
    writeJson(temporary, 'manifest.json', manifest)

    const checksumFiles = listManagedFiles(temporary)
    fs.writeFileSync(path.join(temporary, 'checksums.sha256'), `${checksumFiles.map((relativePath) => `${sha256(fs.readFileSync(path.join(temporary, relativePath)))}  ${relativePath}`).join('\n')}\n`)
    safelyReplaceOutput(output, temporary)

    return { output, manifest, checksumEntries: checksumFiles.length }
  } catch (error) {
    fs.rmSync(temporary, { recursive: true, force: true })
    throw error
  }
}
