# WorldOS M19 场景主体深度交互规范

> [!IMPORTANT]
> M19 的目标是让核心场景从“舞台壳”升级为“可操作主体”。若用户只能看标题、按钮和装饰背景，M19 不算完成。

## 1. 目标

- Atlas 像可探索星图。
- Timeline 像可回看的时间河。
- Archive 像可检索档案馆。
- Paths 像可行走旅程。

对应支柱：S1 独立空间、S3 内容生命体。

## 2. 场景交互要求

| 场景 | 必须交互 | 状态变化 | 降级 |
| --- | --- | --- | --- |
| Atlas | 区域聚焦、节点预览、关系解释 | active area、selected node、relation reason | 静态区域列表 + 关系说明 |
| Timeline | 时间锚点、事件水位、节点回看 | active period、selected event、linked node | 静态时间分组 |
| Archive | 检索、分区、筛选、卷宗展开 | query、active shelf、filters、opened dossier | 静态索引 |
| Paths | 路线进度、下一站、返回地图、完成态 | current step、completed steps、next node | 静态路径列表 |

## 3. 数据契约

每个场景主体必须从统一事实源派生：

- nodes
- areas
- relations
- events
- paths
- permissions

不得在组件中硬编码公开 / 私密判断。

## 4. 实施步骤

1. 逐页截图确认现状骨架点。
2. 为每个场景建立 `build*StageModel()` adapter。
3. 新增独立 Stage 组件，不把逻辑塞进页面或 portal。
4. 加 keyboard / hover / focus / click 状态。
5. 加 reduced-motion 和 no-JS fallback。
6. 截图与录屏。

## 5. 验收

- 遮掉文案后仍能区分四个场景。
- 每个场景至少有 3 种可感知状态。
- 移动端可操作。
- `typecheck`、`lint`、`build:production-ci`、`check:mainline` 通过。

