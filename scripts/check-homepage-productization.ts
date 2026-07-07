// 用途：检查首页产品化
import fs from 'node:fs'
import path from 'node:path'
import homepageComposition from '../data/domains/experience/homepage-composition.json'
import homeCoverAssets from '../data/core/home-cover-assets.json'
import nodes from '../data/domains/experience/nodes.json'

function main() {
  const errors: string[] = []

  const page = fs.readFileSync(path.join(process.cwd(), 'src/components/product/ProductHome.tsx'), 'utf-8')
  const publicSurface = fs.readFileSync(path.join(process.cwd(), 'src/lib/public-world-surfaces.ts'), 'utf-8')
  ;['ProductWorldCompass', 'ProductWorldBoundaries', 'dynamicWorld.entryPoints'].forEach((component) => {
    if (!page.includes(component)) errors.push(`homepage missing component: ${component}`)
  })

  ;['新手入口', '先选一个入口', '我第一次来'].forEach((token) => {
    if (!`${page}\n${publicSurface}`.includes(token)) errors.push(`homepage missing low-threshold entry copy: ${token}`)
  })

  const sectionIds = new Set(homepageComposition.sections.map((section) => section.id))
  ;['hero', 'prelude', 'gateway', 'atlas', 'time-river', 'representative', 'paths', 'node-opening', 'lighthouse', 'recommendations', 'dynamic-acceptance', 'deep-gates'].forEach((id) => {
    if (!sectionIds.has(id)) errors.push(`homepage composition missing section: ${id}`)
  })

  homeCoverAssets.covers.forEach((cover) => {
    const localPath = cover.path.replace(/^\//, 'public/')
    if (!fs.existsSync(path.join(process.cwd(), localPath))) {
      errors.push(`missing cover asset: ${cover.path}`)
    }
  })

  const featured = nodes.filter((node) => node.visibility === 'public' && (node.featured?.home || node.featured?.representative))
  const withoutCover = featured.filter((node) => !node.cover)
  if (featured.length < 4) errors.push('homepage featured nodes are too few')
  if (withoutCover.length > 0) errors.push(`featured nodes missing cover: ${withoutCover.map((node) => node.id).join(', ')}`)

  if (page.includes('WorldFoundationStack')) {
    errors.push('homepage must not import WorldFoundationStack on first screen')
  }

  ;['R4CreatorWorkbench', 'R6ServiceBridge', 'R7WorldEvolution', 'R8PublicOperations'].forEach((component) => {
    if (page.includes(component)) errors.push(`homepage must not render deep governance panel directly: ${component}`)
  })

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Homepage productization check passed.')
}

main()
