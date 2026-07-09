# WorldOS Phase 29 场景人格深化执行计划

> 日期：2026-07-09  
> 范围：localhost / LAN IP，本阶段不考虑外部 Preview / Production。  
> 上游依据：`worldos-scene-universe-master-plan-after-research-2026-07-09.md` 的 M4 与阶段 29。  
> 核心目标：让公开核心页面具备可识别的空间人格、主行动和下一站，而不是只像带动效的博客页面。

## 目标

建立轻量统一的 `SceneIdentityBand`：

- Atlas 像星图穹顶。
- Timeline 像时间河。
- Archive 像档案馆。
- Node 像节点展开室。
- Ask 像低光灯塔。
- Status 像维护舱。
- Gateway / Paths / Path Detail 也保持同一套场景身份语法。

## 边界

- 不新增动画库。
- 不新增大图、Three.js 或重型 3D。
- 不逐页散写场景文案、主行动和下一站。
- 不读取 owner/auth/permission token。
- localStorage 不参与权限或场景准入判断。
- 前端只展示公开场景身份，不承担权限控制。
- reduced-motion 下保持静态可读，不依赖动效表达。

## 执行项

- [x] 1. 复核 Phase 26/27/28 已完成且当前工作树干净。
- [x] 2. 新增 `scene-personality-registry.json`，声明每个公开场景的人格、场景信号、主行动、下一站和降级策略。
- [x] 3. 新增 `src/lib/scene-personality.ts`，复用 `scene-runtime` 解析 pathname，保持纯函数。
- [x] 4. 新增 `SceneIdentityBand` 客户端组件，统一展示场景身份、空间意象、主行动和下一站。
- [x] 5. 在 `WorldShell` 中统一接入 `SceneIdentityBand`，避免页面层重复实现。
- [x] 6. 更新 `/status` 的 Scene Runtime 展示，让场景人格状态可观测。
- [x] 7. 新增 `check:scene-personality`，验证事实源、lib、组件、接入、权限边界和脚本注册。
- [x] 8. 更新 `package.json` 与脚本注册表，把新检查纳入 `check:mainline`。
- [x] 9. 运行边界检查：`check:scene-personality`、`check:mainline`、`check:daily`、`check:strict`、`release:local-rc`。
- [x] 10. 多轮深度复核：源码扫描、权限扫描、产物扫描、截图证据、计划勾选、工作树状态。
- [x] 11. 中文 commit 提交：`feat(scene): 建立场景人格身份带`。

## 验收标准

- [x] `SceneIdentityBand` 由 `WorldShell` 统一接入。
- [x] Atlas、Timeline、Archive、Node、Ask、Status 都有明确人格文案。
- [x] 每个场景都有主行动和下一站。
- [x] 场景人格来自事实源和 `scene-runtime`，不在页面内重复硬编码。
- [x] 组件不包含 token、owner、auth、permission、role 等权限判断。
- [x] reduced-motion 下仍是静态可读的场景身份，不依赖动效。
- [x] `check:daily`、`check:strict`、`release:local-rc` 通过。
- [x] 工作树提交后干净。

## 风险控制

- 只使用文本、边框、轻量 CSS 背景和已有设计 token。
- 不增加首屏大资源，不静态导入 GSAP。
- 不遮挡原有页面 H1、主 CTA、移动导航和核心状态卡。
- 场景身份带是公开体验层，不进入 owner/vault/private 权限链路。
