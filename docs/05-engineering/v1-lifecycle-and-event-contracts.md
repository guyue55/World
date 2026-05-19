# 古月浮屿｜V1 生命周期与世界事件契约

> 阶段：V1
> 性质：世界生长机制
> 目标：让节点生长、归档、复活、沉睡都有清晰规则。

## 1. 生命周期状态

```text
seed
sprout
growing
bloom
fruit
archive
relic
dormant
silent
```

## 2. 生命周期策略文件

```text
data/lifecycle-policy.json
```

它定义：

- 所有生命阶段
- 允许的状态转换
- 首页精选最低阶段
- 路径核心最低阶段
- 各阶段说明

## 3. 典型状态流

```text
seed → sprout → growing → bloom → fruit → archive → relic
```

也允许：

```text
seed → dormant
dormant → sprout
archive → growing
```

## 4. 世界事件契约

事件不是随便写的日志。

例如：

```text
node-created 必须引用 nodeIds
area-awakened 必须引用 areaIds
node-published 必须引用 nodeIds
```

对应代码：

```text
src/lib/event-contracts.ts
scripts/check-world-contracts.ts
```

## 5. 最终原则

```text
内容不是发布物，
而是拥有生命阶段的世界节点。
```
