# WorldOS M14 灯塔 AI 运行化执行计划

## 1. 目标

让 Lighthouse 从可感知观测站进入可控运行层：服务端只读公开事实源，支持问路、解释、推荐、总结，并具备缓存、限流、审计和静态回退。

## 2. 执行项

| 项 | 操作 | 验收 |
| --- | --- | --- |
| Provider adapter | 保持 Provider 只在服务端适配，默认 dry-run 或 disabled 可运行 | 前端无法读取 key |
| 上下文策略 | 建立公开事实源检索与裁剪，排除 private / vault / sealed / silent | AI 候选源无私密内容 |
| 结构化输出 | 输出 answer、recommendations、sources、limits、auditSummary | 前端展示依据和限制 |
| 缓存与超时 | 常见问题缓存，请求可超时和取消 | Provider 慢或不可用不阻塞浏览 |
| 审计 | 记录输入摘要、使用来源、排除原因、输出摘要 | 可复盘 AI 为什么这样回答 |
| 静态回退 | 无 key、离线、禁用、失败时展示中文推荐路径 | 灯塔离线也能问路 |
| 权限边界 | 所有权限事实来自后端 / 数据契约 | 前端只控制体现和显隐 |

## 3. 禁止事项

- 禁止前端持有 Provider Key。
- 禁止前端拼接权限上下文。
- 禁止读取私密原文。
- 禁止 AI 自动修改、发布、删除或变更可见性。
- 禁止把真实 Provider 接入作为本阶段完成的唯一标准。

## 4. 检查命令

- `npm run check:lighthouse`
- `npm run check:ai-boundary`
- `npm run check:ai-provider-boundary`
- `npm run check:api-boundary`
- `npm run check:mainline`
- `npm run release:local-rc`

## 5. 人工验收

- 用户能看到灯塔“知道自己基于什么回答”。
- 用户能看到灯塔“不能回答什么”。
- Provider disabled 时体验不崩坏。
- 所有 fallback 是中文、低门槛、可继续探索。

## 6. 完成定义

M14 完成不等于接入昂贵 AI。M14 完成意味着：AI 运行边界、上下文、缓存、审计、回退都可靠，真实 Provider 可作为受控增强插入。

