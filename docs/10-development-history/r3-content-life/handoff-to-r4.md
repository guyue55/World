# R3 → R4 交接：创世台 / 工作台真实化

R4 应直接复用 R3 的 Node 模型、nextAction、areaDensity、publicIndexPolicy 和 relationGraph。

## R4 优先事项

1. 收集箱 / 星尘港最小可用。
2. Owner-only 节点管理视图。
3. 将节点 nextAction 转成轻任务。
4. 权限检查与公开索引守门。
5. 导出 JSON / Markdown 的基础入口。

## 不应做

- 不要引入复杂多用户后台。
- 不要让创世台过度诗意影响效率。
- 不要默认公开生活与半公开节点。
