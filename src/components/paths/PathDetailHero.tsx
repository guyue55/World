import type { Path } from '@/lib/types'

export function PathDetailHero({ path, nodeCount }: { path: Path; nodeCount: number }) {
  return (
    <header className="rounded-world border border-ink/10 bg-white/50 p-8 shadow-soft">
      <p className="text-sm uppercase tracking-[0.35em] text-moss">{path.audience}</p>
      <h1 className="mt-4 break-words text-5xl font-semibold leading-tight">{path.title}</h1>
      <p className="mt-5 max-w-3xl break-words text-lg leading-9 text-ink/70">{path.description}</p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm text-ink/55">
        <span className="rounded-full bg-paper/80 px-4 py-2">{nodeCount} 个节点</span>
        <span className="rounded-full bg-paper/80 px-4 py-2">约 {path.estimatedMinutes ?? 8} 分钟</span>
        <span className="rounded-full bg-paper/80 px-4 py-2">{path.visibility}</span>
      </div>
    </header>
  )
}
