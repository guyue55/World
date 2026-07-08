# src/lib/_legacy

> 归档区。存放已从主线剥离、但暂不删除的历史或候选清理文件。

## 归档原则

- 主线不再引用（不在 lib 内引用、不在 app/features/scripts 中引用）
- 保留原始文件名与内容，便于日后回溯与还原
- 归档时同步在 `docs/00-overview/lib-dependency-report.md` 与本 README 追加说明
- 不出现在 lib 数量预算中（`check:worldos-lib-budget` 只统计 `src/lib/*.ts`，跳过目录）

## 2026-07-08 归档批次

| 文件 | 原用途 | 归档原因 |
|---|---|---|
| ai-availability.ts | 灯塔可用性判断（返回 `full`/`low-light`） | 主线走 `ai-boundary` 与 `ai-lighthouse-planning`，本文件从未被引用 |
| backlinks.ts | 提供 `getForwardLinks`/`getBacklinks` 工具函数 | `node-reading.ts` 内联实现相同逻辑，未复用本文件 |
| change-admission.ts | 变更准入策略加载器（读 `data/domains/governance/change-admission-policy.json`） | 策略当前仅通过 `check:*` 脚本消费，未在运行时被 UI/API 调用 |

若未来需要恢复其中某个模块，直接 `git mv` 回 `src/lib/` 即可，历史保持连续。

## 保留的锚点文件（不归档）

以下 2 个文件在 lib 内没有其它文件引用它们，但被治理清单（`check:product-release` / `check:worldos-mainline-governance`）作为"必须存在"的锚点断言，删除会触发门禁失败：

- `src/lib/world-kernel-legacy.ts`
- `src/lib/worldos-mainline.ts`

它们是"契约文件"，属于治理层而非业务层，因此在依赖审计中会永远显示为孤岛，属预期。
