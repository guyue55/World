# 世界索引生成器

world-index.json 是世界对外的"面孔"：外部系统、AI、访客都通过它理解世界。生成器把散落在 nodes/relations/paths/events 的原始数据聚合成一份索引。

## 生成逻辑

输入：`data/domains/experience/nodes.json`、`data/domains/experience/paths.json`、`data/core/relations.json`、`data/core/world-events.json`。输出：`public/world-index.json`。中间步骤：过滤 non-public、拼装 areas、生成 graph.lines、projections 派生。

## 关键约束

索引里绝不出现 permission 或 owner-only 数据。permission-audit 会在生成前后各扫一次，保证边界不被静默突破。

## 与 protocol-guide 的关系

索引结构在 world-protocol-guide 里被规范化。任何字段新增都要先更新协议，再更新生成器。
