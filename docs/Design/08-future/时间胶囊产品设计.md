# 古月浮屿｜时间胶囊产品设计

> 阶段：V4  
> 性质：Time Capsule Product Design  
> 目标：设计写给未来自己、孩子、家人、爱人、项目或某个未来时刻的内容封存与开启系统。

---

## 1. 产品定位

时间胶囊是古月浮屿中的一种特殊节点。

它不是普通文章，也不是普通日记，而是：

```text
现在写下，
未来打开。
```

它服务于：

- 写给未来自己
- 写给孩子
- 写给家人
- 写给爱人
- 写给某个项目完成后的自己
- 写给某个阶段结束后的自己
- 写给未来的世界

---

## 2. 设计原则

### 2.1 封存感

时间胶囊应有明确仪式：

- 写下
- 选择收件人
- 选择开启时间
- 选择权限
- 封存
- 到期提醒
- 开启

### 2.2 可撤销但有记录

未到期前可以：

- 编辑
- 取消
- 延期
- 更改收件人
- 更改权限

但应记录修改历史。

### 2.3 默认私密

时间胶囊默认 private / vault。

### 2.4 不依赖 AI

没有 AI 时也能封存和开启。

AI 只能辅助：

- 润色草案
- 整理旧内容
- 生成摘要
- 到期回顾

---

## 3. 使用场景

### 3.1 写给未来自己

示例：

- 一年后的自己
- 项目完成后的自己
- 低谷之后的自己
- 三十岁的自己
- 某个重要选择后的自己

### 3.2 写给孩子

示例：

- 出生时写给孩子
- 每年生日写一封
- 18 岁打开
- 结婚时打开
- 某个未来阶段打开

默认 vault。

### 3.3 写给爱人

示例：

- 纪念日
- 未来旅行
- 共同计划
- 某个承诺

默认 partner / private。

### 3.4 写给项目

示例：

- 项目启动时写下初心
- 项目发布后打开
- 项目失败后打开
- 一年后复盘

默认 private / project。

### 3.5 写给世界

示例：

- V1 发布前写给未来的古月浮屿
- 世界宪章修订时写下原因
- 下一阶段开始前写下愿望

---

## 4. 数据模型

```ts
type TimeCapsule = {
  id: string
  title: string
  worldTitle?: string
  recipient:
    | 'future-self'
    | 'child'
    | 'partner'
    | 'family'
    | 'project'
    | 'world'
    | 'custom'

  recipientName?: string

  openRule: {
    type: 'date' | 'event' | 'age' | 'manual'
    openAt?: string
    eventId?: string
    age?: number
  }

  visibility:
    | 'private'
    | 'family'
    | 'partner'
    | 'vault'
    | 'sealed'

  contentPath: string
  attachments?: string[]

  aiPolicy: {
    aiSummarizable: boolean
    aiReadableBeforeOpen: boolean
    aiReadableAfterOpen: boolean
  }

  status: 'draft' | 'sealed' | 'opened' | 'cancelled' | 'expired'

  createdAt: string
  sealedAt?: string
  openedAt?: string
}
```

---

## 5. 胶囊状态

```text
draft → sealed → opened
              ↘ cancelled
```

### draft

可编辑。

### sealed

已封存。默认不进入搜索、不推荐。

### opened

到期或手动开启。

### cancelled

取消封存。

---

## 6. 开启规则

### 6.1 指定日期

例如：

- 2027-01-01
- 孩子 18 岁生日
- V1 发布一年后

### 6.2 事件触发

例如：

- 项目发布
- 项目失败
- 世界进入 V2
- 某个节点变为 fruit

### 6.3 年龄触发

主要用于孩子。

例如：

- 6 岁
- 12 岁
- 18 岁
- 22 岁

### 6.4 手动开启

保留手动开启选项，但应提示：

```text
这封信原本属于未来。
你确定现在打开吗？
```

---

## 7. 交互流程

### 7.1 创建胶囊

```text
选择收件人
  ↓
填写标题
  ↓
写内容
  ↓
添加附件
  ↓
选择开启规则
  ↓
选择权限
  ↓
确认 AI 访问策略
  ↓
封存
```

### 7.2 封存仪式

世界动作：

- 信封合上
- 光点沉入时间河
- 胶囊进入时间抽屉
- 时间河生成事件

文案：

```text
这封信已经交给时间。
```

### 7.3 开启仪式

世界动作：

- 时间河泛起涟漪
- 信封浮现
- 光慢慢展开

文案：

```text
时间带回了一封旧信。
```

---

## 8. 权限规则

| 收件人 | 默认权限 |
|---|---|
| future-self | private |
| child | vault |
| partner | partner |
| family | family |
| project | private |
| world | private / public draft |

---

## 9. AI 规则

AI 默认：

- 不读 sealed 胶囊
- 不总结 vault 胶囊
- 不自动公开开启内容

AI 可选：

- 开启后生成摘要
- 帮助整理附件
- 生成回望问题
- 对项目胶囊生成复盘提纲

---

## 10. 时间胶囊列表

视图：

- 待开启
- 已开启
- 写给未来自己
- 写给孩子
- 写给项目
- 已取消

字段：

- 标题
- 收件人
- 开启规则
- 状态
- 权限
- 创建时间
- 剩余时间

---

## 11. 风险控制

风险：

- 提前公开
- 错误收件人
- AI 读取过早
- 孩子内容被公开
- 附件泄露隐私

控制：

- 默认 private / vault
- 封存前权限确认
- AI 默认不可读
- 开启前二次确认
- 导出时显示包含内容

---

## 12. 时间胶囊最终原则

```text
时间胶囊不是提醒事项，
而是把一段此刻交给未来。
```

```text
未来打开的，不只是文字，
也是当时的光、选择和心愿。
```
