# 古月浮屿｜V1 第二十八批多端视觉与交互 QA 收口说明

> 本文件说明第二十八批变更：进入第一阶段 P0 的视觉和交互 QA 收口。

## 本次重点

第二十八批解决：

```text
多端视觉 QA 清单
交互 QA 清单
布局宽度与响应式契约
视觉/交互缺陷登记册
视觉 QA 检查脚本
```

## 新增数据

```text
data/visual-qa-checklist.json
data/interaction-qa-checklist.json
data/layout-responsive-contract.json
data/visual-interaction-defect-register.json
```

## 新增代码

```text
src/lib/visual-interaction-qa.ts
src/components/world/VisualInteractionQaPanel.tsx
```

## 新增脚本

```text
scripts/check-visual-interaction-qa.ts
scripts/print-visual-interaction-qa.ts
```

## 新增命令

```bash
npm run check:visual-qa
npm run visual-qa:print
```

## 阶段判断

本批不是替代真实浏览器 QA，而是把真实 QA 的范围、缺陷、布局契约和交互规则固定下来。下一步应在真实浏览器逐页验证，并把问题从 watch 改为 open/closed。

## 核心判断

```text
视觉 QA 不是看起来漂亮，
而是每个页面在真实设备上都能稳定使用。
```
