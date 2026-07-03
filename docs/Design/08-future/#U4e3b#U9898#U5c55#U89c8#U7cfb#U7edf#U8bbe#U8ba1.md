# 古月浮屿｜主题展览系统设计

> 阶段：V5
> 性质：Exhibition System Design
> 目标：将分散节点策展为可浏览、可分享、可回望的专题展览。

---

## 1. 产品定位

主题展览是古月浮屿的策展系统。

它不是普通分类页，而是围绕一个主题，将节点、时间、关系、图片、项目、复盘组织成一段可走的旅程。

展览回答：

- 这个主题是什么？
- 为什么重要？
- 它如何形成？
- 有哪些代表节点？
- 它经历了哪些阶段？
- 现在到哪里了？
- 未来可能去哪里？

---

## 2. 展览示例

### 2.1 古月浮屿创世展

主题：从博客到个人数字世界

内容：

- 为什么不是博客
- 万物皆节点
- 世界骨架
- AI 是灯塔，不是太阳
- 公开层不是完整世界
- V1 实施蓝图
- 世界数据流图

### 2.2 AI Agent 探索展

内容：

- 飞书 MCP 接入 ADK
- Google ADK 与 Skills
- CLI 工具接入 Agent
- Codex / Cursor CLI 探索
- AI 灯塔设计
- MCP / ADK 相关节点

### 2.3 产品工坊实验展

内容：

- 静态 AI 小说编辑器
- 个人数字世界引擎
- 月帧阁 / MoonFrame
- SVG 套图工具
- 产品复盘

### 2.4 失败项目遗迹展

内容：

- 失败项目
- 技术选型失败
- 过度设计
- 没完成的产品
- 留下的经验
- 可复活候选

### 2.5 旅行远方展

内容：

- 城市
- 路线
- 照片
- 食物
- 明信片
- 纪念品
- 私密版 / 公开版

### 2.6 生活光影展

内容：

- 日常照片
- 光线
- 桌面
- 风景
- 食物
- 某个阶段的生活质感

---

## 3. 展览结构

每个展览包含：

1. 封面
2. 开场语
3. 主题说明
4. 时间线
5. 精选节点
6. 关系图
7. 章节
8. 代表图片 / 媒体
9. 复盘
10. 未来方向
11. 相关路径
12. 结束语

---

## 4. 数据模型

```ts
type Exhibition = {
  id: string
  slug: string
  title: string
  worldTitle?: string
  description: string
  theme: string
  visibility: 'public' | 'private' | 'family' | 'partner'
  cover?: string
  sections: ExhibitionSection[]
  nodeIds: string[]
  pathIds?: string[]
  eventIds?: string[]
  createdAt: string
  updatedAt?: string
}

type ExhibitionSection = {
  id: string
  title: string
  description?: string
  nodeIds: string[]
  layout: 'timeline' | 'grid' | 'essay' | 'gallery' | 'map' | 'relation'
}
```

---

## 5. 展览生成方式

### 5.1 手动策展

造物主选择：

- 主题
- 节点
- 顺序
- 章节
- 封面
- 公开范围

### 5.2 规则生成候选

系统可提示：

- 某 tag 下节点超过 N 个
- 某路径持续增长
- 某项目相关节点多
- 某主题跨越多个区域
- 某时间段有密集事件

### 5.3 AI 辅助草案

AI 可以：

- 生成展览标题
- 生成章节结构
- 推荐节点
- 写开场语草案
- 整理时间线
- 提示隐私风险

AI 不可：

- 自动公开
- 直接引用 private
- 把私密节点放入公开展
- 将 AI 推测作为事实

---

## 6. 展览页面设计

### 6.1 封面

展示：

- 标题
- 副标题
- 主题标签
- 时间范围
- 封面图
- 进入展览按钮

### 6.2 导览

展览左侧或顶部提供章节导航。

### 6.3 章节布局

可选：

- 时间线
- 卡片网格
- 长文叙述
- 图集
- 地图
- 关系图

### 6.4 结束页

包含：

- 展览总结
- 相关节点
- 下一条路径
- 返回地图
- 导出按钮

---

## 7. 隐私规则

公开展览只能包含 public 节点。

semiPublic 可以显示摘要。
private / vault 不进入公开展。

如果展览涉及家庭 / 爱人 / 孩子：

- 默认 private
- 公开前生成脱敏版
- 图片需 EXIF 检查
- 不展示敏感信息

---

## 8. 展览生命周期

```text
idea → draft → curated → published → archived → revived
```

含义：

- idea：展览想法
- draft：草案
- curated：已策展
- published：已公开
- archived：归档
- revived：复活

---

## 9. 展览与路径的区别

Path 是路线，偏导航。
Exhibition 是策展，偏展示和回望。

| 项目 | Path | Exhibition |
|---|---|---|
| 目标 | 引导理解 | 主题展示 |
| 结构 | 步骤 | 章节 |
| 内容 | 节点序列 | 节点 + 时间 + 图片 + 叙事 |
| 用途 | 首次探索 / 深潜 | 年度回望 / 专题沉淀 |

---

## 10. 导出

展览可导出：

- Markdown
- PDF
- HTML
- 图片海报
- 静态专题页

---

## 11. 展览最终原则

```text
展览不是把内容堆在一起，
而是让一个主题重新拥有时间、路径和光。
```
