# 古月浮屿｜V1 错误分级与观测指标

> 阶段：V1
> 性质：运行质量观测
> 目标：让维护者知道哪些问题只是提醒，哪些问题会真正破坏世界。

## 1. 错误分级文件

```text
data/error-taxonomy.json
```

## 2. 错误级别

```text
info
warning
error
critical
```

## 3. 观测指标文件

```text
data/observability-metrics.json
```

## 4. 关键指标

```text
kernelScore
blockingErrors
foundationScore
publicNodeCount
relationCount
pathCount
worldEventCount
registeredDocs
adrCount
fallbackCount
```

## 5. 最终原则

```text
阻断错误优先于分数。
```
