# WorldOS 生命世界一次性 Goal 执行计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Frontend tasks must use `gsap-core` and `ui-ux-pro-max`; independent review must use `reality-auditor` or a fresh reviewer. Steps use checkbox syntax and every completed item must be mirrored in the execution ledger.

**Goal:** 在一个持续 Goal 内，把现有电影感静态场景 + 热点重构为 localhost / LAN 上持续运行、静态可达、迁移连续、内容可生长、声音可控、灯塔诚实且可导出恢复的生命世界候选。

**Architecture:** 保持 Next.js 模块化单体和 World Kernel 事实主权；先用一个真实内容变更与 Gateway -> Atlas -> Node 纵向样板证伪架构，再固定 Clock、Signals、Scheduler、Scene Module、Migration、Sensory、Memory 与 Export 边界，最后扩展七场景。不得在风险样板失败时复制方案或引入重型引擎。

**Tech Stack:** 固定当前维护中的 Next.js 15.5、React 19.2、TypeScript、Zod 3.25、GSAP 3.15、CSS、SVG / Canvas 2D、原生 View Transition / Web Audio / Page Visibility / Performance API、Fuse.js 7、私有 LAN Ollama `qwen2.5:7b`、Playwright 1.58 配套 Chromium 与 ffmpeg。Next 16、Zod 4 和新渲染引擎只允许 Goal 外 ADR 后迁移。

## Global Constraints

- 只支持 localhost / LAN；不做外部 Preview / Production、域名、HTTPS 或 push。
- 当前状态是 `CINEMATIC_STATIC_WORLD_IN_PROGRESS`；旧完成项和证据全部从零复核。
- 本 Goal 唯一交付为 `LOCAL_LIVING_WORLD_CANDIDATE_AI_PROVIDER_HUMAN_AUDIO_PENDING`；Provider 固定为服务端私有 LAN Ollama `qwen2.5:7b`，且 low-light 故障回退仍是必备能力。去掉人类音频后缀只允许用户在 Goal 外批准新控制版本。
- 元总控、体验验收、架构、Goal 提示词和 checksum 冻结；计划只可勾选，账本可更新。
- 中文优先；权限由服务端 / 数据投影控制，前端只体现。
- Server Components 优先；动态是静态事实的渐进增强，不建立第二份内容或权限状态。
- 新运行时依赖默认 0；未通过 ADR、A/B 测量、降级和删除证明不得引入。
- 每种持续资源只有一个 owner；页面隐藏、场景离开、静谧、错误和卸载必须清理。
- 声音默认关闭；Ollama URL/Key/模型只在服务端；本地 key 不能冒充 Ollama 访问控制，浏览器不得直连 Provider。Provider 故障时必须诚实 low-light，但 fallback 不是本 Goal 的替代完成态。
- 不新增里程碑编号 npm script、分数报告或文件存在性检查；扩展现有主入口。
- 开始和恢复时运行 `node scripts/check-worldos-living-world-readiness.mjs --repair-browser`；只修复缺失的 Playwright 配套 Chromium，不自动升级框架或运行时依赖。
- 每项只运行与其改动相称的定向检查；同一高内聚提交最多覆盖同一检查点四项。完整 build、LAN、九模式媒体与独立审查只在 A-H 检查点边界执行。
- 每个检查点完成后运行定向检查、fresh build、浏览器 / 视觉 / 音频技术验证，更新账本，中文提交并自动继续；真实人类听感只记录外部签收。

## 固定文件责任图

### 新建或收束的核心边界

| 文件 | 单一职责 |
| --- | --- |
| `src/world/experience/types.ts` | Scene、Signal、Runtime、Adapter 公共类型 |
| `src/world/experience/manifest.ts` | 七场景唯一体验注册入口 |
| `src/world/runtime/clock.ts` | 纯世界时间快照 |
| `src/world/runtime/signals.ts` | 事实、时间、旅程和偏好到共享信号 |
| `src/world/runtime/store.ts` | 低频快照、分片订阅和事件 |
| `src/world/runtime/scheduler.ts` | 单一 logical / ambient / choreography 调度 |
| `src/world/runtime/lifecycle.ts` | visible / hidden / route / quiet 资源生命周期 |
| `src/world/migration/coordinator.ts` | 迁移状态、取消、焦点和返回上下文 |
| `src/world/migration/geometry-registry.ts` | 来源 / 抵达对象真实几何 |
| `src/world/sensory/engine.ts` | 单 AudioContext、ambience、cue、crossfade |
| `src/world/sensory/recipes.ts` | 七场景声景对共享信号的投影 |
| `src/world/memory/schema.ts` | 最小化、可清除、可过期访问记忆 |
| `src/world/memory/store.ts` | 容错读写与迁移 |
| `src/world/scenes/*/module.ts` | 七场景私有 Scene Module / Ambient Adapter |
| `src/server/export/build-export.ts` | 受控可移植包生成 |
| `src/server/export/verify-export.ts` | checksum、schema、引用验证 |
| `src/server/export/restore-export.ts` | 仅临时工作区恢复 |
| `data/domains/experience/living-world-acceptance.json` | Goal 前已冻结的 route、mode、flow、采样、状态与风险门机器契约；执行期只读 |
| `data/world-kernel/worldos-living-world-execution-state.json` | checkbox、命令 hash、证据 hash、同检查点最多四项的高内聚实现 commit hash / subject、风险门尝试和 reviewer 的机器状态；执行期可更新 |

### 渐进改造的现有文件

| 文件 | 处理 |
| --- | --- |
| `src/components/world/WorldRuntimeProvider.tsx` | 变为兼容适配层，不再拥有全部状态和一次性时间 |
| `src/components/world/WorldShell.tsx` | 挂载 Runtime lifecycle，不承担场景人格 |
| `src/components/world/migration/*` | 消费新 coordinator 与真实几何 |
| `src/components/product/WorldGatewayStage.tsx` | 接入 Gateway semantic / ambient layers |
| `src/components/atlas/AtlasExplorationStage.tsx` | 将地图对象与背景位图解耦 |
| `src/components/timeline/TimelineRiverStage.tsx` | 建立真实流动河层 |
| `src/components/archive/ArchiveHallStage.tsx` | 建立因果分区 / 光 / 尘层 |
| `src/components/paths/JourneyRouteStage.tsx` | 建立道路流向和进度投影 |
| `src/components/node/NodePlaceRoom.tsx` | 建立低活动度地点层并保护阅读 |
| `src/components/ask/LighthouseGuideStage.tsx` | 接入统一生命周期、信号与灯塔上下文 |
| `scripts/check-worldos-reality-first.mjs` | 扩展为生命世界客观检查，不打分 |
| `scripts/evidence-worldos-reality-first.mjs` | 扩展长录屏、background-hidden、soak 和 freshness |
| `scripts/check-performance-budget.mjs` | 增加 ambient、LoAF、hidden 和资源计数 |

### 不允许创建

- `UniversalLivingScene`、`SceneEngineV3`、通用插件平台或第二个 World Kernel。
- 每场景独立 clock、store、scheduler、AudioContext、权限和内容副本。
- A-H 对应的 npm scripts、阶段报告和硬编码评分器。

---

## A. 撤销继承式完成并建立新鲜基线

**交付结果：** 新 Goal 从真实视觉和运行状态出发；旧 `COMPLETE` 不再出现在当前 `/status` 或恢复指针中。

**Files:**

- Modify: `src/app/status/page.tsx`
- Modify: current status components under `src/components/status/`
- Read-only: `data/domains/experience/living-world-acceptance.json`
- Modify: `scripts/check-worldos-reality-first.mjs`
- Modify: `scripts/evidence-worldos-reality-first.mjs`
- Update: `docs/00-overview/worldos-living-world-execution-ledger-2026-07-11.md`

**Interfaces:**

- Consumes: current production routes, latest Reality-First evidence, source / asset mtimes.
- Produces: truthful baseline `CINEMATIC_STATIC_WORLD_IN_PROGRESS`, machine acceptance contract, first fresh evidence run.

- [x] **A.1** 运行控制校验、只读环境预检、`git status --short --branch`、最近提交和旧证据 freshness；记录 Node、Playwright 配套 Chromium、ffmpeg、LAN 地址、用户改动、可复用实现和无效完成声明。
- [x] **A.2** 用 fresh production build 重新采集七场景 desktop / mobile / text-hidden / background-hidden；记录每个页面静态位图、语义对象、持续环境、主要交互和公开工程文案的真实占比与缺陷。
- [x] **A.3** 使用 `ffprobe` 记录旧九段录屏真实时长；不得把 1.72 至 10.16 秒旧视频算作持续生命、soak 或长期运行证据。
- [x] **A.4** 消费 Goal 前已冻结的 `living-world-acceptance.json`，先写失败的 schema / 数量 / 状态阶梯测试，再让 evidence 与终局校验器读取同一契约；不得在执行期创建、补项或降低它。
- [x] **A.5** 扩展客观检查器，只检查可自动回算的 route、禁用文案、背景隐藏、主对象 bounding box、控制台、资源、权限和 freshness；不得接受 evidence manifest 裸 `pass` 或生成体验分。
- [x] **A.6** `/status` 显示当前真实状态、第一项未完成风险门和证据时间；production build 生成排除自身的完整 `.next` 运行 Merkle，并提供只读 build identity JSON（buildId、sourceCommit、buildRootHash）供 localhost / LAN 终局校验与 live chunk 比对。旧 `LOCAL_WORLD_COMPLETE_AI_FALLBACK` 只作为历史，不作当前摘要。
- [x] **A.7** 审计 package 主命令及全部旧 M / Phase / RC 检查：客观且仍匹配当前契约者保留在 `check:mainline`，只检查旧实现字符串、旧报告或外部 Preview 者移出完成门并登记到 legacy registry；不得为兼容历史骨架保留无效约束，也不得新增阶段脚本。
- [x] **A.8** 运行 `npm run typecheck`、`npm run lint`、`npm run check:world-experience`、fresh build、`git diff --check`。
- [x] **A.9** 独立审查者先看 baseline contact sheet 和录屏时长，再读报告；确认结论仍是未完成后更新账本并提交 `test(world): 撤销继承式完成并建立生命世界基线`。

**Gate A:** 若 baseline 报告仍写“空间世界已完成”或把不同背景图等同独立世界，A 不得通过。

---

## B. 证明一份事实能长成整个世界

**交付结果：** 一个来源真实、公开、非工程自述的节点，只修改事实源就自动进入适用场景、灯塔、导出和回滚；先证明内容生命，再扩大视觉生命。

**Files:**

- Modify: existing World Kernel projection builders under `src/lib/`
- Modify: existing authoring files under `src/server/authoring/`
- Create: `src/server/export/build-export.ts`
- Create: `src/server/export/verify-export.ts`
- Create: `src/server/export/restore-export.ts`
- Create: `scripts/world-export.mjs`
- Modify: `package.json` only to expose one `world:export` entry
- Test: existing authoring / projection checks, extended rather than duplicated

**Interfaces:**

- Consumes: existing Node / Area / Relation / Path / Event schemas and public filter.
- Produces: `WorldExportManifest`, one-source projection trace, temp-workspace restore proof.

- [x] **B.1** 从仓库已有真实内容中选择一个公开代表节点和一次可追溯的小更新；不得编造作者经历，也不得用 RC / QA / WorldOS 自述节点。
- [x] **B.2** 为“节点变更 -> Atlas / Timeline / Archive / Paths / Node / Lighthouse / export”写一个失败的跨投影契约测试，明确“不适用”也必须有结构化原因。
- [x] **B.3** 在临时工作区执行 authoring preview -> apply -> public projection rebuild；验证 visibility、slug、关系、路径、日期和资产错误在写入前阻止。
- [x] **B.4** 修复投影链，使场景 model builder、搜索与 Lighthouse 只消费同一 public projection；不在场景中手工追加节点。
- [x] **B.5** 实现轻量 export：manifest、facts、content、assets registry、preservation objects / events / rights、`checksums.sha256` 和中文 README。
- [x] **B.6** 实现并执行固定接口 `node scripts/world-export.mjs verify-restore --input <export-root> --output <empty-temp-dir>`，在独立临时目录验证 checksum、schema、引用、权限范围并完成最小恢复构建；禁止覆盖真实工作区。
- [x] **B.7** rollback authoring 后，真实工作区 checksum 与更新前一致；导出包仍能解释其来源和版本。
- [x] **B.8** 支持仅进程环境可用的 `WORLDOS_PRIVATE_CANARY_FIXTURE` 与只返回 canary hash 的 `/api/status/permission-canary` 正向控制；在临时私密事实中注入冻结的六个非敏感 canary，扫描 public HTML、RSC、JSON、search、AI context、Canvas payload、截图和默认 export 的真实产物。终局 verifier 将亲自启动第二个 `next start` 注入并重扫，不能委托 helper 自报。
- [x] **B.9** 运行定向检查、typecheck、lint、fresh build、localhost / LAN 六投影浏览器验证和 `git diff --check`。
- [x] **B.10** 更新账本的“内容投影门”结论并提交 `feat(world): 打通事实投影与可移植恢复链`。

**Gate B:** 任一场景需要专门改组件才能显示节点，或导出只有页面 / 截图而无原始事实和恢复证明，必须继续修复。

---

## C. Gateway -> Atlas -> Node 生命纵向样板

**交付结果：** 一条十分钟可运行闭环证明世界时钟、信号、持续环境、迁移、阅读、声音、隐藏恢复和回访可以用现有栈成立。

**Files:**

- Create: `src/world/experience/types.ts`
- Create: `src/world/experience/manifest.ts`
- Create: `src/world/runtime/clock.ts`
- Create: `src/world/runtime/signals.ts`
- Create: `src/world/runtime/store.ts`
- Create: `src/world/runtime/scheduler.ts`
- Create: `src/world/runtime/lifecycle.ts`
- Create: `src/world/runtime/events.ts`
- Create: `src/world/scenes/gateway/module.ts`
- Create: `src/world/scenes/atlas/module.ts`
- Create: `src/world/scenes/node/module.ts`
- Modify: `src/components/world/WorldRuntimeProvider.tsx`
- Modify: `src/components/world/WorldShell.tsx`
- Modify: Gateway / Atlas / Node stage and CSS files

**Interfaces:** Exact types and ownership follow the architecture contract. Existing components consume adapters; they do not create duplicate clock or scheduler.

- [x] **C.1** 写 Clock 失败测试：时区、dayProgress、dayPeriod、seasonProgress、边界、hidden 恢复和确定性 worldDateKey；实现纯 `buildWorldTimeSnapshot()`。
- [ ] **C.2** 写 Scheduler / Lifecycle 失败测试：只注册一个 active adapter，logical 与 ambient 分离，hidden / quiet / route leave / abort / unmount 后资源归零。
- [ ] **C.3** 建立最小 manifest、Signal Snapshot 和 Runtime Store；用 React Profiler 记录现有 Context 与候选分片订阅的重渲染，再决定是否完整迁移 `useSyncExternalStore`。
- [ ] **C.4** 让 `WorldRuntimeProvider` 成为兼容适配层：时间每分钟更新，页面恢复重新派生；每帧变化不进入 React state。
- [ ] **C.5** Gateway 分离空间底层、语义对象和环境层；入场结束后星点 / 雾 / 浮屿 / 灯塔至少两类持续运行，并能 quiet / hidden / background-hidden。
- [ ] **C.6** Atlas 将区域、节点、关系航线从位图中解耦；星体生命来自真实节点状态和关系，背景隐藏后仍可操作和辨认。
- [ ] **C.7** Node 建立低活动度窗光 / 远景 adapter；正文附近静止，day / season 不破坏 60-72ch 阅读和 200% zoom。
- [ ] **C.8** 把 Gateway -> Atlas -> Node -> Gateway 的来源对象、途中介质、抵达对象、焦点和返回位置接入现有迁移协议。
- [ ] **C.9** 制作一个可删除的世界声音样板：一个 ambience + Gateway / Lighthouse 动机草案；用户手势前 0 B，hidden / mute / quiet 后 suspend，并生成 peak、接缝、十分钟离线渲染、波形与频谱技术包。
- [ ] **C.10** 运行十分钟样板：至少一次 minute tick、一次 hidden 2 分钟恢复、一次声音启停、一次关系 Node 往返、一次 memory clear；记录 frame、heap、listener、adapter、AudioContext 和错误。
- [ ] **C.11** 生成 Gateway / Atlas / Node 连续、未剪辑、非重复拼接的 60-120 秒长录屏、background-hidden / text-hidden / mobile / reduced contact sheet 和音频技术记录；有真实人类参与时再附听感签收。
- [ ] **C.12** fresh 独立审查回答“什么在持续运行、变化来自哪里、关掉背景后能做什么”；任一回答依赖工程解释则回到 C.5-C.9。
- [ ] **C.13** 运行 runtime tests、typecheck、lint、fresh build、localhost / LAN、性能与权限扫描，更新账本并提交 `feat(world): 建立三场景生命纵向样板`。

**Gate C:** 十分钟运行、长录屏、声音技术验证或 background-hidden 任一失败，不得进入七场景复制，也不得先引入新引擎；缺少人类听感签收只保留状态后缀，不得伪造通过。

---

## D. 固定生命运行内核并消除双系统

**交付结果：** 样板证明有效后，固定唯一 Clock / Signals / Store / Scheduler / Lifecycle / Manifest；旧一次性时间、重复循环和 registry 退出主线。

**Files:**

- Modify: all files created in C
- Create: `src/world/runtime/debug-resources.ts`
- Modify: `src/lib/runtime/time-context.ts`
- Modify: `src/lib/runtime/journey-storage.ts`
- Modify: `src/lib/runtime/sensory-preference.ts`
- Modify: existing scene / ambient / sensory registries only to derive from manifest or remain single-purpose
- Modify: central runtime and world experience tests

- [ ] **D.1** 根据 C 的 profiler / trace 选择最小 Store 方案并在账本记录决策；没有收益时保留 reducer 接口，不为架构图迁移。
- [ ] **D.2** 固定 `WorldExperienceManifestEntry`、`SceneModule`、`AmbientAdapter`、`WorldSignalSnapshot` 和 Runtime Event 公共类型；类型只能从一个入口导出。
- [ ] **D.3** 把现有 scene、transition、ambient、sensory registry 逐项列为 owner / derived / legacy；同一概念只保留一个权威注册入口。
- [ ] **D.4** 删除或隔离被替代的一次性时间计算、场景私有 ticker / interval 和重复偏好读写；新主线不得依赖 `_legacy`。
- [ ] **D.5** 实现 `debugResources()` 只在 status / test 可用，返回 active adapter、rAF/ticker、timer、listener、animation、AudioContext/source 数量，不进入公开页面。
- [ ] **D.6** 验证场景异常、路由取消、React Strict Mode 双挂载、图片失败和 storage error 均只清理自己的资源，不破坏静态内容。
- [ ] **D.7** 对 manifest 增加编译期完整性和运行时 schema 检查；新增场景模拟不得修改五处 switch / registry。
- [ ] **D.8** 运行 runtime / manifest / cleanup tests、typecheck、lint、fresh build、十分钟回归和 diff check。
- [ ] **D.9** 更新账本并提交 `refactor(world): 收束唯一生命运行内核`。

**Gate D:** 出现双 clock、双 scheduler、双 AudioContext、离场资源或五处 registry 修改即失败。

---

## E. 七场景生命化与感官原型门

**交付结果：** Timeline、Archive、Paths、Lighthouse 接入同一信号和生命周期；七场景在停止交互后仍以不同方式运行，同时 Node / Archive 保持安静。

**Files:**

- Create: `src/world/scenes/timeline/module.ts`
- Create: `src/world/scenes/archive/module.ts`
- Create: `src/world/scenes/paths/module.ts`
- Create: `src/world/scenes/lighthouse/module.ts`
- Modify: Timeline / Archive / Paths / Lighthouse stage and CSS files
- Modify: `src/world/experience/manifest.ts`
- Modify: `data/assets/world-scene-assets.json`
- Modify: central evidence and performance scripts

- [ ] **E.1** Timeline 先做 SVG 合成层与 Canvas 2D 两个最小可删除河流原型；比较 mobile 4x slowdown p95 frame、可访问替代、代码量和视觉流向，账本记录保留 / 删除决定。
- [ ] **E.2** 选定河流在进入结束后持续流动，事件涟漪只局部发生；background-hidden 后河道、时间锚和事件仍构成空间。
- [ ] **E.3** 对 Timeline 声音样板与画面执行同步技术分析，确认流向、节奏、峰值、接缝和 source 生命周期；有真实人类时追加干扰与疲劳签收，技术未通过不得扩展七场景音频。
- [ ] **E.4** Archive 接入低活动度窗光 / 尘 / 材质，搜索与筛选因果重排分区与卷宗；输入和扫描不受持续运动影响。
- [ ] **E.5** Paths 接入真实进度驱动的道路前向生命、完成沉淀、下一站和季节环境；不能靠按钮 pulse 表达。
- [ ] **E.6** Lighthouse 接入统一 scheduler、Clock、Signals 和 Sensory recipe；光束指向真实可达对象，Provider 状态只改变局部节奏。
- [ ] **E.7** 七场景分别实现 dawn/day/dusk/night 与 spring/summer/autumn/winter 的私有 recipe；同一时刻一致，不能是全局滤镜或整图组合爆炸。
- [ ] **E.8** 为 mobile 建立独立 framing、对象密度和更新率；low quality 降低绘制，不隐藏事实与操作。
- [ ] **E.9** 对每场景执行 desktop/mobile/text-hidden/background-hidden/quiet/reduced/JS-off/resource-failure；修复所有空间人格和可达性失败。
- [ ] **E.10** 为七场景各录制连续、未剪辑、非重复拼接的 60-120 秒静置生命视频，记录 wall-clock、单调时钟、capture command、`ffprobe` 与 checksum，并生成无标题 contact sheet；实现者逐图逐段写实际观察。
- [ ] **E.11** fresh 独立审查者按随机顺序查看隐藏标题、导航、标签和报告状态的七场景及 background-hidden 对照，辨认空间、主体、主生命行为、变化来源和可做操作；任一场景仍像静态图 + 热点则退回修复。
- [ ] **E.12** 运行 scene tests、typecheck、lint、fresh build、性能 / 资源 / 权限检查，更新账本并提交 `feat(world): 完成七场景持续生命投影`。

**Gate E:** Timeline 河流与声音原型未通过连续视频 / 技术验证，或任一场景 background-hidden 后失去主体，不能进入最终整合；人类听感未签收只允许待签后缀。

---

## F. 完整迁移、深链与回访连续性

**交付结果：** 所有主要导航遵循同一协议但具有不同路线隐喻；深链、返回、刷新、快速切换和回访保持上下文。

**Files:**

- Create: `src/world/migration/coordinator.ts`
- Create: `src/world/migration/intent.ts`
- Create: `src/world/migration/geometry-registry.ts`
- Create: `src/world/memory/schema.ts`
- Create: `src/world/memory/store.ts`
- Modify: `src/components/world/migration/*`
- Modify: `src/components/world/SceneTransitionShell.tsx`
- Modify: all scene links and visit-memory consumers

- [ ] **F.1** 写 coordinator 状态与取消测试：idle / leaving / in-transit / arriving / settled / cancelled，覆盖快速覆盖、route error、404、unmount、reduced 和 back / forward。
- [ ] **F.2** 实现真实 source geometry 与 arrival target registry；目标不可用时使用场景级安全点，不把全部坐标硬编码为百分比。
- [ ] **F.3** 为八类路线族实现不同介质和具名对象；共享 coordinator，不共享一个换色全屏 fade。
- [ ] **F.4** 从真实 route 与 link 生成全部跨场景边清单，所有核心出口使用统一 `SceneDestination`；逐边标记协议或合法 bypass，未覆盖数必须为 0，页内 hash、普通表单和外链不得误触迁移。
- [ ] **F.5** 实现 `VisitMemoryV2`：returnGap、最近公开对象、路径进度、过期、容量、旧 schema 迁移和一键清除；失败回首访。
- [ ] **F.6** 验证外部深链 Node / Timeline / Path 不强迫 Gateway；返回来源、查询、河段、地图视野、Path 进度和焦点正确。
- [ ] **F.7** 完成 30 次 rapid navigation、刷新、图片未加载、浏览器 back / forward、mobile 与 reduced 流程；资源计数回到稳定值。
- [ ] **F.8** 录制八类路线的 source / transit / arrival / settled 和 returning visit；逐段确认不是说明条或普通换页。
- [ ] **F.9** 运行 migration / memory tests、typecheck、lint、fresh build、F1-F7 浏览器流程和 diff check。
- [ ] **F.10** 更新账本并提交 `feat(world): 闭合空间迁移与回访连续性`。

---

## G. 声景、灯塔、内容生命与长期主权收束

**交付结果：** 感官、AI、内容和导出使用同一事实与信号；作者可以长期养护，但没有 Provider 和未来私密产品时仍诚实完整。

**Files:**

- Create: `src/world/sensory/engine.ts`
- Create: `src/world/sensory/recipes.ts`
- Create: `src/world/sensory/assets.ts`
- Modify: `src/lib/sensory-audio.ts`
- Modify: `src/components/world/RuntimeSoundscapeControl.tsx`
- Modify: `data/assets/world-scene-assets.json`
- Modify: existing Lighthouse server / route / UI files
- Modify: content lifecycle and public curation facts
- Modify: export / authoring files from B

- [ ] **G.1** 用已通过的世界动机建立七场景 SoundscapeRecipe；优先自制 / 程序化 / 可核验 CC0，逐件登记来源、许可、hash、峰值、用途和 fallback。
- [ ] **G.2** 实现单 AudioContext、手势 arm、一个 ambience + 一个 cue、crossfade、volume、mute、quiet、hidden、error 和 dispose；声音启用前网络音频 0 B。
- [ ] **G.3** 自动完成 Gateway / Timeline / Archive / Node / Lighthouse 与三次迁移的十分钟离线渲染、true peak、接缝、波形 / 频谱和资源释放验证；若真实人类可参与，再用耳机和扬声器各连续试听 10 分钟并登记疲劳、刺耳、增益跳变和阅读干扰。Codex 不得代签，缺少签收时保留 `HUMAN_AUDIO_PENDING`。
- [ ] **G.4** Lighthouse 检索只读公开投影，返回来源、下一站、原因和不确定性；实现独立 `ollama` adapter，原生 `/api/chat` 使用 structured output、`stream:false`、低温度、public context allowlist 和 Zod 后验校验；low-light、timeout、schema error、限流、无来源和私密请求有一致契约，并在 `/api/status/lighthouse-eval` 提供仅本地 QA 可用的固定十例重放入口，返回 build/source 身份供终局现场比对。
- [ ] **G.5** 用 `.env.local` 的服务端 Ollama 配置执行真实预热、模型存在性、5 个正常 live-provider case、私密/未知拒答和 3 个故障回退 case；记录真实 model、duration/load/eval metrics、冷启动与热请求 latency。冷启动不得超过 45 秒，预热后请求不得超过 12 秒；Key 不得被解释为本地 Ollama 的认证边界。
- [ ] **G.6** 固定 seed / growing / active / settled / archived 的事实规则和作者确认边界；AI 不得改变生命周期。
- [ ] **G.7** 抽样 24 个真实节点验证六投影、关系理由、路径、时间、Lighthouse 和至少两个出口；工程过程内容可检索但不主导首访。
- [ ] **G.8** 完整演练中文 authoring preview -> apply -> impact -> export -> verify -> temp restore -> rollback；真实工作区最终 checksum 一致。
- [ ] **G.9** 验证 rights、preservation object/event 和仅 public export；不实现私密备份、OCFL / PREMIS 全规范、CRDT、家庭继承或私密 UI。
- [ ] **G.10** 运行 audio、Lighthouse、AI / permission、content、authoring、export tests、typecheck、lint、fresh build、浏览器和资产预算。
- [ ] **G.11** 更新账本，按实际 AI 模式提交 `feat(world): 收束声景灯塔内容与可移植主权`。

---

## H. 复杂度、规模、故障与终局真实审查

**交付结果：** 一个证据新鲜、没有自评分、可以在 localhost / LAN 真实体验的生命世界候选；若任何否决项存在，继续修复而不是新建下一轮。

**Files:**

- Modify: central checks / evidence / performance scripts
- Modify: `package.json` and script registry only for command consolidation
- Update: `docs/00-overview/worldos-living-world-execution-plan-2026-07-11.md` checkboxes only
- Update: `docs/00-overview/worldos-living-world-execution-ledger-2026-07-11.md`
- Generate: one fresh evidence run under `docs/90-archive/reports/worldos-living-world/<run-id>/`

### H1. 工程、规模与失败注入

- [ ] **H.1** 在临时工作区生成 1x / 5x / 10x public projection，测 schema、build、index、search p50/p95、Atlas layout、payload 和删除后工作树；只在阈值越界时写 ADR。
- [ ] **H.2** 按冻结协议执行 3 次 cold、1 次 warmup、5 次 measured warm，ambient 至少采 300 帧，并覆盖 desktop/mobile、normal/CPU 4x/LAN；验证 shared / route JS、bitmap、audio、ambient p95、LoAF、INP、LCP、CLS、hidden、十分钟 heap 和 30 次迁移资源预算，不调高预算掩盖失败。
- [ ] **H.3** 完成 bitmap / audio / Provider / public API / storage / clock boundary / malformed memory / route error 故障注入，无白屏、泄漏、死路和工程术语。
- [ ] **H.4** 完成 keyboard、拖动替代、focus restore、200% zoom、颜色非唯一、Canvas / SVG 等价、mobile touch、reduced-motion、reduced-sensory 和 JS-off。
- [ ] **H.5** 收束日常入口至开发、构建、类型、lint、体验检查、边界检查、本地 RC、作者 / 导出流程不超过 8 个；历史命令隔离并实际抽样，不新增空壳脚本。

### H2. Fresh 证据

- [ ] **H.6** 从 clean source 运行 fresh `npm run build:production-ci`，启动新的 `next start -H 0.0.0.0`，记录 localhost 与实际 LAN IP，并从两者读取同一 build identity JSON；不得复用旧 server。
- [ ] **H.7** 扩展并运行 `npm run evidence:world-experience`：manifest 只索引 13 类冻结原始 artifact 及 hash；生成 7 段连续未剪辑的 60-120 秒场景视频、十分钟 soak、F1-F14 trace / trace summary / build-bound recording、9 views 及逐图 build/server sidecar、时间 / 季节成对截图、完整迁移边、音频分析、灯塔 case、固定权限 canary、public export/restore、性能原始样本、复杂度、资产和盲审包。不得用汇总 `pass`、文件 mtime 或裸 hash 代替当前 build 绑定。
- [ ] **H.8** 实现者先逐张、逐段检查页面、录屏和音频技术记录，不看 `passed` 摘要；有真实人类签收时一并核对，所有观察、P0/P1/P2 和修复写入账本。
- [ ] **H.9** 修复全部 P0/P1 后 fresh rebuild，并重新生成所有受公共 runtime 影响的证据。

### H3. 独立审查与固定停止

- [ ] **H.10** 调用两个 fresh、只读 `reality-auditor` / reviewer task；分别记录 task/thread ID、开始时间、源码 commit、build hash、盲审 pack hash 和 evidence run，各自产出不可由主执行器改写的独立报告文件与 hash。随机顺序先看隐藏标题、导航、标签与报告状态的 contact sheet、background-hidden、长录屏、迁移和音频记录，再看自动报告和源码。
- [ ] **H.11** 独立审查逐行判定七场景、持续生命、时间季节、迁移、内容、回访、声音、灯塔、静态、性能、权限、导出恢复和复杂度，只使用 pass / fail / blocked。
- [ ] **H.12** 对所有 fail / blocked 回到对应 A-G 项修复；不新增 I、M、Phase、RC 或第二份计划。
- [ ] **H.13** 至少完成两次 fresh 独立视觉 / 交互 / soak 审查，使用两个不同 reviewer context；若首轮有 finding，第二轮必须晚于对应修复 commit；第二轮证据必须晚于最终源码、数据、资产、build 和 server。
- [ ] **H.14** fresh 运行 `npm run typecheck`、`npm run lint`、`npm run build:production-ci`、`npm run check:world-experience`、`npm run check:mainline`、`npm run release:local-rc`、`git diff --check`；把这些命令生成的受 Git 跟踪本地报告、H.14 checkbox、账本与机器状态提交为最终 source commit，之后不得再运行会改写旧报告的命令。
- [ ] **H.15** 运行 `node scripts/verify-worldos-living-world-final.mjs --preflight` 独立读取冻结契约、账本和真实媒体；确认四个风险门、F1-F14、固定否决项、P0/P1、权限、AI、资产、恢复和 freshness 全部通过，否则持续推进。H.16 写入最终状态后，控制校验必须再调用无参数终局校验。
- [ ] **H.16** 最终状态固定写为 `LOCAL_LIVING_WORLD_CANDIDATE_AI_PROVIDER_HUMAN_AUDIO_PENDING`；Ollama 必须在 fresh server 上通过固定正常/故障/权限/依据评测，人类听感记录只列为 Goal 外待用户复核事实，不在本 Goal 自动去掉后缀；列残余 P2 与未验证长期目标，提交 `docs(world): 完成生命世界候选真实验收`。

## 每项固定小循环

```text
读取控制包、环境预检和账本
  -> git status / 证据 freshness
  -> 记录 Verified Fact / Hypothesis / Experiment
  -> baseline
  -> 失败测试或可证伪观察
  -> 最小完整实现
  -> 定向检查
  -> checkbox + ledger
  -> 最多四个同检查点高内聚项组成中文实现提交
  -> execution state 逐项绑定命令 / 证据 hash / commit hash / subject
  -> 自动进入下一项
```

到达 A-H 任一检查点末项时，再执行 fresh production、localhost/LAN、适用的九模式长录屏/截图/trace/音频技术验证、实现者与独立审查、修复和检查点封存。同一份 fresh 检查点原始证据允许被该检查点多个完成记录引用，跨检查点或跨 source commit 不得复用。

### 最终封存顺序

1. H.14 先完成所有会改写受 Git 跟踪报告的主线与本地 RC 命令，并提交这些报告和 H.14 状态；该提交成为 `final_source_commit`。
2. 从该 clean commit 再运行一次 fresh production build，生成 build identity，启动新的 localhost/LAN server 并采集最终证据。此后只允许修改最终 evidence run、执行计划 checkbox、账本和机器状态。
3. H.15 preflight 通过后提交其状态；H.16 只更新允许的控制状态并提交，再运行无参数终局 verifier。不得在 `final_source_commit` 后重跑会改写旧 RC 或 audit 报告的命令。

同一风险门的 `attempt_count` 只在完成一次有明确假设、实现、测量和删除 / 简化处置的实验后增加。连续三次仍失败必须进入 `BLOCKED_DESIGN_REVIEW_REQUIRED`，不得在同一 Goal 内无限换皮重试。

## 计划覆盖自检

| 目标 | 执行位置 |
| --- | --- |
| 撤销旧自证完成 | A |
| 真实内容自动投影 | B、G |
| 可移植事实与恢复 | B、G |
| Clock / Signals / Scheduler / Lifecycle | C、D |
| 三场景风险样板 | C |
| 七场景独立生命 | E |
| Timeline 河流与感官原型 | E |
| 迁移、深链、返回和回访 | F |
| 声景、音乐动机、技术验证与可选人类签收 | C、E、G |
| Lighthouse low-light / Provider 边界 | G |
| 权限、静态、移动、无障碍 | B、H |
| 性能、规模、故障和复杂度 | D、H |
| 长录屏、soak、独立审查、freshness | A、C、E、H |
| 一次 Goal 固定停止 | H；禁止新增后续阶段 |

没有任何终极愿景被写成无法由本 Goal 验证的完成项；私密世界、家庭继承、跨设备与真实长期回访只保留不锁死基础。
