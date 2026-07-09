# WorldOS 场景数据契约

## 1. 目标

定义场景如何消费同一份内容事实源，避免静态页面、动态世界和 AI 灯塔各自维护一套数据。

## 2. 数据模型

| 数据 | 消费场景 |
| --- | --- |
| `nodes` | Atlas、Node、Paths、Archive、Timeline、Lighthouse |
| `areas` | Atlas、Home、Archive |
| `relations` | Atlas、Node、Lighthouse |
| `paths` | Paths、Home、Lighthouse |
| `events` | Timeline、Archive、Node |
| `visibility` | 全场景 |
| `aiReadableSummary` | Lighthouse |

## 3. 规则

- 场景只能通过契约读取数据。
- 私密数据不进入公开场景。
- 关系必须包含 reason。
- 动态投影不能修改事实源。

## 4. 验收

- 一个节点至少能投影到两个场景。
- 公开和私密边界可被检查。
- AI 上下文来自裁剪后的公开事实源。

