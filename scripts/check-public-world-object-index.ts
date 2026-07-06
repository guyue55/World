import { getPublicWorldObjectConsistencyIssues, getPublicWorldObjectIndex } from '../src/lib/public-world-objects'

const index = getPublicWorldObjectIndex()
const failures = getPublicWorldObjectConsistencyIssues(index)

if (index.areas.length < 1) failures.push('公开世界对象索引缺少公开区域')
if (index.nodes.length < 1) failures.push('公开世界对象索引缺少公开节点')
if (index.paths.length < 1) failures.push('公开世界对象索引缺少公开路径')
if (index.nodeRefs.length !== index.nodes.length) failures.push(`公开节点引用数量不一致：${index.nodeRefs.length}/${index.nodes.length}`)
if (index.pathRefs.length !== index.paths.length) failures.push(`公开路径引用数量不一致：${index.pathRefs.length}/${index.paths.length}`)

const pathNodeRefCount = index.pathRefs.reduce((sum, pathRef) => sum + pathRef.nodeRefs.length, 0)
if (pathNodeRefCount < index.paths.length) failures.push('公开路径缺少可进入的公开节点引用')

if (failures.length > 0) {
  console.error('Public world object index check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(
  `Public world object index check passed: ${index.areas.length} areas, ${index.nodes.length} nodes, ${index.paths.length} paths, ${index.events.length} events`,
)
