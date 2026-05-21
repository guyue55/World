# 古月浮屿｜V1 开发任务拆解

> 性质：Implementation Task Breakdown  
> 目标：把 V1 从文档拆成可执行开发任务。

---

## 1. 开发总原则

```text
先数据，后页面。
先静态，后交互。
先可用，后动效。
先公开世界，后私密深层。
先低光灯塔，后完整 AI。
```

---

## 2. 阶段 0：项目初始化

### 任务

- 初始化 Next.js + TypeScript
- 配置 Tailwind CSS
- 配置基础 ESLint / Prettier
- 建立目录结构
- 建立 data / content 目录
- 写 README 初版

### 验收

- 本地能启动
- 基础页面可访问
- 目录结构符合架构文档

---

## 3. 阶段 1：数据协议

### 任务

- 创建 areas.json
- 创建 nodes.json
- 创建 paths.json
- 创建 relations.json
- 创建 world-events.json
- 创建 world-state.json
- 定义 TypeScript types
- 编写数据读取函数

### 文件

```text
src/lib/types.ts
src/lib/nodes.ts
src/lib/areas.ts
src/lib/paths.ts
src/lib/relations.ts
src/lib/world-events.ts
```

### 验收

- 能读取所有 JSON
- 类型校验通过
- id / slug 唯一
- path 引用 node 存在
- relation 引用 node 存在

---

## 4. 阶段 2：世界外壳

### 任务

- WorldShell
- StarField
- CompassNav
- WorldStatus
- 基础布局
- 明暗主题变量

### 验收

- 所有页面共享世界外壳
- 罗盘导航可返回首页、地图、档案
- 背景不影响阅读
- 移动端不卡顿

---

## 5. 阶段 3：首页

### 任务

- Hero Section
- 世界说明
- 主区域概览
- 精选路径
- 最近发生
- About Preview
- Manifesto CTA

### 组件

- HomeHero
- AreaOverview
- FeaturedPaths
- RecentWorldEvents
- AboutPreview

### 验收

- 首页不像普通博客
- 首屏文案清楚
- 主按钮不超过 5 个
- 移动端可读

---

## 6. 阶段 4：世界地图 Atlas

### 任务

- WorldMap
- AreaCard
- AreaDetail
- 目录视图
- 移动端卡片视图

### 验收

- 主区域展示清楚
- 每个区域有现实解释
- 点击可进入详情或相关内容
- 不展示过多节点

---

## 7. 阶段 5：节点详情页

### 任务

- 动态路由 node/[slug]
- NodeHeader
- NodeContent
- NodePassport
- RelatedNodes
- Breadcrumb
- 返回地图

### 验收

- 任意 node 可访问
- 节点元信息完整
- 正文可读
- 相关节点不超过 3 个强推荐
- 移动端舒适

---

## 8. 阶段 6：时间河

### 任务

- Timeline 页面
- TimeRiver 组件
- WorldEventCard 组件
- 按日期排序
- 关联节点链接

### 验收

- 展示世界事件
- 事件可链接节点 / 区域
- 不是普通文章列表

---

## 9. 阶段 7：档案馆

### 任务

- Archive 页面
- SearchBox
- FilterPanel
- ArchiveView
- 类型筛选
- 区域筛选
- 标签筛选

### 验收

- 可搜索
- 可筛选
- 可快速找到内容
- 作为现实视图可用

---

## 10. 阶段 8：精选路径

### 任务

- Paths 页面
- PathCard
- PathViewer
- 路径详情
- 节点顺序展示

### 验收

- 至少三条路径
- 每条路径节点存在
- 路径可完成
- 结束后有下一步

---

## 11. 阶段 9：AI 灯塔低光

### 任务

- Ask 页面
- LighthouseStatus
- PresetGuides
- Search Entry
- Featured Questions

### 验收

- 无 AI 不报错
- 低光文案存在
- 可进入路径
- 可搜索公开内容

---

## 12. 阶段 10：内容与文档

### 任务

- 世界宣言
- 世界宪章
- 关于古月
- V1 蓝图
- 第一批技术节点
- 第一批项目节点
- 第一批灵感节点
- 第一批生活节点

### 验收

- 没有空壳感
- 至少 20 个真实节点
- public 节点有 summary
- 内容分布在多个区域

---

## 13. 阶段 11：安全与构建校验

### 任务

- visibility 过滤
- public build 检查
- private 引用检查
- path 引用检查
- relation 引用检查
- AI reviewed 检查
- summary 检查

### 验收

- private 不进入 public
- public path 不引用 private
- AI 未审核不 public
- 构建前能发现错误

---

## 14. 阶段 12：移动端与体验打磨

### 任务

- 移动端首页
- 移动端地图
- 移动端节点页
- 移动端档案馆
- 底部导航
- 动效降级
- 空状态
- 错误状态

### 验收

- 375px 可用
- 阅读舒适
- 地图不崩
- 返回明确
- 搜索可用

---

## 15. 阶段 13：部署

### 任务

- 构建
- 静态部署
- sitemap
- robots
- OG 信息
- README 更新
- 发布前检查

### 验收

- 线上可访问
- 无私密泄露
- 页面无明显 404
- 移动端可用
- Lighthouse 基础分数可接受

---

## 16. V1 任务优先级

### P0

- 数据模型
- 首页
- 地图
- 节点页
- 世界宪章
- 移动端基础
- public/private 过滤

### P1

- 时间河
- 档案馆
- 路径
- Ask 低光
- 搜索

### P2

- 动效
- 节点护照增强
- 世界状态
- 空状态
- 错误状态

---

## 17. 开发顺序建议

```text
1. 数据
2. 类型
3. 首页
4. 地图
5. 节点页
6. 档案馆
7. 时间河
8. 路径
9. Ask 低光
10. 移动端
11. 安全校验
12. 部署
```

---

## 18. 不要提前做的任务

V1 不要做：

- 完整后台
- 完整 AI
- 3D 宇宙
- 多用户权限
- 私密深层在线访问
- 年度册生成器
- 历史剧场
- 社交评论

---

## 19. V1 开发最终原则

```text
先让世界能站起来，
再让它变得更神秘。
```

```text
第一版不是完整宇宙，
而是第一座可以居住、可以回来的核心城。
```
