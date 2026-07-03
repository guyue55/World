# 古月浮屿｜V1 Schema 最终版

> 阶段：V1
> 性质：开发前数据模型冻结
> 目标：冻结 V1 可编码的数据类型，作为 `src/lib/types.ts` 与 JSON 数据的依据。

---

## 1. Schema 总原则

V1 Schema 必须做到：

- 足够稳定
- 可扩展
- 不过度复杂
- 能表达世界骨架
- 能支持 public/private 过滤
- 能支持无 AI 模式
- 能支持未来 AI 增强

---

## 2. 基础枚举

```ts
export type Visibility =
  | 'public'
  | 'semiPublic'
  | 'private'
  | 'family'
  | 'partner'
  | 'vault'
  | 'sealed'
  | 'silent'

export type LifeStage =
  | 'seed'
  | 'sprout'
  | 'growing'
  | 'bloom'
  | 'fruit'
  | 'archive'
  | 'relic'
  | 'dormant'
  | 'silent'

export type NodeType =
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

export type SourceType =
  | 'manual'
  | 'upload'
  | 'import'
  | 'chat'
  | 'ai-assisted'
  | 'github'
  | 'system'

export type ContentLayer =
  | 'fact'
  | 'interpretation'
  | 'imagination'
```

---

## 3. Node

```ts
export type Node = {
  id: string
  slug: string
  title: string
  worldTitle?: string

  type: NodeType
  areaId: string

  summary?: string
  contentPath?: string
  cover?: string
  media?: string[]

  tags: string[]

  visibility: Visibility
  lifeStage: LifeStage
  source: SourceType
  layer?: ContentLayer

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

### 3.1 Node 必填字段

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

### 3.2 public Node 额外要求

public 节点必须有：

- summary

### 3.3 AI Node 规则

如果：

```ts
ai.generated === true
```

且：

```ts
ai.reviewed !== true
```

则不可：

- public
- featured
- 进入 pathCore
- 进入首页精选

---

## 4. Area

```ts
export type AreaStatus =
  | 'draft'
  | 'experimental'
  | 'active'
  | 'quiet'
  | 'archived'
  | 'sealed'

export type Area = {
  id: string
  worldName: string
  realName: string
  description: string
  parentId?: string
  level: 1 | 2 | 3 | 4
  status: AreaStatus
  defaultVisibility: Visibility
  noAIFallback?: string
  aiEnhancement?: string
  icon?: string
  order?: number
}
```

### 4.1 Area 必填字段

- id
- worldName
- realName
- description
- level
- status
- defaultVisibility

### 4.2 V1 主区域 id

```text
origin
tech
workshop
fragments
memory
timeline
archive
lighthouse
```

---

## 5. Relation

```ts
export type RelationType =
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

export type Relation = {
  id?: string
  from: string
  to: string
  type: RelationType
  strength: 0.2 | 0.5 | 0.8 | 1.0
  note?: string
  source?: 'manual' | 'rule' | 'ai'
  reviewed?: boolean
}
```

### 5.1 Relation 规则

- from 和 to 必须引用存在的 node id
- AI 生成关系默认 reviewed=false
- public 页面不可泄露 private relation 细节

---

## 6. Path

```ts
export type PathAudience =
  | 'first-time'
  | 'tech'
  | 'life'
  | 'deep-dive'
  | 'creator'

export type Path = {
  id: string
  title: string
  description: string
  audience: PathAudience
  estimatedMinutes?: number
  nodeSlugs: string[]
  nextPathIds?: string[]
  visibility: 'public' | 'private'
}
```

### 6.1 V1 必备 Path

- first-visit
- tech-ai
- how-world-created

---

## 7. WorldEvent

```ts
export type WorldEventType =
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

export type WorldEvent = {
  id: string
  type: WorldEventType
  title: string
  date: string
  description: string
  nodeIds?: string[]
  areaIds?: string[]
  visibility?: Visibility
  actor?: 'creator' | 'rule' | 'ai' | 'system'
}
```

---

## 8. WorldState

```ts
export type WorldMode =
  | 'alive'
  | 'quiet'
  | 'frozen'
  | 'repair'
  | 'archive'

export type WorldSeason =
  | 'spring'
  | 'summer'
  | 'autumn'
  | 'winter'

export type DayPhase =
  | 'dawn'
  | 'day'
  | 'dusk'
  | 'night'

export type AIStatus =
  | 'enabled'
  | 'low-light'
  | 'disabled'

export type WorldState = {
  mode: WorldMode
  season: WorldSeason
  dayPhase: DayPhase
  aiStatus: AIStatus
  lastUpdated: string
}
```

---

## 9. Projection

V1 可以不持久化 Projection，但建议定义类型。

```ts
export type ProjectionTarget =
  | 'home'
  | 'atlas'
  | 'timeline'
  | 'archive'
  | 'path'
  | 'detail'
  | 'ask'

export type Projection = {
  id: string
  nodeId: string
  target: ProjectionTarget
  displayType:
    | 'star'
    | 'paper'
    | 'device'
    | 'timeline-event'
    | 'card'
    | 'archive-record'
    | 'path-step'
  titleOverride?: string
  summaryOverride?: string
}
```

---

## 10. PermissionPolicy

```ts
export type PermissionPolicy = {
  visibility: Visibility
  searchable: boolean
  recommendable: boolean
  aiIndexable: boolean
  buildTarget: 'public' | 'private' | 'vault' | 'none'
}
```

推荐默认：

```ts
export const DEFAULT_PERMISSION_POLICY: Record<Visibility, PermissionPolicy> = {
  public: {
    visibility: 'public',
    searchable: true,
    recommendable: true,
    aiIndexable: true,
    buildTarget: 'public',
  },
  semiPublic: {
    visibility: 'semiPublic',
    searchable: true,
    recommendable: false,
    aiIndexable: false,
    buildTarget: 'public',
  },
  private: {
    visibility: 'private',
    searchable: false,
    recommendable: false,
    aiIndexable: false,
    buildTarget: 'private',
  },
  family: {
    visibility: 'family',
    searchable: false,
    recommendable: false,
    aiIndexable: false,
    buildTarget: 'private',
  },
  partner: {
    visibility: 'partner',
    searchable: false,
    recommendable: false,
    aiIndexable: false,
    buildTarget: 'private',
  },
  vault: {
    visibility: 'vault',
    searchable: false,
    recommendable: false,
    aiIndexable: false,
    buildTarget: 'vault',
  },
  sealed: {
    visibility: 'sealed',
    searchable: false,
    recommendable: false,
    aiIndexable: false,
    buildTarget: 'none',
  },
  silent: {
    visibility: 'silent',
    searchable: false,
    recommendable: false,
    aiIndexable: false,
    buildTarget: 'none',
  },
}
```

---

## 11. 推荐 `src/lib/types.ts`

开发时可直接将本文件中的 TypeScript 类型整理为：

```text
src/lib/types.ts
```

---

## 12. Schema 校验规则

必须校验：

- node.id 唯一
- node.slug 唯一
- node.areaId 存在
- node.visibility 合法
- node.lifeStage 合法
- node.type 合法
- public node 必须有 summary
- path.nodeSlugs 全部存在
- relation.from / relation.to 全部存在
- worldEvent.nodeIds 全部存在
- AI generated 未 reviewed 不可 public
- private / vault 不进入 public build

---

## 13. Schema 最终原则

```text
Schema 是世界骨架的钢筋。
字段不能随意膨胀，
但必须为未来留出关节。
```
