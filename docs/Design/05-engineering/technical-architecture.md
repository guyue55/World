# 古月浮屿｜技术架构设计

> 性质：Technical Architecture Design  
> 目标：让古月浮屿在 V1 静态优先、无 AI 可运行、未来可扩展为数据库 + AI + 创世台的长期系统。

---

## 1. 技术架构原则

### 1.1 静态优先

V1 采用静态优先：

- Markdown / MDX
- JSON 数据
- 静态构建
- 本地搜索
- 静态部署

优势：

- 简单
- 稳定
- 易备份
- 易迁移
- 不依赖后端
- 无 AI 也可运行

### 1.2 协议先行

先定义：

- Node
- Area
- Relation
- Projection
- Path
- Rule
- Permission
- WorldEvent
- Snapshot

页面只是协议的表现。

### 1.3 AI 可插拔

AI 不能成为核心依赖。

系统需支持：

```ts
type AIConfig = {
  enabled: boolean
  provider?: string
  features: {
    chat: boolean
    summarize: boolean
    tagging: boolean
    relationSuggest: boolean
    privacyCheck: boolean
    pathGenerate: boolean
  }
}
```

### 1.4 公开与私密隔离

公开构建只读取：

- public
- semiPublic 公开摘要

绝不把 private / vault 数据打进前端。

---

## 2. 推荐技术栈

V1：

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- MDX
- JSON 数据
- Fuse.js / Pagefind
- 静态部署：Vercel / Cloudflare Pages

后续：

- SQLite / PostgreSQL
- Prisma
- Object Storage
- Vector DB
- AI API
- Auth
- Admin / Creator Console

---

## 3. 项目结构

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
    rules.json
    permissions.json
```

---

## 4. 数据模型

### 4.1 Node

```ts
type Node = {
  id: string
  slug: string
  title: string
  worldTitle?: string
  type:
    | 'article'
    | 'project'
    | 'fragment'
    | 'memory'
    | 'photo'
    | 'document'
    | 'letter'
    | 'place'
    | 'object'

  areaId: string
  summary: string
  contentPath?: string
  cover?: string
  tags: string[]

  visibility:
    | 'public'
    | 'semiPublic'
    | 'private'
    | 'family'
    | 'partner'
    | 'vault'
    | 'sealed'

  lifeStage:
    | 'seed'
    | 'sprout'
    | 'growing'
    | 'bloom'
    | 'fruit'
    | 'archive'
    | 'relic'
    | 'dormant'
    | 'silent'

  source:
    | 'manual'
    | 'upload'
    | 'import'
    | 'chat'
    | 'ai-assisted'

  layer?: 'fact' | 'interpretation' | 'imagination'

  ai?: {
    generated: boolean
    reviewed: boolean
    summary?: string
  }

  createdAt: string
  updatedAt?: string
}
```

### 4.2 Area

```ts
type Area = {
  id: string
  worldName: string
  realName: string
  description: string
  parentId?: string
  level: 1 | 2 | 3 | 4
  status: 'draft' | 'experimental' | 'active' | 'quiet' | 'archived' | 'sealed'
  defaultVisibility: Node['visibility']
}
```

### 4.3 Relation

```ts
type Relation = {
  from: string
  to: string
  type:
    | 'topic'
    | 'time'
    | 'project'
    | 'place'
    | 'person'
    | 'inspired'
    | 'derived'
    | 'implemented'
    | 'publicVersionOf'
    | 'privateSourceOf'
  strength: number
  note?: string
}
```

### 4.4 Path

```ts
type Path = {
  id: string
  title: string
  description: string
  audience: 'first-time' | 'tech' | 'life' | 'deep-dive' | 'creator'
  nodeSlugs: string[]
}
```

### 4.5 WorldEvent

```ts
type WorldEvent = {
  id: string
  type: string
  title: string
  date: string
  description: string
  nodeIds?: string[]
  areaIds?: string[]
}
```

---

## 5. 构建管线

### 5.1 内容输入

```text
Markdown / MDX
JSON metadata
media files
```

### 5.2 数据加载

`lib/nodes.ts`：

- loadNodes()
- getPublicNodes()
- getNodeBySlug()
- getNodesByArea()
- getRelatedNodes()

`lib/areas.ts`：

- loadAreas()
- getAreaById()
- getActiveAreas()

`lib/visibility.ts`：

- filterPublic()
- canBuildPublic()
- isVault()

### 5.3 投影生成

```text
Node
  ↓
Projection
  ↓
Home / Atlas / Timeline / Archive / Paths
```

### 5.4 搜索索引

V1：

- Fuse.js
- Pagefind

索引内容：

- title
- worldTitle
- summary
- tags
- public content

不索引：

- private
- family
- partner
- vault
- sealed
- silent

---

## 6. 权限隔离架构

### 6.1 Public Build

只包含：

- public nodes
- semiPublic summaries
- public paths
- public events
- public media

### 6.2 Private Data

不进入公开构建。

存储位置可后续拆分：

```text
private-content/
vault-content/
family-content/
```

### 6.3 构建校验

构建前检查：

- private 是否误入 public
- vault 是否被引用
- public 是否缺 summary
- AI 未审核内容是否公开
- 图片是否需清理 EXIF

---

## 7. AI 架构

### 7.1 V1

无 AI 或低光模式。

### 7.2 V2/V3

AI 功能模块：

- chat
- summarize
- tagging
- relationSuggest
- privacyCheck
- pathGenerate
- publicVersionDraft

### 7.3 AI 数据流

```text
授权内容
  ↓
AI 处理
  ↓
草案区
  ↓
人工审核
  ↓
写入正式字段
```

### 7.4 AI 不直接写入

禁止直接修改：

- original
- visibility
- publish status
- deletion
- vault content

---

## 8. 规则引擎

### 8.1 V1 基础规则

- fragment 默认 seed
- memory 默认 private
- public 节点必须有 summary
- 同标签节点成为相关候选
- 30 天未更新 seed 进入待浇水

### 8.2 后续规则

- project 90 天未更新提示归档
- 技术文 180 天提示检查版本
- 同 tag 超过 5 个节点形成星座
- AI 生成内容进入审核队列
- family / child / home 默认 vault

### 8.3 Rule 类型

```ts
type WorldRule = {
  id: string
  name: string
  enabled: boolean
  trigger: {
    type: 'time' | 'node-created' | 'node-updated' | 'tag-count' | 'visibility-change'
  }
  condition: string
  action: string
}
```

---

## 9. 组件架构

### 9.1 world

- WorldShell
- StarField
- CompassNav
- WorldMap
- WorldStatus

### 9.2 node

- NodeCard
- NodeDetail
- NodePassport
- RelatedNodes

### 9.3 timeline

- TimeRiver
- WorldEventCard

### 9.4 archive

- ArchiveView
- SearchBox
- FilterPanel

### 9.5 paths

- PathCard
- PathViewer

---

## 10. 部署策略

### 10.1 V1

- Static export / hybrid static
- Vercel 或 Cloudflare Pages
- public data only
- 不依赖数据库
- 不依赖 AI

### 10.2 V2

- 加创世台
- 可使用本地编辑或后台
- 可引入 SQLite / Git-based CMS

### 10.3 V3

- AI 服务接入
- 私密索引
- 权限认证
- 语义搜索

---

## 11. 备份与导出

导出：

- content
- data
- media
- relations
- paths
- world-events
- rules
- permissions

建议命令：

```text
export-public-world
export-full-backup
export-yearbook
export-media-manifest
```

---

## 12. 测试与质量

### 12.1 构建测试

- public build 不含 private
- 所有 public 节点有 summary
- 所有 node slug 唯一
- 所有 relation 引用存在
- 所有 path nodeSlugs 存在
- 所有 areaId 存在

### 12.2 体验测试

- 首页 10 秒内理解
- 地图不迷路
- 节点能返回
- 移动端可读
- AI 不可用时不报错

### 12.3 内容测试

- 技术文章有环境和更新时间
- 私密内容不公开
- AI 内容有标识
- 空状态存在

---

## 13. 技术架构最终原则

```text
协议先行，页面后置。
静态可运行，AI 可增强。
公开可部署，私密不打包。
数据可导出，世界可重建。
```
