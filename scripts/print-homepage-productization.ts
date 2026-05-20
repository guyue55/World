import homepageComposition from '../data/homepage-composition.json'
import homeCoverAssets from '../data/home-cover-assets.json'
import nodes from '../data/nodes.json'

function main() {
  const featured = nodes.filter((node) => node.visibility === 'public' && (node.featured?.home || node.featured?.representative))
  console.log(`${homepageComposition.name}`)
  console.log(`sections=${homepageComposition.sections.length}`)
  console.log(`covers=${homeCoverAssets.covers.length}`)
  console.log(`featuredNodes=${featured.length}`)
  console.log(`featuredWithCover=${featured.filter((node) => Boolean(node.cover)).length}`)
}

main()
