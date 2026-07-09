# WorldOS 一次性 Goal 总提示词

> [!IMPORTANT]
> 本文档用于解决一个问题：只设置一次 Goal，让 Codex 持续完成 M8-M18 的所有阶段、任务、检查、修复和验收，直到 WorldOS 达到本地 / LAN 可运行的真格世界目标。它不是新的产品目标，而是 Goal 模式的总控提示词与执行协议。

> [!IMPORTANT]
> 2026-07-10 追加：后续 Goal 必须先读取真实视觉审查后的纠偏文档。不得再用“脚本通过”“统一壳存在”“页面无白屏”宣称世界体验完成。

> [!IMPORTANT]
> 2026-07-10 高目标追加：M8-M18 完成后只代表本地成熟世界 MVP+。若用户目标包含 8/10、9/10 或终局候选，必须继续读取并执行 M19-M30 高目标文档，不能把 MVP+ 误称终局宇宙。

> [!IMPORTANT]
> 终局体验必须覆盖八个支柱：每个场景像独立空间、切换像真实穿梭、内容像地点和生命体、AI 灯塔像真正陪伴者、音乐 / 氛围 / 视觉 / 交互形成统一世界观、用户愿意长期逛和回访、作者能持续养世界、验收真实可信。

## 1. 机制判断

结论：可以只设置一次 Goal，但不能把所有细节塞进 `/goal` 输入框。正确做法是：

1. `/goal` 只写短目标，并明确引用本文档。
2. 本文档承载完整执行协议、完成定义、阶段顺序、检查命令和停止条件。
3. 每个阶段结束后更新执行账本，避免上下文压缩或长任务恢复时跑偏。
4. 只有 M8-M18 全部完成并通过最终验收，才允许标记 Goal complete。

依据：

- Codex Goal 是持久目标，目标应包含完成条件、成功检查和约束。
- Codex App 可通过 `/goal` 启动 Goal，Codex 会持续工作直到完成、暂停或需要更多输入。
- Codex CLI 的 `/goal` objective 有长度限制；更长说明应放到文件里，再让 Goal 指向该文件。
- 长难任务应提供 eval / scripts / reviewable artifacts，让 Codex 迭代到达标。

参考：

- [Using Goals in Codex](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex)
- [Codex App Commands](https://developers.openai.com/codex/app/commands)
- [Codex CLI Slash Commands](https://developers.openai.com/codex/cli/slash-commands)
- [Prompting Codex](https://developers.openai.com/codex/prompting)
- [Iterate on difficult problems](https://developers.openai.com/codex/use-cases/iterate-on-difficult-problems)

## 2. 一次性 Goal Objective

在 Codex 中只设置一次以下 Goal：

```text
以 docs/00-overview/worldos-one-shot-goal-master-prompt-2026-07-09.md 为唯一总控，持续完成 WorldOS M8-M18 的所有开发、检查、修复、验收和中文提交。目标是把当前“骨架 + 简单动态”的 WorldOS 推进为 localhost / LAN 可运行、可探索、可迁移、可回看、可阅读、可导览、可维护的个人数字世界。不要在单个阶段完成后停止；只有 M8-M18 全部完成，且定向检查、npm run check:mainline、npm run release:local-rc、浏览器真实验收、人工体验量表全部通过，无白屏、遮挡、死链、权限泄漏、默认音频、前端 AI key、臃肿依赖和旧证据误判，才允许标记 Goal complete。若遇到失败，先按文档修复并重跑；若上下文压缩或恢复，先读取执行账本继续。
```

## 3. 总目标

在暂不考虑外部 Preview / Production 的前提下，完成 M8-M18：

- M8-M12：让世界体验真正可感知。
- M13-M18：让世界运行闭环真正可维护。

最终状态：

- Home 第一眼不是博客骨架。
- Atlas / Timeline / Archive / Paths 一眼可区分。
- Node 像地点，不只是文章详情。
- 场景迁移有来源、目标预告、抵达和沉淀。
- Lighthouse 像观测站，AI 只读、服务端、可审计、可回退。
- 氛围、音频、资产可选、可控、可降级、有授权和预算。
- 内容真实、足量、有关联，被多场景共享。
- 性能、依赖、移动端、reduced-motion、reduced-sensory 受控。
- localhost / LAN RC 能产生新鲜可信证据。
- 作者能用中文低门槛流程持续维护。

## 4. 必读入口

开始前必须阅读：

1. `docs/00-overview/worldos-real-visual-audit-record-2026-07-10.md`
2. `docs/00-overview/worldos-true-world-realization-gap-analysis-2026-07-10.md`
3. `docs/00-overview/worldos-true-world-global-standard-2026-07-10.md`
4. `docs/00-overview/worldos-true-world-research-documentation-and-execution-plan-2026-07-10.md`
5. `docs/00-overview/worldos-ultimate-experience-charter-2026-07-10.md`
6. `docs/00-overview/worldos-ultimate-world-ambition-roadmap-2026-07-10.md`
7. `docs/00-overview/worldos-ultimate-required-documentation-set-2026-07-10.md`
8. `docs/00-overview/worldos-ultimate-execution-plan-2026-07-10.md`
9. `docs/00-overview/worldos-ultimate-documentation-sufficiency-audit-2026-07-10.md`
10. `docs/00-overview/worldos-m19-m30-comprehensive-execution-master-plan-2026-07-10.md`
11. `docs/00-overview/worldos-complete-goal-mode-document-pack-2026-07-09.md`
12. `docs/00-overview/worldos-complete-goal-document-readiness-review-2026-07-09.md`
13. `docs/00-overview/worldos-full-goal-document-gap-analysis-2026-07-09.md`
14. `docs/00-overview/worldos-m8-m12-true-world-experience-master-plan-2026-07-09.md`
15. `docs/00-overview/worldos-m13-m18-complete-world-operation-master-plan-2026-07-09.md`
16. `docs/00-overview/worldos-quality-control-system-2026-07-09.md`
17. `docs/00-overview/worldos-human-experience-review-rubric-2026-07-09.md`
18. `docs/00-overview/worldos-performance-asset-budget-2026-07-09.md`
19. `docs/00-overview/worldos-tech-stack-and-open-source-research-2026-07-09.md`

## 5. 执行顺序

必须按顺序执行，不得跳阶段：

| 阶段 | 目标 | 计划文档 |
| --- | --- | --- |
| M8 | 世界入口与主舞台重塑 | `docs/00-overview/worldos-m8-world-gateway-main-stage-execution-plan-2026-07-09.md` |
| M9 | Atlas / Timeline / Archive / Paths 舞台化 | `docs/00-overview/worldos-m9-core-scene-stage-execution-plan-2026-07-09.md` |
| M10 | Node 地点化与沉浸阅读 | `docs/00-overview/worldos-m10-node-place-immersive-reading-execution-plan-2026-07-09.md` |
| M11 | 场景迁移叙事化 | `docs/00-overview/worldos-m11-narrative-scene-transition-execution-plan-2026-07-09.md` |
| M12 | 灯塔导览体验可感知化 | `docs/00-overview/worldos-m12-lighthouse-guidance-experience-execution-plan-2026-07-09.md` |
| M13 | 感官、音频与资产生产 | `docs/00-overview/worldos-m13-sensory-audio-asset-production-execution-plan-2026-07-09.md` |
| M14 | 灯塔 AI 运行化 | `docs/00-overview/worldos-m14-ai-lighthouse-operationalization-execution-plan-2026-07-09.md` |
| M15 | 内容世界生产 | `docs/00-overview/worldos-m15-content-world-production-execution-plan-2026-07-09.md` |
| M16 | 性能与依赖硬化 | `docs/00-overview/worldos-m16-performance-dependency-hardening-execution-plan-2026-07-09.md` |
| M17 | 本地 QA 与证据自动化 | `docs/00-overview/worldos-m17-local-qa-evidence-automation-execution-plan-2026-07-09.md` |
| M18 | 作者治理与运行运维 | `docs/00-overview/worldos-m18-authoring-governance-runtime-ops-execution-plan-2026-07-09.md` |
| M19-M30 | 高目标与终局候选 | `docs/00-overview/worldos-ultimate-world-ambition-roadmap-2026-07-10.md`、`docs/00-overview/worldos-ultimate-execution-plan-2026-07-10.md` |

## 6. 每阶段固定流程

每个阶段必须执行：

1. 阅读阶段计划和相关规格文档。
2. 审计当前实现与目标差距。
3. 制定本阶段短计划并写入执行账本。
4. 实施最小但完整的改动，保持高内聚、低耦合、模块化、页面化。
5. 运行阶段定向检查。
6. 运行 `npm run check:mainline`。
7. 运行 `npm run release:local-rc`。
8. 使用浏览器进行 localhost / LAN、desktop / mobile、reduced-motion / reduced-sensory 验收。
9. 生成真实截图，必要时录屏，并按人工体验量表判断是否仍像骨架。
10. 失败则修复并重跑，不得口头跳过。
11. 通过后中文 commit，格式 `feat(world): 中文说明`。
12. 更新执行账本，再进入下一阶段。

## 7. 执行账本

Goal 运行期间必须维护：

`docs/00-overview/worldos-one-shot-goal-execution-ledger-2026-07-09.md`

账本至少包含：

- 当前阶段。
- 已完成项。
- 失败命令和修复结果。
- 浏览器验收证据摘要。
- 人工体验判断。
- commit hash。
- 下一阶段入口。

如果上下文压缩、任务恢复或中途重新进入，必须先读取账本，再继续未完成阶段。

## 8. 硬性约束

- 暂时忽略上线，只支持 localhost / LAN。
- 不做外部 Preview / Production。
- 不要臃肿，统一化、轻量化，考虑加载速度。
- 优先中文、降低门槛、提高体验。
- 权限事实来自后端 / 数据契约，前端只做体现和显隐。
- 不前端持有 AI Provider Key。
- 不默认播放音频。
- 不为了世界感引入全站 3D。
- 不新增无来源、无授权、无预算的资产。
- 不用脚本通过替代人工体验达标。
- 不提交大量临时截图或无意义证据 diff。

## 9. 阻塞处理

遇到失败时：

1. 先定位原因。
2. 尝试最小修复。
3. 重跑失败命令和相关主线检查。
4. 把失败、修复、结果写入账本。

只有同一阻塞条件连续多轮无法绕开，且没有可继续推进的阶段内任务，才允许请求用户输入。不能因为单个阶段完成、单个检查通过或上下文变长而停止。

## 10. 最终完成定义

只有同时满足以下条件，才允许标记 Goal complete：

- M8-M18 全部完成。
- 每阶段对应计划文档要求均完成。
- `npm run check:mainline` 通过。
- `npm run release:local-rc` 通过。
- localhost / LAN 浏览器验收通过。
- desktop / mobile / reduced-motion / reduced-sensory 验收通过。
- 人工体验量表确认不再像骨架。
- 无白屏、遮挡、死链、权限泄漏、默认音频、前端 AI key。
- 新依赖、新资产、新 AI 能力都有理由、预算、降级和证据。
- 所有阶段已中文 commit。
- 执行账本完整记录最终结果。
