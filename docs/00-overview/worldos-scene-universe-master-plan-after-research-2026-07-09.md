# WorldOS 场景宇宙总规划（联网调研后）

> 日期：2026-07-09  
> 范围：暂不考虑外部 Preview / Production，只面向 localhost 与 LAN IP 的成熟体验打磨。  
> 定位：把“带动态特效的博客”推进为“可进入、可穿行、可回到上次位置的个人数字世界”。

## 一句话目标

WorldOS 的下一段核心目标不是继续堆动画，而是建立 **Scene Runtime / Scene Grammar**：让每个公开页面都有明确的场景身份、进入仪式、转场语法、环境反馈、旅程记忆和可验收的降级策略。

最终访问者应当感受到：

- 不是打开一个博客首页，而是抵达一个世界入口。
- 不是点击导航，而是在入口、星图、时间河、档案馆、节点房间、灯塔之间穿行。
- 不是看一组卡片，而是沿路径进入、抵达、回望、继续下一站。
- 不是被动看动效，而是世界状态、时间、场景、路径共同影响体验。

## 联网调研结论

### 1. Motion 必须服务空间理解，而不是装饰

Material Design 的 motion 指导强调，动效要帮助用户理解对象之间的关系、层级与连续性，而不是只制造视觉热闹。[Source: https://m3.material.io/styles/motion/overview]

对 WorldOS 的启发：

- 首页到 Atlas 应该表达“视角拉远 / 展开地图”。
- Atlas 到 Node 应该表达“星点放大 / 进入房间”。
- Timeline 到 Node 应该表达“时间片展开”。
- Archive 到 Node 应该表达“档案抽出”。

也就是说，转场应当解释“我从哪里来、去到哪里”，而不是所有页面统一淡入。

### 2. View Transition API 适合建立页面转场语法，但要渐进增强

MDN 对 View Transition API 的描述是：它提供一种在 DOM 状态切换之间创建动画转场的机制，适合单页应用内的视觉连续性；同时浏览器支持与应用架构需要谨慎评估。[Source: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API]

对 WorldOS 的启发：

- 短期不要强依赖 View Transition API，避免 Next App Router 兼容和浏览器差异带来新风险。
- 先用现有 `framer-motion` / `gsap` 做场景层转场抽象。
- 中期可把 View Transition API 作为 progressive enhancement，只在支持时启用。

### 3. Reduced Motion 是硬约束，不是后补选项

MDN `prefers-reduced-motion` 明确用于检测用户是否请求减少非必要动画。[Source: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion]

WCAG 2.2 也将“由交互触发的动画可禁用”列为重要可访问性要求。[Source: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html]

对 WorldOS 的启发：

- 每个场景动效都必须有 reduced-motion 文案与静态替代。
- 首次进入仪式必须可跳过、可静态显示。
- 移动端和 reduced-motion 下优先保留信息架构，不保留复杂位移。

### 4. GSAP 与 Motion 的角色要分清

GSAP 官方 `matchMedia()` 适合根据媒体查询组织动画，并能集中清理上下文。[Source: https://gsap.com/docs/v3/GSAP/gsap.matchMedia/]

Motion / Framer Motion 的 `AnimatePresence` 适合处理 React 组件进入/退出动画。[Source: https://motion.dev/docs/react-animate-presence]

对 WorldOS 的启发：

- GSAP：用于场景内一组元素的编排、入场、聚焦、微动效。
- Framer Motion：用于 React 状态驱动的组件显隐、局部 runtime 状态、现有全局氛围层。
- 不新增第三套动效库。
- 不先上 Three.js。当前问题是场景语法缺失，不是 3D 技术缺失。

### 5. Local-first 体验记忆适合当前阶段

Ink & Switch 的 local-first 思路强调软件应在本地优先可用，网络和服务器不是所有体验的前提。[Source: https://www.inkandswitch.com/local-first/]

对 WorldOS 的启发：

- 首次进入、上次旅程、低动效偏好、最近公开节点，可以保存在本地。
- 这些本地记忆只能影响体验恢复，不能作为权限来源。
- 私密、owner、权限边界仍必须由后端 guard 和事实源控制。

### 6. 当前项目已具备一半地基

本地摸底发现，项目已经有以下基础：

- `src/components/world/WorldRuntimeProvider.tsx`
- `src/components/world/RuntimeAtmosphere.tsx`
- `src/components/world/RuntimeSignalDock.tsx`
- `src/lib/motion-grammar.ts`
- `src/components/world/useGsapEntrance.ts`
- `src/components/node/NodeOpeningRitual.tsx`
- `data/r8-full-dynamic-world/route-scenes.json`
- `data/r8-dynamic-world/interaction-spec.json`
- `data/core/world-runtime-protocol.json`

关键问题不是“没有动态能力”，而是：

- 场景事实源仍在旧 R8 数据中，没有进入当前主线。
- 页面知道自己是页面，但不知道自己是什么“场景”。
- 转场还没有统一语法。
- 首次进入仪式、场景差异、世界状态驱动、路径记忆没有形成闭环。

## 当前差距

| 维度 | 当前状态 | 目标状态 | 差距 |
| --- | --- | --- | --- |
| 首页 | 内容入口 + 动态星图 | 世界入口 / 创世原点 | 缺首次进入仪式和恢复旅程 |
| Atlas | 地图与星线可见 | 星图穹顶 | 缺从入口拉远、从星点进入节点的连续感 |
| Timeline | 时间流可用 | 时间河 | 缺事件展开、时间片转场、区域水位感 |
| Archive | 档案检索可用 | 档案馆 | 缺书库/抽屉/卷宗式场景人格 |
| Node | 阅读页 + 开场仪式 | 节点房间 | 缺来源场景感和进入/离开路径 |
| Paths | 路径列表和详情 | 旅程板 / 路线 | 缺“开始、经过、抵达、下一站、回望”的过程感 |
| Ask | 低光只读灯塔 | 灯塔问路处 | 缺光束、边界、推荐路径的场景化表达 |
| Status | 控制台可观测 | 维护舱 | 已接近目标，后续接 Scene Runtime 状态 |
| 动效 | 组件级分散动效 | 场景级统一语法 | 缺 registry、transition、acceptance |
| 权限 | 后端 guard 基本建立 | 后端决定权限，前端只体现 | 必须继续保持 |

## 目标树

### 北极星目标

让 WorldOS 成为一个本地成熟、中文优先、低门槛、可维护的个人数字宇宙。

### 一级目标

1. **可进入**：首次访问有短、轻、可跳过的进入仪式。
2. **可识别**：每个主页面都有明确场景身份和视觉人格。
3. **可穿行**：重要页面之间有对应空间语义的转场。
4. **可恢复**：本地记录公开旅程状态，支持继续上次探索。
5. **可降级**：reduced-motion、移动端、低性能设备都能完整使用。
6. **可验收**：每个场景/转场/仪式都进入事实源和检查脚本。

### 二级目标

- 建立统一 Scene Registry。
- 建立 Scene Runtime Provider 扩展层。
- 建立 First Visit Ritual。
- 建立 Scene Transition Shell。
- 建立 Ambient Environment Layer v2。
- 建立 Journey Memory。
- 建立 Scene QA Matrix。

## 里程碑规划

### M1：场景语法成型

目标：所有公开主页面都有统一场景定义，状态页能显示当前场景系统状态。

完成标准：

- 新增主线场景注册表。
- `/`、`/atlas`、`/timeline`、`/archive`、`/paths`、`/paths/[id]`、`/node/[slug]`、`/ask`、`/status` 都有场景定义。
- 每个场景定义中文名、类型、入场语法、出场语法、环境层、reduced-motion 策略。
- 新增 `check:scene-runtime`。

### M2：进入与恢复体验成型

目标：访问者首次进入能感到“抵达世界”，再次进入能继续上次旅程。

完成标准：

- 首页首次进入仪式上线。
- 可跳过，可不再显示。
- 本地只记录公开体验偏好，不涉及权限。
- RuntimeSignalDock 能展示继续旅程。

### M3：场景转场成型

目标：首页、Atlas、Timeline、Archive、Node、Ask 之间不再像普通页面跳转，而有空间连续性。

完成标准：

- 至少 4 种转场语法：
  - `gateway-to-atlas`
  - `atlas-to-node`
  - `timeline-to-node`
  - `archive-to-node`
- reduced-motion 下转为静态切换。
- 移动端不遮挡、不误触。

### M4：场景人格成型

目标：不同页面不仅内容不同，氛围、节奏和入口行为也不同。

完成标准：

- Atlas 有星图穹顶人格。
- Timeline 有时间河人格。
- Archive 有档案馆人格。
- Node 有节点房间人格。
- Ask 有灯塔人格。
- Status 有维护舱人格。

### M5：验收可信化成型

目标：场景宇宙体验不是主观描述，而能被脚本、截图和报告持续验证。

完成标准：

- `release:local-rc` 截图覆盖场景关键状态。
- 新增 scene QA 报告。
- 检查首屏仪式、场景标识、主 CTA、转场降级、移动导航。
- `check:daily`、`check:strict`、`release:local-rc` 继续通过。

## 阶段规划

### 阶段 26：Scene Registry 与场景事实源

目标：让页面知道自己“是什么地方”。

具体项：

1. 从 `data/r8-full-dynamic-world/route-scenes.json` 提炼当前公开主线需要的场景。
2. 新建主线事实源，例如 `data/domains/experience/scene-registry.json`。
3. 新建 `src/lib/scene-runtime.ts`，提供 `getSceneForPathname()`、`getSceneTransition()`。
4. 更新 `/status`，展示 Scene Runtime 状态。
5. 新增 `scripts/check-worldos-scene-runtime.mjs`。

验收：

- 每个公开主页面都有 scene。
- 旧 `_legacy` 路由不进入当前公开场景主线。
- 场景配置来自事实源，不在页面中散落硬编码。

### 阶段 27：首次进入仪式

目标：从“打开首页”变为“抵达世界”。

具体项：

1. 新增 `FirstVisitRitual` 组件。
2. 基于 localStorage 记录 `hasSeenGatewayRitual`，只作为公开体验偏好。
3. 进入仪式提供 3 个入口：看地图、走第一条路径、问灯塔。
4. reduced-motion 下直接展示静态入口。
5. 增加跳过按钮和键盘可访问。

验收：

- 首次进入可见，二次进入不强打扰。
- 可跳过、可恢复。
- 不读取 token，不控制权限。

### 阶段 28：Scene Transition Shell

目标：建立统一页面转场容器。

具体项：

1. 新增 `SceneTransitionShell`。
2. 统一记录上一场景与当前场景。
3. 实现 4 种转场：
   - `fade-rise`
   - `zoom-star`
   - `river-shift`
   - `archive-drawer`
4. GSAP 只负责场景转场编排，Framer Motion 负责组件状态显隐。
5. reduced-motion 下关闭位移和缩放。

验收：

- 首页到 Atlas 有不同于普通页面的过渡。
- Atlas/Timeline/Archive 到 Node 有来源语义。
- 转场不阻塞页面可访问性。

### 阶段 29：场景人格深化

目标：让每个核心页面像不同空间。

具体项：

1. Atlas：星图穹顶，强化区域聚焦、星线、节点预览。
2. Timeline：时间河，强化事件流、时间片、区域过滤。
3. Archive：档案馆，强化检索、卷宗、抽屉、馆藏状态。
4. Node：节点房间，强化护照、来源、关系、下一站。
5. Ask：灯塔，强化只读边界、推荐路径、低光状态。

验收：

- 访问者不看 URL 也能分辨自己在哪个场景。
- 每个场景都有主行动和下一站。
- 中文文案不解释技术实现，只表达世界行为。

### 阶段 30：Journey Memory 与路径连续性

目标：让路径像旅程，而不是链接清单。

具体项：

1. 扩展 `WorldRuntimeProvider` 的本地旅程记忆。
2. 记录最近公开节点、最近路径、当前场景。
3. `RuntimeSignalDock` 提供继续旅程。
4. `PathDetail` 显示当前位置、已走节点、下一站。
5. Node 页返回来源路径或来源场景。

验收：

- 旅程记忆只影响体验，不影响权限。
- 清除 localStorage 后系统仍完整可用。
- 移动端不依赖右下角 dock 才能继续。

### 阶段 31：Ambient Environment v2

目标：让世界状态驱动空气，而不是只显示数字。

具体项：

1. dayPeriod 影响光照、背景层和灯塔亮度。
2. season 影响色温、微纹理和节点节奏。
3. aiStatus 影响 Ask / Lighthouse 的亮度与提示。
4. currentScene 影响 RuntimeAtmosphere 的对象和节奏。
5. Status 页展示环境来源和降级状态。

验收：

- 同一页面在不同 dayPeriod 有轻微但可辨认差异。
- reduced-motion 下环境仍能被静态色彩/文案表达。
- 不引入大图或重型 3D 依赖。

### 阶段 32：Scene QA 与本地 RC 固化

目标：把“世界感”纳入可信验收。

具体项：

1. 新增 scene QA checklist。
2. Playwright 截图覆盖：
   - desktop scene
   - mobile scene
   - reduced-motion scene
   - first visit ritual
   - returning visitor state
3. 增加 canvas/DOM 非空检查。
4. 增加文案溢出和遮挡扫描。
5. 将 `check:scene-runtime` 纳入 `check:mainline`。

验收：

- `check:daily` 通过。
- `check:strict` 通过。
- `release:local-rc` 通过。
- 截图报告能区分 scene、viewport、motion mode。

## 分层架构建议

### 数据层

- `data/domains/experience/scene-registry.json`
- `data/domains/experience/scene-transition-registry.json`
- `data/domains/experience/journey-memory-policy.json`

职责：只描述公开场景事实、转场语义、体验记忆边界。

### Lib 层

- `src/lib/scene-runtime.ts`
- `src/lib/scene-transition.ts`
- `src/lib/journey-memory.ts`

职责：解析事实源，提供纯函数，不直接访问 DOM。

### Runtime 层

- `src/components/world/WorldRuntimeProvider.tsx`
- `src/components/world/SceneRuntimeProvider.tsx`
- `src/components/world/SceneTransitionShell.tsx`
- `src/components/world/RuntimeAtmosphere.tsx`

职责：连接 pathname、runtime state、scene、motion preference。

### Scene Components 层

- `src/components/scenes/FirstVisitRitual.tsx`
- `src/components/scenes/SceneStatusPanel.tsx`
- `src/components/scenes/SceneEntrance.tsx`
- `src/components/scenes/SceneEnvironment.tsx`

职责：展示可复用的世界场景 UI。

### Page 层

页面只消费场景能力，不硬编码权限，不硬编码大段动效。

## 权限与边界

必须继续坚持：

- 后端控制权限。
- 前端只体现权限结果。
- localStorage 只能用于公开体验偏好。
- `FirstVisitRitual`、`JourneyMemory`、`SceneTransition` 不得读取 owner token。
- AI 灯塔继续低光只读，真实 Provider disabled。
- private/vault/owner 数据不进入公开 scene registry。

## 不做清单

下一阶段不做：

- 外部 Preview / Production。
- 真实 AI Provider。
- 私密内容读取。
- 复杂 3D 宇宙。
- 新增大型动效库。
- 为了炫技做长时间开屏动画。
- 让转场阻塞阅读或导航。

## 风险与控制

| 风险 | 表现 | 控制 |
| --- | --- | --- |
| 动效过度 | 像炫技页面，影响阅读 | 每段动效小于 800ms，连续背景可关闭 |
| 移动端拥挤 | 文案/按钮/导航遮挡 | 每阶段必须跑 mobile reduced-motion 截图 |
| 权限误用 | localStorage 被误当权限 | 检查脚本扫描 owner/auth/permission 本地硬编码 |
| 架构发散 | 每页各写一套场景 | scene registry + lib + shell |
| 旧 R8 数据污染 | legacy 路由混入主线 | 主线 registry 只收公开页面 |
| RC 证据漂移 | 截图/报告误导 | release:local-rc fresh build 继续保留 |

## 优先级

### P0：必须先做

1. Scene Registry 主线化。
2. `check:scene-runtime`。
3. `/status` 展示 Scene Runtime。
4. First Visit Ritual 的合同和边界。

### P1：随后做

1. 首次进入仪式。
2. SceneTransitionShell。
3. Atlas / Timeline / Archive 到 Node 的差异化转场。
4. Journey Memory。

### P2：成熟化

1. Ambient Environment v2。
2. Node Room 深化。
3. Scene QA Matrix。
4. 视觉截图报告升级。

## 推荐阶段顺序

1. **阶段 26：Scene Registry 与场景事实源**
2. **阶段 27：首次进入仪式**
3. **阶段 28：Scene Transition Shell**
4. **阶段 29：场景人格深化**
5. **阶段 30：Journey Memory 与路径连续性**
6. **阶段 31：Ambient Environment v2**
7. **阶段 32：Scene QA 与本地 RC 固化**

## 阶段 26 建议验收命令

```bash
npm run check:scene-runtime
npm run check:daily
npm run check:strict
npm run release:local-rc
```

## 最终验收口径

当以下条件同时满足时，才可以说 WorldOS 从“动态博客”进入“场景宇宙”：

- 首次进入有仪式，但不阻塞。
- 每个主页面都有明确场景身份。
- 至少 4 条关键路径有不同转场语法。
- reduced-motion 下完整可用。
- 移动端无遮挡、无误触、无空白。
- 场景、转场、旅程记忆来自统一事实源。
- 权限继续由后端 guard 决定。
- 本地/LAN RC 可复跑并生成截图证据。

## 下一步建议

下一步不直接做动画，而是先执行 **阶段 26：Scene Registry 与场景事实源**。

原因：

- 它把旧 R8 scene 数据收束进当前主线。
- 它给所有后续动效和转场提供统一事实源。
- 它能先用检查脚本建立边界，避免动效实现散落在页面里。
- 它符合当前项目“高内聚、低耦合、模块化、页面化”的准则。

