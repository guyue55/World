# 古月浮屿｜V1 第二十一批模块化工程骨架打磨说明

> 本文件说明第二十一批变更：把模块化、组件化、高内聚、低耦合固化为世界工程骨架。

## 本次重点

第二十一批解决：

```text
模块边界
依赖方向
组件职责
扩展接口
反耦合守卫
中大型项目演进约束
```

## 新增数据

```text
data/module-architecture-contract.json
data/dependency-direction-contract.json
data/component-contract.json
data/extension-interface-contract.json
data/coupling-guard.json
```

## 新增代码

```text
src/lib/architecture-contracts.ts
```

## 新增脚本

```text
scripts/check-architecture-contracts.ts
scripts/print-architecture-report.ts
```

## 新增命令

```bash
npm run check:architecture
npm run architecture:print
```

## 骨架价值

```text
模块边界被数据化。
依赖方向被显性化。
组件职责被约束。
扩展接口提前预留。
反耦合规则进入检查链路。
```

## 核心判断

```text
未来项目越大，
越不能靠记忆维持结构，
必须靠契约维持边界。
```
