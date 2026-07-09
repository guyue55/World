# WorldOS 开发前文档补齐索引

> [!NOTE]
> 本文档列出基于开发文档总清单补齐的全部开发前文档。后续开发必须先阅读本索引，再按执行计划进入阶段。

## 1. 补齐结论

本轮已补齐开发前所需的 P0、P1、P2 文档，并新增受管控执行计划。

2026-07-09 追加确认：M0-M7 已基本完成的是“世界运行底座与可信验收”，不是“真格世界体验最终达成”。为了支持 Goal 模式继续自动推进 M8-M12，已补齐体验落地阶段的差距审计、总控计划、分阶段执行计划和 Goal Prompt。

2026-07-09 再追加确认：如果把所有场景、切换、特效、氛围、音频 / 音乐、灯塔 AI、内容生命、性能、证据和作者运维都视为基础目标，仅有 M8-M12 仍不够。已补齐 M13-M18 完整运行闭环文档。

## 2. P0 文档

| 状态 | 文档 |
| --- | --- |
| 已补齐 | `docs/00-overview/worldos-scene-production-matrix-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-transition-choreography-spec-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-atmosphere-sensory-system-spec-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-ai-lighthouse-runtime-spec-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-performance-asset-budget-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-world-runtime-state-machine-spec-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-local-lan-observability-spec-2026-07-09.md` |

## 3. P1 文档

| 状态 | 文档 |
| --- | --- |
| 已补齐 | `docs/00-overview/worldos-home-world-gateway-spec-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-atlas-world-map-spec-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-node-place-reading-spec-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-paths-journey-system-spec-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-timeline-river-spec-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-archive-memory-library-spec-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-lighthouse-observatory-spec-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-audio-music-governance-spec-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-content-life-runtime-contract-2026-07-09.md` |

## 4. P2 文档

| 状态 | 文档 |
| --- | --- |
| 已补齐 | `docs/00-overview/worldos-asset-pipeline-and-licensing-spec-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-scene-component-api-spec-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-human-experience-review-rubric-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-scene-data-contract-2026-07-09.md` |
| 已补齐 | `docs/00-overview/worldos-fallback-experience-spec-2026-07-09.md` |

## 5. 执行计划

| 状态 | 文档 |
| --- | --- |
| 已补齐 | `docs/00-overview/worldos-controlled-execution-plan-2026-07-09.md` |

## 6. M8-M12 体验落地文档

| 状态 | 文档 | 用途 |
| --- | --- | --- |
| 已补齐 | `docs/00-overview/worldos-true-world-experience-gap-audit-2026-07-09.md` | 确认为什么当前仍像骨架，并定义不得再用门禁替代体验达标 |
| 已补齐 | `docs/00-overview/worldos-m8-m12-true-world-experience-master-plan-2026-07-09.md` | M8-M12 总入口，定义阶段顺序、目标和完成判断 |
| 已补齐 | `docs/00-overview/worldos-m8-world-gateway-main-stage-execution-plan-2026-07-09.md` | M8 世界入口与主舞台重塑执行计划 |
| 已补齐 | `docs/00-overview/worldos-m9-core-scene-stage-execution-plan-2026-07-09.md` | M9 Atlas / Timeline / Archive / Paths 舞台化执行计划 |
| 已补齐 | `docs/00-overview/worldos-m10-node-place-immersive-reading-execution-plan-2026-07-09.md` | M10 Node 地点化与沉浸阅读执行计划 |
| 已补齐 | `docs/00-overview/worldos-m11-narrative-scene-transition-execution-plan-2026-07-09.md` | M11 场景迁移叙事化执行计划 |
| 已补齐 | `docs/00-overview/worldos-m12-lighthouse-guidance-experience-execution-plan-2026-07-09.md` | M12 灯塔导览体验可感知化执行计划 |
| 已补齐 | `docs/00-overview/worldos-m8-m12-goal-mode-prompts-2026-07-09.md` | 可直接复制到 Goal 模式的 M8、M9、M10、M11、M12 和全批次 Prompt |

## 7. 使用规则

- 新阶段开发前必须先确认对应规格文档存在。
- 每个阶段执行计划必须引用本索引和质量把控体系。
- 如果新增场景、能力或依赖，必须更新本索引或说明不需要新增文档的理由。
- M8-M12 开发不得只引用通用总控文档，必须同时引用对应阶段执行计划。
- M8-M12 的阶段完成标准必须同时满足自动检查和人工体验判断；仍像骨架时不得标记完成。
- M13-M18 开发不得只引用规格文档，必须同时引用对应阶段执行计划和 Goal 模式完整文档包。
- M13-M18 的阶段完成标准必须同时满足功能运行、降级、性能、权限、证据和人工复核。

## 8. M13-M18 完整运行闭环文档

| 状态 | 文档 | 用途 |
| --- | --- | --- |
| 已补齐 | `docs/00-overview/worldos-full-goal-document-gap-analysis-2026-07-09.md` | 从高目标逐项审计还缺哪些文档和计划 |
| 已补齐 | `docs/00-overview/worldos-m13-m18-complete-world-operation-master-plan-2026-07-09.md` | M13-M18 总入口，定义运行闭环阶段 |
| 已补齐 | `docs/00-overview/worldos-m13-sensory-audio-asset-production-execution-plan-2026-07-09.md` | M13 感官、音频与资产生产 |
| 已补齐 | `docs/00-overview/worldos-m14-ai-lighthouse-operationalization-execution-plan-2026-07-09.md` | M14 灯塔 AI 运行化 |
| 已补齐 | `docs/00-overview/worldos-m15-content-world-production-execution-plan-2026-07-09.md` | M15 内容世界生产 |
| 已补齐 | `docs/00-overview/worldos-m16-performance-dependency-hardening-execution-plan-2026-07-09.md` | M16 性能与依赖硬化 |
| 已补齐 | `docs/00-overview/worldos-m17-local-qa-evidence-automation-execution-plan-2026-07-09.md` | M17 本地 QA 与证据自动化 |
| 已补齐 | `docs/00-overview/worldos-m18-authoring-governance-runtime-ops-execution-plan-2026-07-09.md` | M18 作者治理与运行运维 |
| 已补齐 | `docs/00-overview/worldos-m13-m18-goal-mode-prompts-2026-07-09.md` | 可直接复制到 Goal 模式的 M13-M18 Prompt |
| 已补齐 | `docs/00-overview/worldos-complete-goal-mode-document-pack-2026-07-09.md` | M0-M18 Goal 模式完整文档包入口 |
| 已补齐 | `docs/00-overview/worldos-complete-goal-document-readiness-review-2026-07-09.md` | 开发前最终核验文档是否齐全、足够和可执行 |
| 已补齐 | `docs/00-overview/worldos-one-shot-goal-master-prompt-2026-07-09.md` | 只设置一次 Goal 的完整总提示词和执行协议 |
| 已补齐 | `docs/00-overview/worldos-one-shot-goal-execution-ledger-2026-07-09.md` | Goal 长任务恢复、阶段证据和最终验收账本 |
