import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const template = JSON.parse(fs.readFileSync(rel('data/world-kernel/worldos-1-external-evidence-template-v1.json'), 'utf-8'))
const rc = JSON.parse(fs.readFileSync(rel('data/world-kernel/worldos-1-release-candidate-v1.json'), 'utf-8'))

const report = {
  generatedAt: new Date().toISOString(),
  timezone: 'America/Chicago',
  source: 'scripts/write-worldos-external-evidence-template.mjs',
  status: 'external-evidence-template-generated-real-environment-required',
  rc: {
    version: rc.version,
    status: rc.status,
    baseline: rc.baseline,
    releaseStates: rc.releaseStates,
  },
  template,
  nextAction: [
    '部署真实 Preview URL',
    '设置 PREVIEW_URL 并执行 npm run smoke:preview',
    '部署真实 Production URL',
    '设置 PRODUCTION_URL 并执行 npm run smoke:production',
    '补齐 Web Vitals / Accessibility / HTTPS / rollback / manual signoff 证据',
  ],
}

const out = rel('docs/90-archive/reports/worldos-external-evidence-template.json')
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`, 'utf-8')
console.log(`WorldOS external evidence template written: ${path.relative(root, out)}`)
