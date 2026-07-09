# WorldOS M19-M30 全面详细执行总计划

> [!IMPORTANT]
> 本计划是 M19-M30 的执行总控。它覆盖目标、阶段、具体操作、验证、提交、失败处理和停止条件。所有阶段必须服从终局体验宪章。

## 1. 总目标

把 WorldOS 从“本地成熟世界 MVP+”继续推进到“9/10 终局候选”：

- 场景像独立空间。
- 切换像真实穿梭。
- 内容像地点和生命体。
- AI 灯塔像陪伴者。
- 音乐、氛围、视觉、交互统一。
- 用户愿意长期回访。
- 作者能持续养世界。
- 验收真实可信。

## 2. 执行前置

进入 M19 前必须确认：

1. M8-M18 已真实完成，非口头完成。
2. `npm run check:mainline` 通过。
3. `npm run release:local-rc` 通过或明确记录阻塞。
4. 核心页面有最新生产态截图。
5. 仍像骨架的问题已写入执行账本。

## 3. 总阶段表

| 阶段 | 目标 | 主文档 | 核心证据 |
| --- | --- | --- | --- |
| M19 | 场景主体深度交互 | `worldos-m19-scene-deep-interaction-spec-2026-07-10.md` | 四场景交互录屏 |
| M20 | 世界空间连续性 | `worldos-m20-spatial-continuity-spec-2026-07-10.md` | 迁移录屏 |
| M21 | 内容生命循环 | `worldos-m21-content-life-loop-spec-2026-07-10.md` | 单节点多场景吸收报告 |
| M22 | 灯塔 AI 深度导览 | `worldos-m22-lighthouse-ai-deep-guidance-eval-spec-2026-07-10.md` | grounded 问答评估 |
| M23 | 感官音频资产 | `worldos-m23-sensory-audio-production-spec-2026-07-10.md` | 默认静音、授权和预算 |
| M24 | 高级可视化试点 | `ADR-0007-advanced-visualization-candidates.md` | 原型收益 / 成本对比 |
| M25 | 作者编辑台 | `worldos-m25-author-world-editor-spec-2026-07-10.md` | 作者维护演练 |
| M26 | 世界记忆回访 | `worldos-m26-world-memory-returning-visitor-spec-2026-07-10.md` | 再访和清除演练 |
| M27 | 多层权限私密宇宙 | `worldos-m27-layered-permission-private-universe-spec-2026-07-10.md` | 权限边界扫描 |
| M28 | 长期运行观测回滚 | `worldos-m28-long-running-observability-rollback-runbook-2026-07-10.md` | 回滚演练 |
| M29 | 高保真体验打磨 | `worldos-m29-high-fidelity-polish-standard-2026-07-10.md` | 多轮人工体验量表 |
| M30 | 终局候选验收 | `worldos-m30-ultimate-candidate-acceptance-protocol-2026-07-10.md` | 全链路验收报告 |

## 4. 每阶段固定流程

1. 读取终局体验宪章和阶段文档。
2. 截取当前页面 baseline。
3. 写本阶段小计划到执行账本。
4. 实施最小完整改动。
5. 跑阶段定向检查。
6. 跑 `npm run typecheck`、`npm run lint`、`npm run build:production-ci`、`npm run check:mainline`。
7. 大阶段完成后跑 `npm run release:local-rc`。
8. 生产态启动并截图 / 录屏。
9. 按人工体验量表判断是否仍像骨架。
10. 修复失败并重跑。
11. 中文提交，格式 `feat(world): 中文说明` 或 `docs(world): 中文说明`。
12. 更新执行账本。

## 5. 技术栈进入决策

| 技术 | 允许阶段 | 决策门槛 |
| --- | --- | --- |
| View Transition API | M20 | 只作为渐进增强；reduced-motion 下必须禁用或替代 |
| XState | M20 | 迁移状态超出普通 reducer / registry 可维护范围 |
| D3 / d3-force | M24 | Atlas / Timeline 原生 SVG / Canvas 不能满足布局需求 |
| Three.js / React Three Fiber | M24+ | 局部空间必须 3D 才成立，且性能预算通过 |
| Howler / Tone | M23+ | 原生 Web Audio 管理不了场景声景复杂度 |
| IndexedDB | M26 | 回访记忆超过 localStorage 合理范围 |
| OpenAI Responses API | M22 | 服务端 Provider、权限、审计、缓存、fallback 完成 |

## 6. 质量门禁

每阶段必须检查：

- 无白屏。
- 无遮挡。
- 无死链。
- 无权限泄漏。
- 无默认自动播放音频。
- 无前端 AI key。
- 无重依赖绕过 ADR。
- 无旧构建 / 旧截图 / 旧报告误判。

## 7. 阶段失败处理

失败时按顺序处理：

1. 记录失败命令或截图位置。
2. 定位原因。
3. 修最小范围。
4. 重跑失败项。
5. 若影响主线，重跑 `check:mainline`。
6. 仍失败则降级目标，不跳过证据。

## 8. 终局候选完成定义

只有同时满足以下条件，才可称为 9/10 终局候选：

- M19-M30 全部完成。
- 八个终局体验支柱均有证据。
- 所有 P0/P1 缺陷关闭。
- `check:mainline` 和 `release:local-rc` 通过。
- 全场景截图、关键路径录屏、AI 问路评估、权限审计、性能预算、资产授权和作者维护演练均完成。
- 明确列出仍未达 10/10 的缺口。

