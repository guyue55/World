# 古月浮屿｜V1 组件职责与扩展接口

> 阶段：V1
> 性质：组件化和未来扩展接口规范
> 目标：让组件保持展示职责，让未来能力通过接口进入，而不是侵入内核。

## 1. 组件职责

```text
shell
panel
card
navigation
content-renderer
```

规则：

```text
组件 props 应优先接收已投影数据，而不是直接重算世界规则。
组件可以读取 read-only helper，但不得改变数据协议。
大型页面区块优先拆成 panel/card，不写巨型页面文件。
未来视觉升级应替换组件实现，不改变 lib/data 协议。
```

## 2. 扩展接口

```text
ProjectionProvider
SearchProvider
AIGuideProvider
ExportProvider
VisualExperienceProvider
PrivateArchiveProvider
```

规则：

```text
Provider 只能通过注册表激活。
Provider 不得弱化 visibility。
实验 Provider 必须声明 fallback。
AI Provider 必须遵守 AI boundary。
Visual Provider 不得成为核心导航前置条件。
```

## 3. 最终原则

```text
扩展接口先于扩展实现，
避免未来功能直接侵入内核。
```
