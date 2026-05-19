# 古月浮屿｜V1 流畅度审计与大规模内容策略

> 阶段：V1
> 性质：交互流畅度和内容增长策略
> 目标：保证未来内容增长后仍然稳定、可读、可交互。

## 1. 文件

```text
data/smoothness-audit-checklist.json
data/large-content-strategy.json
```

## 2. 流畅度审计项

```text
stable-header
stable-card-grid
focus-visible
tap-target
motion-reduced
loading-empty-state
heavy-panel-progressive
no-layout-thrash
```

## 3. 内容增长阶段

```text
seed: 0-100
garden: 100-1000
island: 1000-10000
archipelago: 10000+
```

## 4. 最终原则

```text
未来内容可以增长，
但页面永远只消费被投影过的必要切片。
```
