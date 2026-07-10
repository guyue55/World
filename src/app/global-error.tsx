'use client'

import { WorldFallbackScene } from '@/components/world/WorldFallbackScene'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="zh-CN">
      <body>
        <WorldFallbackScene
          eyebrow="世界修复"
          title="世界外壳暂时需要修复。"
          description="这不是空白页。你可以重新尝试展开星图，也可以先回到公开地图继续探索。"
          sceneLabel="Global Error · 可恢复错误"
          primaryAction={{ href: '/atlas', label: '回到世界地图' }}
          actions={[
            { href: '/status', label: '查看维护舱' },
            { href: '/ask', label: '询问灯塔' },
          ]}
          onRetry={reset}
          retryLabel="重新展开"
        />
      </body>
    </html>
  )
}
