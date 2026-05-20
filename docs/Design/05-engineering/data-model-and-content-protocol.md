# 古月浮屿｜数据模型与内容协议

> 性质：Data Contract / Content Protocol  
> 目标：定义古月浮屿所有核心数据对象、字段、校验规则和文件组织方式。

---

## 1. 数据协议原则

### 1.1 所有内容必须可迁移

核心数据使用：

- Markdown / MDX
- JSON
- YAML frontmatter
- 媒体原件

避免把核心内容锁死在特定数据库或平台。

### 1.2 数据优先于页面

页面从数据生成，数据不依赖页面存在。

### 1.3 公私分离

公开构建不应读取私密内容。

### 1.4 原始内容不可覆盖

AI 摘要、公开版本、标签建议不能覆盖 original。

---

## 2. 文件组织

推荐：

```text
content/
  public/
    articles/
    projects/
    fragments/
    manifesto/
  private/
    memory/
    letters/
    family/
  vault/
    child/
    home/
    sensitive/

data/
  nodes.json
  areas.json
  relations.json
  paths.json
  world-events.json
  world-state.json
  rules.json
  permissions.json
  snapshots/
```

V1 可简化：

```text
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

## 3. Node 数据模型

### 3.1 TypeScript 定义

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
    | 'rule'
    | 'path'
    | 'event'

  areaId: string
  summary?: string
  contentPath?: string
  cover?: string
  media?: string[]

  tags: string[]

  visibility:
    | 'public'
    | 'semiPublic'
    | 'private'
    | 'family'
    | 'partner'
    | 'vault'
    | 'sealed'
    | 'silent'

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
    | 'github'
    | 'system'

  layer?: 'fact' | 'interpretation' | 'imagination'

  featured?: {
    home?: boolean
    representative?: boolean
    recommended?: boolean
    timelineKey?: boolean
    pathCore?: boolean
    yearbookCandidate?: boolean
  }

  ai?: {
    generated: boolean
    reviewed: boolean
    summary?: string
    tasks?: string[]
    generatedAt?: string
    model?: string
  }

  createdAt: string
  updatedAt?: string
}
```

### 3.2 必填字段

所有 Node 必填：

- id
- slug
- title
- type
- areaId
- tags
- visibility
- lifeStage
- source
- createdAt

public Node 额外必填：

- summary

### 3.3 id 规则

建议：

```text
node_YYYYMMDD_xxx
```

或：

```text
nanoid / uuid
```

### 3.4 slug 规则

- 小写英文
- 连字符
- 不使用诗意隐喻
- 尽量表达真实内容

示例：

```text
feishu-mcp-adk-agent
no-ai-natural-evolution
world-skeleton
docker-disk-cleanup
```

### 3.5 visibility 规则

- public：进入公开构建
- semiPublic：只进入公开轮廓
- private：不进入公开构建
- family：不进入公开构建
- partner：不进入公开构建
- vault：不进入公开构建，不 AI
- sealed：不主动显示
- silent：不推荐、不 AI、不回流

---

## 4. Area 数据模型

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
  noAIFallback?: string
  aiEnhancement?: string
  icon?: string
  order?: number
}
```

### 4.1 必填字段

- id
- worldName
- realName
- description
- level
- status
- defaultVisibility

### 4.2 Area 校验

- 一级 active 区域不宜超过 7-8 个
- parentId 必须引用存在区域
- defaultVisibility 不得为空
- description 必须有现实解释

---

## 5. Relation 数据模型

```ts
type Relation = {
  id?: string
  from: string
  to: string
  type:
    | 'topic'
    | 'time'
    | 'project'
    | 'place'
    | 'person'
    | 'memory'
    | 'inspired'
    | 'derived'
    | 'implemented'
    | 'summarized'
    | 'publicVersionOf'
    | 'privateSourceOf'
    | 'revivedFrom'

  strength: 0.2 | 0.5 | 0.8 | 1.0
  note?: string
  source?: 'manual' | 'rule' | 'ai'
  reviewed?: boolean
}
```

### 5.1 校验

- from / to 必须引用存在节点
- AI 生成 relation 必须 reviewed=false
- public 节点不可强引用 private 节点并公开展示细节

---

## 6. Path 数据模型

```ts
type Path = {
  id: string
  title: string
  description: string
  audience: 'first-time' | 'tech' | 'life' | 'deep-dive' | 'creator'
  estimatedMinutes?: number
  nodeSlugs: string[]
  nextPathIds?: string[]
  visibility: 'public' | 'private'
}
```

### 6.1 校验

- public path 只能包含 public node
- nodeSlugs 必须存在
- first-time path 建议 5-8 个节点
- deep-dive path 可分章节

---

## 7. WorldEvent 数据模型

```ts
type WorldEvent = {
  id: string
  type:
    | 'world-concept-formed'
    | 'principle-created'
    | 'node-created'
    | 'node-updated'
    | 'node-published'
    | 'node-archived'
    | 'node-revived'
    | 'area-created'
    | 'area-awakened'
    | 'rule-triggered'
    | 'ai-suggestion-approved'
    | 'snapshot-created'
    | 'season-changed'

  title: string
  date: string
  description: string
  nodeIds?: string[]
  areaIds?: string[]
  visibility?: Node['visibility']
  actor?: 'creator' | 'rule' | 'ai' | 'system'
}
```

### 7.1 校验

- date 必须 ISO 格式
- public event 不得泄露 private node 细节
- nodeIds / areaIds 引用必须存在

---

## 8. Rule 数据模型

```ts
type WorldRule = {
  id: string
  name: string
  description: string
  enabled: boolean
  scope: 'node' | 'area' | 'path' | 'world'
  trigger:
    | 'node-created'
    | 'node-updated'
    | 'time-elapsed'
    | 'tag-count'
    | 'visibility-change'
    | 'manual'

  condition: string
  action: string
  risk: 'low' | 'medium' | 'high'
  autoApply: boolean
}
```

规则：

- high risk 不可 autoApply
- 涉及 visibility 不可自动执行
- AI 建议仅生成 draft

---

## 9. Permission 数据模型

```ts
type PermissionPolicy = {
  visibility: Node['visibility']
  searchable: boolean
  recommendable: boolean
  aiIndexable: boolean
  buildTarget: 'public' | 'private' | 'vault' | 'none'
}
```

推荐默认：

| visibility | searchable | recommendable | aiIndexable | buildTarget |
|---|---|---|---|---|
| public | true | true | true | public |
| semiPublic | true | false | limited | public |
| private | false | false | false | private |
| family | false | false | false | private |
| partner | false | false | false | private |
| vault | false | false | false | vault |
| sealed | false | false | false | none |
| silent | false | false | false | none |

---

## 10. Markdown Frontmatter

可选在 MDX 中写：

```yaml
---
id: node_20260519_world_manifesto
slug: world-manifesto
title: 古月浮屿世界宣言
worldTitle: 创世初光
type: article
areaId: origin
summary: 解释古月浮屿为什么不是传统博客，而是一个正在生长的个人数字世界。
tags:
  - world
  - manifesto
visibility: public
lifeStage: bloom
source: manual
layer: interpretation
createdAt: 2026-05-19
updatedAt: 2026-05-19
---
```

---

## 11. 数据校验规则

构建前必须校验：

- slug 唯一
- id 唯一
- public node 有 summary
- contentPath 存在
- areaId 存在
- relation 引用存在
- path 引用存在
- public path 不引用 private node
- private / vault 不进入 public search index
- ai.generated=true 且 reviewed=false 不可 public
- media 文件存在
- 日期格式正确

---

## 12. 示例 Node

```json
{
  "id": "node_20260519_no_ai",
  "slug": "no-ai-natural-evolution",
  "title": "无 AI 自然演化机制",
  "worldTitle": "灯塔熄灭时，世界仍会呼吸",
  "type": "article",
  "areaId": "origin",
  "summary": "说明古月浮屿在没有 AI 时，如何依靠规则、时间、标签、关系和权限自然运行。",
  "tags": ["world", "rule", "no-ai"],
  "visibility": "public",
  "lifeStage": "bloom",
  "source": "chat",
  "layer": "interpretation",
  "ai": {
    "generated": false,
    "reviewed": true
  },
  "createdAt": "2026-05-19"
}
```

---

## 13. 数据协议最终原则

```text
数据是世界的骨架。
页面是世界的皮肤。
AI 是世界的灯光。
隐私是世界的边界。
```
