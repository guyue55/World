# World Kernel Mainline Clean

## 本批目标

在最新 main 基线上做第一批干净的 World Kernel 收敛，不新增 V / R 概念扩张线。

## 已完成

```text
1. 抽离 WorldRuntimeStack。
2. 精简 WorldShell。
3. 建立主线内核审计文档。
4. 建立主线边界数据。
5. 建立轻量主线边界检查脚本。
```

## 未改变

```text
路由不变。
权限规则不变。
页面动态层不删除。
不声明 production-ready。
```

## 后续

```text
1. 本地执行 npx tsx scripts/check-world-kernel-mainline.ts。
2. 拆分 check:world-core。
3. 合并重复 R8.x 投影层。
4. 修复 next build clean exit。
```
