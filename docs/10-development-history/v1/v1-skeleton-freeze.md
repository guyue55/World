# 古月浮屿｜V1 骨架冻结清单

> 阶段：V1｜公开世界核心版  
> 性质：开工前冻结文件  
> 目标：冻结第一阶段到底建什么、不建什么，确保“世界骨架”坚固、清晰、可扩展，但不被远期想法拉散。  
> 核心提醒：**第一阶段不是完整宇宙，而是第一座可以居住、可以回来的核心城。**

---

## 1. V1 总目标

V1 的目标不是做一个普通博客首页，也不是一次性实现所有宏大设想。

V1 的目标是打造古月浮屿的世界骨架内核：

```text
内容可以进入
节点可以存在
区域可以容纳
关系可以连接
路径可以引导
时间可以记录
权限可以守门
AI 可以低光
未来可以扩展
```

它必须同时满足：

- 看起来不像普通博客
- 使用起来不会迷路
- 没有 AI 也能运行
- 有真实内容，不是空壳
- public / private 在模型上分离
- 后续 V2/V3/V4 可以自然接上

---

## 2. V1 核心精神

### 2.1 坚固

坚固来自：

- 稳定的数据模型
- 清晰的区域结构
- 明确的权限边界
- 可验证的构建规则
- 统一的节点协议
- 可复用的组件系统

### 2.2 不死板

不死板来自：

- 节点可以多投影
- 区域可以扩展
- 生命周期可以演化
- 路径可以重组
- AI 可以插拔
- 内容可以从种子生长
- 私密深层可以后续接入

### 2.3 不忘初心

```text
古月浮屿不是传统博客，
而是一个正在生长的个人数字世界。
```

```text
AI 是灯塔，不是太阳。
```

```text
公开层不是完整世界。
```

```text
世界为生活服务，不让生活服务世界。
```

---

## 3. V1 必做页面

### P0 页面

| 页面 | 路由 | 目标 |
|---|---|---|
| 首页 / 世界入口 | `/` | 让访客立刻感到这里不是普通博客 |
| 世界地图 | `/atlas` | 展示主区域和世界结构 |
| 节点详情 | `/node/[slug]` | 展示所有内容节点 |
| 档案馆 | `/archive` | 现实检索视图，反迷路保险 |
| 世界宪章 | `/manifesto` | 说明世界法则和初衷 |
| 关于古月 | `/about` | 解释世界主人和方向 |

### P1 页面

| 页面 | 路由 | 目标 |
|---|---|---|
| 时间河 | `/timeline` | 记录世界事件与节点成长 |
| 精选路径 | `/paths` | 让访客按路线探索 |
| AI 灯塔低光 | `/ask` | 无 AI 时仍提供导览 |

---

## 4. V1 必做数据

### 4.1 data 文件

```text
data/
  areas.json
  nodes.json
  relations.json
  paths.json
  world-events.json
  world-state.json
  rules.json
  permissions.json
```

### 4.2 content 文件夹

```text
content/
  manifesto/
  articles/
  projects/
  fragments/
  memory/
```

### 4.3 必做数据对象

- Node
- Area
- Relation
- Path
- WorldEvent
- WorldState
- Visibility
- LifeStage
- AI metadata

---

## 5. V1 必做组件

### 5.1 world

- WorldShell
- StarField
- CompassNav
- WorldStatus
- WorldMap
- AreaCard

### 5.2 node

- NodeCard
- NodeHeader
- NodeDetail
- NodePassport
- RelatedNodes

### 5.3 archive

- ArchiveView
- SearchBox
- FilterPanel

### 5.4 timeline

- TimeRiver
- WorldEventCard

### 5.5 paths

- PathCard
- PathViewer

### 5.6 ask

- LighthouseStatus
- PresetGuides
- FeaturedQuestions

---

## 6. V1 必做内容

V1 不允许是空壳。至少准备 20～25 个真实节点。

### 世界类节点

- 世界宣言
- 世界宪章
- 古月浮屿 V1 蓝图
- 世界设计公理
- 无 AI 自然演化原则
- AI 灯塔边界
- 仪式感交互规范
- 公开层不是完整世界

### 技术类节点

- 飞书 MCP 接入 ADK Agent
- Google ADK 与 Skills 机制
- CLI 工具接入 Agent
- Docker 空间回收排查
- Codex CLI / Cursor CLI 探索
- Kafka / EMQX / Telegraf 技术旧记录

### 产品类节点

- 静态 AI 小说编辑器
- 个人数字世界引擎
- 月帧阁 / MoonFrame
- 技术博客套图 / SVG 生成工具

### 灵感类节点

- 万物皆节点
- 入口清澈，深处浩瀚
- 世界不依赖 AI 才能存在
- 一张书桌连接星河

### 生活类节点

- 一个公开或半公开生活片刻
- 一个未来计划
- 一个关于家的抽象片刻

---

## 7. V1 必做规则

V1 只做最小规则集：

1. fragment 默认 `seed`
2. memory 默认 `private`
3. public 节点必须有 `summary`
4. 同标签节点成为相关候选
5. 30 天未更新的 seed 进入待浇水候选
6. AI generated 且未 reviewed 不可 public
7. private / vault 不进入 public build

---

## 8. V1 必做体验

### 8.1 首页体验

- 不是文章列表
- 首屏有世界宣言
- 主动作不超过 5 个
- 有进入地图、时间河、灯塔的入口
- 有精选路径

### 8.2 地图体验

- 初始只显示主区域
- 每个区域都有世界名和现实名
- 不显示复杂关系网
- 移动端改为卡片视图

### 8.3 阅读体验

- 正文清晰
- 动效降低
- 有节点护照
- 有返回地图
- 相关节点不干扰

### 8.4 搜索体验

- 档案馆可搜索
- 可按类型、区域、标签筛选
- 不依赖 AI

### 8.5 AI 低光体验

无 AI 时显示：

```text
灯塔当前处于低光模式。
我不能实时对话，但已经为你准备了几条路径。
```

---

## 9. V1 不做清单

V1 明确不做：

- 完整 3D 宇宙
- 完整 AI RAG
- 完整后台 / 创世台
- 多用户权限
- 完整爱的小屋
- 完整孩子年轮
- 完整家庭灯火
- 完整历史剧场
- 声音系统
- 社交评论
- 年度世界册
- 复杂展览系统
- 私密在线访问系统

这些不是否定，而是后续阶段：

- V2：创世台与规则引擎
- V3：AI 灯塔增强
- V4：私密深层与记忆系统
- V5：回望、展览与传承
- V6：高级世界体验

---

## 10. V1 成功标准

V1 成功不是功能多，而是骨架成立。

必须通过：

- 打开首页不像普通博客
- 用户 10 秒内知道这里是什么
- 有明确进入路径
- 世界地图清楚
- 任意节点可返回地图
- 阅读页清晰专业
- 没有 AI 时仍可探索
- 档案馆能快速找内容
- 内容有区域、时间、状态、权限
- 移动端可用
- public/private 在模型上分离
- 有第一批真实内容
- README 能解释项目理念

---

## 11. V1 冻结结论

```text
V1 是世界骨架，不是完整世界。
```

```text
V1 要让古月浮屿站起来，
让内容能安放，
让路径能行走，
让时间能流动，
让未来有地方继续生长。
```
