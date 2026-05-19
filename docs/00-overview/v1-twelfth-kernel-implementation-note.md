# 古月浮屿｜V1 第十二批世界内核打磨说明

> 本文件说明第十二批变更：将前面多批骨架能力收束为可检查的世界内核。

## 本次重点

第十二批解决：

```text
内核总检
降级策略
导出契约
未来兼容矩阵
公共/私密索引边界
长期可维护性
```

## 新增数据

```text
data/fallback-strategy.json
data/export-contract.json
data/compatibility-matrix.json
data/world-kernel-manifest.json
```

## 新增代码

```text
src/lib/fallbacks.ts
src/lib/export-contract.ts
src/lib/compatibility.ts
src/lib/world-kernel.ts
```

## 新增脚本

```text
scripts/check-world-kernel.ts
scripts/print-world-kernel-report.ts
```

## 新增命令

```bash
npm run check:kernel
npm run kernel:report
```

## 骨架价值

```text
高级体验都有降级路径。
世界可以导出、迁移、重建。
V2-V6 与 V1 的依赖关系明确。
内核可以聚合所有关键检查。
```

## 核心判断

```text
V1 的目标不是把未来都做完，
而是让未来无论怎么长，都不会把地基长歪。
```
