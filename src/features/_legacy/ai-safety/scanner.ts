import { aiSuggestionWorkflows } from '@/features/_legacy/ai-workflow'
import { aiForbiddenActions } from './data'
export const scanTextForForbiddenAiActions=(text:string)=>{const lower=text.toLowerCase(); return aiForbiddenActions.filter(action=>lower.includes(action))}
export const getUnsafeAiWorkflows=()=>aiSuggestionWorkflows.filter(w=>{const haystack=`${w.id} ${w.title} ${w.description}`.toLowerCase(); const forbidden=scanTextForForbiddenAiActions(haystack); if(w.status==='rejected') return false; return forbidden.length>0})
export const assertAiWorkflowBoundary=()=>aiSuggestionWorkflows.every(w=>w.autoExecute===false)
