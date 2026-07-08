# 古月浮屿世界协议规范

> 版本：1.0
> 日期：2026-07-08
> 状态：已采纳

## 一、概述

古月浮屿世界协议定义了个人数字世界的数据结构、权限模型、AI 上下文契约和导出格式。本协议的目的是让世界可被人类访问、AI 理解和其他工具互操作。

## 二、数据结构

### 2.1 节点（Node）

节点是世界的最小知识单元。

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | string | 是 | 唯一标识，格式 `node-{slug}` |
| slug | string | 是 | URL 友好的标识符 |
| title | string | 是 | 显示标题 |
| worldTitle | string | 是 | 世界内名称 |
| type | enum | 是 | article / fragment / memory |
| areaId | string | 是 | 所属区域 ID |
| summary | string | 是 | 摘要（不少于 18 字符） |
| contentPath | string | 否 | Markdown 正文路径 |
| tags | string[] | 是 | 标签数组 |
| visibility | enum | 是 | public / private / sealed |
| lifeStage | enum | 是 | seedling / growing / mature |
| source | enum | 是 | manual / ai-generated / imported |
| layer | enum | 是 | interpretation / raw / curated |
| featured | object | 否 | home / representative / pathCore |
| createdAt | string | 是 | ISO 日期 |
| reviewed | boolean | 是 | 是否已审查 |

### 2.2 区域（Area）

区域是节点的容器，构成世界的空间结构。

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | string | 是 | 区域标识 |
| worldName | string | 是 | 世界内名称 |
| realName | string | 是 | 现实名称 |
| description | string | 是 | 区域描述 |
| level | number | 是 | 层级（1=一级区域） |
| status | enum | 是 | active / dormant |
| icon | string | 是 | 图标符号 |
| order | number | 是 | 排序权重 |
| defaultVisibility | enum | 是 | 默认可见性 |

### 2.3 关系（Relation）

关系是节点间的星线，构成世界的拓扑结构。

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | string | 是 | 关系标识 |
| from | string | 是 | 源节点 ID |
| to | string | 是 | 目标节点 ID |
| type | enum | 是 | theme / reference / sequence |
| strength | number | 是 | 0-1 强度值 |
| source | enum | 是 | manual / inferred |
| reviewed | boolean | 是 | 是否已审查 |
| note | string | 否 | 关系说明（强关系建议填写） |

### 2.4 路径（Path）

路径是主题浏览序列，引导访客按顺序探索节点。

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | string | 是 | 路径标识 |
| title | string | 是 | 路径标题 |
| description | string | 是 | 路径描述 |
| nodeSlugs | string[] | 是 | 节点 slug 序列（不少于 4 个） |
| visibility | enum | 是 | public / private |
| order | number | 是 | 排序权重 |

### 2.5 事件（Event）

事件是世界的时间线，记录世界的演进。

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | string | 是 | 事件标识 |
| type | enum | 是 | milestone / maintenance / content / release |
| title | string | 是 | 事件标题 |
| date | string | 是 | ISO 日期 |
| summary | string | 是 | 事件摘要 |
| nodeIds | string[] | 否 | 关联节点 ID |
| areaIds | string[] | 否 | 关联区域 ID |
| visibility | enum | 是 | public / private |
| actor | string | 是 | 执行者 |

## 三、权限模型

### 3.1 可见性层级

| 层级 | 说明 | AI 可索引 | 公开构建 |
|---|---|---|---|
| public | 公开可见 | 是 | 是 |
| private | 私密可见 | 否 | 否 |
| sealed | 封存不可见 | 否 | 否 |

### 3.2 权限守门

- 页面路由：由 middleware.ts 服务端拦截私密路由
- API 路由：每个路由自行检查权限（requireOwner / requirePermission）
- 前端：只控制显隐体现，不作为安全边界

## 四、AI 上下文契约

### 4.1 核心原则

AI 是灯塔不是太阳：只读公开上下文，不写入世界，可降级。

### 4.2 AI 可访问数据

- visibility: public 的节点元数据
- visibility: public 的节点正文
- visibility: public 的关系和路径
- visibility: public 的事件

### 4.3 AI 不可访问数据

- visibility: private 或 sealed 的任何数据
- 创作者工作台数据
- 审计日志
- 私密 API 响应

### 4.4 降级策略

当 AI provider 不可用时，灯塔 API 返回静态索引匹配结果，不报错。

## 五、导出格式

### 5.1 导出包结构

```text
world-export/
  manifest.json          # 导出清单
  nodes/                 # 节点数据 JSON
  content/               # Markdown 正文
    articles/
    fragments/
    memory/
  data/                  # 核心数据
    relations.json
    world-events.json
    paths.json
    areas.json
  media/                 # 媒体资源
    covers/
  world-index.json       # 机器可读索引
```

### 5.2 导出契约

导出只包含 visibility: public 的数据。私密层和封存层永不进入导出包。

### 5.3 互操作

导出的 Markdown 文件使用标准 GitHub-flavored Markdown，可被 Obsidian、Logseq 等工具导入。world-index.json 可被 AI 工具读取以理解世界结构。

## 六、机器可读索引

### 6.1 位置

`public/world-index.json`

### 6.2 结构

```json
{
  "generatedAt": "ISO 时间戳",
  "state": { "mode", "season", "dayPhase", "aiStatus", "lastUpdated" },
  "areas": [...],
  "nodes": [...],
  "paths": [...],
  "events": [...],
  "projections": { "home": [...], "archive": [...] },
  "graph": { "nodes": [...], "links": [...] }
}
```

### 6.3 生成

```bash
npm run build:world-index
```

## 七、版本与兼容

协议使用语义化版本号。当前版本 1.0。未来版本演进采用追加字段方式，不破坏旧索引的可读性。
