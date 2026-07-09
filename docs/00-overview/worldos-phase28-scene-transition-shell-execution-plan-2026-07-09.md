# WorldOS Phase 28 Scene Transition Shell 执行计划

> 日期：2026-07-09  
> 范围：localhost / LAN IP，本阶段不考虑外部 Preview / Production。  
> 上游依据：`worldos-scene-universe-master-plan-after-research-2026-07-09.md` 的 M3 与阶段 28。  
> 核心目标：让公开主页面之间拥有统一、轻量、可降级的场景转场语法。

## 目标

建立 `SceneTransitionShell`，让页面切换不再只是普通跳转，而能表达“从哪里来、去到哪里”的空间语义：

- 首页到 Atlas：视角从入口拉远到星图。
- Atlas 到 Node：从星点进入节点房间。
- Timeline 到 Node：从时间片展开到节点。
- Archive 到 Node：从档案馆抽出卷宗进入节点。
- 其他公开场景使用轻量抵达过渡。

## 边界

- 不新增动画库。
- 不引入 Three.js 或重型 3D。
- 不使用 View Transition API 作为硬依赖。
- 不阻塞导航、阅读、跳转和键盘访问。
- 不读取 owner/auth/permission token。
- localStorage 不参与转场权限判断。
- reduced-motion 下关闭位移和缩放，只保留页面静态切换。

## 执行项

- [x] 1. 复核 Phase 26/27 已完成且当前工作树干净。
- [x] 2. 新增 `scene-transition-registry.json`，声明公开转场 shell、motion variants、降级策略和验收规则。
- [x] 3. 新增 `src/lib/scene-transition.ts`，基于 Scene Registry 解析 from/to scene、transition 和 motion variant，保持纯函数。
- [x] 4. 新增 `SceneTransitionShell` 客户端组件，统一包裹公开页面内容。
- [x] 5. 在 `WorldShell` 中接入 `SceneTransitionShell`，避免页面层散写动效。
- [x] 6. 更新 `/status` 的 Scene Runtime 展示，让转场 shell 状态可见。
- [x] 7. 新增 `check:scene-transition`，验证事实源、lib、shell、接入、权限边界和 reduced-motion 边界。
- [x] 8. 更新 `package.json` 与脚本注册表，把新检查纳入 `check:mainline`。
- [x] 9. 运行边界检查：`check:scene-transition`、`check:mainline`、`check:daily`、`check:strict`、`release:local-rc`。
- [x] 10. 多轮深度复核：源码扫描、权限扫描、产物扫描、截图证据、计划勾选、工作树状态。
- [x] 11. 中文 commit 提交：`feat(scene): 建立统一场景转场壳`。

## 验收标准

- [x] `SceneTransitionShell` 由 `WorldShell` 统一接入。
- [x] 至少包含 `fade-rise`、`zoom-star`、`river-shift`、`archive-drawer` 四种 motion variant。
- [x] transition 语义来自事实源和 `scene-runtime`，不在页面内重复硬编码。
- [x] GSAP 使用 `matchMedia`，并尊重 `prefers-reduced-motion`。
- [x] Framer Motion 只处理组件显隐，不新增第三套动效库。
- [x] reduced-motion 下无位移、缩放、长动画。
- [x] 组件不包含 token、owner、auth、permission、role 等权限判断。
- [x] `check:daily`、`check:strict`、`release:local-rc` 通过。
- [x] 工作树提交后干净。

## 风险控制

- 转场时长控制在 420ms 内，移动端更短。
- 只动画 transform 与 autoAlpha，不动画布局属性。
- 页面内容保持真实 DOM，不加全屏遮罩，不阻塞点击。
- 首屏关键元素继续由 LAN RC 验证：H1、主 CTA、移动导航、核心状态卡。
- 转场 shell 只描述公开场景体验，不参与权限、AI Provider 或私密层逻辑。
