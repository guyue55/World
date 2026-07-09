# WorldOS M8-M12 真格世界体验总控计划

> [!IMPORTANT]
> 本计划是 M8-M12 的总入口。它只服务 localhost / LAN 阶段，不考虑外部 Preview / Production。目标是把 M0-M7 的可信底座转化为用户可感知的世界体验。

## 1. 总目标

让访问者打开 WorldOS 时，不再觉得它是“博客 + 动效”，而是进入一个有入口、有地图、有时间、有档案、有旅程、有地点、有灯塔的个人数字世界。

## 2. 开发原则

- **体验优先于门禁数量**：门禁证明不坏，人工体验证明像世界。
- **轻量优先**：不用全站 3D，不引入重型依赖，不默认音频。
- **静态可读，动态可感知**：关闭动态后仍完整，开启动态后明显不同。
- **统一事实源**：场景表现只消费公开世界对象索引、内容生命事实和运行时状态。
- **前端只体现权限**：权限事实来自数据契约和后端边界。
- **中文优先低门槛**：不懂项目背景也能从入口开始探索。

## 3. 阶段地图

| 阶段 | 名称 | 目标 | 完成判断 |
| --- | --- | --- | --- |
| M8 | 世界入口与主舞台重塑 | 首页第一眼像进入世界 | Home 人工体验量表必须 2 分 |
| M9 | 四大核心场景舞台化 | Atlas / Timeline / Archive / Paths 明显不同 | 四场景不再像同一套卡片页 |
| M10 | Node 地点化与沉浸阅读 | 节点像地点，阅读像进入房间 | Node 不再只是文章详情 |
| M11 | 场景迁移叙事化 | 跳转像迁移 | 来源、预告、抵达、沉淀可见 |
| M12 | 灯塔导览体验可感知化 | 灯塔像观测站 | 问路、解释、推荐、边界可感知 |

## 4. 必读文档

### 总控与差距

- `docs/00-overview/worldos-true-world-experience-gap-audit-2026-07-09.md`
- `docs/00-overview/worldos-m8-m12-true-world-experience-master-plan-2026-07-09.md`
- `docs/00-overview/worldos-controlled-execution-plan-2026-07-09.md`
- `docs/00-overview/worldos-quality-control-system-2026-07-09.md`
- `docs/00-overview/worldos-human-experience-review-rubric-2026-07-09.md`

### 场景与运行

- `docs/00-overview/worldos-scene-production-matrix-2026-07-09.md`
- `docs/00-overview/worldos-scene-component-api-spec-2026-07-09.md`
- `docs/00-overview/worldos-scene-data-contract-2026-07-09.md`
- `docs/00-overview/worldos-world-runtime-state-machine-spec-2026-07-09.md`
- `docs/00-overview/worldos-transition-choreography-spec-2026-07-09.md`
- `docs/00-overview/worldos-atmosphere-sensory-system-spec-2026-07-09.md`

### 场景专项

- `docs/00-overview/worldos-home-world-gateway-spec-2026-07-09.md`
- `docs/00-overview/worldos-atlas-world-map-spec-2026-07-09.md`
- `docs/00-overview/worldos-timeline-river-spec-2026-07-09.md`
- `docs/00-overview/worldos-archive-memory-library-spec-2026-07-09.md`
- `docs/00-overview/worldos-paths-journey-system-spec-2026-07-09.md`
- `docs/00-overview/worldos-node-place-reading-spec-2026-07-09.md`
- `docs/00-overview/worldos-lighthouse-observatory-spec-2026-07-09.md`

### 质量与边界

- `docs/00-overview/worldos-performance-asset-budget-2026-07-09.md`
- `docs/00-overview/worldos-fallback-experience-spec-2026-07-09.md`
- `docs/00-overview/worldos-local-lan-observability-spec-2026-07-09.md`
- `docs/00-overview/worldos-content-life-runtime-contract-2026-07-09.md`
- `docs/00-overview/worldos-ai-lighthouse-runtime-spec-2026-07-09.md`

## 5. 执行顺序

1. 先做 M8。首页不变，后面都像补丁。
2. 再做 M9。四大场景必须形成可区分空间。
3. 再做 M10。内容节点成为世界地点。
4. 再做 M11。把页面之间串成迁移叙事。
5. 最后做 M12。灯塔从状态面板变成可感知导览者。

## 6. 每阶段固定流程

1. 阅读总控和对应阶段计划。
2. 对当前页面截图和 DOM 做现状审计。
3. 只改与阶段目标相关的组件和数据契约。
4. 跑定向检查。
5. 跑 `npm run release:local-rc`。
6. 做人工体验量表。
7. 若仍像骨架，不能标记完成。
8. 中文 commit，格式 `feat(world): 中文说明`。

## 7. 不做范围

- 不做外部 Preview / Production。
- 不做全站 3D。
- 不默认播放音频。
- 不接真实 AI Provider。
- 不把权限判断硬编码到前端。
- 不为了视觉冲击牺牲移动端阅读和 reduced-motion。

