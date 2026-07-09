# WorldOS Phase 27 首次进入仪式执行计划

> 日期：2026-07-09  
> 范围：localhost / LAN IP，本阶段不考虑外部 Preview / Production。  
> 上游依据：`worldos-scene-universe-master-plan-after-research-2026-07-09.md` 的 M2 与阶段 27。  
> 核心目标：把首页从“带动态效果的博客入口”推进为“第一次抵达世界的轻量入口仪式”。

## 目标

首次访问者打开首页时，应先看到一个短、轻、可跳过、中文优先的“抵达世界”层：

- 明确告诉访问者：这里是一个公开数字世界入口。
- 提供 3 个低门槛入口：看地图、走第一条路径、问灯塔。
- 只记录公开体验偏好，不读取 token，不参与权限判断。
- 在 reduced-motion 或移动端下保持静态、清楚、可用。
- 二次访问不强打扰，但仍可通过首页重新展开。

## 边界

- 不新增第三方动效库。
- 不接入真实 AI。
- 不新增 owner、auth、permission 前端判断。
- 不写入私密数据。
- 不影响后端 guard 与现有公开内容模型。
- localStorage 只作为公开体验偏好，不作为权限事实源。

## 执行项

- [x] 1. 复核 Phase 26 已完成且工作树干净。
- [x] 2. 新增首次进入仪式事实源，声明 local-only、public-experience-only、storage key、入口动作和验收规则。
- [x] 3. 新增 `src/lib/first-visit-ritual.ts`，统一导出事实源、storage key 和公开摘要，避免组件内散落硬编码。
- [x] 4. 新增 `FirstVisitRitual` 客户端组件，支持首次显示、跳过、重新展开、三入口、reduced-motion 静态文案和键盘可访问。
- [x] 5. 将 `FirstVisitRitual` 接入首页，放在主 hero 前，形成“先抵达，再浏览”的顺序。
- [x] 6. 新增 `check:first-visit-ritual`，验证事实源、组件接入、storage 边界、权限边界、reduced-motion 与入口可见性。
- [x] 7. 更新 `package.json` 与脚本注册表，把新检查纳入 `check:mainline`。
- [x] 8. 运行边界检查：`check:first-visit-ritual`、`check:mainline`、`check:daily`、`check:strict`、`release:local-rc`。
- [x] 9. 多轮深度复核：源码扫描、权限扫描、产物扫描、计划勾选、工作树状态。
- [x] 10. 中文 commit 提交：`feat(ritual): 建立首次进入仪式`。

## 验收标准

- [x] 首页源码明确接入 `FirstVisitRitual`。
- [x] 首次进入仪式包含“看地图 / 走第一条路径 / 问灯塔”三个入口。
- [x] localStorage key 统一来自 lib，不散落在页面内。
- [x] 组件不包含 token、owner、auth、permission、role 等权限判断。
- [x] reduced-motion 下直接展示静态入口，不依赖缩放或位移。
- [x] 二次访问不强打扰，仍可手动重新展开。
- [x] 新检查脚本通过，并进入 `check:mainline`。
- [x] `check:daily`、`check:strict`、`release:local-rc` 通过。
- [x] 工作树提交后干净。

## 风险控制

- localStorage 读取全部放在 effect 内，并包裹 try/catch，避免隐私模式故障。
- 组件首屏默认用静态可读状态，避免 hydration 前白屏。
- 跳过按钮使用原生 button，入口使用 Link，保证键盘可达。
- 样式沿用当前首页的白纸、夜色、金色、苔绿风格，不引入单独视觉体系。
