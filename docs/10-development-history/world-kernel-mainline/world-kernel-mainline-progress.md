# World Kernel Mainline Progress

## 当前批次

```text
批次：world-kernel-mainline-01
目标：在最新 main 基线上建立 World Kernel 收敛边界，并先降低 WorldShell 的表现层耦合。
状态：完成
```

## 已完成

```text
1. 关闭旧基线 PR，避免把旧 main 的大 diff 合入新版主线。
2. 新建 refactor/world-kernel-mainline 分支。
3. 抽离 src/components/world/WorldRuntimeStack.tsx。
4. 精简 src/components/world/WorldShell.tsx。
5. 新增 docs/03-engineering-architecture/world-kernel-mainline-audit.md。
6. 新增 data/world-kernel/mainline-boundary.json。
7. 新增 scripts/check-world-kernel-mainline.ts。
```

## 设计约束

```text
中文优先。
降低门槛，提高体验。
权限由数据和后端边界控制，前端只负责显隐体现。
不再新增概念扩张线。
先收敛，再上线，再演化。
```

## 当前未完成

```text
1. check-world-kernel-mainline 尚未接入 package.json。
2. check:world-core 尚未拆分为 core / release / legacy。
3. R8.x 多层动态投影仍未真正合并，只是先从 WorldShell 解耦。
4. next build clean exit / CI / preview smoke 尚未修复。
```

## 下一批建议

```text
world-kernel-mainline-02：拆分 package scripts，并把新检查纳入 check:core。
world-kernel-mainline-03：合并重复动态层，保留一个 route-aware runtime stack。
world-kernel-mainline-04：生产构建专项，恢复 deterministic build exit。
```
