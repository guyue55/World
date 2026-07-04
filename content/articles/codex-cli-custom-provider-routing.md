# Codex CLI 自定义 Provider 与路由排查

自定义模型接入最容易出错的地方不是“模型不会答”，而是请求根本没有走到正确端点。

这个节点沉淀几条经验：

- responses 与 chat completions 不是同一类接口。
- Base URL、env_key、model_provider、wire_api 要同时对齐。
- 401、404、503 需要分别判断：认证、端点、渠道或模型路由。
- 中转站能力不能只看“兼容 OpenAI”，还要确认是否兼容目标客户端的协议。

这类排查应进入技术星域，也可以作为未来 CLI 工具路径的一站。
