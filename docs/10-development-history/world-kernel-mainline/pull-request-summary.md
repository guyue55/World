# PR Summary｜World Kernel Mainline 01

## 变更摘要

本 PR 是最新 `main` 基线上的第一批 World Kernel 收敛改动。

核心变化：

```text
1. 不继续新增 V / R 概念扩张线。
2. 将 WorldShell 从直接装配全部 R8.x 投影层，改为只装配 WorldRuntimeStack。
3. 建立 Core Model / Runtime Rules / Presentation Projections 三层边界。
4. 明确 artifact verification 不是 clean production-ready 证明。
5. 新增主线收敛检查脚本，作为后续重构护栏。
```

## 改动文件

```text
src/components/world/WorldRuntimeStack.tsx
src/components/world/WorldShell.tsx
docs/03-engineering-architecture/world-kernel-mainline-audit.md
data/world-kernel/mainline-boundary.json
scripts/check-world-kernel-mainline.ts
docs/10-development-history/world-kernel-mainline/world-kernel-mainline-progress.md
```

## 行为变化

```text
页面行为：理论上不变。
WorldShell：依赖减少，职责更单一。
动态层：仍保留全部既有投影层，只是迁移到 WorldRuntimeStack。
权限：未改变。
路由：未改变。
生产状态：未标记 release-ready。
```

## 风险说明

```text
当前无法在连接器内执行真实 npm / Next 构建。
此 PR 只做低风险结构收敛，不声明 clean production-ready。
```

## 后续工作

```text
1. 将 scripts/check-world-kernel-mainline.ts 接入 package.json 的 check:core。
2. 将 check:world-core 拆分为 check:core / check:release / check:legacy。
3. 合并重复 R8.x 投影层。
4. 修复 deterministic next build exit。
```
