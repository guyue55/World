import type { ReactNode } from 'react'
export function SpatialCard({ eyebrow, title, description, children, depth = 'middle' }: { eyebrow?: string; title: string; description?: string; children?: ReactNode; depth?: 'near' | 'middle' | 'far' }) {
  const depthClass = depth === 'far' ? 'bg-ink/90 text-white border-white/15' : depth === 'near' ? 'bg-white/88 text-ink border-white/70' : 'bg-white/72 text-ink border-white/50'
  return <article className={`rounded-[2rem] border p-5 shadow-soft backdrop-blur ${depthClass}`}>{eyebrow ? <p className="text-xs tracking-[0.32em] opacity-65">{eyebrow}</p> : null}<h3 className="mt-3 text-2xl font-semibold">{title}</h3>{description ? <p className="mt-3 text-sm leading-6 opacity-70">{description}</p> : null}{children ? <div className="mt-5">{children}</div> : null}</article>
}
