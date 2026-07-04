# 古月浮屿｜导出与传承系统设计

> 阶段：V5
> 性质：Export & Legacy System Design
> 目标：确保古月浮屿长期可导出、可迁移、可离线保存、可交付给未来自己或重要的人。

---

## 1. 设计初衷

古月浮屿不是一次性网站。

它应当能跨越：

- 框架更换
- 数据库迁移
- AI 服务替换
- 部署平台变化
- 设备损坏
- 多年后重新打开

核心原则：

```text
UI 可以重写。
数据库可以替换。
AI 可以更换。
但世界记忆不能丢。
```

---

## 2. 导出类型

### 2.1 公开世界包

包含：

- public nodes
- public areas
- public paths
- public events
- public media
- sitemap
- static HTML
- README

用途：

- 公开归档
- 静态部署
- 版本快照

### 2.2 个人完整备份包

包含：

- public
- private
- family
- partner
- vault metadata
- relations
- events
- rules
- media manifest
- raw content

需要：

- 加密
- 校验
- 版本号
- 备份日志

### 2.3 家庭纪念包

包含：

- family 内容
- 家庭照片
- 节日
- 家庭故事
- 家庭年度册

默认不公开。

### 2.4 孩子成长包

包含：

- child vault 内容
- 年轮树
- 声音瓶
- 画作
- 趣言
- 写给未来的信
- 年度成长册

原则：

```text
未来应由孩子决定如何被看见。
```

### 2.5 旅行纪念包

包含：

- 旅行节点
- 地图
- 照片
- 路线
- 票据摘要
- 纪念品
- 游记

### 2.6 项目作品包

包含：

- 项目节点
- README
- 截图
- Demo 链接
- 技术栈
- 复盘
- 相关文章

### 2.7 年度世界包

包含：

- 年度世界册
- 年度事件
- 年度精选
- 年度展览
- 年度快照

---

## 3. 导出格式

支持：

- Markdown
- JSON
- YAML
- PDF
- HTML
- ZIP
- media original
- media optimized
- manifest.json

### 3.1 manifest.json

```json
{
  "world": "古月浮屿",
  "exportType": "full-backup",
  "exportedAt": "2026-05-19",
  "version": "1.0.0",
  "includes": {
    "public": true,
    "private": true,
    "vault": false,
    "media": true
  }
}
```

---

## 4. 导出流程

```text
选择导出类型
  ↓
确认包含权限层
  ↓
运行隐私检查
  ↓
生成 manifest
  ↓
复制内容与媒体
  ↓
生成索引
  ↓
压缩
  ↓
校验
  ↓
记录 WorldEvent
```

---

## 5. 导出前检查

检查：

- 是否包含 vault
- 是否包含孩子内容
- 是否包含 partner 内容
- 是否包含家庭内容
- 是否包含 EXIF
- 是否包含 AI 未审核内容
- 是否包含敏感字段
- 是否加密
- 是否要给他人

---

## 6. 传承系统

### 6.1 传承说明

可建立：

```text
legacy.md
```

内容：

- 古月浮屿是什么
- 数据如何组织
- 哪些内容可公开
- 哪些内容不可公开
- 孩子内容如何处理
- 家庭内容如何处理
- 如何恢复系统
- 如何导出内容
- 如何关闭公开站点

### 6.2 未来接收者

可能包括：

- 未来自己
- 孩子
- 家人
- 爱人
- 项目继承者

### 6.3 接收权限

不同包给不同人：

| 接收者 | 可接收 |
|---|---|
| 未来自己 | 完整备份 |
| 孩子 | 孩子成长包 |
| 家人 | 家庭纪念包 |
| 爱人 | partner 共同记忆包 |
| 公众 | 公开世界包 |

---

## 7. 恢复机制

恢复应支持：

```text
导入 manifest
  ↓
恢复 data
  ↓
恢复 content
  ↓
恢复 media
  ↓
重建搜索索引
  ↓
重建页面
```

必须保证：

- 原始内容可恢复
- 关系可恢复
- 权限可恢复
- 时间线可恢复

---

## 8. 快照系统

快照类型：

- public snapshot
- full snapshot
- pre-ai snapshot
- pre-publish snapshot
- annual snapshot

触发：

- 批量修改
- AI 批量处理
- 修改权限
- 发布前
- 年度总结前
- 删除前

---

## 9. 加密建议

对于完整备份包和 vault 包：

- 支持加密 ZIP
- 支持密钥提示
- 支持离线存储
- 不将密钥写入仓库
- 不将 vault 内容上传公开平台

---

## 10. 导出与传承最终原则

```text
网站可以关闭，
世界不能丢失。
```

```text
导出不是附属功能，
而是世界长期存在的根。
```
