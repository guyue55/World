# 古月浮屿｜V1 第三十批阶段验收门禁与预览发布准备说明

> 本文件说明第三十批变更：建立第一阶段完成判定、CI 准备、预览发布检查和最终验收清单。

## 本次重点

第三十批解决：

```text
第一阶段完成判定门禁
CI 准备契约
GitHub Actions CI workflow
预览发布检查清单
最终验收清单
阶段验收检查脚本
```

## 新增数据

```text
data/stage-completion-gate.json
data/ci-readiness-contract.json
data/release-preview-checklist.json
data/final-acceptance-checklist.json
```

## 新增工程文件

```text
.github/workflows/ci.yml
src/lib/stage-acceptance.ts
src/components/world/StageAcceptancePanel.tsx
scripts/check-stage-acceptance.ts
scripts/print-stage-acceptance.ts
```

## 新增命令

```bash
npm run check:stage-acceptance
npm run stage:acceptance
```

## 阶段判断

```text
第一阶段尚未完成。
```

不是因为骨架不够，而是因为完成判定必须经过真实构建、真实 QA、真实性能实测和预览部署。

## 核心判断

```text
阶段完成必须由证据决定，
而不是由感觉决定。
```
