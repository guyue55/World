# WorldOS 生命世界元总控规则

本仓库当前只接受一个开发目标：在 localhost / LAN 上，把现有“电影感静态场景图 + 热点 + 短动效”重构为可持续运行、可探索、可迁移、可阅读、可导览、可回访的生命世界候选。不得把旧阶段勾选、脚本通过或短录屏继续解释为产品已完成。

## 唯一权威入口

开始工作、上下文恢复或 Goal 自动续跑时，按顺序读取：

1. `docs/00-overview/worldos-meta-control-contract-2026-07-11.md`
2. `docs/00-overview/worldos-living-world-experience-acceptance-2026-07-11.md`
3. `docs/03-engineering-architecture/worldos-living-world-architecture-data-contract-2026-07-11.md`
4. `docs/00-overview/worldos-living-world-execution-plan-2026-07-11.md`
5. `docs/00-overview/worldos-living-world-execution-ledger-2026-07-11.md`

读取后先运行：

```bash
node scripts/check-worldos-living-world-control.mjs
node scripts/check-worldos-living-world-readiness.mjs --repair-browser
```

第一条失败表示权威文件、任务结构或恢复指针发生漂移；第二条失败表示本机缺少 Node、Playwright Chromium、ffmpeg 或 LAN 条件。除非用户在 Goal 外明确批准新版本，否则不得继续，也不得修改 checksum 降低标准。

校验器只允许输出 `CONTROL_INTEGRITY_PASS`，它永远不判定产品完成。产品完成仍必须由最新浏览器、长录屏、音频技术证据、运行证据和两个独立 reviewer context 共同判定；人类听感只由真实人类签收。

冲突优先级：用户最新明确要求 > 本文件 > 元总控契约 > 体验验收 > 架构与数据契约 > 执行计划 > 执行账本。

以下内容仅是上游研究、历史实现或反例，不再拥有完成判定权：

- 2026-07-11 的五份 Living World 战略提案。
- 2026-07-10 的 Reality-First 六份控制文档及其 `LOCAL_WORLD_COMPLETE_AI_FALLBACK` 结论。
- 旧 M8-M30、Phase、RC、`ultimate`、分数报告和历史执行账本。

## 当前事实

- 七个场景拥有不同的电影感位图和部分热点交互，视觉上比旧博客模板前进了一步。
- 最新九段“终审录屏”只有约 1.72 到 10.16 秒，不能证明 60 到 120 秒持续生命、十分钟稳定运行或长期回访。
- `WorldRuntimeProvider` 只在首次挂载计算昼夜与季节；Timeline 河流、Atlas 星图和大多数场景环境没有统一持续运行层。
- 公开主线仍高度依赖全屏静态 WebP；隐藏背景图后，场景主体和世界运行能力尚未被证明。
- 当前声音是程序化低增益音色，没有经真实长期试听的完整声景或音乐资产。
- Lighthouse 只有诚实的 low-light 能力；无合法 Provider 凭据时不得声称实时 AI。
- 因此当前产品状态是 `CINEMATIC_STATIC_WORLD_IN_PROGRESS`，不是生命世界完成态。

## 目标层级

- **终极愿景**：一个由作者长期拥有、可公开也可私密、可导出恢复、随真实内容和时间成长的个人数字世界。它需要数月或数年真实使用，不能由一次 Goal 宣布完成。
- **本次唯一交付**：`LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK_HUMAN_AUDIO_PENDING`。它只覆盖 localhost / LAN 的公开生命世界体验和不锁死未来的数据主权底座；本 Goal 内任何执行者都无权去掉 `HUMAN_AUDIO_PENDING`。
- **明确不做**：外部部署、多人在线、跨设备同步、完整私密宇宙、家庭继承流程、全站 3D、伪造用户经历、购买资产、秘密获取和实时 AI 凭据。

## 冻结与状态规则

- 元总控、体验验收、架构与数据契约、Goal 提示词和机器清单在 Goal 内冻结。
- 执行计划只允许把已真实完成项从 `[ ]` 改为 `[x]`，不得删项、改写验收或新增后续阶段。
- 执行账本是唯一可持续更新的恢复事实，必须记录失败、假设、实验、修复、命令、证据和提交。
- `data/world-kernel/worldos-living-world-execution-state.json` 是账本的机器镜像；每个 `[x]` 必须绑定结构化命令输出 hash、原始证据 hash 和可由 Git 反查的中文实现 commit hash / subject。一个最小高内聚实现提交最多覆盖同一检查点内四项，跨检查点不得复用；同一检查点的 fresh 原始证据可以共享，但每项仍要有自己的完成记录。
- 若实现与验收冲突，修改实现；若假设被实测否定，在账本登记并按同一目标修正方案，不改低验收标准。
- 任何旧完成声明、截图或报告不得自动迁移为新计划的通过项。

## 产品优先级

发生冲突时按以下顺序取舍：

1. 作者和数据主体的真实、隐私、控制权与可撤回性。
2. 原始事实、权限、版本、导出、恢复和可追溯性。
3. 阅读、理解、探索和返回路径。
4. 世界氛围、动态、声音、音乐和 AI 陪伴。
5. 工程抽象、技术新颖性和实现方便。

作者与数据主体的权利优先于访客便利；访客真实任务优先于实现方便；技术不得反向定义产品。

## 产品准则

- 中文优先，第一次进入 30 秒内知道“这是一个人的世界、我在哪里、能去哪里、为什么值得去”。
- 场景主体优先于标题、说明、卡片和静态背景。隐藏文字与背景位图后，仍应存在可辨认、可操作的空间结构。
- 内容是地点、关系、时间和旅程，不是文章卡片集合；新增事实无需修改场景组件即可进入投影。
- 动态必须有来源：真实时间、内容、关系、访问、路径或确定性环境种子。随机装饰不得决定语义、推荐、权限和进度。
- 场景迁移必须表达来源、途中、抵达和沉淀；返回、刷新、深链、快速切换保留上下文。
- 生命世界必须会安静：Node、Archive、阅读、reduced-motion、reduced-sensory、页面隐藏和低质量模式不丢语义。
- 音频默认关闭，只能由用户手势开启；AI 可缺席，世界仍完整。
- `/status` 是唯一工程状态和预览入口；公开主线不得展示 QA、Fallback、Evidence、模式分数或技术说明。

## 架构与权限

- 保持 Next.js 模块化单体、Server Components 优先和现有 World Kernel 事实源。
- 共享事实、世界信号、运行生命周期和迁移协议；场景视觉与交互保持高内聚，不建立万能场景模板。
- 全站只允许一个环境调度生命周期和一个懒创建的 AudioContext；离场、隐藏、静谧和卸载必须释放资源。
- 优先复用 React、GSAP、CSS、SVG / Canvas 2D、View Transition、Web Audio、Zod 与现有依赖。
- 未经 ADR、可见收益、体积测量、降级和删除证明，不新增 Three.js、R3F、PixiJS、D3、Sigma、XState、Howler、Tone 等运行时依赖。
- 权限由服务端、事实契约和公开投影过滤决定；前端只体现显隐、禁用、说明和引导。
- private、owner、vault、family、partner、sealed、silent 内容不得进入公开 HTML、RSC、JSON、索引、AI 上下文、Canvas buffer、截图、音频命名或导出。
- AI Key 只存在于服务端环境；AI 只读，不写事实、不改权限、不改路径进度。

## 视觉与感官工作流

- 前端工作必须读取并遵循 `gsap-core` 与 `ui-ux-pro-max` 技能，并以现有“月下浮屿”世界观为起点，而非照搬科技模板。
- 静态位图只能是一个场景层，不能继续承担全部主体；语义对象、持续环境、交互和内容必须是独立可降级层。
- 持续动效使用 transform、opacity、CSS custom properties、SVG / Canvas 绘制状态；避免每帧 React state 与布局抖动。
- 使用 `gsap.matchMedia()` / `gsap.context()` 统一 desktop、mobile、reduced-motion 与清理。
- 不嵌套卡片，不把空间切回 dashboard；普通 card、drawer、inspector 圆角不超过 8px，letter-spacing 不使用负值。
- 音频资产和程序化 patch 都要记录来源、许可或生成方式、hash、峰值、用途、技术验证和人类签收状态。
- Codex 只能完成音频技术验证，不能冒充耳机或扬声器上的人类听感签收；无论执行期是否出现一份自报签收记录，本 Goal 最终状态都必须保留 `HUMAN_AUDIO_PENDING`。去掉后缀需要 Goal 外用户明确批准新的控制版本。

## 执行纪律

- 每个检查点先读账本和 `git status --short --branch`，保护用户已有改动。
- 使用“事实 -> 期望体验 -> 最小机制 -> 真实动态 -> 人工感受”的逆向链路，不以基础设施数量推导体验完成。
- 风险样板未通过前不得复制到七场景；失败时修正假设或删除原型，不扩大错误。
- 同一风险门连续三次完整实验失败时必须进入 `BLOCKED_DESIGN_REVIEW_REQUIRED`，记录最后假设与删除路径，停止自动实现并请求 Goal 外设计决策；不得无限自旋或绕过风险门。
- 每一项执行控制校验、针对性 baseline/失败观察、最小实现、定向测试、完成记录和中文提交；相邻且高内聚的项可按最多四项组成一个提交，但必须逐项记录和勾选。
- 每个 A-H 检查点才执行完整的 typecheck/lint、fresh production build、localhost/LAN 浏览器实测、适用的九模式截图/长录屏/音频技术验证、独立审查、修复和封存，避免把同一套重型证据重复九十次。
- 提交格式：`feat(world): 中文说明`、`fix(world): 中文说明`、`refactor(world): 中文说明`、`test(world): 中文说明`、`docs(world): 中文说明`。
- 不新增 M、Phase、RC、下一轮、空壳报告、硬编码分数或只验证字符串存在的完成脚本。

## 完成声明

工程门禁至少包括：

```bash
npm run typecheck
npm run lint
npm run build:production-ci
npm run check:world-experience
npm run check:mainline
npm run release:local-rc
git diff --check
```

这些只能证明工程稳定。Goal 只有在执行计划 A-H 全部真实完成、固定体验矩阵全 pass、两轮 fresh 独立视觉/交互复核无 P0/P1、证据晚于最终源码和构建时才能结束。

以下任一项存在必须继续：静态大图仍是主体、持续生命只能在短录屏或点击中看到、河流不流、星图不活、日夜四季只是一层滤镜、迁移是换页遮罩、内容更新需改场景代码、声音未通过技术验证或伪造人类签收、AI 无依据、私密事实泄漏、JS-off/reduced/mobile 失去主路径、30 次迁移后资源增长。

本 Goal 最终只允许声明 `LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK_HUMAN_AUDIO_PENDING`。无后缀 fallback 与 Provider 状态只能在 Goal 外由用户核验真实听感、Provider 和证据后批准新的控制版本；当前执行者不得自行升级。不得声明“完美”“终局宇宙”“长期生命世界”或任何数字体验分。
