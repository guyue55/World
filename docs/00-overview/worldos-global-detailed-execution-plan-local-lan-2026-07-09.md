# WorldOS 全局详细执行计划：本地/LAN 成熟版

> 日期：2026-07-09
> 上游总控：`docs/00-overview/worldos-global-stage-roadmap-local-lan-2026-07-09.md`
> 总任务板：`docs/00-overview/worldos-global-execution-checklist-local-lan-2026-07-09.md`
> 范围：localhost / LAN IP；外部 Preview / Production 继续冻结。
> 原则：少造新系统、统一轻量、中文优先、后端权限守门、前端只体现。

## 1. 执行目标

本计划把总控文档落成可执行批次。近期目标不是继续新增散点特效，而是把主入口从“带动效的博客”推进成更完整的公开世界：

1. 主路由首屏都能进入统一场景语法。
2. Gateway、Atlas、Timeline、Archive、Paths、Lighthouse、Status 有清晰场景差异。
3. QA 能证明这些场景存在、移动端可用、reduced-motion 可用。
4. 不引入重依赖，不新增权限风险，不制造无意义证据噪音。

## 2. 当前基线

- 已完成：Scene Runtime、First Visit Ritual、Scene Transition Shell、Scene Personality、Journey Memory、Ambient Environment、Scene QA、SceneWorldPortal。
- 已完成：Gateway / Atlas / Timeline / Archive / Paths 的世界化门户。
- 主要缺口：
  - `/ask` 仍是独立灯塔 Hero，未进入统一门户组件。
  - `/status` 仍是独立维护说明 Hero，未进入统一门户组件。
  - Scene QA 只要求 5 类门户，不足以证明主体验全线世界化。
  - 全局任务板尚未把“详细计划已输出”和“批次 1 执行状态”闭环。

## 3. 批次规划

### 批次 1：体验骨架转世界

目标：补齐主路由统一场景门户，让 Ask/Status 不再像普通信息页。

任务：

- [x] 1. 扩展 `SceneWorldPortal` 支持 `lighthouse` 与 `status` 两类轻量场景。
- [x] 2. 将 `/ask` 首屏替换为 `SceneWorldPortal(scene="lighthouse")`。
- [x] 3. 将 `/status` 首屏替换为 `SceneWorldPortal(scene="status")`。
- [x] 4. 更新 Scene QA 清单和校验，要求 Lighthouse / Status 也提供门户证据。
- [x] 5. 更新 LAN RC 指标读取范围，确保新门户类型能进入报告。
- [x] 6. 回填总执行清单 A/B/C 的已完成项。
- [x] 7. 运行 `typecheck`、`lint`、`check:scene-qa`，必要时运行 `release:local-rc`。

验收：

- [x] `/ask` 有 `data-scene-world-portal="lighthouse"`。
- [x] `/status` 有 `data-scene-world-portal="status"`。
- [x] Gateway / Atlas / Timeline / Archive / Paths / Lighthouse / Status 都能被 Scene QA 报告识别。
- [x] 不新增动效库，不新增 3D，不读取私密层。
- [x] 移动端 reduced-motion 不遮挡、不溢出。

### 批次 2：内容生命补齐

目标：世界里有真实内容、关系和路径，不只靠首屏。

任务：

- [ ] 1. 检查公开节点最低字段。
- [ ] 2. 强化代表节点和路径之间的“为什么相关”。
- [ ] 3. 让 Atlas / Timeline / Archive / Paths / Node 共享同一内容事实源。
- [ ] 4. 补齐或修复缺摘要、缺区域、缺关系的精选节点。

验收：

- [ ] 精选节点无摘要、无区域、无关系问题被脚本发现或修复。
- [ ] 核心路径可以连续阅读。

### 批次 3：只读智能与权限可信

目标：AI 灯塔和 Owner 维护只读可信，不越权。

任务：

- [ ] 1. 复核 `/ask` 只读边界。
- [ ] 2. 复核 owner-only API 服务端 guard。
- [ ] 3. 复核前端显隐只依据后端事实源。
- [ ] 4. 跑 `check:api-boundary`。

验收：

- [ ] 未授权 API 返回 403。
- [ ] 前端没有硬编码 owner token 或私密权限判断。

### 批次 4：性能与长期治理

目标：动态体验不臃肿，证据不制造噪音。

任务：

- [ ] 1. 记录构建体积基线。
- [ ] 2. 检查 GSAP 使用是否仍是 transform / opacity。
- [ ] 3. 检查报告是否只有时间戳漂移。
- [ ] 4. 跑 `build:production-ci`、`check:strict`、`release:local-rc`。

验收：

- [ ] 首屏包体无异常增长。
- [ ] 报告和截图能证明真实本地/LAN 体验。

## 4. 本轮执行范围

本轮优先完成批次 1，并为后续批次保留清晰入口。原因：

- 用户当前最强反馈是“仍像骨架，不像世界/宇宙”。
- 批次 1 对体验影响最大，且可以通过少量统一组件改动完成。
- 先补齐 Ask/Status 门户可以让主线页面全部进入同一场景语言。

## 5. 检查命令

本轮最小门禁：

```bash
npm run typecheck
npm run lint
npm run check:scene-qa
```

如涉及截图证据刷新或 QA 清单变化，必须执行：

```bash
npm run release:local-rc
```

完成前深度复核：

```bash
git diff --check
rg -n "TODO|FIXME|HACK|@ts-ignore|as any|debugger" src/app src/components src/lib scripts
rg -n "GUYUE_OWNER_TOKEN|R8_OWNER_TOKEN|OPENAI_API_KEY|ANTHROPIC_API_KEY|ownerToken|authToken|role ===|isOwner|isAdmin" src/app src/components
git status --short
```

## 6. 提交策略

- 文档和批次 1 可合并为一个中文 conventional commit。
- 建议提交信息：`feat(scene): 统一主路由场景门户`
- 不提交外部发布状态变更。
