import type { VisualAsset } from './model'
export const visualAssets: VisualAsset[] = [
 { id:'cosmic-gateway-placeholder', title:'宇宙入口占位资产', kind:'placeholder', usage:'hero', source:'placeholder', status:'placeholder', risk:'medium', licenseNote:'占位资产，不作为最终真实素材授权声明。', pathHint:'public/assets/round-03/cosmic-gateway.svg', productionReady:false },
 { id:'floating-world-reference', title:'漂浮数字世界参考素材', kind:'diagram', usage:'content', source:'curated', status:'candidate', risk:'medium', licenseNote:'来源为设计参考文本，需要转化为项目内原创素材后才能生产使用。', pathHint:'docs/30-assets/floating-world-reference.md', productionReady:false },
 { id:'world-map-orbit-diagram', title:'世界地图轨道示意', kind:'diagram', usage:'world-map', source:'generated', status:'approved', risk:'low', licenseNote:'项目内生成示意图，可用于本地演示。', pathHint:'public/assets/round-03/world-map-orbit.svg', productionReady:false },
 { id:'theme-library-shelf', title:'空中图书馆主题素材', kind:'placeholder', usage:'theme', source:'placeholder', status:'placeholder', risk:'medium', licenseNote:'等待真实素材替换。', pathHint:'public/assets/round-03/theme-library.svg', productionReady:false },
 { id:'lighthouse-diagram-placeholder', title:'AI 灯塔边界示意', kind:'placeholder', usage:'lighthouse', source:'placeholder', status:'placeholder', risk:'medium', licenseNote:'占位示意，后续替换为原创 SVG。', pathHint:'public/assets/round-03/lighthouse-boundary.svg', productionReady:false },
]
export const getAssetsByUsage=(usage:VisualAsset['usage'])=>visualAssets.filter(a=>a.usage===usage)
export const getProductionReadyAssets=()=>visualAssets.filter(a=>a.productionReady)
export const getPlaceholderAssets=()=>visualAssets.filter(a=>a.status==='placeholder'||a.source==='placeholder')
