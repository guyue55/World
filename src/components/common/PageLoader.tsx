import { WorldFallbackScene } from '@/components/world/WorldFallbackScene'

export function PageLoader({ label = '正在加载' }: { label?: string }) {
  return (
    <WorldFallbackScene
      eyebrow="世界装载"
      title={label}
      description="世界正在整理公开星图、路径和档案。即使在低动效模式下，也会保留清晰的返回路径和可恢复入口。"
      sceneLabel="Loading · M29"
      primaryAction={{ href: '/atlas', label: '先看世界地图' }}
      actions={[
        { href: '/archive', label: '打开档案馆' },
        { href: '/ask', label: '询问灯塔' },
      ]}
    >
      <div className="rounded-[1rem] border border-paper/10 bg-paper/8 p-4">
        <div className="h-2 overflow-hidden rounded-full bg-paper/12">
          <div className="h-full w-2/3 rounded-full bg-gold/70 motion-safe:animate-pulse" />
        </div>
        <p className="mt-3 text-sm leading-6 text-paper/62">默认不播放音频，不阻断阅读，不制造白屏。</p>
      </div>
    </WorldFallbackScene>
  )
}
