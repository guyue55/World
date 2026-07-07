import inheritanceExportPlan from '../data/domains/archive/inheritance-export-plan.json'
import timeCapsuleAnnualBookPlan from '../data/domains/archive/time-capsule-annual-book-plan.json'

function main() {
  console.log(`${timeCapsuleAnnualBookPlan.name}`)
  console.log(`stageProgress=${timeCapsuleAnnualBookPlan.stageProgress}`)
  console.log(`capsules=${timeCapsuleAnnualBookPlan.timeCapsules.length}`)
  console.log(`annualSections=${timeCapsuleAnnualBookPlan.annualWorldBook.sections.length}`)
  console.log(`packages=${inheritanceExportPlan.packages.length}`)
  console.log(`packagesWithPrivate=${inheritanceExportPlan.packages.filter((item) => item.containsPrivate).length}`)
}

main()
