# 古月浮屿｜V1 关系规则与 Atlas 契约

> 阶段：V1
> 性质：星线与空间导航契约
> 目标：让关系不是装饰线，让 Atlas 不是分类页。

## 1. 关系策略文件

```text
data/relation-policy.json
```

## 2. 关系强度

```text
0.2 weak
0.5 medium
0.8 strong
1.0 core
```

## 3. 关系规则

```text
source=ai 的关系必须 reviewed=true 才能作为正式星线。
strength=1.0 必须有 note 或人工来源。
publicVersionOf / privateSourceOf 不得把私密节点暴露到 public index。
revivedFrom 应产生 node-revived 或相关 WorldEvent。
relation 不得形成无法解释的核心路径。
```

## 4. Atlas 契约文件

```text
data/atlas-layout-contract.json
```

## 5. Atlas 模式

```text
surface
focus
path
deep
future-2.5d
```

## 6. Atlas 规则

```text
任何 Atlas 视觉增强都必须有列表降级。
任何 2.5D/3D 模式都不得成为核心导航前置条件。
公开 Atlas 只能读取 public / semiPublic。
deep/vault 不在公开 Atlas 展开。
Atlas 坐标来自 spatial-protocol，而不是组件内硬编码。
```

## 7. 最终原则

```text
关系是星线，
Atlas 是空间入口。
```
