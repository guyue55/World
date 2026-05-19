# 古月浮屿｜V1 第一阶段最终关闭报告

> 阶段：V1
> 性质：阶段最终关闭报告契约
> 目标：汇总真实构建、预览部署、浏览器 QA、性能实测和缺陷登记结果。

## 1. 文件

```text
data/final-closure-report-contract.json
data/phase-one-final-decision-template.json
scripts/generate-final-closure-report.mjs
```

## 2. 命令

```bash
npm run closure:final
```

会生成：

```text
reports/first-stage-final-closure-report.json
```

## 3. 完成条件

```text
本地验收命令通过
预览冒烟通过
浏览器 QA 通过
性能实测通过或明确说明
无阻断缺陷
预览 URL 已记录
```
