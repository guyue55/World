# V1 World Kernel Runbook

状态：R8 审查修复线补齐。

## 目标

给维护者提供世界内核检查、文档注册、公开索引和隐私边界的最小运行说明。

## 本地门禁

```bash
npm run check
npm run check:strict
npm run check:routes
npm run build
```

## 运行原则

- 世界内核保持协议优先。
- 公开索引不得暴露私密内容。
- AI 只能作为增强层，不能自动越权。
- owner-only 路由必须经过服务端 owner token 守门。
