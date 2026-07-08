# src/features/_legacy

> 归档区。存放已从主线剥离的历史 feature 模块。tsconfig 已排除本目录，构建与 typecheck 不涉及。

## 2026-07-08 追加归档

| 目录 | 原用途 | 归档原因 |
|---|---|---|
| ai-safety | AI 安全扫描器（scanner + model + data） | 主线由 `src/lib/ai-boundary` 与 provider 边界承担，本模块无消费者 |
| ai-service-contract | AI 服务契约模型 | 已被 `ai-workflow` 与 `ai-lighthouse-workbench` 各自的契约层取代 |
| visual-foundation | 早期视觉基座（tokens + backgrounds） | 主线 tailwind 主题与设计系统已完全覆盖 |

若需还原任意目录，`git mv` 回 `src/features/` 即可，import 路径无需调整。
