import type { ReactNode } from 'react'

function BoundaryList({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-paper/70 p-5">
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/65">{children}</ul>
    </div>
  )
}

export function LighthouseBoundarySummary({
  allowed,
  forbidden,
}: {
  allowed: string[]
  forbidden: string[]
}) {
  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">BOUNDARY</p>
      <h2 className="mt-3 text-3xl font-semibold">灯塔边界</h2>
      <p className="mt-3 max-w-2xl leading-8 text-ink/70">
        灯塔可以照路，但不能替你选择道路，也不能越过权限边界。
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <BoundaryList title="允许">
          {allowed.slice(0, 6).map((item) => <li key={item}>- {item}</li>)}
        </BoundaryList>
        <BoundaryList title="禁止">
          {forbidden.slice(0, 6).map((item) => <li key={item}>- {item}</li>)}
        </BoundaryList>
      </div>
    </section>
  )
}
