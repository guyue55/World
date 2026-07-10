# WorldOS Reality-First 持久执行账本

> [!IMPORTANT]
> 这是单次 Goal 跨上下文、跨提交和自动续跑的唯一状态记录。恢复时先读冻结文档，再从本账本的“当前指针”继续。不得根据旧 M8-M30 报告猜测进度。

## 1. 当前指针

```yaml
goal_status: NOT_STARTED
product_status: FOUNDATION_ONLY
current_checkpoint: C0
current_item: C0.1
last_completed_checkpoint: null
baseline_commit: d34db104f5a0aa7e7e44168219c0df8c71a3e53c
baseline_commit_subject: "feat(world): 完成M30终局候选验收"
baseline_commit_truth: "工程提交存在，但其9/10体验结论已被真实视觉审查否决"
external_preview: frozen
production: frozen
live_ai_provider: unavailable
```

## 2. 启动环境

核对日期：2026-07-10（Asia/Shanghai）。

| 项 | 已确认状态 | 影响 |
| --- | --- | --- |
| 工作区 | `/Users/guyue/GitProject/World` | 正确 |
| 分支 | `codex/visual-overlay-qa` | 继续在当前分支执行 |
| 远端差异 | 启动准备前 ahead 8 | 不自动 push |
| Node.js | `v24.13.0` | 可运行当前脚本 |
| npm | `11.6.2` | 使用 `npm` |
| Playwright CLI | `1.58.0` | 可截图；复杂流程可复用 CDP recorder |
| Google Chrome | `150.0.7871.115` | 优先用于生产态实测 |
| ffmpeg | `6.0` | 可录屏与转码 |
| `OPENAI_API_KEY` | shell 未设置，仓库无本地 env | 不得声称实时 Provider 可用 |
| Ollama | 未检测到 | 不自动安装重型本地模型 |
| 部署 | localhost / LAN only | 不做外部发布 |

> [!NOTE]
> 版本信息可能随 Goal 启动时间变化。开始 C0 时重新记录实际值，但不得把工具升级当作产品推进。

## 3. 已确认基线缺陷

| ID | 严重度 | 事实 | 证据 | 状态 |
| --- | --- | --- | --- | --- |
| RF-001 | P0 | 旧 M30 硬编码八支柱分数 | `scripts/check-worldos-m30-ultimate-candidate.mjs` | open |
| RF-002 | P0 | `candidateScore` 被 threshold 强制托底 | 同上 | open |
| RF-003 | P0 | 核心场景共享同一个双栏 portal 模板 | `src/components/world/SceneWorldPortal.tsx` | open |
| RF-004 | P0 | Node 公开页显示 Motion Layer / Fallback / Evidence | M30 node-reading arrival | open |
| RF-005 | P0 | Timeline 主体仍是标题与信息卡，河道不是主交互 | M30 scene-migration arrival | open |
| RF-006 | P0 | Paths 是内容卡 + 进度侧栏，缺少行走空间 | M30 path-to-node arrival | open |
| RF-007 | P0 | Lighthouse 是 hero / CTA / 卡片，不是观测陪伴空间 | M30 lighthouse-guidance arrival | open |
| RF-008 | P1 | `public/` 缺少场景级 bitmap 资产 | `public/` inventory | open |
| RF-009 | P1 | 297 个 package scripts，旧自证入口仍在 mainline | `package.json` | open |
| RF-010 | P1 | 实时 AI Provider 不可用，当前仅 low-light | `/api/lighthouse/ask` 与环境预检 | conditional |

## 4. 检查点状态

| Checkpoint | 目标 | 状态 | Commit | 证据 run |
| --- | --- | --- | --- | --- |
| C0 | 废止假绿灯，建立真实基线 | pending | - | baseline-2026-07-10 |
| C1 | 视觉资产、token 与 scene primitives | pending | - | - |
| C2 | 世界壳与 Gateway | pending | - | - |
| C3 | Atlas 可探索地图 | pending | - | - |
| C4 | Timeline 与 Archive 独立空间 | pending | - | - |
| C5 | Paths 与 Node 连续旅程 | pending | - | - |
| C6 | 场景迁移与上下文延续 | pending | - | - |
| C7 | Lighthouse 与声景 | pending | - | - |
| C8 | 性能、无障碍、权限和证据入口 | pending | - | - |
| C9 | 多轮 Reality Audit 与终止 | pending | - | - |

状态只能使用：`pending`、`in_progress`、`failed`、`passed`、`blocked_external`。不得使用 `almost`、`basically complete` 或无证据百分比。

## 5. 逐项进度镜像

执行计划是任务定义，本节只记录当前指针，避免复制全部要求：

```yaml
completed_items: []
failed_items: []
blocked_items:
  - id: C7.6-live-provider
    reason: "仅在合法服务端凭据存在时验证；不阻塞 low-light 本地世界完成"
next_item: C0.1
```

每完成一个 item，立即：

1. 将执行计划对应 `[ ]` 改为 `[x]`。
2. 把 item id 追加到 `completed_items`。
3. 记录命令、证据和必要观察。
4. 若 checkpoint 结束，写 commit hash 并把 `next_item` 指向下一个 checkpoint。

## 6. 执行记录

### Record 000：Reality-First 准备

```yaml
checkpoint: PREP
status: passed
work:
  - "核对旧 M30 终局脚本，确认硬编码分数和阈值托底"
  - "真实查看五组 M30 关键截图，确认仍为博客 / dashboard 式骨架"
  - "核对公开 route、SceneWorldPortal、WorldShell、WorldRuntime 与 Lighthouse low-light 实现"
  - "联网调研 Codex Goal、GSAP、View Transition、Web Audio、Playwright、Next.js 与 Web Vitals"
evidence:
  - "docs/90-archive/reports/worldos-m30-recordings/**"
  - "scripts/check-worldos-m30-ultimate-candidate.mjs"
  - "src/components/world/SceneWorldPortal.tsx"
verification:
  - "node scripts/check-worldos-reality-first-control.mjs -> passed, 6 frozen files"
  - "plan structure audit -> 125 unique unchecked items, C0-C9 complete, Objective 1962 chars"
  - "npm run check:docs -> passed, docs=369, adr=6"
  - "npm run typecheck -> passed"
  - "npm run lint -> passed"
  - "npm run check:scripts -> passed, package scripts=297"
  - "npm run build:production-ci -> passed, 260 static pages, shared First Load JS=102 KB"
  - "Markdown local-link / whitespace / requirement coverage checks -> passed"
result: "旧终局结论失效；进入新控制包，尚未开始产品重构"
```

后续记录使用同一结构：

```yaml
checkpoint: Cx
item: Cx.y
status: passed | failed | blocked_external
started_at: ISO-8601
finished_at: ISO-8601
files_changed: []
commands:
  - command: "exact command"
    exit_code: 0
    observed: "实际结果"
evidence: []
failures: []
fixes: []
commit: "hash or null"
next_item: "Cx.z"
```

## 7. 失败日志

当前无 Reality-First 执行失败。发生失败时追加，不覆盖历史：

| Time | Item | Failure | Root cause | Fix | Rerun | Status |
| --- | --- | --- | --- | --- | --- | --- |

## 8. 证据新鲜度链

每个 production evidence run 必须记录：

```text
latest source/data mtime
  < build startedAt
  < build artifact mtime
  < server startedAt
  < first browser check
  <= screenshots / recordings
  < final audit generatedAt
```

任一步不满足：

- 将 run 标为 `stale`。
- 不删除旧历史，但不得用于当前完成声明。
- 从 fresh build 重新执行整个受影响 evidence run。

## 9. 提交记录

| Checkpoint | Commit | Message | Worktree after commit |
| --- | --- | --- | --- |
| PREP | pending | `docs(world): 建立真实世界一次性Goal控制包` | pending |

Goal 执行期间每个 checkpoint 新增一行。不得把多个未验证 checkpoint 合并成一个“全部完成”提交。

## 10. 终止决策

最终只按以下决策表处理：

| 条件 | 结论 |
| --- | --- |
| C0-C9 任一未通过 | `WORLD_EXPERIENCE_IN_PROGRESS`，继续 Goal |
| 任一核心 Reality Matrix 行 fail / blocked | 继续修复，不得新增下一轮编号 |
| 全部体验与工程门禁通过，Provider 不可用 | `LOCAL_WORLD_COMPLETE_AI_FALLBACK` |
| 全部体验与工程门禁通过，实时 Provider 也真实通过 | `LOCAL_WORLD_COMPLETE_LIVE_AI` |
| 需要外部部署或用户秘密才能继续 | 完成可控项并记录 external blocker，不擅自操作 |

禁止输出：`9/10`、`完美`、`终局宇宙已全部完成`、`彻底脱离骨架`。最终说明必须列实际模式、证据路径和残余限制。

## 11. 恢复检查

每次自动续跑前回答并写入最新 Record：

- 当前分支和工作树是什么？
- 最近一个 Reality-First commit 是什么？
- 第一项未勾选任务是什么？
- 上次失败是否已经有重跑证据？
- 当前证据是否晚于源码和 build？
- 是否出现用户新改动，需要保护或合并？
- 当前工作是否仍直接改善冻结验收项？

七项回答清楚后继续，不重新规划、不从 C0 重做、不暂停等待用户重复“继续”。
