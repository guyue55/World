import closure from '../data/pre-v4/batch-02-command-environment-closure.json'

const errors: string[] = []

if (!closure.knownBlockers.some((item) => item.id === 'tsx-permission-denied')) {
  errors.push('tsx-permission-denied blocker must be recorded')
}
if (!closure.requiredCommandsBeforeV4Development.includes('npm run check:v3:all')) {
  errors.push('V3 all check command missing')
}
if (!closure.requiredCommandsBeforeV4Development.includes('npm run release:local-gate')) {
  errors.push('release local gate command missing')
}
if (closure.releaseReady !== false) errors.push('releaseReady must remain false')
if (closure.productionLive !== false) errors.push('productionLive must remain false')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('Pre-V4 command environment check passed.')
