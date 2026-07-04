import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf-8')) as T
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

type NodeRecord = {
  id: string
  slug: string
  title: string
  areaId: string
  visibility: string
  summary?: string
  contentPath?: string
}

type AreaRecord = { id: string }
type RelationRecord = { from: string; to: string }
type PathRecord = { id: string; nodeSlugs: string[]; visibility: string }
type EventRecord = { id: string; nodeIds?: string[]; areaIds?: string[] }

function main() {
  const nodes = readJson<NodeRecord[]>('data/domains/experience/nodes.json')
  const areas = readJson<AreaRecord[]>('data/domains/experience/areas.json')
  const relations = readJson<RelationRecord[]>('data/core/relations.json')
  const paths = readJson<PathRecord[]>('data/domains/experience/paths.json')
  const events = readJson<EventRecord[]>('data/core/world-events.json')

  const nodeIds = new Set(nodes.map((node) => node.id))
  const nodeSlugs = new Set(nodes.map((node) => node.slug))
  const areaIds = new Set(areas.map((area) => area.id))

  nodes.forEach((node) => {
    assert(areaIds.has(node.areaId), `Node ${node.id} references missing area ${node.areaId}`)
    if (node.visibility === 'public') {
      assert(node.summary, `Public node ${node.id} must have summary`)
    }
    if (node.contentPath) {
      const fullPath = path.join(root, node.contentPath)
      assert(fs.existsSync(fullPath), `Node ${node.id} contentPath does not exist: ${node.contentPath}`)
    }
  })

  relations.forEach((relation) => {
    assert(nodeIds.has(relation.from), `Relation references missing from node ${relation.from}`)
    assert(nodeIds.has(relation.to), `Relation references missing to node ${relation.to}`)
  })

  paths.forEach((item) => {
    item.nodeSlugs.forEach((slug) => {
      assert(nodeSlugs.has(slug), `Path ${item.id} references missing slug ${slug}`)
    })
  })

  events.forEach((event) => {
    event.nodeIds?.forEach((id) => assert(nodeIds.has(id), `WorldEvent ${event.id} references missing node ${id}`))
    event.areaIds?.forEach((id) => assert(areaIds.has(id), `WorldEvent ${event.id} references missing area ${id}`))
  })

  console.log('Project integrity check passed.')
}

main()
