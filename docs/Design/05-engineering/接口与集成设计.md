# 古月浮屿｜接口与集成设计

> 性质：Interface & Integration Design  
> 目标：为未来接入 AI、搜索、创世台、导入器、GitHub、图片、导出器预留清晰边界。

---

## 1. 集成设计原则

### 1.1 低耦合

每个外部能力都应作为 Adapter 接入，而不是侵入核心数据模型。

### 1.2 可替换

AI、搜索、存储、导入器都应可替换。

### 1.3 默认关闭

高风险能力默认关闭，尤其是：

- AI 读取 private
- 自动公开
- 自动修改权限
- 自动删除
- 公开构建读取私密数据

### 1.4 草案优先

外部系统产生的内容默认进入草案。

---

## 2. 内部接口分层

```text
Content API
World API
Search API
AI API
Import API
Export API
Privacy API
Rule API
```

V1 不一定全部实现为 HTTP API，可以先作为 TypeScript 函数存在。

---

## 3. Content API

职责：

- 读取节点
- 读取区域
- 读取内容正文
- 读取关系
- 读取路径
- 读取世界事件

函数建议：

```ts
getAllNodes()
getPublicNodes()
getNodeBySlug(slug)
getNodesByArea(areaId)
getNodesByTag(tag)
getNodeContent(node)
getAllAreas()
getAllPaths()
getAllWorldEvents()
```

---

## 4. World API

职责：

- 生成世界地图
- 生成首页数据
- 生成时间河
- 生成档案视图
- 生成路径视图

函数建议：

```ts
buildHomeProjection()
buildAtlasProjection()
buildTimelineProjection()
buildArchiveProjection()
buildPathProjection(pathId)
buildRelatedNodes(nodeId)
```

---

## 5. Search API

### 5.1 V1 本地搜索

函数：

```ts
buildSearchIndex(nodes)
searchPublicNodes(query, filters)
```

索引字段：

- title
- worldTitle
- summary
- tags
- type
- area
- public content

过滤：

- visibility
- type
- area
- tags
- lifeStage

### 5.2 V3 语义搜索

预留：

```ts
semanticSearch(query, scope)
```

scope：

- public
- private-authorized
- project
- area
- path

语义搜索必须受 visibility 限制。

---

## 6. AI API

### 6.1 AI Adapter

```ts
type AIAdapter = {
  summarize(input: SummarizeInput): Promise<AIDraft>
  suggestTags(input: TagInput): Promise<AIDraft>
  suggestRelations(input: RelationInput): Promise<AIDraft>
  generatePath(input: PathInput): Promise<AIDraft>
  privacyCheck(input: PrivacyInput): Promise<AIDraft>
  chat(input: ChatInput): Promise<AIResponse>
}
```

### 6.2 AIDraft

```ts
type AIDraft = {
  id: string
  type: 'summary' | 'tags' | 'relations' | 'path' | 'privacy' | 'content'
  sourceNodeIds?: string[]
  content: unknown
  confidence?: number
  risk: 'low' | 'medium' | 'high'
  reviewed: false
  createdAt: string
}
```

### 6.3 AI 调用规则

- public AI 只能读 public
- private AI 需授权
- vault 禁止读
- AI 输出默认 draft
- AI 不直接发布
- AI 不改变 visibility

---

## 7. Import API

导入来源：

- Markdown
- JSON
- 图片文件夹
- GitHub README
- 浏览器书签
- AI 对话
- PDF
- 语音转写
- 旧博客

函数建议：

```ts
importMarkdown(path)
importImage(file)
importConversation(text)
importGithubRepo(url)
importBookmark(url)
```

输出：

```ts
type ImportResult = {
  rawInputId: string
  suggestedNode: Partial<Node>
  warnings: string[]
  requiresReview: boolean
}
```

导入规则：

- 默认进入星尘港
- 不直接公开
- 图片默认 private
- 对话默认 private / draft
- GitHub 项目可 public draft

---

## 8. Export API

导出类型：

- public world
- full backup
- yearbook
- project portfolio
- travel album
- family memory
- child archive

函数建议：

```ts
exportPublicWorld()
exportFullBackup()
exportYearbook(year)
exportProjectPack(projectId)
exportMediaManifest()
```

格式：

- Markdown
- JSON
- PDF
- ZIP
- Static HTML

---

## 9. Privacy API

职责：

- 检查公开风险
- 校验构建安全
- 过滤私密数据
- 检查 EXIF
- 检查 AI 未审核内容

函数建议：

```ts
checkNodePrivacy(node)
checkPublicBuild(nodes)
filterPublicNodes(nodes)
removePrivateFields(node)
detectSensitiveText(content)
checkMediaExif(file)
```

敏感检测：

- API Key
- Token
- 邮箱
- 手机
- 地址
- 车牌
- 学校
- 证件
- 内部域名
- 公司截图
- 孩子信息
- 住宅细节

---

## 10. Rule API

职责：

- 执行世界规则
- 生成建议
- 更新生命周期
- 生成世界事件

函数建议：

```ts
runWorldRules()
getNodeSuggestions(node)
getAreaHealth(area)
getWorldHealth()
generateRuleEvents()
```

规则输出：

```ts
type RuleSuggestion = {
  id: string
  ruleId: string
  targetId: string
  message: string
  actionType: 'update-lifeStage' | 'add-summary' | 'review-privacy' | 'archive' | 'connect'
  autoApply: boolean
}
```

高风险规则不自动执行。

---

## 11. GitHub 集成预留

未来可读取：

- repo README
- issues
- releases
- commits
- project metadata

用途：

- 项目节点更新
- 技术记录关联
- 项目状态自动提示
- README 同步

默认：

- 导入为草案
- 不直接覆盖项目节点

---

## 12. 图片与媒体集成

### 12.1 图片上传

默认：

- type=photo
- area=memory
- visibility=private
- lifeStage=seed
- 需要 EXIF 检查

### 12.2 媒体清单

```ts
type MediaAsset = {
  id: string
  path: string
  type: 'image' | 'audio' | 'video'
  visibility: Node['visibility']
  exifChecked?: boolean
  alt?: string
  caption?: string
}
```

---

## 13. 创世台接口

V2 可实现：

```ts
createNode(input)
updateNode(id, patch)
archiveNode(id)
sealNode(id)
createRelation(input)
createPath(input)
createWorldEvent(input)
runPrivacyCheck(id)
createSnapshot()
```

危险操作必须二次确认。

---

## 14. 接口最终原则

```text
所有外部能力都只能进入协议，
不能绕过协议直接改变世界。
```

```text
导入先草案，
AI 先草案，
公开先守门，
删除先封存。
```
