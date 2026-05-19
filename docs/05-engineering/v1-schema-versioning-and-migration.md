# 古月浮屿｜V1 Schema 版本化与迁移策略

> 阶段：V1
> 性质：世界骨架长期演化保障
> 目标：让未来增加字段、修改协议、迁移数据时，不破坏既有世界。

## 1. 为什么需要版本化

古月浮屿不是一次性网站，而是长期生长的个人数字世界。

未来一定会发生：

- Node 字段扩展
- Relation 类型扩展
- Visibility 权限扩展
- WorldEvent 类型扩展
- AI 索引策略变化
- 私密层结构变化
- 导出格式变化

如果没有版本化，未来会出现：

```text
旧节点无法读取
旧路径无法解析
旧事件无法回放
旧归档无法导出
私密边界被误破坏
```

## 2. 版本文件

```text
data/schema-versions.json
```

记录：

- current
- compatibleFrom
- 每个核心对象版本
- breaking change 策略
- non-breaking change 策略

## 3. 破坏性变更要求

凡是破坏性变更，必须同时具备：

```text
migration script
CHANGELOG entry
snapshot before migration
schema version bump
contract test update
```

## 4. 非破坏性变更

允许：

```text
新增 optional 字段
新增展示组件
新增可选 projection
新增文档
新增非核心页面
```

## 5. 最终原则

```text
世界可以进化，
但旧世界必须能被理解。
```
