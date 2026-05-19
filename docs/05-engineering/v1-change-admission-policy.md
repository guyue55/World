# 古月浮屿｜V1 变更准入策略

> 阶段：V1
> 性质：未来开发准入制度
> 目标：让任何后续变更都知道自己正在改变哪一层骨架。

## 1. 准入策略文件

```text
data/change-admission-policy.json
```

## 2. 变更层级

```text
copy
content
projection
relation
schema
visibility
kernel
```

## 3. 阻断条件

```text
breaks visibility boundary
puts private content into public index
allows AI to read vault/sealed/silent
removes no-AI fallback
removes export path
removes schema version
breaks check:world-core
```

## 4. 最终原则

```text
越接近内核，
变更门槛越高。
```
