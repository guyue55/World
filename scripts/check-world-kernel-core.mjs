import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const json = (file) => JSON.parse(read(file))
const failures = []

const consolidationPath = 'data/world-kernel/world-kernel-consolidation-v1.json'
if (!fs.existsSync(rel(consolidationPath))) failures.push(`缺少内核收束注册表：${consolidationPath}`)

if (!failures.length) {
  const registry = json(consolidationPath)
  const requiredSources = ['areas', 'nodes', 'relations', 'paths', 'worldEvents', 'worldState', 'permissions']

  for (const key of requiredSources) {
    const source = registry.canonicalSources?.[key]
    if (!source) failures.push(`缺少 ${key} 的唯一事实源登记`)
    else if (!fs.existsSync(rel(source))) failures.push(`${key} 登记的事实源不存在：${source}`)
  }

  const sourceChecks = {
    areas: 'src/lib/areas.ts',
    nodes: 'src/lib/nodes.ts',
    relations: 'src/lib/relations.ts',
    paths: 'src/lib/paths.ts',
    worldEvents: 'src/lib/world-events.ts',
  }

  for (const [key, file] of Object.entries(sourceChecks)) {
    const source = registry.canonicalSources?.[key]
    const content = read(file)
    if (source && !content.includes(source.replace('data/', '../../data/'))) {
      failures.push(`${file} 未直接读取登记的 ${key} 事实源：${source}`)
    }
  }

  const worldCore = read('src/lib/world-core.ts')
  if (!worldCore.includes('getWorldCoreSources')) failures.push('world-core 必须导出 getWorldCoreSources')
  if (!worldCore.includes('getWorldCoreConsolidationStatus')) failures.push('world-core 必须导出 getWorldCoreConsolidationStatus')

  const registryTs = read('src/lib/world-kernel-registry.ts')
  if (!registryTs.includes('WORLD_KERNEL_CANONICAL_SOURCES')) failures.push('缺少 WORLD_KERNEL_CANONICAL_SOURCES 导出')
  if (!registryTs.includes('getWorldKernelCanonicalSource')) failures.push('缺少 getWorldKernelCanonicalSource')

  const nodes = json(registry.canonicalSources.nodes)
  const areas = json(registry.canonicalSources.areas)
  const relations = json(registry.canonicalSources.relations)
  const paths = json(registry.canonicalSources.paths)
  const worldState = json(registry.canonicalSources.worldState)
  const ids = new Set(nodes.map((node) => node.id))
  const areaIds = new Set(areas.map((area) => area.id))

  for (const node of nodes) {
    if (!node.id || !node.slug || !node.title) failures.push(`节点缺少基础标识：${JSON.stringify(node)}`)
    if (!areaIds.has(node.areaId)) failures.push(`节点 ${node.id} 引用不存在的 areaId：${node.areaId}`)
    if (['private', 'family', 'partner', 'vault', 'sealed', 'silent'].includes(node.visibility) && node.featured?.home) {
      failures.push(`非公开节点不能进入首页精选：${node.id}`)
    }
  }

  for (const relation of relations) {
    if (!ids.has(relation.from)) failures.push(`关系 ${relation.id} from 不存在：${relation.from}`)
    if (!ids.has(relation.to)) failures.push(`关系 ${relation.id} to 不存在：${relation.to}`)
  }

  for (const item of paths) {
    for (const nodeId of item.nodeIds ?? []) {
      if (!ids.has(nodeId)) failures.push(`路径 ${item.id} 引用不存在节点：${nodeId}`)
    }
  }

  if (!worldState.mode || !worldState.aiStatus) failures.push('worldState 必须包含 mode 与 aiStatus')
  if (registry.progress?.K1_coreModelSource !== 'completed') failures.push('K1_coreModelSource 必须标记 completed')
}

if (failures.length) {
  console.error('World Kernel core check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('World Kernel core check passed')
