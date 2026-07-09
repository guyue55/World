# WorldOS Phase 34 沉浸首屏收口执行计划

> 日期：2026-07-09  
> 范围：localhost / LAN IP，本阶段不考虑外部 Preview / Production。  
> 背景：Phase 33 已建立统一 `SceneWorldPortal`，首页和主要场景已明显从博客 Hero 转向世界入口；但实际截图显示非首页 `SceneIdentityBand` 仍像浅色说明条压在门户前，移动端门户标题过重。  
> 核心目标：轻量收口首屏沉浸感，让场景身份“融入门户”，同时降低移动端视觉负担。

## 设计原则

- 不新增组件体系，只调整 `SceneIdentityBand` 与 `SceneWorldPortal`。
- `SceneIdentityBand` 继续存在，保留 Scene QA 证据，但在门户场景中变成紧凑信标。
- 移动端首屏降低标题尺寸、边距和最小高度，不牺牲可读性。
- 动效继续只用 transform / opacity，尊重 reduced-motion。
- 不触碰权限逻辑，不引入新依赖。

## 执行项

- [x] 1. 审计 Phase 33 截图，确认剩余问题是身份带压迫首屏与移动端首屏过重。
- [x] 2. 制定 Phase 34 执行计划文档。
- [x] 3. 将 `SceneIdentityBand` 在门户场景中改为紧凑信标样式，降低首屏占用。
- [x] 4. 优化 `SceneWorldPortal` 移动端标题、间距、最小高度和状态列信息密度。
- [x] 5. 增加 Scene QA 指标，确认身份带仍存在且门户场景首屏证据不丢失。
- [x] 6. 运行检查：`typecheck`、`lint`、`build:production-ci`、`smoke:lan-local`、`check:scene-qa`、`check:mainline`、`check:daily`、`check:strict`、`release:local-rc`。
- [x] 7. 多轮深度复核：源码扫描、权限扫描、截图证据、计划勾选、工作树状态。
- [x] 8. 中文 commit 提交：`refactor(scene): 收口沉浸首屏体验`。

## 验收标准

- [x] 非首页场景仍有 `scene-identity-band` 证据，但不再像大块浅色说明区抢占首屏。
- [x] Gateway / Atlas / Timeline / Archive / Paths 门户在 desktop 与 mobile reduced-motion 中仍可被 Scene QA 识别。
- [x] 移动端首页首屏标题和按钮不溢出、不互相遮挡。
- [x] 构建体积无异常增长，shared First Load JS 保持稳定。
- [x] `release:local-rc` 通过，productionLive / releaseReady / cleanProductionReady 继续为 false。
- [x] 工作树提交后干净。
