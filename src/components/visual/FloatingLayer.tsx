import type { ReactNode } from 'react'

export function FloatingLayer({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/75 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-mist/50 blur-3xl" />
      <div className="relative">
        {eyebrow ? <p className="text-xs tracking-[0.34em] text-moss">{eyebrow}</p> : null}
        <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">{title}</h2>
        {description ? <p className="mt-4 max-w-3xl leading-7 text-ink/65">{description}</p> : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  )
}
