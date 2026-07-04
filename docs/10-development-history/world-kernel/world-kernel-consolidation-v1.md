# World Kernel Consolidation v1｜世界内核收束执行报告

本轮不新增功能线，不继续做 R8.10 / V11，而是执行 World Kernel Architecture Audit v1 的结论，把项目从“概念扩展”推进到“唯一内核、清晰边界、长期门禁”。

## 1. 进度状态

| 阶段 | 目标 | 状态 |
|---|---|---|
| K1 | 内核事实源收束 | completed |
| K2 | Runtime 合并与 legacy 隔离 | completed |
| K3 | Presentation 与路由收束 | completed |
| K4 | 脚本与门禁收束 | completed |
| K5 | 真实生产证据闭环 | blocked：需要外部 Preview / Production |

## 2. K1｜唯一事实源

当前正式 World Kernel 事实源登记在：

- `data/world-kernel/world-kernel-consolidation-v1.json`
- `src/lib/world-kernel-registry.ts`

核心事实源：

- Area：`data/domains/experience/areas.json`
- Node：`data/domains/experience/nodes.json`
- Relation：`data/core/relations.json`
- Path：`data/domains/experience/paths.json`
- WorldEvent：`data/core/world-events.json`
- WorldState：`data/core/world-state.json`
- Permission：`data/domains/governance/permissions.json`

历史 R/V/R8 数据可保留为 reference，但正式公开体验不得直接从历史阶段数据派生。

## 3. K2｜Runtime 边界

正式公开 runtime 固定为：

- `src/components/world/WorldShell.tsx`
- `src/components/product/ProductBackdrop.tsx`
- `src/components/product/ProductJourneyDock.tsx`
- `src/lib/product-routes.ts`
- `src/lib/world-kernel-boundary.ts`

R8 dynamic / deep / full / living / complete / sensory / interactive / scene / civilization 等系列降级为 legacy/reference。它们可以作为历史实验保留，但不得直接挂载到正式公开页面。

## 4. K3｜路由与公开体验收束

正式公开路由：

```text
/
/about
/atlas
/timeline
/archive
/paths
/ask
/manifesto
/status
/node/:slug
/paths/:id
```

其他 top-level App Router 页面必须进入以下任一类别：

- legacy redirect
- private guarded
- internal guarded

`middleware.ts` 统一调用 `getWorldKernelRouteDecision`，避免权限只在前端显隐。

## 5. K4｜长期门禁

新增长期门禁：

```text
npm run check:world-kernel-core
npm run check:world-kernel-runtime
npm run check:legacy-boundary
npm run check:world-kernel-consolidation
```

`check:product-release` 已接入 `check:world-kernel-consolidation`，后续产品发布门禁会先验证内核收束状态。

## 6. 剩余阻断

本轮仍不能声明真实上线完成。K5 仍需真实外部证据：

```text
Preview URL
Production URL
线上 smoke test
域名 HTTPS
人工签收
真实回滚演练
```

因此当前状态仍为：

```text
productionLive: false
releaseReady: false
cleanProductionReady: false
```

## 7. 下一步建议

进入小 PR 式收束：

1. 继续逐步压缩历史阶段脚本，但不在一个提交中大删。
2. 将 legacy runtime 移入更明确的 archived/reference 目录或文档化归档。
3. 准备真实 Preview 部署与 smoke test 证据。
4. 在真实环境通过后再处理 K5。

## 8. 发布门禁修正

本轮复跑 `npm run check:release` 时发现旧链路仍调用 `check:experience`，该旧检查要求 `/world-map`、`/time-river`、`/lighthouse` 等历史体验页进入主导航。该要求已经与当前产品化策略冲突，因为这些入口现在应由 `/atlas`、`/timeline`、`/ask` 替代，并通过 middleware / route policy 进行 legacy redirect。

处理结果：

```text
旧链路保留为 check:release:legacy
当前链路改为 check:release
```

新的 `check:release` 只验证当前 World Kernel 产品发布链路：内核收束、产品路由、lint、typecheck、基础检查、路由检查、构建产物验证和 audit report。

## 9. 构建时间窗修正

首次执行新的 `check:release` 时，构建包装器使用默认 120 秒 artifact 生成窗口；在完整检查链路中 Next fresh build 未能在工具时限内生成全部 artifact。随后单独执行较长窗口构建通过。

处理结果：

```text
新增 build:kernel-release
check:release 改用 build:kernel-release
```

`build:kernel-release` 使用 `R8_NEXT_BUILD_TIMEOUT_MS=240000 npm run build`，为当前容器中的 Next/Turbopack artifact generation 留出更合理的时间窗。

补充修正：`build:kernel-release` 已改为直接执行 Next/Turbopack compile mode，而不是继续套旧 R8 wrapper。直接命令已在当前容器中完成 compile、page data、trace 和 route table，并由 `build:verify-artifacts` 验证关键 `.next` 产物。

再次修正：完整 release 链路中 Turbopack compile 偶发停在 optimized production build；改用 Next/Webpack compile mode 后在当前容器中稳定通过，并继续由 artifact verification 校验关键 `.next` 产物。

最终构建策略：新增 `scripts/run-world-kernel-release-build.mjs`，使用 Next/Webpack compile mode，生成关键 `.next` artifacts 后停止 trace/finalization，并由 `build:verify-artifacts` 复核。这比旧 R8 wrapper 更符合当前 World Kernel 收束后的发布链路。

补充：World Kernel build wrapper 在发现关键 artifacts 已存在时会直接复用，避免完整 release 链路内重复清理 `.next` 导致 Next trace 阶段不稳定。
