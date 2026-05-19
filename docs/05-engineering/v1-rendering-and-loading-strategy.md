# 古月浮屿｜V1 渲染分层与数据加载策略

> 阶段：V1
> 性质：渲染、加载和可扩展体验策略
> 目标：让页面只加载自身需要的世界投影，而不是一次加载完整宇宙。

## 1. 文件

```text
data/rendering-strategy.json
data/loading-strategy.json
```

## 2. 渲染分层

```text
critical-static
progressive-content
interactive-enhancement
visual-enhancement
future-heavy
```

## 3. 数据加载原则

```text
首页不加载完整世界。
归档页不加载所有 markdown 正文。
详情页不加载整个世界。
状态页重面板必须集中装配。
AI 入口必须先显示无 AI fallback。
```

## 4. 最终原则

```text
数据加载以投影为单位，
不以完整宇宙为单位。
```
