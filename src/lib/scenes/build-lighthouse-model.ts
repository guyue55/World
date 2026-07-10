import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { getRecommendationsForHome } from '@/lib/lighthouse-recommend'
import { getWorldSceneAsset } from '@/lib/world-scene-assets'

export type LighthouseGuideModel = ReturnType<typeof buildLighthouseModel>

export function buildLighthouseModel() {
  const world = getPublicWorldObjectIndex()
  const recommendations = getRecommendationsForHome(world.nodes, world.paths, 6)
  const routes = recommendations.map((item) => {
    if (item.type === 'node' && item.node) return { id: item.node.slug, title: item.node.worldTitle ?? item.node.title, href: item.node.href, reason: item.reason, kind: 'node' as const }
    if (item.type === 'path' && item.path) return { id: item.path.id, title: item.path.title, href: `/paths/${item.path.id}`, reason: item.reason, kind: 'path' as const }
    return { id: 'atlas', title: '古月浮屿星图', href: '/atlas', reason: '从全图确认方向。', kind: 'scene' as const }
  })

  return {
    title: '浮屿灯塔',
    arrivalLine: '把来路交给光束，下一座岛会亮起来。',
    asset: getWorldSceneAsset('lighthouse'),
    routes,
    quickQuestions: ['我现在在哪里？', '下一步适合去哪里？', '为什么推荐这条路？'],
    fallbackLinks: [
      { title: '回到星图', href: '/atlas', reason: '从全局重新定位。' },
      { title: '沿路行走', href: '/paths', reason: '选择一条完整旅程。' },
      { title: '检索记忆', href: '/archive', reason: '按主题查找公开卷宗。' },
    ],
  }
}
