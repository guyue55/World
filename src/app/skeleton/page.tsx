import { createPageMetadata } from '@/lib/metadata'
import { WorldFoundationStack } from '@/components/world/WorldFoundationStack'

export const metadata = createPageMetadata({
  title: '世界骨架',
  description: '古月浮屿的空间层、内容层、关系层、时间层、投影层、治理层与互操作层。',
  path: '/skeleton',
})

export default function SkeletonPage() {
  return (
    <main className="world-container space-y-12 py-16">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm tracking-[0.35em] text-moss">SKELETON</p>
        <h1 className="text-5xl font-semibold">世界骨架</h1>
        <p className="text-lg leading-9 text-ink/70">
          古月浮屿的宇宙感不是从 3D 开始，而是从空间、内容、关系、时间、投影、治理和互操作这些骨架层开始。
        </p>
      </header>

      <WorldFoundationStack />
    </main>
  )
}
