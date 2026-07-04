import Link from 'next/link'
import type { ExperienceNode } from '@/features/experience-realization'

export function CelestialPanel({ node }: { node: ExperienceNode }) {
  return (
    <Link
      href={node.href}
      className="group relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/65 p-5 shadow-soft backdrop-blur transition hover:-translate-y-1 hover:bg-white/80"
    >
      <span className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-mist/70 blur-2xl transition group-hover:scale-125" />
      <span className="relative text-xs tracking-[0.32em] text-moss">{node.eyebrow}</span>
      <h3 className="relative mt-3 text-2xl font-semibold text-ink">{node.title}</h3>
      <p className="relative mt-3 min-h-20 text-sm leading-6 text-ink/65">{node.description}</p>
      <div className="relative mt-5 flex items-center justify-between border-t border-ink/10 pt-4 text-sm">
        <span className="text-ink/55">{node.status === 'ready' ? '可进入' : '需审计'}</span>
        <span className="font-medium text-moss">{node.signal} →</span>
      </div>
    </Link>
  )
}
