# WorldOS 真格世界调研、文档与执行计划

> [!IMPORTANT]
> 本文档是 2026-07-10 后的开发入口。它把外部调研、目标修正、文档清单、质量要求和执行阶段收束到一起，用于避免后续再次停留在“骨架 + 简单动态”。

## 1. 调研摘要

本轮调研结论：

- 世界体验不应靠重型 3D 一步到位，应先把场景主体、叙事转场、内容事实源和质量证据做实。
- 动效必须尊重 reduced-motion，并为用户提供替代体验。
- 音频必须默认静音、用户主动触发、可停、可降级。
- 可视化应从 SVG / Canvas / CSS 开始，只有在节点布局或交互复杂度证明必要时才引入 D3 等库。
- Next.js 现有能力足够支撑本地 / LAN 阶段，不应为“宇宙感”引入过早平台复杂度。

## 2. 外部资料与可借鉴点

| 资料 | 可借鉴点 | WorldOS 采用方式 |
| --- | --- | --- |
| MDN `prefers-reduced-motion` | 动效必须响应用户降低运动偏好 | 所有场景编舞必须有 reduced-motion 分支 |
| MDN Web Audio API best practices | Web 音频应考虑浏览器策略和用户控制 | 声景默认静音，点击后短声提示，不自动播放 |
| Next.js Image Optimization | 图片尺寸、懒加载、稳定布局 | 资产进入世界前必须有尺寸、授权、预算 |
| GSAP `matchMedia` | 同一动效按媒体条件分支 | 桌面、移动、reduced-motion 使用同一编舞注册点 |
| D3 force | 关系图可用力导向模型 | Atlas 大规模节点时作为候选，不默认引入 |
| Observable Framework | 数据叙事和可解释交互 | 借鉴“数据驱动叙事”，不迁移框架 |
| React Three Fiber | React 生态 3D 能力 | 只作为后期局部增强候选，当前不做核心 |
| Mapbox GL JS examples | 地图交互和 hover 状态思路 | 只借鉴交互模式，不引入地理地图依赖 |

来源：

- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices
- https://nextjs.org/docs/app/getting-started/images
- https://gsap.com/docs/v3/GSAP/gsap.matchMedia/
- https://d3js.org/d3-force
- https://observablehq.com/framework/
- https://r3f.docs.pmnd.rs/getting-started/introduction
- https://docs.mapbox.com/help/tutorials/create-interactive-hover-effects-with-mapbox-gl-js/

## 3. 文档清单

### 3.1 2026-07-10 新增必读文档

| 文档 | 用途 | 何时使用 |
| --- | --- | --- |
| `docs/00-overview/worldos-real-visual-audit-record-2026-07-10.md` | 记录真实截图审查、已修复项、仍未达标项 | 任意阶段开始前先读 |
| `docs/00-overview/worldos-true-world-realization-gap-analysis-2026-07-10.md` | 定义“舞台壳”和“真实世界”的差距 | 制定阶段计划时读 |
| `docs/00-overview/worldos-true-world-global-standard-2026-07-10.md` | 全局规范和硬性完成定义 | 开发、验收、提交前读 |
| `docs/00-overview/worldos-true-world-research-documentation-and-execution-plan-2026-07-10.md` | 调研、文档和执行计划入口 | Goal / 长任务启动时读 |

### 3.2 既有总控文档继续有效

| 文档 | 用途 |
| --- | --- |
| `docs/00-overview/worldos-complete-goal-mode-document-pack-2026-07-09.md` | Goal 文档总入口 |
| `docs/00-overview/worldos-one-shot-goal-master-prompt-2026-07-09.md` | 一次性 Goal 总提示词 |
| `docs/00-overview/worldos-one-shot-goal-execution-ledger-2026-07-09.md` | 长任务执行账本 |
| `docs/00-overview/worldos-quality-control-system-2026-07-09.md` | 质量门禁 |
| `docs/00-overview/worldos-human-experience-review-rubric-2026-07-09.md` | 人工体验量表 |
| `docs/00-overview/worldos-performance-asset-budget-2026-07-09.md` | 性能与资产预算 |
| `docs/00-overview/worldos-tech-stack-and-open-source-research-2026-07-09.md` | 技术栈与开源工具策略 |

### 3.3 场景开发专项文档

| 阶段 | 必读文档 |
| --- | --- |
| Home | `worldos-home-world-gateway-spec-2026-07-09.md`、`worldos-m8-world-gateway-main-stage-execution-plan-2026-07-09.md` |
| Atlas / Timeline / Archive / Paths | `worldos-scene-production-matrix-2026-07-09.md`、`worldos-m9-core-scene-stage-execution-plan-2026-07-09.md` |
| Node | `worldos-node-place-reading-spec-2026-07-09.md`、`worldos-m10-node-place-immersive-reading-execution-plan-2026-07-09.md` |
| Transition | `worldos-transition-choreography-spec-2026-07-09.md`、`worldos-m11-narrative-scene-transition-execution-plan-2026-07-09.md` |
| Lighthouse | `worldos-lighthouse-observatory-spec-2026-07-09.md`、`worldos-m12-lighthouse-guidance-experience-execution-plan-2026-07-09.md` |
| Sensory / Audio | `worldos-atmosphere-sensory-system-spec-2026-07-09.md`、`worldos-audio-music-governance-spec-2026-07-09.md`、`worldos-m13-sensory-audio-asset-production-execution-plan-2026-07-09.md` |
| AI | `ADR-0003-ai-as-lighthouse.md`、`worldos-ai-lighthouse-runtime-spec-2026-07-09.md`、`worldos-m14-ai-lighthouse-operationalization-execution-plan-2026-07-09.md` |
| Content | `worldos-content-life-runtime-contract-2026-07-09.md`、`worldos-scene-data-contract-2026-07-09.md`、`worldos-m15-content-world-production-execution-plan-2026-07-09.md` |

## 4. 执行阶段

### Phase A：证据化重启

目标：停止自证式完成。

具体项：

- 每个核心页面建立 baseline 截图。
- 记录“像骨架”的具体原因。
- 每次修复后生成 before / after 对比。
- 让人工量表成为否决项。

完成标准：

- 截图证据能定位到页面和问题。
- 报告里既写通过项，也写未达标项。

### Phase B：入口真实化

目标：首页第一眼像进入世界。

具体项：

- 首访仪式和再访状态分开。
- 入口不是介绍，而是选择方向。
- 世界状态、灯塔状态、下一站可感知。
- 移动端首屏不得被控件遮挡。

完成标准：

- 首页截图不再像普通博客首页。
- 用户不懂项目背景也能选择下一步。

### Phase C：四大场景主体化

目标：Atlas / Timeline / Archive / Paths 不再同构。

具体项：

- Atlas 做可探索星图。
- Timeline 做可回看的时间河。
- Archive 做检索大厅。
- Paths 做可行走旅程。

完成标准：

- 遮掉文案后仍能区分四个场景。
- 每个场景都有独特交互。

### Phase D：Node 地点化

目标：内容节点从文章变成地点。

具体项：

- 节点护照。
- 所属区域。
- 关系门。
- 下一站。
- 返回地图 / 档案馆 / 路径。

完成标准：

- 用户感觉进入了一个节点房间，而不是打开文章详情。

### Phase E：迁移叙事化

目标：页面跳转变成场景迁移。

具体项：

- 来源残影。
- 目标预告。
- 抵达状态。
- 迁移后沉淀提示。
- reduced-motion 替代。

完成标准：

- 用户知道自己从哪里来、到哪里去、为什么到这里。

### Phase F：感官、音频与灯塔

目标：氛围、声景和灯塔成为可感知但不打扰的系统。

具体项：

- 声景 opt-in。
- 场景短提示音。
- 灯塔只读问路。
- AI 服务端边界。
- 失败回退。

完成标准：

- 默认不响。
- 没有前端 AI key。
- AI 不修改世界事实。

### Phase G：内容生命与长期运行

目标：世界里真的有东西可逛。

具体项：

- 补强节点、区域、关系、时间、路径。
- 同一事实源被 Atlas、Timeline、Archive、Paths、Node、Lighthouse 复用。
- 作者可用中文低门槛维护。

完成标准：

- 内容不是孤立文章。
- 每条路径能带用户继续走。

## 5. 质量计划

每阶段必须运行：

```bash
npm run typecheck
npm run lint
npm run build:production-ci
npm run check:mainline
```

阶段完成或大范围改动后运行：

```bash
npm run release:local-rc
```

浏览器验证必须包含：

- desktop 首页 / Atlas / Timeline / Archive / Paths / Node / Ask。
- mobile 首页 / Atlas / Timeline / Archive / Paths。
- reduced-motion。
- 声景默认静音。
- 权限边界和 AI key 扫描。

## 6. 开发纪律

- 一次只重做一个场景主体，避免全局大改失控。
- 公共壳只放导航、运行时、迁移、降级，不放场景主体逻辑。
- 新视觉必须绑定数据事实源。
- 新依赖必须有 ADR、预算、原型收益和降级方案。
- 任何“通过”都必须能被截图、录屏或命令复查。
- 如果仍像骨架，不能标记完成。

## 7. 更新 Goal 提示词时必须加入的句子

```text
必须先读取 docs/00-overview/worldos-real-visual-audit-record-2026-07-10.md、docs/00-overview/worldos-true-world-realization-gap-analysis-2026-07-10.md、docs/00-overview/worldos-true-world-global-standard-2026-07-10.md、docs/00-overview/worldos-true-world-research-documentation-and-execution-plan-2026-07-10.md。不要再用脚本通过或统一壳存在来宣称完成；每个阶段必须以真实截图、必要录屏、人工体验量表和生产态检查共同证明不再像骨架。
```

