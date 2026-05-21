import type { AiAdapterContract } from './model'
export const aiAdapterContracts: AiAdapterContract[] = [{ id:'default-ai-lighthouse-contract', mode:'mock', permissions:['read-public','read-redacted-metadata','draft-suggestion','flag-risk'], forbidden:['publish','delete','change-visibility','read-private-raw'], envKeys:['AI_PROVIDER','AI_API_KEY'] }]
