# World Kernel Mainline Audit

## 审计结论

当前 `main` 已包含 R8 系列动态宇宙能力，项目已经从普通页面集合推进到高完成度的叙事型前端世界原型。但工程上必须切换重心：停止继续新增版本线，优先收敛世界内核、压缩重复投影层、恢复真实生产构建链路。

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

### 1. Core Model 已有较好基础

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

这应被视为后续长期事实内核，不应在组件层、R8.x 运行层、页面层重复定义同名核心模型。

### 2. 权限基础规则已有

`src/lib/visibility.ts` 已提供：

```text
isPublicVisible
isSearchableVisibility
mustExcludeFromPublicBuild
```

并明确排除：

```text
private / family / partner / vault / sealed / silent
```

这符合权限准则：后端与数据层控制权限，前端只控制体现，不能靠前端硬编码隐藏来保护敏感内容。

### 3. WorldShell 耦合过高

最新 `WorldShell` 原本直接 import 并渲染多组 R8.x 动态层：

```text
r8-dynamic-world
r8-deep-dynamic-world
r8-full-dynamic-world
r8-living-universe
r8-complete-universe
r8-sensory-universe
r8-interactive-universe
r8-scene-universe
r8-civilization-universe
```

这说明表现层能力已经很丰富，但装配边界过宽。第一步已将这些投影层抽离到 `WorldRuntimeStack`，让 `WorldShell` 回到页面骨架职责。

## 三层边界

### Core Model

事实模型，只能集中维护。

```text
src/lib/types.ts
src/lib/nodes.ts
src/lib/paths.ts
src/lib/visibility.ts
data/domains/**
```

职责：

```text
节点、区域、关系、路径、事件、世界状态、权限、生命周期。
```

### Runtime Rules

确定性规则，无 AI 也必须运行。

职责：

```text
公开构建守门
搜索可见性
路径生成
时间河生成
节点生命周期判断
发布证据边界
```

要求：

```text
可解释
可审计
可回滚
可停止
不依赖真实 AI
```

### Presentation Projections

表现层投影，负责世界感与体验。

职责：

```text
WorldShell
WorldRuntimeStack
Atlas / Timeline / Archive / Lighthouse / Node page
Universe / Living / Scene / Civilization 视觉与交互投影
```

要求：

```text
不能重新定义事实模型
不能控制真实权限
不能把 artifact verification 伪装为 clean production-ready
```

## 当前禁止继续做的事

```text
不再新增 V11 / R9 / R8.10 等概念扩张线。
不再把新的世界叙事直接塞进 WorldShell。
不在组件层创建第二套 Node / Area / Relation / WorldState。
不把 UI 隐藏当作权限控制。
不把 build artifact verification 当作真实生产发布证明。
```

## 当前允许且优先做的事

```text
1. 合并重复动态宇宙层。
2. 将世界运行事实回归 Core Model。
3. 拆分超长 check:world-core。
4. 修复 deterministic next build / CI exit。
5. 建立真实 Preview / Production smoke evidence。
6. 保持中文体验与低门槛入口。
```

## 第一批落地结果

```text
新增：src/components/world/WorldRuntimeStack.tsx
更新：src/components/world/WorldShell.tsx
新增：data/world-kernel/mainline-boundary.json
新增：scripts/check-world-kernel-mainline.ts
```

## 下一批建议

```text
1. 将 check:world-core 拆成 check:core / check:release / check:legacy。
2. 用 WorldRuntimeStack 管理所有 route-aware 投影层的开关与分组。
3. 逐步把 R8.x 数据中的事实字段迁回 data/domain。
4. 建立 production build blocker 专项。
```
