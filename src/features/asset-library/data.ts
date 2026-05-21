import type { VisualAsset } from './model'

export const visualAssets: VisualAsset[] = [
  {
    id: 'cosmic-gateway-placeholder',
    title: '宇宙入口占位资产',
    kind: 'placeholder',
    usage: 'hero',
    source: 'placeholder',
    licenseNote: '占位资产，不作为最终真实素材授权声明。',
    pathHint: 'public/assets/round-03/cosmic-gateway.svg',
  },
  {
    id: 'world-map-orbit-diagram',
    title: '世界地图轨道示意',
    kind: 'diagram',
    usage: 'world-map',
    source: 'generated',
    licenseNote: '项目内生成示意图。',
    pathHint: 'public/assets/round-03/world-map-orbit.svg',
  },
  {
    id: 'theme-library-shelf',
    title: '空中图书馆主题素材',
    kind: 'placeholder',
    usage: 'theme',
    source: 'placeholder',
    licenseNote: '等待真实素材替换。',
    pathHint: 'public/assets/round-03/theme-library.svg',
  },
]

export function getAssetsByUsage(usage: VisualAsset['usage']) {
  return visualAssets.filter((asset) => asset.usage === usage)
}
