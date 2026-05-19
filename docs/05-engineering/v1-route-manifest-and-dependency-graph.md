# 古月浮屿｜V1 路由清单与依赖图

> 阶段：V1
> 性质：世界入口与依赖关系审计
> 目标：让页面入口和运行时依赖都可见、可检查、可维护。

## 1. 路由清单

```text
data/route-manifest.json
```

路由不是页面堆叠，而是世界入口投影。

核心字段：

```text
path
id
layer
required
fallback
```

## 2. 依赖图

```text
data/dependency-graph.json
```

依赖图用于确认：

```text
data → world-core
world-core → kernel
kernel → operations
docs → kernel
future → kernel
```

## 3. 禁止依赖

```text
routes → private
ai → vault
future → core
projection → visibility
```

## 4. 最终原则

```text
依赖必须可见，
才能避免未来扩展反向污染内核。
```
