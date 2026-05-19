# 古月浮屿｜V1 世界骨架第六批打磨说明

> 本文件说明第六批变更：世界/宇宙骨架内核打磨。

## 本次目标

本次不继续做外围功能，而是回到古月浮屿的重中之重：

```text
世界/宇宙骨架
```

也就是：

```text
空间层
内容层
关系层
时间层
投影层
治理层
互操作层
```

## 本次新增核心

### 1. World Core

新增：

```text
src/lib/world-core.ts
```

定义：

- WorldLayer
- WorldDepth
- WORLD_LAYERS
- VISIBILITY_DEPTH
- LIFE_STAGE_DESCRIPTIONS
- getWorldCore()
- summarizeWorldCore()

### 2. Projection Layer

新增：

```text
src/lib/projections.ts
```

让 Node 不只是数据，而是可以投影到：

- home
- atlas
- timeline
- archive
- path
- detail
- ask

### 3. Governance Layer

新增：

```text
src/lib/governance.ts
```

让世界拥有运行守则检查：

- public 节点必须有 summary
- AI 未审核不可 public
- private / vault 不可 featured
- seed 不建议进入首页精选
- AI 生成星线需要审核

### 4. Star Lines

新增：

```text
src/lib/star-lines.ts
```

将 Relation 转为公开星线图数据，为后续 Atlas 深潜模式、创世台和高级星图预留。

### 5. Skeleton Health

新增：

```text
src/lib/world-skeleton-health.ts
```

用于评估：

- 世界层级是否完整
- 主区域是否完整
- 首批节点是否可用
- 星线关系是否可追溯
- 探索路径是否成立
- 时间河是否有源头
- 首页投影是否成立
- 治理层是否有阻断错误

### 6. Skeleton Page

新增：

```text
src/app/skeleton/page.tsx
```

让世界骨架本身成为一个可见页面。

### 7. World Skeleton Check

新增：

```text
scripts/check-world-skeleton.ts
```

并在 package.json 增加：

```bash
npm run check:skeleton
npm run check:world-core
```

## 核心判断

```text
古月浮屿的宇宙感不是从 3D 开始，
而是从世界骨架的完整性开始。
```

```text
页面只是投影。
数据是骨架。
关系是星线。
时间是河流。
治理是边界。
互操作是传承。
```
