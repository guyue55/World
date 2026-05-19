# 古月浮屿｜V1 多端视觉与交互 QA

> 阶段：V1
> 性质：第一阶段 P0 真实体验收口
> 目标：把桌面、平板、移动端的视觉和交互问题纳入可检查清单。

## 1. 文件

```text
data/visual-qa-checklist.json
data/interaction-qa-checklist.json
data/layout-responsive-contract.json
data/visual-interaction-defect-register.json
```

## 2. 必测视口

```text
375 × 812
430 × 932
768 × 1024
1440 × 900
1920 × 1080
```

## 3. 必测路由

```text
/
 /atlas
 /archive
 /node/[slug]
 /paths
 /ask
 /status
 /skeleton
 /about
 /manifesto
```

## 4. 必测问题

```text
桌面内容是否过窄
导航 active 是否正确
标签切换状态是否同步
折叠/展开是否可点击
搜索/过滤是否有空状态
移动端触控是否舒适
状态页/骨架页面板是否过重
首页是否有真实内容和配图价值
```

## 5. 命令

```bash
npm run check:visual-qa
npm run visual-qa:print
```
