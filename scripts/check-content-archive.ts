import fs from 'node:fs'
import path from 'node:path'
import nodes from '../data/domains/experience/nodes.json'
import areas from '../data/domains/experience/areas.json'
import paths from '../data/domains/experience/paths.json'
import archiveProductizationContract from '../data/domains/archive/archive-productization-contract.json'
import contentInventoryRules from '../data/domains/content/content-inventory-rules.json'

function main() {
  const errors: string[] = []

  const publicNodes = nodes.filter((node) => node.visibility === 'public' || node.visibility === 'semiPublic')
  const featuredNodes = publicNodes.filter((node) => node.featured?.home || node.featured?.representative)
  const nodesWithSummary = publicNodes.filter((node) => Boolean(node.summary))
  const nodesWithContentPath = publicNodes.filter((node) => Boolean(node.contentPath))
  const nodesWithCover = publicNodes.filter((node) => Boolean(node.cover))
  const publicAreas = areas.filter((area) => area.defaultVisibility === 'public')
  const publicPaths = paths.filter((item) => item.visibility === 'public')

  const minimums = contentInventoryRules.minimums
  if (publicNodes.length < minimums.publicNodes) errors.push(`public nodes below minimum: ${publicNodes.length}`)
  if (featuredNodes.length < minimums.featuredNodes) errors.push(`featured nodes below minimum: ${featuredNodes.length}`)
  if (nodesWithSummary.length < minimums.nodesWithSummary) errors.push(`nodes with summary below minimum: ${nodesWithSummary.length}`)
  if (nodesWithContentPath.length < minimums.nodesWithContentPath) errors.push(`nodes with contentPath below minimum: ${nodesWithContentPath.length}`)
  if (nodesWithCover.length < minimums.nodesWithCover) errors.push(`nodes with cover below minimum: ${nodesWithCover.length}`)
  if (publicAreas.length < minimums.publicAreas) errors.push(`public areas below minimum: ${publicAreas.length}`)
  if (publicPaths.length < minimums.publicPaths) errors.push(`public paths below minimum: ${publicPaths.length}`)

  ;['query', 'area', 'type', 'lifeStage', 'tag', 'sort'].forEach((id) => {
    if (!archiveProductizationContract.controls.some((control) => control.id === id)) {
      errors.push(`archive contract missing control: ${id}`)
    }
  })

  const archiveView = fs.readFileSync(path.join(process.cwd(), 'src/components/archive/ArchiveView.tsx'), 'utf-8')
  ;['ArchiveStats', 'ArchiveFilters', 'ArchiveEmptyState', 'filterArchiveNodes', 'formatArchiveSort'].forEach((token) => {
    if (!archiveView.includes(token)) errors.push(`archive view missing ${token}`)
  })

  const archiveLib = fs.readFileSync(path.join(process.cwd(), 'src/lib/archive.ts'), 'utf-8')
  ;['formatArchiveNodeType', 'formatArchiveLifeStage', 'formatArchiveSort'].forEach((token) => {
    if (!archiveLib.includes(token)) errors.push(`archive lib missing Chinese label helper: ${token}`)
  })

  const archiveFilters = fs.readFileSync(path.join(process.cwd(), 'src/components/archive/ArchiveFilters.tsx'), 'utf-8')
  ;['formatArchiveNodeType', 'formatArchiveLifeStage'].forEach((token) => {
    if (!archiveFilters.includes(token)) errors.push(`archive filters missing Chinese label helper: ${token}`)
  })

  const emptyState = fs.readFileSync(path.join(process.cwd(), 'src/components/archive/ArchiveEmptyState.tsx'), 'utf-8')
  if (!emptyState.includes('areaName')) errors.push('archive empty state must render readable area names')

  const nodeCard = fs.readFileSync(path.join(process.cwd(), 'src/components/node/NodeCard.tsx'), 'utf-8')
  if (!nodeCard.includes('resolveNodeCover')) errors.push('NodeCard must use resolveNodeCover')
  if (!nodeCard.includes('<img')) errors.push('NodeCard must render cover image')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Content archive check passed.')
}

main()
