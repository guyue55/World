# 古月浮屿｜V1 可扩展骨架架构

> 阶段：V1
> 性质：未来扩展地基
> 目标：让古月浮屿具备长期扩展能力，但不破坏 V1 世界骨架。

## 1. 核心原则

```text
未来可以无限扩充，
但扩展必须通过注册点进入世界，
不能穿透骨架。
```

## 2. 扩展注册表

```text
data/extension-registry.json
```

注册：

- namespaces
- extensionPoints
- futurePhases
- extension rules

## 3. 命名空间

```text
core
world
content
projection
ai
private
future
plugin
```

其中：

```text
core / world / content / projection / ai / private
```

为保留命名空间，不允许插件覆盖。

## 4. 扩展点

```text
node.type
node.lifecycle
relation.type
world.event.type
projection.target
area.module
ai.skill
private.space
export.format
visual.experience
```

## 5. 最终原则

```text
先有扩展点，
再有未来功能。
```
