# 古月浮屿｜V1 环境基线与仓库结构契约

> 阶段：V1
> 性质：工程地基契约
> 目标：保证工具链、目录、命令与世界骨架之间关系清晰。

## 1. 环境基线

```text
data/environment-baseline.json
```

基线：

```text
Node >= 20
npm
Next.js
TypeScript
```

## 2. 仓库结构契约

```text
data/repository-structure-contract.json
```

核心根目录：

```text
data
content
docs
src/app
src/components
src/lib
scripts
public
```

## 3. 禁止事项

```text
把核心数据硬编码在组件里
让页面直接决定 visibility
让 AI 逻辑读取私密层
让未来实验能力覆盖 core namespace
把文档只作为说明而不进入检查
```

## 4. 最终原则

```text
仓库结构是世界骨架的物理显影。
```
