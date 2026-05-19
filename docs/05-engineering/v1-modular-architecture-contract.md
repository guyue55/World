# 古月浮屿｜V1 模块化架构契约

> 阶段：V1
> 性质：中大型项目工程地基
> 目标：把模块化、组件化、高内聚、低耦合固化为可检查的工程契约。

## 1. 契约文件

```text
data/module-architecture-contract.json
data/dependency-direction-contract.json
data/component-contract.json
data/extension-interface-contract.json
data/coupling-guard.json
```

## 2. 核心原则

```text
模块化不是目录好看，
而是让未来复杂度不会互相污染。
```

## 3. 分层职责

```text
src/app        路由、页面装配、metadata
src/components 可复用 UI、面板、布局片段
src/lib        领域逻辑、投影、校验、内核评估
data           协议、契约、策略、注册表
content        Markdown 内容星体
scripts        检查、报告、构建、迁移
docs           ADR、运行手册、架构契约
```

## 4. 最终原则

```text
页面只装配。
组件只展示。
lib 承载规则。
data 承载协议。
scripts 执行守门。
docs 留下判断。
```
