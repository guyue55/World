import type { Node } from '@/lib/types'

export function PathProgress({ nodes }: { nodes: Node[] }) {
  return (
    <aside className="rounded-world border border-ink/10 bg-white/45 p-5 shadow-soft">
      <h2 className="text-lg font-semibold">路径进度</h2>
      <p className="mt-2 text-sm leading-6 text-ink/55">这是当前路径的节点顺序。未来可以在这里记录阅读进度。</p>
      <ol className="mt-5 space-y-3">
        {nodes.map((node, index) => (
          <li key={node.id} className="flex gap-3 text-sm">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/10 text-xs">
              {index + 1}
            </span>
            <span className="leading-7 text-ink/70">{node.title}</span>
          </li>
        ))}
      </ol>
    </aside>
  )
}
