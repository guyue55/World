import aiWorkbenchImplementationContract from '../data/domains/ai/ai-workbench-implementation-contract.json'
import aiWorkbenchSuggestions from '../data/domains/ai/ai-workbench-suggestions.json'

function main() {
  console.log(`${aiWorkbenchImplementationContract.name}`)
  console.log(`stageProgress=${aiWorkbenchImplementationContract.stageProgress}`)
  console.log(`route=${aiWorkbenchImplementationContract.route}`)
  console.log(`suggestions=${aiWorkbenchSuggestions.suggestions.length}`)
  console.log(`draft=${aiWorkbenchSuggestions.suggestions.filter((item) => item.status === 'draft').length}`)
}

main()
