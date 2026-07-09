# WorldOS 全局执行清单：本地/LAN 成熟版

> 日期：2026-07-09
> 对应路线图：`docs/00-overview/worldos-global-stage-roadmap-local-lan-2026-07-09.md`
> 用途：作为后续推进的单一任务板。后续完成项优先在本文档勾选，避免继续制造碎片化阶段计划。

## 1. 执行规则

- 当前只验收 localhost / LAN IP，不执行外部 Preview / Production。
- 大里程碑提交，不为每个小点单独提交。
- 新增组件前先确认是否能复用现有组件。
- 新增动效前先确认是否能复用 Scene Runtime、SceneWorldPortal、motion grammar。
- 新增权限表现前先确认后端事实源和 API guard。
- 新增报告前先确认是否会造成无意义 diff。
- 每次大改后至少跑对应门禁。

## 2. 已完成地基

- [x] 本地/LAN RC 可信入口：`npm run release:local-rc`。
- [x] Scene Runtime 基础事实源。
- [x] 首次进入仪式。
- [x] 场景转场壳。
- [x] 场景人格注册。
- [x] Journey Memory 基础策略。
- [x] Ambient Environment v2。
- [x] Scene QA 本地/LAN 报告。
- [x] 统一 `SceneWorldPortal` 场景门户。
- [x] `SceneIdentityBand` 在门户场景中收口为紧凑信标。
- [x] 外部发布状态保持 false。

## 3. 近期主线：先让世界不像骨架

### A. 总控与文档收束

- [x] 输出全局阶段路线图。
- [x] 输出全局执行清单。
- [x] 后续新增任务优先维护本文档，而不是新增小阶段计划。
- [x] 在下一次实现前复核是否有过期 Phase 文档需要归档或标记“已被总控文档吸收”。

验收：

- [x] 文档链接准确。
- [x] 工作树干净。
- [x] 后续开发能从本文档直接选择任务。

### B. 信息架构收束

- [x] 审核 `/`、`/atlas`、`/timeline`、`/archive`、`/paths`、`/paths/[id]`、`/node/[slug]`、`/ask`、`/status` 的首屏职责。
- [x] 移除或弱化仍像博客/营销 Hero 的重复说明区。
- [x] 为每个主入口补一句低门槛中文场景定位。
- [x] 确认首页只承担“进入世界/继续旅程”，不再承载过多说明。
- [x] 确认 Archive 承担检索归档，Paths 承担旅程，不互相抢功能。
- [x] 更新 Scene QA 或 LAN RC 指标，证明关键入口可见。

验收：

- [x] 每个主页面都能回答“这是世界里的什么地方”。
- [x] 移动端首屏没有大块重复说明。
- [x] `npm run check:scene-qa` 通过。

### C. 场景差异增强

- [x] Atlas：强化星图穹顶和区域关系，而不是普通卡片列表。
- [x] Timeline：强化时间河、阶段流、事件展开。
- [x] Archive：强化档案馆、卷宗、检索和保存感。
- [x] Paths：强化旅程板、起点、进度、下一站。
- [x] Node：强化节点房间、来源场景、关系出口。
- [x] Ask：强化只读灯塔、问路、边界说明。
- [x] Status：强化维护舱，不做普通报告页。
- [x] 场景差异优先通过数据、布局、轻量动效实现，不新增重依赖。

验收：

- [x] 主要场景截图一眼可区分。
- [x] 场景差异不是复制同一模板换标题。
- [x] reduced-motion 下仍清晰。
- [x] `npm run release:local-rc` 通过。

### D. 转场语法增强

- [ ] Gateway 到 Atlas：表达视角拉远/展开地图。
- [ ] Atlas 到 Node：表达星点进入节点房间。
- [ ] Timeline 到 Node：表达时间片展开。
- [ ] Archive 到 Node：表达档案抽出。
- [ ] Paths 到 Node：表达旅程抵达。
- [ ] reduced-motion 下统一转为静态状态提示。
- [ ] 避免转场遮挡 H1、主 CTA、移动导航和正文。

验收：

- [ ] 转场能解释“从哪里来、到哪里去”。
- [ ] 不引入布局抖动。
- [ ] 移动端不卡顿、不误触。

## 4. 中期主线：让内容活起来

### E. 内容模型收束

- [x] 定义公开节点最低字段：标题、摘要、区域、关系、生命周期、推荐路径。
- [x] 明确精选内容准入：无摘要、无关系、无区域不得进入精选。
- [x] 确认内容事实源被 Atlas、Timeline、Archive、Paths、Node 共用。
- [x] 为关系增加“为什么相关”的中文说明。
- [x] 检查内容字段是否存在重复模型或脚本复写。

验收：

- [x] 内容模型有单一事实源。
- [x] 精选内容质量可脚本检查。
- [x] 主要页面没有各自造一套内容结构。

### F. 真实内容补齐

- [x] 补齐 20 到 30 个高质量代表节点。
- [x] 每个一级区域至少有代表节点。
- [x] 每条核心路径至少有足够正文节点。
- [x] 每个代表节点至少有摘要、关系、推荐下一步。
- [x] 优先中文表达，避免内部术语堆叠。

验收：

- [x] 首页推荐有真实内容支撑。
- [x] Atlas 有可探索节点。
- [x] Timeline 有足够事件。
- [x] Paths 有完整旅程。

### G. 路径体验增强

- [x] 新手路径改为旅程体验，而不是链接清单。
- [x] 路径详情显示进度、当前站、下一站。
- [x] 节点页显示来自哪个路径和可去哪里。
- [x] 提供返回地图、返回路径、继续探索。
- [x] 本地旅程记忆只记录公开路径状态。

验收：

- [x] 用户可以从首页进入路径，连续读到第三个节点而不迷路。
- [x] 不需要理解项目背景也能开始。
- [x] localStorage 不保存权限判断或私密内容。

## 5. 后续主线：只读智能与可信维护

### H. AI 灯塔只读导览

- [x] 定义 public context slice。
- [x] 后端组织公开上下文。
- [x] 前端只展示后端返回，不硬编码权限。
- [x] Provider disabled 时提供 dry-run 和中文解释。
- [x] AI 输出必须带来源或推荐路径。
- [x] 不允许 AI 修改节点、路径、权限或发布状态。

验收：

- [x] 未授权不能读取 owner/private。
- [x] `/ask` 能清楚说明 AI 当前能力边界。
- [x] `npm run check:api-boundary` 通过。

### I. Owner 与权限边界

- [x] Owner 摘要 API 保持服务端 guard。
- [x] `/status` 只显示可公开或 owner 允许的摘要。
- [x] 私密档案、vault、owner-only 继续后端控制。
- [x] 前端显隐基于服务端事实源。
- [x] 权限扫描覆盖 token、owner、private、vault 关键词。

验收：

- [x] 未授权 API 返回 403。
- [x] API boundary registry 完整。
- [x] 前端没有硬编码 owner token。

### J. 本地维护舱

- [x] `/status` 汇总本地 RC、Scene QA、内容质量、audit、权限边界。
- [x] 用中文解释状态，不只展示内部字段。
- [x] 明确外部发布冻结原因。
- [x] 报告链接指向归档证据。

验收：

- [x] 普通维护者能看懂当前能不能继续推进。
- [x] 不泄露 token、私密原文、owner-only 细节。

## 6. 横向主线：性能、轻量化、可持续

### K. 性能预算

- [x] 建立当前 First Load JS 和主路由体积基线。
- [x] 新增动效不得引入新大型依赖。
- [x] GSAP 保持按需加载或局部使用。
- [x] 动画只使用 transform / opacity。
- [x] 移动端首屏图片和背景对象数量受控。
- [x] 截图证据与运行资产分离。

验收：

- [x] `npm run build:production-ci` 无异常增长。
- [x] `npm run release:local-rc` 通过。
- [x] 移动端截图无明显遮挡和横向溢出。

### L. 验收产物策略

- [x] 明确哪些报告提交，哪些报告只作为临时证据。
- [x] 对只更新时间戳的报告做避免无意义 diff 的策略。
- [x] Scene QA、LAN RC、local RC summary 的职责清晰。
- [x] 每次大里程碑只保留必要截图证据。

验收：

- [x] 检查不会产生大量无意义 diff。
- [x] 证据仍能证明真实新鲜构建。

### M. 文档与任务治理

- [x] 旧 Phase 文档保留为历史证据。
- [x] 新任务优先进入本文档。
- [x] 跨模块设计才新增专项文档。
- [x] 每个完成项需要有代码、脚本或报告证据。
- [x] 提交信息使用中文 conventional commit。

验收：

- [x] 不再出现大量孤立小计划。
- [x] 后续维护者能从本文档理解下一步。

## 7. 外部发布冻结项

以下内容当前全部不执行：

- [ ] 外部 Preview。
- [ ] Production。
- [ ] HTTPS/CDN。
- [ ] 真实公网 Web Vitals。
- [ ] 人工生产签收。
- [ ] 生产回滚演练。

重新打开条件：

- [ ] 本地/LAN RC 连续稳定。
- [ ] 内容生命系统完成。
- [ ] 权限边界完成深度复核。
- [ ] AI 灯塔保持只读且边界可信。
- [ ] 性能预算稳定。

## 8. 推荐执行批次

### 批次 1：体验骨架转世界

范围：B、C、D。

目标：用户进入主要场景时，不再觉得是博客模板。

门禁：

```bash
npm run lint
npm run typecheck
npm run check:scene-qa
npm run release:local-rc
```

### 批次 2：内容生命补齐

范围：E、F、G。

目标：世界不只是视觉入口，而有真实内容和连续路径。

门禁：

```bash
npm run lint
npm run typecheck
npm run check:mainline
npm run release:local-rc
```

### 批次 3：只读智能与权限可信

范围：H、I、J。

目标：AI 和 Owner 能力可用但不越权。

门禁：

```bash
npm run lint
npm run typecheck
npm run check:api-boundary
npm run check:mainline
```

### 批次 4：性能和长期治理

范围：K、L、M。

目标：不臃肿、不制造证据噪音、能长期维护。

门禁：

```bash
npm run lint
npm run typecheck
npm run build:production-ci
npm run check:strict
npm run release:local-rc
```

## 9. 当前下一步

推荐下一次实现从 **批次 1：体验骨架转世界** 开始：

1. 审核主路由首屏职责。
2. 强化 Atlas / Timeline / Archive / Paths 的场景差异。
3. 补充关键转场语义。
4. 用 Scene QA 和 LAN RC 截图验收。
