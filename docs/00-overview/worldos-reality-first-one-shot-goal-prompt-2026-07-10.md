# WorldOS Reality-First 一次性 Goal 提示词

> [!IMPORTANT]
> 这是唯一可用的 Goal 入口。只设置一次，不再按场景、检查点或轮次创建新 Goal。旧 `worldos-ultimate-one-shot-goal-prompt-2026-07-10.md` 已失效。

## 1. 为什么这样组织

Codex Goal 适合“一个持久目标 + 一个可验证停止条件 + 明确输入文件 + 持久进度日志”。官方建议 Goal 大于普通单轮任务，但小于松散 backlog，并在开始前规定不应修改什么、如何验证和何时停止。[Source: https://learn.chatgpt.com/codex/use-cases/follow-goals]

因此本 Goal：

- 只有一个产品目标，不把 C0-C9 当成多个 Goal。
- Objective 保持清楚，完整需求落在冻结仓库文档。
- 执行账本承担上下文压缩、恢复和多提交续跑。
- 完成条件是 Reality Matrix，而不是阶段勾选或脚本自评分。
- 用户触发即批准控制包范围内的本地开发和 Git 提交，不要求逐阶段确认。

## 2. 触发前状态

触发者只需确认：

- Codex 当前工作区是 `/Users/guyue/GitProject/World`。
- 当前任务能读取根目录 `AGENTS.md`。
- 使用下面 App 版或 CLI 版其中一个，不同时创建第二个 Goal。
- 暂不要求外部部署；实时 AI Key 未提供时接受诚实 low-light 模式。

## 3. Codex App Goal 输入

将下面整段作为一次 Goal 的 Objective，不加 `/goal`：

```text
以根目录 AGENTS.md 和 docs/00-overview/worldos-reality-first-control-contract-2026-07-10.md 为不可修改的最高总控，在当前工作区持续执行 docs/00-overview/worldos-reality-first-execution-plan-2026-07-10.md 的 C0-C9 全部任务，直到 docs/00-overview/worldos-reality-first-experience-acceptance-2026-07-10.md 的固定停止条件全部真实通过才结束。目标是把当前仍像“大标题 + 卡片 + 简单动态”的 WorldOS 重构为 localhost / LAN 上可进入、可探索、可迁移、可阅读、可导览、可回访的个人数字世界：静态形态在 JavaScript 关闭时仍可读可走，动态形态在同一事实源上渐进增强；Gateway、Atlas、Timeline、Archive、Paths、Node、Lighthouse 必须分别成为隐藏文字后仍可区分、具有独立主体和交互语法的空间；场景切换必须有来源、途中、抵达和上下文延续；公开页面不得展示 Motion Layer、Fallback、Evidence、场景证据、分数或其他工程验收文案。

开始及每次恢复时按 AGENTS.md 顺序读取六份权威文档，先运行 node scripts/check-worldos-reality-first-control.mjs 验证冻结锁，再从 docs/00-overview/worldos-reality-first-execution-ledger-2026-07-10.md 的第一项未完成任务继续；保护用户已有改动，不从头重做，不新增 M31/C10/下一轮，不在任一检查点完成后停止。控制契约、体验验收、架构和本提示词冻结，不得修改它们或 checksum 降低标准；执行计划只允许勾选已真实完成项，执行账本必须逐项记录失败、修复、命令、证据和中文 commit。触发本 Goal 即视为批准控制包范围内的本地代码、视觉资产、测试、报告和 Git 提交，无需逐阶段向我确认；该授权不含外部部署、购买、秘密获取、公开私密数据、破坏性 Git 操作或 push。

前端必须使用并遵循 gsap-core 与 ui-ux-pro-max 工作流，复用 Next.js、React、GSAP、SVG/Canvas、原生 View Transition/Web Audio、Zod 与现有事实源；保持高内聚低耦合、场景模块化、Server Components 优先、中文优先、轻量和性能预算。未经 ADR、可见收益、体积和降级证明，不新增 Three.js、R3F、D3、XState、Howler、Tone 等运行时依赖。权限由服务端/数据契约控制，前端只体现；AI Key 只在服务端，声音默认关闭。没有合法 Provider 凭据时完成低光灯塔和 provider-ready 边界，最终只能诚实标为 LOCAL_WORLD_COMPLETE_AI_FALLBACK，不得伪造实时 AI。

每个检查点都执行 baseline -> 实现 -> 定向测试 -> typecheck/lint -> fresh production build -> localhost/LAN 浏览器实测 -> desktop/mobile/reduced-motion/reduced-sensory 截图与必要录屏 -> 逐图/逐段真实视觉审查 -> 修复 -> 更新账本 -> 中文提交 -> 自动继续。旧 M29/M30 的 8.9、9/10、硬编码分数、报告 passed、截图存在和 DOM token 全部无效。最终必须 fresh 运行 check:world-experience、check:mainline、release:local-rc，完成九条流程录屏、text-hidden 场景辨识、权限/AI/资产/性能/无障碍审查，并调用 reality-auditor 或独立 fresh reviewer 先看截图录屏再看报告。Reality Matrix 任一行 fail/blocked、任一 P0/P1、任一冻结否决项或证据 stale 时继续修复和重跑；不得用平均分抵消失败。只有 C0-C9 全部勾选、两轮修复后全量视觉审查通过、所有 Reality Matrix 行为 pass、工程门禁通过且证据晚于最终源码和构建时，才允许标记 Goal complete；否则持续推进并据实记录。
```

## 4. CLI / slash 版

在支持 `/goal` 的 CLI 中，在上一节文本最前面添加：

```text
/goal <粘贴第 3 节完整 Objective>
```

即 `/goal` 后紧跟完整 Objective。不要再发送第二条 `/goal`。

## 5. 输入长度受限时的短版

```text
以 AGENTS.md 与 docs/00-overview/worldos-reality-first-control-contract-2026-07-10.md 为不可修改总控，持续执行 docs/00-overview/worldos-reality-first-execution-plan-2026-07-10.md 的 C0-C9，并从 reality-first execution ledger 跨上下文恢复。一次 Goal 完成全部本地/LAN开发、逐项检查、真实生产构建、浏览器交互、截图录屏、独立视觉审查、缺陷修复和中文提交；任一检查点后不得停止，也不得新增下一轮。目标是让 Gateway/Atlas/Timeline/Archive/Paths/Node/Lighthouse 成为隐藏文字后仍可区分、可操作且通过连续迁移连接的真实空间，清除公开工程文案和共享模板骨架。冻结验收标准不得自改；旧 M29/M30 分数和 passed 报告无效。只有 experience acceptance 的 Reality Matrix 全 pass、P0/P1=0、否决项=0、fresh check:world-experience/check:mainline/release:local-rc 通过且证据晚于最终源码/build 时才可 complete。无实时 AI 凭据时诚实完成 LOCAL_WORLD_COMPLETE_AI_FALLBACK，不伪造 Provider。
```

CLI 短版：在前面加 `/goal `。

## 6. Goal 启动后的第一轮动作

Goal 应立即执行，不再请求“是否开始”：

1. 读取 `AGENTS.md` 和六份权威文档。
2. 运行 `node scripts/check-worldos-reality-first-control.mjs`，确认冻结锁通过；执行者不得自行更新 checksum。
3. 检查 `git status --short --branch` 与最近提交。
4. 核对 ledger 当前指针和用户已有改动。
5. 使用 `update_plan` 映射 C0-C9，但只允许一个当前 in-progress。
6. 从 C0.1 开始；若 ledger 已前进，则从第一项未勾选任务继续。
7. 每 30-60 秒给出短进度更新，Goal 本身持续运行。

## 7. 自动续跑规则

- 用户问状态：先报告当前 checkpoint、最新 commit、通过命令、失败和下一项，然后继续。
- 上下文压缩：重新读取 ledger，不重新解释或重建路线。
- 检查失败：记录、修复、重跑，不跳过。
- 视觉仍像骨架：把该页面判 fail，保存对比图并回到对应 checkpoint。
- 端口占用：选择空闲端口，不结束未知进程。
- 工作树出现新改动：按用户改动处理，保护并在其上继续。
- Provider Key 缺失：不阻塞其他检查点，不安装重型本地模型，不伪造 live mode。
- 只有真正外部权限、秘密或用户事实缺失且无法用诚实 fallback 完成时，才按 Goal 机制记录 external blocker。

## 8. 最终输出要求

Goal 完成时只报告：

- 实际成熟度状态：`LOCAL_WORLD_COMPLETE_AI_FALLBACK` 或 `LOCAL_WORLD_COMPLETE_LIVE_AI`。
- 七类场景与九条流程的证据目录。
- 最终 fresh 命令结果。
- 实际 AI 模式、性能预算、权限和资产审查结果。
- 残余 P2 与明确限制。
- 最终提交哈希和工作树状态。

禁止报告数字体验分、完美、9/10、彻底终局或没有证据的“已成为真实宇宙”。
