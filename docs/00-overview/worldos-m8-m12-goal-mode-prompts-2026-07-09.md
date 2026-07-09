# WorldOS M8-M12 Goal 模式提示词

> [!IMPORTANT]
> 本文档用于直接启动 Goal 模式。每个 Prompt 都要求执行到对应阶段真正完成并验证，不允许把“门禁通过”替代“体验达标”。

## 1. 通用注意事项

每个 Goal 都必须遵守：

- 暂时忽略上线，只支持 localhost / LAN。
- 不要臃肿，统一化、轻量化，方便后续管理和扩展。
- 遵守高内聚、低耦合、模块化、页面化。
- 优先中文、降低门槛、提高探索体验。
- 权限事实来自后端 / 数据契约，前端只做体现和显隐。
- 每完成一项及时检查，避免白屏、遮挡、死链、权限泄漏。
- 前端和 UI 优先遵守 `gsap-core` 和 `ui-ux-pro-max`，符合项目风格。
- 提交格式：`feat(world): 中文说明`。

## 2. M8 Prompt

```text
继续 Goal 模式开发，当前进入 M8：世界入口与主舞台重塑。

目标：
在 M0-M7 可信底座之上，把首页从“博客/产品首页骨架”重塑为真正的世界入口。访问者第一眼必须感到进入古月浮屿，而不是看到 Hero + CTA + 卡片。

必须阅读：
- docs/00-overview/worldos-true-world-experience-gap-audit-2026-07-09.md
- docs/00-overview/worldos-m8-m12-true-world-experience-master-plan-2026-07-09.md
- docs/00-overview/worldos-m8-world-gateway-main-stage-execution-plan-2026-07-09.md
- docs/00-overview/worldos-home-world-gateway-spec-2026-07-09.md
- docs/00-overview/worldos-scene-production-matrix-2026-07-09.md
- docs/00-overview/worldos-quality-control-system-2026-07-09.md

执行：
- 审计当前首页为什么还像骨架。
- 重塑世界入口主舞台。
- 保留静态可读、mobile、reduced-motion。
- 不引入重型依赖，不做外部上线，不默认音频。
- 完成后运行 lint、typecheck、check:homepage、check:scene-qa、check:mainline、release:local-rc。
- 做人工体验判断：Home 是否仍像博客骨架；若仍像，继续修改，不得标记完成。
- 中文 commit。
```

## 3. M9 Prompt

```text
继续 Goal 模式开发，当前进入 M9：Atlas / Timeline / Archive / Paths 四大核心场景舞台化。

目标：
四个核心场景必须明显不同：Atlas 像地图/星图，Timeline 像时间河，Archive 像档案馆/记忆库，Paths 像旅程系统。不能只是同一套卡片和列表换文案。

必须阅读：
- docs/00-overview/worldos-m9-core-scene-stage-execution-plan-2026-07-09.md
- docs/00-overview/worldos-atlas-world-map-spec-2026-07-09.md
- docs/00-overview/worldos-timeline-river-spec-2026-07-09.md
- docs/00-overview/worldos-archive-memory-library-spec-2026-07-09.md
- docs/00-overview/worldos-paths-journey-system-spec-2026-07-09.md
- docs/00-overview/worldos-performance-asset-budget-2026-07-09.md

执行：
- 逐一审计四个场景当前骨架感。
- 重塑四个场景的舞台表达和交互层。
- 复用公开世界对象索引、内容生命 facts、SceneProductionFrame。
- mobile 和 reduced-motion 必须完整可读。
- 完成后运行 check:atlas、check:timeline、check:content-archive、check:path-guidance、check:scene-qa、check:mainline、release:local-rc。
- 人工检查四张截图放一起是否一眼可区分；若不能，继续修改。
- 中文 commit。
```

## 4. M10 Prompt

```text
继续 Goal 模式开发，当前进入 M10：Node 地点化与内容沉浸阅读。

目标：
公开节点不再只是文章详情，而是世界中的地点。读者进入节点时要看到位置、区域、生命阶段、关系门、路径门、时间锚点和阅读出口。

必须阅读：
- docs/00-overview/worldos-m10-node-place-immersive-reading-execution-plan-2026-07-09.md
- docs/00-overview/worldos-node-place-reading-spec-2026-07-09.md
- docs/00-overview/worldos-content-life-runtime-contract-2026-07-09.md
- docs/00-overview/worldos-scene-data-contract-2026-07-09.md
- docs/00-overview/worldos-human-experience-review-rubric-2026-07-09.md

执行：
- 审计 Node 页面为什么仍像文章。
- 强化地点开场、节点护照、关系出口、路径下一步和时间回看。
- 不牺牲正文阅读舒适度。
- 不泄露私密关系或 vault 信息。
- 完成后运行 check:node-reading、check:content-life、check:scene-qa、check:mainline、release:local-rc。
- 人工判断 Node 是否像抵达地点；若仍像文章详情，继续修改。
- 中文 commit。
```

## 5. M11 Prompt

```text
继续 Goal 模式开发，当前进入 M11：场景迁移叙事化。

目标：
页面跳转升级为场景迁移。用户要感到来源、离开、目标预告、抵达、沉淀，而不是普通页面 fade。

必须阅读：
- docs/00-overview/worldos-m11-narrative-scene-transition-execution-plan-2026-07-09.md
- docs/00-overview/worldos-transition-choreography-spec-2026-07-09.md
- docs/00-overview/worldos-world-runtime-state-machine-spec-2026-07-09.md
- docs/00-overview/worldos-fallback-experience-spec-2026-07-09.md

执行：
- 审计当前 SceneTransitionShell 是否只是 cue + fade。
- 为核心路线补轻量迁移编舞。
- 增强来源残影、目标预告、抵达确认。
- reduced-motion 必须只保留可理解状态，不出现残影或遮挡。
- 完成后运行 check:scene-transition、check:scene-qa、check:mainline、release:local-rc。
- 人工判断迁移是否仍像普通跳页；若是，继续修改。
- 中文 commit。
```

## 6. M12 Prompt

```text
继续 Goal 模式开发，当前进入 M12：灯塔导览体验可感知化。

目标：
灯塔从静态推荐页变成世界中的观测站。它可以问路、解释、推荐、总结，但只读公开事实源，不写入、不改数据、不越权。

必须阅读：
- docs/00-overview/worldos-m12-lighthouse-guidance-experience-execution-plan-2026-07-09.md
- docs/00-overview/worldos-lighthouse-observatory-spec-2026-07-09.md
- docs/00-overview/worldos-ai-lighthouse-runtime-spec-2026-07-09.md
- docs/09-adr/ADR-0003-ai-as-lighthouse.md
- docs/00-overview/worldos-quality-control-system-2026-07-09.md

执行：
- 审计 /ask 是否仍像 FAQ / 推荐列表。
- 强化观测站舞台、扫描光、公开上下文、边界环。
- 展示服务端低光运行器返回的 intent、sources、limits、auditSummary。
- 加强无 key、离线、Provider disabled、权限不足中文 fallback。
- 不接真实 Provider，不读取 API key，不写世界源。
- 完成后运行 check:lighthouse、check:ai-provider-boundary、check:api-boundary、check:mainline、release:local-rc。
- 人工判断 Lighthouse 是否像观测站；若仍像普通聊天入口或静态推荐页，继续修改。
- 中文 commit。
```

## 7. 全批次 Prompt

```text
继续 Goal 模式开发，当前进入 M8-M12：真格世界体验落地全批次。

目标：
在 M0-M7 可信底座之上，把 WorldOS 从“可运行的世界骨架 + 简单动态”推进为“用户可感知的个人数字世界”。必须依次完成 M8、M9、M10、M11、M12，直到全部阶段通过再停止。

执行顺序：
1. M8 世界入口与主舞台重塑。
2. M9 Atlas / Timeline / Archive / Paths 四大场景舞台化。
3. M10 Node 地点化与内容沉浸阅读。
4. M11 场景迁移叙事化。
5. M12 灯塔导览体验可感知化。

硬性要求：
- 每阶段开始前阅读对应计划文档。
- 每阶段完成后必须跑定向检查、check:mainline、release:local-rc。
- 每阶段必须做人工体验判断：是否仍像骨架。若仍像，继续修改，不得标记完成。
- 保持本地 / LAN 范围，不考虑外部上线。
- 不引入臃肿依赖，不做全站 3D，不默认音频，不接真实 AI Provider。
- 保持权限事实来自后端 / 数据契约，前端只体现。
- 中文 commit，格式 feat(world): 中文说明。
```

