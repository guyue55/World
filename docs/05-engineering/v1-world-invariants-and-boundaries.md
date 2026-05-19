# 古月浮屿｜V1 世界不变量与边界测试

> 阶段：V1
> 性质：世界骨架质量保障文档
> 目标：把“世界/宇宙骨架是重中之重”落实为可执行不变量和边界检查。

## 1. 什么是不变量

不变量是无论未来 UI、技术栈、AI 能力如何变化，都必须保持成立的条件。

例如：

```text
private 不得进入 public index。
path 不得引用不存在的 node。
relation 不得连接不存在的 node。
world event 不得引用不存在的 node。
AI 未审核内容不得 public。
```

## 2. V1 不变量

### 2.1 数量不变量

```text
主区域 >= 8
公开/半公开节点 >= 12
关系星线 >= 6
精选路径 >= 3
世界事件 >= 5
世界层级 >= 7
```

### 2.2 引用不变量

```text
node.areaId 必须存在
relation.from 必须存在
relation.to 必须存在
path.nodeSlugs 必须存在
worldEvent.nodeIds 必须存在
```

### 2.3 权限不变量

```text
public index 只能包含 public / semiPublic
private / family / partner / vault / sealed / silent 不得进入公开索引
vault 不得被 AI 索引
AI 未审核内容不得 public
```

### 2.4 投影不变量

```text
首页投影来自 public / semiPublic
档案馆投影来自 public / semiPublic
路径投影不得引用不存在节点
时间河投影来自 WorldEvent
```

## 3. 执行命令

```bash
npm run check:invariants
npm run check:world-core
npm run build:world-index
```

## 4. 新增代码

```text
src/lib/world-invariants.ts
src/lib/rules.ts
src/lib/public-index.ts
scripts/check-world-invariants.ts
scripts/build-public-world-index.ts
```

## 5. 最终原则

```text
世界可以不断扩展，
但骨架不变量不能被破坏。
```
