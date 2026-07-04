import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const json = (file) => JSON.parse(read(file))
const failures = []

function requireFile(file) {
  if (!fs.existsSync(rel(file))) failures.push(`缺少文件：${file}`)
}

const rcPath = 'data/world-kernel/worldos-1-release-candidate-v1.json'
const externalPath = 'data/world-kernel/worldos-1-external-evidence-template-v1.json'

for (const file of [
  rcPath,
  externalPath,
  'data/world-kernel/world-kernel-consolidation-v2.json',
  'data/world-kernel/world-kernel-production-evidence-v1.json',
  'docs/10-development-history/world-kernel/worldos-1-release-candidate-v1.md',
  'scripts/run-worldos-preview-smoke.mjs',
  'scripts/write-worldos-external-evidence-template.mjs',
  'vercel.json',
  '.github/workflows/ci.yml',
]) requireFile(file)

if (!failures.length) {
  const rc = json(rcPath)
  const external = json(externalPath)
  const consolidation = json('data/world-kernel/world-kernel-consolidation-v2.json')
  const productionEvidence = json('data/world-kernel/world-kernel-production-evidence-v1.json')
  const pkg = json('package.json')

  if (rc.status !== 'rc-baseline-locked-external-deploy-pending') failures.push('RC 状态必须是 rc-baseline-locked-external-deploy-pending')
  if (rc.phaseProgress?.P0_releaseFreeze !== 'completed') failures.push('P0 发布冻结必须完成')
  if (rc.phaseProgress?.P1_previewDeploy !== 'prepared-external-environment-required') failures.push('P1 必须保持外部环境等待状态')

  for (const key of ['productionLive', 'releaseReady', 'cleanProductionReady']) {
    if (rc.releaseStates?.[key] !== false) failures.push(`${key} 在外部证据缺失前必须为 false`)
    if (external.releaseDecision?.[key] !== false) failures.push(`external template ${key} 必须为 false`)
    if (productionEvidence.releaseDecision?.[key] !== false) failures.push(`production evidence ${key} 必须为 false`)
  }

  if (consolidation.progress?.K5_localProductionEvidence !== 'completed') failures.push('K5-local 必须已完成')
  if (consolidation.progress?.K5_externalProductionEvidence !== 'blocked-external-preview-production-required') failures.push('K5-external 必须保持 blocked')

  const publicRoutes = rc.publicRouteSmokeMatrix ?? []
  const guardedRoutes = rc.guardedRouteSmokeMatrix ?? []
  if (publicRoutes.length < 12) failures.push('公开 smoke matrix 路由不足')
  if (guardedRoutes.length < 4) failures.push('guarded smoke matrix 路由不足')
  for (const route of ['/', '/atlas', '/timeline', '/archive', '/paths', '/ask', '/manifesto', '/world-index.json', '/robots.txt', '/sitemap.xml']) {
    if (!publicRoutes.some((item) => item.route === route)) failures.push(`公开 smoke matrix 缺少 ${route}`)
  }

  for (const script of ['check:worldos-rc', 'smoke:preview', 'smoke:production', 'evidence:worldos-external-template', 'check:release:rc']) {
    if (!pkg.scripts?.[script]) failures.push(`package scripts 缺少 ${script}`)
  }

  for (const page of [
    'src/app/world/page.tsx',
    'src/app/world-map/page.tsx',
    'src/app/time-river/page.tsx',
    'src/app/r2-world/page.tsx',
    'src/app/r3-content-life/page.tsx',
    'src/app/r4-creator/page.tsx',
    'src/app/r5-lighthouse/page.tsx',
    'src/app/r6-service/page.tsx',
    'src/app/r7-evolution/page.tsx',
    'src/app/r8-public/page.tsx',
  ]) {
    const pageSource = read(page)
    if (!pageSource.includes('redirect(')) failures.push(`${page} 必须保持服务端重定向或阻断，不能重新挂载 legacy runtime`)
    if (pageSource.includes('@/components/r8-') || pageSource.includes('@/features/r8-')) {
      failures.push(`${page} 不得重新导入 R8 runtime 组件`)
    }
  }

  const vercel = json('vercel.json')
  if (vercel.framework !== 'nextjs') failures.push('vercel framework 必须为 nextjs')
  if (!String(vercel.buildCommand ?? '').includes('npm run build')) failures.push('vercel buildCommand 必须执行 npm run build')

  const ci = read('.github/workflows/ci.yml')
  for (const token of ['npm run check:release', 'npm run check:worldos-rc', 'npm run evidence:worldos-external-template']) {
    if (!ci.includes(token)) failures.push(`CI 缺少 ${token}`)
  }
  if (ci.includes('npm run check:strict')) failures.push('CI 不应再默认运行超长 legacy check:strict')

  for (const command of ['npm run check:release', 'npm run check:worldos-rc', 'npm run evidence:worldos-external-template']) {
    if (!rc.rcCommandGates?.includes(command)) failures.push(`RC command gates 缺少 ${command}`)
  }
}

if (failures.length) {
  console.error('WorldOS 1.0 RC check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('WorldOS 1.0 RC check passed')
