# Codex CLI 自定义 Provider 与路由排查

自定义模型接入最容易出错的地方不是“模型不会答”，而是请求根本没有走到正确端点。

这个节点沉淀几条经验：

- responses 与 chat completions 不是同一类接口。
- Base URL、env_key、model_provider、wire_api 要同时对齐。
- 401、404、503 需要分别判断：认证、端点、渠道或模型路由。
- 中转站能力不能只看“兼容 OpenAI”，还要确认是否兼容目标客户端的协议。

这类排查应进入技术星域，也可以作为未来 CLI 工具路径的一站。

核心心法是：先确认协议层级，再确认认证层级，最后才看模型能力。

## 配置示例与排查命令

```json
{
  "model_provider": "openai",
  "base_url": "https://api.example.com/v1",
  "wire_api": "responses",
  "env_key": "CUSTOM_API_KEY"
}
```

排查时先用 `curl` 确认端点可达：

```bash
# 测试 chat completions 端点
curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $CUSTOM_API_KEY" \
  https://api.example.com/v1/chat/completions
```

401 说明 API Key 错误或过期；404 说明端点路径不对；503 说明中转站不可用。确认端点可达后再用 CLI 工具连接，这样能把问题范围从"整个链路"缩小到"单一环节"。`wire_api` 设为 `responses` 还是 `chat completions` 取决于中转站支持的协议，不能靠猜——看中转站文档，或者直接 curl 测试。
