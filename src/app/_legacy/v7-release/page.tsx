import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'
import {
  V7EvidenceMatrix,
  V7ExtensionRegistry,
  V7HandoffPanel,
  V7OperationsCockpit,
  V7ReleaseHero,
  V7StageBoard,
} from '@/components/v7-release'

export default function V7ReleasePage() {
  return (
    <ResponsivePageShell>
      <V7ReleaseHero />
      <V7StageBoard />
      <V7EvidenceMatrix />
      <V7OperationsCockpit />
      <V7ExtensionRegistry />
      <V7HandoffPanel />
    </ResponsivePageShell>
  )
}
