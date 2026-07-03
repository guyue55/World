# World Kernel Consolidation

## 结论

当前仓库已经具备完整的世界叙事层、检查脚本和多轮阶段文档，但工程上已经出现明显的抽象漂移：世界、宇宙、文明、场景、动态体验等概念不断叠加，而真正需要长期稳定的内核只有一组。

从现在开始，新增开发应优先收敛为一个可维护的 World Kernel，而不是继续开启新的 V / R 叙事轮次。

## 新定位

仓库的专业定位调整为：

```text
State-driven content world renderer
```

也就是：

```text
数据协议负责真实世界事实。
规则引擎负责自然演化。
投影层负责把同一份内容呈现为地图、时间河、路径、档案和节点页。
表现层负责世界感、仪式感和动效。
```

## 三层架构

### 1. Core Model

唯一事实层。只允许这里定义世界的核心事实。

权威文件：

```text
src/lib/types.ts
data/domains/experience/*.json
```

归属：

```text
Node
Area
Relation
Path
WorldEvent
WorldState
Visibility
LifeStage
```

要求：

```text
核心类型只能定义一次。
组件、页面和动态体验层不能重新定义同名核心模型。
私密边界必须在数据与规则层成立，不能只靠 UI 隐藏。
```

### 2. Runtime Rules

确定性规则层。无 AI 时也必须可运行。

职责：

```text
公开可见性判断
节点生命周期判断
路径和时间河生成
公开索引守门
构建和发布边界检查
```

要求：

```text
AI 只能增强规则解释，不能替代规则存在。
所有自动判断必须可解释、可审计、可关闭。
```

### 3. Presentation Layer

表现投影层。负责世界感，但不能成为事实来源。

归属：

```text
src/app
src/components
src/features
```

允许：

```text
WorldShell
Atlas
Timeline
Archive
Lighthouse
Universe / Civilization / Scene 作为 UI 投影语义
```

禁止：

```text
在表现层重新定义 Node / Area / Relation / WorldState 的事实模型。
让 artifact verification 伪装成 production-ready。
让新的世界叙事轮次绕过 Core Model。
```

## 立即执行原则

### 停止新增版本线

不再新增 V11、R9、R8.x 继续扩张线，除非它们明确服务于以下三类任务：

```text
1. 修复生产构建与部署链路。
2. 合并重复的表现层抽象。
3. 把分散的世界数据收束回 Core Model。
```

### 优先修复生产线

当前 `build:verify-artifacts` 只能证明关键产物存在，不能证明生产构建完整可靠。上线前必须恢复 clean build / CI / preview / smoke / rollback 的闭环。

### 保留世界感，降低系统熵

世界语言可以保留，但每个世界名必须有现实解释。新功能必须回答：

```text
它的数据来源是什么？
它是否属于 Core Model？
没有 AI 时如何运行？
谁能看到它？
它如何回到地图、时间河、档案馆或节点页？
```

## 推荐的下一批工程任务

```text
1. 建立 World Kernel consolidation gate。
2. 把超长 check:world-core 拆成 core / release / legacy 三类。
3. 清理重复动态宇宙组件，只保留一个 route-aware shell。
4. 让 Node / Area / Relation / WorldState 成为唯一事实入口。
5. 恢复 next build 的 deterministic exit，而不是继续依赖 artifact wrapper。
6. 建立真实 Preview URL 和 smoke evidence。
```

## 非目标

```text
不删除世界观。
不取消动态体验。
不把项目退回普通博客。
不在没有基线的情况下大面积重写。
```

本文件是后续重构的工程护栏：先收束，再上线，再演化。
