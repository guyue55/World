# WorldOS 主线代码地图

## 四层主线

代码分为四层主线（RC3 建立框架，Phase 2-9 持续更新）：

1. **正式主线**：`src/app` 的公开产品页、`src/components/product`、`src/components/world`、`src/lib/world-kernel-*`。
2. **公开数据协议**：`data/domains/experience`、`data/core/relations.json`、`data/core/world-events.json`。
3. **治理门禁**：`scripts/check-worldos-*`、`scripts/check-world-kernel-*`、`scripts/run-worldos-*`。
4. **历史参考**：V/R/R8 阶段页、旧动态 runtime、阶段性脚本，只能通过边界策略保留，不能回到公开入口。

### 正式主线（当前状态）

- **公开页面**：首页、Atlas 星座图、节点阅读页、路径引导页、时间线页、灯塔控制台
- **核心组件**：`src/components/product/`（ProductJourneyDock、ReadingToc 等）、`src/components/world/`（AtlasLiveConstellation 等）
- **核心库**：`src/lib/public-world-objects.ts`（公开世界索引）、`src/lib/product-routes.ts`（路由边界）、`src/lib/ai-boundary.ts`（AI 边界策略）、`src/lib/ai-availability.ts`（低光降级）、`src/lib/lighthouse-recommend.ts`（推荐引擎）、`src/lib/export-contract.ts`（导出契约）
- **API 路由**：`src/app/api/lighthouse/search`、`src/app/api/lighthouse/ask`（灯塔搜索与问答）
- **middleware**：`src/middleware.ts`（服务端权限守门，拦截私密路由）

### 公开数据协议（当前状态）

- **节点**：`data/domains/experience/nodes.json`（100 个公开节点，8 个区域）
- **区域**：`data/domains/experience/areas.json`（8 个一级区域）
- **关系**：`data/core/relations.json`（162 条关系星线）
- **路径**：`data/domains/experience/paths.json`（15 条公开路径）
- **事件**：`data/core/world-events.json`（33 个世界事件）
- **内容**：`content/articles/`、`content/fragments/`、`content/memory/`（100 个 Markdown 正文文件）
- **世界索引**：`data/world-index.json`（机器可读的世界元数据）

### 治理门禁（当前状态）

- **日常门禁**：`npm run check:daily`（类型安全 + lint + 内容密度 + 关系数 + 路径数 + 事件数 + 脚本治理）
- **边界门禁**：`npm run check:boundary`（API 边界 + 权限边界 + 导入边界 + 交叉引用）
- **发布候选**：`npm run release:local-rc`（日常 + 边界 + smoke + 构建产物）
- **新增脚本**：`audit-content-freshness.mjs`（T9.1）、`check-cross-references.mjs`（T9.2）、`backup-world.mjs`（T7.4）、`check-build-output.mjs`（T7.5）
- **导出管线**：`scripts/export-world.mjs`（一键导出世界为 Markdown + JSON）
- **脚本治理**：259 个活跃脚本，631 个 legacy 脚本归档到 `scripts/_legacy/`

### 历史参考

- V/R/R8 阶段页面和旧动态 runtime 保留在 `_legacy` 目录下
- legacy API 路由保留为只读，不新增写入方法
- legacy 脚本只能作为参考，不能回到公开入口

## 为什么要画地图

这个地图不是为了删除历史，而是为了让未来开发知道：哪里是道路，哪里是遗迹，哪里只是旧星群。

WorldOS 的阶段很多，实验也很多。如果没有主线地图，后续维护很容易把旧页面、旧 runtime、旧报告当成当前事实。主线地图的价值是降低误判：公开入口应该走正式主线，数据事实应该回到统一协议，治理逻辑应该通过脚本和契约验收，历史阶段只能作为参考。

## 如何使用

新增能力时先问三个问题：它属于公开产品面、世界数据协议、治理门禁，还是历史参考？它是否需要进入本地 RC？它的可见性和权限是否由后端事实源控制？如果答案不清楚，就不要急着把入口暴露给用户。

这张地图也服务于“降低门槛”。开发者可以沿着主线找到真实文件，访问者可以通过页面看到清晰路径，维护者可以通过检查脚本确认边界没有漂移。世界越大，越需要这种朴素但稳定的方向感。
