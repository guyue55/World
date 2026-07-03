# R1｜真实生产收口：全任务与扩展任务规划

## 版本定位

R1 不再继续开 V11，也不继续堆新概念。R1 的目标是把 V10 后的结构成果收束成可复跑、可部署、可验收的工程基线，为后续 R2「世界入口与沉浸体验重构」提供稳定地基。

最终目标保持不变：访问者不是打开博客，而是进入古月浮屿；开发者不是维护页面集合，而是在经营一个可长期生长、可审计、可传承的个人数字世界。

## 阶段 1：最终基线统一与仓库清洁

- 批次 01：统一最终基线
- 批次 02：仓库污染清单
- 批次 03：生产构建策略
- 批次 04：R1 任务规划落库

验收：R1 roadmap、stage、batch、extension registry 落库；productionLive / releaseReady / cleanProductionReady 均保持 false，避免伪上线。

## 阶段 2：真实命令门禁与构建稳定

- 批次 05：命令矩阵
- 批次 06：构建策略
- 批次 07：质量门禁证据
- 批次 08：依赖安装记录

验收：check:json、check:repo、check:r1-production:all、lint、typecheck、build、audit:report 被纳入 R1 质量门禁。

## 阶段 3：部署证据与运行手册

- 批次 09：部署清单
- 批次 10：smoke 测试计划
- 批次 11：回滚阶梯
- 批次 12：签收模板

验收：Preview 与 Production smoke routes 明确，外部部署和人工签收仍显式 pending。

## 阶段 4：Release Candidate 包装与交接

- 批次 13：RC manifest
- 批次 14：风险台账
- 批次 15：封版说明
- 批次 16：R2 交接

验收：形成 R1 local-engineering-candidate，后续进入 R2 世界入口、Atlas、罗盘和节点体验重构。

## 扩展任务

- 最终基线契约
- 历史产物隔离
- 构建 trace 策略
- CI 可复跑
- Preview smoke 计划
- 人工签收模板
- 回滚阶梯
- 发布证据台账
- 公开 JSON 静态化
- 风险台账
- R2 体验重构交接
- 不新增概念漂移
