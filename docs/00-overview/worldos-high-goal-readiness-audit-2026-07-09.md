# WorldOS 高目标充分性审计

> [!IMPORTANT]
> 本文档回答一个更高层问题：现有目标、文档和技术栈，是否足以让 WorldOS 真正成为可运行的个人数字世界，而不只是带动态效果的博客。

## 1. 总判断

结论：**方向正确，但还不够完整；目标需要继续抬高，文档需要从“治理层”进入“生产层”，技术栈需要按需补齐音频、场景运行、AI 运行和质量观测能力。**

> [!NOTE]
> 2026-07-09 更新：本文指出的开发前文档缺口已经通过 `worldos-predevelopment-document-completion-index-2026-07-09.md` 补齐。后续应以 `worldos-controlled-execution-plan-2026-07-09.md` 作为开发入口。

现有文档已经能防止继续把项目做成普通博客，也能约束“不要为宇宙感盲目堆库”。但如果把“所有场景、切换、特效、氛围、音频 / 音乐、灯塔 AI 正常高效运作”视为基础目标，那么当前文档还不能直接指导实现。

当前状态应定义为：

| 维度 | 判断 |
| --- | --- |
| 方向 | 对，已经从博客思维转向世界体验思维 |
| 目标高度 | 需要再抬一层，从“像世界”升级为“可运行的世界系统” |
| 文档充分性 | 治理层够，生产层不足 |
| 技术栈充分性 | 主干够，感官层 / AI 运行层 / 场景状态层需按需补齐 |
| 臃肿风险 | 可控，但前提是坚持按场景引入、按需加载、预算门禁 |

## 2. 更高目标定义

WorldOS 的高目标不应只是：

> 一个有动态效果、有地图、有时间线、有 AI 灯塔的个人博客。

而应是：

> 一个本地 / 局域网可运行的个人数字世界运行时：它有静态可靠性、动态场景、空间迁移、内容生命、感官氛围、只读 AI 灯塔、权限边界、质量门禁和长期演化能力。

## 3. 基础目标重定义

以下不再是“高级增强”，而是基础目标：

| 基础目标 | 必须达到的状态 |
| --- | --- |
| 场景 | Home、Atlas、Timeline、Archive、Paths、Node、Lighthouse 都有明确空间人格 |
| 切换 | 路由切换是场景迁移，不只是 fade / slide |
| 特效 | 特效服务叙事语义，不做装饰噪声 |
| 氛围 | 有时间、季节、场景、AI 状态驱动的环境层 |
| 音频 / 音乐 | 可选、可静音、可降级、无自动扰民、能增强场景 |
| 灯塔 AI | 服务端边界、公开事实源、只读推荐、流式反馈、审计与回退 |
| 内容生命 | 节点、区域、关系、路径、时间和档案共享同一事实源 |
| 性能 | 动态世界按需加载，不拖垮静态阅读 |
| QA | 本地 / LAN 可复现，浏览器证据、体验证据、权限证据齐全 |

## 4. 现有文档是否够

不够。原因不是已有文档写错，而是它们处在不同层级。

| 文档层级 | 当前状态 | 是否足够 |
| --- | --- | --- |
| 总控目标 | 已有世界体验总控 | 基本够 |
| 质量治理 | 已有质量把控体系 | 基本够，但需补音频 / AI / 氛围门禁 |
| 技术调研 | 已有技术栈调研 | 方向对，但需补音频、AI 运行、资产管线 |
| 场景生产 | 仅列为待补 | 不够 |
| 转场编舞 | 仅列为待补 | 不够 |
| 感官氛围 | 有 ambient 基础代码，但缺规格文档 | 不够 |
| 音频音乐 | 近乎缺位 | 不够 |
| 灯塔 AI 运行 | 有边界和 dry-run Provider，但缺真实运行规格 | 不够 |
| 资产治理 | 缺视觉 / 音频资产预算、授权、压缩规范 | 不够 |
| 本地运行观测 | 有 RC 基础，但缺体验运行仪表盘规格 | 部分够 |

## 5. 必须补齐的文档

### P0：生产前必须补

| 文档 | 目的 |
| --- | --- |
| `worldos-scene-production-matrix-2026-07-09.md` | 逐场景定义空间隐喻、结构、动态层、内容层、降级和验收 |
| `worldos-transition-choreography-spec-2026-07-09.md` | 定义进入、迁移、抵达、回退、跳过和 reduced-motion 的编舞语法 |
| `worldos-atmosphere-sensory-system-spec-2026-07-09.md` | 定义时间、季节、天气感、光线、粒子、背景、声音状态的统一环境层 |
| `worldos-ai-lighthouse-runtime-spec-2026-07-09.md` | 定义 AI 灯塔真实运行、上下文裁剪、流式输出、缓存、审计和回退 |
| `worldos-performance-asset-budget-2026-07-09.md` | 定义 JS、图片、音频、Canvas / WebGL、AI 请求的预算和门禁 |

### P1：第一轮场景实现前补

| 文档 | 目的 |
| --- | --- |
| `worldos-audio-music-governance-spec-2026-07-09.md` | 定义音频 / 音乐的授权、播放策略、静音、音量、循环、性能和无障碍 |
| `worldos-content-life-runtime-contract-2026-07-09.md` | 定义内容节点如何被 Atlas、Timeline、Archive、Paths、AI 共同吸收 |
| `worldos-world-runtime-state-machine-spec-2026-07-09.md` | 定义首访、场景、转场、音频、AI、降级状态的状态机 |
| `worldos-local-lan-observability-spec-2026-07-09.md` | 定义本地 / LAN 运行日志、错误面板、体验状态和 RC 证据 |

### P2：规模化前补

| 文档 | 目的 |
| --- | --- |
| `worldos-asset-pipeline-and-licensing-spec-2026-07-09.md` | 管理图片、动效、音频、字体、授权和压缩 |
| `worldos-scene-component-api-spec-2026-07-09.md` | 定义场景组件 API，避免重复造组件 |
| `worldos-human-experience-review-rubric-2026-07-09.md` | 定义人工体验验收，不再只看命令是否通过 |

## 6. 技术栈是否足够

### 6.1 当前主干足够承担骨架和第一阶段世界化

保留：

- Next.js / React / TypeScript / Tailwind CSS。
- GSAP 作为场景编舞主力。
- Motion 用于 React 局部 presence。
- Playwright 用于真实浏览器证据。
- Zod / JSON / Markdown 作为内容事实源基础。

来源参考：

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [GSAP Docs](https://gsap.com/docs/v3/)
- [Motion Docs](https://motion.dev/docs)
- [Playwright Docs](https://playwright.dev/docs/intro)

### 6.2 音频 / 音乐需要补独立策略

首选策略：

1. 先用浏览器原生 Web Audio API / HTMLAudio 能力。
2. 简单音效和环境循环可评估 Howler.js。
3. 生成式音乐或程序化声景再评估 Tone.js。

重要约束：

- 不自动播放扰民音频。
- 必须有全局静音、音量、关闭记忆。
- 音频必须按场景懒加载。
- reduced-motion 应扩展为 reduced-sensory，照顾声音敏感用户。

来源参考：

- [MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Tone.js Docs](https://tonejs.github.io/)
- [howler.js GitHub](https://github.com/goldfire/howler.js)
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

### 6.3 场景渲染按需补，不全站 3D

推荐顺序：

1. CSS / SVG / GSAP：首选，最轻。
2. D3 Force：Atlas 关系布局需要物理关系时引入。
3. PixiJS：Home / Atlas 需要持续 2D 动态舞台时引入。
4. Three.js / React Three Fiber：只有真 3D 是场景成立条件时引入。
5. Rive / Lottie / Theatre.js：只在具体资产制作链路成熟后评估。

来源参考：

- [D3 Force](https://d3js.org/d3-force)
- [PixiJS](https://pixijs.com/)
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://r3f.docs.pmnd.rs/)
- [Rive Web Runtime](https://rive.app/docs/runtimes/web/web-js)
- [Lottie Web](https://github.com/airbnb/lottie-web)
- [Theatre.js Docs](https://www.theatrejs.com/docs)

### 6.4 AI 灯塔需要从 dry-run 升级为运行时规格

当前项目里的 `src/server/ai/provider.ts` 明确是真实 Provider 未启用的 `disabled-dry-run`。这很好，因为它守住了边界；但要让 AI 正常高效运作，必须补：

- 服务端 Provider adapter。
- 上下文裁剪与公开事实源检索。
- 私密 / vault / sealed 排除策略。
- 流式输出。
- 结构化输出。
- 请求缓存与限流。
- 审计日志与人工确认。
- Provider 不可用时的静态推荐回退。

来源参考：

- [OpenAI Responses API](https://platform.openai.com/docs/guides/responses)
- [OpenAI Prompt Caching](https://platform.openai.com/docs/guides/prompt-caching)
- [OpenAI Safety Best Practices](https://developers.openai.com/api/docs/guides/safety-best-practices)

## 7. 是否会臃肿

不会臃肿的前提是坚持以下纪律：

| 纪律 | 说明 |
| --- | --- |
| 一场景一理由 | 每个新库必须绑定具体场景收益 |
| 一能力一预算 | JS、图片、音频、AI 请求都要有预算 |
| 一体验一降级 | 动效、音频、WebGL、AI 都必须有关闭和降级 |
| 一事实源多投影 | 不建立静态和动态两套内容 |
| 一入口一证据 | 本地 / LAN RC 必须能证明真实运行 |
| 先原生再依赖 | Web API 能满足时，不先加库 |
| 先 2D 再 3D | 不用 3D 证明世界感 |

臃肿会发生在这些情况：

- 全站引入 Three.js / R3F，但只有背景星点在用。
- 同时使用 GSAP、Motion、Theatre.js、View Transition API 争夺主控。
- 音频库、图谱库、3D 库一次性全部加入。
- AI 在前端拼权限和上下文。
- 每个场景各写一套组件、状态和动画。

## 8. 方向是否准确

方向准确，但需要升级表达。

旧表达：

> 从博客走向动态世界。

新表达：

> 从内容网站走向本地可运行的个人数字世界运行时。

这意味着后续不是单纯美化页面，而是建设：

- 场景运行时。
- 感官氛围层。
- 内容生命层。
- AI 灯塔运行层。
- 本地 / LAN 质量观测层。

## 9. 建议的下一步

不要马上开发。下一步先补 P0 文档，顺序如下：

1. 场景制作矩阵。
2. 转场编舞规范。
3. 氛围与感官系统规格。
4. AI 灯塔运行规格。
5. 性能与资产预算。

这些文档完成后，再进入第一轮实现：

1. Home 世界入口。
2. Atlas 世界地图。
3. 场景迁移升级。
4. 氛围层接入。
5. 音频 opt-in 试点。
6. 灯塔 AI server-only 试点。

## 10. 最终判断

如果只问“现在的文档能不能指导继续开发”，答案是：**能，但只能指导下一步，不足以指导完整真格世界。**

如果问“要让所有场景、切换、特效、氛围、音频、灯塔 AI 都真正实现和运行，文档是否够”，答案是：**还不够。必须补生产矩阵、编舞规范、感官系统、音频治理、AI 运行、性能资产预算和本地观测。**

如果问“现有技术栈是否要推翻”，答案是：**不用推翻。主干正确，真正要做的是按场景补薄层能力，严控依赖和预算。**
