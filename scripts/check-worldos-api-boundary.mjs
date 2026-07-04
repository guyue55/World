import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const read = (file) => fs.readFileSync(rel(file), 'utf-8')
const readJson = (file) => JSON.parse(read(file))
const failures = []

function walk(dir) {
  const start = rel(dir)
  if (!fs.existsSync(start)) return []
  const out = []
  const stack = [start]
  while (stack.length) {
    const current = stack.pop()
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) stack.push(full)
      else if (entry.isFile() && full.endsWith('/route.ts')) out.push(path.relative(root, full).replaceAll(path.sep, '/'))
    }
  }
  return out.sort()
}

function parseRoutePath(file) {
  const normalized = file.replace(/^src\/app/, '').replace(/\/route\.ts$/, '')
  return normalized === '' ? '/' : normalized
}

function detectRoute(file) {
  const source = read(file)
  const methods = [...source.matchAll(/export\s+(?:async\s+)?function\s+(GET|POST|PUT|PATCH|DELETE)/g)].map((match) => match[1])
  return {
    file,
    path: parseRoutePath(file),
    methods,
    source,
    ownerGuarded: source.includes('requireOwner('),
    permissionGuarded: source.includes('requirePermission('),
    mutating: methods.some((method) => method !== 'GET'),
    noStore: source.includes('no-store'),
    forceStatic: source.includes("dynamic = 'force-static'"),
    productionWriteSignal: /writeFile|appendFile|unlink|rm\(|create\(|delete\(|update\(|insert\(/.test(source),
    runtimeMutationSignal: /runtimeNodes\s*=|\.push\(|\.splice\(|\.set\(/.test(source),
  }
}

const registry = readJson('data/world-kernel/worldos-api-boundary-registry-v1.json')
const allowed = new Set(registry.allowedClassifications ?? [])
const actualRoutes = walk('src/app/api').map(detectRoute)
const actualByFile = new Map(actualRoutes.map((route) => [route.file, route]))
const actualByPath = new Map(actualRoutes.map((route) => [route.path, route]))
const registeredRoutes = registry.routes ?? []
const registeredByFile = new Map(registeredRoutes.map((route) => [route.file, route]))
const registeredByPath = new Map(registeredRoutes.map((route) => [route.path, route]))

for (const route of actualRoutes) {
  if (!registeredByFile.has(route.file)) failures.push(`API route 未进入注册表：${route.file}`)
  if (!registeredByPath.has(route.path)) failures.push(`API path 未进入注册表：${route.path}`)
}

for (const route of registeredRoutes) {
  const actual = actualByFile.get(route.file)
  if (!actual) {
    failures.push(`注册表中的 API 文件不存在：${route.file}`)
    continue
  }

  if (route.path !== actual.path) failures.push(`API path 不一致：${route.file} 注册=${route.path} 实际=${actual.path}`)
  if (!allowed.has(route.classification)) failures.push(`API classification 非法：${route.path} -> ${route.classification}`)
  if (route.status !== 'active' && route.status !== 'deprecated' && route.status !== 'forbidden') failures.push(`API status 非法：${route.path} -> ${route.status}`)

  const expectedMethods = [...(route.methods ?? [])].sort().join(',')
  const actualMethods = [...actual.methods].sort().join(',')
  if (expectedMethods !== actualMethods) failures.push(`API methods 不一致：${route.path} 注册=${expectedMethods} 实际=${actualMethods}`)

  if (route.classification === 'owner-only' && !actual.ownerGuarded) failures.push(`owner-only API 缺少 requireOwner：${route.path}`)
  if (route.classification === 'permission-guarded' && !actual.permissionGuarded) failures.push(`permission-guarded API 缺少 requirePermission：${route.path}`)
  if (route.classification === 'public-read' || route.classification === 'static-safe-public') {
    if (actual.mutating) failures.push(`公开 API 不允许暴露写入方法：${route.path} -> ${actual.methods.join(',')}`)
    if (actual.ownerGuarded || actual.permissionGuarded) failures.push(`公开 API 不应同时注册守门 classification：${route.path}`)
  }
  if (actual.mutating && !(actual.ownerGuarded || actual.permissionGuarded)) failures.push(`写入型 API 缺少服务端守门：${route.path}`)
  if (route.productionWrite !== false) failures.push(`当前 RC API 不允许声明 productionWrite=true：${route.path}`)
  if (route.requiresRealAI !== false) failures.push(`当前 RC API 不允许依赖真实 AI：${route.path}`)
  if (route.requiresDatabase !== false) failures.push(`当前 RC API 不允许依赖真实数据库：${route.path}`)
  if ((actual.runtimeMutationSignal || actual.productionWriteSignal) && route.classification === 'public-read') failures.push(`存在写入信号的 API 不能注册为 public-read：${route.path}`)
  if (route.guard === 'requireOwner' && !actual.ownerGuarded) failures.push(`guard 字段与代码不一致：${route.path} 需要 requireOwner`)
  if (route.guard === 'requirePermission' && !actual.permissionGuarded) failures.push(`guard 字段与代码不一致：${route.path} 需要 requirePermission`)
}

const summary = registry.summary ?? {}
if (summary.totalRoutes !== registeredRoutes.length) failures.push(`summary.totalRoutes 与注册 routes 数不一致：${summary.totalRoutes} vs ${registeredRoutes.length}`)
if (actualRoutes.length !== registeredRoutes.length) failures.push(`实际 API 路由数量与注册数量不一致：${actualRoutes.length} vs ${registeredRoutes.length}`)
if (registry.policies?.middlewareApiExclusionRequiresRegistry !== true) failures.push('registry policies 必须声明 middlewareApiExclusionRequiresRegistry=true')
if (registry.policies?.frontendVisibilityIsNotPermission !== true) failures.push('registry policies 必须声明 frontendVisibilityIsNotPermission=true')

if (failures.length) {
  console.error('WorldOS API boundary check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS API boundary check passed: ${actualRoutes.length} API routes registered and guarded`)
