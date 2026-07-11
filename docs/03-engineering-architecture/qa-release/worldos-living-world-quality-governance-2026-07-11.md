# WorldOS 生命世界质量治理与真实完成标准

> 状态：质量标准提案，尚未进入执行
> 日期：2026-07-11
> 原则：先看真实体验，再看工程报告；任何单项通过都不能抵消另一个核心失败。

## 1. 当前声明

Reality-First 控制包的 `LOCAL_WORLD_COMPLETE_AI_FALLBACK` 只证明“空间世界”范围完成，不证明生命世界完成。

本战略包启用前，生命世界状态必须诚实记录为：

```text
LIVING_WORLD_NOT_STARTED
```

未来允许的声明：

| 声明 | 含义 |
| --- | --- |
| `LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK` | 七场景持续生命和闭环通过，灯塔仍为低光模式 |
| `LOCAL_LIVING_WORLD_COMPLETE_AI_FALLBACK` | 候选经过两轮完整修复、soak 和独立审查，仍无实时 Provider |
| `LOCAL_LIVING_WORLD_COMPLETE_AI_PROVIDER` | 在上项基础上，真实 Provider 与中文评测、权限、依据、失败回退通过 |
| `LONG_LIVED_WORLD` | 至少经过约定的数月真实内容与回访运行；不能由开发任务直接声明 |

不得重新使用 8.9、9/10、平均分或“全部脚本 passed”作为产品声明。

## 2. 完成模型

生命世界完成是并列 AND 条件：

```text
真实内容
AND 静态可达
AND 七场景独立
AND 持续生命
AND 迁移连续
AND 回访有变化
AND 声音可控
AND AI 诚实
AND 权限无泄漏
AND 性能达标
AND 可访问
AND 可长期维护
```

任何一项 fail / blocked，整体继续未完成。不得用其他项的优秀程度补偿。

## 3. 质量维度

| 维度 | 核心问题 | 主要证据 |
| --- | --- | --- |
| 事实一致 | 所有场景是否消费同一公开事实源 | 数据契约、跨场景抽样 |
| 静态世界 | JS 关闭后是否仍可读可走 | no-JS 浏览器流程 |
| 场景人格 | 隐藏文字后是否仍是七个空间 | desktop/mobile 截图和人工辨识 |
| 持续生命 | 停留数分钟是否仍自然变化 | 实时录屏、时钟 / scheduler 观测 |
| 时间季节 | 七场景是否同一时刻、不同表达 | 时间 / 季节矩阵 |
| 空间迁移 | 来源、途中、抵达、上下文是否连续 | 完整路线录屏 |
| 内容生命 | 新 / 更新 / 路径 / 关系是否自然投影 | 内容变更演练 |
| 访问记忆 | 首访、再访、长期离开是否不同且可清除 | 多会话流程 |
| 声音音乐 | 默认关闭、手势开启、crossfade、暂停是否真实 | 试听、音频生命周期日志 |
| 灯塔 | 模式、来源、下一站、失败和权限是否可信 | 中文 eval 与 API 审查 |
| 性能 | 动态是否平滑且不拖慢输入 / 首屏 | trace、LoAF、bundle、CWV 代理 |
| 可访问 | 动效、拖动、Canvas、焦点、键盘是否有等价路径 | 自动 + 人工辅助技术检查 |
| 长期运行 | 快速迁移、后台恢复、长时停留是否泄漏 | soak、资源计数、错误日志 |
| 可维护 | 新内容 / 场景是否无需复制系统 | 作者演练、扩展演练、diff 审查 |

## 4. 必测路线

| 编号 | 流程 | 必须验证 |
| --- | --- | --- |
| F1 | 首访 Gateway -> Atlas -> Node -> 关系 Node -> Gateway | 首访可跳过、连续迁移、返回记忆 |
| F2 | 直达 Node -> Timeline -> 事件 -> Node | 深链可读、时间位置延续 |
| F3 | Archive 搜索 -> 筛选 -> 卷宗 -> 返回 | 原架位 / 筛选恢复、键盘可用 |
| F4 | Path 开始 -> 一站 -> 退出 -> 再访 | 进度、下一站、清除 |
| F5 | Atlas 平移 / 缩放 / 搜索 / 单击替代 | 多输入方式等价 |
| F6 | Timeline 滚动 / 锚点 / 键盘定位 | 河流不阻塞事件阅读 |
| F7 | 任意场景 -> Lighthouse -> 推荐 -> 目标 | 来源、依据、返回和 Provider 模式 |
| F8 | 声音开启 -> 三场景 -> 静音 -> hidden -> visible | 无 autoplay、crossfade、暂停恢复 |
| F9 | rapid navigation x30 | 无遮罩、错页、残留 ticker / listener / audio |
| F10 | JS off 完整探索 | 静态世界不依赖 Client Component |
| F11 | reduced-motion + reduced-sensory | 功能、状态和方向完整 |
| F12 | mobile touch 全主线 | 无重叠、误触、拖动唯一操作 |

## 5. 场景生命验收

每个场景都要经过四段录屏：静置、交互、迁移、静谧。

| 场景 | 静置时必须真实发生 | 不能冒充 |
| --- | --- | --- |
| Gateway | 星点、天光、浮屿或灯塔以低活动度持续运行 | 只在加载时 fade in |
| Atlas | 星体 / 关系有受信号驱动的呼吸和聚焦层级 | 全屏随机粒子 |
| Timeline | 河面沿时间方向持续流动，事件涟漪局部发生 | SVG path 存在或事件卡入场 |
| Archive | 稀疏光 / 尘 / 材质与筛选空间变化 | 卡片 hover |
| Paths | 道路对真实进度有前向生命和完成沉淀 | 按钮 pulse |
| Node | 阅读区安静，窗光 / 远景 / 房间状态缓慢变化 | 正文不断移动 |
| Lighthouse | 光束、观测状态和 Provider 状态有一致节奏 | loading spinner |

判定“持续”至少要求：

- 进入动画结束后继续运行。
- 60-120 秒录屏能看出自然推进。
- hidden 后停止，visible 后恢复到正确时刻。
- reduced-motion 下停止位移运动，但状态仍可感知。
- 不靠测试面板或工程文字解释变化。

## 6. 时间与季节矩阵

每个场景至少覆盖：

```text
dawn / day / dusk / night
x spring / summer / autumn / winter
x desktop / mobile
x full / reduced-motion
```

不要求提交 7 x 4 x 4 x 2 x 2 的全部截图。证据策略是：

- 自动遍历全部组合，检查异常、资源、对比和状态一致性。
- 每个场景人工审查四个最有差异的代表组合。
- 全部 16 个时间 / 季节组合至少在 Gateway 与一个阅读场景做视觉抽样。
- 发现某种季节只是一层全局滤镜即判失败。

`/status` 可提供测试 override；公开 route 禁止出现时间模拟器、分数或 QA 文案。

## 7. 动效与迁移质量

### 自动检查

- 所有 GSAP context / matchMedia、ticker、Observer、rAF、timer、listener 在卸载后清理。
- 同时最多一个 active migration。
- 迁移取消、路由失败、快速覆盖后页面可交互。
- persistent overlay 不遮挡 H1、主导航、当前主体和主要 CTA。
- 动画属性优先 transform / opacity；持续强制 layout 判失败。

### 人工检查

- 录屏能看出从哪个对象离开、穿过何种介质、在何处抵达。
- 不同路线族不是同一个全屏 fade 换颜色。
- 迁移不会让用户丢失焦点、滚动和返回方向。
- reduced-motion 用短状态变化和抵达文本替代，不播放大位移。
- 迁移比用户获取目标内容更慢时，缩短而不是继续加戏。

## 8. 性能预算

保留 Reality-First 既有首屏与 bundle 预算，并增加生命运行预算：

| 项 | 目标 / 否决线 |
| --- | --- |
| shared First Load JS | 继续不高于冻结预算 130 KB |
| 单场景普通新增 route JS | gzip <= 80 KB |
| lazy visualization | gzip <= 150 KB，必须用户可见收益 |
| desktop 首屏 bitmap | <= 700 KB |
| mobile 首屏 bitmap | <= 350 KB |
| 用户开启前音频下载 | 0 B |
| ambient 目标 | 标准目标设备稳定约 30fps，不与输入争抢 |
| choreography 目标 | 尽量随原生刷新率，肉眼无连续抖动 |
| 单帧 | 60fps 动作约 16ms；30fps ambient p95 <= 34ms |
| Long Animation Frame | 交互 / 迁移不得出现 > 100ms；> 50ms 必须审查来源 |
| INP | 真实交互目标 <= 200ms |
| LCP / CLS | <= 2.5s / <= 0.1 的现有目标保持 |
| hidden | 无持续 ambient tick，AudioContext suspended |
| 导航泄漏 | 30 次迁移后 active adapter、ticker、listener、audio source 回到稳定数量 |

依据：

- [web.dev Rendering Performance](https://web.dev/articles/rendering-performance)
- [Core Web Vitals](https://web.dev/articles/vitals)
- [Chrome Runtime Performance](https://developer.chrome.com/docs/devtools/performance)
- [Long Animation Frames](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Long_animation_frame_timing)

测量设备至少包括：

- 当前开发 Mac 的 Chrome 稳定版。
- Playwright mobile viewport / touch emulation。
- Chrome CPU 4x slowdown 作为低性能代理。
- LAN IP 访问，不只测 localhost。

实验性 API 只能补充诊断，不能因 Firefox / Safari 不支持而判产品失败。

## 9. 声音与音乐验收

### 功能

- 首次加载和刷新无声音、无音频下载。
- 用户点击后才能创建 / resume AudioContext。
- 全局静音、音量、静谧模式、页面隐藏和错误均立即生效。
- 场景切换只保留一个 ambience 和一个短 cue。
- crossfade 结束后旧 source 被释放。
- 重新打开页面必须重新手势 arm，即使偏好记录为开启。

### 听感

- 必须用真实耳机和扬声器试听，不能只检查频率、envelope 和 peakGain。
- 连续 10 分钟无明显循环疲劳、尖锐高频、突然增益或读文干扰。
- 七场景可辨但属于同一世界；Gateway / Lighthouse 共享动机可被感知。
- Node / Archive 的声音更稀疏，不能把背景音乐铺满阅读。

### 资产

- 每个文件有来源 URL、作者、许可、下载日期、hash、大小和用途。
- CC-BY 归属完整；CC-BY-NC 未经明确边界不得进入可扩展资产库。
- 来源不明、许可页面失效或内容 ID 争议未解决即 blocked。

## 10. AI 灯塔验收

### 固定中文评测集

至少覆盖：

- 当前场景解释。
- 找一个主题和推荐路径。
- 解释两个真实节点为什么相关。
- 不存在节点 / 关系的幻觉诱导。
- 私密、owner、vault、family、sealed 请求。
- 模糊问题、超长问题、空问题。
- Provider timeout、schema 错误、限流和无来源。
- low-light 与 Provider 输出契约一致。

### 硬条件

- 回答中的 source ID 都存在于公开上下文。
- 不存在事实不得编造；不确定时明确说明。
- 下一站 href 必须可达并通过权限过滤。
- Key 不在 client bundle、HTML、RSC、日志和截图。
- Provider 失败自动回 low-light，并向用户诚实说明。
- AI 不执行写入，不更改生命周期、路径进度或权限。

有 Provider 前不得声明 AI Provider 完成；没有 Provider 不阻塞生命世界 fallback 完成。

## 11. 静态、可访问与移动端

### 静态

- JS 关闭时每个场景有语义主体或等价列表。
- Node 正文、关系、Path 顺序、Timeline 事件、Archive 检索入口可达。
- 动态资产失败不出现白屏或空 Canvas。

### 可访问

- Canvas 有 fallback DOM；inline SVG 有 title / desc 或可见标签。
- 所有拖动有单击 / 键盘 / 控件替代。
- motion、sound、quality 控件使用语义 button / toggle，有可读名称和状态。
- 焦点在迁移后落到目标主体或合理标题，不留在消失节点。
- 自动持续运动可暂停 / 关闭；reduced-motion 尊重系统和用户选择。
- 不使用闪烁、快速明暗变化和高对比扫光。

依据：[WCAG 2.2 Animation](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)、[Pause Stop Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)、[Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements)、[Canvas fallback](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage)。

### 移动端

- 不按 desktop 缩小；主场景有独立 framing 和触控目标。
- 双指 / 拖动不是唯一操作。
- 固定工具条、声音、导航和安全区无重叠。
- 低质量模式减少对象、分辨率和更新率，不隐藏内容。

## 12. 长期运行与故障注入

每次候选至少执行：

| 场景 | 时长 / 次数 | 观察 |
| --- | --- | --- |
| 单场景静置 | 每个场景 2 分钟，代表场景 10 分钟 | 帧、CPU、运动、音频、错误 |
| 世界穿梭 | 30 次连续主要导航 | 遮罩、焦点、adapter、listener、source |
| 后台恢复 | hidden 5 分钟后恢复 | 时间追上、无补帧、音频状态 |
| 声音切换 | 启用 / 静音 / 场景切换各 10 次 | AudioContext 与 source 释放 |
| 时间边界 | dawn/day/dusk/night 边界模拟 | 状态连续、无闪屏 |
| 季节矩阵 | 四季代表组合 | 资产、对比、场景人格 |
| 资源失败 | bitmap / audio / Provider 请求失败 | 静态 fallback、无白屏 |
| 存储异常 | localStorage disabled / quota error | 世界可用、记忆降级 |

开发者工具检查：console error、unhandled rejection、404 / 500、detached DOM、listener 数量、active animation、AudioContext、heap 趋势和长动画帧。

## 13. 内容与规模演练

在不污染真实内容的临时工作区生成当前、5 倍和 10 倍公开投影：

- 验证 schema、构建时间、产物体积、搜索 p50 / p95、Atlas layout 和首屏 payload。
- 不要求所有合成节点完整预渲染为页面；目标是确定瓶颈和技术升级点。
- 触发架构文档中的阈值才创建 ADR。
- 删除合成数据后工作树必须干净。

新增一个真实节点的作者演练必须证明：

- 一次输入通过校验进入事实源。
- 自动出现在需要的场景投影。
- 影响预览列出关系、路径、事件、资产和公开范围。
- 错误可回滚，不修改场景代码。

## 14. 复杂度预算

### 文档

- 本战略包固定五份。
- 开发期只新增一份执行计划和一份账本。
- ADR 只在技术 / 数据 / 权限边界改变时创建。
- 不新增阶段总结、分数报告、批次报告和文件存在性验收报告。

### 命令与脚本

- 面向日常开发者的主入口最终不超过 8 个：开发、构建、类型、lint、体验检查、边界检查、本地 RC、作者流程。
- 现有 301 个 npm scripts 不要求一次删除，但必须逐步由主入口编排并从日常文档隐藏。
- 新检查优先扩展 `check:world-experience` 或现有边界门禁，不再创建带里程碑编号的脚本。
- 任何新增脚本必须有 owner、调用方、删除条件；无人调用的报告脚本不进入主线。

### 代码

- 一种状态只有一个 owner。
- 一种持续资源只有一个 lifecycle manager。
- 场景私有视觉不得上提为全局 primitive，除非至少三处真实复用。
- 新依赖必须净减少复杂度，不能只减少几行代码。

## 15. 证据策略

[Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer) 可记录动作、DOM snapshots、网络和 screencast；[Playwright Videos](https://playwright.dev/docs/videos) 用于连续运动和迁移复查。

每份证据必须包含：

- commit、源码时间、fresh build 时间、server 启动时间。
- URL、viewport、device、motion、sensory、time、season、AI mode。
- 操作步骤和期待结果。
- 截图 / 视频 / trace 路径及 checksum。
- 人工观察到的缺陷，不只写 passed。

证据必须晚于最终源码和构建。任一修复影响公共运行时后，相关路线证据全部重录。

报告、截图、视频和 trace 的提交策略在执行计划中固定：长期有价值的摘要进入 Git；大量临时媒体留在 ignored artifact 目录，只提交 manifest 和必要代表证据。

## 16. 多轮审查

### 第一轮：实现者审查

逐路线体验，先记录缺陷再看自动结果。P0 / P1 修完后重跑受影响矩阵。

### 第二轮：独立视觉与交互审查

审查者先看没有标题和报告的截图 / 录屏，回答：

- 这是哪个场景？
- 什么正在运行？
- 变化来自哪里？
- 我能做什么？
- 迁移前后是否连续？
- 是否仍像静态大图加热点？

答不出即失败，不允许由实现者补充工程解释。

### 第三轮：全量工程与边界审查

执行 Reality-First 既有 fresh build、mainline、本地 RC、权限、AI、资产、性能、静态和 LAN 检查。工程通过只证明没有明显故障，不能覆盖前两轮失败。

### 第四轮：soak 后复核

用最终构建完成长时、后台、快速迁移、声音和资源失败场景。所有证据时间晚于最终修复。

## 17. 固定否决项

出现任一项不得声明生命世界完成：

- 任一核心场景仍是静态大图 / 大标题 + 热点 + 少量入场动画。
- 河流不流、星图不活、灯塔不扫或这些效果只在点击时发生。
- 日夜 / 四季只是一层全站滤镜，场景没有不同解释。
- 世界时间在页面停留中不更新。
- 页面隐藏后仍持续绘制或播放。
- 主要导航绕过迁移协议，返回上下文丢失。
- Node / Archive 的持续运动干扰阅读。
- 声音默认播放、无法立即关闭或许可不清。
- AI 无来源、伪造 Provider、越权或 Key 进入前端。
- JS 关闭、reduced-motion 或移动端失去主要功能。
- 任何私密事实进入公开载荷或访问记忆。
- 30 次迁移后资源数量持续增长。
- 依赖、文档、脚本或注册表明显膨胀且无删除路径。
- 只靠脚本、分数、token、截图存在性或报告自报完成。

## 18. 最终停止条件

只有以下条件全部真实成立，才能从 candidate 升为 complete：

1. 所有必测路线和场景生命矩阵 pass。
2. 两轮视觉 / 交互修复后独立审查无 P0 / P1。
3. 时间、季节、声音、回访、静态、reduced 和 mobile 矩阵通过。
4. 性能、长期运行和资源清理达到预算。
5. 内容新增与规模演练通过。
6. 权限、AI 和资产许可无 fail / blocked。
7. Reality-First 工程门禁与 localhost / LAN fresh RC 通过。
8. 证据晚于最终源码与构建。
9. 执行计划全部勾选且账本记录失败、修复、命令、证据和中文提交。
10. 最终声明使用准确的 AI fallback / provider 后缀。

任何条件未满足，继续修复或诚实标记 blocked；不得创造“下一轮已经规划”来代替当前缺口。
