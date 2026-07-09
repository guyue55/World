# WorldOS M15 内容世界生产执行计划

## 1. 目标

让世界不再空。内容节点必须具备区域、摘要、关系、生命周期、路径、时间锚点和推荐理由，并能被 Atlas、Timeline、Archive、Paths、Node、Lighthouse 共享吸收。

## 2. 执行项

| 项 | 操作 | 验收 |
| --- | --- | --- |
| 内容事实补齐 | 为公开节点补标题、摘要、区域、生命周期、时间锚点 | 无核心节点缺摘要或区域 |
| 关系理由 | 为节点关系补“为什么相关” | Atlas 和 Node 能展示关系语义 |
| 路径入口 | 每条核心路径有起点、下一步、完成判断 | Paths 不再像链接清单 |
| 时间锚点 | 节点可进入 Timeline | 时间河不是孤立列表 |
| 档案分区 | 节点可进入 Archive 分区 | 档案馆有密度和检索感 |
| 精选准入 | 无摘要、无关系、无区域的内容不得进入精选 | 首页和 Atlas 不展示空节点 |
| AI 摘要 | 为公开内容准备 AI 可读摘要，不包含私密信息 | Lighthouse 可引用公开事实 |

## 3. 内容批次建议

1. 第一批：补 20 到 30 个真实公开节点。
2. 每个一级区域至少 3 个代表节点。
3. 每条核心路径至少 5 个正文节点。
4. 每个节点至少 2 条明确关系。
5. 每个节点至少 1 个下一步出口。

## 4. 检查命令

- `npm run check:content-life`
- `npm run check:content`
- `npm run check:worldos-content-density`
- `npm run check:content-jaccard`
- `npm run check:node-reading`
- `npm run check:atlas`
- `npm run check:mainline`
- `npm run release:local-rc`

## 5. 人工验收

- 访问者不懂项目背景，也能从首页进入一条路径读下去。
- 地图、时间河、档案馆和路径不是四套假数据。
- 节点像世界地点，正文仍舒适可读。
- 灯塔引用内容时能展示来源和限制。

## 6. 边界

- 不为动态场景建立第二套内容源。
- 不把私密、vault、sealed 内容混入公开事实。
- 不用空关系、假路径、临时文案凑数。
