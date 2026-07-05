# WorldOS 路线图执行总控计划

状态：执行总控稿  
日期：2026-07-05  
来源：`docs/00-overview/worldos-current-roadmap-after-research-2026-07-05.md`

> [!IMPORTANT]
> 本文档是后续开发的总入口。它不替代阶段任务板，而是规定阶段顺序、批次边界、验收命令和提交粒度。后续开发不得再按单个组件零散推进。

## 1. 执行原则

- **先事实源，后功能**：每个阶段先确认数据、路由、权限边界，再改页面和组件。
- **默认中文、低门槛**：公开页面优先回答“这是什么、怎么开始、能去哪、如何返回”。
- **后端控制权限**：公开页面只消费公开查询或 public surface；前端只表现可见结果，不承担权限事实源。
- **动态是增强，不是前提**：HTML 和 CSS 基础态必须可读；GSAP、客户端 JS、动效失败时不能白屏。
- **一批次一提交**：一个批次包含数据层、页面层、组件层、边界检查和验收结果，不按单个组件提交。
- **legacy 只可筛选回流**：`_legacy`、`r8-*`、阶段页只能作为参考，不得直接导入公开主线。

## 2. 当前基线

| 项目 | 当前事实 |
| --- | --- |
| 正式公开路由 | `/`、`/atlas`、`/timeline`、`/archive`、`/paths`、`/paths/[id]`、`/node/[slug]`、`/ask`、`/about`、`/manifesto`、`/status` |
| 内容密度 | 8 个一级区域、52 个公开节点、52 个正文公开节点、13 条路径、82 条关系、21 条世界事件 |
| 动态基座 | `src/lib/public-world-surfaces.ts` + `src/components/world/useGsapEntrance.ts` |
| 权限基座 | `src/lib/product-routes.ts`、`src/lib/world-kernel-boundary.ts`、`src/lib/visibility.ts`、`src/lib/permissions.ts`、`src/lib/owner-auth.ts` |
| 日常主线门禁 | `lint`、`typecheck`、`check:dynamic-world`、`check:boundary`、`check:mainline` |
| 当前阻塞 | 真实外部 Preview / Production、线上 smoke、Web Vitals、人工签收和回滚演练尚未完成 |

## 3. 阶段总览

| 阶段 | 状态 | 目标 | 本轮/后续动作 |
| --- | --- | --- | --- |
| 阶段 0：冻结与盘点 | 已执行本轮文档化 | 形成事实源和执行顺序 | 以 `worldos-phase-0-inventory-2026-07-05.md` 为准 |
| 阶段 1：公开世界主线闭环 | 下一阶段 P0 | 让访客看懂、走通、返回 | 拆为 1.1 首页、1.2 地图路径节点、1.3 时间档案 |
| 阶段 2：动态宇宙体验系统 | P1 | 建立统一动态语法和可访问降级 | 先抽规范，再覆盖主路由，不反向制造白屏 |
| 阶段 3：内容生命系统 | P1 | 让真实内容可持续进入世界 | 先收束内容模型，再补真实内容和检索 |
| 阶段 4：权限与私密边界 | P1 | 保证公开可信、私密不外泄 | 与 AI/私密能力开发前置绑定 |
| 阶段 5：AI 灯塔与辅助系统 | P2 | AI 导览、解释、建议，不越权 | 先公开只读，再 owner 审核队列 |
| 阶段 6：工程治理与发布 | P2 | 发布、回滚、证据、性能 | 真实部署前不改生产状态 |
| 阶段 7：运营与长期演化 | P3 | 内容节奏、年度归档、导出 | 进入稳定期后周期执行 |

## 4. 阶段 1 执行计划

### 批次 1.1：首页入口收束

目标：

- 首屏明确“这是个人数字世界，不是普通博客”。
- 首屏只保留最关键路径：走 8 分钟路径、看地图、进档案馆、问灯塔。
- 文案避免工程词，优先中文解释和低门槛入口。

改动范围：

- 数据层：复核 `buildHomeDynamicWorldSurface` 的入口优先级。
- 页面层：`src/app/page.tsx` 保持薄组合。
- 组件层：`ProductHome`、`ProductDynamicWorldGuide`、`ProductWorldCompass`。
- 权限边界：仅使用公开节点、公开路径、公开事件。
- 检查脚本：`check:homepage`、`check:experience:public`。

验收：

```bash
npm run check:homepage
npm run check:experience:public
npm run check:dynamic-world
```

提交：

```text
feat(home): 收束公开世界入口体验
```

### 批次 1.2：地图、路径、节点闭环

目标：

- `/atlas` 负责空间全貌。
- `/paths` 负责低门槛路线。
- `/paths/[id]` 负责路径旅程和下一步。
- `/node/[slug]` 负责阅读、关系和返回。

改动范围：

- 数据层：`areas`、`nodes`、`paths`、`relations` 的互链完整性。
- 页面层：`atlas`、`paths`、`node`。
- 组件层：`AtlasLiveConstellation`、`PathsDynamicDirectory`、`PathJourneyBoard`、`NodeRelationRail`。
- 权限边界：节点关系必须通过公开过滤。
- 检查脚本：必要时补路径闭环检查。

验收：

```bash
npm run check:atlas
npm run check:path-guidance
npm run check:node-reading
npm run check:boundary
```

提交：

```text
feat(world): 完善地图路径节点闭环
```

### 批次 1.3：时间线与档案馆闭环

目标：

- `/timeline` 表达时间河，不只是列表。
- `/archive` 表达公开档案馆和检索入口。
- 搜索、筛选、空状态都中文可解释。
- 档案馆不通过前端筛选绕过私密边界。

验收：

```bash
npm run check:timeline
npm run check:content-archive
npm run check:boundary
```

提交：

```text
feat(archive): 完善时间线与档案馆闭环
```

## 5. 阶段 2 执行计划

### 批次 2.1：动态体验语法

目标：

- 固定 6 类动效语法：抵达、浮现、连接、流动、聚焦、反馈。
- 每类定义适用场景、默认参数、降级方式。
- `useGsapEntrance` 只做渐进增强，不控制首屏是否可读。

验收：

```bash
npm run check:dynamic-world
npm run lint
npm run typecheck
```

提交：

```text
feat(motion): 建立动态体验语法
```

### 批次 2.2：主路由动态 surface 全覆盖

目标：

- 所有正式公开主路由由服务端构建 public surface。
- 客户端组件只消费展示模型，不直接读原始私密数据。
- 动态组件不得接入 `_legacy` 或 `r8-*`。

验收：

```bash
npm run check:dynamic-world
npm run build
```

提交：

```text
feat(world): 完成主路由动态体验覆盖
```

### 批次 2.3：可访问性与性能降级

目标：

- `prefers-reduced-motion` 下不阻塞内容。
- 移动端降低运动密度。
- SSR 输出可读，不出现 `body{display:none}`、`data-gsap-reveal + invisible` 白屏态。

验收：

```bash
npm run check:reading-comfort
npm run check:performance
npm run check:preview-performance
```

提交：

```text
fix(motion): 完善动态体验降级边界
```

## 6. 阶段 3 到阶段 7 执行计划

| 阶段 | 批次 | 核心动作 | 验收命令 | 提交建议 |
| --- | --- | --- | --- | --- |
| 阶段 3 | 3.1 内容模型收束 | 明确内容类型、元数据、精选门槛 | `npm run check:content && npm run validate:world` | `feat(content): 收束内容生命模型` |
| 阶段 3 | 3.2 真实内容补齐 | 补代表节点、路径正文、事件关联 | `npm run check:worldos-content-density && npm run check:experience:public` | `feat(content): 补齐公开世界真实内容` |
| 阶段 3 | 3.3 检索与再发现 | 档案搜索、相关节点、今日入口 | `npm run check:content-archive && npm run check:node-reading && npm run check:homepage` | `feat(archive): 完善公开内容再发现` |
| 阶段 4 | 4.1 公开私密事实源 | 复核 visibility、permissions、public JSON | `npm run check:api-boundary && npm run check:public && npm run check:boundary` | `fix(boundary): 收紧公开私密事实源` |
| 阶段 4 | 4.2 无权限体验 | 统一 forbidden、替代路径、显隐表现 | `npm run check:boundary && npm run check:routes` | `feat(boundary): 完善无权限体验` |
| 阶段 5 | 5.1 公开灯塔 | 公开上下文问答、路径推荐、边界提示 | `npm run check:ai-boundary && npm run check:lighthouse` | `feat(ai): 完善公开灯塔导览` |
| 阶段 5 | 5.2 Owner 模式规划 | 建议队列、人工审核、审计日志 | `npm run check:ai-suggestion-audit && npm run check:ai-world-companion` | `feat(ai): 规划世界助手审核流` |
| 阶段 6 | 6.1 命令主干收束 | 固定日常/内容/发布命令层级 | `npm run check:mainline && npm run check:scripts` | `chore(checks): 收束主线检查入口` |
| 阶段 6 | 6.2 发布前门禁 | SEO、公开 JSON、性能、preview smoke | `npm run check:release:rc && npm run check:rc:full` | `chore(release): 完善发布前门禁` |
| 阶段 7 | 7.1 内容运营节奏 | 周更节点、月度路径、季度边界复核 | `npm run check:content-growth && npm run check:theme-exhibitions` | `docs(ops): 制定内容运营节奏` |
| 阶段 7 | 7.2 年度归档与导出 | 世界册、展览归档、备份恢复 | `npm run check:export-center && npm run check:operations-export-planning` | `feat(export): 完善年度归档导出规划` |

## 7. 命令分层

### 日常开发

```bash
npm run lint
npm run typecheck
npm run check:dynamic-world
npm run check:boundary
```

### 主线合并前

```bash
npm run check:mainline
npm run check:routes
npm run build
```

### 内容与体验批次

```bash
npm run check:content
npm run check:experience:public
npm run check:homepage
npm run check:atlas
npm run check:path-guidance
npm run check:node-reading
npm run check:timeline
npm run check:content-archive
```

### 发布候选

```bash
npm run check:release:rc
npm run check:rc:full
```

> [!WARNING]
> 不要在 `next dev` 运行时执行 `npm run build`。构建会改写 `.next`，容易产生 client manifest 或 error component 状态不一致，表现为白屏或 500。

## 8. 下一步执行入口

下一次继续开发时，从 **阶段 1 批次 1.1：首页入口收束** 开始。

执行前先跑：

```bash
npm run check:mainline
npm run check:boundary
```

执行后至少跑：

```bash
npm run lint
npm run typecheck
npm run check:homepage
npm run check:experience:public
npm run check:dynamic-world
```

完成后提交：

```text
feat(home): 收束公开世界入口体验
```
