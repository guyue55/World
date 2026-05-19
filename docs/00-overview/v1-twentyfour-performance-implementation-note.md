# 古月浮屿｜V1 第二十四批性能实现边界打磨说明

> 本文件说明第二十四批变更：把首屏关键路径、运行时拆分、静态资源、缓存策略和性能守门纳入世界骨架。

## 本次重点

第二十四批解决：

```text
首屏关键路径
运行时拆分边界
静态资源治理
缓存/生成策略
性能守门检查
性能实现面板
```

## 新增数据

```text
data/critical-path-contract.json
data/static-asset-policy.json
data/cache-strategy.json
data/runtime-split-contract.json
data/performance-guard.json
```

## 新增代码

```text
src/lib/performance-implementation.ts
src/components/world/PerformanceImplementationPanel.tsx
```

## 新增脚本

```text
scripts/check-performance-implementation.ts
scripts/print-performance-implementation.ts
```

## 新增命令

```bash
npm run check:performance-implementation
npm run performance:impl
```

## 骨架价值

```text
首屏关键路径被定义。
重能力被拆分边界包住。
静态资源有治理策略。
缓存生成有重建原则。
性能回归进入检查链路。
```

## 核心判断

```text
性能不是最后压缩，
而是从骨架阶段就决定哪些东西不能进入首屏。
```
