# World Kernel Mainline Audit

## 结论

当前 `main` 已经包含 R8 系列动态宇宙能力。项目已经不是普通博客，而是一个高完成度的叙事型前端世界原型。下一步不应继续新增 V / R 概念线，而应优先收敛为可维护的 World Kernel。

专业定位：

```text
State-driven content world renderer
```

也就是：

```text
Core Model 提供事实。
Runtime Rules 提供确定性行为。
Presentation Projections 提供世界感、场景、仪式和动效。
```

## 已确认事实

### Core Model

`src/lib/types.ts` 已集中定义：

```text
Visibility
LifeStage
Node
Area
Relation
Path
WorldEvent
WorldState
```

这些应被视为长期事实内核，不应在组件层、页面层或 R8.x 动态层重复定义。

### 权限边界

`src/lib/visibility.ts` 已保留公开守门规则：

```text
public / semiPublic 可以进入公开表面。
private / family / partner / vault / sealed / silent 必须排除在公开构建和公开 AI 上下文之外。
```

这符合权限准则：后端与数据层控制权限，前端只负责显隐体现。

### WorldShell 耦合

原 `WorldShell` 直接装配多组 R8.x 动态投影层。第一批改动已将投影层抽离到 `WorldRuntimeStack`，让 `WorldShell` 回到页面骨架职责。

## 三层边界

### 1. Core Model

唯一事实层：

```text
src/lib/types.ts
src/lib/nodes.ts
src/lib/paths.ts
src/lib/visibility.ts
data/domains/**
```

### 2. Runtime Rules

无 AI 也必须成立的确定性规则：

```text
公开构建守门
搜索可见性
路径生成
时间河生成
节点生命周期判断
发布证据边界
```

### 3. Presentation Projections

负责世界感与体验，但不能成为事实来源：

```text
WorldShell
WorldRuntimeStack
Atlas / Timeline / Archive / Lighthouse / Node page
Universe / Living / Scene / Civilization 视觉与交互投影
```

## 禁止继续扩张

```text
不新增 V11 / R9 / R8.10 等概念扩张线。
不在组件层重新定义 Node / Area / Relation / WorldState。
不用前端硬编码隐藏代替权限控制。
不把 artifact verification 记为 clean production-ready。
不继续向 WorldShell 直接追加新的动态层 import。
```

## 下一步

```text
1. 将检查脚本拆分为 core / runtime / release / legacy。
2. 合并重复动态宇宙层。
3. 将世界运行事实迁回 data/domain。
4. 修复 Next build clean exit 与 CI 可信证据。
```
