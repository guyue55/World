# src/features/_legacy

> 归档区。存放已从主线剥离的历史 feature 模块。tsconfig 已排除本目录，构建与 typecheck 不涉及。

## 2026-07-08 追加归档

| 目录 | 原用途 | 归档原因 |
|---|---|---|
| ai-safety | AI 安全扫描器（scanner + model + data） | 主线由 `src/lib/ai-boundary` 与 provider 边界承担，本模块无消费者 |
| ai-service-contract | AI 服务契约模型 | 已被 `ai-workflow` 与 `ai-lighthouse-workbench` 各自的契约层取代 |
| visual-foundation | 早期视觉基座（tokens + backgrounds） | 主线 tailwind 主题与设计系统已完全覆盖 |

若需还原任意目录，`git mv` 回 `src/features/` 即可，import 路径无需调整。

## 2026-07-08 第 6 轮深度复审归档

主线 features 从 22 收敛到 4（`content-ingestion` / `r6-service-bridge` / `r7-world-evolution` + `_legacy/`）。以下 16 个 feature 目录仅被 `_legacy` 组件消费或已被主线 lib/features 取代，本轮批量归档：

| 目录 | 归档原因 |
|---|---|
| ai-lighthouse-workbench | 主线灯塔逻辑收敛到 `src/lib/lighthouse-*` |
| ai-workflow | 主线 AI 流程收敛到 `src/lib/ai-boundary` |
| asset-library | 主线未使用素材库 |
| content-constellation | 主线星座图由 `@/lib/public-world-surfaces` 承担 |
| content-governance | 主线内容治理收敛到 `src/lib/*` + 门禁脚本 |
| content-taxonomy | 主线标签体系收敛到 `data/*` + 门禁脚本 |
| experience-realization | 主线体验实现改由 `product/*` 承担 |
| memory-graph | 主线未使用记忆图谱 UI |
| observability | 主线可观测收敛到门禁脚本 |
| production-readiness | 主线生产就绪由门禁体系承担，无 UI |
| r2-world-experience | R2 契约层被 `r2-world-experience` types 保留在归档 |
| r3-content-life | R3 契约层被 `r3-content-life` types 保留在归档 |
| service-adapters | 主线未使用服务适配 |
| theme-system | 主线主题使用 tailwind + `world/*` |
| time-river | 主线由 `timeline/TimelineRiverRuntime` + `@/lib/public-world-surfaces` 承担 |
| world-map-experience | 主线由 `atlas/*` 承担 |

### 追加归档：content-ingestion

`src/features/content-ingestion` 在第一轮批量归档后再复审时发现同样只被 `_legacy/content-governance/review.ts` 与 `_legacy/asset-library/resolver.ts` 消费；随即归档到 `_legacy/content-ingestion`。主线 features 目录最终仅保留 `r6-service-bridge` / `r7-world-evolution` 两个绑定 API 路由的契约层。

`scripts/check-experience-realization.ts` 的相对导入已同步调整为 `../src/features/_legacy/experience-realization`，历史 `check:world-core` 门禁仍可通过；主线 `check:daily` / `check:boundary-full` / `release:local-rc` 保持全绿。
