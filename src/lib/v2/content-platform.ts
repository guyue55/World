import admin from '../../data/v2/stage-03/09-v2-admin-content-boundary.json'
import exportWorker from '../../data/v2/stage-03/11-v2-export-worker.json'
import finalReport from '../../data/v2/stage-03/12-v2-stage-three-final.json'
import vault from '../../data/v2/stage-03/10-v2-private-vault-service.json'

export function getV2ContentPlatform() {
  return {
    admin,
    vault,
    exportWorker,
    finalReport,
    summary: {
      stage: 3,
      adminModules: admin.modules.length,
      vaultModules: vault.vaultModules.length,
      exportJobs: exportWorker.jobs.length,
      ready: false,
    },
  }
}
