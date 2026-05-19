import { createPageMetadata } from '@/lib/metadata'
import { WorldFoundationStack } from '@/components/world/WorldFoundationStack'

export const metadata = createPageMetadata({
  title: '世界状态',
  description: '古月浮屿的世界健康度、骨架不变量与星线状态。',
  path: '/status',
})

export default function StatusPage() {
  return (
    <main className="world-container space-y-10 py-16">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm tracking-[0.35em] text-moss">WORLD STATUS</p>
        <h1 className="text-5xl font-semibold">世界状态</h1>
        <p className="text-lg leading-9 text-ink/70">
          这里不是运维面板，而是确认世界骨架是否仍然稳定、清晰、可生长。
        </p>
      </header>

      <WorldFoundationStack />
    </main>
  )
}
