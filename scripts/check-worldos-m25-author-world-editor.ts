// 用途：验证 M25 作者世界编辑台 dry-run、只读影响预览和权限边界。
import fs from 'node:fs'
import path from 'node:path'
import {
  authorWorldEditorInvalidDrafts,
  authorWorldEditorSampleDraft,
  getAuthorWorldEditorSummary,
  validateAuthorNodeDraft,
} from '../src/lib/author-world-editor'

const root = process.cwd()
const rel = (file: string) => path.join(root, file)
const reportPath = rel('docs/90-archive/reports/worldos-m25-author-world-editor-report.json')
const failures: string[] = []

function read(file: string) {
  return fs.readFileSync(rel(file), 'utf8')
}

function readJson(file: string) {
  return JSON.parse(read(file))
}

function assert(condition: unknown, message: string) {
  if (!condition) failures.push(message)
}

function walk(dir: string, cb: (file: string, source: string) => void) {
  const absolute = rel(dir)
  if (!fs.existsSync(absolute)) return
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    const fileAbsolute = rel(file)
    if (entry.isDirectory() && entry.name !== '_legacy') walk(file, cb)
    else if (entry.isFile() && /\.(ts|tsx|js|mjs)$/.test(entry.name)) cb(file, read(file))
  }
}

const contractPath = 'data/domains/operations/author-world-editor-dry-run-v1.json'
const contract = readJson(contractPath)
const pkg = readJson('package.json')
const scriptRegistry = readJson('data/world-kernel/worldos-script-legacy-registry-v1.json')
const summary = getAuthorWorldEditorSummary()
const validResult = validateAuthorNodeDraft(authorWorldEditorSampleDraft)
const invalidResults = authorWorldEditorInvalidDrafts.map(validateAuthorNodeDraft)
const statusPage = read('src/app/status/page.tsx')
const statusPanel = read('src/components/status/AuthorWorldEditorPanel.tsx')
const editorLib = read('src/lib/author-world-editor.ts')

assert(contract.name === 'WorldOS M25 作者世界编辑台 dry-run 契约', 'M25 契约名称不正确')
assert(contract.source === 'docs/00-overview/worldos-m25-author-world-editor-spec-2026-07-10.md', 'M25 契约 source 不正确')
assert(contract.scope?.localOnly === true, 'M25 必须 localOnly')
assert(contract.scope?.readonlyPreview === true, 'M25 必须是只读影响预览')
assert(contract.scope?.frontendWritesWorldSource === false, 'M25 前端不得写世界源')
assert(contract.scope?.frontendPermissionAuthority === false, 'M25 前端不得作为权限事实源')
assert(contract.scope?.cloudCms === false, 'M25 不应引入云端 CMS')
assert(contract.authority?.permissionFactSource === 'data contract / server-side checks', 'M25 权限事实源必须来自数据契约或服务端')
assert(contract.featuredGate?.minSummaryLength >= 24, 'M25 精选门禁摘要长度过低')

assert(summary.mode === 'readonly-dry-run', 'M25 summary mode 必须是 readonly-dry-run')
assert(summary.localOnly === true, 'M25 summary 必须 localOnly')
assert(summary.frontendWritesWorldSource === false, 'M25 summary 不得允许前端写源')
assert(summary.frontendPermissionAuthority === false, 'M25 summary 不得允许前端权限事实源')
assert(summary.moduleCount >= 6, `M25 模块数不足：${summary.moduleCount}`)
assert(summary.validation.validDraftPasses === true, 'M25 有效作者草稿必须通过')
assert(summary.validation.invalidDraftsBlocked === authorWorldEditorInvalidDrafts.length, 'M25 无效作者草稿必须全部被阻止')
assert(validResult.valid === true, `有效草稿不应失败：${validResult.issues.map((issue) => issue.id).join(', ')}`)
assert(validResult.featuredAllowed === true, '有效草稿应允许进入精选候选')
for (const scene of ['atlas', 'archive', 'paths', 'timeline', 'lighthouse'] as const) {
  assert(validResult.impactPreview.absorptionScenes.includes(scene), `有效草稿缺少 ${scene} 影响预览`)
}
assert(validResult.impactPreview.absorptionScore >= 5, `有效草稿吸收分不足：${validResult.impactPreview.absorptionScore}`)

const invalidIssueIds = invalidResults.flatMap((result) => result.issues.map((issue) => issue.id))
for (const issueId of ['summary-too-short', 'missing-area', 'permission-authority-invalid']) {
  assert(invalidIssueIds.includes(issueId), `M25 无效草稿未覆盖：${issueId}`)
}
for (const result of invalidResults) {
  assert(result.valid === false || result.featuredAllowed === false, `无效草稿未被阻止：${result.draftId}`)
}

for (const token of ['Author World Editor M25', '只读 dry-run', '权限事实源', '影响预览']) {
  assert(statusPanel.includes(token), `/status M25 面板缺少 token：${token}`)
}
for (const token of ['getAuthorWorldEditorSummary', 'AuthorWorldEditorPanel']) {
  assert(statusPage.includes(token), `/status 页面未接入 M25：${token}`)
}
for (const token of ['validateAuthorNodeDraft', 'authorWorldEditorSampleDraft', 'authorWorldEditorInvalidDrafts', 'frontendWritesWorldSource', 'permissionAuthority']) {
  assert(editorLib.includes(token), `M25 lib 缺少：${token}`)
}

for (const forbidden of contract.acceptance?.forbiddenSourceTokens ?? []) {
  for (const rootDir of ['src/app', 'src/components', 'src/lib']) {
    walk(rootDir, (file, source) => {
      if (file === 'src/lib/author-world-editor.ts' && forbidden === 'writeFileSync(') return
      assert(!source.includes(forbidden), `${file} 包含 M25 禁用源码 token：${forbidden}`)
    })
  }
}

assert(pkg.scripts?.['check:m25-author-world-editor'] === 'tsx scripts/check-worldos-m25-author-world-editor.ts', 'package.json 缺少 check:m25-author-world-editor')
assert(pkg.scripts?.['check:mainline']?.includes('check:m25-author-world-editor'), 'check:mainline 必须纳入 M25')
assert((scriptRegistry.activeEntrypoints ?? []).includes('check:m25-author-world-editor'), '脚本注册表缺少 M25 active entrypoint')
assert((scriptRegistry.recommendedDailyCommands ?? []).includes('npm run check:m25-author-world-editor'), '脚本注册表缺少 M25 daily command')
assert((scriptRegistry.releaseCandidateCommands ?? []).includes('npm run check:m25-author-world-editor'), '脚本注册表缺少 M25 RC command')

const report = {
  generatedAt: new Date().toISOString(),
  status: failures.length ? 'failed' : 'passed',
  stage: 'M25',
  purpose: '作者世界编辑台：用中文草稿 dry-run 证明内容写入前可校验、可预览、可阻止坏草稿。',
  contract: contractPath,
  mode: summary.mode,
  localOnly: summary.localOnly,
  frontendWritesWorldSource: summary.frontendWritesWorldSource,
  frontendPermissionAuthority: summary.frontendPermissionAuthority,
  permissionFactSource: summary.permissionFactSource,
  modules: summary.modules,
  validDraft: {
    draftId: validResult.draftId,
    valid: validResult.valid,
    featuredAllowed: validResult.featuredAllowed,
    issueCount: validResult.issues.length,
    impactPreview: validResult.impactPreview,
  },
  invalidDrafts: invalidResults.map((result) => ({
    draftId: result.draftId,
    valid: result.valid,
    featuredAllowed: result.featuredAllowed,
    issues: result.issues,
  })),
  authorMaintenanceSignal: {
    canPreparePublicNodeWithoutCode: validResult.valid && validResult.featuredAllowed,
    badDraftsBlocked: invalidResults.every((result) => !result.valid || !result.featuredAllowed),
    scenesPreviewed: validResult.impactPreview.absorptionScenes,
    reportPath: path.relative(root, reportPath),
  },
  failures,
}

fs.mkdirSync(path.dirname(reportPath), { recursive: true })
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

if (failures.length) {
  console.error('WorldOS M25 author world editor check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS M25 author world editor check passed: ${summary.moduleCount} modules, ${invalidResults.length} invalid drafts blocked`)
