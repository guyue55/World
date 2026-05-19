# 古月浮屿｜V1 本地验收运行器

> 阶段：V1
> 性质：第一阶段收口执行入口
> 目标：让真实构建验收可以被后来者重复执行。

## 1. 文件

```text
data/local-acceptance-runner.json
data/first-stage-acceptance-report-schema.json
scripts/run-first-stage-acceptance.mjs
```

## 2. 命令

```bash
npm run acceptance:local
```

该命令会执行：

```text
npm run lint
npm run typecheck
npm run check:world-core
npm run build
```

并生成：

```text
reports/first-stage-acceptance-report.json
```

## 3. 注意

命令检查通过并不等于第一阶段完成。仍需补：

```text
浏览器多端 QA
性能实测
预览部署
缺陷登记关闭
```
