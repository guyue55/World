# 古月浮屿｜V1 快照与恢复策略

> 阶段：V1
> 性质：世界长期维护与安全演化策略
> 目标：在重大迁移、协议修改、批量内容变化前，保留可回退的世界状态。

## 1. 快照策略文件

```text
data/snapshot-policy.json
```

## 2. 什么时候必须快照

以下变化前必须快照：

```text
schema breaking change
bulk node migration
visibility policy change
AI indexing policy change
private/archive restructuring
```

## 3. 快照计划命令

```bash
npm run snapshot:plan -- "visibility policy change"
```

输出：

```text
snapshots/YYYY-MM-DD-v0.1.0-visibility-policy-change.plan.json
```

## 4. 快照包含

```text
data/
content/
docs/00-overview/
docs/01-world/
docs/05-engineering/
```

## 5. 快照不包含

```text
.next/
node_modules/
public/world-index.json
```

## 6. 最终原则

```text
世界可以继续生长，
但每次大规模改变前都要留下可回望的根。
```
