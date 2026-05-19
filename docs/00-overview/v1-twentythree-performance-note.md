# 古月浮屿｜V1 第二十三批性能与流畅度骨架打磨说明

> 本文件说明第二十三批变更：把性能预算、渲染分层、数据加载和交互流畅度纳入世界骨架。

## 本次重点

第二十三批解决：

```text
性能预算
渲染分层
数据加载策略
交互流畅度契约
性能检查脚本
性能面板
```

## 新增数据

```text
data/performance-budget.json
data/rendering-strategy.json
data/loading-strategy.json
data/interaction-smoothness-contract.json
```

## 新增代码

```text
src/lib/performance-contracts.ts
src/components/world/PerformanceContractPanel.tsx
```

## 新增脚本

```text
scripts/check-performance-contracts.ts
scripts/print-performance-report.ts
```

## 新增命令

```bash
npm run check:performance
npm run performance:print
```

## 骨架价值

```text
首页首屏有预算。
页面加载按投影分层。
重功能不进入核心路径。
交互流畅度有契约。
未来大型体验可渐进加载。
```

## 核心判断

```text
世界可以宏大，
但首次进入必须轻、快、稳。
```
