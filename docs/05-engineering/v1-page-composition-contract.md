# 古月浮屿｜V1 页面装配契约

> 阶段：V1
> 性质：页面化工程骨架
> 目标：让页面只负责装配、metadata 和投影选择，不承载核心领域规则。

## 1. 契约文件

```text
data/page-composition-contract.json
```

## 2. 核心原则

```text
页面是装配层，
不是领域规则层。
```

## 3. 页面类型

```text
entrance
map
kernel-status
archive
path
node-detail
identity
ai-entry
```

## 4. 页面规则

```text
page.tsx 只负责页面装配、metadata 和数据投影选择。
page.tsx 不直接写权限矩阵、不直接遍历私密层。
复杂页面必须拆成 section/panel/card。
动态页面必须通过 lib 读取可投影数据。
页面必须有 fallback 或 empty state。
未来页面必须先登记 route manifest 和 page kind。
```

## 5. 最终原则

```text
页面只装配，
不拥有世界规则。
```
