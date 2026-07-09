# WorldOS M17 本地 QA 与证据自动化执行计划

## 1. 目标

把“看起来完成”升级为“有新鲜、真实、可复查证据证明完成”。本阶段仍只服务 localhost / LAN，不考虑外部 Preview / Production。

## 2. 执行项

| 项 | 操作 | 验收 |
| --- | --- | --- |
| fresh build | RC 入口必须触发真实构建或验证构建新鲜度 | 不被旧 `.next` 误导 |
| localhost smoke | 浏览器打开本机地址并检查关键页面 | 无白屏、死链、控制台关键错误 |
| LAN smoke | 使用局域网 IP 访问核心路由 | 局域网设备可访问 |
| 截图证据 | desktop / mobile / reduced-motion / reduced-sensory 分开截图 | 证据能看出场景差异 |
| 首屏关键区 | 检查 H1、主入口、状态、导航、核心场景入口可见 | 无遮挡和骨架空屏 |
| 人工量表 | 使用 human experience rubric 记录是否仍像骨架 | 仍像骨架不得完成 |
| 缺陷闭环 | 发现异常写入缺陷项，修复后重跑 | 无静默跳过 |

## 3. 覆盖场景

- Home 首访和回访。
- Atlas 地图。
- Timeline 时间河。
- Archive 档案馆。
- Paths 旅程。
- Node 地点阅读。
- Lighthouse 观测站。
- 音频关闭和开启后状态。
- AI disabled / fallback 状态。
- 无权限 / 私密不可见状态。

## 4. 检查命令

- `npm run check:scene-qa`
- `npm run check:mainline`
- `npm run release:local-rc`
- `npm run check:runtime-local`
- `npm run check:reduced-motion`
- `npm run check:api-boundary`

## 5. 证据策略

- 提交仓库的证据应是摘要和必要基线，不提交大量临时截图。
- 临时截图可保存在本地证据目录，避免无意义 diff。
- 每次 Goal 模式完成阶段必须写明使用的命令和失败重跑情况。
- 自动检查和人工体验判断必须同时存在。

## 6. 边界

- 不把外部 Preview 作为当前验收条件。
- 不接受“脚本通过但页面还是骨架”的完成口径。
- 不接受旧构建、旧截图、旧报告碰巧通过。

