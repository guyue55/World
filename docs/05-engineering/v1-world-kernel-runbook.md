# 古月浮屿｜V1 世界内核运行手册

> 用途：后续开发时，如何安全修改世界骨架。

## 1. 每次开发前

确认本次变更属于哪一层：

```text
copy
content
projection
relation
schema
visibility
kernel
```

查看：

```text
data/change-admission-policy.json
```

## 2. 修改内容或数据后

执行：

```bash
npm run check:world-core
```

## 3. 修改 schema / visibility / AI 边界前

先生成快照计划：

```bash
npm run snapshot:plan -- "reason"
```

## 4. 修改重大架构判断时

新增或更新 ADR：

```text
docs/09-adr/
```

并更新：

```text
data/adr-index.json
```

## 5. 修改核心文档时

更新：

```text
data/documentation-registry.json
```

## 6. 判断是否能进入下一阶段

执行：

```bash
npm run check:foundation
npm run foundation:print
```

## 7. 最终原则

```text
任何让世界更复杂的动作，
都必须先让骨架更清楚。
```
