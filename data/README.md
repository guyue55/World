# data 目录结构

V4 前已将根目录 JSON 分层整理，避免继续在 `data/*.json` 堆积。

## 目录约定

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
data/v2/                   V2 版本数据
data/v2-1/                 V2.1 数据
data/v3/                   V3 主结构数据
data/v3-concept/           V3 概念深化数据
data/pre-v4/               V4 前门禁与补证数据
```

## 规则

```text
不要再新增 data/*.json 根文件。
新增 V4 规划数据优先放 data/v4/。
跨版本稳定协议放 data/core/。
阶段性历史记录放 data/versions/archive/。
```
