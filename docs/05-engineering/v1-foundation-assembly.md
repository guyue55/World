# 古月浮屿｜V1 地基装配清单

> 阶段：V1
> 性质：可复现装配协议
> 目标：确保世界骨架可以被重新装配、检查和交接。

## 1. 装配文件

```text
data/foundation-assembly-manifest.json
```

## 2. 核心原则

```text
地基必须能被重新装配，
未来才不会依赖某一次聊天或某一个人。
```

## 3. 装配内容

```text
mergeOrder
requiredRoots
requiredFiles
requiredCommands
```

## 4. 执行命令

```bash
npm run check:reproducibility
npm run assembly:print
```

## 5. 最终原则

```text
能复现，
才能长期传承。
```
