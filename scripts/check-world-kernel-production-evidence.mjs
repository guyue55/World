import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const json = (file) => JSON.parse(read(file))
const failures = []

const evidencePath = 'data/world-kernel/world-kernel-production-evidence-v1.json'
const consolidationPath = 'data/world-kernel/world-kernel-consolidation-v2.json'

if (!fs.existsSync(rel(evidencePath))) failures.push(`缺少生产证据台账：${evidencePath}`)
if (!fs.existsSync(rel(consolidationPath))) failures.push(`缺少内核收束 v2 注册表：${consolidationPath}`)

function requireFile(file, label = file) {
  if (!fs.existsSync(rel(file))) failures.push(`缺少 ${label}：${file}`)
}

if (!failures.length) {
  const evidence = json(evidencePath)
  const consolidation = json(consolidationPath)

  if (evidence.status !== 'local-evidence-complete-external-evidence-blocked') {
    failures.push('production evidence status 必须是 local-evidence-complete-external-evidence-blocked')
  }
  if (evidence.localEvidence?.status !== 'completed') failures.push('localEvidence.status 必须为 completed')
  if (evidence.externalEvidence?.status !== 'blocked-until-real-environment') {
    failures.push('externalEvidence.status 必须显式标记 blocked-until-real-environment')
  }

  for (const key of ['productionLive', 'releaseReady', 'cleanProductionReady']) {
    if (evidence.releaseDecision?.[key] !== false) failures.push(`${key} 在外部证据缺失前必须保持 false`)
    if (!evidence.externalEvidence?.mustRemainFalseBeforeEvidence?.includes(key)) {
      failures.push(`externalEvidence.mustRemainFalseBeforeEvidence 缺少 ${key}`)
    }
  }

  const requiredExternalItems = [
    'Preview URL 可访问',
    'Production URL 可访问',
    '线上 smoke test 通过',
    '域名 HTTPS 验证完成',
    '人工签收完成',
    '真实回滚演练完成',
  ]
  for (const item of requiredExternalItems) {
    if (!evidence.externalEvidence?.requiredItems?.includes(item)) failures.push(`外部证据清单缺少：${item}`)
  }

  const requiredCommands = [
    'npm ci',
    'npm run check:world-kernel-production',
    'npm run smoke:kernel-local',
    'npm run check:release',
  ]
  for (const command of requiredCommands) {
    if (!evidence.localEvidence?.commandGates?.includes(command)) failures.push(`本地门禁清单缺少：${command}`)
  }

  const requiredArtifacts = [
    'public/world-index.json',
    'public/world-manifest.json',
  ]
  for (const artifact of requiredArtifacts) requireFile(artifact, '公开静态产物')

  for (const file of [
    'middleware.ts',
    'src/lib/product-routes.ts',
    'src/lib/world-kernel-boundary.ts',
    'src/app/sitemap.ts',
    'src/app/robots.ts',
    '.github/workflows/ci.yml',
    '.env.example',
    'vercel.json',
    'scripts/run-world-kernel-local-smoke.mjs',
    'scripts/write-world-kernel-local-evidence.mjs',
  ]) requireFile(file)

  const middleware = read('middleware.ts')
  if (!middleware.includes('getWorldKernelRouteDecision')) failures.push('middleware 必须继续使用 World Kernel route decision')

  const productRoutes = read('src/lib/product-routes.ts')
  for (const route of evidence.localEvidence.localSmokeRoutes.filter((route) => !route.includes(':'))) {
    if (route !== '/' && !productRoutes.includes(`'${route}'`)) failures.push(`product-routes 缺少 local smoke route：${route}`)
  }

  const sitemap = read('src/app/sitemap.ts')
  const robots = read('src/app/robots.ts')
  if (!sitemap.includes('PRODUCT_PUBLIC_ROUTES')) failures.push('sitemap 必须从 PRODUCT_PUBLIC_ROUTES 派生')
  if (!robots.includes('PRODUCT_PRIVATE_ROUTES') || !robots.includes('PRODUCT_INTERNAL_EXACT_ROUTES')) {
    failures.push('robots 必须同时阻止 private 与 internal routes')
  }

  if (consolidation.progress?.K5_localProductionEvidence !== 'completed') {
    failures.push('consolidation v2 必须标记 K5_localProductionEvidence completed')
  }
  if (consolidation.progress?.K5_externalProductionEvidence !== 'blocked-external-preview-production-required') {
    failures.push('consolidation v2 必须标记 K5_externalProductionEvidence blocked')
  }
  if (consolidation.productionEvidence?.registry !== evidencePath) failures.push('consolidation v2 未指向生产证据台账')
}

if (failures.length) {
  console.error('World Kernel production evidence check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('World Kernel production evidence check passed')
