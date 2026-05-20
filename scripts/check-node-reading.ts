import fs from 'node:fs'
import path from 'node:path'
import nodes from '../data/nodes.json'
import relations from '../data/relations.json'
import nodeReadingContract from '../data/node-reading-contract.json'
import nodeReadingQualityGate from '../data/node-reading-quality-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  const publicNodes = nodes.filter((node) => node.visibility === 'public' || node.visibility === 'semiPublic')
  const relationNodeIds = new Set(relations.flatMap((relation) => [relation.from, relation.to]))
  const minimums = nodeReadingQualityGate.minimums

  const checks = {
    publicNodes: publicNodes.length,
    nodesWithSummary: publicNodes.filter((node) => Boolean(node.summary)).length,
    nodesWithCover: publicNodes.filter((node) => Boolean(node.cover)).length,
    nodesWithContentPath: publicNodes.filter((node) => Boolean(node.contentPath)).length,
    nodesWithAtLeastTwoTags: publicNodes.filter((node) => node.tags.length >= 2).length,
    nodesWithRelationsOrAreaFallback: publicNodes.filter((node) => relationNodeIds.has(node.id) || publicNodes.some((item) => item.id !== node.id && item.areaId === node.areaId)).length,
  }

  Object.entries(checks).forEach(([key, value]) => {
    const expected = minimums[key as keyof typeof minimums]
    if (value < expected) errors.push(`${key} below minimum: ${value} < ${expected}`)
  })

  const page = read('src/app/node/[slug]/page.tsx')
  nodeReadingQualityGate.requiredPageParts.forEach((part) => {
    if (!page.includes(part)) errors.push(`node page missing part: ${part}`)
  })

  const cover = read('src/components/node/NodeCover.tsx')
  const eslintDisableToken = ['eslint', 'disable'].join('-')
  if (cover.includes(eslintDisableToken)) errors.push('NodeCover must not rely on eslint disable comments')
  if (!cover.includes("next/image")) errors.push('NodeCover should use next/image')

  const relationRail = read('src/components/node/NodeRelationRail.tsx')
  if (!relationRail.includes('sameArea') && !read('src/lib/node-reading.ts').includes('getSameAreaNodes')) {
    errors.push('relation rail must have same-area fallback')
  }

  if (nodeReadingContract.layout.length < 6) errors.push('node reading layout contract too small')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Node reading check passed.')
}

main()
