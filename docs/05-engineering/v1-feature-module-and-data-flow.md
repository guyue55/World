# 古月浮屿｜V1 特性模块与数据流契约

> 阶段：V1
> 性质：中大型项目特性分层
> 目标：让模块按领域聚合，数据单向流动，可追踪、可降级。

## 1. 特性模块

```text
data/feature-module-contract.json
```

模块：

```text
world
node
paths
archive
governance
interoperability
operations
future
```

## 2. 数据流

```text
data/data-flow-contract.json
```

流向：

```text
data/content → src/lib
src/lib → projection helpers
projection helpers → src/app
src/app → src/components
scripts → src/lib/data
```

## 3. 禁止流向

```text
src/components → data/private
src/app → visibility decision
AI → raw private content
future visual layer → kernel mutation
```

## 4. 最终原则

```text
数据流必须单向、可追踪、可降级。
```
