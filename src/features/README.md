# src/features

业务能力模块目录。V4 起新增业务能力应优先进入这里，而不是继续放进 `src/lib/v4`。

## 当前模块

```text
platform-v2/              V2 服务化平台能力
platform-v2-1/            V2 到 V3 前补全能力
intelligent-world-v3/     V3 智能世界能力
v3-concept/               V3 概念深化与任务拆解能力
pre-v4-gate/              V4 前门禁能力
```

## 约束

```text
feature 可以读取 data 中的协议/配置
feature 不直接读取私密原文
feature 不跨层调用 app 路由
feature 之间通过明确导出或 service 接口连接
```
