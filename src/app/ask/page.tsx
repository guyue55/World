import Link from 'next/link'
import { getAllPaths } from '@/lib/paths'
import { LighthouseStatus } from '@/components/ask/LighthouseStatus'
import { PathCard } from '@/components/paths/PathCard'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'AI 灯塔',
  description: '古月浮屿的低光导览：AI 是灯塔，不是太阳。',
  path: '/ask',
})

export default function AskPage() {
  const paths = getAllPaths()

  return (
    <main className="world-container space-y-10 py-16">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm tracking-[0.35em] text-moss">AI LIGHTHOUSE</p>
        <h1 className="text-5xl font-semibold">AI 灯塔</h1>
        <p className="leading-8 text-ink/70">
          AI 是灯塔，不是太阳。V1 采用低光模式：不依赖实时 AI，也能给你几条已经准备好的路。
        </p>
      </header>

      <LighthouseStatus />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">从这里开始</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paths.map((path) => <PathCard key={path.id} path={path} />)}
        </div>
      </section>

      <section className="rounded-world border border-ink/10 bg-white/45 p-6">
        <p className="leading-8 text-ink/75">
          想直接查找内容？前往 <Link className="underline" href="/archive">档案馆</Link>。
        </p>
      </section>
    </main>
  )
}
