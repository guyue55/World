# 古月浮屿｜V1 第二十五批性能回归骨架打磨说明

> 本文件说明第二十五批变更：把性能指标、页面性能档案、流畅度审计、大规模内容策略和性能回归守门纳入世界骨架。

## 本次重点

第二十五批解决：

```text
性能指标模型
页面性能档案
流畅度审计清单
大规模内容策略
性能回归守门
未来 CI 性能扩展位
```

## 新增数据

```text
data/performance-metrics-model.json
data/route-performance-profiles.json
data/smoothness-audit-checklist.json
data/large-content-strategy.json
data/performance-regression-guard.json
```

## 新增代码

```text
src/lib/performance-regression.ts
src/components/world/PerformanceRegressionPanel.tsx
```

## 新增脚本

```text
scripts/check-performance-regression.ts
scripts/print-performance-regression.ts
```

## 新增命令

```bash
npm run check:performance-regression
npm run performance:regression
```

## 骨架价值

```text
性能指标可追踪。
页面风险有档案。
流畅度可审计。
内容增长有阶段策略。
性能回归进入守门链路。
```

## 核心判断

```text
性能必须可度量，
才能在未来扩展中不退化。
```
