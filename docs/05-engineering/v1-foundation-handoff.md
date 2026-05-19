# 古月浮屿｜V1 世界骨架阶段交接

> 阶段：V1
> 性质：从世界骨架阶段进入 V1 产品化阶段的交接说明
> 目标：让下一阶段清楚知道可以做什么、不能做什么、先检查什么。

## 1. 交接文件

```text
data/foundation-handoff-manifest.json
```

## 2. 交接原则

```text
交接不是结束，
而是让下一阶段有清晰边界、入口和禁区。
```

## 3. 下一阶段允许

```text
visual polish
content seed expansion
route UX refinement
component accessibility polish
deployment hardening
SEO polish
performance baseline
```

## 4. 下一阶段禁止

```text
breaking schema without migration
public/private boundary weakening
AI boundary weakening
removing fallback paths
activating future extension without registry entry
treating V6 visual experience as V1 dependency
```

## 5. 交接命令

```bash
npm run check:baseline
npm run handoff:print
```
