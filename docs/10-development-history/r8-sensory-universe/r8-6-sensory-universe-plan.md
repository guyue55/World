# R8.6｜真实宇宙感官与空间完成线

## 定位

R8.6 不继续扩展概念，而是把已经存在的“动态宇宙”继续落实为更接近真实世界的前端体验：每个页面都应有可感知的地点、天气、近景器物、中景功能、远景未知、动作仪式、复访回声和 reduced-motion 降级。

## 任务规划

### 阶段 1：感官世界协议

- 新增 `data/r8-sensory-universe/sensory-scenes.json`。
- 为首页、Atlas、时间河、档案馆、路径、灯塔、节点、创世台建立场景数据。
- 每个场景必须包含 near / middle / far 三景深。
- 每个场景必须包含 weather / ritual / soundHint / next。

### 阶段 2：全站感官运行层

- 新增 `SensoryUniverseEngine`。
- 新增 `CosmicWeatherLayer`。
- 新增 `SpatialJourneyMap`。
- 接入 `WorldShell`，保持 route-aware。

### 阶段 3：核心页面逐个动态化

- 首页、Atlas、时间河、档案馆、路径、灯塔、节点页接入 `SensoryUniverseSection`。
- R4 / R6 / R7 / R8 等深层页面继续接入感官说明层。
- 页面不只说明“这里是什么”，还要说明“我抵达了哪里”。

### 阶段 4：边界与验收

- 新增静态安全 API `/api/r8/sensory-universe`。
- 新增检查脚本。
- 通过 lint / typecheck / routes / R8 既有门禁。
- 继续使用 ASCII 英文文件名打包，避免中文文件名乱码。

## 验收标准

- 不是只加背景动画。
- 每个核心页面都有地点感。
- 每个核心页面都有三景深。
- 每个核心页面都有下一步路径。
- 动效可降级。
- 无数据库、无真实 AI 时仍可运行。
