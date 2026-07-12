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
current_checkpoint: B
current_item: B.5
task_state: in_progress
active_record_id: LW-014
last_successful_command: "B.4 six public projection and search revision validation"
resume_action: "implement B.5 lightweight public world export manifest and checksums"
last_completed_item: B.4
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
| 内容投影门 | B | pending | 真实节点、六投影、export、restore、rollback |
| 生命样板门 | C | pending | 十分钟 soak、3 长录屏、hidden / quiet / background-hidden |
| 感官原型门 | E | pending | Timeline 河流视频、音频技术包、可选人类签收、mobile trace |
| 扩展门 | D / E | pending | 单 manifest、单 lifecycle、新场景无五处修改 |

## 7. 检查点状态

| Checkpoint | 目标 | 状态 | Commit | Evidence |
| --- | --- | --- | --- | --- |
| A | 撤销继承式完成与新鲜基线 | passed | 0c91f59c | `checkpoint-a/a8-2026-07-12/` |
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
completed_items: [A.1, A.2, A.3, A.4, A.5, A.6, A.7, A.8, A.9, B.1, B.2, B.3, B.4]
failed_items: []
blocked_items:
  - id: G.3-human-audio-signoff
    reason: "Codex 只完成音频技术验证；无真实人类签收时不阻塞自动 Goal，但最终状态必须保留 HUMAN_AUDIO_PENDING"
next_item: B.5
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
