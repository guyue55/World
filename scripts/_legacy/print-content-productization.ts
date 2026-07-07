import {
  getContentProductizationBaseline,
  getCoverStrategy,
  getProjectionDensityStrategy,
  getSeedContentQualityGate,
} from '../src/lib/content-productization'

function main() {
  const baseline = getContentProductizationBaseline()
  const covers = getCoverStrategy()
  const density = getProjectionDensityStrategy()
  const quality = getSeedContentQualityGate()

  console.log(`${baseline.name}`)
  console.log(`homeSections=${baseline.homeSections.length}`)
  console.log(`coverKinds=${covers.coverKinds.length}`)
  console.log(`densityRoutes=${density.routes.length}`)
  console.log(`qualityGates=${quality.qualityGates.length}`)
  console.log(`minimumTargets=${quality.minimumTargets.map((item) => `${item.type}:${item.count}`).join(', ')}`)
}

main()
