# WorldOS 生命世界持久执行账本

> [!IMPORTANT]
> 本账本是一次性 Goal 跨轮、跨压缩和跨提交恢复的唯一状态源。它记录事实、假设、失败和证据，不具有自行降低验收或宣布完成的权力。

## 1. 当前指针

```yaml
control_status: READY
goal_status: IN_PROGRESS
goal_id: 019f2cdf-f708-7ba1-8742-986b516c4421
goal_started_at: 2026-07-12T00:28:14+08:00
control_baseline_commit: 987d1a6deac7727253b7f3d85bc7b93ab5b7ca90
product_status: CINEMATIC_STATIC_WORLD_IN_PROGRESS
target_status: LOCAL_LIVING_WORLD_CANDIDATE_AI_PROVIDER_HUMAN_AUDIO_PENDING
current_checkpoint: C
current_item: C.7
next_item: C.7
task_state: in_progress
active_record_id: LW-026
last_successful_command: "C.6 fresh Atlas content-life projection, focused subgraph and background-hidden natural interaction review"
resume_action: "implement C.7 Node low-activity window light and distant-view adapter without disturbing reading width or 200 percent zoom"
last_completed_item: C.6
live_ai_provider: ollama-qwen2.5:7b-verified-unintegrated
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
| AI | 私有 LAN Ollama `qwen2.5:7b` 已现场验证 `/api/tags`、`/api/chat` 可用；产品尚未接入 | Goal 目标升级为 Provider + low-light fallback |
| Ollama 延迟 | 首次模型装载约 29.14 秒，随后热请求约 0.41 秒 | 需要 45 秒预热预算和 12 秒热请求预算 |
| Ollama 认证 | 本地接口无 Key 也可访问；提供的 key 仅可作客户端兼容占位 | 浏览器禁止直连，服务端私有 LAN allowlist 才是边界 |
| 部署 | localhost / LAN only | 外部发布不在范围 |
| 工具链 | Playwright Python 1.58 + Chromium 145、ffmpeg 可启动 | 终局浏览器与媒体探针具备本地前提 |
| 框架版本 | Next 15.5.20、React 19.2.7、GSAP 3.15.0、Zod 3.25.76 | 保持维护线，不在本 Goal 叠加 major 迁移 |
| 生产依赖审计 | 0 high、0 critical、2 moderate；来自 Next 内置 PostCSS，npm 的自动修复建议会错误降级 Next 9 | 不执行 `audit fix --force`；监控 Next 15.5 后续 patch 并在独立回归后升级 |

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
| D-07 | Ollama Provider 是当前 Goal 必达能力，low-light 是故障降级 | Provider 已由用户提供并现场验证；不得静默降级终点 |
| D-08 | 只借用保存标准的必要原则 | 避免 OCFL / PREMIS 机构级过度实现 |
| D-09 | 私密世界和继承只保留不锁死底座 | 当前公开体验仍是最高风险 |
| D-10 | 不新增下一轮 / 第二计划 | 防止终点继续移动 |
| D-11 | 每项定向验证，A-H 检查点才跑完整媒体流水线 | 防止九十次重复 build 和证据膨胀 |
| D-12 | 同一高内聚提交最多覆盖同检查点四项 | 在可追溯与提交噪音之间建立机器边界 |
| D-13 | final RC 报告先提交，再 final build 和 evidence | 消除 dirty report 与 build identity 循环 |

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
| 内容投影门 | B | passed | `checkpoint-b/checkpoint-b-content-projection-gate.json`；真实节点、七投影、export、restore、rollback |
| 生命样板门 | C | pending | 十分钟 soak、3 长录屏、hidden / quiet / background-hidden |
| 感官原型门 | E | pending | Timeline 河流视频、音频技术包、可选人类签收、mobile trace |
| 扩展门 | D / E | pending | 单 manifest、单 lifecycle、新场景无五处修改 |

## 7. 检查点状态

| Checkpoint | 目标 | 状态 | Commit | Evidence |
| --- | --- | --- | --- | --- |
| A | 撤销继承式完成与新鲜基线 | passed | 0c91f59c | `checkpoint-a/a8-2026-07-12/` |
| B | 一份事实长成整个世界 | passed | d8cc56f3 | `checkpoint-b/checkpoint-b-content-projection-gate.json` |
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
completed_items: [A.1, A.2, A.3, A.4, A.5, A.6, A.7, A.8, A.9, B.1, B.2, B.3, B.4, B.5, B.6, B.7, B.8, B.9, B.10, C.1, C.2, C.3]
failed_items: []
blocked_items:
  - id: G.3-human-audio-signoff
    reason: "Codex 只完成音频技术验证；无真实人类签收时不阻塞自动 Goal，但最终状态必须保留 HUMAN_AUDIO_PENDING"
next_item: C.4
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

### Record PREP-003：控制包 v1.1 可执行性加固

```yaml
status: passed
date: 2026-07-11
scope: "技术栈复核、Goal 节奏、证据绑定、本地 RC 和环境就绪；不实现产品场景"
research:
  - "Playwright 官方要求版本配套浏览器，采用 Python 1.58 + Chromium 145 headless shell"
  - "Next 15.5.20 仍在维护发布线；Next 16 与 Zod 4 均延后到 Goal 外 ADR"
  - "GSAP 3.15 matchMedia/context 继续负责响应式生命周期与清理"
  - "View Transition、Web Audio、Page Visibility 只做渐进增强并保留静态降级"
findings_fixed:
  - "补齐只读 readiness checker 和可选 Chromium repair"
  - "90 项改为定向小循环，完整媒体流水线只在 A-H 检查点执行"
  - "同检查点最多四项共享高内聚提交和 fresh 原始证据，跨检查点禁止复用"
  - "九模式截图与 F1-F14 媒体增加 source/build/server/capture nonce sidecar"
  - "权限 canary 临时 Next server 等待退出后再清理"
  - "本地 RC 不再生成外部发布模板，也不再读取 stale Scene QA 报告"
  - "H14-H16 固定为报告提交 -> final build/evidence -> preflight/final verifier"
commands:
  - "node scripts/check-worldos-living-world-control.mjs -> pass"
  - "node scripts/check-worldos-living-world-readiness.mjs -> pass"
  - "node scripts/verify-worldos-living-world-final.mjs --contract-only -> pass"
  - "npm run check:docs -> pass"
  - "npm run typecheck -> pass"
  - "npm run lint -> pass"
  - "npm run check:scripts -> pass"
  - "npm run build:production-ci -> pass, 259 static pages"
  - "Playwright localhost desktop + LAN mobile reduced-motion -> 16/16 routes pass, no console/page error"
  - "npm run check:world-experience -> expected stale failure"
  - "npm run check:mainline -> expected stale failure; confirmed old report timestamp side effects and removed generated noise"
commits:
  - "6bb8705247bd2794616129551fc181be26e233b9 docs(world): 加固生命世界控制与技术栈基线"
  - "ad5c2257 test(world): 锚定生命世界加固控制包"
decision: "CONTROL_V1_1_ANCHORED_AND_EXECUTABLE; product Goal remains NOT_STARTED"
next_item: A.1
```

### Record PREP-004：Ollama Provider 纳入终局

```yaml
status: passed
date: 2026-07-11
scope: "Goal 外 Provider 事实验证与控制包 v1.2 升级；不实现产品 adapter"
verified_facts:
  - "私有 LAN Ollama /api/tags 可达，qwen2.5:7b 存在，digest=845dbda0...b697e"
  - "/api/chat 对固定中文问题返回正确结果"
  - "首次加载约 29.14 秒，随后热请求约 0.41 秒"
  - "/v1/models 可达；本地 Ollama 无 Key 也可访问"
  - "用户提供的 key 只保存于 gitignored .env.local，不进入仓库或客户端"
frozen_decisions:
  - "本 Goal 终点升级为 LOCAL_LIVING_WORLD_CANDIDATE_AI_PROVIDER_HUMAN_AUDIO_PENDING"
  - "Provider 固定为服务端私有 LAN Ollama qwen2.5:7b"
  - "冷启动预热预算 45 秒，热请求预算 12 秒"
  - "原生 /api/chat structured output + Zod 后验校验；浏览器不得直连"
  - "low-light 保留为故障回退，但不是替代完成态"
security_boundary:
  - "本地 Ollama key 不构成认证；服务端代理、私有 LAN allowlist、公开投影和 source ID 求交才是边界"
decision: "CONTROL_V1_2_PROVIDER_TARGET_PREPARED; product Goal remains NOT_STARTED"
next_item: A.1
```

### Record LW-001：A.1 执行环境与旧证据基线

```yaml
record: LW-001
checkpoint: A
item: A.1
status: passed
started_at: 2026-07-12T00:28:14+08:00
finished_at: 2026-07-12T00:31:10+08:00
verified_facts:
  - "Goal 启动前工作树 clean；当前分支 codex/visual-overlay-qa，不自动 push"
  - "控制校验和 readiness 通过，但 productCompletion=not-evaluated"
  - "Node 24.13.0、Python Playwright 1.58.0、Chromium 145.0.7632.6、ffmpeg/ffprobe 6.0 可用"
  - "主 LAN 地址 192.168.1.200；另有三个私有接口可达候选"
  - "旧 run manifest 早于新控制包，九段录屏与旧 passed 只能作为反基线"
  - "14 张场景 WebP、0 个公开音频资产；32 个现有 runtime/迁移/场景/音频相关文件可渐进复用"
hypothesis:
  id: null
  result: null
files_changed:
  - "docs/90-archive/reports/worldos-living-world/checkpoint-a/a1-2026-07-12/logs/a1-baseline-audit.log"
  - "docs/90-archive/reports/worldos-living-world/checkpoint-a/a1-2026-07-12/evidence/a1-baseline-summary.json"
commands:
  - command: "A.1 control, readiness, toolchain, LAN, Git, freshness and inventory audit"
    exit_code: 0
    observed: "CONTROL_INTEGRITY_PASS; LIVING_WORLD_READINESS_PASS; old evidence stale"
evidence:
  - "a1-baseline-audit.log sha256=d8a4753bcbf0b1ccbb77c526714c6a2a2aed2fb9790aa7303de9ed25031f4c1b"
  - "a1-baseline-summary.json sha256=9ac6ce703cc0bbe185103206cc743d4371a464bea932f15124aebea7ac2dd099"
failures: []
fixes:
  - "将 Goal ID、启动时间、活动记录和恢复动作写入账本及机器镜像"
commit: "4ec64bc2ccfed367887f74ff3afa8456922f3d9d test(world): 记录生命世界执行基线"
next_item: A.2
```

### Record LW-002：A.2 fresh 四视图视觉失败基线

```yaml
record: LW-002
checkpoint: A
item: A.2
status: passed
started_at: 2026-07-12T00:31:12+08:00
finished_at: 2026-07-12T00:49:14+08:00
verified_facts:
  - "fresh production、localhost 63 个模式观察和 LAN 14 个观察的时间链有效"
  - "28 张 A.2 原图和四张 contact sheet 已逐图检查"
  - "七场景正常视图可区分，但主要空间人格仍由 14 张 WebP 提供"
  - "Timeline、Archive、Paths、Node、Lighthouse background-hidden 主交互自动检查失败"
  - "人工审查确认七场景 background-hidden 均未通过冻结体验契约；Atlas/Lighthouse 仅部分保留结构"
  - "所有持续环境仍是 unproven，未以静态截图冒充生命证据"
hypothesis:
  id: H-05
  result: failed-revised
files_changed:
  - "scripts/evidence-worldos-reality-first.mjs"
  - "docs/90-archive/reports/worldos-living-world/checkpoint-a/a2-2026-07-12/"
commands:
  - command: "npm run evidence:world-experience"
    exit_code: 1
    observed: "fresh run retained five background-hidden primary-interaction failures"
  - command: "A.2 manifest and visual-audit expected-defect validation"
    exit_code: 0
    observed: "A2_BASELINE_VALIDATION_PASS; status=defects-found; visualVerdict=CINEMATIC_STATIC_WORLD_IN_PROGRESS"
evidence:
  - "a2-baseline-validation.log sha256=5b7c72a24c8761098bee67768caddb629d1ef6c03d8c135ce52009720c110399"
  - "a2-visual-baseline-audit.json sha256=b926d92f3b5f25249dc2bfe48c7b6a2dbbcd29d43bc7c9d51eb3f05900b0a2bb"
failures:
  - "位图隐藏后五场景主交互不可见，七场景语义主体均不足"
fixes:
  - "将 background-hidden 纳入唯一 evidence 入口并保留失败基线；空间主体修复由 C-E 按风险门推进"
commit: "3d53cac79ea318824ae8d21ee7cdbcfdb3bd5fc2 test(world): 建立四视图真实视觉基线"
next_item: A.3
```

### Record LW-003：A.3 旧短录屏时长反证

```yaml
record: LW-003
checkpoint: A
item: A.3
status: passed
started_at: 2026-07-12T00:49:17+08:00
finished_at: 2026-07-12T00:51:09+08:00
verified_facts:
  - "旧 Reality-First run 恰有九段 WebM"
  - "ffprobe 实测时长范围为 1.72-10.16 秒"
  - "满足 60-120 秒场景生命要求的视频为 0"
  - "满足 600 秒纵向样板 soak 要求的视频为 0"
hypothesis:
  id: null
  result: null
files_changed:
  - "docs/90-archive/reports/worldos-living-world/checkpoint-a/a3-2026-07-12/"
commands:
  - command: "ffprobe nine legacy Reality-First WebM recordings"
    exit_code: 0
    observed: "nine VP9 files; duration range 1.72-10.16 seconds"
  - command: "A.3 structured duration validation"
    exit_code: 0
    observed: "A3_DURATION_AUDIT_PASS; sceneLifeAccepted=0; soakAccepted=0"
evidence:
  - "a3-duration-validation.log sha256=27345f78c2a37a5dd8c9023ed10664bbfb40b342ac00378cb2e984cc0884b04e"
  - "a3-old-recordings-duration-audit.json sha256=b63ba7109e8e5ec429e25b039815ddd8729bbb21f854c9abcf984266e28eb4f6"
failures: []
fixes:
  - "固定 allowedUse 与 forbiddenUse，禁止旧短录屏进入生命、soak、长时或最终证据"
commit: "cb8e8ec2c84a9656393d5e2bba52a2cd4cf92ebd test(world): 固化旧短录屏时长反证"
next_item: A.4
```

### Record LW-004：A.4 冻结验收契约双消费者

```yaml
record: LW-004
checkpoint: A
item: A.4
status: passed
started_at: 2026-07-12T00:51:11+08:00
finished_at: 2026-07-12T00:54:01+08:00
verified_facts:
  - "红灯测试确认 evidence 原先仍消费旧 reality-first route contract"
  - "冻结 living-world acceptance 保持 schema 1.2.0、7 场景、9 视图、F1-F14 和完整状态阶梯"
  - "evidence 现在从 contract.scenes 派生 route，并在构建前支持无副作用 contract-only"
  - "冻结 final verifier checksum 未修改，仍独立读取同一 contract"
  - "两个消费者均明确 product completion 未评估"
hypothesis:
  id: null
  result: null
files_changed:
  - "scripts/check-worldos-living-world-acceptance-consumers.mjs"
  - "scripts/evidence-worldos-reality-first.mjs"
  - "docs/90-archive/reports/worldos-living-world/checkpoint-a/a4-2026-07-12/"
commands:
  - command: "node scripts/check-worldos-living-world-acceptance-consumers.mjs before implementation"
    exit_code: 1
    observed: "two precise findings: evidence missing living contract and retaining legacy route contract"
  - command: "node scripts/check-worldos-living-world-acceptance-consumers.mjs after implementation"
    exit_code: 0
    observed: "LIVING_WORLD_ACCEPTANCE_CONSUMERS_PASS scenes=7 views=9 flows=14"
evidence:
  - "a4-green.log sha256=1f236438bca79a473e51f3b761bd414953143007675200546a29295fd4fce0be"
  - "a4-contract-consumers.json sha256=7cb5c8d387ca9bc43ff5e18c6d6c529b9cbe54a9ea2448adb5cd4fc60288084f"
failures:
  - "初始 evidence 契约消费者漂移"
fixes:
  - "移除旧 route contract 依赖，加入冻结契约启动校验、contract-only 和 manifest 摘要"
commit: "a8df97e0f1f224d7607962b2ddc8b1ccc9c15e9a test(world): 统一生命世界验收契约消费者"
next_item: A.5
```

### Record LW-005：A.5 客观证据回算边界

```yaml
record: LW-005
checkpoint: A
item: A.5
status: passed
started_at: 2026-07-12T00:54:03+08:00
finished_at: 2026-07-12T01:01:59+08:00
verified_facts:
  - "旧 checker 有九项信任边界缺口，包括旧契约、manifest status、分数和缺失 background-hidden/bbox/hash"
  - "objective checker 现只检查 route、公开禁用文案、背景隐藏、主语义对象 bbox、控制台、资源、权限、freshness 和截图 hash"
  - "一个只有 passed status 与 score=9 的合成 manifest 被拒绝，产生 74 个客观缺失"
  - "当前旧 latest evidence 被真实拒绝并产生 175 个缺口；没有通过修改报告变绿"
  - "permission checker 的 check-only 模式通过且未改历史报告"
hypothesis:
  id: null
  result: null
files_changed:
  - "scripts/check-worldos-reality-first.mjs"
  - "scripts/evidence-worldos-reality-first.mjs"
  - "scripts/check-worldos-permission-boundary.mjs"
  - "scripts/check-worldos-objective-evidence-boundary.mjs"
  - "docs/90-archive/reports/worldos-living-world/checkpoint-a/a5-2026-07-12/"
commands:
  - command: "node scripts/check-worldos-objective-evidence-boundary.mjs before implementation"
    exit_code: 1
    observed: "nine checker/evidence/permission boundary findings"
  - command: "node scripts/check-worldos-objective-evidence-boundary.mjs and checker self-test"
    exit_code: 0
    observed: "OBJECTIVE_EVIDENCE_BOUNDARY_PASS; nakedManifestRejected=true"
  - command: "node scripts/check-worldos-reality-first.mjs against current latest"
    exit_code: 1
    observed: "175 objective findings retained; old latest not accepted"
evidence:
  - "a5-green.log sha256=54e31ad1c33238a6d66489e1429f82b422522dd5b8865019fe6d4f3c0742d620"
  - "a5-objective-evidence-boundary.json sha256=5a6146c73678d848b49068235aab61ab54e4210b6546ff8ff9a300ea0f633766"
failures:
  - "当前产品证据仍不满足新 objective checker；这是后续实现必须消除的真实红灯"
fixes:
  - "移除 manifest status 信任与旧契约杂项，加入冻结视图、资源明细、主对象 bbox、截图 hash 和无副作用权限复算"
commit: "9a65bc5fa3044ebb2ee8694afb10e64d012c78f7 test(world): 收束客观证据回算边界"
next_item: A.6
```

### Record LW-006：A.6 可信构建身份与当前状态面

```yaml
record: LW-006
checkpoint: A
item: A.6
status: passed
started_at: 2026-07-12T01:02:01+08:00
finished_at: 2026-07-12T01:13:37+08:00
verified_facts:
  - "/status 只展示 CINEMATIC_STATIC_WORLD_IN_PROGRESS、A.6、内容投影门、证据时间和 Provider 待接入事实"
  - "旧外部签收叙事与 M/Phase 当前面板已从 /status 挂载移除"
  - "fresh production build 为 367 个运行文件生成排除 identity/cache/trace/diagnostics 的 Merkle"
  - "独立回算 root 与构建记录一致，localhost 与 192.168.1.200 返回同一 buildId/sourceCommit/root"
  - "身份接口 no-store；desktop/mobile 无横向溢出和浏览器错误"
  - "检查点构建 sourceDirty=true，已明确标记 finalEvidenceEligible=false，不冒充终局"
hypothesis:
  id: null
  result: null
files_changed:
  - "scripts/run-worldos-production-ci-build.mjs"
  - "scripts/check-worldos-build-identity.mjs"
  - "src/app/api/status/build-identity/route.ts"
  - "src/lib/living-world-status.ts"
  - "src/app/status/page.tsx"
  - "src/components/status/RealityFirstBaselinePanel.tsx"
  - "docs/90-archive/reports/worldos-living-world/checkpoint-a/a6-2026-07-12/"
commands:
  - command: "node scripts/check-worldos-build-identity.mjs before implementation"
    exit_code: 1
    observed: "six missing status/build identity boundaries"
  - command: "npm run typecheck && npm run build:production-ci"
    exit_code: 0
    observed: "fresh build; buildId=3VXuTbj_HHJiI7GuBGnY-; files=367; Merkle independently matched"
  - command: "localhost/LAN build identity and status live probe"
    exit_code: 0
    observed: "two origins matched; no invalid status summary"
  - command: "desktop/mobile Playwright status screenshots"
    exit_code: 0
    observed: "no horizontal overflow or browser errors; legacy panel removed after first visual review"
evidence:
  - "a6-green.log sha256=e7bc9551c391853626a95194b46a11e5cf4d0ab6c92a90aba8d66af12f7a6e51"
  - "a6-status-build-identity.json sha256=0e4bf37e7e840c7c07f78fc7e66bbcb6b324a6e5893f78db9822cc4dbc97c33b"
failures:
  - "首次 live 探针混用顶层 await 与 CommonJS require，Node 24 拒绝执行"
  - "首次状态截图仍挂载历史 SceneRuntimeStatusPanel，形成旧阶段叙事和页面膨胀"
fixes:
  - "探针改为纯 ESM fs 读取；删除旧面板当前挂载并重建、重截、重验"
commit: "ce67de1975991e5ca4803c23572fb681f67f98d3 feat(world): 建立可信构建身份与状态面"
next_item: A.7
```

### Record LW-007：A.7 当前命令脊柱与历史脚本边界

```yaml
record: LW-007
checkpoint: A
item: A.7
status: passed
started_at: 2026-07-12T01:13:39+08:00
finished_at: 2026-07-12T01:23:13+08:00
verified_facts:
  - "旧 check:mainline 有 37 个子门禁，注册表有 27 个每日命令"
  - "当前 mainline 固定为 8 个生命世界入口，每日命令上限和实际均为 8"
  - "20 个 M/Phase/Stage 脚本全部登记 historicalInvalidated，仍保留文件供定位旧实现"
  - "4 个外部 Preview 入口独立登记，不进入 localhost/LAN Goal"
  - "content、boundary、scripts 和 dependency 当前门禁通过；build identity API 已进入后端注册表"
  - "新 mainline 前七项通过，唯一红灯是 world-experience 对旧 latest 的 175 项客观拒绝"
hypothesis:
  id: null
  result: null
files_changed:
  - "package.json"
  - "data/world-kernel/worldos-script-legacy-registry-v1.json"
  - "data/world-kernel/worldos-api-boundary-registry-v1.json"
  - "scripts/check-worldos-current-command-spine.mjs"
  - "scripts/check-worldos-script-legacy-registry.mjs"
  - "scripts/check-worldos-script-taxonomy.mjs"
  - "scripts/check-worldos-permission-boundary.mjs"
  - "scripts/check-worldos-content-jaccard.mjs"
commands:
  - command: "node scripts/check-worldos-current-command-spine.mjs before implementation"
    exit_code: 1
    observed: "54 old-mainline, daily, historical-registration and Preview findings"
  - command: "npm run check:content && npm run check:boundary && npm run check:dependency-hardening"
    exit_code: 0
    observed: "content facts, 27 API routes, permission, scripts and dependencies passed without report timestamp side effects"
  - command: "npm run check:mainline"
    exit_code: 1
    observed: "seven current gates passed; world-experience retained 175 stale/shape findings"
evidence:
  - "a7-green.log sha256=e77bad7e0074be2793c1274fdadd5c20977ce0f12b4083cc594f848141b24f53"
  - "a7-command-spine-audit.json sha256=cda3568f8bb41b8df21d6cd8a0e8a928404983aa7ac8c4a01fd73b04f25a2734"
failures:
  - "A.6 新 build identity API 初次未登记服务端 API 边界"
  - "旧 taxonomy/permission/legacy 检查强制历史脚本直接进入 mainline"
  - "当前 content-jaccard 检查每次改报告时间戳"
fixes:
  - "补 API 注册；改为 mainline -> boundary -> API/permission/scripts；加入 check-only 并恢复生成噪音"
commit: "280341e37d1868136894a47ad379829cff453252 refactor(world): 收束当前主线与历史脚本边界"
next_item: A.8
```

### Record LW-008：A.8 fresh 工程门与失败基线封存

```yaml
record: LW-008
checkpoint: A
item: A.8
status: passed
started_at: 2026-07-12T01:23:15+08:00
finished_at: 2026-07-12T14:59:00+08:00
verified_facts:
  - "typecheck、lint、fresh production build、build identity、JSON 与 git diff 检查通过"
  - "fresh evidence 完成 70 个 localhost 观察和 14 个 LAN 观察，时间链在该 run 内有效"
  - "采集器真实返回 11 个产品缺陷；独立 objective checker 从同一 run 回算出 18 个缺口"
  - "Timeline、Archive、Paths、Node、Lighthouse 在 background-hidden/resource-failure 下缺失主交互；多数退化为列表"
  - "九段 fresh 流程录屏只有 2.84-13.76 秒，持续生命与 soak 合格数均为 0"
  - "接触表人工复核结论仍是 CINEMATIC_STATIC_WORLD_IN_PROGRESS，不允许完成声明"
hypothesis:
  id: H-05
  result: failed-revised
files_changed:
  - "scripts/evidence-worldos-reality-first.mjs"
  - "scripts/check-worldos-objective-evidence-boundary.mjs"
  - "docs/90-archive/reports/worldos-living-world/checkpoint-a/a8-2026-07-12/"
commands:
  - command: "npm run typecheck && npm run lint && npm run build:production-ci && git diff --check"
    exit_code: 0
    observed: "fresh buildId=owoSvSxaL6VZXCvOUkxor, 367 files; engineering checks passed"
  - command: "npm run evidence:world-experience"
    exit_code: 1
    observed: "70 localhost + 14 LAN observations completed; 11 real product defects retained"
  - command: "npm run check:world-experience against fresh run"
    exit_code: 1
    observed: "18 objective background-hidden/resource-failure findings retained"
  - command: "post-fix objective evidence, JSON and diff validation"
    exit_code: 0
    observed: "OBJECTIVE_EVIDENCE_BOUNDARY_PASS; A8_JSON_VALIDATION_PASS files=4"
evidence:
  - "a8-post-fix-validation.log sha256=e07401137015f252d0f59424271db41d5d379e39e74ce7527668902b5a7bce63"
  - "a8-visual-baseline-audit.json sha256=20d02da5bcab8bb2a8c5b06c2fab256bcbd9a364ea278c827d2d316b4b6ac91e"
  - "a8-recording-duration-audit.json sha256=a5ec30e9831b13136d3378dc53e83813d6362e82bc6c9d23a0e43be8b8625eb8"
failures:
  - "首次 fresh evidence 在浏览器表达式中得到非法资源正则，第一张图即中止"
  - "当前场景与长时体验仍不满足冻结验收；这些红灯属于后续实现输入，不得消音"
fixes:
  - "补一层模板字符串转义并加入红灯回归测试；真实 Chromium 重跑完成全部矩阵"
  - "将 65MB 临时 run 收束为 1.8MB manifest、矩阵、接触表、日志和时长反证"
commit: "bcde9ca5488353862b44e8731f7ddddc0b61a853 fix(world): 修复浏览器证据资源回算"
next_item: A.9
```

### Record LW-009：A.9 fresh 独立失败基线审查

```yaml
record: LW-009
checkpoint: A
item: A.9
status: passed
started_at: 2026-07-12T15:02:00+08:00
finished_at: 2026-07-12T15:06:50+08:00
verified_facts:
  - "fresh reviewer context 019f5523-be1d-7030-8989-6786eb262c0b 未继承执行线程，工作区只读"
  - "审查者先打开六张 contact sheet 与录屏时长，再读取 baseline 报告、manifest、矩阵和日志"
  - "独立结论保留四类 P1：背景隐藏后空间主体失败、text-hidden 仍依赖 WebP、录屏过短、产品仍未完成"
  - "审查确认 baseline 没有宣称空间世界已完成，也没有把不同位图等同独立世界"
  - "Gate A 只以撤销继承式完成并建立可信失败基线的含义通过"
hypothesis:
  id: H-05
  result: failed-revised
files_changed:
  - "docs/90-archive/reports/worldos-living-world/checkpoint-a/a8-2026-07-12/evidence/a9-independent-review.md"
  - "docs/90-archive/reports/worldos-living-world/checkpoint-a/a8-2026-07-12/logs/a9-independent-review-validation.log"
commands:
  - command: "fresh read-only independent reviewer, image and duration first"
    exit_code: 0
    observed: "P0=0; P1 retained; Gate A pass-baseline-only; product remains incomplete"
  - command: "A.9 independent review structure and conclusion validation"
    exit_code: 0
    observed: "A9_INDEPENDENT_BASELINE_REVIEW_PASS reviewer=019f5523-be1d-7030-8989-6786eb262c0b productCompletion=false"
evidence:
  - "a9-independent-review-validation.log sha256=3575500deefb77ab92f72eeb741a1e78b55e55d67929f492a99fed8f2b62aac5"
  - "a9-independent-review.md sha256=f5e5bbe39152d9a099bd2d00bb583d6307fcb5f769a386b347b8b1aacaae043c"
failures:
  - "空间主体、持续生命、soak 与资源稳定性仍失败或未证明；这是 B-H 的实现输入"
fixes:
  - "不修饰产品结论；只封存独立失败基线并开放内容投影门 B"
commit: "0c91f59ca2a3da97b9816404861a99554cc98d66 test(world): 撤销继承式完成并建立生命世界基线"
next_item: B.1
```

### Record LW-010：B.1 公开代表节点与小更新选择

```yaml
record: LW-010
checkpoint: B
item: B.1
status: passed
started_at: 2026-07-12T15:07:05+08:00
finished_at: 2026-07-12T15:11:05+08:00
verified_facts:
  - "选择 node-kavita-reader-pipeline / 小说书库与 TXT 转 EPUB 流水线"
  - "节点 visibility=public、reviewed=true、layer=fact，不是 WorldOS、RC、QA 或发布自述"
  - "节点已有 tech 区域、三条关系、tech-ai 路径和 evt-024 公开事件"
  - "当前统一 ContentLife 派生显示节点被 Atlas、Timeline、Archive、Paths、Lighthouse 五场景吸收"
  - "拟更新仅补跨平台 checksum 与含空格路径安全说明，不新增作者经历，不改权限和关系迎合测试"
hypothesis:
  id: H-01
  result: null
files_changed:
  - "docs/90-archive/reports/worldos-living-world/checkpoint-b/b1-2026-07-12/"
commands:
  - command: "representative public node source hash, boundary and projection baseline validation"
    exit_code: 0
    observed: "B1_REPRESENTATIVE_PUBLIC_NODE_SELECTED projections=atlas,timeline,archive,paths,lighthouse"
evidence:
  - "b1-selection-validation.log sha256=0a8a05799270300f028f8d8bb453e63af35c87c2ea6953637510a24b64df2b16"
  - "b1-representative-node-selection.json sha256=0e3292fa6cb5eed5e6088f94b0053bd4d0521bc5235eb02896d5b797ee925f93"
failures: []
fixes:
  - "不先改正文；固定 before hash 与修改边界，让 B.2 先观察失败契约"
commit: "dcd0c6da8519504bb0498dffc7aab505eb4d58ce test(world): 选择内容投影代表节点"
next_item: B.2
```

### Record LW-011：B.2 一源七投影失败契约

```yaml
record: LW-011
checkpoint: B
item: B.2
status: passed
started_at: 2026-07-12T15:11:15+08:00
finished_at: 2026-07-12T15:15:45+08:00
verified_facts:
  - "契约固定 Atlas、Timeline、Archive、Paths、Node、Lighthouse、export 七个投影"
  - "每个 applicable=true 项都必须提供结构化 evidence；applicable=false 必须有 reasonCode 与 reason"
  - "契约要求同一 contentRevisionSha256 贯穿七投影，不能只证明旧节点 ID 存在"
  - "初始测试真实失败 8 项：七投影均缺修订证据，正文仍为 before hash"
  - "测试通过 typecheck，真实正文未被 B.2 修改"
hypothesis:
  id: H-01
  result: null
files_changed:
  - "data/fixtures/authoring/representative-node-update.json"
  - "scripts/check-worldos-living-world-content-projection.ts"
  - "docs/90-archive/reports/worldos-living-world/checkpoint-b/b2-2026-07-12/logs/b2-failing-contract.log"
commands:
  - command: "tsx content projection contract before implementation"
    exit_code: 1
    observed: "CONTENT_PROJECTION_CONTRACT_FAIL findings=8"
  - command: "typecheck, projection fixture structure and real source immutability validation"
    exit_code: 0
    observed: "B2_FAILING_CONTRACT_STRUCTURE_PASS projections=7 sourceUnchanged=true"
evidence:
  - "b2-failing-contract.log sha256=0dd4f22c409d99547078672aaf80fc9c8e3b603a9cbade11e61e3693c57b3ba9"
  - "representative-node-update.json sha256=c18fadbc893908937e46ea172551caf09fe8a9240dad64d5f1c5971adb866a90"
  - "check-worldos-living-world-content-projection.ts sha256=f56ee51cecadd0daf5f1e15e7a226680a598f3270ecd5478546f2920976f3320"
failures:
  - "Atlas 与 Timeline 真实模型未暴露代表节点更新；Archive/Paths/Node 只有旧节点存在；Lighthouse 不索引正文短语；新 export 尚不存在"
fixes:
  - "保留全部红灯，交由 B.3-B.6 在同一事实与权限边界内消除"
commit: "908c6c34ab797337b9cb5b5cf76161451bd471f2 test(world): 固定内容跨投影失败契约"
next_item: B.3
```

### Record LW-012：B.3 公开节点更新事务

```yaml
record: LW-012
checkpoint: B
item: B.3
status: passed
started_at: 2026-07-12T15:16:00+08:00
finished_at: 2026-07-12T15:21:45+08:00
verified_facts:
  - "新增 update 专用 schema、preview 和 transaction，world-author CLI 依据 operation 路由"
  - "visibility、slug、关系、路径、日期、资产六类错误均在 preview 阶段阻止"
  - "合法更新仅在系统临时目录写入正文、节点 updatedAt、node-updated 事件并重建公开索引"
  - "五个受管文件均有 before/after checksum，rollback 后与临时更新前完全一致"
  - "共享事务核心同时回归旧 create 流程，并补管此前遗漏的 public/world-manifest.json"
  - "真实工作区事实与正文 checksum 在整段测试前后不变"
hypothesis:
  id: H-01
  result: null
files_changed:
  - "src/server/authoring/author-update-schema.ts"
  - "src/server/authoring/author-update-preview.ts"
  - "src/server/authoring/author-update-transaction.ts"
  - "src/server/authoring/author-transaction.ts"
  - "scripts/world-author.mjs"
  - "scripts/check-worldos-living-world-author-update.ts"
commands:
  - command: "isolated author update transaction test"
    exit_code: 0
    observed: "AUTHOR_UPDATE_TRANSACTION_PASS negativeCases=6 rollback=true realWorkspaceUntouched=true"
  - command: "existing create transaction regression"
    exit_code: 0
    observed: "apply=7 rollback=7 tamperRejected=true realWorkspaceUntouched=true"
  - command: "world-author update preview, typecheck, lint and diff check"
    exit_code: 0
    observed: "valid=true issues=0; all engineering checks pass"
evidence:
  - "b3-author-update-validation.log sha256=0af6d9794188b40f425d8ab220860d4896221b7efdca63db6bc185cc1d9d95c4"
  - "b3-author-update-transaction.json sha256=d0a9f63841b5afc88f91c9aee048f4ccd255233e299243c570c73f3a05ca3108"
failures:
  - "原 create 事务未把 public/world-manifest.json 纳入备份与 rollback"
fixes:
  - "抽取统一 applyAuthorTransaction，并让 create/update 共用原子写与 checksum manifest"
commit: "09f4ec0e7760563cbb2b13e67f4a8faa3d2db11a feat(world): 支持公开节点原子更新事务"
next_item: B.4
```

### Record LW-013：B.4 统一公开内容修订投影

```yaml
record: LW-013
checkpoint: B
item: B.4
status: passed
started_at: 2026-07-12T15:22:00+08:00
finished_at: 2026-07-12T15:28:50+08:00
verified_facts:
  - "正式 author update 已应用，revision=64c542894f378d573b59a210fa4cddba6a17a2e2ace4da0b8e12bd4170d58fb3"
  - "唯一内容修订 owner 是 PublicNodeReference；场景 model 不直接读取 Markdown"
  - "Atlas、Timeline、Archive、Paths、Node、Lighthouse 与公开搜索 API 返回同一 revision hash"
  - "Atlas 依据 area 内最新修订补充地点，不手工登记代表节点；Timeline 由 node-updated 事实事件吸收"
  - "Archive 与 Lighthouse 可用新增正文短语检索，且只消费公开正文"
  - "B.2 红灯从 8 项降为 export 唯一一项，未删除或放宽契约"
  - "rollback backup manifest hash 已封存，目录被 gitignore 保护并保留到 B.7"
hypothesis:
  id: H-01
  result: null
files_changed:
  - "src/lib/content.ts"
  - "src/lib/public-world-objects.ts"
  - "src/lib/scenes/build-atlas-model.ts"
  - "src/lib/scenes/build-timeline-model.ts"
  - "src/lib/scenes/build-archive-model.ts"
  - "src/lib/scenes/build-path-model.ts"
  - "src/lib/scenes/build-node-model.ts"
  - "src/server/ai/lighthouse-runtime.ts"
  - "src/app/api/lighthouse/search/route.ts"
  - "content/articles/kavita-reader-txt-epub-pipeline.md"
  - "data/domains/experience/nodes.json"
  - "data/core/world-events.json"
commands:
  - command: "world-author apply representative update"
    exit_code: 0
    observed: "five managed files changed; backupId=author-1783841103039-kavita-portable-checksum-2026-07-12"
  - command: "six scene models and public search API revision validation"
    exit_code: 0
    observed: "B4_UNIFIED_PUBLIC_PROJECTION_PASS"
  - command: "content projection contract exact pending set"
    exit_code: 0
    observed: "only export remains pending"
  - command: "typecheck, lint, content, permission/API boundary and diff checks"
    exit_code: 0
    observed: "all targeted engineering gates pass"
evidence:
  - "b4-unified-projection-validation.log sha256=8d8e327339fe9500f5896ea1a082f56e0c5fbe011f6a78aae06b7ea90ccb4db4"
  - "b4-unified-public-projection.json sha256=5222046629a694f5eead9f66afaad3eba3fe57db6d4eac731b67b0afaa46af86"
failures:
  - "Markdown 标题索引初次把 fenced code 注释计入标题，导致新增章节被截断"
fixes:
  - "统一内容解析器先排除 fenced code blocks，再提取有限章节标题"
commit: "ac2c0da1a7149a4b2b045fad8b789cda7fe33bc9 feat(world): 统一公开内容修订投影"
next_item: B.5
```

### Record LW-014：B.5 公开世界可移植导出

```yaml
record: LW-014
checkpoint: B
item: B.5
status: passed
started_at: 2026-07-12T15:30:00+08:00
finished_at: 2026-07-12T15:38:00+08:00
verified_facts:
  - "world:export 只消费服务端 PublicWorldObjectIndex，导出 public/semiPublic 投影并明确排除 private/family/partner/vault/sealed/silent/unlisted"
  - "目录包包含 facts、200 份原始公开内容、9 个资产引用、preservation objects/events/rights、manifest、中文 README 和 checksums.sha256"
  - "221 个受管文件由 Node 逐项回算 SHA-256，无失败项"
  - "代表正文在 manifest 中的 revision 与当前事实源完全一致，B.2 七投影契约由 export 补齐后通过"
  - "三个缺失封面使用仓库配置的 fallback，并在 registry 中同时记录请求路径、实际来源与 resolution"
  - "资产权利缺失保持 metadata-not-registered，6 个唯一来源只记录 6 条权利对象，不补造许可"
hypothesis:
  id: H-01
  result: null
files_changed:
  - ".gitignore"
  - "package.json"
  - "scripts/world-export.mjs"
  - "src/server/export/build-export.ts"
commands:
  - command: "public export create, typecheck, lint, seven-projection contract, Node checksum/visibility validation and diff check"
    exit_code: 0
    observed: "200 nodes; 221 checksum entries; private markers=0; representative revision matched; all targeted gates pass"
evidence:
  - "b5-targeted-validation.log sha256=ee7427abff1b7b9b36f466544ccfbc471c964b274b626219370d1f72133f7db2"
  - "b5-public-export.json sha256=14da0504089f55d373945d449735d115783ef6691b27445f291639a8d2764060"
failures:
  - "Node 24 tsImport 查询参数无法解析 TypeScript 依赖"
  - "三个公开节点封面路径在源仓库中不存在"
  - "macOS shasum 在继承 C.UTF-8 时因 locale 崩溃"
fixes:
  - "CLI 自举到仓库既有 tsx，固定 node scripts/world-export.mjs 接口不变"
  - "依据 home-cover-assets fallback 复制可恢复别名，并显式记录映射"
  - "使用 Node crypto 逐项复算，不把外部命令环境故障误判为包损坏"
commit: "d9d7fc8115fbd7135b1efac2c442fa40bb242875 feat(world): 建立公开世界可移植导出"
next_item: B.6
```

### Record LW-015：B.6 独立校验与最小恢复

```yaml
record: LW-015
checkpoint: B
item: B.6
status: passed
started_at: 2026-07-12T15:39:00+08:00
finished_at: 2026-07-12T15:44:40+08:00
verified_facts:
  - "固定 node scripts/world-export.mjs verify-restore 接口在系统空目录运行，不写真实工作区"
  - "验证器独立回算 221 个 checksum、manifest payload/rootChecksum、Zod schema、对象计数和 preservation event"
  - "节点/区域、关系端点、路径节点/后续路径、事件节点/区域、资产/权利引用均通过完整性校验"
  - "恢复器重建标准事实路径、200 份正文、9 个公开资产别名和 public/world-index.json，共 220 个文件"
  - "代表正文恢复 hash 与源正文一致，三个 configured-fallback 封面别名实际存在"
  - "内容篡改、private scope、关系断链、private node 与非空输出五种反例均被拒绝"
hypothesis:
  id: H-01
  result: null
files_changed:
  - "scripts/world-export.mjs"
  - "src/server/export/verify-export.ts"
  - "src/server/export/restore-export.ts"
commands:
  - command: "fresh create and fixed verify-restore in a system empty temp directory, then typecheck/lint/projection/diff"
    exit_code: 0
    observed: "source worldCommit=d27e77d2; checksums=221; restoredFiles=220; indexNodes=200; representative hash matched"
  - command: "tampered checksum, private scope, broken relation, private node and nonempty output negative cases"
    exit_code: 0
    observed: "B6_NEGATIVE_BOUNDARIES_PASS cases=5"
evidence:
  - "b6-positive-restore.log sha256=f1ce6d864519a037e327a21fea14ab4d2067add2fb1a633506f4b91b825c3ca9"
  - "b6-negative-boundaries.log sha256=672d31b69db0650cfaf9871e420c94b6f18aac7adf9d585615e83b6b60907d12"
  - "b6-public-export-restore.json sha256=b001ab6966f428243e647497f2db03bd8ef3a4ca8995206d3b8f42fd167511eb"
failures:
  - "验证器初版把 Area.defaultVisibility=private 错当成区域私密泄漏"
fixes:
  - "区分区域创作默认策略与对象自身公开性；节点、路径、事件的公开约束保持冻结"
commit: "d27e77d2f7a0416c0ce49803098edd2a7fbe5ab3 feat(world): 验证并重建公开世界导出"
next_item: B.7
```

### Record LW-016：B.7 工作区回滚与历史导出保留

```yaml
record: LW-016
checkpoint: B
item: B.7
status: passed
started_at: 2026-07-12T15:46:00+08:00
finished_at: 2026-07-12T15:48:20+08:00
verified_facts:
  - "rollback 前五个受管文件逐项等于 backup afterSha256，未覆盖 B.4 后的未知改动"
  - "现有 author rollback 原子恢复五个文件，backup manifest 状态更新为 rolled-back"
  - "真实工作区五个文件逐项等于 beforeSha256，新增短语和 node-updated 事件均不存在"
  - "B.6 导出包保持 rootChecksum=5f7e4bd1...，来源提交 d27e77d2，未随工作区回滚被重写"
  - "历史 export 仍在独立临时目录恢复更新版正文，revision=64c54289... 与 manifest 一致"
  - "typecheck、lint、完整内容检查和 diff check 通过"
hypothesis:
  id: H-01
  result: passed
files_changed:
  - "content/articles/kavita-reader-txt-epub-pipeline.md"
  - "data/core/world-events.json"
  - "data/domains/experience/nodes.json"
  - "public/world-index.json"
commands:
  - command: "author rollback precondition, atomic rollback, before-checksum proof, preserved export verify-restore and content gates"
    exit_code: 0
    observed: "workspace before hashes=5/5; update phrase/event absent; export after revision restored; all gates pass"
evidence:
  - "b7-rollback-provenance.log sha256=d9f10dc72e1cdf7d899e250e1271030fc611482ac0323ddc0bbaacee70624dda"
  - "b7-rollback-and-export-provenance.json sha256=41fdb5ccce070e82a6200b9b185fad06b0c0ea9d3464f3bd6e53e240d552d283"
failures: []
fixes: []
commit: "c10f2877074b0c7eae64df3d231b384a2f5471df fix(world): 回滚代表更新并保留版本导出"
next_item: B.8
```

### Record LW-017：B.8 私密事实正向控制与泄漏扫描

```yaml
record: LW-017
checkpoint: B
item: B.8
status: passed
started_at: 2026-07-12T15:49:00+08:00
finished_at: 2026-07-12T15:54:40+08:00
verified_facts:
  - "WORLDOS_PRIVATE_CANARY_FIXTURE 只由 Node 服务端动态读取，要求绝对普通文件、private visibility、六个唯一 token 和 16 KiB 上限"
  - "/api/status/permission-canary 只返回排序 SHA-256、fixtureLoaded 与 build identity，不返回 token、fixture 路径或内容"
  - "API 注册表更新为 28 条，canary route 是 no-store public-read 正向控制，不写事实"
  - "clean build identity sourceCommit=41a9430d 且 sourceDirty=false"
  - "第二次隔离 next start 注入六个冻结 canary，positive hash 6/6 匹配且响应无原 token"
  - "扫描 630 个真实表面：HTML/RSC 14、search 6、AI context 1、build 380、default export 222、screenshots 5，leaks=0、non200=0"
  - "服务与临时 fixture/截图已删除；终局 verifier 仍保留独立重启重扫责任"
hypothesis:
  id: H-01
  result: passed
files_changed:
  - "src/server/permissions/private-canary.ts"
  - "src/app/api/status/permission-canary/route.ts"
  - "data/world-kernel/worldos-api-boundary-registry-v1.json"
commands:
  - command: "fresh production build from clean implementation commit and isolated next start private canary scan"
    exit_code: 0
    observed: "sourceDirty=false; fixture hashes matched; scannedSurfaces=630; leaks=0; non200=0"
  - command: "api boundary, permission boundary, typecheck, lint and diff check"
    exit_code: 0
    observed: "28 registered API routes; all targeted engineering gates pass"
evidence:
  - "b8-fresh-build.log sha256=3e9d3789761104a8f41aeb279236d21702821a7e0ff5a0e881fcfede36bfad86"
  - "b8-live-canary-scan.log sha256=c274bc34e43e94fcc8b3965d0bb2b4b5f4266df5ca276e0fc177686c4784aba2"
  - "b8-private-canary-scan.json sha256=240d9ee41af844dda5e5a7f4df0b87c45d1fc394523079c09b32c8a7e16794fd"
failures: []
fixes: []
commit: "41a9430de0819a76a06cf89be53887686c43a378 feat(world): 建立私密事实正向控制"
next_item: B.9
```

### Record LW-018：B.9 检查点 B 工程与双 origin 浏览器门禁

```yaml
record: LW-018
checkpoint: B
item: B.9
status: passed
started_at: 2026-07-12T15:58:00+08:00
finished_at: 2026-07-12T16:00:20+08:00
verified_facts:
  - "控制、readiness、content、API/permission/app/script boundary、typecheck、lint、fresh production build 与 diff check 在严格 pipefail 重跑中通过"
  - "fresh build sourceCommit=d6008b16、sourceDirty=false、buildId=UAZO6WJactCF0A3IAB236"
  - "真实 Chromium 分别从 localhost 与 LAN 192.168.1.200 访问 Atlas/Timeline/Archive/Paths/Node/Lighthouse，12/12 HTTP 200、H1/正文存在、console/page error=0"
  - "Atlas/Timeline/Archive/Node 两 origin PNG 逐字节一致；Paths/Lighthouse 只有局部动态帧差异"
  - "逐图查看无真实白屏或黑屏；联系表并行显示黑块被原图 hash、像素统计和单图查看判定为审查显示链误报"
  - "已知 P1 继续保留：静态 WebP 仍承担主要空间主体；本项不把页面可达性解释为生命体验完成"
hypothesis:
  id: H-01
  result: passed
files_changed:
  - "data/world-kernel/worldos-script-legacy-registry-v1.json"
commands:
  - command: "strict checkpoint B engineering gates with fresh production build"
    exit_code: 0
    observed: "all gates pass after registering world:export; build sourceDirty=false"
  - command: "Playwright Chromium localhost/LAN six-projection navigation, DOM and screenshot review"
    exit_code: 0
    observed: "12/12 200; H1=12; console/page errors=0; no product black screen"
evidence:
  - "b9-engineering-gates.log sha256=04c28e06292d2c56d563fdf78b72de8a6bbbd9be94c818048d315aeec2f69ae0"
  - "b9-localhost-lan-browser.log sha256=d3e51a4b335d96fa09c8bed85bf960d545f1f89366f7c6851fc83fce4bdb73cd"
  - "b9-checkpoint-b-gate.json sha256=011c1b28f3bbe38f968aa8b779a7beea676c4700f07efae6df4fd40e6a461a04"
failures:
  - "首次门禁发现 world:export 未进入 active script registry，totalScripts 306/307"
  - "首次浏览器脚本误用系统 python3，未安装对应 Playwright package"
fixes:
  - "登记 world:export 并精确更新脚本总数，不提高阈值"
  - "改用 Playwright CLI 自带 Python 3.9 运行时，不新增项目依赖"
commit: "d6008b164e4783c2dc8d2b837f015acea41be44b fix(world): 登记公开世界导出命令"
next_item: B.10
```

### Record LW-019：B.10 内容投影风险门封存

```yaml
record: LW-019
checkpoint: B
item: B.10
status: passed
started_at: 2026-07-12T16:07:00+08:00
finished_at: 2026-07-12T16:10:40+08:00
verified_facts:
  - "代表内容更新按 failing -> applied -> exported -> rolled-back 时间链留有互不覆盖的事实与证据"
  - "应用期七投影共享 applied revision；回滚后工作区等于 before，历史 export 仍可恢复 applied revision"
  - "场景没有为代表节点增加专用注册；PublicWorldObjectIndex 是 revision 和公开投影 owner"
  - "export 同时包含原始事实、正文、资产、保存记录和校验和，不是页面或截图备份"
  - "内容投影风险门 passed，Checkpoint B passed；产品完成状态仍是 CINEMATIC_STATIC_WORLD_IN_PROGRESS"
  - "静态位图主体、持续生命、长录屏、迁移和声景缺陷继续由 C-H 承担"
hypothesis:
  id: H-01
  result: passed
files_changed:
  - "docs/90-archive/reports/worldos-living-world/checkpoint-b/checkpoint-b-content-projection-gate.json"
commands:
  - command: "fresh export verify-restore and control integrity before Gate B seal"
    exit_code: 0
    observed: "checksums=221; restoredFiles=220; CONTROL_INTEGRITY_PASS; evidence chain present"
evidence:
  - "checkpoint-b-content-projection-gate.json sha256=1853f032a0268b75f54741877ca2fb4b76784d5090ceca100bdc0dca54d18873"
failures: []
fixes: []
commit: "d8cc56f33c995253d804dc72822bc51287d5387a feat(world): 打通事实投影与可移植恢复链"
next_item: C.1
```

### Record LW-020：C.1 确定性世界时钟

```yaml
record: LW-020
checkpoint: C
item: C.1
status: passed
started_at: 2026-07-12T16:12:00+08:00
finished_at: 2026-07-12T16:15:40+08:00
verified_facts:
  - "纯 buildWorldTimeSnapshot 不含 timer、React、浏览器或 LAN 时区猜测"
  - "项目默认时区固定 Asia/Shanghai；相同 epoch 在 UTC/Shanghai 投影可证伪"
  - "dayProgress 使用本地墙上时间，dayPeriod 固定 05/09/17/21 边界"
  - "四季从 3/6/9/12 月开始，seasonProgress 按真实日历区间含闰年计算"
  - "hidden 两分钟场景以新 epoch 直接重算并跨越昼夜边界，不追补中间帧"
  - "相同输入 snapshot/worldDateKey 完全确定，非法 epoch/timezone 被拒绝"
hypothesis:
  id: H-02
  result: null
files_changed:
  - "src/world/runtime/clock.ts"
  - "src/world/runtime/clock.test.ts"
commands:
  - command: "tsx node:test clock suite, typecheck, lint and diff check"
    exit_code: 0
    observed: "6 tests pass; engineering checks pass"
evidence:
  - "c1-clock-validation.log sha256=6a1bef43e7cb3e2ed7fb3576d2a49dbd9bf27a0201afaa73cfd252c5ee1390db"
  - "c1-world-clock.json sha256=6c179465a6787c59cfb910368323ca5558dc6cce1c0a840a4da15c6ec61c5934"
failures:
  - "红灯阶段 clock 模块不存在"
fixes:
  - "新增无状态 IANA 时区投影与昼夜/季节纯计算"
commit: "25f228db2ce5024b9bb077959fc1b00c570d01fb feat(world): 建立确定性世界时钟"
next_item: C.2
```

### Record LW-021：C.2 唯一环境调度与生命周期

```yaml
record: LW-021
checkpoint: C
item: C.2
status: passed
started_at: 2026-07-12T16:17:00+08:00
finished_at: 2026-07-12T16:21:10+08:00
verified_facts:
  - "AmbientScheduler 同时最多一个 active adapter 和一个 rAF callback"
  - "adapter 替换先 dispose 旧场景；route leave 释放 adapter/frame/animation"
  - "logical signal update 只调用 update，不进入 ambient tick；ambient 节流上限 30fps"
  - "hidden 与 quiet 使用独立 pause reason，全部解除后才 resume"
  - "Lifecycle 只拥有唯一 visibility listener 与可选 abort listener，跨场景不重复拆装"
  - "abort/unmount 后 adapter、rAF、listener 和八类资源计数归零，dispose 幂等"
hypothesis:
  id: H-04
  result: null
files_changed:
  - "src/world/runtime/scheduler.ts"
  - "src/world/runtime/lifecycle.ts"
  - "src/world/runtime/scheduler.test.ts"
commands:
  - command: "tsx node:test scheduler lifecycle suite, typecheck, lint and diff check"
    exit_code: 0
    observed: "4 tests pass; engineering checks pass"
evidence:
  - "c2-scheduler-lifecycle.log sha256=84e58beb03b1c8e3533abb76a7132e5289dd2a053297f62143ebb6d82dc0f491"
  - "c2-scheduler-lifecycle.json sha256=094869552f3e92d32c088ea8873834f78e36e1f54c5cbe369b43defa8787a0bf"
failures:
  - "红灯阶段 scheduler 模块不存在"
fixes:
  - "新增职责分离的 Scheduler 与 Lifecycle；全局 listener 不在每次 route leave 重建"
commit: "a0a6c904d22fb724c29e519e278a7902c47eabc8 feat(world): 建立唯一环境调度生命周期"
next_item: C.3
```

### Record LW-022：C.3 唯一体验清单、信号与分片 Store 决策

```yaml
record: LW-022
checkpoint: C
item: C.3
status: passed
started_at: 2026-07-12T16:22:00+08:00
finished_at: 2026-07-12T16:30:50+08:00
verified_facts:
  - "唯一 Experience Manifest 覆盖七场景并匹配真实 route，只登记能力引用和 top-level accepted signals"
  - "WorldSignalSnapshot 只含 time/content/journey/runtime/lighthouse，不含 riverSpeed/beamAngle/particleCount"
  - "Runtime Store 归约 clock/visibility/scene/migration/journey/sound/lighthouse 低频事件"
  - "subscribeSelector 以 Object.is 比较选中切片；声音更新不会通知时间 selector"
  - "clean production Profiler 实测无关 motion/sound 更新：旧 Context 时间消费者 delta=1，分片时间消费者 delta=0"
  - "决策为 migrate-to-sliced-store；C.4 保留 useWorldRuntime facade，不做全量组件重写"
hypothesis:
  id: H-04
  result: passed
files_changed:
  - "src/world/experience/types.ts"
  - "src/world/experience/manifest.ts"
  - "src/world/runtime/signals.ts"
  - "src/world/runtime/events.ts"
  - "src/world/runtime/store.ts"
  - "src/world/runtime/store.test.ts"
  - "src/components/status/RuntimeSubscriptionProfiler.tsx"
  - "src/app/status/page.tsx"
commands:
  - command: "manifest/store node:test, typecheck, lint and diff check"
    exit_code: 0
    observed: "4 tests pass"
  - command: "fresh production build and /status runtime React profiler"
    exit_code: 0
    observed: "legacy delta=1; sliced delta=0; sourceDirty=false; decision=migrate-to-sliced-store"
evidence:
  - "c3-profiler-build.log sha256=af2433e32a1d771b0672b3f5d60d1fe1594596535ad51e78ff8606b1dabf1c8f"
  - "c3-react-profiler.log sha256=6d352cc77b7d77c39347ab4f08f7563aab123119526d4e0f4c01bf722db5086a"
  - "c3-store-validation.log sha256=0d0a2479c113395cf2dc42a816f15258467f87e516cfcb7e3a1e1806aa25046c"
  - "c3-manifest-store-profiler.json sha256=5b4a00173c38d0afc6b2e0952931e1119522368c4faae21988629f5aa02ab345"
failures:
  - "首次 Profiler effect 在兼容清理后未复位 started，生产探针超时"
fixes:
  - "改用 runtime ref 和稳定 store effect；未完成清理复位，fresh build 重测通过"
commit: "e9e93206a54d3424a6b6f19bd5bb7694a0dc8726 fix(world): 稳定运行时订阅性能探针"
next_item: C.4
```

### Record LW-023：C.4 兼容运行时接入世界时钟

```yaml
record: LW-023
checkpoint: C
item: C.4
status: passed
started_at: 2026-07-12T16:32:00+08:00
finished_at: 2026-07-12T16:40:08+08:00
verified_facts:
  - "WorldRuntimeProvider 保留 useWorldRuntime 兼容 facade，并提供分片 selector"
  - "WorldClockController 按分钟边界更新；hidden 清除 timer，visible 使用当前 epoch 立即重建"
  - "clean production Atlas 实测发生真实 minute tick，隐藏期 epoch 不变，恢复后 epoch 更新"
  - "时间、可见性、场景和声音进入唯一 Store；不存在每帧 React state"
  - "fresh build sourceDirty=false，build source commit 为 fc8e1b23，浏览器无 console error"
hypothesis:
  id: H-04
  result: passed
files_changed:
  - "src/components/world/WorldRuntimeProvider.tsx"
  - "src/world/runtime/clock.ts"
  - "src/world/runtime/clock-lifecycle.test.ts"
commands:
  - command: "runtime clock/scheduler/store node:test, typecheck, lint and diff check"
    exit_code: 0
    observed: "16 tests pass; engineering checks pass"
  - command: "fresh production build and /atlas minute/visibility browser verification"
    exit_code: 0
    observed: "minute tick observed; hidden paused; visibility resume rebuilt; sourceDirty=false"
evidence:
  - "c4-targeted-validation.log sha256=eb06a33a4b1d739506e6849c0115c7408775c82971656d200c9d768f4e1d792c"
  - "c4-fresh-build.log sha256=882322703409b25471b2940f2722cdcc77d65ab6935770596544993a3cd61174"
  - "c4-live-clock-browser.log sha256=7a19df93e2f040a8ff1cfe94bd4d9dd1399289c43af5ab19f752204fef218d0c"
  - "c4-provider-clock-integration.json sha256=fdf36086db9923ba53af8a64e587f9300d9646f52b139bc48def25c7df128da9"
failures:
  - "首次 CDP frozen/active 验证未触发标准 visibilitychange，不能作为浏览器可见性事件证据"
fixes:
  - "改用 document.hidden 与标准 visibilitychange 契约实测；独立单测覆盖 listener/timer 清理"
claim_boundary:
  - "C.4 只证明低频时钟与兼容适配，不证明 Gateway 持续生命或十分钟稳定运行"
commit: "fc8e1b23a24e36ae94b1bdd5ef9eddddf36b0be4 feat(world): 将兼容运行时接入世界时钟"
next_item: C.5
```

### Record LW-024：C.5 Gateway 分层持续环境样板

```yaml
record: LW-024
checkpoint: C
item: C.5
status: passed
started_at: 2026-07-12T16:48:30+08:00
finished_at: 2026-07-12T16:58:12+08:00
verified_facts:
  - "Provider 唯一持有 Ambient Coordinator；场景替换最多一个 adapter 和一个 rAF"
  - "Gateway 分为电影材质、语义空间、可操作目的地、持续环境和有限入场五层"
  - "星点、雾位移、浮屿起伏和灯塔扫光由世界日期、dayProgress、内容与确定性 elapsed 驱动"
  - "desktop 与 LAN 在入场后 4.2 秒变量继续变化；reduced/mobile 为 paused 且语义方向保留"
  - "hidden paused 后 2.2 秒 fog 变量保持 13.747px；localhost/LAN console error 均为空"
  - "background-hidden 后月轮、三浮屿、三路线、灯塔和三个可操作方向仍可辨认"
hypothesis:
  id: H-05
  result: passed-for-gateway-only
files_changed:
  - "src/world/runtime/coordinator.ts"
  - "src/world/scenes/gateway/module.ts"
  - "src/components/world/WorldRuntimeProvider.tsx"
  - "src/components/product/WorldGatewayStage.tsx"
  - "src/components/product/WorldGatewayStage.module.css"
commands:
  - command: "coordinator, scheduler and Gateway adapter node:test; typecheck; lint; diff check"
    exit_code: 0
    observed: "8 targeted tests pass; engineering checks pass"
  - command: "fresh production build bound to dbd5a837"
    exit_code: 0
    observed: "sourceDirty=false; shared 103 kB; Gateway first load 175 kB; no new dependency"
  - command: "localhost/LAN Playwright desktop, mobile, background-hidden, reduced and hidden runtime review"
    exit_code: 0
    observed: "running changes in desktop/LAN; paused values stable in reduced/mobile/hidden; five raw screenshots manually reviewed"
evidence:
  - "c5-browser-runtime-attempt-2.log sha256=4b96c8799e69eb3f053d0fd02f88961dddea3ccb72dabd5f0082f055d84da1cd"
  - "c5-fresh-build-attempt-2.log sha256=66091d558ff66d121aed9047527bebc584770dc692a23a9ce9a0e65db3cbea73"
  - "c5-gateway-living-stage.json sha256=9a777cac50921a1e0d3daf1032b3f29f93452bad3c322e76736ae2b0e9f25ace"
failures:
  - "红灯阶段 coordinator 与 Gateway module 不存在"
  - "第一版不透明 spatial base 覆盖电影材质，正常模式退化为线框骨架"
  - "首次浏览器探针定位到继承样式宿主，并在 hidden 状态落稳前取样"
fixes:
  - "建立唯一 coordinator 和场景 adapter；电影材质健康时结构透明叠合，资源失败/background-hidden 时增强结构"
  - "第二轮使用稳定 data-gateway-stage，等待 paused 后再取 hidden 基线"
claim_boundary:
  - "只证明 Gateway 样板；Gate C、十分钟 soak、长录屏、声音、Atlas、Node 和迁移仍未通过"
commit: "dbd5a8376f10770c6277e87ebbaa480903a8e2b3 fix(world): 恢复入口电影材质与结构降级"
next_item: C.6
```

### Record LW-025：C.6 Atlas 内容生命星图

```yaml
record: LW-025
checkpoint: C
item: C.6
status: passed
started_at: 2026-07-12T17:02:00+08:00
finished_at: 2026-07-12T17:14:42+08:00
verified_facts:
  - "Atlas 模型从公开节点引用携带 lifeStage/status/updatedAt/relationReasons，不在前端猜事实"
  - "代表节点默认呈现为星体；亮度由生命周期、新鲜度、重要度、关系和最近访问确定投影"
  - "Atlas adapter 复用唯一 coordinator，只缓存语义 node/link 并写 CSS/SVG 属性"
  - "tech 聚焦子图有 2 条真实关系边，1.3 秒 offset 从 -46.684 推进到 -61.314"
  - "background-hidden 下 8 区域、8 事实关系、4 技术节点、Inspector 和进入地点链接仍可操作"
  - "六节点确定性轨道回归通过；自然 pointer click 不再被重叠节点拦截"
hypothesis:
  id: H-05
  result: passed-for-atlas-only
files_changed:
  - "src/world/scenes/atlas/module.ts"
  - "src/lib/scenes/build-atlas-model.ts"
  - "src/components/atlas/AtlasExplorationStage.tsx"
  - "src/components/atlas/AtlasSceneSvg.tsx"
  - "src/components/atlas/AtlasInspector.tsx"
  - "src/components/atlas/AtlasExplorationStage.module.css"
commands:
  - command: "Atlas projection/model/coordinator node:test, typecheck, lint and diff check"
    exit_code: 0
    observed: "5 tests pass; engineering checks pass"
  - command: "fresh build and natural Playwright Atlas area/node/background-hidden flow"
    exit_code: 0
    observed: "sourceDirty=false; Atlas 148 kB; node phase and focused link offsets change; natural node click opens Inspector"
evidence:
  - "c6-targeted-validation.log sha256=15bae6de89e4a36729030587a44a7000db335a25464646036648d853882aaae7"
  - "c6-fresh-build-attempt-2.log sha256=fcaf995428988a9f1ed5c970038ba4e6bb17e317082e449ec239570c0f3201ea"
  - "c6-browser-attempt-4.log sha256=4ab3a2679bf12f89b91612dd7fb21c55bd3b7a8f2f7142e7dcf7cebf160f4581"
  - "c6-atlas-living-constellation.json sha256=946d9a447a887535a14515c3dbfc9137943bb9ce3ebe761c5a9353ef4b794b24"
failures:
  - "第 4 个代表节点复用了三项偏移中的第 1 项，按钮坐标重叠并拦截自然点击"
  - "Inspector 固定声称 3 个入口，但真实事实投影为 4 个"
  - "首个 active-link 探针把复合条件写成后代 Locator，错误得到零边"
fixes:
  - "扩充六个唯一节点轨道并添加回归；入口数量使用 areaNodes.length"
  - "使用同元素复合 selector，tech 事实子图验证 2 条动态关系边"
claim_boundary:
  - "只证明当前 Atlas 语义子图；长时、全缩放、mobile/reduced 和跨路由清理留待 C.10-C.13"
commit: "42eca2c06d257badc81822713c6295c2eee20499 fix(world): 消除星图节点轨道重叠"
next_item: C.7
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
| 2026-07-12T00:44:41+08:00 | A.2 | 五场景 background-hidden 主交互不可见，人工复核七场景均未达语义主体要求 | 静态 WebP 仍承担空间主体，资源失败 fallback 多为列表 | 保留为 fresh 反基线；C-E 渐进拆分语义对象、持续环境与位图层 | A.2 expected-defect validator | recorded |
| 2026-07-12T01:30:25+08:00 | A.8 | fresh evidence 第一张图因浏览器资源正则非法而中止 | 模板字符串中的单层反斜杠在 Runtime.evaluate 前被 Node 消耗 | 先加红灯契约，再双层转义并完成 84 个本机/LAN 观察 | A.8 full evidence rerun | fixed |
| 2026-07-12T14:47:00+08:00 | A.9 | Codex CLI 与 fresh subagent 在推理前命中用量上限；Claude CLI 未登录 | 当前独立视觉模型通道外部不可用，没有 reviewer 读到图片 | 保持 A.9 未勾选，不进入 B；额度恢复后重试 fresh 只读 reviewer | A.9 independent review | blocked_external_open |
| 2026-07-12T15:06:30+08:00 | A.9 | 上次 reviewer 通道外部阻断 | fresh subagent 配额恢复 | reviewer 先看六图与时长后完成只读审查，P1 与未完成结论全部保留 | A.9 independent review | resolved |
| 2026-07-12T15:59:00+08:00 | B.9 | `check:scripts` 报 totalScripts 306/307 | 新增 `world:export` 后未同步 active registry 与计数 | 登记当前入口并精确更新为 307，不提高阈值 | B.9 strict engineering rerun | fixed |
| 2026-07-12T16:04:00+08:00 | B.9 | 联系表并行显示 LAN 六图大面积黑块 | 审查显示链异常，不是原始 PNG 或 LAN 渲染 | 回算原图 hash/像素，逐张打开；四图逐字节一致，另两图仅动态区域不同 | B.9 raw screenshot audit | false-positive-resolved |
| 2026-07-12T16:56:00+08:00 | C.5 | 第一版 Gateway 正常模式只剩线框结构，电影材质不可见 | spatial base 不透明背景层位于位图上方 | 健康位图时透明叠合；资源失败/background-hidden 时增强独立结构；fresh build 重拍 | C.5 browser visual attempt 2 | fixed |
| 2026-07-12T17:03:00+08:00 | C.5 | 首次 hidden 探针有 0.006px 在途帧且状态字段为空 | 采样了继承变量的 WorldViewport，并在 pause 落稳前取基线 | 增加稳定 stage 标记，等待 paused 后采样；2.2 秒值完全不变 | C.5 browser runtime attempt 2 | fixed |
| 2026-07-12T17:13:00+08:00 | C.6 | Atlas 聚焦后第一个节点无法自然点击 | 4 个代表节点复用 3 个偏移，第 4 个与第 1 个精确重叠 | 六个唯一确定性轨道、坐标回归与真实入口计数；fresh build 重测自然点击 | C.6 browser attempt 2 | fixed |
| 2026-07-12T17:18:00+08:00 | C.6 | active relation probe 错报零边 | Playwright 在 line 元素下查后代而非同元素复合条件 | 改用复合 selector，并在 tech 星域验证两条 offset 持续变化的事实边 | C.6 browser attempt 4 | fixed |

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
| 全部自动验证和 Ollama 固定评测通过，但无真实人类音频签收 | `LOCAL_LIVING_WORLD_CANDIDATE_AI_PROVIDER_HUMAN_AUDIO_PENDING` |
| 真实人类音频签收记录存在 | 本 Goal 仍保持待签后缀；用户 Goal 外复核后才可批准无后缀状态 |
| Ollama 未通过正常、依据、权限、冷/热启动或故障评测 | 继续修复或按外部阻断规则暂停；fallback-pending 不构成完成 |
| 长期用户 / 内容 / 保存证据不足 | 不影响候选，但不得声明 `LONG_LIVED_WORLD` |

禁止输出：完美、终局宇宙、无限扩展、长期陪伴已证明、所有目标都完成、数字体验分。
