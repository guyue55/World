# World Kernel Architecture Audit v1

本报告冻结当前功能扩张，把项目从“继续加动态宇宙组件”切换到“内核、边界、路由、脚本和生产证据收束”。

## 1. 唯一基线

- 基线包：`word-life_productization_journey_paths_v1_full-package.zip`
- 工作区：`/mnt/data/worldos_kernel_work`
- 状态：`active`
- 原因：产品化主入口、旅程路径、路由守门和发布门禁已经完成，本轮起不再继续扩展 R8.x/V/R 阶段线。

## 2. 审计统计

```json
{
  "files": {
    "app": 114,
    "components": 439,
    "features": 197,
    "lib": 160,
    "data": 1052,
    "scripts": 753,
    "docs": 859
  },
  "appRouteFiles": 81,
  "stageRouteFiles": 49,
  "scripts": 747,
  "checkScripts": 552,
  "stageCheckScripts": 454,
  "r8Components": 64,
  "r8DataFiles": 51,
  "r8Scripts": 27,
  "publicRouteTokenCount": 58
}
```

## 3. 关键发现

| ID | 严重级别 | 区域 | 发现 | 决策 |
|---|---|---|---|---|
| kernel-001 | critical | Baseline | 必须停止继续扩展 R/V 阶段线 | 冻结功能扩张，后续只允许审计、收束、修复和真实发布证据工作。 |
| kernel-002 | high | Runtime | R8 动态宇宙运行层存在多代重复实现 | 保留产品化 WorldShell + Product* 为公开入口；R8 动态系列降级为 legacy/reference。 |
| kernel-003 | high | Routes | 公开路由应由单一 World Kernel Route Decision 控制 | 服务端路由边界优先于前端显隐，私密和内部路由统一 redirect/guard。 |
| kernel-004 | medium | Scripts | 检查脚本数量已经进入治理期 | 短期保留历史 checks，新增 check:world-kernel-audit 作为收束门禁；中期合并为 check:core/check:runtime/check:release/check:legacy。 |
| kernel-005 | medium | Production | productionLive 仍不能声明为 true | 所有交付继续标记 productionLive=false，直到真实环境证据补齐。 |

## 4. 删 / 合 / 留 / 封决策矩阵

| 类别 | Keep | Merge | Archive | Delete Later |
|---|---|---|---|---|
| Core Model | src/lib/types.ts<br>src/lib/world-core.ts<br>data/domains/experience/*.json | 分散在 v/r 阶段的 Node/Area/Relation 衍生字段 | 只服务阶段页的 v*/r* data definitions | 重复且无公开入口引用的旧实验模型 |
| Runtime | ProductBackdrop<br>ProductJourneyDock<br>ProductRouteGuide<br>WorldShell | R8 Dynamic/Living/Complete/Interactive/Civilization 中被验证有效的交互思路 | src/components/r8-*<br>data/r8-*<br>scripts/check-r8-* | 未被页面引用的重复 runtime widgets |
| Routes | /<br>/atlas<br>/timeline<br>/archive<br>/paths<br>/ask<br>/manifesto<br>/status<br>/node/:slug<br>/paths/:id | world/world-map/time-river/lighthouse legacy redirects | v*/r*/phase*/evidence/governance/production/release routes | 无文档、无导航、无测试覆盖的阶段页 |
| Scripts | check:product-release<br>check:world-kernel-audit<br>lint<br>typecheck<br>build:verify-artifacts | stage/round/r/v checks into check:legacy | 历史阶段批次检查脚本 | 重复验证同一文件存在性的阶段脚本 |

## 5. 立即执行边界

- 冻结功能扩张，优先收束内核。
- 公开世界只暴露可理解、可返回、可审计的产品路径。
- 私密、家庭、vault、内部治理和阶段页由服务端路由守门，前端只做显隐体现。
- AI 是灯塔，不是太阳；AI 建议必须可审计、可拒绝、可撤销。
- 世界语言必须有现实解释，不能牺牲可用性。

## 6. 下一步

- 不要继续新增 R8.10/V11。
- 先把 product route、world core、public index、route guard、checks 合并为更少的核心门禁。
- 为真实 Preview/Production 准备部署证据，而不是继续增加概念组件。
- 所有私密/内部路由继续由 middleware 和 route policy 服务端守门。

## 7. 结论

当前项目不缺更多页面或概念，真正需要的是一个足够稳定、足够简单、足够长期可维护的 World Kernel。短期保留历史阶段文件作为 legacy/reference，但公开入口、路由守门、产品页面和检查门禁必须围绕产品化主路径收束。
