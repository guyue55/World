# WorldOS 一次性 Goal 执行账本

> [!NOTE]
> 本账本由 `worldos-one-shot-goal-master-prompt-2026-07-09.md` 驱动。Goal 模式执行 M8-M18 时必须持续更新它，用于长任务恢复、上下文压缩后续接和最终验收追踪。

## 1. 当前状态

| 字段 | 值 |
| --- | --- |
| Goal 范围 | M8-M18 |
| 当前阶段 | M8-M18 全部完成 |
| 最后更新时间 | 2026-07-09 |
| 当前结论 | M8-M18 已全部完成；最终本地 / LAN RC 通过，外部 Preview / Production 仍按计划不纳入当前验收 |

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
