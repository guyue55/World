import inheritanceExportPlan from '../../data/domains/archive/inheritance-export-plan.json'
import timeCapsuleAnnualBookPlan from '../../data/domains/archive/time-capsule-annual-book-plan.json'

export function getTimeCapsuleAnnualBookPlan() {
  return timeCapsuleAnnualBookPlan
}

export function getInheritanceExportPlan() {
  return inheritanceExportPlan
}

export function getPhaseFiveInheritanceSummary() {
  return {
    stageProgress: timeCapsuleAnnualBookPlan.stageProgress,
    capsules: timeCapsuleAnnualBookPlan.timeCapsules.length,
    annualSections: timeCapsuleAnnualBookPlan.annualWorldBook.sections.length,
    packages: inheritanceExportPlan.packages.length,
    packagesWithPrivateContent: inheritanceExportPlan.packages.filter((item) => item.containsPrivate).length,
    confirmationRequired: inheritanceExportPlan.packages.filter((item) => item.confirmationRequired).length,
  }
}
