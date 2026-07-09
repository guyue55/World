# WorldOS 受管控执行计划

> [!IMPORTANT]
> 本计划是后续开发的总执行入口。所有阶段必须接受世界体验总控、开发文档总清单、质量把控体系、技术栈调研、场景制作矩阵、性能预算和本地 / LAN 观测规格的监管。

## 1. 执行目标

在暂不考虑外部 Preview / Production 的前提下，把 WorldOS 打磨成本地 / 局域网可运行的个人数字世界运行时。

目标状态：

- 第一眼不像普通博客骨架。
- Home、Atlas、Node、Paths、Timeline、Archive、Lighthouse 有明确场景人格。
- 场景迁移不是普通页面切换。
- 氛围、音频、AI 均可选、可降级、可审计。
- 内容节点被地图、路径、时间河、档案馆和灯塔共同吸收。
- 本地 / LAN RC 能真实证明可运行。

## 2. 管控文档

每个阶段必须遵守：

| 管控文档 | 管控内容 |
| --- | --- |
| `worldos-high-goal-readiness-audit-2026-07-09.md` | 目标高度、缺口、臃肿风险 |
| `worldos-experience-governance-master-control-2026-07-09.md` | 世界体验总目标和场景人格 |
| `worldos-development-documentation-master-list-2026-07-09.md` | 开发文档入口和阅读顺序 |
| `worldos-predevelopment-document-completion-index-2026-07-09.md` | 开发前文档补齐状态 |
| `worldos-quality-control-system-2026-07-09.md` | 质量门禁和体验验收 |
| `worldos-tech-stack-and-open-source-research-2026-07-09.md` | 技术选型与依赖否决 |
| `worldos-full-goal-document-gap-analysis-2026-07-09.md` | 高目标下的文档和计划缺口总审计 |
| `worldos-complete-goal-mode-document-pack-2026-07-09.md` | M0-M18 Goal 模式完整文档包 |
| `worldos-scene-production-matrix-2026-07-09.md` | 场景生产规格 |
| `worldos-transition-choreography-spec-2026-07-09.md` | 转场编舞 |
| `worldos-atmosphere-sensory-system-spec-2026-07-09.md` | 氛围与感官 |
| `worldos-performance-asset-budget-2026-07-09.md` | 性能和资产预算 |
| `worldos-local-lan-observability-spec-2026-07-09.md` | 本地 / LAN 观测 |

## 3. 里程碑

| 里程碑 | 目标 | 完成标准 |
| --- | --- | --- |
| M0 文档锁定 | 所有开发前文档补齐 | `check:docs` 通过，索引完整 |
| M1 场景运行底座 | 场景壳、状态机、转场、观测接入 | 核心路由可观测、可降级 |
| M2 Home + Atlas 世界入口 | 第一眼进入世界，Atlas 像地图 | 人工验收不再像博客骨架 |
| M3 Node + Paths 内容旅程 | 内容像地点，路径像旅程 | 节点有区域、关系、路径出口 |
| M4 Timeline + Archive 记忆系统 | 时间河与档案馆人格成立 | 时间和档案都能回到节点 |
| M5 氛围 + 音频试点 | 感官层可控、可静音、可降级 | opt-in、reduced-sensory 通过 |
| M6 Lighthouse AI 运行试点 | 服务端只读问路与推荐 | dry-run / fallback / 审计可用 |
| M7 本地 / LAN RC 固化 | 本地可信验收闭环 | `release:local-rc` 输出可信摘要 |
| M8 世界入口与主舞台 | 第一眼不再像博客骨架 | Home 人工体验量表通过 |
| M9 四大核心场景舞台化 | Atlas / Timeline / Archive / Paths 明显不同 | 四场景截图一眼可区分 |
| M10 Node 地点化阅读 | 节点像地点，阅读像进入房间 | Node 不再只是文章详情 |
| M11 场景迁移叙事化 | 跳转像迁移 | 来源、预告、抵达、沉淀可见 |
| M12 灯塔导览可感知化 | 灯塔像观测站 | 问路、解释、推荐、边界可感知 |
| M13 感官音频资产 | 氛围、声音、视觉资产可控运行 | 默认无声、可关闭、可授权、可降级 |
| M14 灯塔 AI 运行化 | 服务端只读 AI 问路与推荐 | 无前端 key、无私密泄漏、有审计 |
| M15 内容世界生产 | 真实节点和关系支撑探索 | 多场景共享同一内容事实源 |
| M16 性能依赖硬化 | 高目标不变臃肿 | 依赖、bundle、移动端、降级通过 |
| M17 本地 QA 证据自动化 | 真实新鲜证据证明体验 | localhost / LAN / 截图 / 人工复核闭环 |
| M18 作者治理运维 | 世界可持续维护 | 中文作者流程、资产审批、AI 审计、回滚可用 |

## 4. 阶段任务

> [!NOTE]
> 下方 M0-M7 是底座任务。M8-M18 的具体执行以对应阶段计划为准，不在本文重复铺开，避免总控文档臃肿。

### 阶段 M0：文档锁定

目标：确保后续开发不再缺少上游规格。

具体项：

- 确认开发前文档全部存在。
- 确认文档注册表包含所有新增文档。
- 运行 `npm run check:docs`。

退出标准：

- 文档注册通过。
- 工作树只包含计划内文档。

### 阶段 M1：场景运行底座

目标：建立统一场景壳、运行状态、转场入口和观测点。

具体项：

- 对照场景组件 API 抽取通用场景壳。
- 对照运行状态机定义首访、场景、转场、降级状态。
- 对照转场编舞规范升级 SceneTransitionShell。
- 对照本地 / LAN 观测规格输出运行摘要。

检查：

- `npm run check:scene-runtime`
- `npm run check:scene-transition`
- `npm run check:runtime-local`
- `npm run lint`

### 阶段 M2：Home + Atlas 世界入口

目标：先解决“像骨架”的第一眼问题。

具体项：

- Home 按世界入口规格重构首屏。
- Atlas 按世界地图规格表达区域、节点、关系。
- 添加静态 fallback 和 reduced-motion。
- 不引入全站 3D。

检查：

- `npm run check:homepage`
- `npm run check:atlas`
- 浏览器 desktop / mobile / reduced-motion 截图。
- 人工体验验收量表。

### 阶段 M3：Node + Paths 内容旅程

目标：让内容从文章变成地点，让路径从链接变成旅程。

具体项：

- Node 增加区域、关系、来源、出口。
- Paths 增加起点、进度、下一步、完成感。
- 内容生命契约补齐缺失字段。

检查：

- `npm run check:node-reading`
- `npm run check:path-guidance`
- `npm run check:content-life`
- `npm run check:phase24-path-quality`

### 阶段 M4：Timeline + Archive 记忆系统

目标：让时间河和档案馆具备独立人格。

具体项：

- Timeline 用时间河规格组织事件和节点。
- Archive 用档案馆规格组织检索、密度、分区。
- 两者都能回到 Node、Atlas 和 Home。

检查：

- `npm run check:timeline`
- `npm run check:content-archive`
- mobile 与 reduced-motion 验收。

### 阶段 M5：氛围 + 音频试点

目标：建立可控感官层，不增加默认负担。

具体项：

- 氛围层接入 sceneId、dayPeriod、season、aiStatus。
- 音频只做 opt-in 试点。
- 添加全局静音、音量、关闭记忆。
- reduced-sensory 关闭声音和强氛围。

检查：

- `npm run check:ambient-environment`
- 性能与资产预算复核。
- 人工验证默认无声音。

### 阶段 M6：Lighthouse AI 运行试点

目标：让灯塔从静态/规划层进入可控运行层。

具体项：

- 保持服务端 Provider adapter。
- 使用上下文裁剪和公开事实源。
- 输出问路、解释、推荐和来源。
- Provider disabled 时静态推荐回退。
- 记录审计摘要。

检查：

- `npm run check:lighthouse`
- `npm run check:ai-boundary`
- `npm run check:ai-provider-boundary`
- 私密 / vault 排除验证。

### 阶段 M7：本地 / LAN RC 固化

目标：形成可信本地验收，不被旧构建误导。

具体项：

- 使用 fresh build。
- 运行 localhost smoke。
- 运行 LAN smoke。
- 采集 desktop / mobile / reduced-motion 证据。
- 输出体验验收摘要。

检查：

- `npm run release:local-rc`
- `npm run check:rc:full`
- `npm run check:mainline`

### 阶段 M8-M12：真格世界体验落地

目标：把可信底座转化为用户可感知的世界体验。

入口文档：

- `docs/00-overview/worldos-m8-m12-true-world-experience-master-plan-2026-07-09.md`
- `docs/00-overview/worldos-m8-m12-goal-mode-prompts-2026-07-09.md`
- M8-M12 对应阶段执行计划。

检查：

- 每阶段定向检查。
- `npm run check:mainline`
- `npm run release:local-rc`
- 人工体验量表。

### 阶段 M13-M18：完整世界运行闭环

目标：让感官、音频、AI、内容、性能、证据和作者运维都进入可运行、可维护、可复查状态。

入口文档：

- `docs/00-overview/worldos-full-goal-document-gap-analysis-2026-07-09.md`
- `docs/00-overview/worldos-m13-m18-complete-world-operation-master-plan-2026-07-09.md`
- `docs/00-overview/worldos-m13-m18-goal-mode-prompts-2026-07-09.md`
- M13-M18 对应阶段执行计划。

检查：

- 每阶段定向检查。
- `npm run check:mainline`
- `npm run release:local-rc`
- 性能、权限、降级、证据和人工复核。

## 5. 操作纪律

- 每个阶段开始前读对应规格文档。
- 每个新依赖必须引用技术栈调研和性能预算。
- 每个场景必须有静态 fallback。
- 每个 AI 能力必须服务端边界和审计。
- 每个音频能力默认关闭。
- 每次提交必须中文 commit，格式 `type(scope): 中文说明`。

## 6. 防跑偏门禁

出现以下任一情况，阶段不得继续：

- 页面第一眼仍像普通博客骨架。
- 新增重型依赖但无场景收益说明。
- 动效遮挡正文或阻塞导航。
- 音频默认播放。
- AI 在前端持有 Key 或拼接权限上下文。
- 私密内容进入公开或 AI 默认上下文。
- 本地 RC 不能复现。

## 7. 完成定义

只有满足以下条件，才能称为阶段完成：

- 对应规格文档被遵守。
- 自动检查通过。
- 浏览器真实验收通过。
- 人工体验量表通过。
- 本地 / LAN 证据新鲜。
- 无新增未解释依赖。
