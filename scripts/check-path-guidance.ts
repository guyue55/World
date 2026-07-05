import fs from 'node:fs'
import path from 'node:path'
import paths from '../data/domains/experience/paths.json'
import nodes from '../data/domains/experience/nodes.json'
import pathProductizationContract from '../data/domains/experience/path-productization-contract.json'
import pathQualityGate from '../data/domains/experience/path-quality-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const publicPaths = paths.filter((item) => item.visibility === 'public')
  const publicNodeSlugs = new Set(nodes.filter((node) => node.visibility === 'public' || node.visibility === 'semiPublic').map((node) => node.slug))
  const audiences = new Set(publicPaths.map((item) => item.audience))
  const minimums = pathQualityGate.minimums

  const checks = {
    publicPaths: publicPaths.length,
    audienceKinds: audiences.size,
    pathsWithAtLeastFourNodes: publicPaths.filter((item) => item.nodeSlugs.length >= 4).length,
    pathsWithEstimatedMinutes: publicPaths.filter((item) => Boolean(item.estimatedMinutes)).length,
    pathsWithNextOrExit: publicPaths.filter((item) => (item.nextPathIds?.length ?? 0) > 0 || item.id === 'how-world-created').length,
  }

  Object.entries(checks).forEach(([key, value]) => {
    const expected = minimums[key as keyof typeof minimums]
    if (value < expected) errors.push(`${key} below minimum: ${value} < ${expected}`)
  })

  publicPaths.forEach((item) => {
    item.nodeSlugs.forEach((slug) => {
      if (!publicNodeSlugs.has(slug)) errors.push(`path ${item.id} references non-public or missing node: ${slug}`)
    })
  })

  pathQualityGate.requiredComponents.forEach((component) => {
    const possibleFiles = [
      `src/components/paths/${component}.tsx`,
      component === 'PathTabs' ? 'src/components/paths/PathTabs.tsx' : '',
      component === 'PathCard' ? 'src/components/paths/PathCard.tsx' : '',
    ].filter(Boolean)

    if (!possibleFiles.some((file) => fs.existsSync(path.join(process.cwd(), file)))) {
      errors.push(`missing path component: ${component}`)
    }
  })

  const page = read('src/app/paths/[id]/page.tsx')
  ;['Promise<PathPageParams>', 'PathDetailHero', 'PathNodeSequence', 'PathNextSteps', 'buildPathJourneySurface'].forEach((token) => {
    if (!page.includes(token)) errors.push(`path detail page missing ${token}`)
  })

  const publicSurface = read('src/lib/public-world-surfaces.ts')
  ;['formatPathAudience', 'exitActions', 'nodeCount: pathNodes.length'].forEach((token) => {
    if (!publicSurface.includes(token)) errors.push(`path public surface missing navigation contract: ${token}`)
  })

  const directory = read('src/components/paths/PathsDynamicDirectory.tsx')
  ;['item.label', 'path.audienceLabel'].forEach((token) => {
    if (!directory.includes(token)) errors.push(`paths directory missing Chinese audience surface: ${token}`)
  })

  if (pathProductizationContract.pageParts.length < 6) errors.push('path productization contract too small')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Path guidance check passed.')
}

main()
