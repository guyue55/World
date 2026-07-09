# WorldOS M9 四大核心场景舞台化执行计划

## 1. 目标

Atlas、Timeline、Archive、Paths 必须从“同一套页面模板”变成四个明显不同的空间。

## 2. 场景目标

| 场景 | 必须像什么 | 不能像什么 |
| --- | --- | --- |
| Atlas | 星图 / 群岛地图 | 分类卡片页 |
| Timeline | 时间河 | 普通事件列表 |
| Archive | 档案馆 / 记忆库 | 标签搜索页 |
| Paths | 旅程系统 | 链接清单 |

## 3. 执行项

### Atlas

- [ ] 建立地图视图优先的信息结构。
- [ ] 区域、节点、关系线应形成可扫视地图。
- [ ] 点击 / 聚焦区域时有明确当前位置和出口。
- [ ] mobile 提供静态区域地图替代。

### Timeline

- [ ] 建立时间河主视觉。
- [ ] 事件按时间漂移或分层，保留清晰列表 fallback。
- [ ] 时间事件必须能回到 Node / Archive / Atlas。

### Archive

- [ ] 建立档案馆分区：精选、最近、标签、生命周期。
- [ ] 用抽屉 / 卷宗 / 馆藏语义替换普通卡片堆叠。
- [ ] 检索仍保持高可用和中文优先。

### Paths

- [ ] 建立旅程地图：起点、路线、下一站、完成。
- [ ] 路径目录要像路线板，而不是列表。
- [ ] 每条路径有清晰入口、进度、完成后出口。

## 4. 验收标准

- [ ] 四个场景截图放在一起能一眼区分。
- [ ] 每个场景都有 SceneHeader / SceneBody / SceneMotionLayer / SceneExitRail / SceneFallback / SceneEvidence。
- [ ] `npm run check:atlas`、`check:timeline`、`check:content-archive`、`check:path-guidance` 通过。
- [ ] `npm run check:scene-qa` 通过。
- [ ] `npm run release:local-rc` 通过。

## 5. 边界

- 不新增每页独立数据模型。
- 不为动效牺牲搜索、阅读和移动端。
- 不引入重型图谱库，除非性能预算批准。

