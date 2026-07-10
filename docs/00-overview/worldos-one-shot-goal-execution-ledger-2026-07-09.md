# WorldOS 一次性 Goal 执行账本

> [!NOTE]
> 本账本由 `worldos-one-shot-goal-master-prompt-2026-07-09.md` 驱动。Goal 模式执行 M8-M18 时必须持续更新它，用于长任务恢复、上下文压缩后续接和最终验收追踪。
>
> 2026-07-10 追加：终局 Goal 已升级为 `worldos-ultimate-one-shot-goal-prompt-2026-07-10.md` 驱动的 M8-M30。下方 M8-M18 “已完成”仅代表历史 MVP+ 底座，不代表“真格世界 / 宇宙体验”终局完成。进入 M19-M30 前必须以真实生产态截图、LAN RC、Scene QA 和人工体验缺陷为准。

## 1. 当前状态

| 字段 | 值 |
| --- | --- |
| Goal 范围 | M8-M30 |
| 当前阶段 | M8-M18 MVP+ 历史底座已完成；M19-M28 首批终局体验证据与长期运行回滚底座已完成；M29-M30 尚未完成 |
| 最后更新时间 | 2026-07-10 |
| 当前结论 | M20 已补真实 SPA 点击/回退证据；M21 已补内容生命循环模型、节点页生命循环面板和单节点多场景吸收报告；M22 已补灯塔低光模式的 grounded 导览、边界拒答、未知回退与 10 题评估报告；M23 已补声景生产注册表、会话 armed 控制、场景切换停旧音和专项资产授权/预算报告；M24 已补高级可视化候选账本、Atlas SVG 关系场试点、Status 可视化准入面板和专项依赖门禁；M25 已补作者世界编辑台 dry-run 契约、校验模型、只读影响预览、Status 面板和专项门禁；M26 已补返回访客记忆策略、清除入口、运行时清除 API、状态面板和专项门禁；M27 已补 unlisted 权限层、多层权限矩阵、AI 访问矩阵、M27 权限报告和主线门禁；M28 已补本地/LAN 长期运行观测与回滚契约、Status 面板、专项门禁和报告证据。当前仍不能宣称终局完成，下一步必须进入 M29 终局验收与缺陷清单固化。 |

## 1.1 2026-07-10 终局 Goal 真实起点

| 项 | 真实状态 |
| --- | --- |
| 总控文档 | `docs/00-overview/worldos-ultimate-one-shot-goal-prompt-2026-07-10.md` |
| 体验宪章 | `docs/00-overview/worldos-ultimate-experience-charter-2026-07-10.md` |
| 总计划 | `docs/00-overview/worldos-m19-m30-comprehensive-execution-master-plan-2026-07-10.md` |
| 前置结论 | M8-M18 不能被当作终局完成；M19-M30 才是“独立空间、真实穿梭、内容生命体、陪伴型灯塔、统一世界观、长期回访、作者共生、真实可信”的终局候选阶段 |
| 本轮真实缺陷 | `smoke:lan-local` 首轮失败：`mobile-reduced-motion /` 首页 `dynamic-world-status-card` 不在视口；`check:scene-qa` 首轮失败：Atlas / Timeline / Archive / Paths / Ask / Status 缺少场景身份带证据 |
| 本轮修复 | `SceneWorldPortal` 移动端取消桌面首屏强制高度、压缩移动舞台高度、提前展示核心状态卡；`SceneIdentityBand` 恢复核心门户场景的紧凑身份带 |
| 本轮复验 | `typecheck`、`lint`、`build:production-ci`、`smoke:lan-local`、`check:homepage`、`check:scene-qa`、`check:mainline`、`release:local-rc` 通过 |
| 证据 | `docs/90-archive/reports/worldos-local-lan-rc-report.json`、`docs/90-archive/reports/worldos-scene-qa-report.json`、`docs/90-archive/reports/worldos-local-rc-summary-report.json`、`docs/90-archive/reports/worldos-local-lan-rc/mobile-reduced-motion-home.png` |
| 下一阶段 | 进入 M19：场景主体深度交互。不得再以“壳存在、脚本通过”宣称终局，只能按截图/录屏/人工体验量表证明场景主体真的可探索。 |

## 1.2 M19 执行记录

| 时间 | 状态 | 本轮完成 | 检查 | 真实结论 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| 2026-07-10 | 进行中 | 新增 `build*DeepInteractionModel()` 公开事实源适配器；新增 `SceneDeepInteractionPanel`；Atlas / Timeline / Archive / Paths 均接入可点击状态面板，覆盖区域聚焦、事件回看、卷宗展开和路线进度 | `typecheck`、`lint`、`build:production-ci`、`smoke:lan-local`、`check:scene-qa`、`check:mainline`、`release:local-rc` 通过 | 这是 M19 第一批主体交互落地，证明四场景已有可操作状态层；但默认 LAN 首屏截图仍主要展示 Portal 舞台，尚不能宣称四场景“终局独立空间”完成 | 继续 M19：让交互主体进入首屏/第一交互证据，补录屏或专用 M19 体验检查，避免只在页面下方出现交互面板 |
| 2026-07-10 | 进行中 | `SceneWorldPortal` 接入 `interactionModel`，在 Atlas / Timeline / Archive / Paths 首屏右侧展示 M19 紧凑交互坞；Atlas / Timeline 完整交互面板前移到动态展示前 | `typecheck`、`lint`、`build:production-ci`、`smoke:lan-local`、`check:scene-qa`、`check:mainline`、`release:local-rc` 通过 | 真实截图已看到 `desktop-atlas.png` 和 `mobile-reduced-motion-atlas.png` 首屏出现“区域聚焦 / 节点预览 / 关系解释”交互坞；这使 M19 从“页面下方有面板”推进到“第一屏可感知可操作主体”。仍不能宣称 M19 终局完成，因为还缺专用 M19 录屏/检查来证明四场景交互状态变化。 | 继续 M19：补专用 `check:m19-scene-interaction` 或等价证据，覆盖四场景交互坞、完整面板、键盘/点击状态、reduced-motion 与移动端；再进入 M20 |
| 2026-07-10 | 进行中 | LAN RC 浏览器报告新增 M19 DOM 证据字段；新增 `check:m19-scene-interaction` 并纳入 `check:mainline` 与脚本治理注册表 | `build:production-ci`、`smoke:lan-local`、`check:m19-scene-interaction`、`check:scripts`、`check:mainline`、`release:local-rc` 通过 | M19 现在有独立自动门禁：四个核心场景在 desktop 与 mobile reduced-motion 下必须同时具备首屏交互坞、完整交互面板、截图证据、无遮挡、无横向溢出。期间一次 `smoke:lan-local` 因旧/不完整 `.next` 产物导致多路由 404，已通过 fresh `build:production-ci` 重建后重跑通过。 | M19 可进入人工录屏/体验复核；随后推进 M20 空间连续性，不得跳过真实迁移录屏与状态沉淀证据。 |

## 1.3 M20 执行记录

| 时间 | 状态 | 本轮完成 | 检查 | 真实结论 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| 2026-07-10 | 进行中 | LAN RC 浏览器报告新增 `previousRoute` 和 `spatialContinuity` 字段；新增 `check:m20-spatial-continuity` 并纳入 `check:mainline` 与脚本治理注册表 | `typecheck`、`lint`、`build:production-ci`、`smoke:lan-local`、`check:m20-spatial-continuity`、`check:scene-qa`、`check:scripts`、`check:mainline`、`release:local-rc` 通过 | M20 第一批建立了自动门禁：核心场景在 desktop 与 mobile reduced-motion 下必须有迁移 cue、来源测试路由、目标场景、五段迁移步骤、截图、无遮挡、无横向溢出。真实限制：全页面 LAN 导航中应用 cue 的 from/to 仍等于当前场景，连续来源由 runner `previousRoute` 证明；这还不是完整 SPA 迁移录屏。 | 继续 M20：补真实点击/录屏证据，验证 Home→Atlas、Atlas→Node、Timeline→Archive、Paths→Node 等 SPA 路径的来源残影、目标预告、抵达状态和回退行为。 |
| 2026-07-10 | 进行中 | 新增 `check:m20-spa-transitions`，启动本地 production server 与系统 Chrome，真实点击 5 条 SPA 迁移路径，验证浏览器回退，并输出 `docs/90-archive/reports/worldos-m20-spa-transition-report.json` 与 25 张关键帧截图 | `build:production-ci`、`node scripts/check-worldos-m20-spa-transitions.mjs`、`check:scripts` 通过 | M20 现在补上了真实 SPA 点击与回退证据：`/`→`/atlas` 运行时为 gateway→atlas，`/atlas`→公开节点为 atlas→node，`/timeline`→`/archive` 为 timeline→archive，`/paths/first-visit`→`/node/world-manifesto` 为 path-detail→node，移动 reduced-motion gateway→atlas 状态为 reduced。第一次运行曾暴露测试预期错误（把 gateway/path-detail 误写成 home/paths），后续又暴露旧 `.next` 产物导致 Atlas 缺节点入口；已通过 fresh build 修正，并在脚本内置 stale artifact 检查，源码/数据新于 `.next/BUILD_ID` 时直接失败。 | 继续 M21：内容生命循环。不得把“内容字段齐全”误判为“内容像生命体”，必须证明单节点被 Atlas / Timeline / Archive / Paths / Lighthouse 同时吸收。 |
| 2026-07-10 | 通过 | M20 SPA 证据目录改为每次运行前清空，避免旧失败关键帧混入；`check:m20-spa-transitions` 纳入 `check:mainline` 与 RC 脚本治理注册表 | `npm run check:m20-spa-transitions`、`npm run check:mainline`、`npm run lint`、`npm run typecheck`、`npm run release:local-rc`、`npm run check:scripts` 通过 | M20 当前可作为“真实空间连续性首批完成”：报告 5 条迁移、25 张关键帧、0 failures；完整 RC 通过，LAN 地址为 `http://172.30.111.222:4320`。剩余不是 M20 基础门禁，而是后续阶段体验深化。 | 进入 M21：内容生命循环。 |

## 1.4 M21 执行记录

| 时间 | 状态 | 本轮完成 | 检查 | 真实结论 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| 2026-07-10 | 通过 | 新增 `ContentLifeLoopFact` / `buildContentLifeLoopFacts`，把节点是否被 Atlas、Timeline、Archive、Paths、Lighthouse 吸收统一成内容生命循环事实；节点页新增 `NodeLifeLoopPanel`，在地点护照附近展示 5 个场景吸收状态；新增 `check:m21-content-life-loop` 与 `docs/90-archive/reports/worldos-m21-content-life-loop-report.json` | `npm run check:m21-content-life-loop`、`npm run typecheck`、`npm run lint`、`npm run build:production-ci`、`npm run check:mainline`、`npm run release:local-rc`、`npm run check:scripts` 通过 | M21 首批达成真实口径：200 个公开节点生成生命循环事实，62 个节点达到 5/5 场景吸收，30 个高连接度核心样本通过；已 featured 且 5/5 的节点为 22 个，未伪造成 30 个。代表节点 `world-manifesto` 同时进入 origin 星域、6 条时间痕迹、公开档案馆、5 条公开旅程和灯塔只读事实源。 | 进入 M22：灯塔 AI 深度导览。目标是让灯塔不只是低光推荐，而能基于公开事实源做 grounded 问路、解释、下一步推荐和失败回退；仍不得前端持 key、不得读取私密层、不得写入世界源。 |

## 1.5 M22 执行记录

| 时间 | 状态 | 本轮完成 | 检查 | 真实结论 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| 2026-07-10 | 通过 | 扩展 `runLowLightLighthouse()`：新增 `grounding`、`nextSteps`、`boundary`、`unknown`，让灯塔能区分有依据导览、静态回退、权限拒答和无证据回退；`/ask` 控制台新增 Grounded 导览区；新增 `check:m22-lighthouse-guidance` 与 `docs/90-archive/reports/worldos-m22-lighthouse-guidance-eval-report.json`，覆盖 10 个问路、解释、推荐、边界和失败问题；脚本纳入 `check:lighthouse`、`check:mainline` 与脚本治理注册表 | `npm run check:m22-lighthouse-guidance`、`npm run check:lighthouse`、`npm run typecheck`、`npm run lint`、`npm run check:scripts`、`npm run build:production-ci`、`npm run check:mainline`、`npm run release:local-rc` 通过 | M22 真实完成的是“低光、本地、公开事实源导览深化”：10 题评估中包含 grounded、fallback、refusal、no-evidence 四类；Provider 仍为 `disabled-dry-run`，服务端 only，未向前端暴露 key，未发起 Provider 网络请求，未写世界源；私密/保险箱/亲友层问题返回拒答且 sources=0；未知内容返回无证据说明并回退到公开地图/路径/档案馆。它不是最终在线陪伴型 AI，只是 M12/M14 之后更可信的只读导览层。 | 进入 M23：感官/音频/氛围资产生产化。必须继续坚持默认静音、用户 opt-in、可降级、轻资产预算、授权记录和无重型依赖，不得因为追求氛围引入性能或权限风险。 |

## 1.6 M23 执行记录

| 时间 | 状态 | 本轮完成 | 检查 | 真实结论 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| 2026-07-10 | 通过 | 将 `sensory-audio-registry` 升级为 M23 生产注册表：每个公开场景声景补齐 `assetId/source/license/bytes/duration/visualCue/interactionCue/reducedSensoryBehavior/stopPolicy`；`RuntimeSoundscapeControl` 新增本会话 `audioArmed`、`data-audio-armed`、场景切换停旧音、静音关闭停止和桌面音量滑杆；`/status` 展示 M23 授权场景数、生产资产数、总字节和 armed/scene switch/reduced-sensory 策略；新增 `check:m23-sensory-audio-production` 与报告 `docs/90-archive/reports/worldos-m23-sensory-audio-production-report.json`，并纳入 `check:mainline` 和脚本治理注册表 | `npm run check:m23-sensory-audio-production`、`npm run check:ambient-environment`、`npm run typecheck`、`npm run lint`、`npm run check:scripts`、`npm run build:production-ci`、`npm run check:mainline`、`npm run release:local-rc` 通过 | M23 真实完成的是“轻量感官音频资产生产化”：9/9 场景声景有授权和预算，资产数 1，音频总字节 0，首访默认静音，自动播放 false，无外部音频文件，无 Howler/Tone；LAN RC 为 `http://172.30.111.222:4320`，22 个 HTTP、20 个浏览器检查、18 个 scene QA route checks 通过。限制也要写清：当前仍是项目内 Web Audio 短提示音，不是完整音乐系统；统一世界观先通过场景短音人格、状态页证据和 opt-in 控制建立，复杂音乐/生成式声景仍需后续收益证明。 | 进入 M24：高级可视化试点。必须先做收益/成本对比和局部原型门禁，不得为了“宇宙感”直接引入 D3/Three/WebGL 或全站重依赖。 |

## 1.7 M24 执行记录

| 时间 | 状态 | 本轮完成 | 检查 | 真实结论 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| 2026-07-10 | 通过 | 新增 `data/domains/experience/advanced-visualization-candidates.json` 作为 ADR-0007 的本地候选账本；Atlas `AtlasLiveConstellation` 从 CSS 线段升级为 SVG 关系场，并暴露 `advanced-visualization-pilot`、`data-visualization-renderer="svg-css"`、`data-dependency-delta="0"` 等 DOM 证据；新增 `src/lib/advanced-visualization.ts` 和 `/status` 的 `AdvancedVisualizationPilotPanel`，展示候选状态、零新增依赖和证据位置；新增 `check:m24-advanced-visualization` 与 `docs/90-archive/reports/worldos-m24-advanced-visualization-report.json`，并纳入 `check:mainline` 和脚本治理注册表 | `npm run check:m24-advanced-visualization`、`npm run typecheck`、`npm run lint`、`npm run check:scripts`、`npm run build:production-ci`、`npm run check:mainline`、`npm run release:local-rc` 通过 | M24 真实完成的是“局部高级可视化试点与准入门禁”：当前 renderer 为 `svg-css`，dependencyDelta=0，newRuntimeDependencies=[]；接受 `svg-css`，暂缓 `canvas` / `d3-force` / `pixi`，当前拒绝 `three-r3f`。Atlas production build 页面大小约 4.35 kB，shared First Load JS 约 102 kB，运行时依赖仍为 14 个，`check:dependency-hardening` 证明重候选缺席；LAN RC 仍为 22 HTTP、20 browser checks。限制也要写清：这不是全局 3D 宇宙，只是 Atlas 局部 SVG 关系场和后续高级可视化准入规则。 | 进入 M25：作者世界编辑台。目标不是做复杂后台，而是让作者能低门槛、中文优先地维护内容、关系、路径和资产，并继续坚持后端/数据契约为权限事实源。 |

## 1.8 M25 执行记录

| 时间 | 状态 | 本轮完成 | 检查 | 真实结论 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| 2026-07-10 | 通过 | 新增 `data/domains/operations/author-world-editor-dry-run-v1.json` 作为 M25 作者编辑台契约，明确 local/LAN only、只读 dry-run、前端不写世界源、前端不是权限事实源；新增 `src/lib/author-world-editor.ts`，提供作者节点草稿、无效草稿、`validateAuthorNodeDraft()`、五场景影响预览和维护提示；新增 `/status` 的 `AuthorWorldEditorPanel`，展示模块、权限事实源、坏草稿阻止和 Atlas / Archive / Paths / Timeline / Lighthouse 吸收预览；新增 `check:m25-author-world-editor` 与 `docs/90-archive/reports/worldos-m25-author-world-editor-report.json`，并纳入 `check:mainline` 与脚本治理注册表 | `npm run check:m25-author-world-editor`、`npm run typecheck`、`npm run lint`、`npm run check:scripts`、`npm run build:production-ci`、`npm run check:mainline`、`npm run release:local-rc` 通过；第一次并行跑 `build:production-ci` 与 `check:mainline` 曾导致 M20 SPA 检查读到被清理中的 `.next` 产物并失败，随后按顺序重跑 `check:mainline` 通过 | M25 真实完成的是“作者维护前的低门槛 dry-run 编辑台”：有效中文草稿可通过校验并预览进入 Atlas、Archive、Paths、Timeline、Lighthouse；无摘要、无区域、前端权限事实源三类坏草稿被阻止；Status 面板可复查“只读 dry-run”和“权限事实源”。限制也要写清：当前不是云端 CMS，也不是前端直接写入 UI；实际写入世界源仍需后续在备份、回滚、owner/API 边界稳定后再开放。 | 进入 M26：世界记忆与回访体验。目标是让用户再次访问时能继续探索，同时提供隐私边界和清除入口，不记录敏感内容。 |

## 1.9 M26 执行记录

| 时间 | 状态 | 本轮完成 | 检查 | 真实结论 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| 2026-07-10 | 通过 | 将 `data/domains/experience/journey-memory-policy.json` 从旧 Phase 30 旅程记忆策略升级为 M26 世界记忆与回访体验策略，新增 `clearedAtKey`、returning visitor、clear memory 规则；`src/lib/journey-memory.ts` 新增 `getReturningJourney()`、`getClearedJourneyMemoryState()` 和摘要字段；`WorldRuntimeProvider` 暴露 `clearJourneyMemory()`，清除 primary/history 并写入 clearedAt；`ProductJourneyDock` 增加“继续 / 清除”入口；`SceneRuntimeStatusPanel` 展示返回访客、清除入口、清除键和清除后行为；`check:m26-world-memory` 写入 `docs/90-archive/reports/worldos-m26-world-memory-report.json`，并纳入 `check:mainline` 与脚本治理注册表 | `npm run check:m26-world-memory`、`npm run typecheck`、`npm run lint`、`npm run check:scripts`、`npm run build:production-ci`、`npm run check:mainline`、`npm run release:local-rc` 通过 | M26 真实完成的是“轻量公开回访记忆”：只记录公开路径、公开节点、公开路径 ID 和访问时间；返回访客可看到上次停留和最近记录；用户可一键清除 history/primary，清除后不显示继续探索；不记录 owner/auth/permission/role/token/private/vault，不把本地记忆发给 AI。限制也要写清：M26 仍使用 localStorage，未引入 IndexedDB；完整 returning visitor / cleared storage 录屏留到 M30 终局验收补齐。 | 进入 M27：多层权限与私密宇宙。目标是让公开、私密、owner、AI 可读边界由后端/数据契约控制，前端只体现显隐，不能硬编码越权。 |

## 1.10 M27 执行记录

| 时间 | 状态 | 本轮完成 | 检查 | 真实结论 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| 2026-07-10 | 通过 | 新增 `unlisted` visibility 层并接入 `src/lib/types.ts`、`permissions.json`、`ai-boundary-policy.json`、`visibility.ts`、`schemas.ts`、标签注册表、Node 护照和 world-core 深度映射；`worldos-permission-boundary-contract-v1.json` 指向 M27 规范，声明 unlisted 只能直接入口/owner 可见、不得进入公开索引；`check-worldos-permission-boundary.mjs` 升级为 M27 报告门禁，写入 `docs/90-archive/reports/worldos-m27-layered-permission-report.json`；新增 `check:m27-layered-permission` 并纳入 `check:mainline` 与脚本治理注册表 | `npm run check:m27-layered-permission`、`npm run typecheck`、`npm run lint`、`npm run check:scripts`、`npm run build:production-ci`、`npm run check:mainline`、`npm run release:local-rc` 通过；脚本治理首次发现 `check:mainline` 超过 1200 字符后进入 longScripts，已同步注册表并重跑通过 | M27 真实完成的是“权限层契约补齐与泄漏扫描强化”：public、unlisted、semiPublic、private、family、partner、vault、sealed、silent 九层齐全；unlisted buildTarget=public 但 searchable/recommendable/aiIndexable=false；公开索引中 unlisted=0、forbidden=0；私密、家庭、伴侣、保险箱、封存、沉默仍不得进入 public build；AI 默认不读取 unlisted 和私密层。限制也要写清：M27 没有实现真实登录/群组会话，只是把多层权限事实源、公开索引泄漏扫描和 owner/API 边界门禁固化。 | 进入 M28：长期运行观测与回滚。目标是本地/LAN 长期运行时可发现、可定位、可备份、可回滚，而不是只依赖单次 RC。 |

## 1.11 M28 执行记录

| 时间 | 状态 | 本轮完成 | 检查 | 真实结论 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| 2026-07-10 | 通过 | 新增 `data/domains/operations/long-running-observability-rollback-v1.json` 作为本地/LAN 长期运行观测与回滚契约；新增 `src/lib/long-running-ops.ts` 与 `/status` 的 `LongRunningOpsPanel`，展示观测目标、失败分类、回滚演练手册、最近失败首动作和证据报告；新增 `check:m28-observability-rollback`，检查契约范围、回滚手册、页面 token、证据报告、主线与脚本注册，并写入 `docs/90-archive/reports/worldos-m28-observability-rollback-report.json` | `npm run check:m28-observability-rollback`、`npm run typecheck`、`npm run lint`、`npm run check:scripts`、`npm run build:production-ci`、`npm run check:mainline`、`npm run release:local-rc` 通过；RC 后再次执行 `check:m28-observability-rollback`，报告读取最新 local RC 与 LAN RC 摘要，failures=0 | M28 真实完成的是“长期运行可观测与回滚演练入口”：它不引入 daemon、不做外部 preview/production、不自动执行破坏性回滚；只把构建、主线、本地 RC、LAN 浏览器、权限和资产证据收束为可复查的状态面板与门禁报告。限制也要写清：当前是本地/LAN 操作契约和演练门禁，不是线上 APM、真实事故平台或自动化回滚系统。 | 进入 M29：终局验收与缺陷清单固化。必须基于真实截图、报告、RC 和人工体验量表判断是否仍像骨架，并列出不可自证完成的缺陷。 |

## 2. 阶段进度

| 阶段 | 状态 | commit | 关键检查 | 人工体验 | 备注 |
| --- | --- | --- | --- | --- | --- |
| M8 | 已完成 | `caf1abdb` | `check:homepage`、`typecheck`、`lint`、`check:scene-qa`、`check:mainline`、`release:local-rc` 通过 | 通过：desktop 首屏已形成入口舞台，mobile reduced-motion 无空白和遮挡 | 已将新手入口、首访仪式、运行态星图和三层空间说明合并到首页主舞台 |
| M9 | 已完成 | `65827969` | `check:atlas`、`check:timeline`、`check:content-archive`、`check:path-guidance`、`typecheck`、`lint`、`check:scene-qa`、`check:mainline`、`release:local-rc` 通过 | 通过：Atlas / Timeline 已具备星图与时间河首屏；Archive 主体形成馆藏抽屉、标签索引与检索台；Paths 主体形成旅程调度台、推荐起步与路线脊柱 | Archive / Paths 已从普通列表卡片进一步舞台化，仍复用公开 surface 与既有权限边界 |
| M10 | 已完成 | `fe75b00b` | `check:node-reading`、`check:content-life`、`typecheck`、`lint`、`check:scene-qa`、`check:mainline`、`release:local-rc` 通过 | 通过：节点页具备 NODE GATE 节点门厅、地点护照内容生命事实、DEPARTURE 下一步路牌与 EXIT GATES 关系出口门；正文仍保持优先可读 | Node 已从文章详情进一步地点化，未引入私密关系、vault 信息或前端权限硬编码 |
| M11 | 已完成 | `14ebffcb` | `check:scene-transition`、`check:scene-qa`、`typecheck`、`lint`、`check:mainline`、`release:local-rc` 通过 | 通过：桌面迁移 cue 已展示来源残影、目标预告、抵达方式；移动 reduced-motion 收敛为轻量文本与阶段胶囊，首页 CTA 与核心状态卡恢复可见 | 补齐 Node->Paths、Paths->Timeline、Timeline->Archive、Archive->Home 等迁移路线示例；修复一次移动首屏被 cue 挤压的 RC 失败 |
| M12 | 已完成 | `9a5f2c43` | `check:lighthouse`、`check:ai-provider-boundary`、`typecheck`、`lint`、`check:mainline`、`release:local-rc` 通过 | 通过：灯塔控制台展示服务端低光运行器结果，包括观测回声、intent、公开 sources、limits 与 auditSummary；人工裁图确认控制台主体可见 | `/ask` 不再只是静态推荐页；未接入真实 Provider，未读取私密层，未写入世界源文件 |
| M13 | 已完成 | `5d6883ed` | `check:ambient-environment`、`check:performance-budget`、`check:reduced-motion`、`typecheck`、`lint`、`check:scene-qa`、`check:mainline`、`release:local-rc` 通过 | 通过：声景控制默认静音、用户点击后才初始化 Web Audio；`/status` 展示 Sensory Audio M13 摘要；RC 首轮发现 fixed overlay 后已修复并重跑通过 | 未引入 Howler/Tone/外部音频文件；资产清单记录项目内运行时合成短音；性能预算和静态资源策略已纳入音频规则 |
| M14 | 已完成 | `28a5349f` | `check:lighthouse`、`check:ai-boundary`、`check:ai-provider-boundary`、`check:api-boundary`、`typecheck`、`lint`、`check:mainline`、`release:local-rc` 通过 | 通过：`/ask` 展示运行推荐、cache、timeout、requestId、questionDigest 与输出摘要；接口直调确认 headers、recommendations、auditSummary 存在且 `writesWorldSource=false` | Provider 仍为 disabled-dry-run；无前端 key、无私密读取、无 Provider 网络请求、无世界源写入 |
| M15 | 已完成 | `c966950b` | `check:content-life`、`check:content`、`check:worldos-content-density`、`check:content-jaccard`、`check:node-reading`、`check:atlas`、`typecheck`、`lint`、`check:mainline`、`release:local-rc` 通过 | 通过：深度审计确认 200 公开节点、29 公开路径、398 关系、51 事件；短摘要、低关系、缺路径、缺时间锚点、缺 AI 摘要均为 0 | 补齐 51 条偏短公开节点摘要，并将内容生命契约 `minSummaryLength` 从 18 提升至 24；无私密内容进入公开事实源 |
| M16 | 已完成 | `101513f1` | `check:lib-budget`、`check:performance-budget`、`check:performance`、`check:performance-implementation`、`check:performance-regression`、`check:dependency-hardening`、`typecheck`、`lint`、`check:mainline`、`release:local-rc` 通过 | 通过：运行时依赖固定为 14 个，无 Three/Pixi/Howler/Tone/XState 等重型候选；compact/reduced 下空气层显式停止背景动画；RC shared First Load JS 约 194 kB | 新增 M16 依赖硬化策略与 `check:dependency-hardening`，已纳入 mainline；脚本注册表同步为 281 scripts / 153 check scripts |
| M17 | 已完成 | `0168685c` | `check:human-experience`、`check:scene-qa`、`check:dependency-hardening`、`check:mainline`、`release:local-rc` 通过 | 通过：9 个场景进入人类体验 Rubric，平均分 2.00；LAN 22 HTTP / 20 browser checks 通过；runtime smoke 20 HTTP checks 通过 | 新增人类体验门禁并纳入 mainline；生产构建改为可被 `next start` 验证的 fresh build；`/private-archive` 增加服务端 redirect 兜底；性能预算拆分 total/cache/runtime artifact |
| M18 | 已完成 | `6cee17c4` | `check:authoring-ops`、`check:docs`、`validate:world`、`check:content-life`、`check:permission-boundary`、`check:api-boundary`、`typecheck`、`lint`、`check:mainline`、`release:local-rc` 通过 | 通过：作者手册、内容新增、场景扩展、资产审批、AI 审计、本地 LAN、备份回滚 7 份中文文档进入门禁；作者能按文档维护本地世界 | 未建设复杂后台；坚持 localhost / LAN only；作者治理门禁已纳入 mainline |

## 3. 失败与修复记录

| 时间 | 阶段 | 失败项 | 修复 | 重跑结果 |
| --- | --- | --- | --- | --- |
| 2026-07-09 | M13 | `release:local-rc` 首轮失败：新增声景控制作为独立 fixed 面板导致 desktop/mobile 多路由 `fixedOverlayIssues` > 0 | 将外层 fixed 容器改为 `pointer-events-none`，只让内部控件 `pointer-events-auto`，避免新增可遮挡层 | `release:local-rc` 重跑通过：22 HTTP checks、20 browser checks，overlay issue 为 0 |
| 2026-07-09 | M17 | `release:local-rc` 首轮失败：Turbopack production build 生成的 `.next/server/vendor-chunks/framer-motion.js` 缺失，`next start` 无法稳定就绪 | 新增 `scripts/run-worldos-production-ci-build.mjs`，`build:production-ci` 每次清理 `.next` 后运行标准 `next build`，确保最终产物可被 `next start` 验证 | `build:production-ci` + `smoke:runtime-local` 重跑通过，shared First Load JS 降至约 102 kB |
| 2026-07-09 | M17 | `smoke:runtime-local` 暴露 `/private-archive` 在标准构建下返回 404，而非服务端受保护跳转 | 在 `next.config.ts` 增加 `/private-archive` 与子路径到 `/forbidden` 的服务端 redirect 兜底，保持 route policy 与 middleware 源码治理不变 | `smoke:runtime-local` 重跑通过：20 HTTP checks |
| 2026-07-09 | M17 | `check:dependency-hardening` 因 `.next` 总体积 206.36MB 超过 200MB；拆解后 158MB 为 `.next/cache`，运行产物约 51MB | 将依赖硬化预算拆分为 total/cache/runtime artifact 三层，继续约束 runtime artifact 与 JS chunk，避免把构建 cache 误判为运行包体积 | `check:dependency-hardening`、`check:mainline`、`release:local-rc` 全部重跑通过 |
| 2026-07-10 | M19 | 新增 M19 LAN 报告字段后直接跑 `smoke:lan-local`，发现当前 `.next` 对 `/atlas`、`/timeline`、`/archive`、`/paths`、`/ask`、`/status`、核心节点和 `/sitemap.xml` 返回 404 | 强制执行 `npm run build:production-ci` 重新生成 fresh production artifacts，再重跑同一 LAN smoke | `smoke:lan-local` 重跑通过：22 HTTP checks、20 browser checks；随后 `check:m19-scene-interaction`、`check:mainline`、`release:local-rc` 通过 |

## 4. 浏览器与 RC 证据摘要

| 时间 | 阶段 | localhost | LAN | desktop | mobile | reduced-motion / sensory | 结论 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-07-09 | M8 | 通过：20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks | 通过：`desktop-home.png`，H1 为“古月浮屿，正在打开的个人世界。” | 通过：移动导航、主 CTA、核心状态卡可见 | 通过：`mobile-reduced-motion-home.png` 无空白、无遮挡 | M8 体验达标，进入 M9 |
| 2026-07-09 | M9 | 通过：20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks | 通过：`desktop-atlas.png`、`desktop-timeline.png`、`desktop-archive.png`、`desktop-paths.png`；另以本地临时 full-page 截图人工确认 Archive / Paths 主体区 | 通过：`mobile-reduced-motion-archive.png`、`mobile-reduced-motion-paths.png` 无白屏 | 通过：RC reduced-motion 截图可用，Archive / Paths 主体不依赖强制动效 | M9 体验达标，进入 M10 |
| 2026-07-09 | M10 | 通过：20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks | 通过：`desktop-node-world-manifesto.png`、`desktop-node-ai-lighthouse-boundary.png`；另以本地临时 full-page 截图人工确认 NodeOpening 与 NodeRelationRail 主体区 | 通过：`mobile-reduced-motion-node-world-manifesto.png`、`mobile-reduced-motion-node-ai-lighthouse-boundary.png` 无白屏 | 通过：节点门厅和出口门在 reduced-motion 下仍保留完整文本与链接 | M10 体验达标，进入 M11 |
| 2026-07-09 | M11 | 通过：20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks；首次 RC 因 mobile 首页 CTA 被迁移 cue 挤出首屏失败，修复后重跑通过 | 通过：`desktop-atlas.png`、`desktop-node-world-manifesto.png` 可见来源残影、目标预告与抵达方式 | 通过：`mobile-reduced-motion-home.png` 主 CTA、移动导航和核心状态卡可见 | 通过：移动端隐藏桌面叙事卡，仅保留轻量状态文本和阶段胶囊 | M11 体验达标，进入 M12 |
| 2026-07-09 | M12 | 通过：20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks | 通过：`desktop-ask.png`；另以本地临时 full-page 截图人工确认控制台主体区 | 通过：`mobile-reduced-motion-ask.png` 无白屏、无遮挡 | 通过：低光运行器结果静态可读，不依赖真实 Provider 或强动效 | M12 体验达标，进入 M13 |
| 2026-07-09 | M13 | 通过：20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks；首轮 fixed overlay 失败修复后重跑通过 | 通过：`desktop-status.png` 可复核 Sensory Audio M13 治理摘要，`desktop-home.png` 声景入口默认静音 | 通过：`mobile-reduced-motion-home.png`、`mobile-reduced-motion-status.png` 无白屏、无遮挡 | 通过：`check:reduced-motion`；声音默认关闭，用户 opt-in 后才初始化 Web Audio，无外部音频下载 | M13 体验达标，进入 M14 |
| 2026-07-09 | M14 | 通过：20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks | 通过：`desktop-ask.png`，`/ask` 文本长度 2746 且 fixed overlay 为 0 | 通过：`mobile-reduced-motion-ask.png` 无白屏、无遮挡 | 通过：接口直调返回 `cache-control`、`x-worldos-lighthouse-mode`、`x-worldos-provider-status`，recommendations=4，`writesWorldSource=false` | M14 体验达标，进入 M15 |
| 2026-07-09 | M15 | 通过：20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks | 通过：`desktop-archive.png` 文本长度 23777、fixed overlay 为 0；内容摘要补齐后 Archive/Atlas/Ask 仍可读 | 通过：`mobile-reduced-motion-ask.png`、`mobile-reduced-motion-status.png` 无白屏、无遮挡 | 通过：Jaccard 最大相似度 0.5565，未因批量摘要补齐造成过度重复 | M15 体验达标，进入 M16 |
| 2026-07-09 | M16 | 通过：20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks | 通过：`desktop-home.png`、`desktop-status.png` 无 fixed overlay；构建输出 shared First Load JS 约 194 kB | 通过：mobile reduced-motion 多路由无白屏、无遮挡 | 通过：`check:dependency-hardening` 确认默认无重型 3D/音频库、声音默认静音、Provider 默认 disabled | M16 体验达标，进入 M17 |
| 2026-07-09 | M17 | 通过：runtime smoke 20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks | 通过：`desktop-home.png`、`desktop-atlas.png`、`desktop-timeline.png`、`desktop-archive.png`、`desktop-paths.png`、`desktop-ask.png`、`desktop-status.png`、节点与路径详情截图全部刷新 | 通过：mobile reduced-motion 9 条核心浏览器检查无白屏、无遮挡 | 通过：`check:human-experience` 9 scenes avg=2.00；`/private-archive` 在 runtime smoke 中受保护；生产构建 shared First Load JS 约 102 kB | M17 体验与证据门禁达标，进入 M18 |
| 2026-07-09 | M18 | 通过：runtime smoke 20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks | 通过：最终 RC 刷新 desktop 全套截图，scene QA 状态 passed | 通过：mobile reduced-motion 核心路径无白屏、无遮挡 | 通过：`check:authoring-ops` 7 docs；`check:human-experience` 9 scenes avg=2.00；RC summary 为 `local-rc-passed-external-release-blocked` | M8-M18 全部完成，进入后续长期演化规划 |

## 5. 最终验收

| 条件 | 状态 |
| --- | --- |
| M8-M18 全部完成 | 已完成 |
| `npm run check:mainline` 通过 | 已完成 |
| `npm run release:local-rc` 通过 | 已完成 |
| 人工体验量表通过 | 已完成：`check:human-experience` 9 scenes avg=2.00 |
| 无白屏、遮挡、死链 | 已完成：最终 LAN RC 22 HTTP / 20 browser checks，scene QA passed |
| 无权限泄漏、默认音频、前端 AI key | 已完成：`check:permission-boundary`、`check:api-boundary`、`check:ai-provider-boundary`、`check:dependency-hardening` 已纳入阶段验收 |
| 所有阶段中文 commit | 已完成：M8-M18 均有中文 conventional commit |
