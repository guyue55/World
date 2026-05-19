# 古月浮屿｜V1 依赖方向与反耦合守卫

> 阶段：V1
> 性质：依赖治理和反耦合策略
> 目标：防止未来中大型项目演进时出现规则污染、组件膨胀和内核反向依赖页面。

## 1. 依赖方向

```text
src/app        → src/components / src/lib / data
src/components → src/lib / data
src/lib        → data
scripts        → src/lib / data
```

禁止：

```text
src/lib → src/app
src/lib → src/components
src/components → src/app
data → src
scripts → src/app
```

## 2. 反模式

```text
page-domain-rule
component-protocol-owner
script-rule-duplication
data-hidden-runtime
god-lib-file
future-core-leak
docs-out-of-band
```

## 3. 软限制

```text
lib file <= 260 lines
component file <= 220 lines
page file <= 180 lines
script file <= 260 lines
```

## 4. 最终原则

```text
低耦合不是少写代码，
而是让变化只发生在该发生的地方。
```
