# WorldOS 终局版一次性 Goal 提示词

> [!CAUTION]
> **本文档已经失效，不得再用于启动 Goal。** 旧 M29 / M30 验收以硬编码分数、阈值托底、文件存在和 DOM token 形成了自证循环，而真实截图仍显示博客式骨架。新的唯一入口是 `docs/00-overview/worldos-reality-first-one-shot-goal-prompt-2026-07-10.md`，完成口径由冻结 Reality-First 控制包决定。

> [!IMPORTANT]
> 本文档用于在 Codex Goal 模式中只设置一次目标，让 Codex 持续完成 WorldOS M8-M30 的开发、检查、修复、验收和中文提交。它取代旧的 M8-M18 版本，覆盖本地成熟世界 MVP+ 与 9/10 终局候选两层目标。

> [!NOTE]
> 本文档是 Goal 模式最终入口文档。Goal 输入框只放第 3 节或第 4 节的一段话；其余细节由 Codex 在执行时读取本文档和关联文档。这样符合 Codex Goal 的工作方式：Objective 保持短而明确，长约束、验收标准、阶段计划和恢复协议落在仓库文档里。

## 1. Codex 机制判断

基于官方资料，Goal 模式适合这个任务，但必须控制输入方式：

| 机制 | 对本项目的要求 |
| --- | --- |
| `/goal` 适合一个可持续推进的持久目标 | 目标必须明确“直到 M8-M30 完成才结束” |
| Goal 文本同时是起始提示和完成标准 | 不能只写“继续做”，必须写清完成定义 |
| 长难任务需要评估系统和可复查 artifact | 必须使用脚本、截图、录屏、人工量表、执行账本 |
| Objective 不宜承载所有细节 | 细节放在本文档，Goal 输入引用本文档；CLI Goal 文本必须控制在 4000 字符内 |
| 长任务可能恢复或压缩上下文 | 每阶段必须维护执行账本 |
| Goal 可以被暂停、恢复、查看或编辑 | 任何恢复都必须先读执行账本，不得从头臆测 |

官方参考：

- https://developers.openai.com/codex/use-cases/follow-goals
- https://developers.openai.com/codex/app/commands
- https://developers.openai.com/codex/cli/slash-commands
- https://developers.openai.com/codex/prompting
- https://developers.openai.com/codex/use-cases/iterate-on-difficult-problems

## 2. 推荐输入方式

如果 Codex App 提供 Goal 输入框，复制 **不含 `/goal` 前缀** 的版本。  
如果在 CLI / slash command 中使用，复制 **含 `/goal` 前缀** 的版本。

使用原则：

- 只设置一次 Goal。
- 后续不要再改成阶段性 Goal。
- 需要补充要求时，用普通消息 steer 当前 Goal，而不是重置目标。
- 如果 Codex 中途恢复或上下文压缩，继续执行本文档和执行账本，不重新解释目标。
- 如果目标明显跑偏，先要求它重新读取本文档、执行账本和当前阶段文档，再继续。

## 3. 推荐 Goal 输入：App 版

```text
以 docs/00-overview/worldos-ultimate-one-shot-goal-prompt-2026-07-10.md 为唯一总控，持续完成 WorldOS M8-M30 的所有开发、检查、修复、验收和中文提交。目标是把当前“骨架 + 简单动态”的 WorldOS 推进为 localhost / LAN 可运行、可探索、可迁移、可回看、可阅读、可导览、可维护，并具备 9/10 终局候选条件的个人数字世界。不要在单个阶段或 M8-M18 完成后停止；M8-M18 只能算本地成熟世界 MVP+，必须继续 M19-M30。开始和每次恢复时先读本文档、执行账本和当前阶段文档，确认已完成项后接着做。只有 M8-M30 全部完成，八个终局体验支柱均有真实证据，定向检查、npm run check:mainline、npm run release:local-rc、生产态截图、必要录屏、人工体验量表、权限边界、性能预算、资产授权、AI 安全和作者维护演练全部通过，且无白屏、遮挡、死链、权限泄漏、默认音频、前端 AI key、臃肿依赖和旧证据误判，才允许标记 Goal complete。若失败，按文档修复并重跑；不要用“脚本通过”替代真实视觉审查和体验判断。
```

## 4. 推荐 Goal 输入：CLI / slash 版

```text
/goal 以 docs/00-overview/worldos-ultimate-one-shot-goal-prompt-2026-07-10.md 为唯一总控，持续完成 WorldOS M8-M30 的所有开发、检查、修复、验收和中文提交。目标是把当前“骨架 + 简单动态”的 WorldOS 推进为 localhost / LAN 可运行、可探索、可迁移、可回看、可阅读、可导览、可维护，并具备 9/10 终局候选条件的个人数字世界。不要在单个阶段或 M8-M18 完成后停止；M8-M18 只能算本地成熟世界 MVP+，必须继续 M19-M30。开始和每次恢复时先读本文档、执行账本和当前阶段文档，确认已完成项后接着做。只有 M8-M30 全部完成，八个终局体验支柱均有真实证据，定向检查、npm run check:mainline、npm run release:local-rc、生产态截图、必要录屏、人工体验量表、权限边界、性能预算、资产授权、AI 安全和作者维护演练全部通过，且无白屏、遮挡、死链、权限泄漏、默认音频、前端 AI key、臃肿依赖和旧证据误判，才允许标记 Goal complete。若失败，按文档修复并重跑；不要用“脚本通过”替代真实视觉审查和体验判断。
```

## 5. 短版 Goal 输入

如果输入框长度受限，使用短版：

```text
以 docs/00-overview/worldos-ultimate-one-shot-goal-prompt-2026-07-10.md 为唯一总控，持续完成 WorldOS M8-M30 的全部开发、检查、修复、验收和中文提交。M8-M18 只算本地成熟世界 MVP+，不得停止；必须继续 M19-M30，直到八个终局体验支柱均有真实截图/录屏/检查/人工量表证据，并通过 check:mainline、release:local-rc、权限、性能、资产、AI、安全和作者维护验收，才允许标记 Goal complete。失败先修复重跑；恢复时先读执行账本。
```

CLI 短版：

```text
/goal 以 docs/00-overview/worldos-ultimate-one-shot-goal-prompt-2026-07-10.md 为唯一总控，持续完成 WorldOS M8-M30 的全部开发、检查、修复、验收和中文提交。M8-M18 只算本地成熟世界 MVP+，不得停止；必须继续 M19-M30，直到八个终局体验支柱均有真实截图/录屏/检查/人工量表证据，并通过 check:mainline、release:local-rc、权限、性能、资产、AI、安全和作者维护验收，才允许标记 Goal complete。失败先修复重跑；恢复时先读执行账本。
```

## 5.1 输入前自检

设置 Goal 前确认：

- 当前工作区是 `/Users/guyue/GitProject/World`。
- 文档入口存在：`docs/00-overview/worldos-ultimate-one-shot-goal-prompt-2026-07-10.md`。
- 执行账本存在：`docs/00-overview/worldos-one-shot-goal-execution-ledger-2026-07-09.md`。
- Goal 仍然是本地 / LAN 成熟体验，不做外部 Preview / Production。
- Goal 不是“写完文档”，而是“按文档完成 M8-M30 真实实现和验收”。

## 6. Goal 启动后必须阅读的文档

Codex 启动 Goal 后必须按顺序读取：

1. `docs/00-overview/worldos-ultimate-one-shot-goal-prompt-2026-07-10.md`
2. `docs/00-overview/worldos-complete-goal-mode-document-pack-2026-07-09.md`
3. `docs/00-overview/worldos-real-visual-audit-record-2026-07-10.md`
4. `docs/00-overview/worldos-true-world-realization-gap-analysis-2026-07-10.md`
5. `docs/00-overview/worldos-true-world-global-standard-2026-07-10.md`
6. `docs/00-overview/worldos-true-world-research-documentation-and-execution-plan-2026-07-10.md`
7. `docs/00-overview/worldos-ultimate-experience-charter-2026-07-10.md`
8. `docs/00-overview/worldos-ultimate-world-ambition-roadmap-2026-07-10.md`
9. `docs/00-overview/worldos-ultimate-required-documentation-set-2026-07-10.md`
10. `docs/00-overview/worldos-ultimate-execution-plan-2026-07-10.md`
11. `docs/00-overview/worldos-ultimate-documentation-sufficiency-audit-2026-07-10.md`
12. `docs/00-overview/worldos-m19-m30-comprehensive-execution-master-plan-2026-07-10.md`
13. `docs/00-overview/worldos-one-shot-goal-execution-ledger-2026-07-09.md`

然后根据当前阶段读取对应阶段文档。

## 7. 阶段顺序

必须按顺序推进，不得跳阶段。若执行账本显示某阶段已真实完成且已提交，可从下一个未完成阶段继续；但不得因为文档存在或脚本存在就判定完成：

| 阶段 | 目标 | 完成口径 |
| --- | --- | --- |
| M8 | 世界入口与主舞台 | 首页不再像博客骨架 |
| M9 | 四大核心场景舞台化 | Atlas / Timeline / Archive / Paths 一眼可区分 |
| M10 | Node 地点化阅读 | 节点像地点，不只是文章 |
| M11 | 场景迁移叙事化 | 页面跳转像迁移 |
| M12 | 灯塔导览体验 | 灯塔像观测站 |
| M13 | 感官、音频与资产 | 默认静音、可选、可降级 |
| M14 | 灯塔 AI 运行化 | 服务端只读、可审计、可回退 |
| M15 | 内容世界生产 | 内容被多场景吸收 |
| M16 | 性能与依赖硬化 | 不臃肿，有预算 |
| M17 | 本地 QA 与证据自动化 | 截图 / 浏览器 / RC 证据新鲜可信 |
| M18 | 作者治理与运行运维 | 中文低门槛维护 |
| M19 | 场景主体深度交互 | 每个场景像独立空间 |
| M20 | 世界空间连续性 | 切换像真实穿梭 |
| M21 | 内容生命循环 | 内容像地点和生命体 |
| M22 | 灯塔 AI 深度导览 | AI 像真正陪伴者 |
| M23 | 感官音频资产生产 | 音乐、氛围、视觉、交互统一 |
| M24 | 高级可视化试点 | D3 / Canvas / 3D 等只在收益证明后进入 |
| M25 | 作者世界编辑台 | 作者可持续养世界 |
| M26 | 世界记忆与回访 | 用户愿意长期逛、回访、探索 |
| M27 | 多层权限与私密宇宙 | 公开 / 私密 / owner 边界可靠 |
| M28 | 长期运行观测回滚 | 长期运行可观测、可回滚 |
| M29 | 高保真体验打磨 | 从能用到想逛 |
| M30 | 终局候选验收 | 判断是否达到 9/10，列出未达 10/10 缺口 |

## 8. 每阶段固定执行循环

每个阶段必须执行：

1. 读取总控、阶段文档和执行账本。
2. 截取当前生产态 baseline。
3. 写入本阶段短计划和验收清单。
4. 只做与阶段目标相关的最小完整改动。
5. 保持高内聚、低耦合、模块化、页面化。
6. 运行定向检查。
7. 运行：

```bash
npm run typecheck
npm run lint
npm run build:production-ci
npm run check:mainline
```

8. 大阶段完成后运行：

```bash
npm run release:local-rc
```

9. 使用浏览器进行 localhost / LAN、desktop / mobile、reduced-motion / reduced-sensory 验收。
10. 生成真实截图，必要时录屏。
11. 按人工体验量表判断是否仍像骨架。
12. 失败则修复并重跑，不得跳过。
13. 中文提交，格式 `feat(world): 中文说明`、`fix(world): 中文说明` 或 `docs(world): 中文说明`。
14. 更新执行账本。
15. 进入下一阶段。

每阶段还必须更新 `docs/00-overview/worldos-one-shot-goal-execution-ledger-2026-07-09.md`，至少记录：

- 阶段状态。
- 关键改动。
- 真实截图 / 录屏 / 报告路径。
- 通过的命令。
- 失败与修复。
- 提交哈希。
- 下一阶段入口。

## 9. 八个终局体验支柱

M30 之前必须全部有证据：

1. 每个场景像独立空间。
2. 切换像真实穿梭。
3. 内容像地点和生命体。
4. AI 灯塔像真正陪伴者。
5. 音乐、氛围、视觉、交互形成统一世界观。
6. 用户愿意长期逛、回访、探索。
7. 作者能持续养世界。
8. 验收真实可信。

## 10. 硬性约束

- 暂时忽略上线，只支持 localhost / LAN。
- 不做外部 Preview / Production。
- 不要臃肿，统一化、轻量化，考虑加载速度。
- 优先中文、降低门槛、提高体验。
- 权限事实来自后端 / 数据契约，前端只做体现和显隐。
- 不前端持有 AI Provider Key。
- 不默认播放音频。
- 不为了世界感引入全站 3D。
- 不新增无来源、无授权、无预算的资产。
- 新依赖必须有 ADR、收益证明、预算和降级。
- 不用脚本通过替代人工体验达标。
- 不提交大量临时截图或无意义证据 diff。

## 11. 失败与恢复协议

遇到失败：

1. 记录失败命令、截图或录屏位置。
2. 定位原因。
3. 做最小修复。
4. 重跑失败项。
5. 若影响主线，重跑 `check:mainline`。
6. 写入执行账本。

上下文压缩、重启、恢复时：

1. 先读本文档。
2. 再读执行账本。
3. 找到当前阶段、失败点和下一步。
4. 继续推进，不从头开始。

Goal 模式续跑守则：

- 如果已有未提交改动，先识别来源，不得回滚用户改动。
- 如果上一阶段已经提交，先从执行账本找到下一个未完成阶段。
- 如果验证报告存在但时间早于源码变更，视为旧证据，必须重跑。
- 如果页面视觉仍像骨架，必须截图/录屏定位具体页面和具体缺陷，再修复。
- 如果用户只问状态，先真实汇报当前阶段、已过命令、失败点和下一步，然后继续推进。

## 12. 完成定义

只有同时满足以下条件，才允许 Goal complete：

- M8-M30 全部完成。
- 每个阶段计划文档要求均完成。
- 八个终局体验支柱均有真实证据。
- `npm run check:mainline` 通过。
- `npm run release:local-rc` 通过。
- localhost / LAN 浏览器验收通过。
- desktop / mobile / reduced-motion / reduced-sensory 验收通过。
- 生产态截图和必要录屏完整。
- 人工体验量表确认不再像骨架。
- 无白屏、遮挡、死链、权限泄漏、默认音频、前端 AI key。
- 新依赖、新资产、新 AI 能力都有理由、预算、降级和证据。
- 作者维护演练通过。
- M30 最终报告列出当前评分、通过证据、未达 10/10 的缺口、P0/P1/P2 缺陷清单和下一轮路线。
- 所有阶段已中文 commit。
- 执行账本完整记录最终结果。

## 13. 不允许的完成声明

不得因为以下情况说完成：

- 某个阶段文档写完。
- 某个脚本通过。
- 截图没有白屏。
- 页面有高级视觉。
- 引入了 3D、音频或 AI。
- M8-M18 完成。
- M19-M30 有路线但没有实现和证据。

只有 M30 验收完成，且缺陷清单没有 P0/P1 阻塞，才能称为 9/10 终局候选。
