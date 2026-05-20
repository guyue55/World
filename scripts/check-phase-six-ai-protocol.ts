import fs from 'node:fs'
import path from 'node:path'
import aiReadableProtocol from '../data/ai-readable-protocol.json'
import aiPermissionMatrix from '../data/ai-permission-matrix.json'
import privateArchiveBoundaryPolicy from '../data/private-archive-boundary-policy.json'
import phaseSixEntryGate from '../data/phase-six-entry-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  ;['public', 'semiPublic'].forEach((tier) => {
    if (!aiReadableProtocol.readableTiers.includes(tier)) errors.push(`missing readable tier: ${tier}`)
  })

  ;['private', 'family', 'partner', 'vault', 'sealed', 'silent'].forEach((tier) => {
    if (!aiReadableProtocol.forbiddenTiers.includes(tier)) errors.push(`missing forbidden tier: ${tier}`)
  })

  if (!aiReadableProtocol.humanRequiredActions.includes('change visibility')) {
    errors.push('changing visibility must require human confirmation')
  }

  const unsafeAllowed = aiPermissionMatrix.permissions.filter((item) => item.default === 'allow' && !['read-public', 'read-semi-public'].includes(item.operation))
  if (unsafeAllowed.length > 0) {
    errors.push(`unsafe default allow permissions: ${unsafeAllowed.map((item) => item.operation).join(', ')}`)
  }

  if (!privateArchiveBoundaryPolicy.layers.every((layer) => layer.publicBuild === 'excluded')) {
    errors.push('private boundary policy must exclude all private layers')
  }

  if (phaseSixEntryGate.entryDecision !== 'phase-six-planning-allowed-ai-boundary-must-inherit-private-policy') {
    errors.push('phase six entry decision mismatch')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-six-ai-protocol']) errors.push('package missing check:phase-six-ai-protocol')
  if (!pkg.scripts['phase-six-ai-protocol:print']) errors.push('package missing phase-six-ai-protocol:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase six AI protocol check passed.')
}

main()
