# ADR-0004｜公开层与私密层构建隔离

## 状态

Accepted

## 背景

古月浮屿未来会包含生活、家庭、伴侣、孩子、私密档案和保险箱内容。公开站点必须从骨架上避免误泄漏。

## 决策

V1 公开构建只允许：

```text
public
semiPublic
```

禁止进入公开构建：

```text
private
family
partner
vault
sealed
silent
```

## 后果

好处：

```text
公开层边界稳定
私密系统未来可扩展
AI 索引边界清晰
```

代价：

```text
部分内容需要维护公开版本
私密预览不在 V1 公开站点中实现
```

## 结论

```text
公开层不是完整世界。
```
