import guard from '../data/stage-completion-transition-guard.json'
import certificateTemplate from '../data/stage-completion-certificate-template.json'

function main() {
  console.log(`${guard.name}`)
  console.log(`transition=${guard.from} -> ${guard.to}`)
  console.log(`requiredReport=${guard.requiredReport}`)
  console.log(`certificateFields=${certificateTemplate.fields.length}`)
}

main()
