# 古月浮屿｜V1 第十八批可复现地基打磨说明

> 本文件说明第十八批变更：建立地基装配清单、环境基线、仓库结构契约和可复现检查。

## 本次重点

第十八批解决：

```text
地基装配清单
环境基线
仓库结构契约
可复现契约
可复现检查
装配报告
```

## 新增数据

```text
data/foundation-assembly-manifest.json
data/environment-baseline.json
data/repository-structure-contract.json
data/reproducibility-contract.json
```

## 新增代码

```text
src/lib/assembly.ts
```

## 新增脚本

```text
scripts/check-reproducibility.ts
scripts/print-assembly-report.ts
```

## 新增命令

```bash
npm run check:reproducibility
npm run assembly:print
```

## 骨架价值

```text
地基可以被重新装配。
环境基线清晰。
仓库结构有契约。
必需命令可检查。
未来交接不依赖记忆。
```

## 核心判断

```text
能复现，
才能长期传承。
```
