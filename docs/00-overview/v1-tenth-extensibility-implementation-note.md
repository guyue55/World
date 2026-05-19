# 古月浮屿｜V1 第十批扩展地基打磨说明

> 本文件说明第十批变更：继续打磨世界/宇宙骨架的未来扩展能力。

## 本次重点

第十批解决：

```text
未来无限扩展
但不破坏 V1 地基
```

新增：

```text
扩展点注册表
能力插槽
模块边界
未来阶段兼容层
类型注册表
扩展契约检查
```

## 新增数据

```text
data/extension-registry.json
data/capability-slots.json
data/module-boundaries.json
```

## 新增代码

```text
src/lib/extensions.ts
src/lib/future-compatibility.ts
src/lib/type-registries.ts
```

## 新增脚本

```text
scripts/check-extension-registry.ts
scripts/print-future-roadmap.ts
```

## 新增面板

```text
src/components/world/ExtensionRegistryPanel.tsx
src/components/world/FutureRoadmapPanel.tsx
```

## 新增命令

```bash
npm run check:extensions
npm run roadmap:print
```

## 骨架价值

```text
V2 创世台有入口。
V3 AI 增强有边界。
V4 私密系统有隔离。
V5 展览与传承有导出基础。
V6 高级体验有降级前提。
```

## 核心判断

```text
无限发展不是无限堆功能，
而是所有未来功能都有可登记、可检查、可降级的入口。
```
