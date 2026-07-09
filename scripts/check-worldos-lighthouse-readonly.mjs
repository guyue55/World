// 用途：检查worldos lighthouse readonly
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const errors = []

function resolve(file) {
  return path.join(root, file)
}

function read(file) {
  return fs.readFileSync(resolve(file), 'utf-8')
}

// 门面拆分后，public-world-surfaces 主文件已成为桶文件；
// 该 helper 会同时读取主文件与 public-surfaces/ 子模块，返回拼接后的源码
function readPublicSurfaces() {
  const parts = [read('src/lib/public-world-surfaces.ts')]
  const dir = resolve('src/lib/public-surfaces')
  if (fs.existsSync(dir)) {
    for (const entry of fs.readdirSync(dir)) {
      if (entry.endsWith('.ts')) parts.push(read(`src/lib/public-surfaces/${entry}`))
    }
  }
  return parts.join('\n')
}

function readJson(file) {
  return JSON.parse(read(file))
}

function assert(condition, message) {
  if (!condition) errors.push(message)
}

function includesEvery(source, tokens, label) {
  for (const token of tokens) {
    assert(source.includes(token), `${label} missing ${token}`)
  }
}

function isPublicVisible(visibility) {
  return visibility === 'public' || visibility === 'semiPublic'
}

function assertNoForbiddenRuntimeTokens(file, source) {
  const forbiddenPatterns = [
    /\bfetch\s*\(/,
    /\baxios\s*\./,
    /\bnew\s+OpenAI\b/,
    /\bchat\.completions\b/,
    /\bresponses\.create\b/,
    /\buseChat\s*\(/,
    /\bstreamText\s*\(/,
    /\bgenerateText\s*\(/,
    /\bfs\.(writeFile|appendFile|rm|unlink|rename|cp)\b/,
    /\bwriteFileSync\b/,
    /\bappendFileSync\b/,
  ]

  for (const pattern of forbiddenPatterns) {
    assert(!pattern.test(source), `${file} contains forbidden low-light runtime token: ${pattern}`)
  }
}

function main() {
  const contractPath = 'data/world-kernel/worldos-lighthouse-readonly-contract-v1.json'
  const contract = readJson(contractPath)
  const aiBoundaryPolicy = readJson('data/domains/ai/ai-boundary-policy.json')
  const prompts = readJson('data/domains/ai/lighthouse-prompts.json')
  const qualityGate = readJson('data/domains/ai/lighthouse-quality-gate.json')
  const productization = readJson('data/domains/ai/lighthouse-productization-contract.json')
  const nodes = readJson('data/domains/experience/nodes.json')
  const paths = readJson('data/domains/experience/paths.json')
  const pkg = readJson('package.json')

  assert(contract.name.includes('AI 灯塔只读边界'), 'contract name must describe lighthouse readonly boundary')
  assert(contract.principle.includes('只读公开上下文'), 'contract principle must include readonly public context')

  for (const [key, value] of Object.entries(contract.policies)) {
    assert(value === true, `lighthouse readonly policy must be true: ${key}`)
  }
  for (const [key, value] of Object.entries(contract.releaseStates)) {
    assert(value === false, `lighthouse low-light release state must stay false: ${key}`)
  }

  for (const source of contract.publicContextSources) {
    assert(fs.existsSync(resolve(source)), `missing public context source: ${source}`)
  }
  for (const file of contract.runtimeSourceFiles) {
    assert(fs.existsSync(resolve(file)), `missing lighthouse runtime source: ${file}`)
  }

  assert(aiBoundaryPolicy.principle === 'AI 是灯塔，不是太阳。', 'AI boundary principle drifted')
  includesEvery(
    aiBoundaryPolicy.forbidden,
    contract.requiredAIBoundaryForbiddenRules,
    'AI boundary forbidden rules',
  )

  assert(productization.status === 'implemented-low-light', 'lighthouse must remain implemented-low-light')
  includesEvery(productization.rules.join('\n'), ['不执行敏感动作', '不会发布、删除、改权限或读取私密层'], 'productization rules')
  includesEvery(productization.performanceRules.join('\n'), ['只读取公开节点', '不加载聊天 SDK', '远程 AI 客户端'], 'productization performance rules')
  includesEvery(qualityGate.rules.join('\n'), ['所有推荐必须基于公开内容', '禁止暗示 AI 可以读取私密内容'], 'lighthouse quality rules')

  const pathById = new Map(paths.map((item) => [item.id, item]))
  for (const prompt of prompts.prompts) {
    assert(contract.allowedPromptIntents.includes(prompt.intent), `unsafe prompt intent: ${prompt.id}`)
    assert(prompt.href.startsWith('/'), `prompt href must be local: ${prompt.id}`)
    for (const prefix of contract.forbiddenPromptPrefixes) {
      assert(!prompt.href.startsWith(prefix), `prompt href uses forbidden prefix ${prefix}: ${prompt.id}`)
    }

    if (prompt.href.startsWith('/paths/')) {
      const pathId = prompt.href.slice('/paths/'.length)
      const linkedPath = pathById.get(pathId)
      assert(Boolean(linkedPath), `prompt links to missing path: ${prompt.id}`)
      assert(linkedPath?.visibility === 'public', `prompt links to non-public path: ${prompt.id}`)
    } else {
      assert(contract.allowedPromptPages.includes(prompt.href), `prompt links to unsupported public page: ${prompt.id}`)
    }
  }

  const publicNodes = nodes.filter((node) => isPublicVisible(node.visibility))
  const privateNodes = nodes.filter((node) => !isPublicVisible(node.visibility))
  assert(publicNodes.length > 0, 'lighthouse needs public nodes to guide visitors')
  assert(privateNodes.every((node) => !['public', 'semiPublic'].includes(node.visibility)), 'private node visibility set is malformed')

  const publicPaths = paths.filter((item) => item.visibility === 'public')
  assert(publicPaths.length >= qualityGate.minimums.recommendedPaths, 'not enough public paths for lighthouse recommendations')

  const askPage = read('src/app/ask/page.tsx')
  includesEvery(
    askPage,
    ['getPublicNodes', 'getAllPaths', 'getLighthouseRecommendedNodes', 'getLighthouseRecommendedPaths', 'buildLighthouseConsoleSurface', 'ProductRouteGuide'],
    'Ask page',
  )
  includesEvery(askPage, ['只读公开索引', '不修改节点', '不写入数据', '不读取私密内容'], 'Ask page boundary copy')

  const lighthouseLib = read('src/lib/lighthouse.ts')
  includesEvery(lighthouseLib, ['isPublicVisible(node.visibility)', 'getLighthouseRecommendedNodes', 'getLighthouseRecommendedPaths'], 'lighthouse lib')

  const nodesLib = read('src/lib/nodes.ts')
  includesEvery(nodesLib, ['getPublicNodes', 'isPublicVisible(node.visibility)'], 'nodes lib')

  const pathsLib = read('src/lib/paths.ts')
  includesEvery(pathsLib, ['getAllPaths', "path.visibility === 'public'"], 'paths lib')

  const surfaceLib = readPublicSurfaces()
  includesEvery(
    surfaceLib,
    ['boundaryNotice', 'fallbackActions', '不调用实时 AI', '不读取私密内容', '不写入世界', '不替造物主决定公开或删除'],
    'lighthouse surface',
  )
  for (const href of contract.publicFallbackPages) {
    assert(surfaceLib.includes(`href: '${href}'`), `lighthouse fallback missing ${href}`)
  }

  const consoleComponent = read('src/components/ask/PublicLighthouseConsole.tsx')
  includesEvery(consoleComponent, ['surface.boundaryNotice', 'surface.fallbackActions.map', 'LOW LIGHT CONSOLE'], 'lighthouse console')

  const askApiRoute = read('src/app/api/lighthouse/ask/route.ts')
  includesEvery(askApiRoute, ['runLowLightLighthouse', '问题不能为空'], 'lighthouse ask api')

  const lighthouseRuntime = read('src/server/ai/lighthouse-runtime.ts')
  includesEvery(
    lighthouseRuntime,
    [
      'getPublicWorldObjectIndex',
      'buildAIContextSlice',
      'getLocalAIProviderStatus',
      'getRecommendationsForHome',
      'low-light',
      '真实 AI Provider 未启用',
      '不写入、不发布、不删除、不修改可见性',
    ],
    'lighthouse server runtime',
  )
  for (const field of contract.requiredRuntimeResultFields ?? []) {
    assert(lighthouseRuntime.includes(`${field}:`) || lighthouseRuntime.includes(`${field}?`), `lighthouse runtime missing result field: ${field}`)
  }

  for (const file of contract.runtimeSourceFiles) {
    assertNoForbiddenRuntimeTokens(file, read(file))
  }

  assert(pkg.scripts['check:lighthouse-readonly'] === 'node scripts/check-worldos-lighthouse-readonly.mjs', 'package missing check:lighthouse-readonly script')
  assert(pkg.scripts['check:lighthouse']?.includes('check:lighthouse-readonly'), 'check:lighthouse must include readonly gate')

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  console.log('WorldOS lighthouse readonly check passed.')
}

main()
