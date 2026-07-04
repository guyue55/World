import Image from 'next/image'
import type { Node } from '@/lib/types'
import { resolveNodeCover } from '@/lib/homepage'

const coverText: Record<string, string> = {
  origin: '创世原点',
  tech: '技术星域',
  workshop: '产品工坊',
  fragments: '灵感云层',
  memory: '记忆湖',
  lighthouse: 'AI 灯塔',
}

export function NodeCover({ node }: { node: Node }) {
  const cover = resolveNodeCover(node)

  if (cover) {
    return (
      <div className="overflow-hidden rounded-world border border-ink/10 bg-white/45 shadow-soft">
        <Image src={cover} alt={node.title} width={1440} height={640} className="h-72 w-full object-cover md:h-80" priority />
      </div>
    )
  }

  return (
    <div className="flex h-72 items-end overflow-hidden rounded-world border border-ink/10 bg-gradient-to-br from-white/70 via-mist/50 to-gold/20 p-6 shadow-soft md:h-80">
      <div>
        <p className="text-sm tracking-[0.35em] text-moss">{coverText[node.areaId] ?? node.areaId}</p>
        <p className="mt-3 text-3xl font-semibold">{node.worldTitle ?? node.title}</p>
      </div>
    </div>
  )
}
