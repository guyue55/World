# 公开路由归属地图

公开路由需要同时满足 sitemap、robots、middleware、导航和 smoke matrix 的一致性。

当前原则：

- `/`、`/atlas`、`/timeline`、`/archive`、`/paths`、`/ask`、`/about`、`/manifesto` 是正式公开入口。
- `/node/*` 与 `/paths/*` 是深层公开入口。
- `/world`、`/world-map`、`/time-river`、`/lighthouse` 只作为兼容重定向。
- 创世台、私密档案、AI 工作台、服务桥、阶段页和治理页必须被守门。

路由不是 URL 列表，而是世界的门。门必须知道自己通往哪里。
