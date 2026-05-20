import { getV2ContentPlatform } from '../src/lib/v2/content-platform'

const platform = getV2ContentPlatform()
console.log('V2 Stage 03 Content Platform')
console.log(`adminModules=${platform.summary.adminModules}`)
console.log(`vaultModules=${platform.summary.vaultModules}`)
console.log(`exportJobs=${platform.summary.exportJobs}`)
console.log(`ready=${platform.summary.ready}`)
