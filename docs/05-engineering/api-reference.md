# WorldOS API 参考文档

> 更新日期：2026-07-08
> 数据来源：data/world-kernel/worldos-api-boundary-registry-v1.json
> 路由总数：25

## 权限分级说明

| 分类 | 含义 | 守门方式 |
|---|---|---|
| public-read | 公开只读 | 无需守门 |
| static-safe-public | 静态安全公开 | force-static，构建时生成 |
| permission-guarded | 权限守门 | requirePermission（RBAC） |
| owner-only | 仅创作者 | requireOwner |

## 核心原则

1. 公开 API 只能使用 GET 方法
2. 任何写入操作必须由服务端 requireOwner 或 requirePermission 守门
3. middleware 不覆盖 /api，每个 API 路由自行守门
4. 前端显隐不是权限控制依据
5. 灯塔 API 使用 force-static 避免写入信号

## 灯塔 API（AI 灯塔区域）

### GET /api/lighthouse/search

- 文件：src/app/api/lighthouse/search/route.ts
- 权限：static-safe-public（无需守门）
- 方法：GET
- 缓存：public-max-age-300
- 描述：灯塔搜索 API，只读公开世界索引返回匹配节点
- 降级：低光模式下返回静态索引匹配结果

### GET /api/lighthouse/ask

- 文件：src/app/api/lighthouse/ask/route.ts
- 权限：static-safe-public（无需守门）
- 方法：GET
- 缓存：public-max-age-300
- 描述：灯塔问答 API，低光模式下返回静态推荐，不调用真实 AI
- 降级：低光模式下返回预设问答

## R6 API（创作者工作台）

### GET /api/r6/audit

- 文件：src/app/api/r6/audit/route.ts
- 权限：owner-only（requireOwner）
- 方法：GET
- 缓存：no-store
- 描述：R6 owner-only 审计事件索引，仅暴露给创作者

### GET/POST /api/r6/export-jobs

- 文件：src/app/api/r6/export-jobs/route.ts
- 权限：owner-only（requireOwner）
- 方法：GET, POST
- 缓存：no-store
- 描述：R6 owner-only 导出任务索引和创建占位
- 注意：POST 为占位写入，不写入生产数据

### GET/POST/PATCH /api/r6/nodes

- 文件：src/app/api/r6/nodes/route.ts
- 权限：owner-only（requireOwner）
- 方法：GET, POST, PATCH
- 缓存：no-store
- 描述：R6 owner-only 草稿节点运行态适配器，仅修改内存中的草稿节点
- 注意：使用运行态内存，不持久化

### GET /api/r6/service-health

- 文件：src/app/api/r6/service-health/route.ts
- 权限：public-read（无需守门）
- 方法：GET
- 缓存：default-static-or-framework
- 描述：R6 公开服务就绪摘要，仅静态状态

## R7 API（世界运行态）

### GET /api/r7/maintenance

- 文件：src/app/api/r7/maintenance/route.ts
- 权限：owner-only（requireOwner）
- 方法：GET
- 缓存：no-store
- 描述：R7 owner-only 维护建议，不公开暴露

### GET /api/r7/world-log

- 文件：src/app/api/r7/world-log/route.ts
- 权限：public-read（无需守门）
- 方法：GET
- 缓存：default-static-or-framework
- 描述：R7 公开世界日志摘要，仅公开事件

### GET /api/r7/world-state

- 文件：src/app/api/r7/world-state/route.ts
- 权限：public-read（无需守门）
- 方法：GET
- 缓存：default-static-or-framework
- 描述：R7 公开世界状态和健康摘要

## V2 API（权限守门层）

### GET /api/v2/ai/suggestions

- 文件：src/app/api/v2/ai/suggestions/route.ts
- 权限：permission-guarded（requirePermission）
- 方法：GET
- 缓存：default-static-or-framework
- 描述：V2 权限守门 AI 建议，访客被 RBAC 拒绝

### GET /api/v2/audit

- 文件：src/app/api/v2/audit/route.ts
- 权限：permission-guarded（requirePermission）
- 方法：GET
- 缓存：default-static-or-framework
- 描述：V2 权限守门审计列表，访客被 RBAC 拒绝

### GET /api/v2/content

- 文件：src/app/api/v2/content/route.ts
- 权限：permission-guarded（requirePermission）
- 方法：GET
- 缓存：default-static-or-framework
- 描述：V2 权限守门公开内容列表，访客只能读取公开内容

### GET /api/v2/export/jobs

- 文件：src/app/api/v2/export/jobs/route.ts
- 权限：permission-guarded（requirePermission）
- 方法：GET
- 缓存：default-static-or-framework
- 描述：V2 权限守门导出任务列表，访客被 RBAC 拒绝

### GET /api/v2/vault

- 文件：src/app/api/v2/vault/route.ts
- 权限：permission-guarded（requirePermission）
- 方法：GET
- 缓存：default-static-or-framework
- 描述：V2 权限守门保险库列表，访客被 RBAC 拒绝

## Legacy API（历史保留，只读）

以下 API 位于 _legacy 目录下，保留为历史参考，全部只读：

| 路径 | 权限 | 描述 |
|---|---|---|
| GET /api/_legacy/r8/civilization-universe | static-safe-public | R8 静态文明宇宙状态 |
| GET /api/_legacy/r8/complete-universe | static-safe-public | R8 静态完整宇宙状态 |
| GET /api/_legacy/r8/dynamic-world | public-read | R8 静态动态世界运行态状态 |
| GET /api/_legacy/r8/feedback | public-read | R8 公开反馈通道描述 |
| GET /api/_legacy/r8/interactive-universe | static-safe-public | R8 静态交互宇宙状态 |
| GET /api/_legacy/r8/public-log | public-read | R8 公开发布日志摘要 |
| GET /api/_legacy/r8/public-status | public-read | R8 公开运维状态摘要 |
| GET /api/_legacy/r8/scene-universe | static-safe-public | R8 静态场景宇宙数据 |
| GET /api/_legacy/r8/sensory-universe | static-safe-public | R8 静态感官宇宙数据 |
| GET /api/_legacy/v9/service-health | public-read | V9 公开服务平台健康摘要 |
| GET /api/_legacy/v10/intelligence-health | public-read | V10 公开智能世界健康摘要 |

## 统计摘要

| 指标 | 值 |
|---|---|
| 总路由数 | 25 |
| owner-only | 4 |
| permission-guarded | 5 |
| public-read | 9 |
| static-safe-public | 5 |
| 写入路由（占位） | 2 |
| 需要数据库 | 0 |
| 需要真实 AI | 0 |
