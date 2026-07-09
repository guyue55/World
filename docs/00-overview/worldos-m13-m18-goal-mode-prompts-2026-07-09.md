# WorldOS M13-M18 Goal 模式提示词

> [!IMPORTANT]
> 本文档用于在 M8-M12 完成或需要并行准备时启动 Goal 模式。每个 Prompt 都要求真实执行、及时检查、不得引入新故障。

## 1. 通用注意事项

每个 Goal 都必须遵守：

- 暂时忽略上线，只支持 localhost / LAN。
- 不要臃肿，统一化、轻量化，方便后续管理和扩展。
- 注意加载速度、移动端、reduced-motion、reduced-sensory。
- 遵守高内聚、低耦合、模块化、页面化。
- 优先中文，降低门槛，提高探索体验。
- 权限事实来自后端 / 数据契约，前端只做体现和显隐。
- 每完成一项及时检查，避免白屏、遮挡、死链、权限泄漏。
- 前端和 UI 优先遵守 `gsap-core` 和 `ui-ux-pro-max`，符合项目风格。
- 提交格式：`feat(world): 中文说明`。

## 2. M13 Prompt

```text
继续 Goal 模式开发，当前进入 M13：感官、音频与资产生产。

目标：
让 WorldOS 的氛围、声音、音乐和视觉资产从规格进入可运行状态。必须默认安静、按需加载、可关闭、可降级、可授权，不得牺牲阅读和加载速度。

必须阅读：
- docs/00-overview/worldos-m13-sensory-audio-asset-production-execution-plan-2026-07-09.md
- docs/00-overview/worldos-atmosphere-sensory-system-spec-2026-07-09.md
- docs/00-overview/worldos-audio-music-governance-spec-2026-07-09.md
- docs/00-overview/worldos-asset-pipeline-and-licensing-spec-2026-07-09.md
- docs/00-overview/worldos-performance-asset-budget-2026-07-09.md

执行：
- 审计当前氛围、音频、资产是否只是规格或浅层效果。
- 建立或收束统一感官状态，不要各页面重复实现。
- 音频必须 opt-in，默认无声，支持全局静音、音量、关闭记忆。
- 新资产必须有来源、授权、体积、用途和懒加载策略。
- 完成后运行 check:ambient-environment、check:performance-budget、check:reduced-motion、check:scene-qa、check:mainline、release:local-rc。
- 人工确认首访无声音、移动端不变慢、关闭感官后内容仍完整。
- 中文 commit。
```

## 3. M14 Prompt

```text
继续 Goal 模式开发，当前进入 M14：灯塔 AI 运行化。

目标：
让 Lighthouse 具备服务端只读问路、解释、推荐、总结能力，同时有上下文裁剪、缓存、限流、审计和静态回退。不得前端持 key，不得读取私密内容，不得自动写数据。

必须阅读：
- docs/00-overview/worldos-m14-ai-lighthouse-operationalization-execution-plan-2026-07-09.md
- docs/00-overview/worldos-ai-lighthouse-runtime-spec-2026-07-09.md
- docs/09-adr/ADR-0003-ai-as-lighthouse.md
- docs/05-engineering/v1-ai-boundary-contract.md
- docs/05-engineering/v1-ai-readable-protocol.md

执行：
- 审计当前 Lighthouse 是否只是静态推荐或 dry-run 展示。
- 建立 server-only Provider adapter、公开事实源检索、上下文裁剪、结构化输出、审计摘要。
- Provider disabled / 无 key / 超时 / 离线必须中文 fallback。
- 保持权限事实来自后端或数据契约，前端只展示结果。
- 完成后运行 check:lighthouse、check:ai-boundary、check:ai-provider-boundary、check:api-boundary、check:mainline、release:local-rc。
- 人工确认灯塔知道来源、限制和下一步，且不越权。
- 中文 commit。
```

## 4. M15 Prompt

```text
继续 Goal 模式开发，当前进入 M15：内容世界生产。

目标：
补齐真实内容节点、区域、关系、生命周期、路径、时间锚点和档案分区，让 Atlas、Timeline、Archive、Paths、Node、Lighthouse 共享同一份内容事实源。

必须阅读：
- docs/00-overview/worldos-m15-content-world-production-execution-plan-2026-07-09.md
- docs/00-overview/worldos-content-life-runtime-contract-2026-07-09.md
- docs/00-overview/worldos-scene-data-contract-2026-07-09.md
- docs/00-overview/worldos-node-place-reading-spec-2026-07-09.md
- docs/00-overview/worldos-human-experience-review-rubric-2026-07-09.md

执行：
- 审计当前内容是否支撑世界探索，找出空节点、弱摘要、无关系、无区域、无路径出口。
- 优先补 20 到 30 个真实公开节点，每个核心区域和路径要有代表内容。
- 为关系补“为什么相关”，为路径补下一步，给 AI 准备公开摘要。
- 不建立第二套动态内容源，不混入私密 / vault / sealed。
- 完成后运行 check:content-life、check:content、check:worldos-content-density、check:node-reading、check:atlas、check:mainline、release:local-rc。
- 人工确认访问者能从首页进入、沿路径阅读、回到地图和档案馆。
- 中文 commit。
```

## 5. M16 Prompt

```text
继续 Goal 模式开发，当前进入 M16：性能与依赖硬化。

目标：
确保 WorldOS 加入场景、特效、感官、音频和 AI 后仍轻量、可维护、可扩展。新依赖必须有场景理由、预算、按需加载和降级。

必须阅读：
- docs/00-overview/worldos-m16-performance-dependency-hardening-execution-plan-2026-07-09.md
- docs/00-overview/worldos-tech-stack-and-open-source-research-2026-07-09.md
- docs/00-overview/worldos-performance-asset-budget-2026-07-09.md
- docs/05-engineering/v1-dependency-direction-and-coupling-guard.md
- docs/05-engineering/v1-performance-guard.md

执行：
- 审计依赖、bundle、动态加载、场景资源、移动端和降级。
- 去除无主依赖、重复动效主控、默认加载的重资产。
- 必要新库必须说明服务哪个阶段和场景。
- 完成后运行 check:lib-budget、check:performance-budget、check:performance、check:performance-implementation、check:performance-regression、check:mainline、release:local-rc。
- 人工确认首页不空等、不重、不拖慢移动端。
- 中文 commit。
```

## 6. M17 Prompt

```text
继续 Goal 模式开发，当前进入 M17：本地 QA 与证据自动化。

目标：
让每次验收都有新鲜、真实、可复查证据。必须覆盖 localhost、LAN、desktop、mobile、reduced-motion、reduced-sensory、AI fallback、音频关闭和权限边界。

必须阅读：
- docs/00-overview/worldos-m17-local-qa-evidence-automation-execution-plan-2026-07-09.md
- docs/00-overview/worldos-quality-control-system-2026-07-09.md
- docs/00-overview/worldos-human-experience-review-rubric-2026-07-09.md
- docs/00-overview/worldos-local-lan-observability-spec-2026-07-09.md

执行：
- 审计当前验收是否可能被旧构建、旧截图、旧报告误导。
- 固化 fresh build、localhost smoke、LAN smoke、截图证据和人工体验量表。
- 证据要能区分 Home、Atlas、Timeline、Archive、Paths、Node、Lighthouse。
- 不提交大量临时截图，只提交必要摘要和策略。
- 完成后运行 check:scene-qa、check:mainline、release:local-rc、check:runtime-local、check:reduced-motion、check:api-boundary。
- 人工确认仍像骨架时不得完成。
- 中文 commit。
```

## 7. M18 Prompt

```text
继续 Goal 模式开发，当前进入 M18：作者治理与运行运维。

目标：
让 WorldOS 可持续维护。作者能用中文低门槛流程新增内容、维护关系、管理资产、复核 AI、备份回滚，并在本地 / LAN 下稳定运行。

必须阅读：
- docs/00-overview/worldos-m18-authoring-governance-runtime-ops-execution-plan-2026-07-09.md
- docs/00-overview/worldos-complete-goal-mode-document-pack-2026-07-09.md
- docs/00-overview/worldos-asset-pipeline-and-licensing-spec-2026-07-09.md
- docs/00-overview/worldos-ai-lighthouse-runtime-spec-2026-07-09.md
- docs/09-adr/ADR-0004-public-private-build-separation.md

执行：
- 梳理作者新增节点、场景扩展、资产审批、AI 审计、权限复核、备份回滚、本地运行流程。
- 优先输出中文手册和清单，不建设复杂后台。
- 确保作者流程不绕开内容事实源和权限边界。
- 完成后运行 check:docs、validate:world、check:content-life、check:permission-boundary、check:api-boundary、check:mainline、release:local-rc。
- 人工确认作者能照文档完成一个公开节点新增和一次本地运行排错。
- 中文 commit。
```

## 8. 全批次 Prompt

```text
继续 Goal 模式开发，当前进入 M13-M18：完整世界运行闭环。

目标：
在 M8-M12 世界体验可感知之后，依次完成感官音频资产、灯塔 AI 运行、内容世界生产、性能依赖硬化、本地 QA 证据、作者治理运维，直到全部阶段通过再停止。

执行顺序：
1. M13 感官、音频与资产生产。
2. M14 灯塔 AI 运行化。
3. M15 内容世界生产。
4. M16 性能与依赖硬化。
5. M17 本地 QA 与证据自动化。
6. M18 作者治理与运行运维。

硬性要求：
- 每阶段开始前阅读对应计划文档。
- 每阶段完成后运行定向检查、check:mainline、release:local-rc。
- 每阶段必须做人工体验和异常流确认。
- 保持本地 / LAN 范围，不考虑外部上线。
- 不引入臃肿依赖，不默认音频，不全站 3D，不前端接 AI key。
- 权限事实来自后端 / 数据契约，前端只体现。
- 中文 commit，格式 feat(world): 中文说明。
```

