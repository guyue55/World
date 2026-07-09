# WorldOS AI 审计复核清单

## 适用范围

灯塔问答、AI 推荐、摘要草稿、维护建议、路径建议和内容改写建议都必须经过本清单。

## 当前运行边界

- Provider 默认 disabled dry-run。
- AI 只读公开事实源。
- AI 不读取 private、vault、sealed、owner-only 数据。
- AI 不写入节点、关系、路径、事件、权限或配置文件。
- 前端不出现 API key、owner token 或 Provider 调用。

## 复核步骤

1. 判断 AI 输出属于解释、推荐、问路、摘要还是维护建议。
2. 检查来源是否只来自公开节点和公开路径。
3. 检查是否包含越权动作，例如自动发布、自动改源、读取私密档案。
4. 对可采纳建议人工改写，再由作者手动更新事实源。
5. 运行 AI 与权限边界检查。

```bash
npm run check:lighthouse
npm run check:ai-boundary
npm run check:ai-provider-boundary
npm run check:api-boundary
npm run check:permission-boundary
```

## 禁止项

- AI 直接写源数据。
- AI 自行发布、归档、删除或改权限。
- 前端保存 owner token 或 Provider key。
- 把 AI 输出当成事实源，跳过人工复核。

## 验收

一个 AI 建议只有在作者理解来源、风险、影响范围后，才能进入人工编辑流程。灯塔是导览和解释者，不是自动管理员。
