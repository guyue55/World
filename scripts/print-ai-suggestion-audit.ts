import aiSuggestionAuditContract from '../data/ai-suggestion-audit-contract.json'
import aiSuggestionAuditQueue from '../data/ai-suggestion-audit-queue.json'

function main() {
  console.log(`${aiSuggestionAuditContract.name}`)
  console.log(`stageProgress=${aiSuggestionAuditContract.stageProgress}`)
  console.log(`suggestionTypes=${aiSuggestionAuditContract.suggestionTypes.length}`)
  console.log(`queue=${aiSuggestionAuditQueue.items.length}`)
  console.log(`executed=${aiSuggestionAuditQueue.items.filter((item) => item.execution !== 'not-executed').length}`)
}

main()
