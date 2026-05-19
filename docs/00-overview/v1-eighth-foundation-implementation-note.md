# 古月浮屿｜V1 第八批地基打磨说明

> 本文件说明第八批变更：继续打磨世界/宇宙骨架的长期演化基础。

## 本次重点

第七批解决了：

```text
协议注册
公开索引
不变量
规则执行
```

第八批继续解决：

```text
Schema 版本化
迁移策略
生命周期状态机
世界事件契约
快照计划
契约测试
```

## 新增数据文件

```text
data/schema-versions.json
data/lifecycle-policy.json
data/snapshot-policy.json
```

## 新增运行时代码

```text
src/lib/schema-version.ts
src/lib/lifecycle.ts
src/lib/snapshots.ts
src/lib/event-contracts.ts
```

## 新增脚本

```text
scripts/check-world-contracts.ts
scripts/create-snapshot-plan.ts
```

## 新增命令

```bash
npm run check:contracts
npm run snapshot:plan -- "reason"
```

## 骨架价值

```text
版本化保证未来能迁移。
生命周期保证节点能生长。
事件契约保证时间河可信。
快照策略保证重大变更可回退。
契约测试保证未来改动不破坏世界底线。
```
