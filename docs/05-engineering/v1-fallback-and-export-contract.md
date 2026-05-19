# 古月浮屿｜V1 降级策略与导出契约

> 阶段：V1
> 性质：长期可用性与可迁移性保障
> 目标：保证世界不依赖单点能力，也能被导出、迁移、重建。

## 1. 降级策略

```text
data/fallback-strategy.json
```

核心原则：

```text
任何高级体验都必须可降级；
世界核心不依赖 AI、3D、后台或网络服务才能成立。
```

## 2. 必须降级的能力

```text
AI lighthouse → low-light path guide
semantic search → local Fuse.js search / archive filters
2.5D map → Atlas list/grid view
3D/WebXR → 2D Atlas + breadcrumbs
web audio → silent visual mode
creator console → VS Code + Git + validation scripts
RAG → public index + curated paths
```

## 3. 导出契约

```text
data/export-contract.json
```

导出包：

```text
public-world
source-world
archive-snapshot
```

## 4. 最终原则

```text
世界必须可导出、可迁移、可重建。
```
