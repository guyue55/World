# 古月浮屿｜世界规则

> 性质：规则引擎 / 数据协议 / 治理规范  
> 作用：确保世界自由生长但不混乱；无 AI 时依然可自然演化；有 AI 时不越权。

---

## 1. 规则总则

古月浮屿的规则系统服务于四个目标：

1. 让世界不迷路
2. 让内容能安放
3. 让无 AI 时也能演化
4. 让隐私与数据可长期守护

核心原则：

```text
自由输入，有序安放。
规则打底，AI 增强。
公开克制，私密优先。
主干稳定，枝叶自由。
```

---

## 2. 世界对象规则

### 2.1 核心对象

世界由以下对象组成：

```text
World
Area
Node
Entity
Projection
Relation
Path
Rule
Permission
Log
Snapshot
```

### 2.2 World

World 表示世界状态。

字段建议：

```ts
type World = {
  name: string
  slogan: string
  mode: 'alive' | 'quiet' | 'frozen' | 'repair' | 'archive'
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  dayPhase: 'dawn' | 'day' | 'dusk' | 'night'
  aiStatus: 'enabled' | 'low-light' | 'disabled'
}
```

### 2.3 Area

Area 表示区域。

规则：

- 一级区域不超过 7 个左右
- 新区域先进草案或实验区
- 没有真实内容的区域不升格
- 每个区域必须有世界名和现实名
- 每个区域必须有无 AI 模式
- 每个区域必须有入口和出口
- 私密区域可显示轮廓，但不显示内容

### 2.4 Node

Node 是内容基本单位。

规则：

- 万物皆可成为节点
- 节点必须有 id、slug、title、type、areaId、visibility、lifeStage、createdAt
- public 节点必须有 summary
- AI 生成节点默认 draft / ai-reviewed=false
- private / vault 节点不进入公开构建
- 节点可以不完整，但必须有生命周期

### 2.5 Entity

Entity 是世界表现实体。

一个 Node 可以表现为：

- 星
- 纸
- 门
- 灯
- 湖面光片
- 装置
- 卷宗
- 信封
- 地图坐标

### 2.6 Projection

Projection 是节点在不同区域的投影。

规则：

- 同一内容不复制多份
- 一个 Node 可以有多个 Projection
- Projection 可以覆盖标题和摘要，但不改变原始 Node
- 首页、地图、时间河、档案馆、路径都应使用 Projection

### 2.7 Relation

Relation 是节点关系。

关系类型：

- topic：主题相关
- time：时间相关
- project：项目相关
- place：地点相关
- person：人物相关
- inspired：启发
- derived：衍生
- implemented：实现
- summarized：总结
- publicVersionOf：公开版属于
- privateSourceOf：私密源
- revivedFrom：从旧内容复活

规则：

- 关系应有类型
- 强关系优先显示
- 弱关系默认折叠
- 星图默认只显示当前节点周围有限数量关系
- AI 建议关系必须审核

### 2.8 Path

Path 是探索路径。

规则：

- 路径服务访客理解，不是简单分类
- 每条路径必须有适合对象
- 每条路径建议 5-12 个节点
- 首次访问路径应控制在 8 分钟左右
- 深潜路径可更长
- 路径可以由 AI 建议，但必须人工确认

### 2.9 Rule

Rule 是世界自然法则。

规则必须：

- 可见
- 可解释
- 可启停
- 可回滚
- 不越权

### 2.10 Permission

Permission 定义可见性和 AI 访问边界。

权限包括：

- public
- semiPublic
- private
- family
- partner
- vault
- sealed
- silent

### 2.11 Log

世界变化必须生成日志。

日志类型：

- node-created
- node-updated
- node-published
- node-archived
- area-created
- area-awakened
- rule-triggered
- ai-suggestion-approved
- snapshot-created
- season-changed

### 2.12 Snapshot

重大操作前应生成快照。

触发场景：

- 批量导入
- AI 批量整理
- 修改权限规则
- 创建新区域
- 公开发布一批内容
- 修改世界地图

---

## 3. 输入与收集规则

### 3.1 星尘港

所有新内容先进入收集箱 / 星尘港。

输入类型：

- 手写内容
- 对话沉淀
- 图片 / 照片
- 项目 / 文档
- 链接 / 代码 / 语音
- 报错
- 截图
- GitHub 仓库
- PDF
- 浏览器收藏

规则：

```text
先接住，再整理。
```

### 3.2 输入最小要求

最低可以只有：

- 一句话
- 一张图
- 一个链接
- 一段语音
- 一段代码

不强迫一开始就完整分类。

### 3.3 识别规则

无 AI 时按类型、文件、标签、来源进行识别。

例如：

- 图片 → photo / memory
- Markdown → article / document
- URL → link / reference
- 报错文本 → tech / troubleshooting
- 短句 → fragment
- 项目 README → project / document

有 AI 时可增强识别，但结果进入草案。

---

## 4. 默认安放规则

| 内容类型 | 默认区域 | 默认权限 |
|---|---|---|
| article | 档案馆 / 技术星域 | public draft |
| project | 产品工坊 | public draft / private |
| fragment | 灵感云层 | private |
| memory | 记忆湖 | private |
| photo | 记忆湖 | private |
| letter | 时间胶囊 / 私密抽屉 | private / vault |
| place | 旅行远方 / 地点坐标 | private |
| object | 信物柜 / 物件记忆 | private |
| rule | 世界宪章 / 创世台 | public / private |
| path | 精选路径 | public |
| event | 时间河 | public / private |

---

## 5. 生命周期规则

### 5.1 节点生命周期

```text
seed → sprout → growing → bloom → fruit → archive → relic → dormant → silent
```

### 5.2 自动推进规则

- 新 fragment 默认 seed
- seed 补充描述后可变 sprout
- sprout 有正文 / 媒体后可变 growing
- growing 建立关联和摘要后可变 bloom
- bloom 被精选或发布后可变 fruit
- 长期不更新可变 archive / dormant
- 已失效但有历史价值可变 relic
- 不希望被推荐或唤起可变 silent

### 5.3 时间触发

- seed 超过 30 天未更新 → 待浇水
- project 超过 90 天未更新 → 提示归档或复活
- 技术文章超过 180 天未更新 → 提示检查版本
- 公开内容超过一年 → 可进入回望候选

---

## 6. 区域规则

### 6.1 区域状态

```text
draft → experimental → active → quiet → archived → sealed
```

### 6.2 升格规则

实验区升格为正式区域需要：

- 有清晰现实解释
- 有入口
- 有无 AI 模式
- 有退出路径
- 有至少几个真实节点
- 不会让主地图变复杂
- 有默认权限
- 有空状态文案

### 6.3 降级规则

区域可降级为：

- quiet
- archived
- sealed
- experimental
- hidden

触发条件：

- 长期无内容
- 真实价值不足
- 功能重复
- 暂不维护
- 仍在试验
- 不适合公开

### 6.4 主地图显示规则

主地图只显示：

- active 主区域
- 精选子区域
- 有公开内容的区域
- 近期活跃区域
- 被手动固定的区域

不显示：

- 草案区
- 沉默区
- 过深私密区
- 实验区
- 空内容区域

---

## 7. 可见性规则

### 7.1 public

所有访客可见，可进入公开搜索和公开 AI。

### 7.2 semiPublic

可显示轮廓，不展示细节。

适合：

- 爱的小屋外庭
- 家庭灯火轮廓
- 年轮树摘要
- 私密区域存在感

### 7.3 private

仅自己可见。

### 7.4 family

亲友可见。

### 7.5 partner

爱人 / 共同关系可见。

### 7.6 vault

保险箱。更严格：

- 不进入公开构建
- 不进入公开搜索
- 默认不进入 AI
- 不主动推荐
- 需要加密备份或独立存储

### 7.7 sealed

封存内容。保留但不主动展示。

### 7.8 silent

沉默内容。

- 不推荐
- 不 AI
- 不主动回流
- 不进入年度回顾
- 可保存但不解释

---

## 8. 隐私守门规则

### 8.1 默认私密内容

以下默认 private / vault：

- 家庭
- 孩子
- 恋爱
- 住宅
- 私密信件
- 工作文档
- 聊天记录
- 证件资料
- API Key
- 服务器信息
- 公司内部信息

### 8.2 公开前检查

公开前检查：

- API Key / Token
- 邮箱 / 手机号
- 身份证 / 证件
- 地址 / 门牌
- 车牌
- 学校
- 公司内部域名
- 客户名称
- 内部截图
- EXIF 地理信息
- 孩子正脸和作息
- 家庭敏感信息
- 他人聊天记录

### 8.3 公开版本规则

私密原文不应直接公开。

应支持：

- raw 原始版
- private 完整私密版
- family 亲友版
- public 公开脱敏版
- summary 摘要版
- ai AI 整理版
- archive 归档版

---

## 9. AI 规则

### 9.1 AI 输出默认草案

AI 生成内容必须进入草案区：

- AI 摘要
- AI 标签
- AI 关系建议
- AI 命名
- AI 公开版本
- AI 隐私判断
- AI 生成路径
- AI 造物草案

### 9.2 AI 标识规则

所有 AI 内容必须标识：

- AI 摘要
- AI 建议
- AI 推测
- AI 草案
- AI 想象层
- AI 回声

### 9.3 AI 禁止自动操作

AI 不得自动：

- 发布
- 删除
- 改权限
- 覆盖 original
- 公开 private / vault
- 生成孩子公开内容
- 将想象当事实

### 9.4 AI 不可用降级

AI 不可用时：

- Ask 显示低光模式
- 搜索用本地搜索
- 推荐用标签 / 时间 / 关系
- 世界日志用模板
- 隐私检查用规则和正则
- 路径使用预设路径

---

## 10. 关系与星图规则

### 10.1 关系强度

- 0.2：弱相关
- 0.5：相关
- 0.8：强相关
- 1.0：核心关系

### 10.2 星图降噪

- 默认只显示强关系
- 弱关系折叠
- 同类关系可筛选
- 超过数量自动聚类
- 当前节点高亮，其余淡化
- 支持按主题、时间、项目过滤

### 10.3 孤岛规则

无关系节点标记为孤星。

处理方式：

- 添加标签
- 关联项目
- 归入时间河
- 放入记忆湖
- 封存为遗迹

---

## 11. 首页展示规则

首页不是最新优先，而是策展优先。

首页可展示：

- 世界宣言
- 精选路径
- 代表节点
- 最近发生
- 正在生长
- 随机旧星
- 关于古月
- 世界宪章入口

首页主动作不超过 5 个。

不要展示：

- 全部内容
- 私密深层
- 内容债务
- AI 待审核
- 规则引擎状态
- 过多入口

---

## 12. 路径规则

### 12.1 路径类型

- first-time：第一次来
- tech：技术
- life：生活
- deep-dive：深潜
- creator：创世者

### 12.2 路径要求

每条路径应有：

- 标题
- 适合谁
- 预计阅读时间
- 路径说明
- 节点列表
- 每一步为什么重要
- 完成后可以去哪

### 12.3 路径长度

- 轻路径：5-8 个节点
- 标准路径：8-12 个节点
- 深潜路径：可更长，但要分段

---

## 13. 时间河规则

时间河记录世界事件，而不只是文章发布。

事件包括：

- 新节点
- 节点状态变化
- 区域点亮
- 世界宪章修订
- AI 建议采纳
- 规则触发
- 归档 / 复活
- 快照生成
- 年度回顾

---

## 14. 归档、删除与封存规则

### 14.1 优先封存，不立即删除

删除分层：

- 从公开层移除
- 隐藏
- 归档
- 封存
- 进入保险箱
- 永久删除

### 14.2 永久删除

永久删除必须明确提示：

```text
永久删除后无法恢复。
也可以选择封存。
```

### 14.3 归档不是丢弃

归档表示：

- 停止生长
- 保留历史
- 可被搜索
- 可被复活

---

## 15. 快照与回滚规则

### 15.1 必须生成快照的操作

- 批量导入
- AI 批量整理
- 修改权限规则
- 创建新区域
- 公开发布一批内容
- 修改世界地图
- 删除或封存大量内容

### 15.2 快照包含

- nodes
- relations
- areas
- permissions
- rules
- paths
- world-state
- logs

---

## 16. 导出规则

导出类型：

- 公开世界包
- 个人完整备份包
- 家庭纪念包
- 孩子成长包
- 旅行纪念包
- 项目作品包
- 年度世界包

格式：

- Markdown
- JSON
- YAML
- 图片原件
- 音频原件
- PDF
- 静态 HTML

---

## 17. 世界健康度规则

健康度维度：

- 未整理种子数量
- 孤岛节点数量
- 缺少权限确认节点
- 缺少摘要公开节点
- 长期未更新项目
- 过期技术文章
- 未备份媒体
- AI 未审核内容
- 隐私风险节点

世界化表达：

- 云层拥挤度
- 星线完整度
- 档案清洁度
- 守门安全度
- 工坊活跃度
- 备份完整度

---

## 18. 规则最终收束

```text
世界可以自由生长，
但每个造物都必须有位置、权限、关系、状态和出口。
```

```text
规则不是限制想象，
而是保护世界不会在想象中坍塌。
```
