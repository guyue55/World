# WorldOS 真实视觉审查记录

> [!IMPORTANT]
> 本文档记录 2026-07-10 针对“页面仍像骨架和简单动态”的真实视觉审查。它不是完成报告，而是后续开发必须继承的事实底账。

## 1. 结论

用户判断成立：上一轮“阶段完成”更多证明了运行底座、脚本门禁和轻量舞台壳存在，并没有证明 WorldOS 已经呈现真实世界 / 宇宙体验。

本轮修复只完成了**首轮视觉缺陷压降**：

- Atlas / Timeline / Archive / Paths 等页面首屏开始出现明确舞台面板。
- 声景控件不再以大面板遮挡移动端首屏。
- 冗余场景定位卡减少了首屏系统面板感。
- 生产构建与主线检查通过。

但它仍不能被描述为“真格世界完成”。当前状态更准确地说是：

> 从“博客骨架 + 动效”推进到“有首屏舞台壳的世界入口”，尚未进入“可探索、可迁移、可回看、可导览的真实世界”。

## 2. 审查范围

| 页面 | 审查对象 | 真实判断 |
| --- | --- | --- |
| `/` | 首页入口、首访感、声景控件 | 移动端遮挡已修复，入口仍偏静态介绍 |
| `/atlas` | 星图 / 地图感 | 有星图舞台，但还不是可探索地图 |
| `/timeline` | 时间河 | 有河流舞台，但事件主体仍在下方列表化 |
| `/archive` | 档案馆 | 有书架舞台，但检索空间感不足 |
| `/paths` | 旅程系统 | 有路径舞台，但路线行走感不足 |
| `/node/world-manifesto` | 节点地点化 | 仍更像阅读页，不像地点 |
| `/ask` | 灯塔导览 | 有灯塔舞台，但导览人格和交互仍浅 |
| `/status` | 维护舱 | 可以作为证据页，不应作为世界体验主线 |

## 3. 证据位置

本轮截图证据保存在临时目录：

- `/tmp/worldos-visual-audit-2026-07-10`
- `/tmp/worldos-visual-audit-2026-07-10-after`
- `/tmp/worldos-visual-audit-2026-07-10-after2`
- `/tmp/worldos-visual-audit-2026-07-10-final`
- `/tmp/worldos-visual-audit-2026-07-10-production`
- `/tmp/worldos-visual-audit-2026-07-10-production-final`

关键截图：

- `/tmp/worldos-visual-audit-2026-07-10-production-final/atlas-desktop.png`
- `/tmp/worldos-visual-audit-2026-07-10-production-final/home-mobile.png`
- `/tmp/worldos-visual-audit-2026-07-10-production-final/audit-production-final.json`

> [!NOTE]
> 这些截图是临时证据，不应作为长期归档资产直接提交。后续应由 M17 的本地 QA 证据自动化产出可控、可复核、低噪音的报告。

## 4. 本轮修复记录

提交：

- `301a4fdb feat(world): 修复真实视觉骨架感首轮问题`

涉及变更：

| 文件 | 变更 |
| --- | --- |
| `src/components/world/SceneWorldPortal.tsx` | 增加首屏舞台面板、场景化抵达提示、视觉审查锚点 |
| `src/components/world/RuntimeSoundscapeControl.tsx` | 将声景控件收敛为紧凑按钮，避免遮挡 |
| `src/components/world/SceneTransitionShell.tsx` | 只有真实迁移时展示可见迁移提示 |
| `src/components/world/SceneIdentityBand.tsx` | 核心门户场景不再重复展示身份条 |
| `src/components/node/NodeCard.tsx` | 修复标签 key 防重复 |
| `src/components/node/NodeReadingHeader.tsx` | 修复标签 key 防重复 |
| `src/components/archive/ArchiveDynamicGuide.tsx` | 修复标签 key 防重复 |
| `src/components/timeline/WorldEventCard.tsx` | 修复关联项 key 防重复 |
| `scripts/run-worldos-production-ci-build.mjs` | 生产构建成功后清理 `.next/cache`，让门禁检查运行时产物 |

## 5. 已通过检查

```bash
npm run typecheck
npm run lint
npm run build:production-ci
npm run check:mainline
git diff --check
```

生产态验证：

- 使用 `next start -H 0.0.0.0 -p 3002` 验证新构建。
- 使用系统 Google Chrome 进行截图，因为本机 Playwright 自带 Chromium 可执行文件缺失。
- 桌面和移动端均确认 H1、CTA、舞台面板、声景按钮可见。

## 6. 仍未达标的事实

| 缺口 | 当前状态 | 后续必须做 |
| --- | --- | --- |
| 首次进入仪式 | 仍偏介绍页 | 入口要有抵达、选择、世界状态变化 |
| Atlas | 有星图壳 | 需要可探索节点、区域聚焦、关系解释 |
| Timeline | 有时间河壳 | 需要可滚动河道、事件水位、节点回看 |
| Archive | 有书架壳 | 需要真实检索空间、分区、筛选反馈 |
| Paths | 有路线壳 | 需要路线进度、下一站、回地图、完成感 |
| Node | 仍像文章 | 需要地点护照、关系门、阅读房间、出口 |
| Transition | 仍偏提示 | 需要来源残影、目标预告、抵达状态更真实 |
| Lighthouse | 仍浅 | 需要观测站人格、问路、解释、推荐和边界 |
| 音频 / 氛围 | 默认静音正确 | 需要可选、轻量、授权清楚的场景声景 |

## 7. 新完成定义

后续不得再用以下条件宣称完成：

- 文档存在。
- 脚本通过。
- 有统一壳。
- 有一层淡入动效。
- 截图没有白屏。

必须同时满足：

- 截图和录屏能证明场景主体在首屏或第一交互内出现。
- 每个场景有不同交互语法。
- 页面之间不是简单跳转，而有迁移叙事。
- 内容节点像世界地点，不只是文章详情。
- 桌面、移动端、reduced-motion、reduced-sensory 均可用。
- 质量门禁通过且没有旧构建、旧截图、旧报告误判。

