# 古月浮屿｜V1 第一阶段验收门禁

> 阶段：V1
> 性质：阶段完成判定
> 目标：明确第一阶段什么时候可以被称为完成。

## 1. 关键文件

```text
data/stage-completion-gate.json
data/final-acceptance-checklist.json
```

## 2. 当前状态

```text
not-yet-complete
```

原因：

```text
世界骨架、协议、模块、性能和文档已基本成型；
但真实 npm 构建、真实浏览器 QA、真实性能实测和预览部署尚未执行。
```

## 3. 完成条件

```text
npm run lint
npm run typecheck
npm run check:world-core
npm run build
真实浏览器多端 QA
真实性能实测
预览部署检查
P0 缺陷关闭或明确延期
```

## 4. 核心判断

```text
阶段完成必须由证据决定，
而不是由感觉决定。
```
