
## 2026-07-08 组件层大规模归档（第 6 轮深度复审）

第 6 次深度复审扫描发现主线主页/主链已收敛到 `product/*`、`node/*`、`atlas/*`、`timeline/*`、`archive/*`、`paths/*`、`ask/*`、`about/*`、`manifesto/*`、`status/*`、`world/*`、`navigation/*`、`interaction/*`、`common/*`、`reading/*` 共 15 个目录；下列目录/文件仅被 `_legacy` 或历史门禁引用，本轮批量归档：

### 组件目录级归档

| 归档目录 | 原用途 | 归档原因 |
|---|---|---|
| r4-creator-workbench | R4 创作者工作台 | 主线 owner 工作台改由 API + `_legacy/ai-workbench` 承担 |
| r6-service-bridge | R6 服务桥接组件 | 主线仅保留 `src/app/api/r6/*` + `@/features/r6-service-bridge` 契约层 |
| r7-world-evolution | R7 世界演化组件 | 主线仅保留 `src/app/api/r7/*` + `@/features/r7-world-evolution` 契约层 |
| r8-dynamic-world | R8 动态世界组件 | 主线由 `world/WorldRuntimeProvider` + `timeline/TimelineRiverRuntime` 等接管 |
| asset-library | 素材资产库面板 | 主线未使用 |
| constellation | 内容星座图组件 | 主线由 `atlas/AtlasLiveConstellation` 承担 |
| content-ingestion | 内容收录面板 | 主线未使用 |
| evidence | 证据面板 | 主线未使用 |
| exhibitions | 主题展览 | 主线未使用 |
| experience | 世界体验面板 | 主线未使用 |
| export-center | 导出中心 UI | 主线由 `scripts/export-world.mjs` 完成，无 UI |
| layout | 早期页面壳 `ResponsivePageShell` | 主线由 `world/WorldShell` 承担 |
| lighthouse | 灯塔早期 UI | 主线由 `ask/PublicLighthouseConsole` 承担 |
| memory-graph | 记忆图谱 | 主线未使用 |
| observability | 可观测面板 | 主线未使用 |
| production-readiness | 生产就绪面板 | 主线未使用 |
| service-adapters | 服务适配面板 | 主线未使用 |
| theme | 主题切换面板 | 主线主题在 `world/*` 内联 |
| time-river | 时间之河 UI | 主线由 `timeline/TimelineRiverRuntime` 承担 |
| world-map | 早期世界地图 | 主线由 `atlas/*` 承担 |

### `world/` 内 43 个孤儿 Panel 归档

`world/` 目录下 43 个 Panel/Grid/CompassNav-lite 组件（`AIBoundaryPanel`、`AssemblyPanel`、`FoundationGatePanel` 等 Phase 3-6 阶段 QA 面板）在主线内已零引用，全部归档到 `_legacy/world/`；主线保留 `WorldRuntimeProvider`、`WorldShell`、`WorldLiveMapPanel`、`WorldPulseConstellation`、`AtlasMap`、`AreaCard`、`AreaNodeCluster`、`CompassNav`、`MobileNav`、`useGsapEntrance` 共 10 个真正被主链消费的模块。

### `visual/` 目录整体归档

`visual/*` 全部 8 个 Hero/Backdrop/Field 组件在主线内零引用，且相互闭环，整目录归档到 `_legacy/visual/`。

### `ask/LighthouseStatus`、`paths/PathHero` 归档

孤立单文件，主线灯塔 UI 已聚合到 `PublicLighthouseConsole`；`paths/*` 主线走 `PathsDynamicDirectory` 与 `PathJourneyBoard`。

### 影响

- 主线 `src/components/*` 目录从 32 收敛到 15；
- 主线 `src/features/*` 目录从 22 收敛到 4（`content-ingestion` + `r6-service-bridge` + `r7-world-evolution` + `_legacy`）；
- `check:daily` / `check:boundary-full` / `release:local-rc` 全绿；
- 门禁 `check:local-owner-workbench` 的 UI 证据路径同步更新到 `src/components/_legacy/r4-creator-workbench/*`；
- 历史 `scripts/check-experience-realization.ts` 相对导入同步更新到 `src/features/_legacy/experience-realization/*`。
