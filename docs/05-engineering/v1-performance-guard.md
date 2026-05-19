# 古月浮屿｜V1 性能守门

> 阶段：V1
> 性质：性能回归和结构守门
> 目标：性能守门不仅看数字，也看结构是否允许未来继续优化。

## 1. 守门文件

```text
data/performance-guard.json
```

## 2. 检查目标

```text
critical-path-registered
asset-policy-registered
cache-strategy-registered
runtime-split-registered
panel-stack-boundary
performance-panel-boundary
```

## 3. 命令

```bash
npm run check:performance-implementation
npm run performance:impl
```

## 4. 最终原则

```text
若页面变重，先检查是否应进入 split contract。
若资源变大，先检查是否应进入 asset policy。
若数据变多，先检查是否应进入 cache strategy。
```
