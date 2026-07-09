# WorldOS 一次性 Goal 执行账本

> [!NOTE]
> 本账本由 `worldos-one-shot-goal-master-prompt-2026-07-09.md` 驱动。Goal 模式执行 M8-M18 时必须持续更新它，用于长任务恢复、上下文压缩后续接和最终验收追踪。

## 1. 当前状态

| 字段 | 值 |
| --- | --- |
| Goal 范围 | M8-M18 |
| 当前阶段 | M13 |
| 最后更新时间 | 2026-07-09 |
| 当前结论 | M12 灯塔导览可感知化已通过本地 / LAN RC；下一阶段进入 M13 感官、音频与资产治理 |

## 2. 阶段进度

| 阶段 | 状态 | commit | 关键检查 | 人工体验 | 备注 |
| --- | --- | --- | --- | --- | --- |
| M8 | 已完成 | `caf1abdb` | `check:homepage`、`typecheck`、`lint`、`check:scene-qa`、`check:mainline`、`release:local-rc` 通过 | 通过：desktop 首屏已形成入口舞台，mobile reduced-motion 无空白和遮挡 | 已将新手入口、首访仪式、运行态星图和三层空间说明合并到首页主舞台 |
| M9 | 已完成 | `65827969` | `check:atlas`、`check:timeline`、`check:content-archive`、`check:path-guidance`、`typecheck`、`lint`、`check:scene-qa`、`check:mainline`、`release:local-rc` 通过 | 通过：Atlas / Timeline 已具备星图与时间河首屏；Archive 主体形成馆藏抽屉、标签索引与检索台；Paths 主体形成旅程调度台、推荐起步与路线脊柱 | Archive / Paths 已从普通列表卡片进一步舞台化，仍复用公开 surface 与既有权限边界 |
| M10 | 已完成 | `fe75b00b` | `check:node-reading`、`check:content-life`、`typecheck`、`lint`、`check:scene-qa`、`check:mainline`、`release:local-rc` 通过 | 通过：节点页具备 NODE GATE 节点门厅、地点护照内容生命事实、DEPARTURE 下一步路牌与 EXIT GATES 关系出口门；正文仍保持优先可读 | Node 已从文章详情进一步地点化，未引入私密关系、vault 信息或前端权限硬编码 |
| M11 | 已完成 | `14ebffcb` | `check:scene-transition`、`check:scene-qa`、`typecheck`、`lint`、`check:mainline`、`release:local-rc` 通过 | 通过：桌面迁移 cue 已展示来源残影、目标预告、抵达方式；移动 reduced-motion 收敛为轻量文本与阶段胶囊，首页 CTA 与核心状态卡恢复可见 | 补齐 Node->Paths、Paths->Timeline、Timeline->Archive、Archive->Home 等迁移路线示例；修复一次移动首屏被 cue 挤压的 RC 失败 |
| M12 | 已完成 | 待回填 | `check:lighthouse`、`check:ai-provider-boundary`、`typecheck`、`lint`、`check:mainline`、`release:local-rc` 通过 | 通过：灯塔控制台展示服务端低光运行器结果，包括观测回声、intent、公开 sources、limits 与 auditSummary；人工裁图确认控制台主体可见 | `/ask` 不再只是静态推荐页；未接入真实 Provider，未读取私密层，未写入世界源文件 |
| M13 | 未开始 | - | - | - | 感官、音频、资产 |
| M14 | 未开始 | - | - | - | AI 灯塔运行化 |
| M15 | 未开始 | - | - | - | 内容世界生产 |
| M16 | 未开始 | - | - | - | 性能与依赖硬化 |
| M17 | 未开始 | - | - | - | 本地 QA 与证据 |
| M18 | 未开始 | - | - | - | 作者治理与运维 |

## 3. 失败与修复记录

| 时间 | 阶段 | 失败项 | 修复 | 重跑结果 |
| --- | --- | --- | --- | --- |

## 4. 浏览器与 RC 证据摘要

| 时间 | 阶段 | localhost | LAN | desktop | mobile | reduced-motion / sensory | 结论 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-07-09 | M8 | 通过：20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks | 通过：`desktop-home.png`，H1 为“古月浮屿，正在打开的个人世界。” | 通过：移动导航、主 CTA、核心状态卡可见 | 通过：`mobile-reduced-motion-home.png` 无空白、无遮挡 | M8 体验达标，进入 M9 |
| 2026-07-09 | M9 | 通过：20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks | 通过：`desktop-atlas.png`、`desktop-timeline.png`、`desktop-archive.png`、`desktop-paths.png`；另以本地临时 full-page 截图人工确认 Archive / Paths 主体区 | 通过：`mobile-reduced-motion-archive.png`、`mobile-reduced-motion-paths.png` 无白屏 | 通过：RC reduced-motion 截图可用，Archive / Paths 主体不依赖强制动效 | M9 体验达标，进入 M10 |
| 2026-07-09 | M10 | 通过：20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks | 通过：`desktop-node-world-manifesto.png`、`desktop-node-ai-lighthouse-boundary.png`；另以本地临时 full-page 截图人工确认 NodeOpening 与 NodeRelationRail 主体区 | 通过：`mobile-reduced-motion-node-world-manifesto.png`、`mobile-reduced-motion-node-ai-lighthouse-boundary.png` 无白屏 | 通过：节点门厅和出口门在 reduced-motion 下仍保留完整文本与链接 | M10 体验达标，进入 M11 |
| 2026-07-09 | M11 | 通过：20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks；首次 RC 因 mobile 首页 CTA 被迁移 cue 挤出首屏失败，修复后重跑通过 | 通过：`desktop-atlas.png`、`desktop-node-world-manifesto.png` 可见来源残影、目标预告与抵达方式 | 通过：`mobile-reduced-motion-home.png` 主 CTA、移动导航和核心状态卡可见 | 通过：移动端隐藏桌面叙事卡，仅保留轻量状态文本和阶段胶囊 | M11 体验达标，进入 M12 |
| 2026-07-09 | M12 | 通过：20 HTTP checks | 通过：`http://172.30.111.222:4320`，22 HTTP / 20 browser checks | 通过：`desktop-ask.png`；另以本地临时 full-page 截图人工确认控制台主体区 | 通过：`mobile-reduced-motion-ask.png` 无白屏、无遮挡 | 通过：低光运行器结果静态可读，不依赖真实 Provider 或强动效 | M12 体验达标，进入 M13 |

## 5. 最终验收

| 条件 | 状态 |
| --- | --- |
| M8-M18 全部完成 | 未完成 |
| `npm run check:mainline` 通过 | 未完成 |
| `npm run release:local-rc` 通过 | 未完成 |
| 人工体验量表通过 | 未完成 |
| 无白屏、遮挡、死链 | 未完成 |
| 无权限泄漏、默认音频、前端 AI key | 未完成 |
| 所有阶段中文 commit | 未完成 |
