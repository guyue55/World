# 世界数据守门人

世界可以浪漫，但数据必须清醒。

V1 使用 Zod 和脚本校验：

```bash
npm run validate:world
npm run check:public
```

守门规则包括：

- public 节点必须有 summary
- path 不能引用不存在的节点
- relation 不能引用不存在的节点
- private / vault 不进入公开构建
- AI 未审核内容不可公开
