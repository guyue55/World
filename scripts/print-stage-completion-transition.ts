import guard from '../data/versions/archive/stage-completion-transition-guard.json'
import certificateTemplate from '../data/versions/archive/stage-completion-certificate-template.json'

function main() {
  console.log(`${guard.name}`)
  console.log(`transition=${guard.from} -> ${guard.to}`)
  console.log(`requiredReport=${guard.requiredReport}`)
  console.log(`certificateFields=${certificateTemplate.fields.length}`)
}

main()
