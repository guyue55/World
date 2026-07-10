# WorldOS Reality-First 体验目标与验收标准

> [!IMPORTANT]
> 本文档是冻结验收标准。执行者只能修改产品实现，不能修改本文档来让结果通过。所有判断采用 `pass / fail / blocked`，不使用主观数字评分。

## 1. 当前反基线

以下 M30 证据不是“完成证明”，而是本次重构必须超越的反基线：

| 流程 | 证据 | 已确认缺陷 |
| --- | --- | --- |
| 首次进入 | `docs/90-archive/reports/worldos-m30-recordings/first-visit/001-arrival.png` | 深色双栏 hero、状态卡、网络图面板；更像产品介绍页 |
| 场景迁移 | `docs/90-archive/reports/worldos-m30-recordings/scene-migration/001-arrival.png` | 时间河主体被标题和信息面板压住；迁移后仍是同一模板 |
| 路径进入节点 | `docs/90-archive/reports/worldos-m30-recordings/path-to-node/001-arrival.png` | 路径是标题、内容卡和侧栏进度；没有行走空间 |
| 节点阅读 | `docs/90-archive/reports/worldos-m30-recordings/node-reading/001-arrival.png` | `Motion Layer / Fallback / Evidence` 直接展示；本质仍是文章详情 |
| 灯塔导览 | `docs/90-archive/reports/worldos-m30-recordings/lighthouse-guidance/001-arrival.png` | 大标题和卡片占据首屏；灯塔不是可感知陪伴者 |

反基线的共同特征：

- 一个共享 `SceneWorldPortal` 通过换文案和线框图冒充不同空间。
- 首屏主要面积被标题、描述、按钮、状态和统计占据。
- 场景对象不可操作，点击仍靠常规导航按钮。
- 公开体验展示运行模式、权限实现、降级和证据说明。
- 大量圆角矩形、边框和卡片让所有页面具有同一 dashboard 轮廓。

任何新截图如果仍具有以上共同轮廓，即判 `fail`。

## 2. 视觉北极星

### 2.1 总体感受

目标不是“做一个更炫的博客”，而是：

> 用户进入一座月下浮屿世界；地图、时间、记忆、路径、内容和灯塔分别成为可操作空间，并通过同一世界状态连接。

视觉关键词：月下、浮屿、观测、星图、河流、档案、道路、灯光、纸张与真实内容。

排除关键词：紫色霓虹模板、随机粒子背景、玻璃卡片墙、营销 hero、游戏 HUD 堆叠、纯装饰 3D、过度模糊和无法阅读的暗色图。

### 2.2 统一而不单调

| 场景 | 主色倾向 | 材质 / 光线 | 主要空间对象 |
| --- | --- | --- | --- |
| Gateway | 深夜绿、月白、暖金 | 木、纸、月光、开门光 | 门、岛屿远景、罗盘 |
| Atlas | 墨蓝、青绿、星白 | 深空、薄雾、星线 | 浮屿、星域、节点、关系线 |
| Timeline | 河青、苔绿、日落金 | 水面、涟漪、时间光 | 河道、时间锚、事件浮标 |
| Archive | 墨黑、纸白、暗红 | 木柜、纸张、灯池 | 大厅、书架、抽屉、卷宗 |
| Paths | 森林绿、土红、路灯金 | 岩面、路径、足迹 | 路线、站点、岔路、终点 |
| Node | 纸白、区域专属色 | 房间、窗、桌面、实物 | 地点物件、正文、关系门 |
| Lighthouse | 海蓝、夜黑、灯塔金 | 海面、石塔、光束 | 塔、光束、来路、下一站 |

场景可共享字体、基础色 token、导航和可访问控件，但不得共享同一首屏构图。

## 3. 全局首屏标准

在 `1440x900` desktop 与 `390x844` mobile 上分别验收：

- 可交互场景主体至少覆盖首屏可用区域的 65%，不能只是背景。
- H1 及说明组合不得占据超过首屏高度的 35%；mobile 不得先滚动才能看到场景主体。
- 除全局导航外，首屏最多一个主要命令和两个次级入口；其余操作通过场景对象自然出现。
- 首屏不显示统计卡、工程状态、权限实现、Evidence、Fallback、Motion Layer 或 QA 文案。
- 首屏必须露出一个可点击 / 拖动 / 聚焦 / 滚动的真实世界对象。
- 页面主体不得被装进居中的大圆角卡片；场景可以全宽或全视口，信息面板只作为从属 inspector。
- 普通 card、inspector 和 drawer 的圆角不超过 8px；自然场景对象不受此 UI 圆角限制。
- 字体不随 viewport 宽度缩放，letter-spacing 不使用负值；长中文必须在按钮和 inspector 内完整换行或截断并提供可访问全称。
- mobile 不是 desktop 缩小版，应使用触控友好的聚焦、抽屉和纵向空间路径。

### 3.1 冻结构图蓝图

这些是空间占比与层级约束，不是要求像素照抄。

```text
Gateway desktop
┌──────────────────────────────────────────────────────────┐
│ brand        轻量世界罗盘                     sound/theme │
│                                                          │
│         月下浮屿远景 / 门框 / 三条真实方向                │
│               [进入浮屿 / 继续上次旅程]                   │
│                                                          │
│        Atlas 方向        Path 方向       Lighthouse 光    │
└──────────────────────────────────────────────────────────┘
```

```text
Atlas desktop
┌──────────────────────────────────────────────────────────┐
│ overlay chrome                                           │
│ ┌────────────────────────────────────┐ ┌───────────────┐ │
│ │                                    │ │ focused area  │ │
│ │ 浮屿 / 星域 / 节点 / 关系线主地图   │ │ reason/exit   │ │
│ │                                    │ │ max 32%       │ │
│ └────────────────────────────────────┘ └───────────────┘ │
└──────────────────────────────────────────────────────────┘
```

```text
Timeline desktop
┌──────────────────────────────────────────────────────────┐
│ 过去 ← 年 / 季 / 阶段锚                                  │
│ ~~~~~ event ● ~~~~~ ripple ● ~~~~~ event ● ~~~~~ river  │
│                 focused event / related place            │
│                                      未来 →               │
└──────────────────────────────────────────────────────────┘
```

```text
Archive desktop
┌──────────────────────────────────────────────────────────┐
│ 馆内检索台 [search] [section filters]                     │
│ ┌────────────── 档案大厅 / 书架 / 抽屉 ────────────────┐ │
│ │ shelf       highlighted dossiers       shelf          │ │
│ │ shelf          focused record          shelf          │ │
│ └───────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

```text
Paths / Node desktop
┌──────────────────────────────────────────────────────────┐
│ route start ●────● current ────○ next ────◎ destination │
│                ↓ enter waypoint                           │
│ [place object / region window]  title + passport          │
│ ───────────── readable body 60-72ch ──────────────────── │
│ relation door        next station        return to map    │
└──────────────────────────────────────────────────────────┘
```

```text
Lighthouse desktop
┌──────────────────────────────────────────────────────────┐
│                    beam -> next island                    │
│                       /                                   │
│              sea     lighthouse      source route         │
│                                                          │
│ [ask where/why/next]  grounded answer  [enter next place] │
└──────────────────────────────────────────────────────────┘
```

mobile 统一原则：场景主体保持全宽纵向视口；inspector 变为底部 drawer；路线和时间河改为纵向；全局导航不得占据超过约 12% 的首屏高度。

## 4. 场景生产矩阵

### 4.1 Gateway / Home

**第一眼**：月下浮屿远景和一个明确入口动作，品牌名融入世界，不是营销文案块。

**首访流程**：

1. 看到世界仍在运行的轻微信号。
2. 点击 / 键盘触发“进入浮屿”。
3. 门或观察窗打开，主要空间方向被点亮。
4. 选择 Atlas、Paths 或 Lighthouse 中一个入口。

**回访流程**：优先出现上次地点、未完成路径和一个“继续”动作；仍保留清除记忆入口。

**否决项**：左右两栏 hero；首屏四个 CTA；状态统计卡；网络图只是静态装饰；首次访问和回访完全相同。

### 4.2 Atlas

**第一眼**：一张占据主视口的浮屿星图，区域位置、连接和远近关系可见。

**核心交互**：

- 指针 / 键盘聚焦区域时，星域和关系线响应。
- 选择区域后镜头或视图聚焦，显示该区域的代表地点。
- 选择节点时出现轻量 inspector，解释“它是什么、为什么在这里、与什么相关”。
- 可返回全图、进入节点、沿关系线或切到时间河。
- mobile 使用可拖动地图或横向区域带；同时提供可访问列表，不把列表当主体。

**否决项**：区域卡片网格先于地图；所有节点以相同圆点无层级显示；地图不可操作；星图只存在于右侧面板。

### 4.3 Timeline

**第一眼**：时间河贯穿视口，事件直接位于河道与时间锚上。

**核心交互**：

- 沿河滚动 / 拖动浏览年份、季节或阶段。
- 聚焦事件时出现涟漪、相关地点和前后变化。
- 选择事件可进入对应 Node，返回后保留河段位置。
- 空事件区有自然河面和下一段提示，不出现空白列表。
- reduced-motion 以时间锚、连线和静态状态变化表达，不做平移穿梭。

**否决项**：曲线在下方装饰、事件仍在上方卡片列表；“当前水纹”是普通信息卡；没有可回看的时间位置。

### 4.4 Archive

**第一眼**：档案大厅 / 书架 / 抽屉成为主空间，检索入口融入馆内。

**核心交互**：

- 输入搜索后，匹配卷宗在架上或索引区被点亮 / 聚拢。
- 区域、类型、生命周期筛选改变馆内分区和结果数量，并有可撤销反馈。
- 选择卷宗先显示摘要与来源，再进入 Node。
- 无结果时保留搜索词并给出清除或换分区入口。
- 键盘用户可以按自然顺序访问搜索、分区、卷宗和出口。

**否决项**：搜索栏下面仍是普通卡片瀑布流；书架只是背景线；筛选变化只更新文字标签。

### 4.5 Paths 与 Path Detail

**第一眼**：路线、站点、当前位置和终点共同形成可走的空间。

**核心交互**：

- Paths 首页通过路线在世界中的形状、长度和主题让用户选择旅程。
- Path Detail 把所有节点放在一条可视路线中，当前位置明显但不遮挡内容。
- 完成一个节点后下一站被点亮，返回时保留进度。
- 用户随时可以回地图、跳到允许的已走节点、重置本路线。
- 完成后出现抵达仪式与相关路线，不只显示 `7/7`。

**否决项**：左侧内容卡 + 右侧数字列表；站点只是编号；路径图在首屏不可见；进度只能从文字得知。

### 4.6 Node

**第一眼**：节点是一个有区域、物件和出口的地点，正文入口清楚但不是唯一视觉内容。

**核心交互**：

- 地点护照以轻量方式展示区域、状态、时间和路径位置。
- 正文保持舒适阅读宽度，不被浮动面板遮挡。
- 关系门必须说明“为什么相关”，并带用户进入其他地点。
- 下一站、回 Atlas、回 Path、看 Timeline 与问 Lighthouse 都保留来源上下文。
- 代码、长文、图片和空内容具有各自稳定布局。

**否决项**：公开显示 Motion Layer / Fallback / Evidence；护照成为与正文并列的大侧栏；大量卡片包裹正文；读完后没有自然出口。

### 4.7 Lighthouse

**第一眼**：塔、海面和光束构成观测空间；问路入口是场景的一部分。

**核心交互**：

- 灯塔知道当前场景、来源地点和旅程上下文。
- 用户可以问“我在哪里、下一步看什么、为什么相关、如何回去”。
- 回答包含明确依据、可进入地点和不确定性说明。
- 私密问题由服务端拒绝，并提供公开替代路径。
- Provider 不可用时清楚标记低光模式，仍提供可靠静态导览。
- 回答失败、超时和无依据时不显示成功状态。

**否决项**：大标题 + 三个 CTA + 问答卡；灯塔只是插画；建议与当前场景无关；低光结果冒充实时 AI。

## 5. 场景迁移标准

每次核心场景导航必须形成一个不超过约 900ms 的完整叙事：

1. **离开**：选中的来源对象收束或成为迁移锚点。
2. **途中**：颜色、纹理、空间对象或镜头连接来源与目标。
3. **抵达**：目标场景主体先出现并可操作，标题和辅助信息随后进入。
4. **延续**：目标场景知道来源、选中节点或路径位置。

要求：

- 不是全局遮罩写“正在迁移”后整页 fade。
- 来源和目标至少共享一个具名迁移对象，如星点 -> 事件浮标、卷宗 -> 节点物件、路径站点 -> 阅读房间。
- 快速连点时旧动画被取消或覆盖，不留下遮罩和不可点击层。
- 浏览器后退 / 前进恢复正确场景、焦点和位置。
- reduced-motion 只做短暂色彩 / 透明度变化和明确抵达状态，不做缩放、长距离位移或视差。
- 不支持 View Transition API 时使用 GSAP / CSS fallback，功能不变。

## 6. 声景与氛围标准

- dayPeriod / season 必须通过光线、雾、水面、植被或声景中的至少两项被感知，不能只在状态标签显示 `day / summer`。
- 七个场景消费同一世界时间状态，但按各自人格表达；切换后不得出现季节 / 时段不一致。
- 氛围变化不能遮挡内容、制造闪烁或依赖持续高频 DOM 更新。
- 默认静音，首次访问不得创建正在播放的音频上下文。
- 只能在明确用户手势后加载并播放。
- 全局提供开启 / 关闭、音量和“减少感官刺激”控制；状态本地记忆且可清除。
- 每个场景有不同但克制的环境声景；Gateway 与 Lighthouse 至少使用一个经变奏的短音乐动机，迁移使用短 crossfade，不叠加多个无限 loop。
- 声音关闭后，所有状态仍有视觉和文本表达。
- 音频资产必须有来源、许可证、时长、编码、大小和用途记录。
- 程序化声景 / 音乐必须记录 patch、峰值音量和听感审查，不因“没有文件”而跳过治理。
- 切换标签页、系统减少动效 / 感官或页面隐藏时暂停不必要音频。

## 7. 内容生命标准

抽样至少 12 个代表节点，覆盖 6 个区域、长文 / 项目 / 记忆 / 规则等内容类型。每个样本必须证明：

- 在 Atlas 中有位置。
- 在 Timeline 中有时间痕迹，或明确标记“无时间事件”。
- 在 Archive 中可检索和筛选。
- 至少属于一条 Path，或明确不是旅程节点。
- 至少一条带原因的关系。
- Lighthouse 能基于公开事实解释它。
- Node 页面提供至少两个真实出口。

首访与精选策展还必须满足：

- Gateway、Atlas 代表地点和 onboarding Paths 合计至少使用 24 个来源可追溯节点。
- 首访主线不得由 RC、Phase、脚本注册表、构建门禁、Evidence、QA 报告和 WorldOS 自我说明主导。
- 工程过程节点可以保留在 Archive 中检索，但默认不进入首访推荐。
- 至少呈现项目、记忆、思考片段、生活 / 创作主题和世界规则五种内容气质，避免整个世界只谈“如何做这个世界”。

不得为凑数伪造用户人生事实。没有来源的内容可以作为明确标注的世界设定或示例，不得冒充真实经历。

### 7.1 作者维护标准

本地作者流程必须在临时 workspace 中完整演练：

1. 中文 draft preview 能列出将新增 / 修改的内容、节点、关系、路径与事件。
2. 错误 visibility、重复 slug、缺失关系目标、非法路径和无效日期会在写入前阻止。
3. apply 生成 backup manifest 与 checksum，并完成原子写入。
4. 应用后 public index、Atlas、Timeline、Archive、Paths 和 Lighthouse 影响预览与实际结果一致。
5. rollback 恢复原文件，重新运行内容检查后与应用前 checksum 一致。
6. 整个流程不经前端写 API，不把 owner token 或写能力暴露到 LAN。

只读 dry-run、示例对象存在或状态页写着“可维护”不能通过该项。

## 8. 浏览器与无障碍矩阵

每个核心 route 至少验证以下模式：

| 模式 | 视口 / 设置 | 必须检查 |
| --- | --- | --- |
| desktop | `1440x900` | 场景主体、鼠标、键盘、无溢出、迁移 |
| mobile | `390x844` | 触控目标、首屏主体、抽屉、无横向溢出 |
| reduced-motion | desktop + `prefers-reduced-motion: reduce` | 无长距离运动、语义和导航完整 |
| reduced-sensory | mobile + 声音关闭 | 无自动声音、状态仍可理解 |
| keyboard | desktop | skip link、焦点顺序、场景对象、返回位置 |
| storage-off | browser context 禁止 / 清空 storage | 首访、浏览、清除失败均不白屏 |
| javascript-off | desktop | server-rendered 标题、内容、等价列表、链接与权限边界可读可走 |

最低无障碍要求：

- 所有交互对象有可访问名称和可见焦点。
- Canvas / SVG 主体必须有 DOM 等价入口；Canvas 不能成为唯一导航方式。
- 动态状态使用克制的 `aria-live`，不得每帧播报。
- 颜色不是唯一状态表达。
- 文本缩放到 200% 后不遮挡核心命令。

## 9. 性能与稳定体验标准

详细预算见架构与技术栈文档。体验层至少满足：

- 首屏先出现可读静态场景，动画和重资产逐步增强，不因动态模块延迟白屏。
- 页面切换期间导航始终有退出路径，遮罩不超过迁移时长。
- 场景空闲时不保持无意义高频渲染；不可见标签页暂停动画和音频。
- mobile 不因粒子、模糊、滤镜或大量 SVG 节点明显卡顿。
- 资源失败时显示属于该世界的静态场景，不显示开发术语。

## 10. 禁止出现在公开主线的文案

以下词语和同义工程说明不得作为访客 UI 出现在 `/`、`/atlas`、`/timeline`、`/archive`、`/paths*`、`/node*`、`/ask`：

```text
Motion Layer
Fallback
Evidence
Production Part
场景证据
降级形态
验收通过
desktop / mobile / reduced-motion 已复核
Provider disabled-dry-run（可以用自然中文说明“低光模式”，但不能冒充结果）
sourceCount / dependencyDelta / P0/P1 / score
```

这些信息只允许出现在 `/status`、开发日志和报告中。

## 11. 证据目录与命名

每次终局验收生成唯一 run：

```text
docs/90-archive/reports/worldos-reality-first/<run-id>/
  manifest.json
  screenshots/
    home-desktop-arrival.png
    home-mobile-arrival.png
    home-desktop-returning.png
    home-desktop-text-hidden.png
    atlas-desktop-arrival.png
    atlas-desktop-focused.png
    atlas-desktop-text-hidden.png
    atlas-mobile-arrival.png
    timeline-desktop-arrival.png
    timeline-desktop-focused.png
    timeline-desktop-text-hidden.png
    timeline-mobile-arrival.png
    archive-desktop-arrival.png
    archive-desktop-search.png
    archive-desktop-text-hidden.png
    archive-mobile-arrival.png
    paths-desktop-overview.png
    paths-desktop-progress.png
    paths-desktop-completed.png
    paths-desktop-text-hidden.png
    paths-mobile-progress.png
    node-desktop-arrival.png
    node-desktop-reading.png
    node-desktop-relations.png
    node-desktop-text-hidden.png
    node-mobile-reading.png
    lighthouse-desktop-arrival.png
    lighthouse-desktop-answer.png
    lighthouse-desktop-fallback.png
    lighthouse-desktop-text-hidden.png
    lighthouse-mobile-arrival.png
    home-desktop-reduced-motion.png
    atlas-desktop-reduced-motion.png
    timeline-desktop-reduced-motion.png
    archive-desktop-reduced-motion.png
    paths-desktop-reduced-motion.png
    node-desktop-reduced-motion.png
    lighthouse-desktop-reduced-motion.png
  recordings/
    first-visit.webm
    atlas-explore.webm
    timeline-review.webm
    archive-search.webm
    path-journey.webm
    node-explore.webm
    lighthouse-guide.webm
    scene-migration.webm
    returning-visit.webm
  audits/
    browser-matrix.json
    visual-review-primary.md
    visual-review-independent.md
    permission-boundary.json
    performance-budget.json
    asset-license.json
    authoring-transaction.json
    final-reality-matrix.md
```

`manifest.json` 必须记录 Git commit、源码最新时间、build 时间、server 启动时间、截图 / 录屏时间、浏览器版本、视口和命令。任何证据早于最后源码或 build，整组证据为 stale。

## 12. 视觉审查协议

### 12.1 自动检查能判定的事实

- 页面响应、控制台错误、白屏、溢出、遮挡、焦点、死链、资源失败。
- 首屏场景主体 bounding box、主要交互是否可见、禁用工程文案是否出现。
- 截图和录屏新鲜度。
- route / mode / flow 覆盖是否完整。
- 权限载荷、默认声音、资源预算和构建结果。

### 12.2 必须由视觉审查判定的事实

- 是否仍像博客或 dashboard。
- 七个场景隐藏文字后是否可区分。
- 场景主体是否真实承担交互，而不是装饰。
- 迁移是否形成空间连续性。
- 视觉、音频、交互是否属于同一世界观。

视觉审查必须真实打开所有关键截图，逐项写出观察，不得从文件名、DOM 或报告摘要推测。

### 12.3 独立性

- 首轮由实现上下文按本标准自查并修复。
- 终轮必须调用 `reality-auditor` 或新的独立审查上下文；可用 subagent 时，审查者不得参与实现。
- 独立审查先看截图 / 录屏，再看自动报告，避免被 passed 状态诱导。
- 两轮结论不一致时按 `fail` 处理，继续修复。

## 13. Reality Matrix

终局报告必须逐行给出：

| Claim | Evidence | Primary review | Independent review | Verdict |
| --- | --- | --- | --- | --- |
| 首访像进入世界 | screenshot + first-visit.webm | pass/fail | pass/fail | pass/fail |
| Atlas 是可探索地图 | arrival/focused/text-hidden + atlas-explore.webm | pass/fail | pass/fail | pass/fail |
| Timeline 是时间河 | arrival/focused/text-hidden + timeline-review.webm | pass/fail | pass/fail | pass/fail |
| Archive 是检索空间 | arrival/search/text-hidden + archive-search.webm | pass/fail | pass/fail | pass/fail |
| Paths 是可走旅程 | overview/detail/completed + path-journey.webm | pass/fail | pass/fail | pass/fail |
| Node 是内容地点 | arrival/reading/relations + node-explore.webm | pass/fail | pass/fail | pass/fail |
| Lighthouse 是陪伴导览 | arrival/answer/fallback + lighthouse-guide.webm | pass/fail | pass/fail | pass/fail |
| 切换像空间迁移 | source/transit/arrival + scene-migration.webm | pass/fail | pass/fail | pass/fail |
| 回访可以继续 | first/return/clear + returning-visit.webm | pass/fail | pass/fail | pass/fail |

所有行均为 `pass` 才能完成 Goal。不得以平均分抵消任何一项失败。

## 14. 最终否决项

以下任一项存在，Goal 必须继续：

- 任一核心场景仍使用共享 `SceneWorldPortal` 作为首屏主体。
- 任一核心场景主要结构仍是“大标题 + 描述 + CTA + 卡片列表”。
- 隐藏文字后 Atlas、Timeline、Archive、Paths 中有两项无法区分。
- 场景对象只是装饰，主要操作仍全部依赖普通按钮和链接列表。
- 迁移只是 fade / scale 或说明条。
- 公开页面出现工程验收说明。
- mobile 首屏看不到场景主体或被固定控件遮挡。
- reduced-motion / no-audio 模式丢失导航或状态语义。
- AI 越权、私密信息进入公开载荷、声音自动播放或 Key 出现在客户端。
- 最终审查只读取脚本状态，没有逐张看图和逐段看录屏。
