# WorldOS 场景制作矩阵

> [!IMPORTANT]
> 本文档是所有场景开发的第一入口。任何场景实现前，必须先对照本矩阵确认空间隐喻、动态层、内容层、入口 / 出口、降级和验收标准。

## 1. 目标

把 WorldOS 从“页面集合”推进为“场景系统”。每个场景必须让访问者知道自己进入了哪里、可以做什么、下一步去哪里，以及当前内容为什么属于这个世界。

## 2. 总原则

- 场景先服务内容，不用特效遮盖内容空洞。
- 静态形态必须可读，动态形态必须可感知。
- 每个场景必须有空间人格、核心动作、入口、出口和降级。
- 所有场景共享内容事实源，不创建第二套动态内容。
- 每个场景必须同时满足 desktop、mobile、reduced-motion。

## 3. 场景矩阵

| 场景 | 空间隐喻 | 核心动作 | 动态层 | 内容层 | 入口 | 出口 | 降级 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 世界入口 / 港口 | 进入世界、选择方向 | 首访展开、世界状态微动、入口聚焦 | 推荐路径、当前状态、精选节点 | `/` | Atlas、Paths、Timeline、Archive、Lighthouse | 静态入口列表 |
| Atlas | 星图 / 群岛地图 | 看见区域、节点、关系 | 节点呼吸、关系线、区域聚焦 | 区域、节点、关联理由 | Home、Node、Paths | Node、Paths、Home | 区域列表 + 关系清单 |
| Node | 地点 / 房间 | 阅读并继续探索 | 来源残影、关系提示、下一步浮层 | 正文、摘要、区域、关系、路径出口 | Atlas、Paths、Timeline、Archive | Atlas、Paths、Timeline | 标准文章详情 |
| Paths | 旅程系统 | 按路径前进 | 进度流、下一步、抵达提示 | 起点、节点序列、完成提示 | Home、Node、Atlas | Node、Timeline、Atlas | 链接清单 + 进度文本 |
| Timeline | 时间河 | 回看与定位 | 时间流、年份层级、事件聚焦 | 事件、节点、生命周期 | Home、Node、Paths | Node、Archive、Atlas | 时间列表 |
| Archive | 档案馆 / 记忆库 | 检索与沉淀 | 分区抽屉、密度视图、年代感 | 归档、标签、状态、可见性 | Home、Timeline、Node | Node、Timeline、Home | 归档列表 |
| Lighthouse | 观测站 / 只读向导 | 问路、解释、推荐 | 扫描光、状态信标、推荐卡流 | 公开事实源、路径推荐、边界说明 | Home、Node、Atlas | Paths、Node、Home | 静态 FAQ + 推荐路径 |

## 4. 每个场景必须交付

- `SceneHeader`：空间身份与当前位置。
- `SceneBody`：该场景的核心内容形态。
- `SceneMotionLayer`：可关闭、可降级的动态层。
- `SceneExitRail`：下一步、返回地图、继续阅读。
- `SceneFallback`：无 JS / reduced-motion / 低性能降级。
- `SceneEvidence`：desktop、mobile、reduced-motion 截图或检查记录。

## 5. 验收问题

每个场景结束时必须回答：

1. 第一眼是否能识别它不是普通博客页面？
2. 是否能清楚知道当前位置和下一步？
3. 关闭动态后是否仍然可读？
4. 是否使用同一份内容事实源？
5. 是否有入口、出口和回到世界中心的路径？
6. 是否符合性能与资产预算？

