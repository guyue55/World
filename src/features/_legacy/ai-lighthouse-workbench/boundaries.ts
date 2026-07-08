import { forbiddenLighthouseActions, lighthouseWorkbenchSuggestions } from './data'
import type { LighthouseSuggestion } from './model'
export function isForbiddenLighthouseAction(action: LighthouseSuggestion['action']) { return (forbiddenLighthouseActions as readonly string[]).includes(action) }
export function suggestionRequiresHuman(suggestion: LighthouseSuggestion) { return suggestion.risk === 'high' || isForbiddenLighthouseAction(suggestion.action) || suggestion.humanRequired }
export function getUnsafeLighthouseSuggestions() { return lighthouseWorkbenchSuggestions.filter((suggestion)=>{ if(suggestion.action==='read-private-raw' && suggestion.status!=='rejected') return true; if(isForbiddenLighthouseAction(suggestion.action) && !suggestion.humanRequired) return true; if(suggestion.risk==='high' && suggestion.status!=='requires-audit' && suggestion.status!=='rejected') return true; return false }) }
