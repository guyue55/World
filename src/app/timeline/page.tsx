import { getAllWorldEvents } from '@/lib/world-events'
import { WorldEventCard } from '@/components/timeline/WorldEventCard'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: '时间河',
  description: '古月浮屿的世界事件与节点成长记录。',
  path: '/timeline',
})

export default function TimelinePage() {
  const events = getAllWorldEvents()

  return (
    <main className="world-container space-y-10 py-16">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm tracking-[0.35em] text-moss">TIME RIVER</p>
        <h1 className="text-5xl font-semibold">时间河</h1>
        <p className="leading-8 text-ink/70">
          时间河记录的是世界事件，而不只是文章发布时间。节点、区域、法则与路径如何生长，都在这里留下痕迹。
        </p>
      </header>
      <section className="space-y-4">
        {events.map((event) => <WorldEventCard key={event.id} event={event} />)}
      </section>
    </main>
  )
}
