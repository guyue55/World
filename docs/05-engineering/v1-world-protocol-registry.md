# 古月浮屿｜V1 世界协议注册表

> 阶段：V1
> 性质：世界协议与骨架注册文档
> 目标：让世界对象、数据文件、运行时模块、页面与检查脚本之间的关系清晰、稳定、可追踪。

## 1. 为什么需要协议注册表

如果没有注册表，项目会逐渐变成：

```text
一堆 data
一堆 lib
一堆 pages
一堆 components
```

注册表的作用是回答：

```text
谁是世界对象？
它存在哪里？
由哪个模块读取？
参与哪一层骨架？
进入哪些页面投影？
由哪些规则守门？
```

## 2. 注册表文件

```text
data/world-protocol-registry.json
```

它注册：

- coreObjects
- layers
- publicBuild
- minimums

## 3. 核心对象

```text
worldState
area
node
relation
path
worldEvent
permission
rule
```

## 4. 七层骨架

```text
space
content
relation
time
projection
governance
interoperability
```

## 5. 公开构建边界

允许进入公开构建：

```text
public
semiPublic
```

不得进入公开构建：

```text
private
family
partner
vault
sealed
silent
```

## 6. 最小骨架不变量

V1 需要满足：

```text
areas >= 8
publicNodes >= 12
relations >= 6
paths >= 3
worldEvents >= 5
worldLayers >= 7
```

## 7. 对应运行时代码

```text
src/lib/rules.ts
src/lib/world-invariants.ts
src/lib/public-index.ts
scripts/check-world-invariants.ts
scripts/build-public-world-index.ts
```

## 8. 最终原则

```text
世界协议必须先被注册，才能长期演化。
```
