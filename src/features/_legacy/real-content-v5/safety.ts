import { realContentItems } from './data'
import { getPhotoStoriesNeedingRealAssets } from './media'
import { getBrokenRealContentReferences, realExhibitions, realReadingPaths, realTimelineEvents } from './world-links'

export type RealContentReadiness = {
  id: string
  title: string
  status: 'ready' | 'tracked' | 'needs-real-content' | 'pending-real-run'
  evidence: string
}

const forbiddenPrivateSignals = ['私密原文', '原文：', 'private raw', 'vault raw', 'sealed raw']

export const realContentReadiness: RealContentReadiness[] = [
  {
    id: 'real-content-seeds',
    title: '真实内容种子',
    status: realContentItems.length >= 5 ? 'ready' : 'needs-real-content',
    evidence: `${realContentItems.length} items registered`,
  },
  {
    id: 'photo-assets',
    title: '真实照片资产',
    status: getPhotoStoriesNeedingRealAssets().length > 0 ? 'needs-real-content' : 'ready',
    evidence: `${getPhotoStoriesNeedingRealAssets().length} photo stories still need real photos`,
  },
  {
    id: 'timeline-exhibitions-paths',
    title: '时间河 / 展览 / 阅读路径',
    status: realTimelineEvents.length >= 3 && realExhibitions.length >= 2 && realReadingPaths.length >= 2 ? 'ready' : 'needs-real-content',
    evidence: `${realTimelineEvents.length} events, ${realExhibitions.length} exhibitions, ${realReadingPaths.length} paths`,
  },
  {
    id: 'production-publication',
    title: '真实发布',
    status: 'pending-real-run',
    evidence: 'preview deploy, smoke test and manual signoff are still pending',
  },
]

export function scanRealContentForPrivateRawSignals() {
  return realContentItems.filter((item) => {
    const haystack = `${item.title}\n${item.subtitle}\n${item.summary}\n${item.body}\n${item.tags.join(' ')}`.toLowerCase()
    return forbiddenPrivateSignals.some((signal) => haystack.includes(signal.toLowerCase()))
  })
}

export function getRealContentSafetyIssues() {
  return [
    ...scanRealContentForPrivateRawSignals().map((item) => `private raw signal in ${item.id}`),
    ...getBrokenRealContentReferences().map((id) => `broken reference ${id}`),
  ]
}

export function isV5ContentLocallyReady() {
  return getRealContentSafetyIssues().length === 0 && realContentItems.length >= 5 && realExhibitions.length >= 2 && realReadingPaths.length >= 2
}
