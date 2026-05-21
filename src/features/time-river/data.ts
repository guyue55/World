import type { TimeRiverEvent } from './model'
export const timeRiverEventsV2: TimeRiverEvent[] = [
 { id:'v1', version:'V1', title:'世界骨架', description:'世界观、信息架构、内容协议与基础页面。', type:'version', status:'complete', order:1, href:'/v1' },
 { id:'v2', version:'V2', title:'服务骨架', description:'权限、审计、私密档案服务与多端协作骨架。', type:'version', status:'complete', order:2, href:'/v2-console' },
 { id:'v3', version:'V3', title:'智能宇宙', description:'AI 工作台、内容生长、年度世界册与宇宙地图。', type:'version', status:'complete', order:3, href:'/v3-universe' },
 { id:'v4', version:'V4', title:'协作生态', description:'多人协作、插件生态、发布网络与平台治理。', type:'version', status:'complete', order:4, href:'/v4' },
 { id:'v5', version:'V5', title:'联邦运行态', description:'多世界连接、多 Agent 编排、观测与迁移。', type:'version', status:'complete', order:5, href:'/v5' },
 { id:'v6', version:'V6', title:'个人文明 OS', description:'多世界网络、Agent Society、记忆图谱和开放协议。', type:'version', status:'complete', order:6, href:'/v6' },
 { id:'round1', version:'R1', title:'第一轮封版', description:'word-life 长期仓库建立、文档分层、体验入口兑现。', type:'release', status:'complete', order:7, href:'/release' },
 { id:'round2-00', version:'R2-00', title:'第二轮开工契约', description:'基线冻结、目录边界、门禁骨架与第二轮计划。', type:'decision', status:'complete', order:8, href:'/time-river' },
 { id:'round2-stage1', version:'R2-S1', title:'视觉基底', description:'视觉 token、首页宇宙化、背景光影和空间卡片。', type:'experience', status:'complete', order:9, href:'/' },
 { id:'round2-stage2', version:'R2-S2', title:'世界地图', description:'世界节点模型、星图导航、桌面/移动双模式。', type:'experience', status:'complete', order:10, href:'/world-map' },
 { id:'round2-stage3', version:'R2-S3', title:'内容星图', description:'内容节点关系、三视图、相关推荐和脱敏边界。', type:'experience', status:'complete', order:11, href:'/constellation' },
]
export function getOrderedTimeRiverEvents(){ return [...timeRiverEventsV2].sort((a,b)=>a.order-b.order) }
