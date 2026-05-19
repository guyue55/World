# 古月浮屿｜V1 性能回归守门

> 阶段：V1
> 性质：性能回归检查与未来 CI 扩展位
> 目标：让性能问题在结构层被提前发现，而不是上线后才压缩补救。

## 1. 文件

```text
data/performance-regression-guard.json
```

## 2. 守门项

```text
route-profile-exists
metrics-model-exists
smoothness-audit-exists
large-content-strategy-exists
world-foundation-stack-boundary
performance-docs-registered
```

## 3. 未来 CI 插槽

```text
lighthouse-ci
bundle-analyzer
route-size-snapshot
public-index-size-check
visual-stability-audit
```

## 4. 命令

```bash
npm run check:performance-regression
npm run performance:regression
```

## 5. 最终原则

```text
性能回归往往来自结构失控，
而不是单个慢函数。
```
