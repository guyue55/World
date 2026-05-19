# ADR-0006｜未来扩展通过注册点进入世界

## 状态

Accepted

## 背景

古月浮屿未来会扩展创世台、AI 灯塔、私密档案、时间胶囊、年度世界册、2.5D 地图、星图等能力。如果没有扩展注册机制，未来功能会直接侵入核心。

## 决策

未来能力必须通过：

```text
extension-registry
capability-slots
module-boundaries
fallback-strategy
compatibility-matrix
```

进入世界。

## 后果

好处：

```text
未来可扩展
核心不易被污染
每个能力都有边界和降级路径
```

代价：

```text
新能力需要先登记
实验功能不能绕过协议
```

## 结论

```text
无限发展不是无限堆功能，
而是所有未来功能都有可登记、可检查、可降级的入口。
```
