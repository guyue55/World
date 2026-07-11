# WorldOS 生命世界调研与标杆对比

> [!WARNING]
> 本文档是按需读取的研究来源，不是完成标准或执行入口。技术候选、当前事实与取舍由 `worldos-meta-control-contract-2026-07-11.md` 和架构数据契约裁决；新证据可以推翻本文推断。

> 状态：研究完成，技术选型仍受战略总控与后续 ADR 约束
> 日期：2026-07-11
> 方法：本地代码真相 + 官方文档 / 项目一手资料 + 明确标注的项目推断

## 1. 调研问题

本轮不是寻找“最炫框架”，而是回答：

1. 如何让网页世界持续运行，又不把 React 和主线程拖垮？
2. 如何让昼夜、四季、河流、星光、灯塔、音频和迁移形成同一个世界，而不是效果拼盘？
3. 何时继续使用 SVG / Canvas / GSAP，何时才值得引入 PixiJS、Three.js、Sigma、XState、Howler 或 Tone？
4. 如何保证无 JS、reduced-motion、移动端和静音状态仍完整？
5. 如何让 200 个节点继续增长，而不是现在就预装数据库和通用引擎？
6. 如何让 AI 灯塔正常高效运作，又不成为事实源和权限漏洞？
7. 如何避免项目继续被历史文档、脚本和自证报告淹没？

## 2. 本地事实

以下是代码证据，不是计划推断：

| 事实 | 证据 | 含义 |
| --- | --- | --- |
| 日夜和季节只在首次挂载计算 | `src/components/world/WorldRuntimeProvider.tsx:93` | 当前访问过程中不会持续推进 |
| 时间模型只有时段和月份映射 | `src/lib/runtime/time-context.ts:1` | 缺少连续进度、时区配置、恢复和预览契约 |
| WorldShell 只挂载运行时、Chrome 和转场壳 | `src/components/world/WorldShell.tsx:5` | 没有统一 ambient scheduler 或场景生命层 |
| Atlas 主体是静态 picture + 交互时 GSAP | `src/components/atlas/AtlasExplorationStage.tsx:21` | 有空间交互，无持续星图生命 |
| Timeline 主体是静态 picture + 事件切换动画 | `src/components/timeline/TimelineRiverStage.tsx:28` | 有河流构图，河流本身并未持续流动 |
| Lighthouse 有循环扫光 | `src/components/ask/LighthouseGuideStage.tsx:45` | 已有真实持续动效样板，但尚未纳入统一调度 |
| 当前所有场景图约 2.6 MB | `public/world/scenes` | 位图预算可控，但继续倍增会失控 |
| 当前没有音频文件 | `public` 资产扫描 | 声景是程序化振荡音，尚非完整音乐/环境音体系 |
| 运行依赖只有 14 个 | `package.json` | 不需要以“减依赖”为主线重构 |
| 文档 1480、脚本 854、npm 命令 301 | 仓库扫描 | 主要复杂度在治理面和历史面 |
| 276 个 npm 直接文件引用中 78 个目标不存在 | `package.json` 与文件系统只读扫描 | 命令治理检查没有覆盖实际可执行性 |

`npm run kernel:report` 已真实失败于缺少 `scripts/print-world-kernel-report.ts`，同时 `npm run check:worldos-script-taxonomy` 仍通过。这证明现有门禁能验证分类数据，却不能证明命令本身可运行；下一轮质量收束必须加入主命令存在性与实际执行抽样，但本轮不顺手修改实现。

## 3. 浏览器运行与性能

### 3.1 连续动画

[MDN `requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) 明确说明：回调通常随屏幕刷新率运行，在后台标签页会暂停；动画必须使用回调时间戳，否则高刷新率屏幕会跑得更快。

[GSAP ticker](https://gsap.com/docs/v3/GSAP/gsap.ticker/) 同样基于 `requestAnimationFrame`，提供 `deltaTime`、`deltaRatio()`、lag smoothing 和监听器移除。它适合统一环境心跳，但不应把所有场景永久挂在全局 ticker 上。

[Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) 提供 `visibilitychange`，浏览器也会节流后台计时器。生命世界必须在隐藏时主动停掉视觉、音频和非必要计算，恢复时从真实时间重新派生状态，而不是补跑丢失帧。

**项目决策：**

- 语义时钟使用低频逻辑 tick；连续视觉使用单一调度器。
- 每帧状态不进入 React state。
- 当前场景注册环境适配器，离场即销毁。
- hidden 时暂停，visible 时重新计算，不追帧。

### 3.2 渲染成本

[web.dev Rendering Performance](https://web.dev/articles/rendering-performance) 将一帧拆为 style、layout、paint、composite，并指出 60Hz 下实际可用工作时间通常低于 16.7ms；高频动画应尽量停留在 composite 路径。

[web.dev Animations and Performance](https://web.dev/articles/animations-and-performance) 建议优先 `transform` 和 `opacity`，并警告不要滥用 `will-change`。

[Long Animation Frames API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Long_animation_frame_timing) 能观测超过 50ms 的长动画帧并定位脚本来源，但兼容性有限，因此只作 Chrome 本地诊断，不能成为唯一门禁。

[OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) 可把 Canvas 绘制移到 Worker，适合主线程确实被大量绘制拖慢后的升级，不适合在对象很少时预装。

**项目决策：**

- DOM / SVG 先完成语义和可访问交互。
- Canvas 只承担高频装饰绘制或高密度投影，DOM 仍保留等价操作层。
- Worker / OffscreenCanvas 只在 trace 证明主线程绘制越界后进入 ADR。

## 4. 动效、转场与可访问性

[GSAP `matchMedia()`](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/) 会自动记录并恢复不同 media query 下创建的动画，适合统一 desktop、mobile 和 reduced-motion；自建监听器仍必须在 cleanup 中移除。

[GSAP `context()`](https://gsap.com/docs/v3/GSAP/gsap.context%28%29/) 能集中回收 React 组件内的 tween 和 timeline。现有主线继续采用这一模式，不再引入第二套编舞引擎。

[View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) 可降低视图切换的上下文丢失，但同时存在阅读位置、焦点和 live region 风险；[Next.js 的 React View Transition 集成仍标记 experimental](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition)。

[WCAG 2.2 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) 要求非必要交互动效可关闭；[Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) 对持续超过 5 秒的自动运动要求暂停、停止或隐藏机制。

[WCAG Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements) 要求拖动操作提供单点替代。Atlas、Timeline 和 Paths 的拖动 / 平移必须同时有点击、列表或方向控件。

**项目决策：**

- 现有迁移协议仍是主逻辑，View Transition 只做可跳过增强。
- 全局“静谧”控制同时管持续运动；系统 reduced-motion 自动降级。
- 场景拖动不能成为唯一入口。

## 5. React 与 Next.js 边界

[Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) 建议把 `use client` 下沉到最小交互边界，以减少客户端 JS；[Lazy Loading](https://nextjs.org/docs/app/guides/lazy-loading) 支持延迟加载 Client Components 和库。

[React `useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore) 是订阅 React 外部 store 的官方接口，并支持服务器快照。它适合将世界时钟、偏好和运行信号从巨型 Context 中拆出，但只有在原型证明重渲染问题后才实施完整 store。

**项目决策：**

- 事实与页面骨架继续由 Server Components 生成。
- 场景环境、迁移和声音是小型 Client islands。
- 重型绘制按场景动态加载，不进入共享首屏 bundle。
- 不引入 Redux、Zustand 或 XState 作为默认答案。

## 6. 音频与音乐

[MDN Web Audio Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices) 要求在用户手势内创建或恢复 `AudioContext`，并提供播放、静音和音量控制。

[Howler.js](https://howlerjs.com/) 约 7KB gzip，提供跨浏览器 fallback、fade、loop、audio sprite 和空间音频；[Tone.js](https://tonejs.github.io/) 提供 transport、同步调度、合成器和效果，适合真正的交互音乐系统。

当前 WorldOS 只有一个 ambience group 和短 cue，原生 Web Audio 足够。Howler 只在多文件、codec 和音频 sprite 管理显著复杂时进入；Tone 只在需要同步多声部生成音乐时进入。

资产来源必须逐件登记。优先顺序：

1. 自录、自制或项目内程序化生成。
2. 可核验的 CC0；[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/legalcode.en) 是公共领域贡献工具。
3. CC-BY，完整记录作者、来源、版本和归属。
4. 不使用来源不明、仅写“free”的音频。

[Freesound 官方 FAQ](https://freesound.org/help/faq/) 说明同一平台存在 CC0、CC-BY、CC-BY-NC 和旧 Sampling+，且用户上传仍可能有误，因此平台名称不能代替逐文件授权审查。

## 7. 2D、3D、图谱和动画资产工具

| 候选 | 官方能力 | 适用触发器 | 当前结论 |
| --- | --- | --- | --- |
| SVG | DOM 可访问、适合路径与少量节点；[MDN SVG in HTML](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_in_HTML) | 默认 | 主线采用 |
| Canvas 2D | 连续绘制和大量装饰；[MDN Canvas fallback](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage) 要求替代内容 | SVG 高频绘制越界 | 条件采用 |
| PixiJS | 高性能 2D GPU 渲染；[官方性能指南](https://pixijs.com/8.x/guides/concepts/performance-tips) 仍要求控制场景复杂度和 draw calls | 数百持续 sprite 且 Canvas 原型失败 | 暂缓 |
| Three.js | 场景图、相机、材质、光照和 3D；[官方 Fundamentals](https://threejs.org/manual/en/fundamentals.html) | 深度空间本身承担核心任务 | 当前拒绝全站采用 |
| Sigma / Graphology | WebGL 图谱，面向数千节点与边；[Sigma](https://www.sigmajs.org/docs/)、[Graphology](https://graphology.github.io/) | Atlas 达千级可见节点 | 暂缓 |
| Rive | 编辑器 + 互动状态机 + Canvas runtime；[官方 runtime](https://rive.app/docs/runtimes/web/web-js) | 独立角色 / 图标动画需要设计师工作流 | 不用于世界主舞台 |
| Lottie | 播放预制矢量时间轴；[lottie-web](https://github.com/airbnb/lottie-web) | 少量固定说明动画 | 不用于数据驱动场景 |

**推断：** WorldOS 的核心难题是状态和内容投影，不是缺少一个渲染引擎。先把持续生命语法做对，再用测量决定渲染器。

## 8. 内容、搜索与规模

[Fuse.js](https://www.fusejs.io/) 是零依赖轻量模糊搜索，当前已安装，适合现有数百节点；它不是大型全文检索系统。

[SQLite FTS5](https://www.sqlite.org/fts5.html) 是单文件数据库内的全文搜索虚拟表，适合未来本地内容规模、构建时间或客户端索引超过预算后的服务端升级。

[Sigma.js](https://www.sigmajs.org/docs/) 面向数千节点和边，不代表 200 节点就应采用 WebGL。

[Quartz](https://github.com/jackyzha0/quartz) 展示了 Markdown 事实、静态站点、局部 / 全局图谱和可移植数字花园的组合。可学习“内容先于表现、关系自动投影”，但不迁移框架。

**项目决策：**

- 当前继续 JSON / Markdown + 预计算投影 + Fuse。
- 达到项目定义的规模触发器后，再比较 chunked index、服务端内存索引和 SQLite FTS5。
- 不承诺无限规模；承诺在已测层级内稳定，并有升级路线。

## 9. AI 灯塔

[OpenAI API Key 安全建议](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety) 明确要求请求经后端转发，Key 不进入浏览器或仓库。

[OpenAI Evals / Structured Outputs](https://platform.openai.com/docs/api-reference/evals/run-output-item-object) 支持以 JSON Schema 约束输出和建立评测数据；这与现有 Zod 输出协议相符。

[Ollama](https://github.com/ollama/ollama) 提供本地 REST API；[llama.cpp server](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md) 提供 OpenAI-compatible endpoints、schema-constrained JSON、embedding 和监控端点。两者都是未来本地 Provider 候选，不是当前硬依赖。

**项目决策：**

- 先做 provider-neutral 服务端 adapter，不先安装 SDK。
- 检索优先使用公开事实的图遍历 + 词法搜索；现有规模不需要向量数据库。
- Provider 可选顺序是低光确定性导览、已配置云 Provider、用户明确启用的本地 Provider。
- AI 回答必须返回来源 ID、下一站、不确定性和模式；无来源就拒答或回退。
- AI 不修改内容、权限、路径进度或世界时间。

## 10. 标杆项目

| 项目 | 一手事实 | 借鉴 | 不照搬 |
| --- | --- | --- | --- |
| [Bruno Simon Portfolio](https://bruno-simon.com/) | 单一可驾驶空间，含音频、质量、重置、脱困、移动与触屏控制 | 位置即导航、直接操作、恢复机制、质量档位 | 全站 3D、物理和高资产成本 |
| [NASA Eyes](https://science.nasa.gov/eyes/) | 用真实 NASA 数据构成可自由漫游、可快进回放的实时 3D 体验 | 数据本身成为世界、时间可操作、故事与自由探索并存 | 科学级 3D 和海量模型 |
| [Radio Garden](https://radio.garden/settings/radio-garden) | 旋转一个主空间对象探索地点，声音与位置绑定 | 一个主体承担主要任务、声音有空间归属 | 全球地图和持续直播基础设施 |
| [Museum of the World](https://experiments.withgoogle.com/the-museum-of-the-world) | 藏品映射到时间、洲和文化，可跨时空建立连接并听策展解说 | 时间、关系、内容和解说统一 | 固定展品数据和一次性实验站形态 |
| [Quartz](https://github.com/jackyzha0/quartz) | Markdown 转静态数字花园，关系图自动生成 | 内容可移植、静态优先、关系自动投影 | 替换现有 Next.js 与 World Kernel |
| [ink](https://www.inklestudios.com/ink/) | 文本优先、开源、可测试的分支叙事中间件 | 路径内容与代码解耦、作者预览 | 当前路径尚不需要新叙事语言 |

共同规律：

- 一个清晰主体比许多装饰组件更有世界感。
- 恢复、重置、质量和输入方式是沉浸体验的一部分。
- 实时感来自真实数据和时间，不来自随机动画。
- 内容必须能脱离动态层继续存在。
- 技术复杂度应与核心交互一致，而不是与“宇宙”这个词一致。

## 11. 从游戏架构借鉴、但不改造成游戏

[Godot Scene Organization](https://docs.godotengine.org/en/4.6/tutorials/best_practices/scene_organization.html) 强调场景自包含、低耦合、依赖注入，并提醒把大量实现细节放进文档会增加维护负担。

[Godot Pause / Process Mode](https://docs.godotengine.org/en/4.3/tutorials/scripting/pausing_games.html) 展示了动画、音频、粒子按处理模式统一暂停的价值。

WorldOS 借鉴两点：

- 每个场景是自包含模块，通过统一信号快照获得外部状态。
- 统一运行生命周期控制环境、音频和绘制的启动、暂停、恢复与销毁。

不借鉴 ECS、物理引擎、全局游戏循环和通用实体系统。当前世界对象是内容投影，不是高频游戏实体。

## 12. 研究结论

### 已采用方向

- Next.js / React / TypeScript / Zod / World Kernel。
- Server Components 优先，客户端小岛。
- GSAP + CSS + SVG / Canvas 2D。
- 原生 Page Visibility、Web Audio、Performance API。
- Fuse.js 与现有静态投影。
- 低光灯塔 + provider-neutral 服务端边界。

### 条件候选

- OffscreenCanvas / Worker：主线程绘制经 trace 证明确实越界。
- PixiJS：数百持续对象下 Canvas 2D 无法达预算。
- Sigma / Graphology：Atlas 可见图达到千级并且现有布局 / 命中测试失效。
- SQLite FTS5：构建、索引或查询超过规模预算。
- Howler：多文件、codec、sprite 和 crossfade 管理显著复杂。
- Tone：需要同步多声部交互音乐，而非轻环境声。
- Ollama / llama.cpp：用户有合适硬件并明确选择本地 Provider。

### 当前拒绝

- 全站 Three.js / R3F。
- 为“看起来高级”引入 D3、XState、Rive、Lottie 或通用插件平台。
- 让 AI 生成未经审核的世界事实。
- 每个场景独立创建 ticker、音频上下文和状态副本。
- 用自动评分、截图存在性或硬编码 token 证明体验完成。

## 13. 开发前必须验证的原型问题

这些是后续执行计划中的短时、可删除实验，不是现在要实现的功能：

1. Gateway -> Atlas -> Node 纵向样板能否仅用现有栈稳定运行 10 分钟。
2. Timeline 的河流用 SVG 合成层还是 Canvas 2D 更容易在 mobile 达到预算。
3. 程序化音色、CC0 环境采样和两者混合，哪一种更符合现有世界观且更易治理。
4. Atlas 在当前、5 倍和 10 倍数据量下的布局、命中测试和搜索耗时。
5. 浏览器隐藏 / 恢复、快速导航和 reduced-motion 下是否能统一销毁所有活动任务。
6. 真实 Provider 与低光模式能否共享同一 Lighthouse 输出和评测集。

任何原型失败都先缩小体验和修正架构，再考虑引入新框架。
