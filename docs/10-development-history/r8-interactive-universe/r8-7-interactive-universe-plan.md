# R8.7｜真实宇宙交互与生命完成线

## 目标

把 R8.6 的感官宇宙继续推进为可操作的世界动作系统：页面不仅有场景和天气，还要有主线、动作、复访、模式切换、观测搜索和下一步路径。

## 任务规划

1. 建立 route-aware 交互宇宙数据。
2. 建立全站 InteractiveUniverseEngine。
3. 建立 WorldModeDock，支持世界 / 现实 / 静读三模式。
4. 建立 LivingQuestRail，显示世界主线与步骤。
5. 建立 ObservationSearchPanel，提供轻量观测搜索。
6. 建立 InteractiveUniverseSection，让核心页面能解释当前位置和动作。
7. 建立静态安全 API：/api/r8/interactive-universe。
8. 建立 R8.7 all / boundary 检查脚本。

## 编码准则

- 组件只消费 JSON 数据，不直接写死大型逻辑。
- 所有浏览器状态都限制在 localStorage，不产生生产写入。
- 不接数据库、不接真实 AI、不越过 owner-only 边界。
- 动画必须尊重 reduced-motion。
- 页面体验保持“入口清澈，深处浩瀚”。
