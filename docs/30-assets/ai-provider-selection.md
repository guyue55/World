# AI Provider 选型文档

> 制定日期：2026-07-08
> 状态：选型完成，待上线后接入

## 选型结论

**推荐 Provider：OpenAI（gpt-4o-mini）**

选型理由：
1. 中文质量稳定，API 成本低（$0.15/1M input tokens）
2. 响应速度快（平均 1-2 秒）
3. 降级策略已就位：无 API Key 时自动进入低光模式
4. 隐私边界清晰：只传入公开世界索引，不传私密内容

## 备选方案

| Provider | 优势 | 劣势 | 适用场景 |
|---|---|---|---|
| Anthropic claude-3-haiku | 中文好，安全性强 | 成本略高 | 需要更强安全审查时 |
| 本地 Ollama + qwen2 | 无 API 成本，完全本地 | 需要本地算力，响应慢 | 完全离线环境 |

## 接入边界

根据 `worldos-ai-provider-boundary-contract-v1.json`：
- API Key 只存在于服务端，前端不可访问
- AI 只读 `getPublicWorldObjectIndex()` 的公开数据
- AI 建议进入审核队列，不直接写入世界源文件
- 无 API Key 时自动降级为低光模式

## 当前状态

当前阶段以本地 LAN 为主，`realTimeAIProviderEnabled: false`。灯塔以低光模式运行，只提供静态推荐和预设问答。上线后切换为真实 Provider 时，边界设计不需要改变。
