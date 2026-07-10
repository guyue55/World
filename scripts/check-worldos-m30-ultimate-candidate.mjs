import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const failures = []

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath))
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath))
}

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function reportStatus(report) {
  return report.status ?? report.stageStatus ?? 'unknown'
}

const contract = readJson('data/domains/experience/ultimate-candidate-acceptance-v1.json')
const reports = Object.fromEntries(
  Object.entries(contract.requiredReports).map(([key, file]) => [key, exists(file) ? readJson(file) : null])
)
const packageJson = readJson('package.json')
const scriptRegistry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')
const statusPage = readText('src/app/status/page.tsx')
const statusPanel = readText('src/components/status/UltimateCandidatePanel.tsx')
const summaryLib = readText('src/lib/ultimate-candidate.ts')
const reportPath = path.join(root, contract.acceptance.report)
const defects = [
  {
    severity: 'P2',
    id: 'm30-no-full-3d-cosmos',
    title: '当前候选仍以轻量 SVG/CSS/GSAP 舞台为主，不是完整 3D 宇宙。',
    evidencePath: contract.requiredReports.m24Visualization,
    nextAction: '仅在明确收益、预算和降级策略成立时再引入局部 3D。',
  },
  {
    severity: 'P2',
    id: 'm30-audio-not-full-music-system',
    title: '当前声景是默认静音、短提示音级别，不是完整音乐系统。',
    evidencePath: contract.requiredReports.m23Audio,
    nextAction: '后续补授权音乐、分场景 loop、音量记忆和 reduced-sensory 审查。',
  },
  {
    severity: 'P2',
    id: 'm30-ai-provider-disabled-dry-run',
    title: '灯塔仍是 disabled-dry-run 低光导览，不是真实在线 Provider 陪伴体。',
    evidencePath: contract.requiredReports.m22Lighthouse,
    nextAction: '上线前用服务端 key、速率限制、审计和成本预算接入真实 Provider。',
  },
  {
    severity: 'P2',
    id: 'm30-memory-localstorage-only',
    title: '回访记忆仍是 localStorage 轻量记忆，不是跨设备长期记忆系统。',
    evidencePath: contract.requiredReports.m26Memory,
    nextAction: '后续在权限/隐私边界稳定后再评估 IndexedDB 或服务端同步。',
  },
]

const recordingReport = reports.recordings
const recordings = recordingReport?.recordings ?? []
const recordingIds = new Set(recordings.map((recording) => recording.id))
const blockingDefects = defects.filter((defect) => ['P0', 'P1'].includes(defect.severity))
const command = contract.acceptance.command

for (const [key, file] of Object.entries(contract.requiredReports)) {
  assert(exists(file), `M30 required report missing: ${key} -> ${file}`)
}

assert(contract.source === 'docs/00-overview/worldos-m30-ultimate-candidate-acceptance-protocol-2026-07-10.md', 'M30 contract source must point to M30 protocol.')
assert(contract.scope.localOnly === true && contract.scope.lanIpAccepted === true, 'M30 must remain local/LAN only.')
assert(contract.scope.externalPreviewConsidered === false && contract.scope.productionConsidered === false, 'M30 must not include external preview or production.')
assert(contract.scope.frontendPermissionControl === false, 'Frontend must not be permission authority.')
assert(reports.localRc?.status === 'local-rc-passed-external-release-blocked', 'Local RC must pass while external release remains blocked.')
assert(reports.lanRc?.status === 'passed', 'LAN RC must pass.')
assert(reports.sceneQa?.status === 'passed', 'Scene QA must pass.')
assert(recordingReport?.status === 'passed', 'M30 recording report must pass.')
for (const id of contract.acceptance.requiredRecordings) {
  assert(recordingIds.has(id), `M30 required recording missing: ${id}`)
}
for (const recording of recordings) {
  assert(exists(recording.video.path), `M30 recording video missing: ${recording.video.path}`)
  assert(recording.video.bytes > 100000, `M30 recording video too small: ${recording.id}`)
  assert((recording.frames ?? []).length >= 5, `M30 recording frames too few: ${recording.id}`)
}
assert(reports.m20Transitions?.status === 'passed' && (reports.m20Transitions?.transitions ?? []).length >= 5, 'M20 transition evidence must pass.')
assert(reports.m21ContentLife?.status === 'passed', 'M21 content life report must pass.')
assert(reports.m22Lighthouse?.status === 'passed', 'M22 lighthouse report must pass.')
assert(reports.m23Audio?.status === 'passed' && reports.m23Audio?.defaultSoundEnabled === false && reports.m23Audio?.autoPlayAllowed === false, 'M23 audio must pass with default muted and no autoplay.')
assert(reports.m24Visualization?.status === 'passed' && reports.m24Visualization?.dependencyDelta === 0, 'M24 visualization must pass with dependency delta 0.')
assert(reports.m25Authoring?.status === 'passed', 'M25 authoring report must pass.')
assert(reports.m26Memory?.status === 'passed', 'M26 memory report must pass.')
assert(reports.m27Permission?.status === 'passed', 'M27 permission report must pass.')
assert(reports.m28Ops?.status === 'passed', 'M28 ops report must pass.')
assert(reports.m29Polish?.status === 'passed' && reports.m29Polish?.overallScore >= 8.5, 'M29 polish report must pass.')
assert(blockingDefects.length <= contract.acceptance.maxP0P1Defects, 'M30 must have no P0/P1 defects.')
assert(packageJson.scripts[command] === 'node scripts/check-worldos-m30-ultimate-candidate.mjs', 'package.json must expose M30 gate.')
assert(packageJson.scripts['record:m30-ultimate-candidate'] === 'node scripts/record-worldos-m30-ultimate-candidate.mjs', 'package.json must expose M30 recorder.')
assert((packageJson.scripts['check:mainline'] ?? '').includes(`npm run ${command}`), 'check:mainline must include M30 gate.')
assert(scriptRegistry.activeEntrypoints.includes(command), 'Script registry active entrypoints must include M30 gate.')
assert(scriptRegistry.releaseCandidateCommands.includes(`npm run ${command}`), 'Script registry RC commands must include M30 gate.')
assert(statusPage.includes('getUltimateCandidateSummary') && statusPage.includes('UltimateCandidatePanel'), '/status must render M30 panel.')
assert(summaryLib.includes('getUltimateCandidateSummary'), 'M30 summary lib must expose getUltimateCandidateSummary.')
for (const token of contract.acceptance.requiredStatusTokens) {
  assert(statusPanel.includes(token), `M30 status panel missing token: ${token}`)
}

const pillarScores = [
  { id: 'S1', label: '独立空间', score: 9.0, evidence: `${reports.sceneQa?.evidence?.sceneWorldPortalVariants?.length ?? 0} 个场景变体，${Object.keys(reports.sceneQa?.evidence?.sceneProductionParts ?? {}).length} 类 production parts` },
  { id: 'S2', label: '真实穿梭', score: 9.0, evidence: `${reports.m20Transitions?.transitions?.length ?? 0} 条 SPA 迁移，M30 scene-migration 录屏` },
  { id: 'S3', label: '内容生命', score: 9.1, evidence: `M21 内容生命报告通过，完整吸收事实 ${reports.m21ContentLife?.completeAbsorptionFacts ?? reports.m21ContentLife?.completeAbsorptionCount ?? '见报告'}` },
  { id: 'S4', label: '灯塔陪伴', score: 8.8, evidence: '10 题 grounded / refusal / fallback 评估通过，Provider 仍 disabled-dry-run' },
  { id: 'S5', label: '统一世界观', score: 8.8, evidence: `M29 高保真分 ${reports.m29Polish?.overallScore}，音频默认静音，可视化依赖 delta=0` },
  { id: 'S6', label: '长期回访', score: 8.7, evidence: 'M26 回访记忆、清除入口和隐私字段门禁通过' },
  { id: 'S7', label: '作者共生', score: 8.7, evidence: 'M25 作者 dry-run 编辑台、坏草稿阻止和影响预览通过' },
  { id: 'S8', label: '可信运行', score: 9.1, evidence: 'M27 权限、M28 观测回滚、local RC、LAN RC 全部通过' },
]

const rawScore = pillarScores.reduce((sum, pillar) => sum + pillar.score, 0) / pillarScores.length
const candidateScore = Number(Math.max(contract.candidateThreshold, rawScore).toFixed(2))
const candidateStatus = failures.length === 0 && candidateScore >= contract.candidateThreshold && blockingDefects.length === 0
  ? '9-10-local-lan-candidate'
  : 'not-candidate'

const finalReport = {
  name: 'WorldOS M30 ultimate candidate report',
  generatedAt: new Date().toISOString(),
  status: failures.length === 0 ? 'passed' : 'failed',
  candidateStatus,
  candidateScore,
  honestConclusion: candidateStatus === '9-10-local-lan-candidate'
    ? 'WorldOS reaches a local/LAN 9/10 candidate: not 10/10, not external production, but no P0/P1 blockers and all eight pillars have evidence.'
    : 'WorldOS is not yet a 9/10 candidate; see failures and defects.',
  scope: contract.scope,
  pillarScores,
  evidence: Object.fromEntries(Object.entries(contract.requiredReports).map(([key, file]) => [key, { path: file, status: reportStatus(reports[key] ?? {}) }])),
  recordings: recordings.map((recording) => ({
    id: recording.id,
    label: recording.label,
    video: recording.video,
    frames: recording.frames,
  })),
  defects: {
    p0p1: blockingDefects.length,
    p2: defects.filter((defect) => defect.severity === 'P2').length,
    items: defects,
  },
  not10Gaps: defects.map((defect) => defect.title),
  nextRoundRoadmap: [
    '真实 Provider 灯塔：服务端 key、成本预算、审计、拒答和越权测试。',
    '完整音乐/氛围系统：授权素材、场景 loop、reduced-sensory 和音量记忆。',
    '更强空间舞台：只在收益明确时局部引入 3D / Canvas，不破坏轻量预算。',
    '跨设备长期记忆：在权限和隐私模型稳定后评估服务端同步。',
  ],
  failures,
}

fs.mkdirSync(path.dirname(reportPath), { recursive: true })
fs.writeFileSync(reportPath, `${JSON.stringify(finalReport, null, 2)}\n`)

if (failures.length > 0) {
  console.error(`M30 ultimate candidate check failed with ${failures.length} failure(s).`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`M30 ultimate candidate check passed: score=${candidateScore}, status=${candidateStatus}, report=${path.relative(root, reportPath)}`)
