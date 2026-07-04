import { visualDepthLayers, visualFoundationPrinciple, visualMoods } from './tokens'

export const visualFoundation = {
  principle: visualFoundationPrinciple,
  layers: visualDepthLayers,
  moods: visualMoods,
  rules: [
    'page.tsx 只负责装配',
    '视觉模型在 feature 层维护',
    '展示组件放入 components/visual',
    '不把 WebGL 作为第二轮硬依赖',
  ],
} as const
