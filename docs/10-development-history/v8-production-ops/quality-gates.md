# V8 Quality Gates

## 阶段门禁

```text
check:v8-production:stage-01: passed
lint after stage-01: passed
check:v8-production:stage-02: passed
lint after stage-02: passed
check:v8-production:stage-03: passed
lint after stage-03: passed
check:v8-production:stage-04: passed
lint after stage-04: passed
```

## 最终门禁

```text
check:json: passed
check:repo: passed
check:v8-production:all: passed
check:v8-production:boundary: passed
lint: passed
typecheck: passed
audit:report: passed, total=2, moderate=2, high=0, critical=0
build: timeout in current container during Next production build / page data or trace collection
```

## 状态边界

`productionLive=false`，`releaseReady=false`，`cleanProductionReady=false`。

V8 已完成代码、数据、页面、组件、文档与检查脚本结构闭环，但真实生产发布必须等待目标环境中的完整构建、预览环境 smoke、生产 URL、人工签收和回滚演练证据。
