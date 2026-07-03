import type { Metadata } from 'next'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { PrivateAiApprovalPanel } from '@/components/private-ai-v6/PrivateAiApprovalPanel'
import { PrivateAiAuditPanel } from '@/components/private-ai-v6/PrivateAiAuditPanel'
import { PrivateAiHero } from '@/components/private-ai-v6/PrivateAiHero'
import { PrivateAiMemoryGraphPanel } from '@/components/private-ai-v6/PrivateAiMemoryGraphPanel'
import { PrivateAiStagePanel } from '@/components/private-ai-v6/PrivateAiStagePanel'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function PrivateAiPage() {
  return (
    <ResponsivePageShell>
      <div className="space-y-6">
        <PrivateAiHero />
        <PrivateAiStagePanel />
        <PrivateAiApprovalPanel />
        <PrivateAiAuditPanel />
        <PrivateAiMemoryGraphPanel />
      </div>
    </ResponsivePageShell>
  )
}
