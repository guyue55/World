# 古月浮屿｜系统设计文档

> 性质：System Design Document
> 范围：V1 静态核心版 + V2/V3 可扩展边界
> 目标：把世界观、产品需求、内容协议、页面和技术实现串成一套可运行系统。

---

## 1. 系统目标

古月浮屿系统要支撑一个“可生长的个人数字世界”。

V1 系统必须满足：

- 内容以 Node 为核心组织
- 区域 Area 定义世界结构
- Path 组织精选探索路径
- WorldEvent 记录世界生长
- Relation 建立节点关系
- Archive 提供现实检索视图
- Atlas 提供世界地图视图
- Timeline 提供时间河视图
- Ask 提供 AI 灯塔低光导览
- public/private 在数据模型上分离
- 无 AI 时完整可用

---

## 2. 系统边界

### 2.1 V1 系统边界

V1 是静态优先系统。

包括：

- 静态页面
- JSON 元数据
- Markdown / MDX 内容
- 本地搜索
- 公开内容构建
- 低光 AI 灯塔
- 基础规则检查
- 基础导出

不包括：

- 登录系统
- 数据库后台
- 复杂权限访问
- 在线编辑器
- 完整 AI RAG
- 多用户协作
- 私密内容在线展示

### 2.2 V2 边界

V2 加创世台和规则引擎：

- 收集箱
- 节点编辑
- 关系编辑
- 路径编辑
- 权限检查
- 快照导出
- 世界健康度

### 2.3 V3 边界

V3 加 AI：

- AI 摘要
- AI 标签
- AI 关系建议
- AI 问答
- AI 隐私检查
- AI 草案审核
- 语义搜索

---

## 3. 系统核心模块

```text
Content Layer
  ↓
World Protocol Layer
  ↓
Rule & Visibility Layer
  ↓
Projection Layer
  ↓
Presentation Layer
  ↓
Export / Search / AI Extension
```

### 3.1 Content Layer 内容层

来源：

- Markdown / MDX
- JSON metadata
- 图片 / 媒体
- 对话沉淀
- 项目文档
- 技术记录
- 生活记录

职责：

- 保存原始内容
- 不负责复杂呈现
- 不直接决定页面结构

### 3.2 World Protocol Layer 世界协议层

对象：

- Node
- Area
- Relation
- Path
- Permission
- WorldEvent
- Rule
- Snapshot

职责：

- 定义内容在世界中的位置
- 定义内容之间的关系
- 定义内容的可见性
- 定义内容生命周期
- 定义内容如何投影

### 3.3 Rule & Visibility Layer 规则与可见性层

职责：

- 过滤 public build
- 检查 private / vault 是否误入公开
- 检查 public 节点是否缺 summary
- 检查 AI 未审核内容是否公开
- 根据 tags / area / time 生成相关候选
- 根据生命周期生成待浇水、归档、复活提示

### 3.4 Projection Layer 投影层

将 Node 投影到：

- Home
- Atlas
- Timeline
- Archive
- Paths
- Ask
- RelatedNodes

核心原则：

```text
同一内容，多处显现；底层仍是一份。
```

### 3.5 Presentation Layer 表现层

页面：

- 首页
- 世界地图
- 节点详情
- 时间河
- 档案馆
- 精选路径
- AI 灯塔
- 关于
- 世界宪章

组件：

- WorldShell
- WorldMap
- NodeCard
- NodeDetail
- NodePassport
- TimeRiver
- ArchiveView
- PathViewer
- CompassNav

---

## 4. 数据流

### 4.1 内容进入流程

```text
原始输入
  ↓
收集箱 / 星尘港
  ↓
识别类型
  ↓
生成 Node
  ↓
设置 Area / Visibility / LifeStage
  ↓
建立 Relation
  ↓
生成 Projection
  ↓
进入页面和搜索
```

### 4.2 构建流程

```text
读取 data/*.json
  ↓
读取 content/**/*.mdx
  ↓
校验数据完整性
  ↓
执行可见性过滤
  ↓
生成公开节点集合
  ↓
生成路径、地图、时间河、档案索引
  ↓
构建静态页面
  ↓
生成搜索索引
```

### 4.3 公开构建数据流

```text
nodes.json
  ↓
filterPublicNodes()
  ↓
removePrivateFields()
  ↓
buildPublicPages()
  ↓
generateSearchIndex()
```

### 4.4 AI 数据流（未来）

```text
授权内容
  ↓
AI Adapter
  ↓
生成建议
  ↓
AI Draft
  ↓
人工审核
  ↓
写入正式字段
```

---

## 5. 系统组件关系

```text
WorldShell
├── CompassNav
├── StarField
├── WorldStatus
└── PageContent

HomePage
├── Hero
├── AreaOverview
├── FeaturedPaths
├── RecentWorldEvents
└── AboutPreview

AtlasPage
├── WorldMap
├── AreaCard
└── AreaDetailDrawer

NodePage
├── Breadcrumb
├── NodeHeader
├── NodeContent
├── NodePassport
└── RelatedNodes

TimelinePage
├── TimeRiver
└── WorldEventCard

ArchivePage
├── SearchBox
├── FilterPanel
└── ArchiveView

PathsPage
├── PathCard
└── PathViewer

AskPage
├── LighthouseStatus
├── PresetGuides
├── SearchEntry
└── FeaturedQuestions
```

---

## 6. 系统状态

WorldState：

```ts
type WorldState = {
  mode: 'alive' | 'quiet' | 'frozen' | 'repair' | 'archive'
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  dayPhase: 'dawn' | 'day' | 'dusk' | 'night'
  aiStatus: 'enabled' | 'low-light' | 'disabled'
  lastUpdated: string
}
```

状态说明：

- alive：正常生长
- quiet：低光
- frozen：冻结展示
- repair：维护中
- archive：历史快照

---

## 7. 无 AI 运行方案

系统必须在 AI 完全不可用时运行。

无 AI 提供：

- 世界地图
- 时间河
- 档案馆
- 本地搜索
- 精选路径
- 规则推荐
- 静态 README
- 低光灯塔

低光灯塔行为：

- 显示预设路径
- 显示本地搜索
- 显示常见问题
- 不显示失效聊天框

---

## 8. 权限隔离设计

### 8.1 V1

V1 只公开展示 public 内容和 semiPublic 摘要。

构建时过滤：

- private
- family
- partner
- vault
- sealed
- silent

### 8.2 物理隔离建议

V1 阶段可采用目录隔离：

```text
content/public/
content/private/
content/vault/
```

公开构建只读取：

```text
content/public/
data/public-*.json
```

### 8.3 构建守门

构建前执行：

- 检查 private 是否出现在 public nodes
- 检查 public 是否缺 summary
- 检查 public 是否引用 private media
- 检查 AI generated 且未 reviewed 是否 public
- 检查图片 EXIF 风险

---

## 9. 搜索设计

### 9.1 本地搜索

索引字段：

- title
- worldTitle
- summary
- tags
- area
- type
- public content

不索引：

- private
- family
- partner
- vault
- sealed
- silent

### 9.2 搜索结果

显示：

- 标题
- 摘要
- 类型
- 区域
- 标签
- 更新时间
- 生命周期

### 9.3 AI 搜索预留

未来可加入：

- embedding
- vector search
- semantic rerank
- source citation

但必须受 visibility 限制。

---

## 10. 日志与事件

所有重大变化生成 WorldEvent：

- 节点创建
- 节点更新
- 节点发布
- 节点归档
- 区域点亮
- 规则触发
- AI 建议采纳
- 快照生成

WorldEvent 同时用于：

- 时间河
- 最近发生
- 年度回顾
- 世界日志
- 导出记录

---

## 11. 快照与导出

### 11.1 快照触发

- 批量修改
- AI 批量建议应用
- 权限规则修改
- 世界地图修改
- 发布前
- 删除前

### 11.2 导出内容

- nodes
- areas
- relations
- paths
- events
- rules
- permissions
- media manifest
- markdown content

---

## 12. 系统设计验收

V1 系统必须通过：

- 静态构建成功
- public build 不含 private
- 所有 public node 有 summary
- 所有 path 引用 node 存在
- 所有 relation 引用 node 存在
- 所有 areaId 存在
- Ask 无 AI 时可用
- Archive 搜索可用
- 移动端可用
- 页面能返回地图

---

## 13. 系统设计最终原则

```text
世界是协议生成的，不是页面硬堆出来的。
```

```text
内容只维护一份，
通过投影出现在地图、时间河、档案馆、路径和首页。
```

```text
AI 可以增强系统，
但系统不能依赖 AI 才能存在。
```
