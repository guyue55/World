#!/usr/bin/env node
// 用途：检查 M18 作者治理与本地运维文档是否足够可执行。
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const readJson = (file) => JSON.parse(read(file))
const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

const contract = readJson('data/world-kernel/worldos-authoring-ops-governance-v1.json')
const pkg = readJson('package.json')

assert(contract.localOnly === true, 'M18 作者治理必须保持 localOnly=true')
for (const key of ['productionLive', 'releaseReady', 'cleanProductionReady']) {
  assert(contract.releaseStates?.[key] === false, `${key} 必须保持 false`)
}

for (const [key, value] of Object.entries(contract.policies ?? {})) {
  assert(value === true, `M18 policy 必须显式为 true：${key}`)
}

for (const item of contract.requiredDocuments ?? []) {
  assert(fs.existsSync(rel(item.path)), `缺少作者运维文档：${item.path}`)
  if (!fs.existsSync(rel(item.path))) continue
  const source = read(item.path)
  for (const phrase of item.requiredPhrases ?? []) {
    assert(source.includes(phrase), `${item.path} 缺少必要短语：${phrase}`)
  }
  for (const phrase of contract.forbiddenDocumentPhrases ?? []) {
    assert(!source.includes(phrase), `${item.path} 包含禁用短语：${phrase}`)
  }
}

for (const command of contract.requiredCommands ?? []) {
  assert(Boolean(pkg.scripts?.[command]), `package scripts 缺少 M18 必需命令：${command}`)
}

assert(pkg.scripts?.['check:mainline']?.includes('check:authoring-ops'), 'check:mainline 必须纳入 check:authoring-ops')
assert(pkg.scripts?.['check:boundary']?.includes('check:permission-boundary'), 'check:boundary 必须继续包含权限边界')
assert(pkg.scripts?.['release:local-rc']?.includes('run-worldos-local-rc-trust-gate'), 'release:local-rc 必须继续指向本地 RC 信任门禁')

if (failures.length) {
  console.error('WorldOS authoring ops governance check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS authoring ops governance check passed: ${(contract.requiredDocuments ?? []).length} docs`)
