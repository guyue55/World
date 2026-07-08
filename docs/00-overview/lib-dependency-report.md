# src/lib 依赖审计报告

> 生成时间：2026-07-08T06:29:35.347Z
> 库文件数：120
> 检测到的循环依赖：0

## 一、总览

| 指标 | 数值 |
|---|---|
| 库文件总数 | 120 |
| 有 lib 内被依赖 | 40 |
| 未被 lib 内引用 | 80 |
| 循环依赖 | 0 |

## 二、被依赖最多的核心（top 15）

| 文件 | 被引用次数 | 引用他人次数 |
|---|---|---|
| types | 37 | 0 |
| nodes | 18 | 2 |
| visibility | 15 | 1 |
| relations | 11 | 1 |
| paths | 10 | 1 |
| world-events | 9 | 2 |
| areas | 8 | 1 |
| extensions | 4 | 0 |
| fallbacks | 4 | 0 |
| world-core | 4 | 7 |
| world-kernel | 4 | 11 |
| projections | 3 | 3 |
| site | 3 | 0 |
| star-lines | 3 | 4 |
| atlas | 2 | 2 |

## 三、未被 lib 内引用的候选（可能被 app/features 单点引用或已废弃）

共 80 个：

- acceptance-readiness
- ai-availability
- ai-lighthouse-planning
- ai-workbench
- ai-workbench-v2
- ai-world-companion
- architecture-contracts
- archive
- assembly
- backlinks
- ballast
- blocker-closure
- browser-qa
- build-pipeline
- change-admission
- content
- content-growth
- content-productization
- defect-execution
- development-gates
- error-taxonomy
- event-contracts
- evidence-assist-closure
- evidence-dashboard
- evolution
- execution-rerun
- export-center
- feature-architecture
- final-closure
- final-handoff
- foundation-audit
- foundation-baseline
- foundation-freeze
- future-compatibility
- governance-ledger
- homepage
- jsonld
- lifecycle
- lighthouse
- lighthouse-recommend
- local-acceptance
- metadata
- motion-grammar
- navigation
- node-reading
- observability
- operations-export-planning
- owner-auth
- performance-contracts
- performance-implementation
- performance-regression
- preview-performance
- preview-readiness
- private-archive
- public-index
- public-seo-release
- public-world-objects
- public-world-surfaces
- reading-comfort
- real-evidence
- real-validation
- release-closure
- release-environment
- release-gate
- rss
- schemas
- search
- snapshots
- stage-acceptance
- stage-completion-transition
- status-skeleton
- theme-exhibitions
- timeline
- tooling-baseline
- validation-closure
- visual-interaction-qa
- world-health
- world-kernel-boundary
- world-kernel-legacy
- worldos-mainline

## 四、循环依赖清单

无循环依赖。

## 五、下一步建议

1. 未被 lib 内引用的文件应确认是否仍被 app/features/scripts 使用；若无引用，进入废弃候选清单。
2. 被依赖最多的核心文件（fan-in 高）应视为世界的稳定层，改动需 ADR。
3. 循环依赖若存在，优先拆分共享类型或 constants。
