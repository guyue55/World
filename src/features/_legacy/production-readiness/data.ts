import type { ProductionGate } from './model'
export const productionGates: ProductionGate[] = [
 { id:'local-build', title:'本地构建', type:'build', status:'passed', evidence:'第二轮封版 npm run build 已通过；第三轮封版需复跑。', requiredForProduction:true },
 { id:'preview-deploy', title:'预览部署', type:'preview', status:'pending', evidence:'需要真实平台预览 URL 和 smoke 结果。', requiredForProduction:true },
 { id:'manual-privacy-signoff', title:'人工隐私签收', type:'privacy', status:'pending', evidence:'需要人工确认公开页面不泄露私密原始内容。', requiredForProduction:true },
 { id:'asset-placeholder-signoff', title:'素材占位签收', type:'assets', status:'pending', evidence:'placeholder 不得标记为 productionReady，生产前需替换或人工签收。', requiredForProduction:true },
 { id:'secret-policy-check', title:'密钥策略检查', type:'secrets', status:'passed', evidence:'第三轮只保留 env-only contract，不提交真实 key。', requiredForProduction:true },
 { id:'rollback-plan', title:'回滚计划', type:'rollback', status:'passed', evidence:'仓库内记录回滚策略和 Git 基线。', requiredForProduction:true },
]
export const getBlockedProductionGates=()=>productionGates.filter(g=>g.status==='blocked')
export const getPendingProductionGates=()=>productionGates.filter(g=>g.status==='pending')
export const isProductionLiveAllowed=()=>productionGates.every(g=>!g.requiredForProduction||g.status==='passed')
