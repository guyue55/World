export type MotionGrammarType = 'arrival' | 'emergence' | 'connection' | 'flow' | 'focus' | 'feedback'

export type MotionGrammarRule = {
  type: MotionGrammarType
  label: string
  intent: string
  appliesTo: string
  from: Record<string, number | string>
  to: Record<string, number | string | boolean | { amount?: number; from?: string } | 'auto'>
  reducedMotion: Record<string, number | string>
}

export const MOTION_GRAMMAR: Record<MotionGrammarType, MotionGrammarRule> = {
  arrival: {
    type: 'arrival',
    label: '抵达',
    intent: '页面或区块进入视野时，让内容轻轻抵达。',
    appliesTo: '首页入口、公开导览、普通内容区块。',
    from: { autoAlpha: 0, y: 18 },
    to: { autoAlpha: 1, y: 0, duration: 0.68, ease: 'power3.out', stagger: { amount: 0.28, from: 'start' }, overwrite: 'auto' },
    reducedMotion: { autoAlpha: 1, y: 0, scale: 1, rotation: 0 },
  },
  emergence: {
    type: 'emergence',
    label: '浮现',
    intent: '让卡片、节点和档案内容从背景中显现。',
    appliesTo: '档案导览、状态面板、轻量卡片组。',
    from: { autoAlpha: 0, scale: 0.95 },
    to: { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'expo.out', stagger: 0.1, overwrite: 'auto' },
    reducedMotion: { autoAlpha: 1, scale: 1 },
  },
  connection: {
    type: 'connection',
    label: '连接',
    intent: '强调区域、节点和关系之间的星线连接。',
    appliesTo: '地图星图、关系线、互链说明。',
    from: { autoAlpha: 0, x: -15 },
    to: { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05, overwrite: 'auto' },
    reducedMotion: { autoAlpha: 1, x: 0 },
  },
  flow: {
    type: 'flow',
    label: '流动',
    intent: '表达时间河、事件流和连续旅程的方向感。',
    appliesTo: '时间流、路径旅程、事件列表。',
    from: { autoAlpha: 0, y: 10, rotation: -2 },
    to: { autoAlpha: 1, y: 0, rotation: 0, duration: 0.7, ease: 'sine.out', stagger: 0.15, overwrite: 'auto' },
    reducedMotion: { autoAlpha: 1, y: 0, rotation: 0 },
  },
  focus: {
    type: 'focus',
    label: '聚焦',
    intent: '在读者进入节点或重点内容时减少噪声。',
    appliesTo: '节点开场、阅读重点、焦点切换。',
    from: { autoAlpha: 0, filter: 'blur(10px)' },
    to: { autoAlpha: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power2.inOut', stagger: 0.2, overwrite: 'auto' },
    reducedMotion: { autoAlpha: 1, filter: 'blur(0px)' },
  },
  feedback: {
    type: 'feedback',
    label: '反馈',
    intent: '给筛选、状态变化和轻量确认一个短促回应。',
    appliesTo: '筛选结果、状态提示、轻量交互反馈。',
    from: { autoAlpha: 0, y: -10 },
    to: { autoAlpha: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)', stagger: 0.1, overwrite: 'auto' },
    reducedMotion: { autoAlpha: 1, y: 0 },
  },
}

export function getMotionGrammarRule(type: MotionGrammarType) {
  return MOTION_GRAMMAR[type]
}
