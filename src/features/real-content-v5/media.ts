export type PhotoStory = {
  id: string
  title: string
  locationHint: string
  narrative: string
  assetId: string
  status: 'candidate' | 'ready' | 'needs-real-photo'
}

export type ProjectLog = {
  id: string
  title: string
  problem: string
  decision: string
  outcome: string
  linkedContentId: string
}

export type LifeNote = {
  id: string
  title: string
  scene: string
  note: string
  privacy: 'public' | 'private-redacted'
}

export const photoStories: PhotoStory[] = [
  {
    id: 'floating-island-first-view',
    title: '第一次看见浮屿入口',
    locationHint: '首页 /world 首屏',
    narrative: '用一张接近真实摄影感的视觉素材承载“进入世界”的第一印象。',
    assetId: 'cosmic-gateway-placeholder',
    status: 'needs-real-photo',
  },
  {
    id: 'garden-archive-light',
    title: '花园与档案馆之间的光',
    locationHint: '主题展览花园',
    narrative: '用于连接生活、照片和展览，不把照片当装饰，而当世界证据。',
    assetId: 'theme-library-shelf',
    status: 'needs-real-photo',
  },
]

export const projectLogs: ProjectLog[] = [
  {
    id: 'v4-worldification-log',
    title: 'V4 世界化重构复盘',
    problem: '页面具备世界概念，但第一眼仍像普通博客。',
    decision: '将首页、Atlas、节点、路径、时间河、展览、AI 灯塔全部场景化。',
    outcome: '形成 V4 世界入口和 /world 世界总览。',
    linkedContentId: 'why-build-word-life',
  },
  {
    id: 'v5-content-governance-log',
    title: 'V5 真实内容治理复盘',
    problem: '真实内容可能混入私密原始内容或占位素材。',
    decision: '把真实内容、脱敏内容、素材缺口和运营状态分离。',
    outcome: '形成可检查的真实内容域。',
    linkedContentId: 'engineering-world-skeleton',
  },
]

export const lifeNotes: LifeNote[] = [
  {
    id: 'quiet-evening-note',
    title: '安静傍晚的技术笔记',
    scene: '生活 / 技术交界',
    note: '生活内容可以轻，不必伪装成教程；它是世界的气味和温度。',
    privacy: 'public',
  },
  {
    id: 'protected-family-note',
    title: '被保护的家庭记忆信号',
    scene: '私密档案边界',
    note: '只记录脱敏存在性，不记录私密原始内容。',
    privacy: 'private-redacted',
  },
]

export function getPhotoStoriesNeedingRealAssets() {
  return photoStories.filter((story) => story.status === 'needs-real-photo')
}

export function getPublicLifeNotes() {
  return lifeNotes.filter((note) => note.privacy === 'public')
}
