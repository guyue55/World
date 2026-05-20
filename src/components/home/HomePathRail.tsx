import Link from 'next/link'
import type { Path } from '@/lib/types'
import { SectionHeader } from '@/components/layout/SectionHeader'

export function HomePathRail({ paths }: { paths: Path[] }) {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="GUIDED PATHS"
        title="不知道从哪里开始，就走一条路"
        description="路径不是目录，而是给不同访问者准备的进入方式。"
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {paths.map((path) => (
          <Link key={path.id} href="/paths" className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft transition hover:-translate-y-1 hover:bg-white/70">
            <p className="text-sm uppercase tracking-[0.25em] text-moss">{path.audience}</p>
            <h3 className="mt-3 text-2xl font-semibold">{path.title}</h3>
            <p className="mt-4 leading-7 text-ink/65">{path.description}</p>
            {path.estimatedMinutes && <p className="mt-5 text-sm text-ink/50">约 {path.estimatedMinutes} 分钟</p>}
          </Link>
        ))}
      </div>
    </section>
  )
}
