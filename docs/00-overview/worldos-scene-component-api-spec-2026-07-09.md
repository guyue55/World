# WorldOS 场景组件 API 规格

## 1. 目标

定义场景组件的统一 API，避免每个场景重复实现入口、状态、动效、关系、出口和降级。

## 2. 基础组件

| 组件 | 职责 |
| --- | --- |
| `SceneShell` | 场景布局、标题、状态、降级 |
| `SceneGateway` | 场景入口和主 CTA |
| `SceneMotionLayer` | 动态层和 reduced-motion |
| `SceneRelationRail` | 关系与推荐 |
| `SceneExitRail` | 下一步、返回地图 |
| `SceneFallback` | 静态和低性能降级 |

## 3. API 输入

- `sceneId`
- `title`
- `summary`
- `tone`
- `nodes`
- `relations`
- `entrypoints`
- `exits`
- `motion`
- `fallback`

## 4. 约束

- 组件只消费统一数据契约。
- 权限事实不在组件内硬编码。
- 动效不得直接写死在业务组件。

## 5. 验收

- Home、Atlas、Timeline、Archive、Paths 至少共享一组基础组件语义。
- 新场景不需要复制整套状态逻辑。

