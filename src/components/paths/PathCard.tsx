import Link from 'next/link'
import type { Path } from '@/lib/types'
import { formatPathAudience, getPathEntryNode, getPathNodes } from '@/lib/path-guidance'

export function PathCard({ path }: { path: Path }) {
  const entry = getPathEntryNode(path)
  const publicNodeCount = getPathNodes(path).length

  return (
    <Link href={`/paths/${path.id}`} className="min-w-0 block rounded-world border border-ink/10 bg-white/45 p-5 shadow-soft transition hover:-translate-y-1 hover:bg-white/70">
      <p className="truncate text-xs font-semibold tracking-[0.25em] text-moss">{formatPathAudience(path.audience)}</p>
      <h3 className="mt-4 truncate text-xl font-semibold">{path.title}</h3>
      <p className="mt-3 line-clamp-3 leading-7 text-ink/65">{path.description}</p>
      <div className="mt-5 grid gap-2 text-sm text-ink/50">
        <p className="truncate">{publicNodeCount} 个公开节点 · 约 {path.estimatedMinutes ?? 8} 分钟</p>
        {entry && <p className="truncate">起点：{entry.title}</p>}
      </div>
    </Link>
  )
}
