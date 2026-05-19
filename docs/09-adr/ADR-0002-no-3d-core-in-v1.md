# ADR-0002｜V1 不采用 3D 元宇宙作为核心入口

## 状态

Accepted

## 背景

古月浮屿有宇宙感，但宇宙感不等于 3D。V1 如果把 3D、WebXR、Avatar 或多人空间作为核心入口，会让世界成立依赖高成本体验。

## 决策

V1 不将 3D 作为核心入口。

V1 优先建立：

```text
Area
Node
Relation
Path
WorldEvent
Projection
Visibility
Fallback
```

## 后果

好处：

```text
访问门槛低
构建稳定
可读性强
移动端友好
未来仍可扩展到 2.5D / 3D
```

代价：

```text
V1 视觉震撼不依赖 3D
高级空间体验延后
```

## 结论

```text
宇宙感首先来自结构，
不是来自渲染。
```
