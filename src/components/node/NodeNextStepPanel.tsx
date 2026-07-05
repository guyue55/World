import Link from 'next/link'
import type { NodeNextStepSurface } from '@/lib/public-world-surfaces'

export function NodeNextStepPanel({ surface }: { surface: NodeNextStepSurface }) {
  return (
    <section className="rounded-[1.75rem] border border-white/65 bg-white/70 p-5 text-sm leading-7 text-ink/62 shadow-soft backdrop-blur">
      <p className="font-semibold text-ink">{surface.title}</p>
      <p className="mt-2">{surface.description}</p>
      <div className="mt-4 flex flex-col gap-2">
        {surface.actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`block w-full rounded-full px-4 py-2 text-center font-semibold transition ${
              action.tone === 'primary'
                ? 'bg-ink text-paper hover:bg-night'
                : 'border border-ink/10 bg-white/75 text-ink hover:bg-white'
            }`}
          >
            <span className="block">{action.label}</span>
            <span className="block truncate text-xs font-normal opacity-65">{action.description}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
