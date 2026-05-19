# 古月浮屿｜V1 第二十批骨架压舱石打磨说明

> 本文件说明第二十批变更：把世界宪章、核心原则、长期不变量、反脆弱策略和未来压力测试纳入世界骨架。

## 本次重点

第二十批解决：

```text
世界宪章运行化
原则到检查映射
长期不变量
反脆弱策略
未来压力测试
压舱石检查
```

## 新增数据

```text
data/world-charter-runtime.json
data/principle-check-map.json
data/long-term-invariants.json
data/anti-fragility-strategy.json
data/future-stress-tests.json
```

## 新增代码

```text
src/lib/ballast.ts
```

## 新增脚本

```text
scripts/check-ballast.ts
scripts/print-ballast-report.ts
```

## 新增命令

```bash
npm run check:ballast
npm run ballast:print
```

## 骨架价值

```text
宪章进入运行时。
原则进入检查链路。
长期不变量成为压舱石。
未来压力测试提前暴露风险。
世界在复杂度中变得更清楚。
```

## 核心判断

```text
原则若不能落到检查，
就会在未来复杂度中失效。
```
