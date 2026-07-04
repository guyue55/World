import Link from 'next/link'
import type { Path } from '@/lib/types'
import { getPathEntryNode } from '@/lib/path-guidance'

export function PathCard({ path }: { path: Path }) {
  const entry = getPathEntryNode(path)

  return (
    <Link href={`/paths/${path.id}`} className="block rounded-world border border-ink/10 bg-white/45 p-5 shadow-soft transition hover:-translate-y-1 hover:bg-white/70">
      <p className="text-xs uppercase tracking-[0.25em] text-moss">{path.audience}</p>
      <h3 className="mt-4 text-xl font-semibold">{path.title}</h3>
      <p className="mt-3 leading-7 text-ink/65">{path.description}</p>
      <div className="mt-5 grid gap-2 text-sm text-ink/50">
        <p>{path.nodeSlugs.length} 个节点 · 约 {path.estimatedMinutes ?? 8} 分钟</p>
        {entry && <p>起点：{entry.title}</p>}
      </div>
    </Link>
  )
}
