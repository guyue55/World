# ADR-0005｜世界对象采用 Markdown + JSON 协议

## 状态

Accepted

## 背景

世界需要既能被人阅读，又能被程序检查、投影、导出和迁移。

## 决策

V1 使用：

```text
Markdown 表达正文
JSON 表达结构化协议
TypeScript 表达运行时类型和检查
```

## 后果

好处：

```text
人可读
机器可查
Git 可追踪
AI 可辅助但不绑定
```

代价：

```text
需要维护 JSON 数据一致性
需要脚本守门
```

## 结论

```text
内容是星体，
协议是骨架。
```
