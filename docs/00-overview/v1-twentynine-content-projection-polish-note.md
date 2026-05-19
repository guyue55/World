# 古月浮屿｜V1 第二十九批内容投影与首页产品化打磨说明

> 本文件说明第二十九批变更：继续第一阶段收口，从骨架协议转向真实内容体验，把首页、配图、种子内容和页面密度纳入可检查体系。

## 本次重点

第二十九批解决：

```text
首页内容产品化基线
封面与配图策略
页面投影密度策略
种子内容质量门槛
内容产品化检查脚本
```

## 新增数据

```text
data/content-productization-baseline.json
data/cover-strategy.json
data/projection-density-strategy.json
data/seed-content-quality-gate.json
```

## 新增代码

```text
src/lib/content-productization.ts
src/components/world/ContentProductizationPanel.tsx
```

## 新增脚本

```text
scripts/check-content-productization.ts
scripts/print-content-productization.ts
```

## 新增命令

```bash
npm run check:content-productization
npm run content:productization
```

## 阶段判断

这一批继续把第一阶段从“骨架正确”推向“真实可访问”。下一步应补真实内容、真实封面、首页密度和多端视觉实测。

## 核心判断

```text
首页不是数据堆叠，
而是世界入口的第一次说明。
```
