# 古月浮屿｜V1 世界骨架运行时设计

> 阶段：V1
> 性质：世界骨架运行时设计
> 目标：把“世界不是页面集合，而是协议系统”的原则落实为可运行代码层。

## 1. 运行时分层

V1 运行时分为七层：

```text
Space Layer
Content Layer
Relation Layer
Time Layer
Projection Layer
Governance Layer
Interoperability Layer
```

### Space Layer

由以下对象支撑：

- Area
- Atlas
- Path
- current location
- depth

### Content Layer

由以下对象支撑：

- Node
- NodeType
- Markdown / MDX content
- NodePassport

### Relation Layer

由以下对象支撑：

- Relation
- Backlinks
- ForwardLinks
- StarGraph

### Time Layer

由以下对象支撑：

- WorldEvent
- Timeline
- LifeStage
- WorldState

### Projection Layer

由以下对象支撑：

- NodeProjection
- HomeProjection
- AtlasProjection
- ArchiveProjection
- PathProjection
- DetailProjection

### Governance Layer

由以下对象支撑：

- Permission
- Rule
- AI review
- Public build check
- GovernanceIssue
- SkeletonHealth

### Interoperability Layer

由以下对象支撑：

- Markdown
- JSON
- Git
- sitemap
- rss
- manifest
- export pack

## 2. 为什么要有运行时骨架

如果没有运行时骨架，古月浮屿会退化为：

```text
一组页面
一批文章
一些组件
```

有了运行时骨架，它才是：

```text
一个可以检查、投影、治理、演化和迁移的世界。
```

## 3. V1 检查命令

```bash
npm run check:world-core
```

它应至少覆盖：

- 数据校验
- 公开构建守门
- 世界骨架健康度
- 星线关系数量
- 路径数量
- 世界事件数量
- 治理错误

## 4. V1 不做复杂图谱 UI

V1 只做：

- StarGraph 数据
- StarLineSummary
- Backlinks / ForwardLinks

复杂交互图谱留到 V2/V6。

## 5. 最终原则

```text
世界骨架必须先能被程序理解，
然后才值得被视觉化。
```
