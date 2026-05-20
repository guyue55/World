import multiDeviceExperienceMatrix from '../data/multi-device-experience-matrix.json'
import multiDeviceExportPlan from '../data/multi-device-export-plan.json'
import pwaOfflineAccessPlan from '../data/pwa-offline-access-plan.json'

function main() {
  console.log(`${multiDeviceExperienceMatrix.name}`)
  console.log(`stageProgress=${multiDeviceExperienceMatrix.stageProgress}`)
  console.log(`deviceReady=${multiDeviceExperienceMatrix.deviceReady}`)
  console.log(`devices=${multiDeviceExperienceMatrix.devices.length}`)
  console.log(`pwaReady=${pwaOfflineAccessPlan.pwaReady}`)
  console.log(`pwaFeatures=${pwaOfflineAccessPlan.features.length}`)
  console.log(`exportReady=${multiDeviceExportPlan.exportReady}`)
  console.log(`formats=${multiDeviceExportPlan.formats.length}`)
}

main()
