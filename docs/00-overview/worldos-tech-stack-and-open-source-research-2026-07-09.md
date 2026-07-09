# WorldOS 技术栈与开源调研

> [!NOTE]
> 本文档基于 2026-07-09 的本地项目基线与联网调研。目标不是“列更多库”，而是确定哪些技术能帮助 WorldOS 从博客骨架走向世界体验，同时控制体积、性能和维护成本。

## 1. 当前基线

项目当前已经具备较完整的前端与质量基线：

- Next.js 15、React 19、TypeScript、Tailwind CSS。
- GSAP、Framer Motion / Motion 风格能力。
- Playwright、lint、build、strict check、本地 RC 相关脚本。
- Zod、JSON / Markdown 内容契约。
- 以本地与 LAN 访问为当前目标，暂不考虑外部 Preview / Production。

结论：当前栈可以继续作为核心，不需要为了“宇宙感”整体推翻。

## 2. 技术选型原则

| 原则 | 含义 |
| --- | --- |
| 先轻后重 | CSS / SVG / Canvas 能完成时，不先上全站 3D |
| 按场景引入 | 每个新依赖必须绑定具体场景收益 |
| 静态优先 | 动态失败时仍能阅读核心内容 |
| 单事实源 | 静态页、动态场景、AI 只读导览共享内容事实源 |
| 可降级 | 所有动效尊重 reduced-motion |
| 可验收 | 工具必须能被本地脚本、截图或人工 QA 验证 |

## 3. 推荐保留的核心栈

| 技术 | 用途 | 结论 | 来源 |
| --- | --- | --- | --- |
| Next.js App Router | 路由、布局、静态 / 动态渲染组织 | 保留核心框架 | [Next.js Docs](https://nextjs.org/docs) |
| React | 组件模型与状态表达 | 保留 | [React Docs](https://react.dev/) |
| TypeScript | 内容模型、场景契约、检查脚本 | 保留 | [TypeScript Docs](https://www.typescriptlang.org/docs/) |
| Tailwind CSS | 轻量样式系统、响应式、motion-safe / motion-reduce | 保留 | [Tailwind CSS Docs](https://tailwindcss.com/docs) |
| GSAP | 编排首次进入、场景迁移、复杂时间线 | 保留，并作为场景级动效主力 | [GSAP Docs](https://gsap.com/docs/v3/) |
| Motion / Framer Motion | React presence、局部入场、状态切换 | 保留，但避免与 GSAP 重复编排 | [Motion Docs](https://motion.dev/docs) |
| Playwright | 本地浏览器 smoke、截图、视觉检查 | 保留并加强 | [Playwright Docs](https://playwright.dev/docs/intro) |

## 4. 候选工具评估

| 方向 | 工具 | 适合场景 | 引入条件 | 风险 |
| --- | --- | --- | --- | --- |
| 2D 世界舞台 | PixiJS | Home / Atlas 的轻量粒子、层级地图、Canvas 舞台 | CSS / SVG 无法稳定表达持续动画时 | 增加运行时体积，需要降级方案 |
| 3D 世界 | Three.js | 真 3D 星域、空间漫游、WebGL 场景 | 某个场景必须 3D 才成立 | 维护与性能成本高 |
| React 3D | React Three Fiber | React 组件化 Three.js 场景 | 已决定引入 Three.js 且需要 React 管理 | 依赖复杂度上升 |
| 图谱力导向 | D3 Force | Atlas 节点关系、时间河布局辅助 | 节点关系需要物理布局 | 需要控制布局稳定性 |
| 大规模图谱 | Sigma.js | WebGL 图谱、较多节点关系探索 | Atlas 节点量明显变大 | 视觉容易变成技术图谱 |
| 网络分析图 | Cytoscape.js | 复杂关系网络、布局算法、交互图谱 | 需要图分析能力 | 可能偏工程工具感 |
| 流程 / 节点编辑 | React Flow | 后台编排、路径编辑器、AI 工作台 | 后续做编辑后台时 | 不适合当前公开世界主视觉 |
| 状态机 | XState | 首访仪式、场景迁移、可中断流程 | 转场状态超过简单注册表可控范围 | 学习与模型成本 |
| 可访问性 | axe-core | a11y 自动检查 | 质量门禁需要无障碍扫描时 | 需要处理误报和规则解释 |
| 组件文档 | Storybook | 场景组件单独开发与回归 | 组件库稳定后 | 配置与维护成本 |
| 性能 CI | Lighthouse CI | 性能预算、Lighthouse 报告 | 需要固定性能报告时 | 本地波动，需要阈值设计 |
| 音频播放 | Web Audio API / HTMLAudio | 场景环境音、提示音、可选音乐 | 先用原生能力试点 | 浏览器自动播放限制与无障碍 |
| 音频库 | Howler.js | 多格式音频、循环、音量、sprite | 原生播放管理变复杂时 | 需控制资源体积 |
| 生成式声景 | Tone.js | 程序化音乐、氛围音、交互声景 | 明确需要生成式音频时 | 学习成本与音频设计成本 |
| AI Provider | OpenAI Responses API 等服务端适配 | 灯塔问路、解释、推荐、总结 | 服务端权限、上下文裁剪和审计成熟后 | Key、成本、延迟、隐私边界 |

## 5. 重点工具来源与判断

### GSAP

GSAP 适合做复杂时间线和场景迁移。官方提供 `gsap.matchMedia()`，可按媒体查询组织响应式和 reduced-motion 动画。  
来源：[GSAP Docs](https://gsap.com/docs/v3/)、[gsap.matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/)

判断：继续作为世界体验主编排工具，但必须统一封装，避免每个页面写一次性动画。

### Motion / AnimatePresence

Motion 适合 React 场景中的 presence、组件进出和轻量状态动画。  
来源：[Motion Docs](https://motion.dev/docs)

判断：用于局部 UI 与路由壳，不负责复杂世界编舞。

### View Transition API

浏览器原生 View Transition API 可用于跨状态视觉过渡，但兼容性与框架集成需要谨慎评估。  
来源：[MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)

判断：作为未来轻量化方向观察，不作为当前核心依赖。

### PixiJS

PixiJS 是成熟 2D WebGL / Canvas 渲染器，适合做高性能 2D 场景。  
来源：[PixiJS Docs](https://pixijs.com/)

判断：如果 Atlas / Home 需要持续动态舞台，PixiJS 比全站 Three.js 更轻、更贴合 2D 世界。

### Three.js / React Three Fiber

Three.js 是成熟 WebGL 3D 库，React Three Fiber 是 React renderer。  
来源：[Three.js](https://threejs.org/)、[React Three Fiber Docs](https://r3f.docs.pmnd.rs/)

判断：只在“真 3D 是场景成立条件”时引入；当前不建议全站 3D 化。

### D3 Force

D3 Force 适合模拟节点之间的力导向关系。  
来源：[D3 Force](https://d3js.org/d3-force)

判断：Atlas 关系网络优先候选，适合把内容关系从列表变为空间结构。

### Sigma.js / Cytoscape.js

Sigma.js 面向 WebGL 图谱展示，Cytoscape.js 面向网络图分析与布局。  
来源：[Sigma.js Docs](https://www.sigmajs.org/)、[Cytoscape.js Docs](https://js.cytoscape.org/)

判断：当内容节点和关系规模扩大后再引入；当前阶段先用轻量 SVG / D3。

### XState

XState 用于状态机、状态图和 actor 模型。  
来源：[XState Docs](https://stately.ai/docs)

判断：当首访仪式、场景迁移、跳过、恢复、降级等状态复杂化后再引入。

### Playwright

Playwright 支持浏览器自动化、截图和视觉比较。  
来源：[Playwright Docs](https://playwright.dev/docs/intro)、[Visual comparisons](https://playwright.dev/docs/test-snapshots)

判断：继续作为本地 RC 浏览器证据核心。

### Lighthouse CI

Lighthouse CI 可用于性能与质量报告自动化。  
来源：[Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

判断：本地阶段可作为可选报告，避免将波动指标变成噪声门禁。

### axe-core

axe-core 是常用无障碍测试引擎。  
来源：[axe-core GitHub](https://github.com/dequelabs/axe-core)

判断：后续可作为质量门禁补充，尤其是中文阅读、对比度、焦点顺序稳定后。

### Storybook

Storybook 支持组件文档、交互测试和视觉测试工作流。  
来源：[Storybook Docs](https://storybook.js.org/docs)

判断：当场景组件稳定并需要独立演练时引入；当前不应先建重型组件实验室。

### Web Audio / Howler.js / Tone.js

浏览器原生 Web Audio API 适合先做基础声音控制；Howler.js 适合管理多格式音频与循环播放；Tone.js 更适合程序化音乐和生成式声景。
来源：[MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)、[howler.js](https://github.com/goldfire/howler.js)、[Tone.js](https://tonejs.github.io/)

判断：音频 / 音乐应成为独立规格，不应默认全站自动播放。先做 opt-in、静音、音量、按场景懒加载和 reduced-sensory，再决定是否引入音频库。

### AI Provider

AI 灯塔如果要从 dry-run 进入真实运行，需要服务端 Provider adapter、上下文裁剪、流式输出、结构化输出、缓存、限流和审计。
来源：[OpenAI Responses API](https://platform.openai.com/docs/guides/responses)、[OpenAI Prompt Caching](https://platform.openai.com/docs/guides/prompt-caching)、[OpenAI Safety Best Practices](https://developers.openai.com/api/docs/guides/safety-best-practices)

判断：AI 能力不应由前端拼接上下文和权限。真实 Provider 必须服务端运行，默认只读公开事实源，并有静态推荐回退。

## 6. 推荐路线

### 当前阶段

不新增运行时依赖。先完成：

- 世界体验总控。
- 场景制作矩阵。
- 质量把控体系。
- 现有 GSAP / Motion / CSS / SVG 能力收束。

### 下一阶段

按场景试点，而不是全站引入：

1. Atlas 先用 SVG / CSS / GSAP 表达地图化。
2. 如果关系布局不足，引入 D3 Force。
3. 如果持续动态舞台不足，引入 PixiJS。
4. 如果明确需要真 3D，再评估 Three.js / React Three Fiber。
5. 如果转场状态复杂，评估 XState。
6. 如果场景氛围需要声音，先用 Web Audio / HTMLAudio 做 opt-in 试点。
7. 如果灯塔 AI 要真实运行，先补服务端 Provider adapter 与审计规格。

## 7. 明确不建议

- 不建议立刻引入全站 Three.js / R3F。
- 不建议为了“高级感”堆 WebGL 背景。
- 不建议同时使用多套动画主控系统。
- 不建议把 React Flow 用作公开世界地图。
- 不建议引入外部云端视觉回归服务，当前本地 / LAN 阶段用 Playwright 证据更稳。
- 不建议默认开启背景音乐或自动播放声音。
- 不建议在前端直接接入真实 AI Provider Key 或拼接权限上下文。

## 8. 决策结论

WorldOS 现在最缺的不是库，而是“世界生产规格”。  

技术栈策略应是：

**现有栈继续承担主干；GSAP 负责场景编舞；Playwright 负责真实证据；Web Audio、D3、PixiJS、Three.js、XState、AI Provider 只在场景生产矩阵和运行规格证明必要时逐个引入。**
