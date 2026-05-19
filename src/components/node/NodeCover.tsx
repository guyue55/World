import type { Node } from '@/lib/types'

const coverText: Record<string, string> = {
  origin: '创世原点',
  tech: '技术星域',
  workshop: '产品工坊',
  fragments: '灵感云层',
  memory: '记忆湖',
  lighthouse: 'AI 灯塔',
}

export function NodeCover({ node }: { node: Node }) {
  if (node.cover) {
    return (
      <div className="overflow-hidden rounded-world border border-ink/10 bg-white/45 shadow-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.cover} alt={node.title} className="h-64 w-full object-cover" />
      </div>
    )
  }

  return (
    <div className="flex h-64 items-end overflow-hidden rounded-world border border-ink/10 bg-gradient-to-br from-white/70 via-mist/50 to-gold/20 p-6 shadow-soft">
      <div>
        <p className="text-sm tracking-[0.35em] text-moss">{coverText[node.areaId] ?? node.areaId}</p>
        <p className="mt-3 text-3xl font-semibold">{node.worldTitle ?? node.title}</p>
      </div>
    </div>
  )
}
