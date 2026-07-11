# WorldOS 元总控契约

> [!IMPORTANT]
> 本文档是 WorldOS 当前最高产品与开发契约。它撤销对旧完成声明的继承，但不否定可复用代码。Goal 执行者不得修改本文档来降低目标或绕过失败。

## 1. 结论

WorldOS 已经不是最初的普通博客模板，但也没有达到此前账本声称的完整世界状态。当前最准确的描述是：

```text
CINEMATIC_STATIC_WORLD_IN_PROGRESS
```

它拥有七套电影感场景图、热点、内容出口和短动效；世界主体仍主要由静态 WebP 承担，持续生命、真实迁移、内容生长、声景和长期回访没有被充分实现或验证。

旧 `LOCAL_WORLD_COMPLETE_AI_FALLBACK` 只保留为历史记录，不再具有产品完成效力。最新证据中的九段录屏时长约为 1.72 至 10.16 秒，不能证明现行体验验收要求的 60 至 120 秒持续运行、十分钟纵向样板或长期回访。

本控制包只定义一个可由 Codex Goal 完成的结果：

> **在 localhost / LAN 上交付一个公开、静态可达、动态持续、迁移连续、内容可生长、声音可控、灯塔诚实、可导出恢复的生命世界候选。**

## 2. 权威链与最小文档集合

每次开始和恢复只强制读取六项，其中第一项由 Codex 自动读取：

| 顺序 | 文件 | 作用 | Goal 内状态 |
| --- | --- | --- | --- |
| 1 | `AGENTS.md` | 仓库规则、优先级、授权与完成禁令 | 冻结 |
| 2 | 本文档 | 价值、目标、范围、事实状态与停止条件 | 冻结 |
| 3 | `worldos-living-world-experience-acceptance-2026-07-11.md` | 用户体验、场景、动态、声音、AI 与真实证据 | 冻结 |
| 4 | `worldos-living-world-architecture-data-contract-2026-07-11.md` | 事实模型、模式、模块、权限、保存与技术准入 | 冻结 |
| 5 | `worldos-living-world-execution-plan-2026-07-11.md` | A-H 固定执行任务与风险门 | 只可勾选 |
| 6 | `worldos-living-world-execution-ledger-2026-07-11.md` | 唯一恢复指针、假设、失败、证据和提交 | 可更新 |

`worldos-living-world-one-shot-goal-prompt-2026-07-11.md` 只是用户的一次触发入口，不要求每次恢复重读。`worldos-living-world-control-v1.json` 与校验器负责冻结和结构一致性。

控制校验只证明权威文本、任务顺序、恢复指针与批准 Git 基线一致，输出固定为 `CONTROL_INTEGRITY_PASS`；它不能读取人的真实感受，也不得产生产品完成结论。

终局校验也不接受 evidence manifest 自报：manifest 只索引原始、带 hash 的 trace、媒体、性能、权限、导出、资产与独立审查文件，校验器必须自行回算可机器判定项。视觉感受仍依赖两个不同只读 reviewer task；这是一条可审计的程序性信任边界，不冒充密码学身份认证。

2026-07-11 的五份 Living World 文档是本包的研究输入；2026-07-10 的 Reality-First 文档、旧 M/Phase/RC 文档和报告是历史事实与反例。它们都不能覆盖本包。

## 3. 价值与优先权

WorldOS 首先服务作者和数据主体，其次服务获得授权的读者与公开访问者，最后才服务 AI、工具与实现者。

发生冲突时按以下顺序取舍：

1. 人的真实、隐私、控制权、尊严和可撤回性。
2. 原始事实、权限、版本、来源、权利、导出与恢复。
3. 阅读、理解、探索、返回和低门槛。
4. 世界感、生命感、声音、音乐与灯塔陪伴。
5. 技术新颖性、抽象纯度、开发速度和演示效果。

W3C 的设计原则要求优先用户需要、最小化数据并谨慎新增能力；本项目把这一顺序具体化为产品否决规则，而不是口号。[来源：W3C Web Platform Design Principles](https://www.w3.org/TR/design-principles/)

## 4. 三个时间尺度

### 4.1 终极愿景

终极 WorldOS 是一个由作者长期拥有的个人数字世界：

- 公开空间用于分享、阅读和探索。
- 私密空间用于个人记忆与受控关系，但不会因前端隐藏而泄漏。
- 作者工作台用于本机维护、审核、回滚和演化。
- 可移植包让事实、内容、资产、权限和版本不依赖当前 UI 或服务继续存在。
- 灯塔在获得合法 Provider 时成为只读陪伴者，缺席时世界仍完整。
- 经过真实时间、真实内容和真实回访后，才可能成为长期生命世界。

这是一条长期产品方向，不是当前 Goal 的停止条件。

### 4.2 本次唯一交付

当前 Goal 默认自动交付 `LOCAL_LIVING_WORLD_CANDIDATE_AI_PROVIDER_HUMAN_AUDIO_PENDING`：

- localhost 与 LAN IP 可运行。
- 公开世界七场景具有持续、可暂停、各不相同的生命。
- 同一公开事实源支持静态和动态两种投影。
- 主要迁移、内容生长、回访、声音、Ollama 实时灯塔与 low-light 故障回退形成闭环。
- 事实可以导出、校验并在临时工作区恢复。
- 权限、性能、可访问、移动端与故障边界真实通过。

Codex 可以完成音频生命周期、峰值、频谱、接缝、离线渲染和资源释放等技术验证，但不能冒充真实人类在耳机与扬声器上的听感签收。本 Goal 无论是否收到一份自报签收记录，最终状态都必须保留 `HUMAN_AUDIO_PENDING`；去掉后缀只能由用户在 Goal 外核验后批准新的控制版本。

### 4.3 不能由一次 Goal 声明的结果

- 真实用户愿意长期逛、长期回访或形成陪伴关系。
- 数月或数年的内容演化、媒介迁移和恢复可靠性。
- 完整私密宇宙、家庭协作、继承、纪念与跨设备同步。
- 超出固定十例和当前公开事实范围的长期 AI 陪伴质量；当前仅交付私有 LAN Ollama 的受控只读灯塔候选。
- “无限扩展”。本项目只承诺已测规模和越界后的升级触发器。

## 5. 产品模式

WorldOS 不是一个页面集合，而是同一事实主权下的不同模式：

| 模式 | 服务对象 | 当前 Goal | 关键边界 |
| --- | --- | --- | --- |
| Public World | 匿名 / 授权读者 | 完整实现 | 只能消费公开投影 |
| Quiet / Static World | 减少动效、无声、无 JS 或失败环境 | 完整实现 | 主要任务和语义不丢失 |
| Owner Studio | 本机作者 | 保持并验证 CLI 维护 | 不向 LAN 暴露写 API |
| Status / Observatory | 开发与验收 | 完整验证 | 不进入访客主旅程 |
| Private World | 作者与未来授权者 | 只保留数据与权限不锁死 | 不实现公开 UI 或伪登录 |
| Legacy / Transfer Package | 作者、未来自己或受托人 | 实现公开事实的最小导出恢复底座 | 不实现私密备份和完整继承流程 |

模式不是角色字符串。权限事实必须由服务端与数据投影控制。

## 6. 世界本体与术语

为避免“场景、区域、页面、节点”混用，本包固定以下语言：

| 术语 | 含义 | 所有者 |
| --- | --- | --- |
| World Fact | Node、Area、Relation、Path、Event、Visibility 等原始事实 | World Kernel |
| Area | 内容语义地理，如创作、记忆、规则 | 事实层 |
| Scene | 观察和操作世界的一种空间镜头，如 Atlas、Timeline | 体验层 |
| Node / Place | 可阅读、可关联、可进入的内容地点 | 事实 + 投影 |
| World Signal | 时间、季节、内容新鲜度、关系、旅程、偏好等共享输入 | Runtime |
| Scene Life | 场景对信号的私有视觉、运动与声音解释 | Scene Module |
| Migration | 来源对象到目标对象的连续空间行为 | Coordinator |
| Visit Memory | 可清除、最小化的本地访问与路径状态 | Memory |
| Preservation Record | 原件、衍生物、权利、校验和、版本和操作事件 | Export / Authoring |
| Evidence | 最新构建上的截图、录屏、试听、trace 与人工观察 | QA；不进入公开 UI |

Scene 不能复制 Area；表现层不能创建第二套 World Fact。

## 7. 从结果逆向设计

本项目采用“期望感受 -> 可观察动态 -> 最小机制 -> 代码”的顺序。借鉴 MDA 中从体验结果和系统动态反推机制的做法，不从框架和组件数量推导世界感。[来源：MDA 原始论文](https://www.cs.northwestern.edu/~hunicke/MDA.pdf)

每个高风险能力必须写成可证伪假设：

```text
期望感受：用户认为 Timeline 是一条正在流动的时间河。
可观察动态：进入动画结束 60 秒后，河面沿时间方向持续流动；事件只产生局部涟漪。
最小机制：一个当前场景 adapter + SVG/Canvas 绘制 + 低频信号快照。
失败条件：关掉背景图后只剩卡片或标签；reduced-motion 后事件不可达；mobile 卡顿。
处置：修改或删除原型，不复制到其他场景。
```

任何“看起来完成”的判断都必须回到用户可观察动态。

## 8. 事实、决策、假设与实验

文档和账本只能使用四类状态：

| 类型 | 定义 | 例子 |
| --- | --- | --- |
| Verified Fact | 由当前代码、构建、浏览器或数据直接支持 | 时间只在首次挂载计算 |
| Frozen Decision | 用户批准且由控制包固定的取舍 | 当前不做外部部署 |
| Hypothesis | 可能实现目标但尚未证实的方案 | SVG 河流能在 mobile 达到预算 |
| Experiment | 有时限、通过 / 失败条件和删除路径的验证 | Gateway-Atlas-Node 十分钟样板 |

不得把 Hypothesis 写成架构事实，也不得把 Experiment 通过外推为完整产品通过。

## 9. 固定风险门

执行计划 A-H 内含四个不能绕过的风险门：

1. **内容投影门**：一个真实公开节点只改事实源，就能自动进入需要的场景、灯塔、导出与回滚。
2. **生命样板门**：Gateway -> Atlas -> Node -> Gateway 连续运行十分钟，证明时间、环境、迁移、返回、静谧和资源清理。
3. **感官原型门**：Timeline 河流和一个世界音乐动机通过连续真实录屏与音频技术验证，才允许扩到七场景；真实人类听感签收独立记录，缺少时保留状态后缀。
4. **扩展门**：新场景或新内容不得修改五处平行 registry，不得复制 runtime、权限或事实模型。

任一门失败，继续在同一门内修正假设；不得以“后续再优化”进入规模化阶段。

## 10. 一个 Goal 的边界

OpenAI 将 Goal 定义为跨轮持续推进且有可验证停止条件的工作，并明确建议目标大于单轮任务但小于松散 backlog，预先写清不应修改什么、验证方式和停止条件。[来源：Codex Follow a goal](https://learn.chatgpt.com/use-cases/follow-goals)

因此本 Goal：

- 只有一个交付结果，不把 A-H 建成多个 Goal。
- 终极愿景保留为方向，不塞入当前可执行范围。
- 账本承担压缩、恢复和失败记忆；恢复后从第一项未完成任务继续。
- 机器执行状态把每个 checkbox 绑定到命令、原始证据和 Git 可反查提交，避免只改 Markdown 勾选。
- 每个检查点完成后自动进入下一项，不等待用户重复“继续”。
- 每一项只做与改动相称的定向验证；一个高内聚提交最多覆盖同一检查点四项。完整 build、LAN、九模式媒体与独立审查只在 A-H 检查点边界执行，避免九十次重复重型流水线。
- 同一检查点的 fresh 原始媒体或 trace 可以被多个完成记录引用，但每项必须有独立命令、观察与状态记录；跨检查点、跨 source commit 或旧 Goal 证据不得复用。
- 不允许新增下一轮、下一阶段或第二份执行计划来移动终点。
- 真正外部秘密、用户事实或权限缺失时，只阻塞相关可选能力；其余工作继续。
- 同一风险门连续三次完整、彼此有差异且已执行删除 / 简化路径的实验仍失败时，进入 `BLOCKED_DESIGN_REVIEW_REQUIRED` 并请求 Goal 外决策；这不是降低验收，也不允许继续复制失败方案。

## 11. 本地优先与长期主权

本项目采用 local-first 原则中的数据所有权、离线可用与可导出思想，但不为当前单作者场景预装 CRDT 或多端协作。至少做到：

- 本地事实文件是权威副本，不以远程服务为生存前提。
- 导出使用通用、可读、带 checksum 的文件。
- 原始对象与体验衍生物分离，当前 UI 消失后事实仍可理解。
- 记录权利、版本和操作事件，支持临时工作区恢复演练。
- 当前候选只导出公开事实；私密备份需要未来独立授权、加密、审计与恢复契约。

[Ink & Switch 的 local-first 论文](https://www.inkandswitch.com/essay/local-first/)强调本地副本、长期控制与通用导出；[OCFL](https://ocfl.io/)强调完整、可解析、版本化和可迁移；[PREMIS](https://www.loc.gov/standards/premis/)与[NDSA Levels](https://www.ndsa.org/publications/levels-of-digital-preservation/)提供长期保存原则。本项目只借用必要原则，不照搬机构级标准或新建复杂仓储系统。

## 12. 复杂度约束

- 强制读取文档固定为六项，不继续增加。
- 新开发只使用这一份执行计划和一个账本；研究与 ADR 按需读取。
- 一种事实、状态、持续资源和注册入口只能有一个 owner。
- 同一能力第三次真实重复前不抽象通用框架。
- 新依赖必须替代更高的复杂度，并给出删除与静态降级路径。
- 日常命令最终不超过 8 个；历史脚本可以保留隔离，但不能成为认知入口。
- 沉浸感优先来自内容、空间、因果和连续性，不来自粒子数量、3D 或全屏滤镜。
- Calm Technology 提醒环境技术只在必要时占据注意力；Node、Archive 与阅读模式必须允许世界退到周边感知。[来源：Calm Technology](https://calmtech.com/book)

## 13. 授权与禁区

触发一次性 Goal 即批准：控制包范围内的本地代码、数据 schema、视觉 / 音频资产、测试、报告、临时实验和中文 Git 提交。

不包含：

- 外部部署、域名、HTTPS、云资源和 push。
- 购买、订阅、下载许可不清的资产或秘密获取。
- 创建、公开或推断作者的私密人生事实。
- 破坏性 Git 操作、删除用户已有改动或结束未知进程。
- 用前端身份、localStorage 或 LAN 地址替代真实权限。

## 14. 固定停止条件

只有以下条件全部为真，Goal 才可结束：

1. 执行计划 A-H 全部勾选，每项有账本记录、命令、证据和中文提交归属；单个提交最多覆盖同一检查点四项。
2. 四个风险门真实通过，没有用条件放宽、脚本自报或旧证据继承。
3. 七场景在 background-visible、background-hidden、text-hidden、desktop、mobile、reduced-motion、reduced-sensory、JS-off 中达到体验验收。
4. 每个场景有连续、未剪辑、非重复拼接的 60 至 120 秒静置生命录屏；纵向样板有十分钟 soak；30 次迁移后资源稳定。
5. 时间 / 季节、内容更新、回访、声音、Ollama Provider、AI fallback、权限、导出恢复和资源失败形成闭环。
6. 两个不同的 fresh 独立 reviewer context 先看图、录屏、音频技术记录与已有的人类签收，再看报告；若首轮发现缺陷，第二轮必须晚于对应修复 commit；所有 P0/P1 为零。
7. typecheck、lint、fresh production build、world experience、mainline、local RC 和 diff check 通过。
8. 最终证据晚于最终源码、数据、资产、构建和服务器。

本 Goal 最终只可声明：

- `LOCAL_LIVING_WORLD_CANDIDATE_AI_PROVIDER_HUMAN_AUDIO_PENDING`。

`LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK_HUMAN_AUDIO_PENDING` 是 Provider 无法通过时的诚实未完成事实，不是本 Goal 的替代终点。`LOCAL_LIVING_WORLD_CANDIDATE_AI_PROVIDER` 只有在用户于 Goal 外核验真实听感与证据并批准新控制版本后才能进入；当前 Goal 不得自行去掉后缀。

不得声明 `LONG_LIVED_WORLD`、完美、终局宇宙、无限扩展或数字体验分。真实用户长期回访、完整私密世界与继承仍属于终极愿景，不由本 Goal 冒充完成。

## 15. 元总控自我限制

系统思维不是全知。Donella Meadows 对杠杆点的说明本身强调复杂系统需要谦逊和持续修正；本控制包也必须保留被证据推翻的能力。[来源：Leverage Points](https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/)

因此：

- 本文档冻结的是价值、边界和否决项，不冻结未经验证的实现假设。
- Goal 可以在账本中改变实现方案，但不能降低用户结果。
- 新事实若证明控制包自身存在方向错误，必须暂停 Goal，由用户在 Goal 外批准新版本，而不是执行者悄悄修标准。
