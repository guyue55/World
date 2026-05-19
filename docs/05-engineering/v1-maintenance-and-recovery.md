# 古月浮屿｜V1 维护日历与恢复路径

> 阶段：V1
> 性质：长期维护和灾备策略
> 目标：让世界敢于生长，因为它知道如何恢复。

## 1. 维护日历

```text
data/maintenance-calendar.json
```

节奏：

```text
weekly
monthly
quarterly
before-major-change
```

## 2. 恢复路径

```text
data/recovery-playbook.json
```

场景：

```text
data-rollback
content-rollback
visibility-leak
ai-boundary-violation
schema-migration-fail
build-fail
```

## 3. 核心原则

```text
世界为生活服务，
不让生活服务世界。
```

## 4. 恢复原则

```text
恢复优先于继续开发。
visibility leak 和 AI boundary violation 视为 critical。
恢复后必须留下记录。
恢复流程不得依赖未来高级能力。
```
