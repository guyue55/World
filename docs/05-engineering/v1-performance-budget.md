# 古月浮屿｜V1 性能预算

> 阶段：V1
> 性质：性能与加载速度骨架
> 目标：确保世界未来变大时，首次进入仍然轻、快、稳。

## 1. 预算文件

```text
data/performance-budget.json
```

## 2. 核心原则

```text
世界可以宏大，
但首次进入必须轻、快、稳。
```

## 3. 当前预算

```text
first-load-js <= 180KB gzip
route-js-growth <= 30KB per route delta
homepage-critical-data <= 60 public nodes summary
archive-initial-render <= 100 visible cards
large images lazy or optimized
motion subtle and no layout thrash
```

## 4. 最终原则

```text
性能预算超限时，
优先做结构拆分，而不是牺牲可维护性。
```
