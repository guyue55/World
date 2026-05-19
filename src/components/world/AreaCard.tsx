import Link from 'next/link'
import type { Area } from '@/lib/types'

export function AreaCard({ area }: { area: Area }) {
  return (
    <Link
      href={`/atlas#${area.id}`}
      className="group rounded-world border border-ink/10 bg-white/45 p-5 shadow-soft transition hover:-translate-y-1 hover:bg-white/70"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-2xl">{area.icon ?? '✦'}</p>
          <h3 className="mt-4 text-xl font-semibold">{area.worldName}</h3>
          <p className="mt-1 text-sm text-moss">{area.realName}</p>
        </div>
        <span className="rounded-full bg-mist/60 px-3 py-1 text-xs">{area.status}</span>
      </div>
      <p className="mt-4 line-clamp-3 leading-7 text-ink/65">{area.description}</p>
    </Link>
  )
}
