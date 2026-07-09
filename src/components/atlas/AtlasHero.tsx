import { SceneWorldPortal } from '@/components/world/SceneWorldPortal'
import type { SceneDeepInteractionModel } from '@/lib/scene-deep-interaction'

export function AtlasHero({ interactionModel }: { interactionModel?: SceneDeepInteractionModel }) {
  return (
    <SceneWorldPortal
      scene="atlas"
      eyebrow="ATLAS · 星图穹顶"
      title="从这里看见整片公开世界。"
      description="区域不再只是分类卡片，而是一组可进入、可返回、可继续探索的星域。你可以先看主区域，再沿时间河或档案馆深入。"
      objects={['星域', '区域', '节点', '星线', '路径', '雾区']}
      primaryAction={{ href: '/timeline', label: '沿时间河继续' }}
      secondaryActions={[
        { href: '/archive', label: '打开档案馆' },
        { href: '/paths', label: '选择路径' },
      ]}
      stats={[
        { label: '主区域', value: '8', note: '公开空间骨架' },
        { label: '星线', value: '实时', note: '关系正在连接' },
        { label: '下一幕', value: '时间河', note: '从空间转入事件' },
      ]}
      interactionModel={interactionModel}
    />
  )
}
