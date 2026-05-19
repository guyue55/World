# 古月浮屿｜V1 模块边界

> 阶段：V1
> 性质：工程边界与架构约束
> 目标：防止未来功能不断增加后，模块职责混乱。

## 1. 模块边界文件

```text
data/module-boundaries.json
```

## 2. 核心模块

```text
world-core
content
relations
timeline
projection
governance
ai-boundary
interoperability
```

## 3. 边界示例

### projection

负责：

```text
node projections
projection contracts
```

不得负责：

```text
private data access
```

### ai-boundary

负责：

```text
AI permissions
AI review rules
```

不得负责：

```text
content publishing
```

### timeline

负责：

```text
world events
event contracts
```

不得负责：

```text
article date fallback as source of truth
```

## 4. 最终原则

```text
模块边界清楚，
未来扩展才不会互相污染。
```
