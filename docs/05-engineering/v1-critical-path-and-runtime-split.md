# 古月浮屿｜V1 首屏关键路径与运行时拆分

> 阶段：V1
> 性质：性能实现边界
> 目标：让首屏只承载世界入口，不承载完整宇宙重量。

## 1. 契约文件

```text
data/critical-path-contract.json
data/runtime-split-contract.json
```

## 2. 首屏关键路径

```text
/
  critical: site identity / primary navigation / representative public nodes
  defer: full archive / full relation graph / heavy status panels

/atlas
  critical: area summary / static spatial entry / fallback list
  defer: animated graph / 2.5D map / force layout

/status / skeleton
  critical: summary / pass-fail state
  defer: full panel stack / deep audit matrix
```

## 3. 运行时拆分目标

```text
foundation-panel-stack
future-search
future-visual-map
future-ai-guide
future-private-archive
```

## 4. 最终原则

```text
首屏只承载世界入口，
不承载完整宇宙重量。
```
