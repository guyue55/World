import { LighthouseGuideStage } from '@/components/ask/LighthouseGuideStage'
import { createPageMetadata } from '@/lib/metadata'
import { buildLighthouseModel } from '@/lib/scenes/build-lighthouse-model'
import { createSceneContext } from '@/lib/scenes/scene-destination'
import { runLowLightLighthouse } from '@/server/ai/lighthouse-runtime'

export const metadata = createPageMetadata({ title: '浮屿灯塔', description: '沿公开事实与来路寻找下一站。', path: '/ask' })

export default function AskPage() {
  const model = buildLighthouseModel()
  const initialResponse = runLowLightLighthouse('下一步适合去哪里？', createSceneContext('lighthouse', null))
  return <main><LighthouseGuideStage model={model} initialResponse={initialResponse} /></main>
}
