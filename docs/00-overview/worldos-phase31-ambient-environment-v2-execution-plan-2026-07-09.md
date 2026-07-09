# WorldOS Phase 31 Ambient Environment v2 执行计划

> 日期：2026-07-09  
> 范围：localhost / LAN IP，本阶段不考虑外部 Preview / Production。  
> 上游依据：`worldos-scene-universe-master-plan-after-research-2026-07-09.md` 的阶段 31。  
> 核心目标：让世界状态驱动空气，而不是只显示数字或静态背景。

## 目标

建立轻量 Ambient Environment v2：

- dayPeriod 影响光照和背景色温。
- season 影响微纹理与世界节奏。
- currentScene 影响背景对象和场景提示。
- aiStatus 影响灯塔亮度和低光提示。
- reduced-motion 下仍能用静态色彩和文案表达环境。

## 边界

- 不新增动画库。
- 不引入大图、视频、Three.js 或 WebGL。
- 不使用环境状态做权限判断。
- 不读取 owner/auth/permission token。
- 不让空气层遮挡点击、阅读、移动导航和首屏关键卡片。
- 移动端和 reduced-motion 下优先静态可读。

## 执行项

- [x] 1. 复核 Phase 26-30 已完成且当前工作树干净。
- [x] 2. 新增 `ambient-environment-registry.json`，声明 dayPeriod、season、scene、aiStatus 的空气语义。
- [x] 3. 新增 `src/lib/ambient-environment.ts`，提供纯函数组合当前空气状态。
- [x] 4. 扩展 `WorldRuntimeProvider`，暴露 currentScene 与 aiStatus 公开运行态。
- [x] 5. 更新 `RuntimeAtmosphere`，根据环境摘要调整背景、标签、节奏和降级状态。
- [x] 6. 更新 `/status`，展示环境来源、当前覆盖和降级策略。
- [x] 7. 新增 `check:ambient-environment` 并纳入 `check:mainline`。
- [x] 8. 运行边界检查：`check:ambient-environment`、`check:mainline`、`check:daily`、`check:strict`、`release:local-rc`。
- [x] 9. 多轮深度复核：源码扫描、权限扫描、产物扫描、截图证据、计划勾选、工作树状态。
- [x] 10. 中文 commit 提交：`feat(environment): 建立场景空气层`。

## 验收标准

- [x] RuntimeAtmosphere 从统一事实源读取环境语义。
- [x] dayPeriod、season、currentScene、aiStatus 都参与环境摘要。
- [x] reduced-motion 下不依赖运动表达环境。
- [x] 不新增大图、Three.js、WebGL 或新动画库。
- [x] 组件不包含 token、owner、auth、permission、role 等权限判断。
- [x] `check:daily`、`check:strict`、`release:local-rc` 通过。
- [x] 工作树提交后干净。

## 风险控制

- 只改现有全局空气层，不逐页散写背景。
- 使用 CSS 颜色、边框、微纹理和现有 Framer Motion；不新增资源。
- 背景层保持 `pointer-events-none` 与负 z-index。
- 环境摘要在 `/status` 可见，便于排查错配。
