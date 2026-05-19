# 古月浮屿｜V1 真实执行证据台账

> 阶段：V1
> 性质：第一阶段完成证据
> 目标：把真实构建、真实 QA、真实性能和预览部署结果记录下来。

## 1. 文件

```text
data/real-execution-evidence-ledger.json
data/performance-measurement-records.json
data/browser-qa-records.json
```

## 2. 必须记录

```text
npm install
npm run lint
npm run typecheck
npm run check:world-core
npm run build
preview deploy
Lighthouse / equivalent
manual browser QA
```

## 3. 状态

```text
awaiting-real-execution
```

## 4. 规则

```text
任何失败必须转化为缺陷、任务或明确延期。
真实执行台账更新后，才能考虑修改 stage-completion-gate。
不得用静态解析结果替代真实 npm build 结果。
不得用单一桌面视口替代多端视觉 QA。
```
