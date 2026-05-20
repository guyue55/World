import fs from 'node:fs'
import path from 'node:path'
import homepageComposition from '../data/homepage-composition.json'
import homeCoverAssets from '../data/home-cover-assets.json'
import nodes from '../data/nodes.json'

function main() {
  const errors: string[] = []

  const page = fs.readFileSync(path.join(process.cwd(), 'src/app/page.tsx'), 'utf-8')
  ;['HomeHero', 'FeaturedNodeGrid', 'HomePathRail', 'HomeWorldRhythm', 'HomeStatusSummary'].forEach((component) => {
    if (!page.includes(component)) errors.push(`homepage missing component: ${component}`)
  })

  const sectionIds = new Set(homepageComposition.sections.map((section) => section.id))
  ;['hero', 'representative', 'paths', 'rhythm', 'status'].forEach((id) => {
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

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Homepage productization check passed.')
}

main()
