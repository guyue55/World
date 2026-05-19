# 古月浮屿｜V1 世界构建流水线

> 阶段：V1
> 性质：构建前守门流程
> 目标：让每次构建都先检查世界骨架。

## 1. 流水线文件

```text
data/build-pipeline.json
```

## 2. 构建阶段

```text
schema
public-boundary
skeleton
invariants
contracts
projection
ai-boundary
public-index
```

## 3. 阻断构建的检查

```bash
npm run validate:world
npm run check:public
npm run check:skeleton
npm run check:invariants
npm run check:contracts
npm run check:projections
npm run check:ai-boundary
```

## 4. 公开索引生成

```bash
npm run build:world-index
```

## 5. 查看流水线

```bash
npm run pipeline:print
```

## 6. 最终原则

```text
前台可以浪漫，
后台必须清醒。
```
