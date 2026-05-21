# 古月浮屿｜V1 实施蓝图

> 性质：第一版落地计划 / 开发蓝图 / 验收标准  
> 目标：把“个人数字世界”从设想变成第一座可运行的核心城。

---

## 1. V1 总目标

V1 的目标不是做完整宇宙，而是证明：

```text
它不是普通博客。
它有世界骨架。
它能安放真实内容。
它没有 AI 也能运行。
它未来可以自然生长。
```

V1 成功的标志：

```text
第一批节点被安放。
第一张地图被点亮。
第一条时间河开始流动。
第一个访客不会迷路。
你自己愿意每天回来记录一粒光。
```

---

## 2. V1 做什么

V1 必做：

- 世界入口首页
- 世界地图 Atlas
- 节点系统 Node
- 节点详情页
- 时间河 Timeline
- 档案馆 Archive
- 精选路径 Paths
- AI 灯塔低光模式 Ask
- 关于古月 About
- 世界宪章 Manifesto
- 基础本地搜索
- 基础权限字段
- 基础生命周期字段
- 第一批真实内容
- README

---

## 3. V1 不做什么

V1 不做：

- 完整 3D 宇宙
- 复杂多用户权限
- 完整家庭系统
- 完整孩子年轮
- 完整爱的小屋
- 全量 AI RAG
- 声音系统
- 历史剧场正式版
- 复杂社交系统
- 大而全后台
- 完整数据库
- 自动导出年册
- 高级时间胶囊投递

---

## 4. V1 页面结构

```text
/
首页 / 世界入口

/atlas
世界地图

/timeline
时间河

/archive
档案馆

/paths
精选路径

/ask
AI 灯塔低光模式

/about
关于古月

/manifesto
世界宪章

/node/[slug]
节点详情页
```

---

## 5. 首页结构

### 第一屏

元素：

- 创世书桌
- 星河背景
- 世界宣言
- 主按钮

文案：

```text
一张书桌连接星河。

这里不是一个完成的网站，
而是一个正在生长的个人数字世界。

我把技术、产品、灵感、生活与记忆，
一点点安放在这里，
让它们在时间中自然生长。
```

按钮：

- 进入世界
- 打开地图
- 沿时间河
- 点亮灯塔

### 第二屏：这里是什么

说明：

```text
古月浮屿不是传统博客，也不是单纯作品集。
它是一个个人数字世界：
技术文章在这里成为星辰，
项目想法在工坊中被打磨，
生活照片沉入记忆湖，
灵感先以种子的方式存在，
AI 像灯塔一样照亮路径，
而时间河记录这一切如何生长。
```

### 第三屏：主区域

显示：

- 技术星域
- 产品工坊
- 灵感云层
- 记忆湖
- 时间河
- 档案馆
- AI 灯塔

### 第四屏：精选路径

- 第一次来到古月浮屿
- 技术与 AI 探索路径
- 这个世界如何被创造

### 第五屏：最近发生

展示世界事件，而不是最新文章。

### 第六屏：关于古月

简介、关注方向、代表路径。

### 第七屏：世界宪章入口

---

## 6. Atlas 世界地图

V1 地图第一层：

- 创世原点
- 时间河
- 技术星域
- 产品工坊
- 灵感云层
- 记忆湖
- 档案馆
- AI 灯塔

每个区域显示：

- 世界名
- 现实名
- 一句话说明
- 状态
- 入口按钮

不要展示全部节点。

---

## 7. 节点详情页

节点页必须包含：

- 当前位置
- 现实标题
- 世界标题
- 类型
- 所属区域
- 生命周期
- 可见性
- 创建时间
- 更新时间
- 摘要
- 正文
- 相关节点
- 所在路径
- 节点护照
- 返回地图
- 切换档案视图

---

## 8. 时间河

V1 时间河展示：

- 世界事件
- 节点创建
- 节点更新
- 世界法则形成
- 区域点亮
- 第一批真实内容安放

事件示例：

```json
{
  "id": "event-001",
  "type": "world-concept-formed",
  "title": "古月浮屿的世界观开始形成",
  "date": "2026-05-19",
  "description": "从传统博客的想法，转向一个可生长的个人数字世界。",
  "areaIds": ["origin"]
}
```

---

## 9. 档案馆

V1 档案馆提供：

- 搜索
- 类型筛选
- 区域筛选
- 标签筛选
- 时间排序
- 卡片视图
- 列表视图

这是反迷路保险。

---

## 10. AI 灯塔低光模式

V1 不要求接 AI。

低光模式：

```text
灯塔当前处于低光模式。

我不能实时对话，
但已经为你准备了几条路径。
```

提供：

- 第一次来到这里
- 看技术与 AI
- 看产品和项目
- 了解这个世界如何被创造
- 搜索公开内容
- 随机漂流

---

## 11. V1 数据结构

### 11.1 nodes.json

字段：

- id
- slug
- title
- worldTitle
- type
- areaId
- summary
- contentPath
- cover
- tags
- visibility
- lifeStage
- source
- layer
- ai
- createdAt
- updatedAt

### 11.2 areas.json

字段：

- id
- worldName
- realName
- description
- level
- status
- defaultVisibility

### 11.3 paths.json

字段：

- id
- title
- description
- audience
- nodeSlugs

### 11.4 relations.json

字段：

- from
- to
- type
- strength
- note

### 11.5 world-events.json

字段：

- id
- type
- title
- date
- description
- nodeIds
- areaIds

---

## 12. V1 第一批区域

```json
[
  {
    "id": "origin",
    "worldName": "创世原点",
    "realName": "世界入口与核心说明",
    "description": "一切从这里开始。这里解释古月浮屿是什么，以及如何进入这个世界。",
    "level": 1,
    "status": "active",
    "defaultVisibility": "public"
  },
  {
    "id": "tech",
    "worldName": "技术星域",
    "realName": "技术文章与工程实践",
    "description": "工程实践、AI Agent、CLI 工具、系统排查与技术复盘。",
    "level": 1,
    "status": "active",
    "defaultVisibility": "public"
  },
  {
    "id": "workshop",
    "worldName": "产品工坊",
    "realName": "项目、工具与产品实验",
    "description": "想法在这里被拆解、打磨、装配，变成工具、产品或实验。",
    "level": 1,
    "status": "active",
    "defaultVisibility": "public"
  },
  {
    "id": "fragments",
    "worldName": "灵感云层",
    "realName": "碎片想法与未来可能性",
    "description": "尚未成形的想法先在这里漂浮，等待发芽或归位。",
    "level": 1,
    "status": "active",
    "defaultVisibility": "private"
  },
  {
    "id": "memory",
    "worldName": "记忆湖",
    "realName": "生活照片与日常记忆",
    "description": "生活中的光影沉入这里，随时间泛起涟漪。",
    "level": 1,
    "status": "quiet",
    "defaultVisibility": "private"
  },
  {
    "id": "timeline",
    "worldName": "时间河",
    "realName": "时间线与世界生长记录",
    "description": "记录节点、区域、法则与世界自身如何在时间中生长。",
    "level": 1,
    "status": "active",
    "defaultVisibility": "public"
  },
  {
    "id": "archive",
    "worldName": "档案馆",
    "realName": "文章、文档与归档内容",
    "description": "沉淀的内容在这里被清晰保存、搜索和查找。",
    "level": 1,
    "status": "active",
    "defaultVisibility": "public"
  },
  {
    "id": "lighthouse",
    "worldName": "AI 灯塔",
    "realName": "搜索、导览与 AI 辅助",
    "description": "灯塔照亮路径，但不替造物主选择道路。无 AI 时以低光模式运行。",
    "level": 1,
    "status": "active",
    "defaultVisibility": "public"
  }
]
```

---

## 13. V1 第一批内容

### 13.1 世界类

- 世界宣言
- 世界宪章
- 古月浮屿 V1 蓝图
- 世界设计公理
- 无 AI 自然演化原则
- AI 灯塔边界
- 仪式感交互规范

### 13.2 技术类

- 飞书 MCP 接入 ADK Agent
- Google ADK 与 Skills 机制
- CLI 工具接入 Agent
- Docker 空间回收排查
- Codex CLI / Cursor CLI 探索
- Kafka / EMQX / Telegraf 等旧技术记录

### 13.3 产品 / 工具类

- 静态 AI 小说编辑器
- 个人数字世界引擎
- AI 创作平台设想
- 月帧阁 / MoonFrame
- 技术博客套图 / SVG 生成工具

### 13.4 灵感类

- 世界不依赖 AI 才能存在
- 万物皆节点
- 入口清澈，深处浩瀚
- 公开层不是完整世界
- AI 是灯塔，不是太阳
- 一张书桌连接星河

### 13.5 生活类

- 一张生活照片
- 一次旅行片段
- 一个日常瞬间
- 一个未来计划
- 一个关于家的抽象片刻

---

## 14. V1 技术栈

推荐：

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- MDX
- JSON 数据
- Fuse.js / Pagefind 本地搜索
- 静态部署

---

## 15. V1 项目结构

```text
guyue-floating-world/
  src/
    app/
      page.tsx
      atlas/page.tsx
      timeline/page.tsx
      archive/page.tsx
      paths/page.tsx
      ask/page.tsx
      about/page.tsx
      manifesto/page.tsx
      node/[slug]/page.tsx

    components/
      world/
        WorldShell.tsx
        StarField.tsx
        CompassNav.tsx
        WorldMap.tsx
        WorldStatus.tsx

      node/
        NodeCard.tsx
        NodeDetail.tsx
        NodePassport.tsx
        RelatedNodes.tsx

      timeline/
        TimeRiver.tsx
        WorldEventCard.tsx

      archive/
        ArchiveView.tsx
        SearchBox.tsx
        FilterPanel.tsx

      paths/
        PathCard.tsx
        PathViewer.tsx

    lib/
      content.ts
      nodes.ts
      areas.ts
      relations.ts
      paths.ts
      search.ts
      visibility.ts
      world-state.ts

  content/
    manifesto/
    articles/
    projects/
    fragments/
    memory/

  data/
    nodes.json
    areas.json
    relations.json
    paths.json
    world-events.json
    world-state.json
```

---

## 16. V1 组件清单

核心组件：

- WorldShell
- StarField
- CompassNav
- WorldMap
- WorldStatus
- NodeCard
- NodeDetail
- NodePassport
- RelatedNodes
- TimeRiver
- WorldEventCard
- ArchiveView
- SearchBox
- FilterPanel
- PathCard
- PathViewer

---

## 17. V1 基础规则

V1 先做 5 条：

1. fragment 默认是 seed
2. memory 默认 private
3. public 节点必须有 summary
4. 同标签节点自动成为相关候选
5. 30 天未更新的 seed 进入待浇水

后续再加：

- 项目 90 天未更新提示归档
- 技术文 180 天未更新提示检查版本
- 家庭 / 孩子 / 住宅默认 vault
- AI 生成内容进入审核队列
- 同标签 5 个节点形成星座候选

---

## 18. V1 动效范围

只做轻动效：

- 背景星尘轻微漂浮
- 首页纸页轻浮
- 地图区域轻微展开
- 节点打开时纸页展开
- 时间河轻微流动
- 按钮微光反馈

不做：

- 强制开场动画
- 复杂飞行动效
- 大规模粒子
- 重型 Three.js
- 自动播放声音

---

## 19. V1 移动端要求

移动端重点：

- 能读
- 能找
- 能返回
- 能快速记录
- 动效降级
- 地图简化
- 底部罗盘导航

---

## 20. V1 验收清单

验收 10 问：

1. 打开首页，是否不像普通博客？
2. 用户是否 10 秒内知道这里是什么？
3. 是否有明确的进入路径？
4. 世界地图是否清楚，而不是复杂？
5. 任意节点是否能回到地图？
6. 阅读页是否清晰专业？
7. 没有 AI 时是否仍然可探索？
8. 档案视图是否能快速找内容？
9. 内容是否有区域、时间、状态、权限？
10. 移动端是否可用？

扩展验收：

- 公开与私密在模型上已分离
- 内容可以从种子继续生长
- 世界可以导出
- 空状态不是“暂无内容”
- 错误状态符合世界语言
- README 解释清楚项目理念

---

## 21. 四周推进计划

### 第一周：数据和文案

- 确定名称：古月浮屿
- 写首页第一屏文案
- 写世界宪章 v0.1
- 写 areas.json
- 写 nodes.json 前 20 个节点
- 写 paths.json 三条路径
- 写 world-events.json 第一批事件
- 画一张极简世界地图草图

### 第二周：核心页面

- 首页
- Atlas 世界地图
- Node 节点详情
- Manifesto
- About

### 第三周：核心闭环

- 时间河
- 档案馆
- 精选路径
- 基础搜索
- 低光 AI 灯塔

### 第四周：打磨验收

- 补真实内容
- 移动端适配
- 空状态
- 错误状态
- README
- V1 验收
- 静态部署

---

## 22. V1 最终判断

V1 不是为了完整，而是为了点亮第一束光。

```text
先把第一座城建起来。
不要在脑中无限扩建整个宇宙。
```

V1 成功后，再扩展：

- 创世台
- 规则引擎
- AI 增强
- 私密深层
- 爱的小屋
- 年轮树
- 历史剧场
- 时间胶囊
- 年度册
