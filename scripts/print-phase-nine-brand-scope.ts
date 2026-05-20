import contentTopicPillars from '../data/content-topic-pillars.json'
import personalBrandSystem from '../data/personal-brand-system.json'
import phaseNineBrandScopeContract from '../data/phase-nine-brand-scope-contract.json'

function main() {
  console.log(`${phaseNineBrandScopeContract.name}`)
  console.log(`stageProgress=${phaseNineBrandScopeContract.stageProgress}`)
  console.log(`focus=${phaseNineBrandScopeContract.focus.length}`)
  console.log(`brandVoice=${personalBrandSystem.voice.length}`)
  console.log(`visualKeywords=${personalBrandSystem.visualKeywords.length}`)
  console.log(`topicPillars=${contentTopicPillars.pillars.length}`)
}

main()
