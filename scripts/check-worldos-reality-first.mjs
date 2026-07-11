import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const root = process.cwd()
const failures = []
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath))
const contract = readJson('data/domains/experience/reality-first-route-contract.json')
const packageJson = readJson('package.json')
const pointerPath = 'docs/90-archive/reports/worldos-reality-first/latest-evidence.json'

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function latestMtime(relativeRoots) {
  let latest = 0
  const visit = (absolutePath) => {
    if (!fs.existsSync(absolutePath)) return
    const stat = fs.statSync(absolutePath)
    if (stat.isDirectory()) for (const child of fs.readdirSync(absolutePath)) visit(path.join(absolutePath, child))
    else latest = Math.max(latest, stat.mtimeMs)
  }
  relativeRoots.forEach((relativePath) => visit(path.join(root, relativePath)))
  return latest
}

function visibleCopyLine(line, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const withoutExpressions = line.replace(/\{[^{}]*\}/g, '')
  return new RegExp(`>[^<]*${escaped}[^<]*<`).test(withoutExpressions) || new RegExp(`(?:title|label|description|caption|note)=?[{]?['\"][^'\"]*${escaped}`, 'i').test(line)
}

const control = spawnSync(process.execPath, ['scripts/check-worldos-reality-first-control.mjs'], { cwd: root, encoding: 'utf8' })
assert(control.status === 0, `冻结控制锁失败：${control.stderr || control.stdout}`)

const requiredRoutes = [
  'src/app/page.tsx',
  'src/app/atlas/page.tsx',
  'src/app/timeline/page.tsx',
  'src/app/archive/page.tsx',
  'src/app/paths/[id]/page.tsx',
  'src/app/node/[slug]/page.tsx',
  'src/app/ask/page.tsx',
]
requiredRoutes.forEach((file) => assert(exists(file), `核心 route 缺失：${file}`))

const forbiddenLegacyFiles = [
  'src/components/world/SceneWorldPortal.tsx',
  'src/components/world/SceneProductionFrame.tsx',
  'src/components/world/SceneDeepInteractionPanel.tsx',
  'src/components/product/ProductRouteGuide.tsx',
]
forbiddenLegacyFiles.forEach((file) => assert(!exists(file), `旧模板仍在 active source：${file}`))

const activeSources = []
for (const sourceRoot of ['src/app', 'src/components']) {
  const visit = (absolutePath) => {
    const stat = fs.statSync(absolutePath)
    if (stat.isDirectory()) {
      if (absolutePath.includes(`${path.sep}_legacy`) || absolutePath.includes(`${path.sep}status`)) return
      fs.readdirSync(absolutePath).forEach((child) => visit(path.join(absolutePath, child)))
    } else if (/\.(?:ts|tsx)$/.test(absolutePath)) activeSources.push(absolutePath)
  }
  visit(path.join(root, sourceRoot))
}

const legacyNames = ['SceneWorldPortal', 'SceneProductionFrame', 'SceneDeepInteractionPanel', 'ProductRouteGuide']
const publicCopy = [...contract.forbiddenPublicCopy, '降级规则', '验收报告']
for (const absolutePath of activeSources) {
  const relativePath = path.relative(root, absolutePath)
  const lines = fs.readFileSync(absolutePath, 'utf8').split(/\r?\n/)
  lines.forEach((line, index) => {
    legacyNames.forEach((name) => assert(!new RegExp(`(?:import|export).*${name}`).test(line), `${relativePath}:${index + 1} 仍引用 ${name}`))
    publicCopy.forEach((phrase) => assert(!visibleCopyLine(line, phrase), `${relativePath}:${index + 1} 公开文案包含 ${phrase}`))
  })
}

const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies }
for (const dependency of ['three', '@react-three/fiber', 'd3', 'xstate', 'howler', 'tone']) assert(!dependencies[dependency], `未经 ADR 引入重运行时：${dependency}`)
assert(packageJson.scripts?.['world:author'] === 'tsx scripts/world-author.mjs', 'world:author 入口不正确')
assert(packageJson.scripts?.['audit:world-experience'] === 'node scripts/audit-worldos-reality-first.mjs', 'audit:world-experience 入口不正确')
assert(packageJson.scripts?.['check:world-experience'] === 'node scripts/check-worldos-reality-first.mjs', 'check:world-experience 入口不正确')
assert(packageJson.scripts?.['evidence:world-experience'] === 'node scripts/evidence-worldos-reality-first.mjs', 'evidence:world-experience 入口不正确')
assert(packageJson.scripts?.['check:mainline']?.includes('npm run check:world-experience'), 'check:mainline 未接入真实世界门禁')

const atlasSource = fs.readFileSync(path.join(root, 'src/components/atlas/AtlasExplorationStage.tsx'), 'utf8')
const timelineSource = fs.readFileSync(path.join(root, 'src/components/timeline/TimelineRiverStage.tsx'), 'utf8')
assert(atlasSource.includes("import('gsap')") && timelineSource.includes("import('gsap')"), 'Atlas / Timeline 动画未延迟加载')
assert(atlasSource.includes('visibilitychange') && timelineSource.includes('visibilitychange'), 'Atlas / Timeline 未处理页面隐藏暂停')
assert(!/canvas|getContext\(|devicePixelRatio/.test(atlasSource + timelineSource), 'Atlas / Timeline 当前应保持 SVG 路径；若改 Canvas 必须实现 DPR cap')
assert(exists('src/components/atlas/AtlasSceneSvg.tsx') && exists('src/components/timeline/TimelineRiverPath.tsx'), 'Atlas / Timeline SVG 主体缺失')

const sceneRegistry = readJson('data/assets/world-scene-assets.json')
for (const scene of contract.spaces) {
  const asset = sceneRegistry.assets?.find((item) => item.sceneId === scene.id)
  assert(asset, `${scene.id} 场景资产未登记`)
  for (const mode of ['desktop', 'mobile']) {
    const file = asset?.[mode]?.src?.replace(/^\//, '')
    assert(file && exists(`public/${file}`), `${scene.id} ${mode} 场景资产缺失`)
    if (file && exists(`public/${file}`)) {
      const bytes = fs.statSync(path.join(root, 'public', file)).size
      assert(bytes <= (mode === 'mobile' ? 350 : 700) * 1024, `${scene.id} ${mode} 资产 ${bytes} 超预算`)
    }
  }
}

assert(exists(pointerPath), '缺少 latest fresh evidence 指针；先运行 npm run evidence:world-experience')
if (exists(pointerPath)) {
  const pointer = readJson(pointerPath)
  assert(typeof pointer.manifest === 'string' && exists(pointer.manifest), 'latest evidence manifest 路径无效')
  if (typeof pointer.manifest === 'string' && exists(pointer.manifest)) {
    const manifest = readJson(pointer.manifest)
    assert(manifest.runId === pointer.runId, 'latest evidence 指针与 manifest runId 不一致')
    assert(manifest.status === 'objective-evidence-captured', '最新客观证据仍有失败')
    assert(Array.isArray(manifest.failures) && manifest.failures.length === 0, '最新客观证据 failures 非空')
    assert(manifest.freshness?.valid === true, '证据 source -> build -> server -> evidence 时间链无效')
    assert(manifest.freshness?.sourceMtime >= latestMtime(['src', 'data', 'content', 'scripts', 'public/world', 'package.json', 'next.config.ts']) - 1, '证据早于当前源码、数据或验收脚本')
    assert(manifest.build?.sharedKb <= 130, `shared First Load JS 超预算：${manifest.build?.sharedKb}`)
    assert(Object.keys(manifest.build?.routes ?? {}).length === contract.spaces.length, '核心 route 构建体积未覆盖七类空间')
    for (const [route, metric] of Object.entries(manifest.build?.routes ?? {})) assert(metric.firstLoadKb - manifest.build.sharedKb <= 80, `${route} route JS 增量超预算`)
    const observations = manifest.browser?.observations ?? []
    for (const scene of contract.spaces) {
      for (const mode of ['desktop', 'mobile', 'reduced-motion', 'reduced-sensory', 'keyboard', 'storage-off', 'text-hidden', 'js-off']) {
        const item = observations.find((observation) => observation.scene === scene.id && observation.mode === mode)
        assert(item, `${scene.id} 缺少 ${mode} 浏览器证据`)
        if (item) {
          assert(typeof item.screenshot === 'string' && exists(item.screenshot), `${scene.id} ${mode} 截图缺失`)
          assert(item.sceneRect?.ratio >= 0.7, `${scene.id} ${mode} 场景主体不足`)
          assert(item.overflowX === false, `${scene.id} ${mode} 横向溢出`)
          assert(item.engineeringCopy === false, `${scene.id} ${mode} 出现工程文案`)
          assert(item.privateCanary === false, `${scene.id} ${mode} 出现私密 canary`)
          assert((item.fixedOverlayIssues ?? []).length === 0, `${scene.id} ${mode} 存在固定层遮挡`)
          if (mode === 'reduced-sensory') assert(item.sceneRect?.width <= 390, `${scene.id} reduced-sensory 未使用 mobile 视口`)
          if (mode === 'keyboard') assert(item.keyboard?.firstFocus?.href === '#main-content' && item.keyboard?.reachedSceneObject && item.keyboard?.visibleFocus, `${scene.id} keyboard 证据不完整`)
          if (mode === 'storage-off') assert(item.storageAvailable === false, `${scene.id} storage-off 未真正禁用存储`)
        }
      }
    }
    contract.requiredFlows.forEach((flow) => assert(manifest.flows?.[flow]?.bytes > 0, `${flow} 连续录屏缺失`))
    assert(manifest.browser?.accessibility?.focusedOnOpen && manifest.browser?.accessibility?.focusRestored, '详情焦点进入/返回未通过')
    assert(manifest.browser?.accessibility?.zoom200?.overflowX === false, '200% 缩放出现横向溢出')
    assert((manifest.privacy?.bundleLeaks ?? []).length === 0, '客户端 bundle 存在秘密或私密 canary')
  }
}

if (failures.length) {
  console.error('WorldOS Reality-First objective gate failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`WorldOS Reality-First objective gate passed: spaces=${contract.spaces.length}, flows=${contract.requiredFlows.length}, no visual score asserted`)
