import { visualAssets } from './data'
export type AssetGap = { id:string; assetId:string; reason:string; replacementPlan:string; priority:'low'|'medium'|'high' }
export const assetGaps: AssetGap[] = visualAssets.filter(a=>a.status==='placeholder'||a.source==='placeholder').map(a=>({id:`${a.id}-gap`,assetId:a.id,reason:'当前仍为 placeholder，不能作为生产素材。',replacementPlan:'第四轮或真实素材采集线中替换为原创 SVG、授权摄影或项目内生成图。',priority:a.usage==='hero'?'high':'medium'}))
export const getHighPriorityAssetGaps=()=>assetGaps.filter(g=>g.priority==='high')
export const assertNoPlaceholderProductionReady=()=>visualAssets.every(a=>!(a.source==='placeholder'&&a.productionReady))
