# WorldOS Reality-First Instructions

本仓库当前只接受一个主目标：把仍像“博客骨架 + 工程说明面板”的公开主线，重构为 localhost / LAN 上可进入、可探索、可迁移、可阅读、可回访的个人数字世界。

## 唯一权威入口

开始工作、上下文恢复或 Goal 自动续跑时，按顺序读取：

1. `docs/00-overview/worldos-reality-first-control-contract-2026-07-10.md`
2. `docs/00-overview/worldos-reality-first-experience-acceptance-2026-07-10.md`
3. `docs/00-overview/worldos-reality-first-architecture-stack-2026-07-10.md`
4. `docs/00-overview/worldos-reality-first-execution-plan-2026-07-10.md`
5. `docs/00-overview/worldos-reality-first-execution-ledger-2026-07-10.md`
6. `docs/00-overview/worldos-reality-first-one-shot-goal-prompt-2026-07-10.md`

读取后先运行：

```bash
node scripts/check-worldos-reality-first-control.mjs
```

失败表示冻结文本被改写；除非用户在 Goal 外明确批准新版本，否则不得继续或更新 checksum。

冲突时按以下优先级处理：用户最新明确要求 > 本文件 > 控制契约 > 体验验收 > 架构与技术栈 > 执行计划 > 执行账本 > 旧文档。

旧的 M8-M30、Phase、RC 和 `ultimate` 文档仅作为历史与反例。它们不能证明体验完成，也不能覆盖本控制包。

## 当前事实

- 旧 M30 的 `8.9` 与 `9/10` 结论已经失效。
- 当前工程底座、数据、权限边界和本地 RC 基本可用。
- 当前公开页面仍以统一双栏 hero、圆角面板、状态卡和工程说明为主体。
- `Motion Layer`、`Fallback`、`Evidence`、`场景证据` 等工程文案出现在公开体验中，是待修缺陷。
- 旧检查脚本存在硬编码体验分数和自证循环，不得继续作为终局门禁。

## 冻结规则

在 Reality-First Goal 执行期间：

- 不得修改本文件、控制契约、体验验收标准、架构技术决策、Goal 提示词或冻结 checksum 来降低门槛。
- 执行计划只允许把复选框从 `[ ]` 更新为 `[x]`，不得删项或改写验收条件。
- 执行账本可以持续更新，必须记录当前检查点、失败、证据和提交哈希。
- 若实现与验收冲突，修改实现，不修改验收。
- 需要改变冻结规则时，必须由用户在 Goal 外明确授权。

## 产品准则

- 中文优先，入口低门槛；世界语言有氛围，但重要操作必须直白可理解。
- 场景主体优先于标题、说明和卡片。隐藏文字后仍应能区分 Home、Atlas、Timeline、Archive、Paths、Node、Lighthouse。
- 每个场景拥有独立空间与交互语法；共享数据契约、运行时和基础控件，不共享同一套 hero 模板。
- 内容是地点和关系网络，不是文章卡片集合。
- 场景切换表达离开、途中、抵达和上下文延续，不是整页淡入。
- 音频默认关闭，只能由用户手势开启；关闭声音或减少动效后，功能与语义必须完整。
- 不在公开页面展示 QA、降级、权限实现、证据路径、运行模式等工程说明；这些只属于 `/status` 或报告。

## 架构与边界

- 保持 Next.js 单体、Server Components 优先和现有 World Kernel 事实源。
- 优先复用 React、GSAP、SVG / Canvas、CSS、原生 View Transition / Web Audio 能力和已安装依赖。
- 未经 ADR、可见收益、体积测量和降级证明，不引入 Three.js、React Three Fiber、D3、XState、Howler、Tone 等新运行时依赖。
- 新场景代码按场景高内聚；跨场景只共享事实模型、无视觉人格的 primitive、运行时状态和导航协议。
- 权限由服务端、数据过滤和事实契约控制；前端只做显隐、禁用、说明和引导。
- 私密、owner、vault、family、partner、sealed、silent 内容不得进入公开 HTML、RSC、JSON、搜索、AI 上下文、截图或导出。
- AI Provider Key 只允许存在于服务端环境变量；无 Key 时保留真实标记的低光 fallback，不得伪装为实时 AI。
- 暂不做外部 Preview / Production、域名、HTTPS 或线上部署；仅保证 localhost 与 LAN IP。

## 视觉与动效工作流

- 前端工作必须读取并遵循 `gsap-core` 与 `ui-ux-pro-max` 技能；使用现有项目视觉语言，不照搬通用科技模板。
- 动效只使用 transform、opacity、滤镜或绘制状态等可控属性；避免持续触发布局。
- 使用 `gsap.matchMedia()` 统一处理 desktop、mobile 与 `prefers-reduced-motion`，组件卸载必须清理动画和监听器。
- 首屏需要真实视觉资产或可交互场景主体，不能用渐变背景、抽象线框和大段文案冒充世界。
- 不嵌套卡片，不把页面区块全部做成浮动卡片，不用同一套圆角面板替代场景设计。
- 普通 UI card、inspector 和 drawer 的圆角不超过 8px；letter-spacing 不使用负值。

## 执行纪律

- 每个检查点开始前，先读取执行账本和当前 Git 状态。
- 保留用户已有改动；不得回滚不属于当前任务的变更。
- 先截生产态 baseline，再实现，再截 after；证据必须晚于对应源码和构建产物。
- 每个检查点完成后立即运行定向检查、更新复选框与账本、中文提交，然后自动进入下一个检查点。
- 提交格式：`feat(world): 中文说明`、`fix(world): 中文说明`、`refactor(world): 中文说明`、`test(world): 中文说明`、`docs(world): 中文说明`。
- 中文注释只解释非直观的边界、状态机、算法和降级原因，不写逐行旁白。
- 不新增阶段编号、RC 编号、空壳报告或只检查字符串是否存在的“完成脚本”。

## 质量与完成声明

工程门禁至少包括：

```bash
npm run typecheck
npm run lint
npm run build:production-ci
npm run check:mainline
npm run release:local-rc
git diff --check
```

但这些命令只能证明工程稳定，不能证明世界体验达标。

只有体验验收文档中的所有 route / flow / mode 均有最新截图、录屏、浏览器交互和独立视觉审查结论，且所有否决项为零，才允许完成 Goal。禁止使用硬编码分数、文件存在性、截图字节数、DOM token 或报告自报状态替代视觉判断。

如果任何核心场景仍可被描述为“同一模板换文案”“大标题 + 卡片列表”“背景有一点动效”，结论必须是未完成，并继续修复。
