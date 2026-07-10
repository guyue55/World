'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle2, Route } from 'lucide-react'
import { completePathStep } from '@/lib/runtime/path-progress'
import type { NodePathContext } from '@/lib/scenes/build-node-model'

export function NodeJourneyControls({ context }: { context: NodePathContext }) {
  const router = useRouter()
  const complete = () => {
    const result = completePathStep(context.pathId, context.stepIndex, context.stepCount)
    if (context.nextNode && !result.completed) router.push(`/node/${context.nextNode.slug}?fromPath=${context.pathId}&step=${context.stepIndex + 1}`)
    else router.push(`/paths/${context.pathId}`)
  }
  return <div className="node-journey-controls" data-testid="node-journey-controls">
    <span><Route size={15} aria-hidden="true" /> {context.pathTitle} · 第 {context.stepIndex + 1}/{context.stepCount} 站</span>
    <Link href={`/paths/${context.pathId}`}>回到路线</Link>
    <button type="button" onClick={complete}>{context.nextNode ? <>完成此站，前往 {context.nextNode.title}<ArrowRight size={15} /></> : <>完成旅程<CheckCircle2 size={15} /></>}</button>
  </div>
}
