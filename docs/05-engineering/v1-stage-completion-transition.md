# 古月浮屿｜V1 阶段完成状态转换守卫

> 阶段：V1
> 性质：阶段完成状态保护
> 目标：只有最终关闭报告为 complete 时，才允许更新第一阶段完成状态。

## 1. 文件

```text
data/stage-completion-transition-guard.json
data/stage-completion-certificate-template.json
scripts/apply-stage-completion.mjs
```

## 2. 命令

```bash
npm run stage:complete
```

该命令会读取：

```text
reports/first-stage-final-closure-report.json
```

只有当报告决策为：

```text
complete
```

才会更新：

```text
data/stage-completion-gate.json
data/phase-one-final-decision-template.json
reports/first-stage-completion-certificate.json
```

## 3. 核心判断

```text
阶段状态只能由完整证据推动，
不能由人工感觉推动。
```
