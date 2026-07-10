# WorldOS Reality-First 持久执行账本

> [!IMPORTANT]
> 这是单次 Goal 跨上下文、跨提交和自动续跑的唯一状态记录。恢复时先读冻结文档，再从本账本的“当前指针”继续。不得根据旧 M8-M30 报告猜测进度。

## 1. 当前指针

```yaml
goal_status: IN_PROGRESS
product_status: WORLD_EXPERIENCE_IN_PROGRESS
current_checkpoint: C4
current_item: C4.1
last_completed_checkpoint: C3
baseline_commit: d34db104f5a0aa7e7e44168219c0df8c71a3e53c
baseline_commit_subject: "feat(world): 完成M30终局候选验收"
baseline_commit_truth: "工程提交存在，但其9/10体验结论已被真实视觉审查否决"
external_preview: frozen
production: frozen
live_ai_provider: unavailable
```

## 2. 启动环境

核对日期：2026-07-10（Asia/Shanghai）。

| 项 | 已确认状态 | 影响 |
| --- | --- | --- |
| 工作区 | `/Users/guyue/GitProject/World` | 正确 |
| 分支 | `codex/visual-overlay-qa` | 继续在当前分支执行 |
| 远端差异 | 启动准备前 ahead 8 | 不自动 push |
| Node.js | `v24.13.0` | 可运行当前脚本 |
| npm | `11.6.2` | 使用 `npm` |
| Playwright CLI | `1.61.1` | 可截图；复杂流程可复用 CDP recorder |
| Google Chrome | `150.0.7871.115` | 优先用于生产态实测 |
| ffmpeg | `6.0` | 可录屏与转码 |
| `OPENAI_API_KEY` | shell 未设置，仓库无本地 env | 不得声称实时 Provider 可用 |
| Ollama | 未检测到 | 不自动安装重型本地模型 |
| 部署 | localhost / LAN only | 不做外部发布 |

> [!NOTE]
> 版本信息可能随 Goal 启动时间变化。开始 C0 时重新记录实际值，但不得把工具升级当作产品推进。

## 3. 已确认基线缺陷

| ID | 严重度 | 事实 | 证据 | 状态 |
| --- | --- | --- | --- | --- |
| RF-001 | P0 | 旧 M30 硬编码八支柱分数 | `scripts/check-worldos-m30-ultimate-candidate.mjs` | invalidated |
| RF-002 | P0 | `candidateScore` 被 threshold 强制托底 | 同上 | invalidated |
| RF-003 | P0 | 核心场景共享同一个双栏 portal 模板 | `src/components/world/SceneWorldPortal.tsx` | open-4-core-imports |
| RF-004 | P0 | Node 公开页显示 Motion Layer / Fallback / Evidence | M30 node-reading arrival | open |
| RF-005 | P0 | Timeline 主体仍是标题与信息卡，河道不是主交互 | M30 scene-migration arrival | open |
| RF-006 | P0 | Paths 是内容卡 + 进度侧栏，缺少行走空间 | M30 path-to-node arrival | open |
| RF-007 | P0 | Lighthouse 是 hero / CTA / 卡片，不是观测陪伴空间 | M30 lighthouse-guidance arrival | open |
| RF-008 | P1 | `public/` 缺少场景级 bitmap 资产 | `public/` inventory | resolved-C1 |
| RF-009 | P1 | 297 个 package scripts，旧自证入口仍在 mainline | `package.json` | resolved-C0 |
| RF-010 | P1 | 实时 AI Provider 不可用，当前仅 low-light | `/api/lighthouse/ask` 与环境预检 | conditional |

## 4. 检查点状态

| Checkpoint | 目标 | 状态 | Commit | 证据 run |
| --- | --- | --- | --- | --- |
| C0 | 废止假绿灯，建立真实基线 | passed | `6736d461` | baseline-2026-07-10 |
| C1 | 视觉资产、token 与 scene primitives | passed | `f2d533b6` | assets-2026-07-10 |
| C2 | 世界壳与 Gateway | passed | `9813f596` | c2-gateway-2026-07-10 |
| C3 | Atlas 可探索地图 | passed | `66c0731c` | c3-atlas-2026-07-10 |
| C4 | Timeline 与 Archive 独立空间 | passed | `8d510588` | c4-scenes-2026-07-10 |
| C5 | Paths 与 Node 连续旅程 | passed | `275fe4be` | c5-journey-2026-07-10 |
| C6 | 场景迁移与上下文延续 | passed | `67cfbd9e` | c6-migration-2026-07-10 |
| C7 | Lighthouse 与声景 | passed | 本检查点提交 | c7-lighthouse-audio-2026-07-10 |
| C8 | 性能、无障碍、权限和证据入口 | pending | - | - |
| C9 | 多轮 Reality Audit 与终止 | pending | - | - |

状态只能使用：`pending`、`in_progress`、`failed`、`passed`、`blocked_external`。不得使用 `almost`、`basically complete` 或无证据百分比。

## 5. 逐项进度镜像

执行计划是任务定义，本节只记录当前指针，避免复制全部要求：

```yaml
completed_items:
  - C0.1
  - C0.2
  - C0.3
  - C0.4
  - C0.5
  - C0.6
  - C0.7
  - C0.8
  - C0.9
  - C1.1
  - C1.2
  - C1.3
  - C1.4
  - C1.5
  - C1.6
  - C1.7
  - C1.8
  - C1.9
  - C2.1
  - C2.2
  - C2.3
  - C2.4
  - C2.5
  - C2.6
  - C2.7
  - C2.8
  - C2.9
  - C2.10
  - C2.11
  - C2.12
  - C3.1
  - C3.2
  - C3.3
  - C3.4
  - C3.5
  - C3.6
  - C3.7
  - C3.8
  - C3.9
  - C3.10
  - C3.11
  - C4.1
  - C4.2
  - C4.3
  - C4.4
  - C4.5
  - C4.6
  - C4.7
  - C4.8
  - C4.9
  - C4.10
  - C4.11
  - C4.12
  - C4.13
  - C4.14
  - C4.15
  - C5.1
  - C5.2
  - C5.3
  - C5.4
  - C5.5
  - C5.6
  - C5.7
  - C5.8
  - C5.9
  - C5.10
  - C5.11
  - C5.12
  - C5.13
  - C5.14
  - C5.15
  - C6.1
  - C6.2
  - C6.3
  - C6.4
  - C6.5
  - C6.6
  - C6.7
  - C6.8
  - C6.9
  - C7.1
  - C7.2
  - C7.3
  - C7.4
  - C7.5
  - C7.6
  - C7.7
  - C7.8
  - C7.9
  - C7.10
  - C7.11
  - C7.12
  - C7.13
failed_items: []
blocked_items:
  - id: C7.6-live-provider
    reason: "仅在合法服务端凭据存在时验证；不阻塞 low-light 本地世界完成"
next_item: C8.1
```

每完成一个 item，立即：

1. 将执行计划对应 `[ ]` 改为 `[x]`。
2. 把 item id 追加到 `completed_items`。
3. 记录命令、证据和必要观察。
4. 若 checkpoint 结束，写 commit hash 并把 `next_item` 指向下一个 checkpoint。

## 6. 执行记录

### Record 000：Reality-First 准备

```yaml
checkpoint: PREP
status: passed
work:
  - "核对旧 M30 终局脚本，确认硬编码分数和阈值托底"
  - "真实查看五组 M30 关键截图，确认仍为博客 / dashboard 式骨架"
  - "核对公开 route、SceneWorldPortal、WorldShell、WorldRuntime 与 Lighthouse low-light 实现"
  - "联网调研 Codex Goal、GSAP、View Transition、Web Audio、Playwright、Next.js 与 Web Vitals"
evidence:
  - "docs/90-archive/reports/worldos-m30-recordings/**"
  - "scripts/check-worldos-m30-ultimate-candidate.mjs"
  - "src/components/world/SceneWorldPortal.tsx"
verification:
  - "node scripts/check-worldos-reality-first-control.mjs -> passed, 6 frozen files"
  - "plan structure audit -> 125 unique unchecked items, C0-C9 complete, Objective 1962 chars"
  - "npm run check:docs -> passed, docs=369, adr=6"
  - "npm run typecheck -> passed"
  - "npm run lint -> passed"
  - "npm run check:scripts -> passed, package scripts=297"
  - "npm run build:production-ci -> passed, 260 static pages, shared First Load JS=102 KB"
  - "Markdown local-link / whitespace / requirement coverage checks -> passed"
result: "旧终局结论失效；进入新控制包，尚未开始产品重构"
```

### Record 001：C0 真实基线

```yaml
checkpoint: C0
item: C0.1-C0.9
status: passed
started_at: 2026-07-10T12:32:00+08:00
finished_at: 2026-07-10T12:36:27+08:00
files_changed:
  - "package.json"
  - "data/world-kernel/worldos-script-legacy-registry-v1.json"
  - "data/domains/experience/reality-first-route-contract.json"
  - "scripts/audit-worldos-reality-first.mjs"
  - "src/app/status/page.tsx"
  - "src/components/status/RealityFirstBaselinePanel.tsx"
  - "docs/90-archive/reports/worldos-reality-first/baseline-2026-07-10/manifest.json"
commands:
  - command: "node scripts/check-worldos-reality-first-control.mjs"
    exit_code: 0
    observed: "冻结锁通过，6 份文件一致"
  - command: "npm run audit:world-experience"
    exit_code: 0
    observed: "FOUNDATION_ONLY；共享 portal 导入 6 个；公开工程文案 4 处；visualAcceptance=not-run"
  - command: "npm run typecheck && npm run lint && npm run check:scripts && git diff --check"
    exit_code: 0
    observed: "类型、lint、298 个脚本注册边界与差异格式均通过"
evidence:
  - "docs/90-archive/reports/worldos-reality-first/baseline-2026-07-10/manifest.json"
failures:
  - "审计器首轮把 JSON 字段名和标识符误算为公开文案"
fixes:
  - "收紧为可见 JSX 文本和明确展示字符串；portal 统计改为导入文件数"
commit: "本检查点提交：test(world): 废止终局自评分并建立真实基线"
next_item: C1.1
```

### Record 002：C1 场景资产与基础控件

```yaml
checkpoint: C1
item: C1.1-C1.9
status: passed
started_at: 2026-07-10T12:38:00+08:00
finished_at: 2026-07-10T13:05:46+08:00
files_changed:
  - "data/assets/world-scene-assets.json"
  - "public/world/scenes/**"
  - "src/lib/world-scene-assets.ts"
  - "src/styles/world-scene-tokens.css"
  - "src/components/world/primitives/**"
  - "scripts/check-world-scene-foundation.mjs"
commands:
  - command: "imagegen + cwebp"
    exit_code: 0
    observed: "生成并转码 7 组 desktop/mobile 独立构图；最大 desktop=286846 bytes，最大 mobile=203320 bytes"
  - command: "node scripts/check-world-scene-foundation.mjs"
    exit_code: 0
    observed: "7 scenes、14 licensed assets、5 primitives 全部通过"
  - command: "npm run typecheck && npm run lint && git diff --check"
    exit_code: 0
    observed: "类型、lint 与差异格式通过"
evidence:
  - "docs/90-archive/reports/worldos-reality-first/assets-2026-07-10/contact-sheet.jpg"
  - "docs/90-archive/reports/worldos-reality-first/assets-2026-07-10/visual-review.md"
failures:
  - "SceneObjectButton 首轮联合类型未正确收窄 disabled"
  - "contact sheet 首两次只采集一个输入帧"
fixes:
  - "增加显式 ButtonVariant 收窄"
  - "改用 14 输入 xstack 生成固定顺序 contact sheet"
commit: "本检查点提交：feat(world): 建立七类场景视觉资产与基础控件"
next_item: C2.1
```

### Record 003：C2 世界入口与回访

```yaml
checkpoint: C2
item: C2.1-C2.12
status: passed
started_at: 2026-07-10T13:08:00+08:00
finished_at: 2026-07-10T15:04:23+08:00
files_changed:
  - "data/domains/content/world-public-curation.json"
  - "src/lib/scenes/**"
  - "src/lib/runtime/**"
  - "src/components/product/WorldGatewayStage.tsx"
  - "src/components/world/WorldChrome.tsx"
  - "src/components/world/WorldShell.tsx"
  - "scripts/lib/reality-first-browser.mjs"
  - "scripts/capture-world-gateway-evidence.mjs"
commands:
  - command: "node scripts/check-world-gateway.mjs"
    exit_code: 0
    observed: "24 个代表节点、6 个入口地点、3 条新手路径引用有效"
  - command: "npm run typecheck && npm run lint && npm run check:product-release && npm run check:scripts"
    exit_code: 0
    observed: "类型、lint、产品边界、内核与脚本治理通过"
  - command: "npm run build:production-ci"
    exit_code: 0
    observed: "fresh build 260/260；首页 First Load JS 191 KB"
  - command: "WORLDOS_BASE_URL=http://127.0.0.1:3410 node scripts/capture-world-gateway-evidence.mjs"
    exit_code: 0
    observed: "desktop/mobile/returning/text-hidden/image-failure/js-off 六模式通过，无 console、network、overflow 与公开工程文案缺陷"
  - command: "curl http://192.168.1.200:3410/"
    exit_code: 0
    observed: "LAN HTTP 200"
evidence:
  - "docs/90-archive/reports/worldos-reality-first/c2-gateway-2026-07-10/after/browser-observations.json"
  - "docs/90-archive/reports/worldos-reality-first/c2-gateway-2026-07-10/visual-review.md"
failures:
  - "策展将 origin 节点误放入 Lighthouse"
  - "旧门禁仍强制 ProductBackdrop / ProductJourneyDock"
  - "首版顶部缝隙和公开迁移说明"
  - "回访 dock 遮挡路径热点"
  - "favicon.ico 404"
  - "JS-off 停在根级 loading 或空白"
  - "图片失败在 hydration 前丢失 onError"
  - "证据 Chrome profile 清理竞态"
fixes:
  - "按事实区域替换策展节点，并更新旧门禁到 WorldChrome / WorldRuntimeProvider"
  - "删除公开迁移说明、调整 dock、补 favicon、移除根级 loading"
  - "加入同事实源 noscript Gateway 与 image complete/naturalWidth 判定"
  - "浏览器工具等待 Chrome 退出后有限重试清理"
commit: "本检查点提交：feat(world): 重塑世界入口与回访抵达体验"
next_item: C3.1
```

### Record 004：C3 可探索 Atlas

```yaml
checkpoint: C3
item: C3.1-C3.11
status: passed
started_at: 2026-07-10T15:06:00+08:00
finished_at: 2026-07-10T17:53:00+08:00
files_changed:
  - "src/lib/scenes/build-atlas-model.ts"
  - "src/components/atlas/AtlasExplorationStage.tsx"
  - "src/components/atlas/AtlasExplorationStage.module.css"
  - "src/components/atlas/AtlasSceneSvg.tsx"
  - "src/components/atlas/AtlasInspector.tsx"
  - "src/app/atlas/page.tsx"
  - "src/components/world/primitives/SceneInspector.tsx"
  - "src/components/world/RuntimeAtmosphere.tsx"
  - "src/components/world/SceneTransitionShell.tsx"
  - "src/components/world/WorldRuntimeProvider.tsx"
  - "next.config.ts"
  - "scripts/run-r8-fresh-build.mjs"
  - "scripts/check-performance-budget.mjs"
  - "scripts/check-world-atlas-reality.ts"
  - "scripts/capture-world-atlas-evidence.mjs"
commands:
  - command: "npx tsx scripts/check-world-atlas-reality.ts"
    exit_code: 0
    observed: "8 个区域、24 个代表地点、8 条公开关系线；相同事实源重复生成完全一致"
  - command: "npm run typecheck && npm run lint"
    exit_code: 0
    observed: "类型与全仓 lint 通过；隔离生产目录已加入生成物忽略"
  - command: "WORLDOS_DIST_DIR=.next-reality npm run build"
    exit_code: 0
    observed: "fresh production build 通过；shared First Load JS 从 193 kB 降至 158 kB，但冻结 130 kB 仍是 C6-C8 全局残余"
  - command: "WORLDOS_BASE_URL=http://127.0.0.1:3411 node scripts/capture-world-atlas-evidence.mjs"
    exit_code: 0
    observed: "9 种模式、62 帧录屏、5 条真实迁移/键盘流程通过；无非预期 console、overflow、工程文案"
  - command: "WORLDOS_DIST_DIR=.next-reality npm run check:performance-budget"
    exit_code: 0
    observed: "构建总大小 13.51 MB；Atlas 位图 140330 B、最大 long task 63 ms、LCP 228 ms、CLS 0.0009"
  - command: "curl http://127.0.0.1:3411/atlas && curl http://192.168.1.200:3411/atlas"
    exit_code: 0
    observed: "localhost 与 LAN 均返回 HTTP 200"
evidence:
  - "docs/90-archive/reports/worldos-reality-first/c3-atlas-2026-07-10/baseline/**"
  - "docs/90-archive/reports/worldos-reality-first/c3-atlas-2026-07-10/final/**"
  - "docs/90-archive/reports/worldos-reality-first/c3-atlas-2026-07-10/visual-review.md"
failures:
  - "用户 next dev 重写 .next，旧 production CSS/JS 全部 400"
  - "静态列表 margin 折叠把地图推到第二屏"
  - "图片 hydration 竞态使 fallback 常驻"
  - "GSAP matchMedia 无普通模式真条件，镜头聚焦未执行"
  - "desktop inspector 被顶部导航遮挡"
  - "mobile drawer 被底部导航遮挡且背景热点文字穿透"
  - "证据器把隐藏移动导航误判为重叠"
  - "全局 shared First Load JS 高于冻结预算"
fixes:
  - "用 WORLDOS_DIST_DIR 隔离 production build/start/performance，并保留用户 dev 进程"
  - "把静态等价列表改为舞台内降级层，并补 complete/naturalWidth 判定"
  - "用 desktop/mobile matchMedia 条件驱动真实 GSAP 镜头缩放和平移"
  - "为 desktop/mobile inspector 建立上下导航安全区和近实色可读背景"
  - "移除全局常驻 Framer Motion，shared JS 从 193 kB 降到 158 kB；残余不冒充终局通过"
commit: "本检查点提交：feat(world): 将星图重构为可探索世界地图"
next_item: C4.1
```

### Record 005：C4 时间河与档案馆

```yaml
checkpoint: C4
item: C4.1-C4.15
status: passed
started_at: 2026-07-10T17:55:00+08:00
finished_at: 2026-07-10T19:20:00+08:00
files_changed:
  - "src/lib/scenes/build-timeline-model.ts"
  - "src/lib/scenes/build-archive-model.ts"
  - "src/lib/runtime/timeline-position.ts"
  - "src/lib/runtime/archive-context.ts"
  - "src/components/timeline/**"
  - "src/components/archive/**"
  - "src/app/timeline/page.tsx"
  - "src/app/archive/page.tsx"
  - "scripts/check-world-c4-scenes.ts"
  - "scripts/capture-world-c4-evidence.mjs"
commands:
  - command: "npx tsx scripts/check-world-c4-scenes.ts"
    exit_code: 0
    observed: "7 个稳定时间锚吸收 51 条公开事件；8 个馆藏分区吸收 200 个公开节点"
  - command: "npm run typecheck && npm run lint && git diff --check"
    exit_code: 0
    observed: "类型、全仓 lint 与差异格式通过"
  - command: "WORLDOS_DIST_DIR=.next-reality npm run build"
    exit_code: 0
    observed: "删除旧隔离产物后的 fresh production build 通过；shared First Load JS 仍为 158 kB，130 kB 全局残余未关闭"
  - command: "WORLDOS_BASE_URL=http://127.0.0.1:3411 node scripts/capture-world-c4-evidence.mjs"
    exit_code: 0
    observed: "16 种截图模式、时间河 64 帧与档案馆 51 帧录屏、9 条交互流程通过；Fuse 仅在首次输入后新增一个脚本资源"
  - command: "curl localhost/LAN timeline/archive"
    exit_code: 0
    observed: "localhost 与 192.168.1.200 的两个场景均返回 HTTP 200"
evidence:
  - "docs/90-archive/reports/worldos-reality-first/c4-scenes-2026-07-10/baseline/**"
  - "docs/90-archive/reports/worldos-reality-first/c4-scenes-2026-07-10/final/**"
  - "docs/90-archive/reports/worldos-reality-first/c4-scenes-2026-07-10/visual-review.md"
failures:
  - "首版 mobile 时间锚与事件标签重叠"
  - "首版 mobile 档案馆第三个筛选器被截断"
  - "证据模式复用 localStorage，导致详情和 mobile 截图继承空查询"
  - "图片失败时静态清单叠在空间控件上"
  - "首版时间河录屏没有稳定捕捉事件详情"
fixes:
  - "使用独立 mobile 锚点坐标和最多三个事件标签"
  - "mobile 筛选器改为稳定两列，并保留 44px 以上触控高度"
  - "每个证据页在导航前清除公开浏览上下文，筛选模式显式重建查询"
  - "资源失败时隐藏依赖背景定位的空间层，仅保留同事实源静态清单"
  - "录屏动作增加事件出现、详情打开和回到最新河段的失败断言"
commit: "本检查点提交：feat(world): 落地时间河与档案馆独立空间"
next_item: C5.1
```

### Record 006：C5 可行走路径与内容地点

```yaml
checkpoint: C5
item: C5.1-C5.15
status: passed
started_at: 2026-07-10T19:22:00+08:00
finished_at: 2026-07-10T20:20:00+08:00
files_changed:
  - "src/lib/scenes/build-path-model.ts"
  - "src/lib/scenes/build-node-model.ts"
  - "src/lib/runtime/path-progress.ts"
  - "src/components/paths/JourneyRouteStage.tsx"
  - "src/components/paths/JourneyWaypoint.tsx"
  - "src/components/node/NodePlaceRoom.tsx"
  - "src/components/node/NodeJourneyControls.tsx"
  - "src/components/node/NodePassport.tsx"
  - "src/components/node/NodeRelationRail.tsx"
  - "src/app/paths/**"
  - "src/app/node/[slug]/page.tsx"
commands:
  - command: "npx tsx scripts/check-world-c5-journey.ts"
    exit_code: 0
    observed: "29 条公开路径、252 个站点与 12 个等距抽样 Node 通过确定性、关系门和出口检查"
  - command: "npm run typecheck && npm run lint && git diff --check"
    exit_code: 0
    observed: "类型、全仓 lint 与差异格式通过"
  - command: "WORLDOS_DIST_DIR=.next-reality npm run build"
    exit_code: 0
    observed: "删除旧隔离产物后的 fresh production build 通过；shared First Load JS 仍为 158 kB，全局预算残余继续保留"
  - command: "WORLDOS_BASE_URL=http://127.0.0.1:3411 node scripts/capture-world-c5-evidence.mjs"
    exit_code: 0
    observed: "18 种模式、两段真实录屏、完整七站旅程、重置与 12 节点浏览器抽样通过"
evidence:
  - "docs/90-archive/reports/worldos-reality-first/c5-journey-2026-07-10/baseline/**"
  - "docs/90-archive/reports/worldos-reality-first/c5-journey-2026-07-10/final/**"
  - "docs/90-archive/reports/worldos-reality-first/c5-journey-2026-07-10/visual-review.md"
failures:
  - "Node CSS Module 首版纯全局选择器导致开发页 build error"
  - "临时 .next-c5 被全仓 lint 扫入 860 条生成物错误"
  - "首版完整旅程 smoke 在 hydration 前过早点击"
  - "首版 path-journey 录屏没有稳定的路线起始帧"
  - "Node mobile 底部两个关系门与正文入口靠得过近"
fixes:
  - "所有全局阅读选择器由本地 readingWorld/stage 作用域约束"
  - "停止隔离 dev、删除产物并精确恢复 next-env/tsconfig 后重跑全仓 lint"
  - "旅程 smoke 等待真实客户端控件就绪再逐站完成"
  - "录屏起始时写入真实当前截图，并等待路径/Node 位图就绪后继续"
  - "mobile 仅保留四个首屏关系门，其余在正文关系区完整呈现"
commit: "本检查点提交：feat(world): 连通可行走路径与内容地点"
next_item: C6.1
```

### Record 007：C6 连续场景迁移

```yaml
checkpoint: C6
item: C6.1-C6.9
status: passed
started_at: 2026-07-10T20:25:00+08:00
finished_at: 2026-07-10T23:34:00+08:00
files_changed:
  - "src/lib/runtime/scene-migration.ts"
  - "src/components/world/migration/SceneTransitionLink.tsx"
  - "src/components/world/migration/SceneMigrationLayer.tsx"
  - "src/components/world/migration/SceneMigrationLayer.module.css"
  - "src/components/world/SceneTransitionShell.tsx"
  - "src/components/world/primitives/SceneObjectButton.tsx"
  - "src/components/product/WorldGatewayStage.tsx"
  - "src/components/atlas/AtlasInspector.tsx"
  - "src/components/timeline/TimelineRiverStage.tsx"
  - "src/components/archive/ArchiveView.tsx"
  - "src/components/paths/JourneyRouteStage.tsx"
  - "src/components/node/NodePlaceRoom.tsx"
commands:
  - command: "npx tsx scripts/check-world-c6-migration.ts"
    exit_code: 0
    observed: "纯状态机覆盖 idle/leaving/inTransit/arriving/settled、reduced、cancel/error/unmount，六类共享对象绑定通过"
  - command: "npm run typecheck && npm run lint && git diff --check"
    exit_code: 0
    observed: "类型、全仓 lint 与差异格式通过"
  - command: "WORLDOS_DIST_DIR=.next-reality npm run build"
    exit_code: 0
    observed: "删除旧隔离产物后的 fresh production build 通过"
  - command: "WORLDOS_BASE_URL=http://127.0.0.1:3411 node scripts/capture-world-c6-migrations.mjs"
    exit_code: 0
    observed: "六类正常迁移与一条 reduced-motion 降级均通过，快速连点后退和 404 均释放迁移层"
evidence:
  - "docs/90-archive/reports/worldos-reality-first/c6-migration-2026-07-10/final/**"
  - "docs/90-archive/reports/worldos-reality-first/c6-migration-2026-07-10/visual-review.md"
failures:
  - "原生 View Transition 发生文档替换时，15ms CDP 轮询遇到 Inspected target navigated or closed"
  - "快速后退测试与待执行的 60ms 导航竞争，错误落入下一页"
  - "首轮 Path 航点在 GSAP 动态定位前短暂显示于左上角"
  - "Node -> Lighthouse 只能证明迁移抵达，目标页仍是待 C7 重做的旧舞台"
  - "首轮 LAN curl 循环误用 zsh 特殊变量 path，导致命令查找路径被覆盖"
  - "复审发现 View Transition 只包住定时器而非真实路由更新，且 GSAP 异步导入存在旧 effect 晚到风险"
fixes:
  - "截图、screencast ACK 与停止流程增加跨文档重试和容错，不吞掉业务断言"
  - "边界测试改为快速双击、稳定抵达后执行 back，再单独验证 404 释放"
  - "迁移对象默认透明，完成来源几何定位后才由 GSAP 显示，并 fresh build 重录"
  - "视觉审查明确保留 C7 Lighthouse 债务，不把路由 settled 冒充目标场景完成"
  - "循环变量改为 route 并使用绝对 curl 路径，localhost 与 192.168.1.200 七个页面均为 200，预期缺失页为 404"
  - "将 60ms 延迟置于 View Transition 外并让回调直接导航；异步导入增加 cancelled 清理，server snapshot 改为稳定引用"
commit: "本检查点提交：feat(world): 将路由切换升级为连续场景迁移"
next_item: C7.1
```

### Record 008：C7 灯塔导览与可选声景

```yaml
checkpoint: C7
item: C7.1-C7.13
status: passed
started_at: 2026-07-10T23:52:00+08:00
finished_at: 2026-07-11T01:40:00+08:00
files_changed:
  - "src/lib/scenes/build-lighthouse-model.ts"
  - "src/components/ask/LighthouseGuideStage.tsx"
  - "src/components/ask/LighthouseGuideStage.module.css"
  - "src/components/ask/PublicLighthouseConsole.tsx"
  - "src/app/ask/page.tsx"
  - "src/app/api/lighthouse/ask/route.ts"
  - "src/server/ai/provider/**"
  - "src/server/ai/lighthouse-service.ts"
  - "src/server/ai/lighthouse-rate-limit.ts"
  - "src/server/ai/lighthouse-audit.ts"
  - "src/lib/runtime/soundscape-engine.ts"
  - "src/components/world/RuntimeSoundscapeControl.tsx"
  - "data/domains/experience/sensory-audio-registry.json"
  - "data/generated/world-runtime-public.json"
commands:
  - command: "npx tsx scripts/check-world-c7-lighthouse.ts"
    exit_code: 0
    observed: "grounded、no-evidence、refusal、超时、取消、结构错误、限流、缓存、私密上下文排除与七场景程序化声景通过"
  - command: "npm run typecheck && npm run lint && git diff --check"
    exit_code: 0
    observed: "类型、全仓 lint 与差异格式通过"
  - command: "WORLDOS_DIST_DIR=.next-reality npm run build"
    exit_code: 0
    observed: "fresh production build 通过；shared First Load JS 为 174 kB，仍是 C8.11 阻断项"
  - command: "WORLDOS_BASE_URL=http://127.0.0.1:3411 node scripts/capture-world-c7-evidence.mjs"
    exit_code: 0
    observed: "9 种 Lighthouse 模式、默认静音/手势开启/关闭释放和 130 帧连续导览录屏通过"
  - command: "curl POST/GET/invalid/empty/grounded/refusal + localhost/LAN + client bundle Key scan + asset budget"
    exit_code: 0
    observed: "GET=405、无效/空问题=400、grounded/refusal=200、private no-store、localhost/LAN=200、bundle 无 Key 名值、资产预算无失败"
evidence:
  - "docs/90-archive/reports/worldos-reality-first/c7-lighthouse-audio-2026-07-10/baseline/**"
  - "docs/90-archive/reports/worldos-reality-first/c7-lighthouse-audio-2026-07-10/final/**"
  - "docs/90-archive/reports/worldos-reality-first/c7-lighthouse-audio-2026-07-10/visual-review.md"
failures:
  - "Chrome 命令行 baseline 截图写出后因本机 updater 未退出，移动 baseline 未生成"
  - "首版测试脚本使用 CJS 不支持的 top-level await，并直接导入不存在的 server-only 包"
  - "Lighthouse 证据脚本把全局 aria-live 误当成答案，受控输入提交也早于 React 状态刷新"
  - "音频资源正则在模板字符串中转义不足，浏览器 evaluate 抛出 Uncaught"
  - "图片失败模式仍按动态回答规则判定，误报灯塔主体不可见"
  - "桌面场景出口与全局品牌重叠；API UI/服务端长度和 HTTP 缓存头不一致"
  - "首轮 client bundle 扫描发现旧运行时 registry 把 OPENAI_API_KEY 等禁止词名称打入公共 chunk"
  - "提交前复审发现 adapter 抛异常可能变成 500，live 成功仍残留 fallback.active，音量变化会重复建立 loop"
fixes:
  - "保留已生成 desktop 反基线，最终 mobile 由统一 CDP runner 生成，不伪造缺失 baseline"
  - "测试包装 async main，并移除额外运行时依赖；server module 只由目录边界和 import graph 约束"
  - "证据选择器限定 Lighthouse answer，使用 CDP 真实输入和 user gesture 提交，并等待回答内容变化"
  - "修正正则双重转义；资源失败单独要求同事实源静态列表可见"
  - "出口移到场景安全区并精简为返回来路；问题上限统一 180，HTTP 响应改 private no-store"
  - "Provider 服务增加硬 timeout/cancel race、24 条公开上下文上限和不可信 authorized 清除"
  - "构建时从权威 registry 生成无秘密字段的 public runtime projection，fresh bundle 重新扫描为空"
  - "Provider race 外增加异常回退，live 成功清除 fallback；同场景音量变化只调 Gain，场景变化才 crossfade"
commit: "本检查点提交：feat(world): 落地灯塔导览与可选场景声景"
next_item: C8.1
```

后续记录使用同一结构：

```yaml
checkpoint: Cx
item: Cx.y
status: passed | failed | blocked_external
started_at: ISO-8601
finished_at: ISO-8601
files_changed: []
commands:
  - command: "exact command"
    exit_code: 0
    observed: "实际结果"
evidence: []
failures: []
fixes: []
commit: "hash or null"
next_item: "Cx.z"
```

## 7. 失败日志

已发生的失败均保留并在同一检查点修复、重跑；不覆盖历史：

| Time | Item | Failure | Root cause | Fix | Rerun | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-07-10 12:35 | C0.5 | 审计器误报内部标识符 | 可见文案匹配过宽 | 收紧到 JSX 文本与明确展示字符串 | audit | resolved |
| 2026-07-10 13:29 | C2.2 | Lighthouse 策展区域错误 | 只按语义选择，未核对 areaId | 替换为同区域公开节点 | gateway check | resolved |
| 2026-07-10 13:48 | C2.10 | 回访 dock 遮挡路径热点 | 两个绝对定位对象共享左下安全区 | 下移 desktop dock 并逐图重拍 | browser evidence | resolved |
| 2026-07-10 14:06 | C2.10 | favicon.ico 404 | 浏览器默认请求缺少兼容图标 | 从自有 SVG 转换 ICO 并 fresh build | browser evidence | resolved |
| 2026-07-10 14:33 | C2.8 | JS-off 停在 loading / 空白 | 根 loading 与流式 hidden segment 依赖脚本揭示 | 移除根 loading，增加同事实源 noscript Gateway | js-off screenshot | resolved |
| 2026-07-10 14:45 | C2.8 | 图片失败 fallback 未出现 | 资源在 hydration 前失败，onError 丢失 | 以 complete/naturalWidth 确认成功后才隐藏 fallback | blocked-image screenshot | resolved |
| 2026-07-10 16:09 | C3.9 | production 返回无样式页面 | 用户 dev 与 production 并发改写 `.next` | 引入 `.next-reality` 可选 dist 并统一检查脚本 | fresh isolated build | resolved |
| 2026-07-10 16:18 | C3.4 | Atlas 被推到第二屏 | fallback 外边距发生父级折叠 | 改为绝对定位的舞台内降级层 | production screenshot | resolved |
| 2026-07-10 16:35 | C3.3 | inspector 变化但镜头不动 | matchMedia 仅有 false 的 reduced 条件 | 增加 desktop/mobile 条件并验证 transform | recording + computed style | resolved |
| 2026-07-10 16:38 | C3.4 | inspector 与导航遮挡 | 未预留顶部/底部固定导航安全区 | desktop top-20、mobile bottom-5.5rem | desktop/mobile focused | resolved |
| 2026-07-10 17:20 | C3.4 | mobile 正文被地图文字穿透 | drawer 背景透明度不足 | 使用近实色深色背景，地图上下文保留在 drawer 上方 | mobile focused screenshot | resolved |
| 2026-07-10 17:29 | C3.10 | shared First Load JS 193 kB | 全局壳常驻 Framer 与通用氛围动效 | 移除全局 Framer，降至 158 kB；130 kB 残余转 C6-C8 继续闭合 | fresh build | open-global |
| 2026-07-10 18:25 | C4.6 | mobile 时间锚与事件标签重叠 | desktop 坐标直接压缩到窄屏 | 增加独立 mobile 河道坐标并限制同时显示标签 | mobile screenshot | resolved |
| 2026-07-10 18:39 | C4.12 | mobile 第三个筛选器被截断 | 六列筛选布局在窄屏未完整重排 | 改为两列稳定网格 | mobile screenshot | resolved |
| 2026-07-10 18:55 | C4.12 | 详情与 mobile 证据拍成空结果 | 浏览器 profile 在模式间保留公开检索上下文 | 每个模式导航前清理场景上下文 | evidence rerun | resolved |
| 2026-07-10 19:04 | C4.6 | 时间河录屏未显示事件详情 | 录屏动作未等待 inspector 稳定出现 | 加入显式等待、失败断言与稳定停留 | recording frame review | resolved |
| 2026-07-10 19:45 | C5.7 | Node 开发页 build error | CSS Module 使用无本地作用域的纯全局选择器 | 用 stage / readingWorld 约束全局子组件样式 | browser reload | resolved |
| 2026-07-10 19:54 | C5.14 | 全仓 lint 误扫 860 条生成物错误 | 隔离 dev 目录 `.next-c5` 未被默认 ignore | 停止 dev、删除生成物、恢复自动改写配置 | full lint | resolved |
| 2026-07-10 20:05 | C5.13 | path-journey 缺少路线起始画面 | CDP 静止画面不主动发送 screencast frame | 编码前写入真实当前帧并等待位图就绪 | frame-by-frame review | resolved |

## 8. 证据新鲜度链

每个 production evidence run 必须记录：

```text
latest source/data mtime
  < build startedAt
  < build artifact mtime
  < server startedAt
  < first browser check
  <= screenshots / recordings
  < final audit generatedAt
```

任一步不满足：

- 将 run 标为 `stale`。
- 不删除旧历史，但不得用于当前完成声明。
- 从 fresh build 重新执行整个受影响 evidence run。

## 9. 提交记录

| Checkpoint | Commit | Message | Worktree after commit |
| --- | --- | --- | --- |
| PREP | `fd0ac87b` | `docs(world): 建立真实世界一次性Goal控制包` | clean |
| C0 | `6736d461` | `test(world): 废止终局自评分并建立真实基线` | clean |
| C1 | `f2d533b6` | `feat(world): 建立七类场景视觉资产与基础控件` | clean |
| C2 | `9813f596` | `feat(world): 重塑世界入口与回访抵达体验` | clean |
| C3 | `66c0731c` | `feat(world): 将星图重构为可探索世界地图` | clean |
| C4 | `8d510588` | `feat(world): 落地时间河与档案馆独立空间` | clean |
| C5 | `275fe4be` | `feat(world): 连通可行走路径与内容地点` | clean |
| C6 | `67cfbd9e` | `feat(world): 将路由切换升级为连续场景迁移` | clean |
| C7 | 本检查点提交 | `feat(world): 落地灯塔导览与可选场景声景` | 提交后复核 |

Goal 执行期间每个 checkpoint 新增一行。不得把多个未验证 checkpoint 合并成一个“全部完成”提交。

## 10. 终止决策

最终只按以下决策表处理：

| 条件 | 结论 |
| --- | --- |
| C0-C9 任一未通过 | `WORLD_EXPERIENCE_IN_PROGRESS`，继续 Goal |
| 任一核心 Reality Matrix 行 fail / blocked | 继续修复，不得新增下一轮编号 |
| 全部体验与工程门禁通过，Provider 不可用 | `LOCAL_WORLD_COMPLETE_AI_FALLBACK` |
| 全部体验与工程门禁通过，实时 Provider 也真实通过 | `LOCAL_WORLD_COMPLETE_LIVE_AI` |
| 需要外部部署或用户秘密才能继续 | 完成可控项并记录 external blocker，不擅自操作 |

禁止输出：`9/10`、`完美`、`终局宇宙已全部完成`、`彻底脱离骨架`。最终说明必须列实际模式、证据路径和残余限制。

## 11. 恢复检查

每次自动续跑前回答并写入最新 Record：

- 当前分支和工作树是什么？
- 最近一个 Reality-First commit 是什么？
- 第一项未勾选任务是什么？
- 上次失败是否已经有重跑证据？
- 当前证据是否晚于源码和 build？
- 是否出现用户新改动，需要保护或合并？
- 当前工作是否仍直接改善冻结验收项？

七项回答清楚后继续，不重新规划、不从 C0 重做、不暂停等待用户重复“继续”。
