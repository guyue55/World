'use client'

import Link from 'next/link'
import { ArrowRight, Compass } from 'lucide-react'
import type { NodeNextStepSurface } from '@/lib/public-world-surfaces'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'

export function NodeNextStepPanel({ surface }: { surface: NodeNextStepSurface }) {
  const runtime = useWorldRuntime()
  const returnJourney = runtime.lastJourney?.path?.startsWith('/node/') ? null : runtime.lastJourney
  return <nav className="node-next-step" aria-label="阅读后出口"><p><Compass size={15} /> {surface.title}</p>{returnJourney ? <Link href={returnJourney.path}><span>返回来路</span><small>{returnJourney.label}</small><ArrowRight size={14} /></Link> : null}{surface.actions.map((action) => <Link key={action.href} href={action.href}><span>{action.label}</span><small>{action.description}</small><ArrowRight size={14} /></Link>)}</nav>
}
