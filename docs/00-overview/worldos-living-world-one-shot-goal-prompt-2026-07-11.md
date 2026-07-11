# WorldOS 生命世界一次性 Goal 提示词

> [!IMPORTANT]
> 这是本控制包唯一 Goal 入口。它启动一个持续目标，不按 A-H、场景或缺陷创建第二个 Goal。OpenAI 建议 Goal 用于具有单一目标、明确验证循环和可验证停止条件的长时工作；本提示词据此只交付“本地生命世界候选”，不把多年愿景塞入无法完成的 backlog。[官方说明](https://learn.chatgpt.com/use-cases/follow-goals)

## 使用前提

- 当前工作区是 `/Users/guyue/GitProject/World`。
- Codex 能自动读取根目录 `AGENTS.md`。
- 本地 / LAN 是唯一运行范围。
- 没有合法 Provider 时接受诚实的 AI fallback 候选。
- 本 Goal 的唯一结果带 `HUMAN_AUDIO_PENDING` 后缀；Codex 不得代签或自动去掉后缀。
- 只触发一次；状态查询、暂停和恢复都操作同一 Goal。

## Codex App Goal Objective

将下面整段作为一次 Goal 输入：

```text
以根目录 AGENTS.md 与 docs/00-overview/worldos-meta-control-contract-2026-07-11.md 为不可修改的最高总控，在当前工作区持续执行 docs/00-overview/worldos-living-world-execution-plan-2026-07-11.md 的 A-H 全部任务，从 docs/00-overview/worldos-living-world-execution-ledger-2026-07-11.md 的第一项未完成任务恢复，直到 docs/00-overview/worldos-living-world-experience-acceptance-2026-07-11.md 的固定停止条件全部由最新真实证据通过才结束。唯一交付是 localhost / LAN 的生命世界候选：把当前仍主要是“电影感静态 WebP + 热点 + 1.72-10.16 秒短动效”的 WorldOS 重构为持续运行、可探索、可迁移、可阅读、可导览、可回访且可导出恢复的个人数字世界；静态、动态、静谧形态共享同一事实与权限投影；Gateway、Atlas、Timeline、Archive、Paths、Node、Lighthouse 在文字和背景位图隐藏后仍有可辨认、可操作的独立空间主体；河流、星图、灯光、道路、窗光、声景、昼夜和四季在进入动画结束后仍按真实时间、内容、关系、旅程和确定性信号自然推进；迁移必须有来源、途中、抵达、沉淀与返回上下文。

开始和每次恢复时严格按 AGENTS.md 顺序读取五份权威文件，再运行 node scripts/check-worldos-living-world-control.mjs；它只证明 CONTROL_INTEGRITY_PASS，不能证明产品完成。首次启动时把平台可见的 Goal ID（不可见则写 active-goal-unexposed）、goal_started_at、control_baseline_commit、task_state、active_record_id 和 resume_action 原子写入账本及 data/world-kernel/worldos-living-world-execution-state.json；恢复时校验二者。每个 `[x]` 必须在机器状态中绑定命令输出 hash、原始证据 hash 和唯一、可由 Git 反查的中文实现 commit hash / subject；状态确认可在紧随实现提交的账本提交中完成，不得复用另一任务的实现 commit。控制失败时不得修改 checksum 或冻结验收来放行。先读取 git status、最近提交、账本指针、上次假设与失败，从 next_item 继续，保护用户已有改动，不重做已提交且证据新鲜的任务。旧 Reality-First 的 LOCAL_WORLD_COMPLETE_AI_FALLBACK、C0-C9 勾选、旧 passed 报告、截图存在、DOM token、硬编码分数和短录屏均不能继承为新通过项。本 Goal 内不得新增 I、M、Phase、RC、下一轮、第二份执行计划或移动停止条件；任一检查点完成后自动进入下一项，不等待我重复确认。同一风险门连续三次完整实验失败时进入 BLOCKED_DESIGN_REVIEW_REQUIRED，停止自动实现并请求 Goal 外设计决策，不无限自旋。

严格执行四个风险门：一份真实公开内容只改事实源即可进入适用场景、灯塔、导出、恢复与回滚；Gateway -> Atlas -> Node -> Gateway 纵向样板必须持续十分钟并通过 hidden、quiet、background-hidden、mobile、reduced 与资源清理；Timeline 河流和一个世界音乐动机必须先通过连续、未剪辑、非重复拼接的 60-120 秒真实录屏和音频技术验证，失败时修正或删除原型，不复制错误；新场景和内容不得建立第二事实模型、第二权限、第二 clock/scheduler/AudioContext 或五处平行 registry。高风险假设必须在账本标为 Verified Fact、Frozen Decision、Hypothesis 或 Experiment；失败只能在同一目标内修正方案，不能降低用户结果。

开发保持 Next.js 模块化单体、Server Components 优先、World Kernel 与服务端公开投影为事实源。前端和 UI 必须读取并遵循 gsap-core 与 ui-ux-pro-max，使用现有“月下浮屿”世界观；静态位图只能是一层，语义对象、持续环境、交互、内容和静态 fallback 必须解耦。复用 React、GSAP、CSS、SVG/Canvas 2D、原生 View Transition/Web Audio/Page Visibility/Performance API、Fuse.js、Zod 和现有依赖；保持高内聚、低耦合、场景模块化、中文优先、轻量和性能预算。未经 ADR、可见体验收益、A/B trace、gzip/资产测量、mobile/JS-off/reduced 降级和删除路径，不新增 Three.js、R3F、PixiJS、D3、Sigma、XState、Howler、Tone、SQLite 等运行时依赖。

权限由服务端、事实契约与数据过滤控制，前端只体现；private、owner、vault、family、partner、sealed、silent 不得进入公开 HTML、RSC、JSON、索引、Canvas、localStorage、AI 上下文、截图、音频命名和本 Goal 的 public export。AI Key 只在服务端，灯塔只读，不写事实、不改权限和路径。没有合法 Provider 时完整实现并真实标记 low-light；不得安装重型模型或伪造 Provider、usage、模型名和实时 AI。声音默认关闭且用户手势前下载 0 B；程序化和文件音频都要有来源/许可、hash、峰值、接缝和技术验证。Codex 不能冒充人类耳机/扬声器听感；本 Goal 无论是否出现自报签收记录，最终状态都固定为 LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK_HUMAN_AUDIO_PENDING。

每项固定执行：控制校验与 git 状态 -> baseline -> 失败测试或可证伪观察 -> 最小完整实现 -> 定向检查 -> typecheck/lint -> fresh production build -> 新 next start -H 0.0.0.0 -> localhost/LAN 浏览器实测 -> desktop/mobile/text-hidden/background-hidden/quiet/reduced/JS-off/resource-failure -> 连续长录屏、必要 trace、音频技术验证与可选真实人类签收 -> 逐图逐段逐项真实审查 -> 修复 -> 更新计划 checkbox 和 ledger -> 中文提交 -> 自动继续。提交格式仅使用 feat(world)、fix(world)、refactor(world)、test(world)、docs(world) 加中文说明；保护用户改动，不执行破坏性 Git、不 push、不外部部署、不购买或获取秘密。

终局必须 fresh 运行 npm run typecheck、npm run lint、npm run build:production-ci、npm run check:world-experience、npm run check:mainline、npm run release:local-rc、node scripts/verify-worldos-living-world-final.mjs 和 git diff --check；完成 A-H、四个风险门、F1-F14、七段连续 60-120 秒场景视频、十分钟 soak、30 次迁移、时间/季节成对因果证据、完整迁移边清单、音频技术包与可选人类签收、内容新增与 export/restore、权限/AI/资产/性能/无障碍/故障审查。至少两轮修复后全量审查，终轮调用 fresh reality-auditor 或独立 reviewer，以随机顺序先看隐藏标题、导航、标签和报告状态的截图、background-hidden、长录屏、迁移和音频记录，再看报告；任一 Reality Matrix 行 fail/blocked、任一 P0/P1、任一冻结否决项、资源增长或证据 stale 时继续修复和重跑，不得以平均分抵消。

只有所有条件同时通过且最终证据晚于源码、数据、资产、构建和 server，才允许完成 Goal，并且最终状态固定为 LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK_HUMAN_AUDIO_PENDING。真实人类听感或 Provider 记录只作为 Goal 外待用户复核材料，当前 Goal 不得自动升级状态。不得声明完美、终局宇宙、无限扩展、长期陪伴已证明、完整私密世界、家庭继承或 LONG_LIVED_WORLD；这些需要未来真实用户、内容、权限和时间证据，不属于本 Goal。触发本 Goal 即批准控制包范围内的本地代码、数据 schema、视觉/音频资产、测试、报告、临时实验和中文 Git 提交；授权不含外部部署、购买、秘密获取、公开私密事实、破坏性 Git、push 或结束未知进程。
```

## CLI

CLI 中在完整 Objective 前添加：

```text
/goal <上面的完整 Objective>
```

只设置一次。使用 `/goal` 查看状态，使用 `/goal pause`、`/goal resume` 或 `/goal clear` 控制同一目标，不创建第二个 Goal。

## 启动后的第一项

Goal 必须立即：

1. 读取权威控制包。
2. 运行新控制校验。
3. 读取 Git 与 ledger。
4. 将 A-H 映射到执行计划，但只保留一个 `in_progress`。
5. 从 `A.1` 开始，或从 ledger 的第一项未完成任务继续。

Goal 最终输出只报告实际候选状态、证据 run、命令、AI 模式、权限 / 性能 / 资产 / 恢复事实、残余 P2、提交和工作树。不输出体验分或绝对完成表述。
