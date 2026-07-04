# V6 私密档案与 AI 世界助手架构

V6 的 private-ai 不是完整 V7 AI 助手，而是 V6 私密档案版的边界化 AI 预埋层。

## 架构边界

```text
公开内容 / 脱敏索引 / AI 只读上下文
  ↓
AI 建议生成
  ↓
人工审批队列
  ↓
审计日志
  ↓
允许进入 V7 的助手能力
```

AI 不接触 vault 原文、不自动公开、不自动删除、不自动改权限、不覆盖原始记忆。

## 模块结构

```text
data/v6-private-ai/
src/features/private-ai-v6/
src/components/private-ai-v6/
src/app/private-ai/
scripts/check-v6-private-ai-*.ts
```
