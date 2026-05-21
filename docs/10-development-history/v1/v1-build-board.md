# 古月浮屿｜V1 第一阶段任务看板

> 阶段：V1  
> 性质：开发任务看板  
> 目标：将第一阶段拆成可执行任务，确保从“文档世界”进入“可运行世界”。

---

## 1. 看板原则

```text
先数据，后页面。
先静态，后交互。
先可用，后动效。
先公开世界，后私密深层。
先低光灯塔，后完整 AI。
```

---

## 2. P0｜骨架必须完成

### 2.1 项目初始化

- [ ] 初始化 Next.js + TypeScript + Tailwind
- [ ] 配置 ESLint / Prettier
- [ ] 创建 src/app
- [ ] 创建 src/components
- [ ] 创建 src/lib
- [ ] 创建 data
- [ ] 创建 content
- [ ] 创建 docs

### 2.2 文档归档

- [ ] 整理 docs/00-overview
- [ ] 整理 docs/01-world
- [ ] 整理 docs/02-product
- [ ] 整理 docs/03-design
- [ ] 整理 docs/04-content
- [ ] 整理 docs/05-engineering
- [ ] 整理 docs/06-privacy-ai
- [ ] 整理 docs/07-roadmap
- [ ] 整理 docs/08-future

### 2.3 数据协议

- [ ] 创建 `src/lib/types.ts`
- [ ] 创建 `data/areas.json`
- [ ] 创建 `data/nodes.json`
- [ ] 创建 `data/relations.json`
- [ ] 创建 `data/paths.json`
- [ ] 创建 `data/world-events.json`
- [ ] 创建 `data/world-state.json`
- [ ] 创建 `data/rules.json`
- [ ] 创建 `data/permissions.json`

### 2.4 数据读取函数

- [ ] `getAllNodes()`
- [ ] `getPublicNodes()`
- [ ] `getNodeBySlug(slug)`
- [ ] `getNodesByArea(areaId)`
- [ ] `getRelatedNodes(nodeId)`
- [ ] `getAllAreas()`
- [ ] `getAllPaths()`
- [ ] `getAllWorldEvents()`
- [ ] `filterPublicNodes(nodes)`

### 2.5 世界外壳

- [ ] `WorldShell`
- [ ] `StarField`
- [ ] `CompassNav`
- [ ] `WorldStatus`

### 2.6 首页

- [ ] Hero
- [ ] 世界说明
- [ ] 主区域概览
- [ ] 精选路径
- [ ] 最近发生
- [ ] About Preview
- [ ] Manifesto CTA

### 2.7 世界地图

- [ ] `/atlas`
- [ ] `WorldMap`
- [ ] `AreaCard`
- [ ] `AreaDetail`
- [ ] 移动端卡片降级

### 2.8 节点详情

- [ ] `/node/[slug]`
- [ ] `NodeHeader`
- [ ] `NodeContent`
- [ ] `NodePassport`
- [ ] `RelatedNodes`
- [ ] Breadcrumb

### 2.9 档案馆

- [ ] `/archive`
- [ ] `SearchBox`
- [ ] `FilterPanel`
- [ ] `ArchiveView`
- [ ] 标题搜索
- [ ] 标签筛选
- [ ] 区域筛选
- [ ] 类型筛选

### 2.10 安全过滤

- [ ] public build 只读取 public / semiPublic
- [ ] private 不进入 public
- [ ] vault 不进入 search index
- [ ] public node 必须有 summary
- [ ] AI generated 未 reviewed 不可 public

---

## 3. P1｜体验必须完成

### 3.1 时间河

- [ ] `/timeline`
- [ ] `TimeRiver`
- [ ] `WorldEventCard`
- [ ] 按日期排序
- [ ] 关联节点和区域

### 3.2 精选路径

- [ ] `/paths`
- [ ] `PathCard`
- [ ] `PathViewer`
- [ ] 三条 V1 路径
- [ ] 路径结束下一步

### 3.3 AI 灯塔低光

- [ ] `/ask`
- [ ] `LighthouseStatus`
- [ ] `PresetGuides`
- [ ] 低光文案
- [ ] 本地搜索入口

### 3.4 关于与宪章

- [ ] `/about`
- [ ] `/manifesto`
- [ ] 返回地图
- [ ] 返回首页

### 3.5 移动端

- [ ] 首页移动端
- [ ] 地图移动端
- [ ] 节点页移动端
- [ ] 档案馆移动端
- [ ] 时间河移动端
- [ ] Ask 移动端

### 3.6 空状态与错误状态

- [ ] 灵感云层空状态
- [ ] 工坊空状态
- [ ] 记忆湖空状态
- [ ] 时间河空状态
- [ ] 搜索无结果
- [ ] 404
- [ ] 无权限
- [ ] AI 不可用

---

## 4. P2｜锦上添花

### 4.1 轻动效

- [ ] 首页星尘轻动
- [ ] 区域卡片 hover
- [ ] 节点打开纸页感
- [ ] 时间河轻微流动
- [ ] 发布 / 点亮反馈

### 4.2 搜索增强

- [ ] Fuse.js 搜索
- [ ] 标签聚合
- [ ] 区域计数
- [ ] 生命周期筛选

### 4.3 节点护照增强

- [ ] 下一步建议
- [ ] 所属路径
- [ ] AI 参与标识
- [ ] 生命阶段解释

### 4.4 SEO

- [ ] title
- [ ] description
- [ ] OpenGraph
- [ ] sitemap
- [ ] robots
- [ ] favicon

---

## 5. Later｜后续阶段

### V2

- [ ] 创世台
- [ ] 星尘港
- [ ] 节点编辑
- [ ] 规则引擎
- [ ] 世界健康度
- [ ] 快照导出

### V3

- [ ] AI 问答
- [ ] 语义搜索
- [ ] AI 摘要
- [ ] AI 标签建议
- [ ] AI 关系建议
- [ ] AI 隐私检查
- [ ] AI 草案区

### V4

- [ ] 私密档案
- [ ] 爱的小屋
- [ ] 家庭灯火
- [ ] 年轮树
- [ ] 时间胶囊

### V5

- [ ] 年度世界册
- [ ] 主题展览
- [ ] 导出传承
- [ ] 失败博物馆
- [ ] 时光回声

---

## 6. 第一阶段推荐执行顺序

```text
1. 项目初始化
2. docs 归档
3. data 协议
4. src/lib/types.ts
5. 数据读取函数
6. WorldShell
7. 首页
8. Atlas
9. NodePage
10. Archive
11. Timeline
12. Paths
13. Ask Low Light
14. About / Manifesto
15. 移动端
16. 安全校验
17. README 与部署
```

---

## 7. 每日开工检查

每天开发前问：

- 今天的任务是否服务 V1 骨架？
- 是否会让 V1 变复杂？
- 是否引入了不必要的未来功能？
- 是否破坏 public/private 边界？
- 是否依赖 AI 才能运行？
- 是否让用户更不迷路？
- 是否让内容更容易安放？

---

## 8. 完成定义

一个任务完成必须满足：

- 功能可用
- 移动端不坏
- 不泄露私密
- 无 AI 可运行
- 有空状态
- 有返回路径
- 数据可验证
- 文档必要时同步更新

---

## 9. 最终提醒

```text
不要在 V1 追求完整宇宙。
先把第一座核心城建稳。
```

```text
骨架稳了，
未来才有无限生长的空间。
```
