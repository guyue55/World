# 阶段 12：AI Provider 接入准备任务板

**目标：** 为未来真实 AI Provider 接入准备边界，但当前仍保持低光只读，不启用远程模型。

## 批次 12.1：Provider 边界契约

**目标：**
- [x] 默认 `realTimeAIProviderEnabled=false`。
- [x] Provider 只能作为未来后端适配层，不进入客户端。
- [x] 禁止客户端 API Key、自动发布、自动删除、自动改权限。
- [x] AI 建议仍必须进入审核队列，保持 not-executed 和 humanRequired。

**改动范围（执行留痕）：**
- [x] 数据层：新增 `worldos-ai-provider-boundary-contract-v1.json`。
- [x] 检查脚本：新增 `check:ai-provider-boundary`。
- [x] 灯塔门禁：`check:lighthouse` 纳入 Provider 边界检查。

**验收命令：**
```bash
npm run check:ai-provider-boundary
npm run check:lighthouse
npm run check:lighthouse-readonly
```

## 批次 12.2：真实 Provider 后端适配

**目标：**
- [x] 仅在后端增加 provider adapter。
- [x] 增加上下文裁剪器，只允许公开或授权上下文进入模型。
- [x] 所有输出进入审核队列，不自动修改世界源文件。

**改动范围（执行留痕）：**
- [x] 后端新增 `src/server/ai/provider.ts`，保持 `disabled-dry-run`，不读 key、不发起网络请求、不写世界源文件。
- [x] 后端新增 `src/server/ai/context-policy.ts`，只允许公开、半公开或服务端授权上下文进入候选切片。
- [x] 后端新增 `src/server/ai/review-queue.ts`，输出统一为 `not-executed`、`requiredHumanAction`、`writesWorldSource=false`。
- [x] `check:ai-provider-boundary` 改为校验后端禁用态骨架，而不是等待未来文件。
