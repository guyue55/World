import {
  getDataFlowContract,
  getFeatureModuleContract,
  getPageCompositionContract,
  getScalabilityPartition,
} from '../src/lib/feature-architecture'

function main() {
  const pages = getPageCompositionContract()
  const features = getFeatureModuleContract()
  const flow = getDataFlowContract()
  const partitions = getScalabilityPartition()

  console.log(`${pages.name}`)
  console.log(`pageKinds=${pages.pageKinds.length}`)
  pages.pageKinds.forEach((item) => console.log(`- ${item.id}: ${item.routes.join(', ')}`))

  console.log(`featureModules=${features.featureModules.length}`)
  features.featureModules.forEach((item) => console.log(`- ${item.id}: ${item.owns.join(' / ')}`))

  console.log(`dataFlowSteps=${flow.flow.length}`)
  console.log(`scalePartitions=${partitions.partitions.length}`)
}

main()
