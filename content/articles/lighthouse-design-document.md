# 灯塔设计文档

AI 灯塔是 WorldOS 的"温柔的 AI"：它在需要时亮起，不需要时熄灭。

## 系统设计

三层结构：抽象层（Provider 接口）、策略层（budget guard + prompt hygiene + permission audit）、表现层（灯塔搜索、节点摘要、关系推荐）。三层之间通过 TypeScript 严格类型隔离。

## 低光降级

当 AI_ENABLED=false 时，所有 AI 入口自动降级到"无 AI 路径"：搜索用 Fuse.js、摘要用 summary 字段、推荐用关系表。用户看到的是相同的 UI，只是没有额外解读。

## 与 provider 抽象的关系

抽象层允许在 OpenAI/Anthropic/DeepSeek/本地模型之间切换。真接入哪一个由 M16 里程碑决定。

## 一次观察

低光模式（AI 关闭）意外地成了主要模式。绝大多数访客根本不需要 AI，只需要一个可读的世界。这让 AI 边界化的决策更加坚定。

## 未来方向

M16 时会接入至少一个真实 provider，同时保留低光模式作为默认。
