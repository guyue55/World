# 古月浮屿｜安全隐私与发布守门

> 性质：Security / Privacy / Release Gate  
> 目标：确保公开世界不会泄露私密内容，AI 不越权，家庭、孩子、住宅、工作资料得到保护。

---

## 1. 安全总原则

```text
公开是一个经过确认的动作，
不是内容存在后的默认状态。
```

```text
私密内容不能靠 UI 隐藏，
必须在数据和构建层隔离。
```

```text
AI 不可用时，隐私应更保守，而不是更开放。
```

---

## 2. 内容安全分级

### 2.1 public

可公开发布。

要求：

- 有 summary
- 无敏感信息
- 无 private 来源泄露
- AI 内容已审核

### 2.2 semiPublic

公开轮廓，不公开细节。

适合：

- 私密区域说明
- 爱的小屋外庭
- 家庭灯火轮廓
- 旅行概要

### 2.3 private

仅自己可见。

### 2.4 family

亲友可见。

### 2.5 partner

爱人 / 双方可见。

### 2.6 vault

保险箱。

包括：

- 孩子原始资料
- 住宅信息
- 私密信件
- 证件
- 敏感家庭资料
- 高敏感工作信息

### 2.7 sealed

封存，不主动展示。

### 2.8 silent

沉默，不搜索、不推荐、不 AI、不回望。

---

## 3. 高风险内容类型

以下默认不公开：

- 孩子
- 家庭
- 恋爱私密
- 住宅
- 工作内部信息
- 证件
- API Key
- Token
- 数据库连接
- 客户资料
- 内部截图
- 聊天原文
- 具体住址
- 学校
- 车牌
- 实时位置
- 作息路线

---

## 4. 公开前守门清单

### 4.1 文本检查

检查是否包含：

- API Key
- Token
- 密码
- 数据库连接串
- 手机号
- 邮箱
- 身份证
- 护照
- 银行卡
- 家庭地址
- 门牌号
- 公司内部域名
- 客户名
- 未授权聊天记录
- 具体学校
- 孩子姓名和作息
- 敏感工作内容

### 4.2 图片检查

检查：

- EXIF 地理位置
- 门牌号
- 车牌
- 学校校服 / 标识
- 家中布局
- 儿童正脸
- 屏幕截图中的敏感信息
- 文件名是否暴露信息

### 4.3 AI 内容检查

检查：

- 是否 AI 生成
- 是否已 reviewed
- 是否把推测写成事实
- 是否从 private 泄露
- 是否缺来源
- 是否需要 AI 标识

### 4.4 关系检查

检查 public 节点是否引用：

- private node
- vault node
- partner node
- family node

如引用，只能显示公开摘要或不显示。

---

## 5. 构建级安全

### 5.1 Public Build 规则

公开构建只能读取：

```text
content/public/
data/public-nodes.json
data/public-paths.json
data/public-events.json
public media
```

不能读取：

```text
content/private/
content/vault/
private media
vault media
```

### 5.2 构建校验

构建失败条件：

- public node 缺 summary
- public node 引用 private media
- public path 引用 private node
- AI generated 且 reviewed=false 进入 public
- vault 内容进入 search index
- private 内容出现在 public build
- sensitive pattern 命中但未标记 reviewed

### 5.3 搜索索引安全

搜索索引只包含 public 内容。

semiPublic 只包含：

- 标题
- 摘要
- 轮廓说明

---

## 6. AI 安全

### 6.1 AI 默认不可读

默认 AI 只能读 public。

private / family / partner 需要明确授权。  
vault / sealed / silent 禁止读。

### 6.2 AI 输出安全

AI 输出默认草案。

不得自动：

- 发布
- 改权限
- 删除
- 覆盖 original
- 公开私密内容

### 6.3 AI 隐私检查

AI 可作为守门人，但不能作为最终裁决。

AI 隐私判断必须人工确认。

---

## 7. 家庭与孩子安全

### 7.1 孩子内容

默认：

- vault
- 不公开
- 不 AI
- 不推荐
- 不进入公开时间河
- 不进入公开搜索

公开任何孩子相关内容必须：

- 去真实姓名
- 去学校
- 去地址
- 去实时位置
- 去作息路线
- 避免大量正脸
- 避免医疗和证件信息

### 7.2 家庭内容

默认：

- private / family
- 不进入 public build
- 公开时只用摘要或抽象故事

### 7.3 爱人 / 共同记忆

默认：

- partner / private
- 公开前需要边界确认
- 不公开聊天原文
- 不公开争吵细节
- 不公开对方隐私

---

## 8. 住宅与旅行安全

### 8.1 住宅

不公开：

- 门牌
- 精确地址
- 室内结构
- 小区名称
- 实时在家状态
- 安防细节

### 8.2 旅行

不实时公开：

- 当前住处
- 当前路线
- 家中无人信息
- 证件票据
- 具体房间号

旅行公开版可保留：

- 城市印象
- 风景
- 食物
- 抽象故事
- 脱敏路线

---

## 9. 发布流程

```text
编辑内容
  ↓
生成公开版本
  ↓
运行隐私检查
  ↓
检查 AI 标识
  ↓
检查关系引用
  ↓
检查媒体
  ↓
人工确认
  ↓
点亮 public
  ↓
生成 WorldEvent
  ↓
创建 Snapshot
```

---

## 10. 删除与封存安全

优先选择：

- hide
- archive
- seal
- moveToVault

永久删除必须：

- 二次确认
- 提示不可恢复
- 生成快照
- 记录日志

---

## 11. 安全验收

必须通过：

- private 不进入 public build
- vault 不进入 search index
- AI 未审核内容不能 public
- public 节点有 summary
- public path 不引用 private node
- 图片 EXIF 已检查
- 404 / 无权限不泄露真实标题
- robots / sitemap 不包含私密路径

---

## 12. 安全最终原则

```text
世界可以浪漫，
但隐私必须严格。
```

```text
公开世界只是前厅，
真正珍贵的内容可以在深处安静发光。
```
