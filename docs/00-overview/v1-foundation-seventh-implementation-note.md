# 古月浮屿｜V1 第七批地基打磨说明

> 本文件说明第七批变更：继续打磨世界/宇宙骨架，为以后打下坚实基础。

## 本次重点

本次不是做视觉，不是加外围功能，而是补世界骨架的“地基约束”：

```text
协议注册表
世界清单
规则执行器
公开索引
不变量检查
边界测试
世界状态页增强
```

## 新增能力

### 1. 世界协议注册表

```text
data/world-protocol-registry.json
```

让每个世界对象都有归属：

- 数据文件
- 运行时模块
- 所属层级
- 最小要求
- 公开构建边界

### 2. 世界清单

```text
data/world-manifest.json
```

用于未来导出、迁移、传承和外部工具读取。

### 3. 规则执行器

```text
src/lib/rules.ts
```

将规则从文档转成可运行检查。

### 4. 公开世界索引

```text
src/lib/public-index.ts
src/app/world-index.json/route.ts
scripts/build-public-world-index.ts
```

确保公开层有明确、可导出、可检查的索引。

### 5. 世界不变量

```text
src/lib/world-invariants.ts
scripts/check-world-invariants.ts
```

把骨架底线转成可执行检查。

### 6. 状态与骨架页面增强

```text
src/components/world/WorldInvariantPanel.tsx
src/app/status/page.tsx
src/app/skeleton/page.tsx
```

让不变量不只存在于脚本中，也能被看见。

## 新增命令

```bash
npm run check:invariants
npm run build:world-index
npm run check:world-core
```

## 核心判断

```text
世界/宇宙骨架不是页面风格，
而是一组可以被注册、检查、导出、投影和治理的协议。
```
