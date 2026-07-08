# WorldOS / 古月浮屿 完整执行计划

> 制定日期：2026-07-08
> 基线文档：`worldos-future-roadmap-2026-07-07.md` + `worldos-execution-plan-2026-07-08.md`
> 当前分支：`codex/visual-overlay-qa`
> 当前状态：`productionLive: false`（本地与局域网访问）/ 门禁全绿 / 83 公开节点

---

## 一、执行摘要

古月浮屿（WorldOS）是一个正在收束为产品形态的**个人数字世界**。本文档在原有 6 Phase 执行计划的基础上，结合已完成的工作成果和外部对标分析，制定下一阶段的完整执行计划。

**Phase 1（上线）按用户要求暂时跳过**，当前以本地和局域网访问为目标。Phase 2-6 已全部完成并提交，门禁全绿。本计划聚焦 Phase 7-12 的未来工作，同时记录已完成阶段的状态快照。

### 当前关键指标

| 指标 | 值 | 状态 |
|---|---|---|
| 公开节点 | 83 | Phase 2 完成 |
| 公开路径 | 15 | Phase 2 完成 |
| 关系星线 | 144 | Phase 2 完成 |
| 世界事件 | 30 | Phase 2 完成 |
| 内容密度门禁 | 400 字符 | Phase 2 完成 |
| 活跃脚本 | 155 | Phase 3 完成 |
| Legacy 脚本 | 631（已归档） | Phase 3 完成 |
| CI workflows | 2 | Phase 3 完成 |
| 日常命令 | 3 个核心命令 | Phase 3 完成 |
| 移动端响应式 | 全路由通过 | Phase 4 完成 |
| AI 灯塔 API | 2 个（search + ask） | Phase 5 完成 |
| 导出管线 | `npm run export:world` | Phase 6 完成 |
| 出生证明覆盖 | 83/83 节点 | Phase 6 完成 |
| 传承协议文档 | 已输出 | Phase 6 完成 |
| 门禁通过率 | 100% | `check:daily` 全绿 |

---

## 二、完成状态总览（Phase 1-6）

### Phase 1: 上线准备 — 跳过

按用户要求，暂时忽略真实上线，以本地和局域网访问为目标。当未来需要上线时，可重新启动 Phase 1 的 9 个任务（T1.1-T1.9）。

### Phase 2: 内容深耕 — 完成

| 任务 | 内容 | 提交 |
|---|---|---|
| T2.1 | 8 个核心节点扩写至 3000+ 字符 | `d871ccd` |
| T2.2 | 技术星域 8 个节点补全至 600+ 字符 + 代码块 | `f59c5e9` |
| T2.3 | 新增 31 个公开节点（52→83），补充关系和路径 | `d4445ce` |
| T2.4 | 新增 2 条跨区域路径（13→15） | `119da85` |
| T2.5 | 关系星线加密至 144 条（目标 120+） | `9b60c86` |
| T2.6 | 世界事件补充至 30 个（目标 30+） | `9b60c86` |
| T2.7 | 内容密度门禁从 300 提升至 400 字符 | `e5615f6` |
| T2.8 | 区域代表节点验证全部达标 | 无需改动 |

### Phase 3: 脚本瘦身 — 完成

| 任务 | 内容 | 提交 |
|---|---|---|
| T3.1-T3.2 | 614 个 legacy 脚本归档至 `scripts/_legacy/`，修复 tsconfig 排除路径 | `40ff338` |
| T3.3 | 17 个孤儿脚本移入 `_legacy/`，活跃脚本 171→154 | `5a242ed` |
| T3.4-T3.7 | 154 个活跃脚本添加用途注释，CI 2 个 workflow，验收通过 | `63c66fb` |

### Phase 4: 移动端验收 — 完成

| 任务 | 内容 | 提交 |
|---|---|---|
| T4.1-T4.7 | 修复 Atlas 星座图移动端溢出，确认全路由响应式断点，`prefers-reduced-motion` 已支持 | `d5ce5ab` |

### Phase 5: AI 灯塔 — 完成

| 任务 | 内容 | 提交 |
|---|---|---|
| T5.1 | AI Provider 选型文档 | `b00b3c4` |
| T5.2 | 搜索 API `src/app/api/lighthouse/search/route.ts` | `b00b3c4` |
| T5.3 | 推荐引擎 `src/lib/lighthouse-recommend.ts` | `b00b3c4` |
| T5.4 | 问答 API `src/app/api/lighthouse/ask/route.ts` | `b00b3c4` |
| T5.5 | 低光模式 `src/lib/ai-availability.ts` | `b00b3c4` |
| T5.6 | AI 上下文契约门禁 | `b00b3c4` |
| T5.7 | 成本控制：GET + `force-static` 避免写入信号 | `b00b3c4` |

### Phase 6: 传承就绪 — 完成

| 任务 | 内容 | 提交 |
|---|---|---|
| T6.1 | 导出管线 `scripts/export-world.mjs` | `964cbee` |
| T6.2 | 导出验证：83 MD / 37 JSON / 6 SVG，无私密内容 | `964cbee` |
| T6.3 | 83 个节点全部补充 `reviewed: true` | `964cbee` |
| T6.4 | 传承协议文档 `docs/00-overview/world-inheritance-protocol.md` | `964cbee` |

---

## 三、全局分析与对标

### 3.1 同类项目对比

| 项目 | 技术栈 | 定位 | 与 WorldOS 的差异 |
|---|---|---|---|
| Quartz | 自研 SSG + Obsidian | 数字花园发布器 | 专注 Obsidian 发布，无世界模型、无权限分层、无 AI 边界 |
| Astro | 自研 SSG | 通用静态站点生成器 | 通用框架，不提供内容世界化、路径引导和节点护照 |
| Maggie Appleton 数字花园 | Next.js + MDX | 个人数字花园 | 概念先驱，但无产品化、无门禁体系、无权限边界 |
| Logseq | Clojure + React | 本地优先知识管理 | 本地知识图谱，不面向公开世界发布 |
| TuanManhCao/digital-garden | Obsidian + Quartz | 免费 Obsidian Publish 替代 | 聚焦发布，不含创世台、私密层和生命档案 |

### 3.2 WorldOS 的独特定位

1. **世界模型优先**：Node → Area → Relation → Path → Timeline 拓扑结构，而非文章列表
2. **权限分层**：公开层 / 私密层 / 创世台三层分离，middleware 服务端守门
3. **门禁驱动**：155 个活跃脚本构成的治理体系，每轮 RC 收紧"什么才算准备好"
4. **AI 边界化**：AI 是灯塔不是太阳，只读公开上下文，有低光降级模式
5. **生命档案**：内容出生证明、世界月报、修复日仪式，让世界可回望可传承

### 3.3 技术栈评估

| 技术 | 当前版本 | 评价 | 建议 |
|---|---|---|---|
| Next.js | 15 | App Router + Server Components | 保持稳定，跟进 minor 更新 |
| React | 19 | Concurrent + Server Components 就绪 | 保持稳定 |
| Tailwind | 3.4 | 响应式设计主力 | 可跟进 v4 但非紧急 |
| Fuse.js | 7 | 轻量搜索，当前满足需求 | Phase 8 可评估 FlexSearch |
| Framer Motion | 11 | 已支持 `prefers-reduced-motion` | 保持稳定 |
| TypeScript | 5.7 | strict mode | 保持稳定 |

---

## 四、未来目标与里程碑

### 4.1 终极目标

**让古月浮屿成为一个可上线、可维护、可传承的个人数字世界产品。**

- 公开世界可被任何人在任何设备上访问、探索和理解
- 私密世界由服务端权限保护，永不泄漏到公开层
- 内容维护可在 1-30 分钟内完成不同档次的动作
- AI 只在灯塔区域出现，只读公开上下文，可降级
- 整个世界可一键导出为 Markdown + JSON + 媒体文件，不依赖任何平台

### 4.2 里程碑

| 里程碑 | 目标 | 前置条件 |
|---|---|---|
| M7: 本地增强 | 本地和局域网访问体验达到产品级 | Phase 2-6 完成（已满足） |
| M8: 搜索导航 | 搜索和导航体验从可用升级为好用 | M7 |
| M9: 内容质量 | 内容从有深度升级为有生命 | 持续 |
| M10: 开发者体验 | 世界可被新维护者理解和接手 | M7 |
| M11: 性能可访问 | 性能预算和可访问性从口号变为门禁 | M7 |
| M12: 世界协议 | 世界协议文档化，可被其他 AI 工具读取 | M8, M9 |

### 4.3 优先级矩阵

| 优先级 | 阶段 | 理由 |
|---|---|---|
| P1 | Phase 7: 本地与局域网增强 | Phase 1 跳过，本地体验是当前的生产环境 |
| P1 | Phase 8: 搜索与导航体验 | 搜索是访客发现内容的核心入口 |
| P2 | Phase 9: 内容质量深化 | 内容是世界的核心资产，需持续投入 |
| P2 | Phase 11: 性能与可访问性 | 体验门槛，影响所有访客 |
| P3 | Phase 10: 开发者体验与文档 | 长期可维护性 |
| P3 | Phase 12: 世界协议与互操作 | 长期愿景，不急但需规划 |

---

## 五、详细执行计划

### Phase 7: 本地与局域网增强

**目标**：本地和局域网访问体验达到产品级
**前置条件**：Phase 2-6 完成（已满足）
**预估工时**：8-12h

#### T7.1 局域网访问配置文档

**步骤**：
1. 编写 `docs/05-engineering/lan-access-guide.md`
2. 内容包括 build/start、smoke:lan-local、绑定 0.0.0.0 启动
3. 说明防火墙放行端口（默认 3000）的方法
4. 说明如何在手机上通过局域网 IP 访问
5. 用中文撰写

**涉及文件**：新建 `docs/05-engineering/lan-access-guide.md`
**验收标准**：文档完成，包含完整操作步骤
**门禁**：无（文档任务）
**工时**：1h

#### T7.2 本地启动脚本验证

**步骤**：
1. 检查 smoke:lan-local 脚本是否正常工作
2. 检查 smoke:runtime-local 脚本是否正常工作
3. 如果有问题，修复后重新验证
4. 确认 check:runtime-local 和 check:lan-local 通过

**涉及文件**：scripts 下的 smoke 脚本
**验收标准**：smoke:runtime-local 和 check:lan-local 通过
**门禁**：check:runtime-local + check:lan-local
**工时**：1-2h

#### T7.3 PWA 离线支持评估

**步骤**：
1. 评估 next-pwa 或 Next.js 15 内置 PWA 支持的可行性
2. 检查是否已有 public/manifest.json
3. 评估离线缓存边界
4. 如果可行，创建 manifest.json 和基础 Service Worker
5. 如果不可行，记录到未来 backlog

**涉及文件**：public/manifest.json（如创建）、next.config.ts
**验收标准**：评估文档完成，决策记录到世界事件
**门禁**：check:daily
**工时**：2-3h

---

### Phase 9: 内容质量深化

**目标**：内容从有深度升级为有生命
**前置条件**：持续（可与 Phase 7-8 并行）
**预估工时**：持续

#### T9.1 内容新鲜度审计

**步骤**：
1. 新建 scripts/audit-content-freshness.mjs
2. 扫描 83 个公开节点的 createdAt 和 updatedAt
3. 识别超过 90 天未更新的"沉睡"节点
4. 输出审计报告
5. 为沉睡节点生成"唤醒"建议

**涉及文件**：新建 scripts/audit-content-freshness.mjs、package.json
**验收标准**：审计脚本可运行，报告可读
**门禁**：check:daily
**工时**：2h

#### T9.2 交叉引用验证

**步骤**：
1. 新建 scripts/check-cross-references.mjs
2. 扫描 Markdown 中的内部链接
3. 验证 slug 存在且为 public
4. 验证 relations.json 的 from/to 引用存在
5. 验证 paths.json 的 nodeSlugs 存在且为 public
6. 输出断链报告

**涉及文件**：新建 scripts/check-cross-references.mjs、package.json
**验收标准**：无断链，无悬空引用
**门禁**：新增 check:cross-references 纳入 check:boundary
**工时**：2-3h

#### T9.3 节点标签体系优化

**步骤**：
1. 审查 83 个节点的 tags 字段
2. 统计现有标签，识别重复和近义标签
3. 合并近义标签，建立标签层级
4. 为每个区域定义 3-5 个核心标签
5. 更新节点 tags

**涉及文件**：data/domains/experience/nodes.json
**验收标准**：标签无重复，有层级结构
**门禁**：check:content
**工时**：2-3h

#### T9.4 世界事件时间线丰富

**步骤**：
1. 审查 30 个世界事件
2. 确保事件覆盖所有月份
3. 为每个事件添加 summary 字段
4. 时间线页面添加事件类型筛选器
5. 添加事件因果关系链接

**涉及文件**：data/core/world-events.json、timeline/page.tsx
**验收标准**：事件覆盖完整，时间线可筛选
**门禁**：check:content
**工时**：2h

#### T9.5 内容 100 节点扩展

**步骤**：
1. 规划 17+ 个新节点（83 到 100+）
2. 每个新节点正文 >= 400 字符
3. 每个新节点有 source、reviewed、tags 字段
4. 为新节点添加关系和路径关联

**涉及文件**：nodes.json、content/ 下新建 17+ 个 .md 文件
**验收标准**：公开节点 >= 100，所有新节点通过门禁
**门禁**：check:content
**工时**：8-12h（可分多轮完成）

---

### Phase 10: 开发者体验与文档

**目标**：世界可被新维护者理解和接手
**前置条件**：M7 完成
**预估工时**：6-8h

#### T10.1 架构决策记录（ADR）

**步骤**：
1. 在 docs/05-engineering/adr/ 下创建 ADR 目录
2. 为 5 个关键决策创建 ADR 文档（App Router 选型、世界模型、AI 边界、权限守门、内容门禁）
3. 每个 ADR 包含：背景、决策、后果、状态

**涉及文件**：新建 docs/05-engineering/adr/ 目录及 5 个 ADR 文件
**验收标准**：5 个 ADR 文档完成
**门禁**：无（文档任务）
**工时**：2-3h

#### T10.2 代码地图更新

**步骤**：
1. 审查 worldos-mainline-code-map.md
2. 更新代码地图以反映 Phase 2-6 的变更
3. 添加 AI 灯塔 API 路由、导出管线脚本、传承协议文档

**涉及文件**：content/documents/worldos-mainline-code-map.md
**验收标准**：代码地图反映当前架构
**门禁**：check:content
**工时**：1-2h

#### T10.3 贡献指南更新

**步骤**：
1. 审查 CONTRIBUTING.md
2. 更新门禁体系、Git 提交格式、内容创作规范、权限边界规范
3. 添加"新维护者快速上手"章节

**涉及文件**：CONTRIBUTING.md
**验收标准**：贡献指南完整且可操作
**门禁**：无（文档任务）
**工时**：1-2h

#### T10.4 API 文档生成

**步骤**：
1. 审查 API 边界注册表（25 个路由）
2. 为每个路由生成文档：路径、方法、权限、参数、响应、降级
3. 输出到 docs/05-engineering/api-reference.md

**涉及文件**：新建 docs/05-engineering/api-reference.md
**验收标准**：25 个 API 路由有文档
**门禁**：无（文档任务）
**工时**：1-2h

---

### Phase 11: 性能与可访问性

**目标**：性能预算和可访问性从口号变为门禁
**前置条件**：M7 完成
**预估工时**：8-10h

#### T11.1 性能预算门禁

**步骤**：
1. 新建 scripts/check-performance-budget.mjs
2. 检查 .next 构建产物大小（基线 102MB）
3. 检查首页 HTML 大小（目标 < 100KB）
4. 检查 JS bundle 大小（目标 < 200KB gzipped）
5. 超阈值时报警
6. 在 package.json 添加 check:performance 脚本

**涉及文件**：新建 scripts/check-performance-budget.mjs、package.json
**验收标准**：性能预算门禁可运行
**门禁**：check:performance
**工时**：2-3h

#### T11.2 可访问性审计

**步骤**：
1. 审查 12 个公开页面的可访问性
2. 检查对比度、alt 文本、aria 标签、键盘导航、焦点可见性
3. 修复发现的问题
4. 验证 prefers-reduced-motion 在所有动画组件中生效

**涉及文件**：各组件的 Tailwind class 和 aria 属性
**验收标准**：可访问性无明显问题，reduced-motion 全覆盖
**门禁**：check:daily
**工时**：2-3h

#### T11.3 首页性能优化

**步骤**：
1. 审查首页 Server Component 的数据获取
2. 确保 getPublicWorldObjectIndex 在构建时缓存
3. 减少不必要的客户端 JavaScript
4. 图片和 SVG 使用 next/image 或适当优化
5. 确保首屏关键 CSS 内联

**涉及文件**：src/app/page.tsx 及相关组件
**验收标准**：首页 JS bundle 减少，首屏渲染加快
**门禁**：npm run build + check:daily
**工时**：2-3h

#### T11.4 动效降级验证

**步骤**：
1. 审查所有使用 framer-motion 的组件
2. 确认每个动画组件都有 prefers-reduced-motion 检查
3. 在 reduced-motion 模式下，动画时长为 0 或极短
4. 确认动效不影响阅读体验
5. 创建可访问性检查脚本

**涉及文件**：所有使用 framer-motion 的组件
**验收标准**：reduced-motion 全覆盖，动画在低动效模式下降级
**门禁**：check:daily
**工时**：1-2h

---

## 六、交叉关注点

### Git 工作流

| 动作 | 规则 |
|---|---|
| 分支 | 在 `codex/` 前缀分支上开发，PR 合并到 `main` |
| 提交格式 | `xxx(xxx): 中文xxx` |
| 提交频率 | 每完成一个任务提交一次 |
| 门禁提交 | 每完成一个 Phase 跑 `release:local-rc` 并提交审计报告 |

### 测试策略

| 层级 | 方式 | 频率 |
|---|---|---|
| 类型安全 | `npm run typecheck` | 每次提交 |
| 代码规范 | `npm run lint` | 每次提交 |
| 日常门禁 | `npm run check:daily` | 每次提交 |
| 边界门禁 | `npm run check:boundary` | 涉及 API/脚本/权限时 |
| 发布候选 | `npm run release:local-rc` | 每完成一个 Phase |
| 本地 smoke | `npm run smoke:runtime-local` | 涉及路由变更时 |
| 局域网 smoke | `npm run smoke:lan-local` | 涉及路由变更时 |

### 回滚策略

| 场景 | 回滚方式 |
|---|---|
| 内容错误 | Git revert，重新部署 |
| 门禁失败 | 修复后重新提交，不回滚 |
| AI 超预算 | 自动进入低光模式，不需要回滚 |
| 私密泄漏 | 立即下线，审查 middleware 和构建产物 |

### Definition of Done（每个 Phase）

每个 Phase 完成时必须满足：
1. `npm run check:daily` 全绿
2. `npm run release:local-rc` 全绿
3. Phase 涉及的所有任务验收标准已满足
4. Git 提交记录清晰
5. 如果涉及内容变更，`npm run check:content` 全绿
6. 如果涉及边界变更，`npm run check:boundary` 全绿

---

## 七、风险与缓解

| 风险 | 概率 | 影响 | 缓解策略 |
|---|---|---|---|
| 内容维护疲劳 | 高 | 高 | 低心力维护流程 + 修复日节奏 + 月报仪式 |
| 构建产物膨胀 | 中 | 中 | 构建产物监控 + 性能预算门禁 |
| AI provider 涨价或停服 | 中 | 中 | 低光降级模式已就绪，世界不依赖 AI |
| legacy 脚本回流 | 低 | 中 | 导入边界门禁 + mainline governance 检查 |
| 私密内容泄漏 | 低 | 极高 | middleware 服务端拦截 + 公开构建只读 public 数据 |
| 标签体系失控 | 中 | 低 | T9.3 标签体系优化 + 门禁约束 |

---

## 八、不做清单（Anti-Goals）

以下事项在当前阶段明确不做：

- 不新增 R8.x / V / R 阶段线，不再造动态宇宙 runtime
- 不把私密权限交给前端硬编码
- 不让 build wrapper 代替真实生产证据
- 不让世界语言牺牲现实可理解性
- 不为 AI 牺牲无 AI 可用性
- 不把门禁做成摆设
- 不在未上线前过度工程化
- 不引入新依赖除非该任务明确要求
- 不动 `_legacy/` 目录中的代码

---

## 九、任务依赖总表

| 任务 | 前置依赖 | Phase | 里程碑 |
|---|---|---|---|
| T7.1 局域网访问文档 | 无 | 7 | M7 |
| T7.2 本地脚本验证 | 无 | 7 | M7 |
| T7.3 PWA 评估 | 无 | 7 | M7 |
| T7.4 备份自动化 | T6.1 | 7 | M7 |
| T7.5 构建监控 | 无 | 7 | M7 |
| T8.1 搜索升级 | M7 | 8 | M8 |
| T8.2 导航增强 | M7 | 8 | M8 |
| T8.3 Atlas 优化 | M7 | 8 | M8 |
| T8.4 路径优化 | M7 | 8 | M8 |
| T9.1 新鲜度审计 | 无 | 9 | M9 |
| T9.2 交叉引用 | 无 | 9 | M9 |
| T9.3 标签优化 | 无 | 9 | M9 |
| T9.4 时间线丰富 | 无 | 9 | M9 |
| T9.5 100 节点扩展 | 无 | 9 | M9 |
| T10.1 ADR | M7 | 10 | M10 |
| T10.2 代码地图 | M7 | 10 | M10 |
| T10.3 贡献指南 | M7 | 10 | M10 |
| T10.4 API 文档 | M7 | 10 | M10 |
| T11.1 性能门禁 | M7 | 11 | M11 |
| T11.2 可访问性 | M7 | 11 | M11 |
| T11.3 首页优化 | T11.1 | 11 | M11 |
| T11.4 动效降级 | T11.2 | 11 | M11 |
| T12.1 协议规范 | M8, M9 | 12 | M12 |
| T12.2 世界索引 | M8 | 12 | M12 |
| T12.3 联邦探索 | M12 | 12 | M12 |
| T12.4 互操作测试 | T12.1, T12.2 | 12 | M12 |

---

## 十、建议执行顺序

### 第一波（立即）：本地增强

T7.1 + T7.2 + T7.5（并行） -> T7.3 + T7.4（并行）

### 第二波：搜索导航 + 内容质量

T8.1 -> T8.2 + T8.3 + T8.4（并行）
T9.1 + T9.2（并行） -> T9.3 + T9.4（并行） -> T9.5

### 第三波：开发者体验 + 性能

T10.1 + T10.2 + T10.3 + T10.4（并行）
T11.1 -> T11.2 + T11.3（并行） -> T11.4

### 第四波：世界协议

T12.1 + T12.2（并行） -> T12.3 -> T12.4

---

## 十一、回顾节奏

| 节奏 | 动作 | 产出 |
|---|---|---|
| 每周 | 修复日：整理灵感、修复关系、补摘要、检查权限 | 世界日志条目 |
| 每月 | 月报：新增节点、活跃主题、沉睡灵感、下一步 | 月报节点 |
| 每季 | 季报：方向是否偏离初衷、公开密度是否足够 | 季报节点 |
| 每轮 Phase | 回顾：门禁是否收紧、legacy 是否回流、内容是否变薄 | Phase 审计报告 |
| 每年 | 年度回望：世界如何生长、哪些种子发芽、哪些沉睡 | 年度报告 |

---

## 十二、成功指标

| 指标 | 当前 | 目标 | 衡量方式 |
|---|---|---|---|
| 公开节点数 | 83 | 100+ | `check:worldos-content-density` |
| 核心节点字符数 | 3000+ | 3000+（保持） | `check:local-content-growth` |
| 全部节点最小字符数 | 400 | 400（保持） | `check:worldos-content-density` |
| 公开路径数 | 15 | 15+（保持） | `check:content-life` |
| 关系数 | 144 | 150+ | `check:content-life` |
| 世界事件数 | 30 | 30+（保持） | `check:content-life` |
| 活跃脚本数 | 155 | <=200（保持） | `check:scripts` |
| 日常命令数 | 3 | <=10（保持） | `check:maintenance-command-spine` |
| 门禁通过率 | 100% | 100%（保持） | `check:daily` |
| 构建产物大小 | 102MB | <=120MB | 性能预算门禁 |
| AI 灯塔可用性 | 低光模式 | 低光 + 可选全光 | `check:api-boundary` |
| 导出包完整性 | 已验证 | 持续验证 | `npm run export:world` |
| 出生证明覆盖 | 83/83 | 100%（保持） | `check:content` |

---

## 十三、附录：现有基础设施映射

| 基础设施 | 位置 | 在本计划中的用途 |
|---|---|---|
| 路由边界 | `src/lib/product-routes.ts` + `middleware.ts` | T8.2/T8.4 导航增强 |
| API 边界注册表 | `data/world-kernel/worldos-api-boundary-registry-v1.json` | T10.4 API 文档 |
| 内容密度门禁 | `scripts/check-worldos-content-density.mjs` | T9.5 节点扩展验证 |
| 内容增长契约 | `data/world-kernel/worldos-local-content-growth-contract-v1.json` | T9.5 核心节点验证 |
| 脚本 legacy 注册表 | `data/world-kernel/worldos-script-legacy-registry-v1.json` | T7.4/T9.1 新脚本注册 |
| 维护命令脊柱 | `data/world-kernel/worldos-maintenance-command-spine-v1.json` | T7-T12 新命令注册 |
| 公开世界索引 | `src/lib/public-world-objects.ts` | T8.1 搜索 + T12.2 世界索引 |
| AI 边界策略 | `src/lib/ai-boundary.ts` | T12.1 协议规范 |
| 导出契约 | `src/lib/export-contract.ts` + `data/core/export-contract.json` | T7.4 备份 + T12.4 互操作 |
| 灯塔推荐 | `src/lib/lighthouse-recommend.ts` | T8.4 路径推荐 |
| 传承协议 | `docs/00-overview/world-inheritance-protocol.md` | T12.1 协议规范参考 |
| 导出管线 | `scripts/export-world.mjs` | T7.4 备份自动化基础 |
| AI 可用性 | `src/lib/ai-availability.ts` | T8.1 搜索降级 |
| 本地 smoke | `scripts/run-worldos-local-runtime-smoke.mjs` | T7.2 本地验证 |
| 局域网 RC | `scripts/run-worldos-local-lan-rc.mjs` | T7.2 局域网验证 |

---

### Phase 12: 世界协议与互操作

**目标**：世界协议文档化，可被其他 AI 工具读取
**前置条件**：M8, M9
**预估工时**：6-8h

#### T12.1 世界协议规范文档

**步骤**：
1. 新建 docs/00-overview/world-protocol-specification.md
2. 定义世界协议：Node、Area、Relation、Path、Event 的数据结构
3. 定义权限模型：visibility 字段的语义
4. 定义 AI 上下文契约：AI 只读 public 数据
5. 定义导出格式：zip 包结构

**涉及文件**：新建 docs/00-overview/world-protocol-specification.md
**验收标准**：协议规范文档完整
**门禁**：无（文档任务）
**工时**：2-3h

#### T12.2 机器可读世界索引

**步骤**：
1. 检查 data/world-index.json 是否存在且完整
2. 确保世界索引包含所有公开节点的元数据
3. 确保 AI 可通过该索引理解世界结构
4. 添加索引生成脚本到构建流程

**涉及文件**：data/world-index.json、scripts/build-public-world-index.ts
**验收标准**：世界索引完整且机器可读
**门禁**：npm run build:world-index + check:daily
**工时**：1-2h

#### T12.3 联邦化探索

**步骤**：
1. 新建 docs/00-overview/federation-exploration.md
2. 探索多个个人世界之间的星线互联可能性
3. 定义联邦协议草案：节点引用、关系跨世界、路径跨世界
4. 评估技术可行性
5. 记录到未来 backlog

**涉及文件**：新建 docs/00-overview/federation-exploration.md
**验收标准**：联邦化探索文档完成
**门禁**：无（文档任务）
**工时**：2-3h

#### T12.4 AI 工具互操作测试

**步骤**：
1. 测试 AI 灯塔 API 是否可被外部 AI 工具读取
2. 测试导出包是否可被 Obsidian / Logseq 等工具导入
3. 记录互操作测试结果
4. 修复发现的互操作问题

**涉及文件**：src/app/api/lighthouse/、exports/
**验收标准**：AI API 可被外部读取，导出包可被工具导入
**门禁**：check:daily
**工时**：1-2h

#### T7.4 本地备份自动化

**步骤**：
1. 创建 scripts/backup-world.mjs
2. 支持 --dest 参数指定备份目标
3. 自动清理超过 30 天的旧备份
4. 在 package.json 添加 backup:world 脚本
5. 文档化备份策略

**涉及文件**：新建 scripts/backup-world.mjs、package.json
**验收标准**：npm run backup:world 生成备份
**门禁**：check:daily
**工时**：1-2h

#### T7.5 构建产物监控

**步骤**：
1. 检查 .next 构建产物大小（当前 102MB）
2. 分析是否有不必要的依赖被打入构建
3. 评估 next bundle analyze 集成
4. 设置构建产物大小阈值
5. 记录基线大小到世界事件

**涉及文件**：next.config.ts、package.json
**验收标准**：构建产物大小有基线记录，超阈值有报警
**门禁**：npm run build + check:daily
**工时**：1-2h

---

### Phase 8: 搜索与导航体验

**目标**：搜索和导航体验从可用升级为好用
**前置条件**：M7 完成
**预估工时**：10-14h

#### T8.1 搜索体验升级

**步骤**：
1. 评估 Fuse.js 搜索质量：中文搜索、部分匹配、模糊匹配
2. 评估 FlexSearch 或 MiniSearch 作为替代
3. 搜索结果高亮匹配关键词
4. 搜索结果添加区域标签和节点类型图标
5. 搜索结果支持"最相关"和"最新"排序
6. 搜索框支持快捷键 / 聚焦

**涉及文件**：lighthouse/search/route.ts、PublicLighthouseConsole.tsx
**验收标准**：中文搜索准确，有高亮和区域标签，/ 快捷键可用
**门禁**：check:daily
**工时**：3-4h

#### T8.2 导航罗盘增强

**步骤**：
1. 审查 ProductJourneyDock.tsx
2. 添加"当前位置"指示器
3. 添加"最近浏览"历史记录（localStorage，不超过 5 条）
4. 移动端导航 Dock 简化
5. 确保导航不遮挡正文

**涉及文件**：ProductJourneyDock.tsx、ReadingToc.tsx
**验收标准**：导航有位置感知，有浏览历史
**门禁**：check:daily
**工时**：2-3h

#### T8.3 Atlas 交互优化

**步骤**：
1. 审查 AtlasLiveConstellation.tsx
2. 节点点击后平滑滚动到节点详情
3. 添加区域筛选器
4. 支持拖拽和缩放
5. 移动端退回列表视图（已有）

**涉及文件**：AtlasLiveConstellation.tsx、AtlasMap.tsx
**验收标准**：Atlas 可交互筛选、拖拽缩放
**门禁**：check:daily
**工时**：3-4h

#### T8.4 路径发现优化

**步骤**：
1. 审查 paths/[id]/page.tsx
2. 路径页底部添加"下一条路径"推荐
3. 首页添加"推荐路径"卡片
4. 路径页添加进度指示器
5. 路径步骤间添加键盘导航

**涉及文件**：paths/[id]/page.tsx、ProductRouteGuide.tsx
**验收标准**：路径有进度指示和键盘导航
**门禁**：check:daily
**工时**：2-3h
