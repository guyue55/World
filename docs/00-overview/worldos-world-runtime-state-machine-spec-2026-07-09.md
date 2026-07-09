# WorldOS 世界运行状态机规格

> [!IMPORTANT]
> 状态机用于防止场景、转场、音频、AI、权限和降级状态互相缠绕。先定义状态，再实现组件。

## 1. 目标

为 WorldOS 提供一个可推理的运行状态模型，保证首访、场景迁移、音频、AI 和降级路径都可控。

## 2. 顶层状态

| 状态 | 含义 |
| --- | --- |
| `booting` | 应用启动与基础数据加载 |
| `firstVisit` | 首次进入仪式 |
| `sceneReady` | 当前场景可读 |
| `transitioning` | 场景迁移中 |
| `settled` | 场景稳定，可继续探索 |
| `degraded` | 动态或 AI 降级 |
| `error` | 受控错误状态 |

## 3. 并行子状态

| 子状态 | 值 |
| --- | --- |
| motion | `full`、`reduced`、`off` |
| sensory | `full`、`quiet`、`silent` |
| ai | `disabled`、`ready`、`thinking`、`fallback`、`error` |
| permission | `public`、`authorized`、`denied` |
| network | `local`、`lan`、`offline-like` |

## 4. 转换规则

- `booting -> sceneReady` 必须先保证静态内容可读。
- `firstVisit -> sceneReady` 必须允许跳过。
- `sceneReady -> transitioning` 由导航触发。
- `transitioning -> settled` 不得阻塞可读内容。
- 任意状态可进入 `degraded`，但必须有用户可理解的说明。
- `error` 必须提供返回 Home 或静态内容的出口。

## 5. 实现边界

- 第一轮可用轻量 reducer / registry，不强制引入 XState。
- 当状态组合复杂到难以手工维护时，再评估 XState。
- 状态不得由多个组件隐式竞争修改。

## 6. 验收

- 首访、跳过、转场、AI 回退、音频关闭均可复现。
- 状态变化有日志或可观测摘要。
- reduced-motion 与 reduced-sensory 不产生矛盾状态。

