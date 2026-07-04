import multiDeviceExperienceMatrix from '../../data/domains/experience/multi-device-experience-matrix.json'
import multiDeviceExportPlan from '../../data/operations/multi-device-export-plan.json'
import pwaOfflineAccessPlan from '../../data/core/pwa-offline-access-plan.json'

export function getMultiDeviceExperienceMatrix() {
  return multiDeviceExperienceMatrix
}

export function getPwaOfflineAccessPlan() {
  return pwaOfflineAccessPlan
}

export function getMultiDeviceExportPlan() {
  return multiDeviceExportPlan
}

export function getPhaseTenExperienceSummary() {
  return {
    stageProgress: multiDeviceExperienceMatrix.stageProgress,
    deviceReady: multiDeviceExperienceMatrix.deviceReady,
    devices: multiDeviceExperienceMatrix.devices.length,
    pwaReady: pwaOfflineAccessPlan.pwaReady,
    pwaFeatures: pwaOfflineAccessPlan.features.length,
    exportReady: multiDeviceExportPlan.exportReady,
    exportFormats: multiDeviceExportPlan.formats.length,
  }
}
