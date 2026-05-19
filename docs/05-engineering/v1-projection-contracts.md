# 古月浮屿｜V1 投影契约

> 阶段：V1
> 性质：页面投影边界与一致性检查
> 目标：确保页面只是投影，投影不能绕过世界协议。

## 1. 契约文件

```text
data/projection-contracts.json
```

## 2. 投影目标

```text
home
atlas
archive
timeline
path
detail
ask
```

## 3. 核心契约

```text
首页投影必须来自精选节点。
Atlas 投影必须有 areaId。
Archive 投影必须可搜索。
Timeline 投影必须来自 WorldEvent。
Path 投影不得引用不存在节点。
Ask 低光投影不得依赖私密内容。
```

## 4. 执行命令

```bash
npm run check:projections
```

## 5. 最终原则

```text
投影可以浪漫，
但不能绕过权限、关系、时间和路径协议。
```
