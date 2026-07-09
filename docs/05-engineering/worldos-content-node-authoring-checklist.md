# WorldOS 内容新增清单

## 适用范围

新增或更新公开节点、区域代表节点、路径节点、时间事件、关系网络时使用本清单。

## 必填事实

每个公开节点至少具备：

- 标题：中文优先，能让新访客理解。
- 摘要：不少于内容生命契约要求，避免空泛标语。
- 区域：必须能归入已有 area。
- 生命周期：节点处于种子、成长、稳定、归档等状态之一。
- 时间锚点：能进入 Timeline 或被时间语义解释。
- 关系：至少有可解释的相关节点，说明为什么相关。
- 推荐路径：能被 Paths 或 Node 出口继续探索。
- 正文来源：有 `contentPath` 或明确的内容事实。

## 操作步骤

1. 更新 `data/domains/experience/nodes.json`。
2. 必要时更新 `data/core/relations.json`。
3. 必要时更新 `data/core/world-events.json`。
4. 必要时更新 `data/domains/experience/paths.json`。
5. 运行内容检查。

```bash
npm run validate:world
npm run check:content-life
npm run check:content
npm run check:node-reading
npm run check:atlas
```

## 禁止项

- 无摘要、无关系、无区域的内容进入精选。
- private、vault、sealed、family、partner 内容进入公开 JSON。
- 为了页面好看在组件里硬编码内容事实。
- AI 直接写入节点、关系、路径或事件源文件。

## 验收

新增内容必须能在至少两个公共场景被吸收，例如 Node + Atlas、Node + Timeline、Archive + Paths。若只出现在单个页面，它还不是世界节点，只是孤立文本。
