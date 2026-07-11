# WorldOS 生命世界持久执行账本

> [!IMPORTANT]
> 本账本是一次性 Goal 跨轮、跨压缩和跨提交恢复的唯一状态源。它记录事实、假设、失败和证据，不具有自行降低验收或宣布完成的权力。

## 1. 当前指针

```yaml
control_status: READY_PENDING_GIT_ANCHOR
goal_status: NOT_STARTED
goal_id: not-created
goal_started_at: null
control_baseline_commit: unanchored
product_status: CINEMATIC_STATIC_WORLD_IN_PROGRESS
target_status: LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK_HUMAN_AUDIO_PENDING
current_checkpoint: A
current_item: A.1
task_state: pending
active_record_id: none
last_successful_command: "npm run build:production-ci"
resume_action: "start A.1"
last_completed_item: none
live_ai_provider: unavailable
external_preview: out_of_scope
production: out_of_scope
long_lived_world: unproven_by_definition
same_external_blocker_streak: 0
same_design_gate_failure_streak: 0
blocker_kind: none
final_evidence_run: null
final_source_commit: null
final_build_hash: null
independent_review_1_id: null
independent_review_1_started_at: null
independent_review_2_id: null
independent_review_2_started_at: null
human_audio_signoff: pending_external
execution_state_path: data/world-kernel/worldos-living-world-execution-state.json
```

## 2. 当前工作区事实

| 项 | 已核验事实 | 影响 |
| --- | --- | --- |
| 工作区 | `/Users/guyue/GitProject/World` | 正确 |
| 分支 | `codex/visual-overlay-qa` | 当前继续，不自动 push |
| 文档准备前工作树 | clean | 新包变更可独立提交 |
| 旧控制锁 | 原历史 commit 曾通过；新 `AGENTS.md` 生效后预期 superseded failure | 不更新旧 checksum 伪造双绿 |
| 旧产品结论 | `LOCAL_WORLD_COMPLETE_AI_FALLBACK` | 已撤销当前完成效力 |
| 最新场景证据 | `run-2026-07-11_07-28-49-583Z` | 作为反基线，不作新通过项 |
| 旧录屏时长 | 1.72s 至 10.16s | 不能证明持续生命 / soak |
| 时间运行 | 首次挂载计算一次 | 生命时钟未建立 |
| 场景主体 | 静态 WebP + 热点为主 | background-hidden 必须重验 |
| 声音 | 无音频文件，程序化 patch | 未完成真实长期试听 |
| AI | low-light，无合法 Provider | 默认 fallback 目标 |
| 部署 | localhost / LAN only | 外部发布不在范围 |

## 3. 基线 Reality Matrix

| Claim | 当前证据 | Verdict | 说明 |
| --- | --- | --- | --- |
| 七场景图片可区分 | desktop / text-hidden contact sheet | partial | 构图不同，但高度依赖位图 |
| 场景主体独立于背景 | 尚无 background-hidden 完整证据 | fail | 不能继承旧 pass |
| 世界时间持续推进 | `WorldRuntimeProvider` 首次挂载逻辑 | fail | 页面停留中不更新 |
| Atlas 持续生命 | 静态 picture + 聚焦 GSAP | fail | 无 60-120 秒证明 |
| Timeline 河流持续流动 | 静态 picture + 事件切换 | fail | 画面有河不等于河流运行 |
| Archive / Node 安静运行 | 短录屏 | unclear | 缺长时与背景隐藏证据 |
| Lighthouse 持续扫光 | 4.8s repeat GSAP | partial | 有样板，未统一生命周期 |
| 场景迁移有叙事连续性 | 1.72s 迁移录屏 | partial | 不能证明所有路线、沉淀与恢复 |
| 声景 / 音乐统一 | 程序化 patch、无真实音频 | fail | 缺真实试听与世界动机 |
| 内容一次更新进入全世界 | 旧 authoring / projection 报告 | unclear | 需真实节点与导出恢复重验 |
| Lighthouse 是陪伴者 | low-light UI / 短流程 | partial | 边界正确，陪伴体验尚浅 |
| 长期回访价值 | 无真实用户长期试用 | unproven | 不属于当前 Goal 可完成声明 |
| 工程构建 / LAN | 旧 RC | historical | 新源码后必须 fresh 重跑 |

## 4. 冻结决策

| ID | 决策 | 理由 |
| --- | --- | --- |
| D-01 | 当前 Goal 只交付本地生命世界候选 | Goal 需要单一可验证停止条件 |
| D-02 | 旧 Reality-First 完成不继承 | 用户体验与长时证据否定该前提 |
| D-03 | 先做内容门和三场景纵向样板 | 防止错误架构复制到七场景 |
| D-04 | 现有栈优先，新依赖按证据准入 | 主要问题不是缺引擎 |
| D-05 | 静态位图保留为一层，不再承担全部主体 | 保留资产价值，同时摆脱热点骨架 |
| D-06 | 权限继续由服务端 / 事实投影控制 | LAN 与前端身份不构成授权 |
| D-07 | AI 缺席不阻塞世界，默认 low-light | 当前没有合法 Provider |
| D-08 | 只借用保存标准的必要原则 | 避免 OCFL / PREMIS 机构级过度实现 |
| D-09 | 私密世界和继承只保留不锁死底座 | 当前公开体验仍是最高风险 |
| D-10 | 不新增下一轮 / 第二计划 | 防止终点继续移动 |

## 5. 待证伪假设

| ID | Hypothesis | Experiment | Pass | Fail / 删除路径 | 状态 |
| --- | --- | --- | --- | --- | --- |
| H-01 | 现有栈足以驱动三场景十分钟生命样板 | C.1-C.13 | 性能、视觉、清理和静态全部过门 | 简化效果；有 trace 才进入 ADR | pending |
| H-02 | Timeline SVG 合成层足以表达河流 | E.1-E.3 | mobile p95、可访问、流向和代码复杂度优于 Canvas | 删除 SVG prototype，采用 Canvas 2D | pending |
| H-03 | 原生 Web Audio 足够完整声景 | C.9、G.1-G.3 | 生命周期、crossfade、技术验证和资产治理通过；人类签收独立记录 | 有复杂度证据才评估 Howler / Tone | pending |
| H-04 | 当前 Context 可渐进适配 Runtime | C、D | profiler 和十分钟运行满足预算 | 迁移极小 `useSyncExternalStore` store | pending |
| H-05 | 现有 bitmap 可作为空间底层继续复用 | C、E background-hidden | 关图后语义与交互仍成立 | 重切 / 重制分层资产，不继续堆 overlay | pending |
| H-06 | 词法 + 图关系足够 Lighthouse 候选 | G.4-G.5 | 中文依据、下一站、拒答通过 | 优化检索；不先装向量数据库 | pending |

执行时每个假设更新为 `passed`、`failed-revised` 或 `rejected-removed`，不得使用 `probably`。

## 6. 风险门

| Gate | 对应计划 | 当前状态 | 通过证据 |
| --- | --- | --- | --- |
| 内容投影门 | B | pending | 真实节点、六投影、export、restore、rollback |
| 生命样板门 | C | pending | 十分钟 soak、3 长录屏、hidden / quiet / background-hidden |
| 感官原型门 | E | pending | Timeline 河流视频、音频技术包、可选人类签收、mobile trace |
| 扩展门 | D / E | pending | 单 manifest、单 lifecycle、新场景无五处修改 |

## 7. 检查点状态

| Checkpoint | 目标 | 状态 | Commit | Evidence |
| --- | --- | --- | --- | --- |
| A | 撤销继承式完成与新鲜基线 | pending | null | null |
| B | 一份事实长成整个世界 | pending | null | null |
| C | 三场景生命纵向样板 | pending | null | null |
| D | 唯一生命运行内核 | pending | null | null |
| E | 七场景生命与感官原型 | pending | null | null |
| F | 迁移、深链与回访 | pending | null | null |
| G | 声景、灯塔、内容与主权 | pending | null | null |
| H | 规模、故障与终局真实审查 | pending | null | null |

允许状态：`pending`、`in_progress`、`failed`、`passed`、`blocked_external`。`passed` 必须有当前源码后的 evidence 和 commit。同一个真正外部或方向阻断连续三个 Goal turn 出现、且已无可继续的有意义工作时，才允许进入 `blocked_external`；单次原型失败不构成阻断。

同一风险门连续三次完整实验失败时，记录 `blocker_kind: design-review-required`、`goal_status: BLOCKED` 和最后失败假设，结论为 `BLOCKED_DESIGN_REVIEW_REQUIRED`。只有用户在 Goal 外给出方向决策后才恢复；不得自动加第四个同类实验或降低 Gate。

## 8. 逐项进度

```yaml
completed_items: []
failed_items: []
blocked_items:
  - id: G.5-live-provider
    reason: "只有合法 Provider 凭据存在时验证；不阻塞 fallback 候选"
  - id: G.3-human-audio-signoff
    reason: "Codex 只完成音频技术验证；无真实人类签收时不阻塞自动 Goal，但最终状态必须保留 HUMAN_AUDIO_PENDING"
next_item: A.1
```

每完成一项立即：

1. 将执行计划对应 `[ ]` 改为 `[x]`。
2. 追加 `completed_items`。
3. 记录事实、假设结果、命令、证据和缺陷。
4. 检查点结束时记录 commit，并把 `next_item` 指向第一项未完成任务。

## 9. 准备记录

### Record PREP-001：元总控重建

```yaml
status: passed
date: 2026-07-11
scope: "仅控制包、调研与真实基线，不实现产品代码"
verified_facts:
  - "旧控制锁通过，但只证明文本未漂移"
  - "旧执行计划 C0-C9 全勾选，用户体验仍否定完成"
  - "七场景主视觉以静态 WebP + hotspot 为主"
  - "WorldRuntimeProvider 只在首次挂载计算 dayPeriod / season"
  - "九段旧录屏时长为 1.72s-10.16s"
  - "public 无音频文件，AI 为 low-light"
  - "机器验收不能替代真实人类耳机与扬声器听感签收"
research:
  - "W3C user-first / minimize data / simple solutions"
  - "Ink & Switch local-first ownership and export"
  - "OCFL / PREMIS / NDSA preservation principles"
  - "MDA outcome-dynamics-mechanics"
  - "NIST AI RMF continuous governance"
  - "Codex Goal requires one durable objective and verifiable stop"
decision: "META_CONTROL_REDESIGNED; implementation not started"
verification: "frozen machine acceptance contract and independent final verifier prepared"
next_item: A.1
```

### Record PREP-002：攻击性复核与机器约束

```yaml
status: passed
date: 2026-07-11
scope: "控制包反证、原始证据回算和自动 Goal 信任边界"
independent_review_tasks:
  - "019f4ede-46e5-7503-b09c-51615d7cc355"
  - "019f4fae-95fa-7733-a75f-499c3c5f1b82"
findings_fixed:
  - "pending control anchor 改为 bootstrap + 两提交 Git 锚定"
  - "checkbox 增加 execution-state 命令 / 证据 hash 与 Git commit subject 绑定"
  - "evidence manifest 降为索引，终局校验器回算 13 类原始 artifact"
  - "视频增加真实时长、packet 连续性、抽帧唯一性和 symlink 边界"
  - "迁移从原始边清单计算 uncovered，性能从原始数组计算预算"
  - "权限使用冻结 canary 重扫真实产物，public export 执行独立临时恢复"
  - "reviewer 使用两个只读 task 独立报告、盲审包和 hash；明确仅是程序性身份边界"
  - "人类音频与 Provider 晋级移出本 Goal，自动状态固定保留 HUMAN_AUDIO_PENDING"
  - "同一风险门三次完整失败后进入 BLOCKED_DESIGN_REVIEW_REQUIRED"
commands:
  - "node scripts/verify-worldos-living-world-final.mjs --contract-only -> pass"
  - "npm run check:docs -> pass"
  - "npm run typecheck -> pass"
  - "npm run lint -> pass"
  - "npm run check:scripts -> pass"
  - "npm run build:production-ci -> pass"
  - "npm run check:world-experience -> expected stale failure"
  - "npm run check:mainline -> expected stop at stale world experience"
decision: "CONTROL_PACKAGE_HARDENED; product implementation still not started"
next_item: A.1
```

## 10. 后续记录模板

```yaml
record: LW-<sequence>
checkpoint: A-H
item: A.1-H.16
status: passed | failed | blocked_external
started_at: ISO-8601
finished_at: ISO-8601
verified_facts: []
hypothesis:
  id: H-xx | null
  result: passed | failed-revised | rejected-removed | null
files_changed: []
commands:
  - command: "exact command"
    exit_code: 0
    observed: "actual output, not expected output"
evidence: []
failures: []
fixes: []
commit: "hash or null"
next_item: "A.1-H.16 or none"
```

## 11. 失败日志

失败记录必须追加，不覆盖：

| Time | Item | Failure | Root cause | Decision / Fix | Rerun | Status |
| --- | --- | --- | --- | --- | --- | --- |
| preparation | old completion | 短录屏和静态图被解释为完整世界 | 执行者、检查器和审查结论形成自证闭环 | 新包撤销继承式完成，增加长录屏 / background-hidden / 风险门 | A | open |
| preparation | control review | evidence manifest、checkbox、reviewer ID 与人类签收仍可自报 | 冻结包缺少原始 artifact 回算与可审计执行状态 | 增加 13 类原始证据、execution state、只读报告、固定待签状态和 Git anchor | PREP-002 | fixed |
| preparation | active experience gate | 当前证据早于新控制源码，`check:world-experience` 与 mainline 失败 | 新包合法使旧 run stale | 保留失败；A.2 只用 fresh build 生成新 baseline，不回填旧报告 | A.2 | expected-open |

## 12. 证据新鲜度

最终证据链必须满足：

```text
latest source / data / asset mtime
  < build startedAt
  <= build artifact mtime
  < server startedAt
  < first browser action
  <= screenshots / recordings / traces / listening record
  < final audit generatedAt
```

任一步不满足，受影响 run 标记 stale。旧 run 保留历史，但不能用于当前 pass。

## 13. 恢复检查

每次 Goal 自动续跑先回答并记录：

- 当前分支和工作树是什么？
- 新控制校验是否通过？
- 最近一个 Living World commit 是什么？
- 第一项未勾选任务是什么？
- 上次假设、失败和修复结果是什么？
- 当前证据是否晚于源码、数据、资产和 build？
- 是否出现用户新改动，需保护或在其上继续？
- 当前动作是否直接改善冻结用户结果，还是只增加基础设施？

答完从 `next_item` 继续，不从 A 重做，不新建计划，不等待用户重复“继续”。

## 14. 完成决策

| 条件 | 结论 |
| --- | --- |
| A-H 任一未通过 | `CINEMATIC_STATIC_WORLD_IN_PROGRESS` 或 `LIVING_WORLD_IN_PROGRESS` |
| 任一风险门 / 核心体验 fail | 继续修复 |
| 全部自动验证通过，但无真实人类音频签收 | `LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK_HUMAN_AUDIO_PENDING` |
| 真实人类音频签收记录存在 | 本 Goal 仍保持待签后缀；用户 Goal 外复核后才可批准无后缀状态 |
| 合法 Provider 与人类记录均存在 | 本 Goal 仍不晋级；用户 Goal 外复核后才可批准 Provider 状态 |
| 长期用户 / 内容 / 保存证据不足 | 不影响候选，但不得声明 `LONG_LIVED_WORLD` |

禁止输出：完美、终局宇宙、无限扩展、长期陪伴已证明、所有目标都完成、数字体验分。
