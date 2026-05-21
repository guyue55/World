import type { AiSuggestionWorkflow } from './model'
export const aiSuggestionWorkflows: AiSuggestionWorkflow[] = [
 { id:'draft-content-path', title:'生成公开内容阅读路径草稿', status:'draft', risk:'medium', source:'public-content', humanRequired:true, autoExecute:false, description:'基于公开内容 seed 生成阅读路径草稿，不自动发布。' },
 { id:'flag-privacy-risk', title:'提示公开内容隐私风险', status:'review', risk:'high', source:'redacted-metadata', humanRequired:true, autoExecute:false, description:'仅基于脱敏元数据提示风险，不读取私密原始内容。' },
 { id:'suggest-asset-gap', title:'建议素材缺口优先级', status:'draft', risk:'low', source:'public-content', humanRequired:false, autoExecute:false, description:'根据 asset gap 生成优先级建议。' },
 { id:'private-raw-request', title:'拒绝私密原始内容读取', status:'rejected', risk:'high', source:'redacted-metadata', humanRequired:true, autoExecute:false, description:'任何读取私密原始内容的请求都必须拒绝。' },
]
export const getHumanRequiredWorkflows=()=>aiSuggestionWorkflows.filter(w=>w.humanRequired||w.risk==='high')
export const getExecutableWorkflows=()=>aiSuggestionWorkflows.filter(w=>w.autoExecute)
