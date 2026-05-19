# 古月浮屿｜V1 第十五批运行态骨架打磨说明

> 本文件说明第十五批变更：把世界骨架从“能构建”推进到“能长期运营”。

## 本次重点

第十五批解决：

```text
世界运行态协议
错误分级
观测指标
维护日历
恢复路径
运行报告
```

## 新增数据

```text
data/world-runtime-protocol.json
data/error-taxonomy.json
data/observability-metrics.json
data/maintenance-calendar.json
data/recovery-playbook.json
```

## 新增代码

```text
src/lib/runtime-protocol.ts
src/lib/error-taxonomy.ts
src/lib/observability.ts
src/lib/maintenance.ts
```

## 新增脚本

```text
scripts/check-operations.ts
scripts/print-operations-report.ts
```

## 新增命令

```bash
npm run check:operations
npm run operations:print
```

## 骨架价值

```text
世界知道自己处于什么运行态。
维护者知道哪些错误会阻断构建。
世界健康可以被观测。
维护节奏不会压倒生活。
重大事故有恢复路径。
```
