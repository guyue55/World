# 古月浮屿｜私密档案系统设计

> 阶段：V4
> 性质：Private Archive System Design
> 目标：为古月浮屿的私密层、家庭层、伴侣层、保险箱层和沉默层建立长期安全、可维护、可导出的设计。

---

## 1. 设计初衷

古月浮屿不是只展示公开内容的博客。它还要承载那些不适合公开、但对人生长期价值极高的内容：

- 家庭记忆
- 爱人共同记忆
- 孩子成长
- 住宅片段
- 私密信件
- 情绪记录
- 时间胶囊
- 工作敏感资料
- 只想保存、不想解释的记忆

因此必须有一套私密档案系统。

核心原则：

```text
公开世界只是前厅。
真正珍贵的内容，可以在深处安静发光。
```

```text
私密内容不能靠 UI 隐藏，
必须在数据和构建层隔离。
```

---

## 2. 私密层分级

### 2.1 public

所有人可见。
进入公开构建、公开搜索、公开 AI。

### 2.2 semiPublic

半公开。
可以显示存在、轮廓、公开摘要，但不显示细节。

适合：

- 记忆湖公开边缘
- 爱的小屋外庭
- 家庭灯火轮廓
- 旅行概要
- 年轮树抽象介绍

### 2.3 private

仅自己可见。
默认不进入公开构建、不进入公开 AI。

适合：

- 个人日记
- 未公开灵感
- 私人照片
- 情绪记录
- 未完成文章

### 2.4 family

亲友可见。
未来可通过登录或导出包实现。

适合：

- 家庭照片
- 节日团聚
- 家庭故事
- 家常菜
- 亲友纪念

### 2.5 partner

爱人 / 双方可见。
涉及共同记忆，默认不公开。

适合：

- 爱的小屋内室
- 纪念日
- 共同旅行
- 信件
- 共同计划
- 私密照片

### 2.6 vault

保险箱，高敏感内容。

适合：

- 孩子原始成长资料
- 住宅信息
- 证件
- 私密信件
- 高敏感家庭资料
- 工作敏感资料
- 不应被 AI 索引的内容

规则：

- 不进入公开构建
- 不进入公开搜索
- 不进入公开 AI
- 不进入自动年度回顾
- 导出时需要单独加密或单独确认

### 2.7 sealed

封存层。
内容存在，但不主动显示。

适合：

- 结束的关系
- 已封存的旧阶段
- 不想主动回望但需要保存的材料

### 2.8 silent

沉默层。
内容可以存在，但不应被搜索、推荐、AI 总结或年度回顾主动唤起。

适合：

- 情绪低谷
- 亲密争吵
- 不想解释的记忆
- 只想保存的内容

---

## 3. 数据隔离设计

### 3.1 推荐目录

```text
content/
  public/
    articles/
    projects/
    manifesto/

  private/
    memories/
    journals/
    letters/
    drafts/

  family/
    photos/
    stories/
    festivals/

  partner/
    love-house/
    letters/
    trips/
    plans/

  vault/
    child/
    home/
    sensitive/
    identity/

  sealed/
    archived-relations/
    closed-periods/

  silent/
    private-reflections/
```

### 3.2 Public Build 规则

公开构建只能读取：

```text
content/public/
data/public-*.json
public media
```

不能读取：

```text
content/private/
content/family/
content/partner/
content/vault/
content/sealed/
content/silent/
```

### 3.3 元数据隔离

如果需要在公开层显示私密空间轮廓，应使用专门的 public summary：

```json
{
  "id": "memory-lake",
  "worldName": "记忆湖",
  "publicSummary": "这里保存生活片刻与旅行光影，更深处的家庭与私密记忆默认不公开。",
  "visibility": "semiPublic"
}
```

不要把私密节点列表放入 public JSON。

---

## 4. 私密节点模型

```ts
type PrivateNode = Node & {
  visibility: 'private' | 'family' | 'partner' | 'vault' | 'sealed' | 'silent'
  encryption?: {
    enabled: boolean
    method?: string
    keyHint?: string
  }
  ownership?: {
    owner: 'self' | 'family' | 'partner' | 'childFutureRight'
    sharedWith?: string[]
    futureOwner?: string
  }
  aiPolicy: {
    aiIndexable: boolean
    aiSummarizable: boolean
    aiCanGeneratePublicVersion: boolean
  }
}
```

---

## 5. 公开摘要机制

私密内容如果需要对外展示，应生成公开摘要，而不是直接公开原文。

### 5.1 分层

- original：原始内容
- private：完整私密版
- publicSummary：公开摘要
- familyVersion：亲友版
- partnerVersion：伴侣版
- archiveVersion：归档版

### 5.2 示例

私密原文：

```text
包含具体地点、真实人物、细节照片、情绪和共同经历。
```

公开摘要：

```text
这是一次在春末发生的短途旅行。留下的是风、光线和一段安静的同行记忆。
```

---

## 6. 私密档案入口设计

公开层只显示轮廓。

例如：

```text
记忆湖边缘

这里保存一些被允许公开的生活片刻与旅行光影。
更深处还有家庭灯火、爱的小屋与年轮树。
那些区域默认不向所有旅人开放。
```

不要显示：

- 私密节点标题
- 私密照片缩略图
- 私密时间线
- 私密人物关系

---

## 7. 私密搜索

### 7.1 默认规则

public 搜索只搜 public。
private 搜索需要认证。
vault 默认不搜。
silent 默认不搜。

### 7.2 搜索范围提示

搜索界面必须明确显示当前范围：

```text
当前搜索范围：公开世界
```

或：

```text
当前搜索范围：私人档案
```

---

## 8. AI 访问边界

AI 默认只能读 public。

| 权限 | AI 默认可读 |
|---|---|
| public | 是 |
| semiPublic | 只读公开摘要 |
| private | 否 |
| family | 否 |
| partner | 否 |
| vault | 禁止 |
| sealed | 禁止 |
| silent | 禁止 |

### 8.1 私密 AI 模式

未来如需私密 AI，必须：

- 明确开启
- 限定范围
- 可撤销
- 记录日志
- 不读取 vault
- 输出进入草案
- 不自动公开

---

## 9. 导出机制

私密档案应支持多种导出：

- 个人完整备份包
- 家庭纪念包
- 伴侣共同记忆包
- 孩子成长包
- 时间胶囊包
- 私密离线档案包

导出时必须显示：

- 包含哪些权限层
- 是否包含媒体原件
- 是否包含 AI 摘要
- 是否加密
- 是否可转交他人

---

## 10. 私密档案安全检查

检查项：

- private 是否进入 public build
- vault 是否进入 search index
- family 内容是否被 public path 引用
- partner 内容是否被 public event 暴露
- silent 内容是否被年度回顾唤起
- AI 是否读取了未授权内容
- 图片 EXIF 是否泄露位置
- 导出包是否包含高敏感信息

---

## 11. 私密档案体验原则

```text
外面可以看见一盏灯，
但不应看见屋内的一切。
```

```text
对外有温度，
对内有完整。
```

```text
私密不是隐藏失败，
而是尊重边界。
```

---

## 12. V4 实施建议

V4 不应一次实现所有私密系统。

建议顺序：

1. private / public 物理隔离
2. vault 概念和目录
3. semiPublic 公开摘要
4. 记忆湖私密层
5. 爱的小屋
6. 家庭灯火
7. 年轮树
8. 时间胶囊
9. 私密导出
10. 私密 AI 受限模式

---

## 13. 最终原则

```text
公开层不是完整世界。
私密层不是附属功能。
它是世界长期存在的边界和底线。
```
