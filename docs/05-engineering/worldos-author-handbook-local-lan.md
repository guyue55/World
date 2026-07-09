# WorldOS 作者手册：本地与局域网维护

## 目的

本手册面向 WorldOS 作者本人，目标是用中文、低门槛、可复跑的方式维护个人数字世界。当前阶段只支持 localhost / LAN IP，不处理外部 Preview、Production、域名、HTTPS 或线上监控。

## 日常工作顺序

1. 先判断本次变更类型：内容、关系、场景、资产、AI 审计、权限、运维。
2. 查对应清单，不直接改页面临时拼接。
3. 修改事实源、registry、组件或文档。
4. 运行对应检查。
5. 运行 `npm run check:mainline`。
6. 阶段性验收运行 `npm run release:local-rc`。
7. 用中文 commit 记录原因和结果。

## 作者最常用命令

```bash
npm run start
npm run check:mainline
npm run check:boundary
npm run release:local-rc
```

## 维护原则

- 内容先进入事实源，再被 Atlas、Timeline、Archive、Paths、Node 共同吸收。
- 后端控制权限，前端只控制体现；不能用 localStorage、按钮隐藏或 CSS 当权限。
- AI 灯塔只读解释、推荐、问路，不自动写源数据。
- 声音默认关闭，必须由用户点击后启用。
- 新依赖必须有明确收益；Three、Pixi、Howler、Tone、XState 等重型候选先写 ADR。
- 新场景必须进入 registry、检查脚本和截图验收，不能成为游离组件。

## 完成定义

一次作者维护完成，至少满足：

- 事实源、页面、检查脚本一致。
- `npm run check:mainline` 通过。
- 涉及本地运行、LAN 或截图证据时，`npm run release:local-rc` 通过。
- 没有引入外部发布状态，`productionLive`、`releaseReady`、`cleanProductionReady` 继续为 `false`。
