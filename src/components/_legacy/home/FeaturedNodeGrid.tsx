import Link from 'next/link'
import type { Node } from '@/lib/types'
import { resolveNodeCover } from '@/lib/homepage'
import { SectionHeader } from '@/components/_legacy/layout/SectionHeader'
import { NodeLifeStageBadge } from '@/components/node/NodeLifeStageBadge'

export function FeaturedNodeGrid({ nodes }: { nodes: Node[] }) {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="REPRESENTATIVE NODES"
        title="先看到几颗真正有意义的星体"
        description="首页不展示全部数据库，只展示能代表这个世界的公开节点。"
        action={<Link className="rounded-full border border-ink/15 bg-white/50 px-5 py-3 text-sm" href="/archive">查看全部档案</Link>}
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {nodes.map((node) => (
          <Link key={node.id} href={`/node/${node.slug}`} className="group overflow-hidden rounded-world border border-ink/10 bg-white/50 shadow-soft transition hover:-translate-y-1 hover:bg-white/75">
            <div className="aspect-[16/9] overflow-hidden bg-ink/5">
              <img
                src={resolveNodeCover(node)}
                alt={`${node.title} 的封面`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-ink/5 px-3 py-1 text-xs">{node.type}</span>
                <NodeLifeStageBadge stage={node.lifeStage} compact />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{node.title}</h3>
              {node.worldTitle && <p className="mt-1 text-sm text-moss">{node.worldTitle}</p>}
              {node.summary && <p className="mt-4 line-clamp-3 leading-7 text-ink/65">{node.summary}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                {node.tags.slice(0, 4).map((tag) => <span key={tag} className="text-xs text-ink/45">#{tag}</span>)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
