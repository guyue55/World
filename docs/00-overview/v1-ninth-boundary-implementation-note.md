# 古月浮屿｜V1 第九批边界地基打磨说明

> 本文件说明第九批变更：继续打磨世界/宇宙骨架中的权限、AI、投影与构建边界。

## 本次重点

第九批解决：

```text
权限矩阵运行时
AI 边界契约
投影契约
世界构建流水线
公开索引边界
骨架页面可视化
```

## 新增数据

```text
data/ai-boundary-policy.json
data/projection-contracts.json
data/build-pipeline.json
```

## 新增运行时代码

```text
src/lib/permissions.ts
src/lib/ai-boundary.ts
src/lib/projection-contracts.ts
src/lib/build-pipeline.ts
```

## 新增脚本

```text
scripts/check-ai-boundary.ts
scripts/check-projection-contracts.ts
scripts/print-build-pipeline.ts
```

## 新增命令

```bash
npm run check:ai-boundary
npm run check:projections
npm run pipeline:print
```

## 骨架价值

```text
公开层不会误读私密层。
AI 不会越过权限边界。
页面投影不会绕过协议。
构建流程会先检查世界骨架。
```
