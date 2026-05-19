import contract from '../data/final-closure-report-contract.json'
import decision from '../data/phase-one-final-decision-template.json'
function main() {
  console.log(`${contract.name}`)
  console.log(`status=${contract.status}`)
  console.log(`output=${contract.output}`)
  console.log(`inputReports=${contract.inputReports.length}`)
  console.log(`currentDecision=${decision.currentDecision}`)
}
main()
