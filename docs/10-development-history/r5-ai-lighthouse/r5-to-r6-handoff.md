# R5 → R6 交接：服务化最小闭环

R5 已完成 AI 灯塔静态/本地数据闭环。R6 应把这些能力推进到最小服务化：

1. public-context API：只读公开上下文。
2. review API：owner-only 审批 AI 建议。
3. audit API：AI 读取、建议、批准、拒绝都写入审计日志。
4. search port：先接公开索引，不接 vault。
5. identity boundary：先 owner-only，避免复杂多租户提前引入。

R6 不应绕开 R5 的 AI 主权原则：不自动公开、不自动删除、不覆盖原文、不修改权限、不把推测当事实。
