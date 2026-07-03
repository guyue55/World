# 古月浮屿｜V4 前 data JSON 目录整理说明

## 现状问题

```text
整理前 data/ 根目录 JSON 文件过多：353 个根 JSON
问题：运行数据、协议、阶段归档、发布证据、工程检查、领域数据混在一起
```

## 本轮整理结果

```text
已移动根 JSON：353
data/ 根目录剩余 JSON：_data-structure-registry.json
涉及 JSON 引用文件数：419
JSON import/require 解析数量：1167
悬空 JSON 引用：0
```

## 新 data 结构

```text
data/core/                 协议、schema、registry、manifest、世界核心规则
data/domains/ai/           AI、灯塔、建议、审计队列
data/domains/archive/      私密档案、家庭、传承、时间胶囊、世界册
data/domains/content/      内容生态、栏目、日历、品牌、反馈
data/domains/experience/   页面、路径、节点、Atlas、时间河、视觉体验
data/domains/governance/   治理、安全、权限、审计、隐私、风险
data/engineering/          构建、测试、性能、依赖、工具链、质量
data/operations/           运维、自动化、观测、RSS、SEO、导出、成本
data/release/              发布、验收、证据、门禁、阻断、签收
data/versions/archive/     阶段/版本历史数据归档
data/v2/
data/v2-1/
data/v3/
data/v3-concept/
data/pre-v4/
```

## 分组统计

```json
{
  "release": 124,
  "core": 68,
  "domains/ai": 17,
  "domains/archive": 7,
  "domains/experience": 34,
  "domains/governance": 25,
  "engineering": 35,
  "domains/content": 23,
  "operations": 8,
  "versions/archive": 12
}
```

## 引用更新

```text
已批量更新 src/ 与 scripts/ 中的 JSON 引用：
../../data/*.json
../../../data/*.json
../data/*.json
data/*.json

改为对应的新分组路径。
```

## 新增命令

```bash
npm run check:pre-v4:data-structure
```

## 检查结果

```text
JSON parse check passed.
Static data structure logic check passed.
JSON import resolution check passed.
Stale root data JSON reference scan passed.
Basic format check on changed files passed.
Real command npm run check:pre-v4:data-structure: blocked-or-failed
```

## 后续规则

```text
不要再新增 data/*.json 根文件。
新增 V4 规划数据优先放 data/v4/。
跨版本稳定协议放 data/core/。
阶段性历史记录放 data/versions/archive/。
领域数据放 data/domains/<domain>/。
```

## 本轮未打包

```text
没有要求无需打包。
```

## 变更文件数

```text
736
```
