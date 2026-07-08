# src/lib 依赖审计报告

> 生成时间：2026-07-08T09:03:47.503Z
> 库文件数：117
> 检测到的循环依赖：0

## 一、总览

| 指标 | 数值 |
|---|---|
| 库文件总数 | 117 |
| 有 lib 内被依赖 | 40 |
| 未被 lib 内引用 | 77 |
| 循环依赖 | 0 |

## 二、被依赖最多的核心（top 15）

| 文件 | 被引用次数 | 引用他人次数 |
|---|---|---|
| types | 36 | 0 |
| nodes | 17 | 2 |
| visibility | 14 | 1 |
| paths | 10 | 1 |
| relations | 10 | 1 |
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

共 77 个：

- acceptance-readiness（app/features/scripts 引用：2）
- ai-lighthouse-planning（app/features/scripts 引用：1）
- ai-workbench（app/features/scripts 引用：2）
- ai-workbench-v2（app/features/scripts 引用：3）
- ai-world-companion（app/features/scripts 引用：3）
- architecture-contracts（app/features/scripts 引用：3）
- archive（app/features/scripts 引用：3）
- assembly（app/features/scripts 引用：3）
- ballast（app/features/scripts 引用：3）
- blocker-closure（app/features/scripts 引用：1）
- browser-qa（app/features/scripts 引用：1）
- build-pipeline（app/features/scripts 引用：2）
- content（app/features/scripts 引用：1）
- content-growth（app/features/scripts 引用：2）
- content-productization（app/features/scripts 引用：3）
- defect-execution（app/features/scripts 引用：1）
- development-gates（app/features/scripts 引用：3）
- error-taxonomy（app/features/scripts 引用：1）
- event-contracts（app/features/scripts 引用：1）
- evidence-assist-closure（app/features/scripts 引用：1）
- evidence-dashboard（app/features/scripts 引用：3）
- evolution（app/features/scripts 引用：1）
- execution-rerun（app/features/scripts 引用：1）
- export-center（app/features/scripts 引用：2）
- feature-architecture（app/features/scripts 引用：3）
- final-closure（app/features/scripts 引用：1）
- final-handoff（app/features/scripts 引用：1）
- foundation-audit（app/features/scripts 引用：3）
- foundation-baseline（app/features/scripts 引用：3）
- foundation-freeze（app/features/scripts 引用：3）
- future-compatibility（app/features/scripts 引用：3）
- governance-ledger（app/features/scripts 引用：1）
- homepage（app/features/scripts 引用：4）
- jsonld（app/features/scripts 引用：2）
- lifecycle（app/features/scripts 引用：1）
- lighthouse（app/features/scripts 引用：2）
- lighthouse-recommend（app/features/scripts 引用：1）
- local-acceptance（app/features/scripts 引用：1）
- metadata（app/features/scripts 引用：14）
- motion-grammar（app/features/scripts 引用：1）
- navigation（app/features/scripts 引用：2）
- node-reading（app/features/scripts 引用：1）
- observability（app/features/scripts 引用：3）
- operations-export-planning（app/features/scripts 引用：2）
- owner-auth（app/features/scripts 引用：4）
- performance-contracts（app/features/scripts 引用：3）
- performance-implementation（app/features/scripts 引用：3）
- performance-regression（app/features/scripts 引用：3）
- preview-performance（app/features/scripts 引用：1）
- preview-readiness（app/features/scripts 引用：1）
- private-archive（app/features/scripts 引用：3）
- public-index（app/features/scripts 引用：4）
- public-seo-release（app/features/scripts 引用：1）
- public-world-objects（app/features/scripts 引用：8）
- public-world-surfaces（app/features/scripts 引用：29）
- reading-comfort（app/features/scripts 引用：2）
- real-evidence（app/features/scripts 引用：3）
- real-validation（app/features/scripts 引用：1）
- release-closure（app/features/scripts 引用：1）
- release-environment（app/features/scripts 引用：1）
- release-gate（app/features/scripts 引用：1）
- rss（app/features/scripts 引用：1）
- schemas（app/features/scripts 引用：1）
- search（app/features/scripts 引用：1）
- snapshots（app/features/scripts 引用：2）
- stage-acceptance（app/features/scripts 引用：3）
- stage-completion-transition（app/features/scripts 引用：1）
- status-skeleton（app/features/scripts 引用：2）
- theme-exhibitions（app/features/scripts 引用：2）
- timeline（app/features/scripts 引用：4）
- tooling-baseline（app/features/scripts 引用：3）
- validation-closure（app/features/scripts 引用：1）
- visual-interaction-qa（app/features/scripts 引用：3）
- world-health（app/features/scripts 引用：2）
- world-kernel-boundary（app/features/scripts 引用：1）
- world-kernel-legacy（app/features/scripts 引用：0）
- worldos-mainline（app/features/scripts 引用：0）

## 三·B、真孤岛：既不被 lib 内也不被 app/features/scripts 引用

共 2 个：

- world-kernel-legacy
- worldos-mainline

## 四、循环依赖清单

无循环依赖。

## 五、下一步建议

1. 未被 lib 内引用的文件应确认是否仍被 app/features/scripts 使用；若无引用，进入废弃候选清单。
2. 被依赖最多的核心文件（fan-in 高）应视为世界的稳定层，改动需 ADR。
3. 循环依赖若存在，优先拆分共享类型或 constants。
