// 用途：检查阶段完成转换
import fs from 'node:fs'
import path from 'node:path'
import guard from '../data/versions/archive/stage-completion-transition-guard.json'
import certificateTemplate from '../data/versions/archive/stage-completion-certificate-template.json'

function main() {
  const errors: string[] = []

  if (guard.from !== 'not-yet-complete' || guard.to !== 'complete') {
    errors.push('invalid stage completion transition')
  }

  if (guard.requiredDecision !== 'complete') {
    errors.push('requiredDecision must be complete')
  }

  if (!fs.existsSync(path.join(process.cwd(), 'scripts/apply-stage-completion.mjs'))) {
    errors.push('missing apply-stage-completion.mjs')
  }

  ;['generatedAt', 'stage', 'decision', 'sourceReport', 'evidenceSummary', 'signature'].forEach((field) => {
    if (!certificateTemplate.fields.includes(field)) {
      errors.push(`certificate template missing field: ${field}`)
    }
  })

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Stage completion transition check passed.')
}

main()
