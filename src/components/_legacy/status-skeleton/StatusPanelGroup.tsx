import type { ReactNode } from 'react'
import { AccessibleCollapsible } from '@/components/interaction/AccessibleCollapsible'

export function StatusPanelGroup({
  id,
  title,
  purpose,
  children,
  defaultOpen = false,
}: {
  id: string
  title: string
  purpose: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <AccessibleCollapsible title={title} summary={purpose} defaultOpen={defaultOpen}>
        <div className="space-y-6">{children}</div>
      </AccessibleCollapsible>
    </section>
  )
}
