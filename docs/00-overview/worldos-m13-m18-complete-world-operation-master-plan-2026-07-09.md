# WorldOS M13-M18 完整世界运行闭环总计划

> [!IMPORTANT]
> M8-M12 解决“像不像世界”。M13-M18 解决“这个世界是否真正能长期运行”。两组阶段共同构成 Goal 模式的完整高目标路线。

## 1. 总目标

在 M8-M12 完成世界入口、核心场景、节点、迁移和灯塔可感知体验后，继续补齐感官资产、AI 运行、内容生产、性能依赖、QA 证据和作者运维，使 WorldOS 在 localhost / LAN 下成为可运行、可维护、可验证的个人数字世界。

## 2. 阶段地图

| 阶段 | 名称 | 目标 | 完成判断 |
| --- | --- | --- | --- |
| M13 | 感官、音频与资产生产 | 氛围、声音、视觉资产可选、可控、可降级 | 无默认声音，资产有授权和预算 |
| M14 | 灯塔 AI 运行化 | 灯塔服务端只读问路、解释、推荐 | 无前端 key，无私密泄漏，有审计和 fallback |
| M15 | 内容世界生产 | 真实节点、关系、路径、时间、档案补齐 | 场景共享同一事实源，内容不再空 |
| M16 | 性能与依赖硬化 | 技术栈足够且不臃肿 | 依赖、bundle、首屏、移动端预算通过 |
| M17 | 本地 QA 与证据自动化 | 真实浏览器、LAN、截图、人工体验证据闭环 | `release:local-rc` 证明新鲜体验 |
| M18 | 作者治理与运行运维 | 作者能持续添加内容、资产、审计和回滚 | 有低门槛中文工作流和维护手册 |

## 3. 执行顺序

1. M13：先让世界有可控感官层，但不增加默认负担。
2. M14：再让灯塔 AI 可控运行，服务端只读。
3. M15：补真实内容生命，否则世界仍会空。
4. M16：收紧技术栈、性能和依赖，防止前面阶段变重。
5. M17：把体验证据固化，避免“看起来完成”。
6. M18：整理作者和运维流程，让项目能持续生长。

## 4. 必读文档

- `docs/00-overview/worldos-full-goal-document-gap-analysis-2026-07-09.md`
- `docs/00-overview/worldos-m8-m12-true-world-experience-master-plan-2026-07-09.md`
- `docs/00-overview/worldos-m13-m18-complete-world-operation-master-plan-2026-07-09.md`
- `docs/00-overview/worldos-quality-control-system-2026-07-09.md`
- `docs/00-overview/worldos-performance-asset-budget-2026-07-09.md`
- `docs/00-overview/worldos-tech-stack-and-open-source-research-2026-07-09.md`
- `docs/00-overview/worldos-human-experience-review-rubric-2026-07-09.md`

## 5. 每阶段固定流程

1. 阅读对应阶段执行计划。
2. 审计当前实现是否满足阶段目标。
3. 只改与阶段目标相关的代码、数据、资产或脚本。
4. 跑定向检查。
5. 跑 `npm run check:mainline`。
6. 跑 `npm run release:local-rc`。
7. 进行人工体验与异常流确认。
8. 中文 commit，格式 `feat(world): 中文说明`。

## 6. 阶段边界

- 不考虑外部 Preview / Production。
- 不默认播放音频。
- 不一次性引入 3D、音频、图谱、AI 重型依赖。
- 不在前端硬编码权限或拼接 AI 权限上下文。
- 不为了效果牺牲静态可读、移动端、reduced-motion 和 reduced-sensory。

## 7. 完成定义

只有当 M8-M18 全部满足以下条件，才允许说“真格世界基础目标达成”：

- 第一眼、核心场景、节点、迁移和灯塔都不像骨架。
- 感官、音频、资产都有预算、授权、懒加载和降级。
- AI 灯塔只读、服务端、可审计、可回退。
- 内容事实源真实、足量、可被多场景吸收。
- 本地 / LAN RC 可重复证明体验。
- 作者能用中文低门槛流程持续维护。

