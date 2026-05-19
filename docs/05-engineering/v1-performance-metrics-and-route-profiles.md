# 古月浮屿｜V1 性能指标与页面性能档案

> 阶段：V1
> 性质：性能度量与页面级风险档案
> 目标：让性能可度量、可追踪、可回归检查。

## 1. 文件

```text
data/performance-metrics-model.json
data/route-performance-profiles.json
```

## 2. 指标模型

```text
lcp
inp
cls
ttfb
first-load-js
critical-data-size
initial-card-count
heavy-panel-isolation
no-ai-first-paint
```

## 3. 页面档案

```text
/
 /atlas
 /archive
 /node/[slug]
 /paths
 /paths/[id]
 /ask
 /status
 /skeleton
```

## 4. 最终原则

```text
不同页面有不同性能风险，
不能用同一把尺粗暴衡量。
```
