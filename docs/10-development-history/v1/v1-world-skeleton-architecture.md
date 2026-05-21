# 古月浮屿｜V1 世界骨架架构

> 阶段：V1  
> 性质：世界骨架与系统架构图文档  
> 目标：定义第一阶段“世界/宇宙骨架”如何由数据、协议、规则和页面共同支撑。

---

## 1. 骨架总览

古月浮屿的世界骨架不是页面集合，而是一套协议驱动的系统。

核心结构：

```text
World
  ├── Area
  ├── Node
  ├── Relation
  ├── Path
  ├── WorldEvent
  ├── Projection
  ├── Permission
  └── Rule
```

展开后：

```text
World 世界
  ├── Areas 区域：世界的空间骨架
  ├── Nodes 节点：内容的基本生命单位
  ├── Relations 关系：节点之间的星线
  ├── Paths 路径：引导访客行走
  ├── WorldEvents 世界事件：记录时间河
  ├── Projections 投影：同一节点在不同视图显现
  ├── Permissions 权限：决定谁能看见
  └── Rules 规则：无 AI 时维持自然演化
```

---

## 2. 世界骨架为什么重要

如果直接做页面，会变成：

```text
首页
文章页
分类页
关于页
```

这仍然是普通博客。

古月浮屿必须是：

```text
世界协议
  ↓
节点系统
  ↓
投影系统
  ↓
页面呈现
```

也就是说，页面不是源头，世界协议才是源头。

---

## 3. 内容流动架构

### 3.1 标准流

```text
原始内容
  ↓
Node 节点化
  ↓
Area 安放
  ↓
Permission 设权
  ↓
Relation 建联
  ↓
Path 组织
  ↓
WorldEvent 记录
  ↓
Projection 投影
  ↓
页面展示
```

### 3.2 具体例子

以“飞书 MCP 接入 ADK Agent”为例：

```text
原始内容：一次技术探索记录

Node：
  title = 飞书 MCP 接入 ADK Agent
  type = article
  areaId = tech
  visibility = public
  lifeStage = growing

Projection：
  首页：最近点亮
  技术星域：一颗技术星
  档案馆：技术卷宗
  时间河：一次世界事件
  路径：技术与 AI 探索路径的一步
  节点页：完整正文
```

---

## 4. 投影架构

核心原则：

```text
一个 Node，多处显现。
```

### 4.1 投影目标

Node 可以投影到：

- 首页
- 世界地图
- 时间河
- 档案馆
- 精选路径
- 节点详情页
- 相关节点
- AI 灯塔低光导览

### 4.2 投影示意

```text
Node
 ├── HomeProjection
 ├── AtlasProjection
 ├── TimelineProjection
 ├── ArchiveProjection
 ├── PathProjection
 └── DetailProjection
```

### 4.3 投影规则

- 不复制原始内容
- 投影可改变展示方式
- 投影不能改变原始 Node
- 私密 Node 不生成 public projection
- semiPublic 只生成摘要 projection

---

## 5. 区域骨架

V1 主区域：

```text
origin       创世原点
tech         技术星域
workshop     产品工坊
fragments    灵感云层
memory       记忆湖
timeline     时间河
archive      档案馆
lighthouse   AI 灯塔
```

### 5.1 区域关系

```text
创世原点
  ├── 世界宣言
  ├── 世界宪章
  └── 关于古月

技术星域
  ├── AI Agent
  ├── CLI 工具
  └── 工程实践

产品工坊
  ├── 工具
  ├── 产品原型
  └── 失败项目

灵感云层
  ├── 种子
  └── 草案

记忆湖
  ├── 生活片刻
  └── 旅行光影

时间河
  ├── 世界事件
  └── 节点成长史

档案馆
  ├── 搜索
  └── 现实视图

AI 灯塔
  ├── 低光导览
  └── 未来 AI 增强
```

---

## 6. 页面骨架

### 6.1 首页

首页读取：

- areas
- featured paths
- recent world events
- representative nodes
- world state

输出：

- 世界宣言
- 主区域
- 精选路径
- 最近发生
- 关于古月入口
- 世界宪章入口

### 6.2 Atlas

Atlas 读取：

- active areas
- selected nodes by area
- area descriptions
- world state

输出：

- 主区域地图
- 区域卡片
- 区域说明
- 进入区域入口

### 6.3 Node Detail

Node 页面读取：

- node by slug
- content by contentPath
- area
- relations
- paths containing node
- related nodes

输出：

- 节点正文
- 节点护照
- 相关节点
- 所属路径
- 返回地图

### 6.4 Timeline

Timeline 读取：

- world-events
- related nodes
- related areas

输出：

- 时间河事件流
- 节点成长记录
- 世界变化

### 6.5 Archive

Archive 读取：

- public nodes
- areas
- tags
- types

输出：

- 搜索
- 筛选
- 列表 / 卡片
- 现实视图

### 6.6 Paths

Paths 读取：

- paths
- nodes by slug

输出：

- 路径卡片
- 路径详情
- 节点顺序
- 下一步

### 6.7 Ask Low Light

Ask 读取：

- featured paths
- public search index
- preset guides

输出：

- 低光状态
- 预设问题
- 路径入口
- 本地搜索入口

---

## 7. 权限骨架

V1 必须从模型上保留权限层：

```text
public
semiPublic
private
family
partner
vault
sealed
silent
```

但 V1 只实现：

- public 展示
- semiPublic 摘要
- private 不进入 public build
- vault 不进入 public build
- AI 低光不读取私密内容

### 7.1 Public Build

```text
nodes
  ↓
filter visibility
  ↓
public / semiPublic summaries
  ↓
pages + search index
```

### 7.2 禁止

```text
不要把 private JSON 打包进前端后用 UI 隐藏。
```

---

## 8. 无 AI 骨架

无 AI 时依然可运行：

```text
areas.json → 地图
nodes.json → 节点页 / 档案馆
paths.json → 精选路径
world-events.json → 时间河
local search → 搜索
rules.json → 基础建议
```

AI 灯塔低光模式：

```text
预设导览 + 本地搜索 + 精选路径
```

---

## 9. 规则骨架

V1 最小规则：

```text
fragment 默认 seed
memory 默认 private
public 节点必须有 summary
同标签成为相关候选
30 天未更新 seed 进入待浇水候选
AI 未审核不可 public
private / vault 不进入 public build
```

规则先以脚本或函数存在，不必做完整规则引擎。

---

## 10. 组件骨架

```text
WorldShell
├── StarField
├── CompassNav
└── WorldStatus

Home
├── Hero
├── AreaOverview
├── FeaturedPaths
└── RecentWorldEvents

Atlas
├── WorldMap
├── AreaCard
└── AreaDetail

Node
├── NodeHeader
├── NodeContent
├── NodePassport
└── RelatedNodes

Archive
├── SearchBox
├── FilterPanel
└── ArchiveView

Timeline
└── WorldEventCard

Paths
├── PathCard
└── PathViewer

Ask
├── LighthouseStatus
└── PresetGuides
```

---

## 11. 骨架验收

V1 骨架成立的标准：

- 新增一个 Node 后能出现在档案馆
- 指定 areaId 后能出现在地图区域
- 加入 path 后能出现在路径中
- 创建 worldEvent 后能出现在时间河
- 设置 public 后能进入公开搜索
- 设置 private 后不会进入公开构建
- 没有 AI 时 Ask 仍可用
- 每个节点都有返回地图路径

---

## 12. 骨架最终原则

```text
页面只是世界的投影。
数据才是世界的骨架。
规则让世界不散。
权限让世界有边界。
路径让旅人不迷路。
时间河让世界有历史。
```
