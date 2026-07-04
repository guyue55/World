# Contributing

## 当前开发策略

项目处于 **World Kernel 收束期**。除非是安全、可访问性、构建阻断或生产证据相关修复，否则不要继续新增功能线。

允许的变更：

```text
architecture-audit
kernel-consolidation
route-boundary-hardening
script-consolidation
production-evidence
bug-fix
accessibility-fix
security-fix
documentation-of-current-state
```

禁止的变更：

```text
new-r8-line
new-v-line
new-major-world-concept
new-dynamic-universe-runtime
new-public-stage-page
new-build-wrapper-without-root-cause
frontend-only-permission-enforcement
```

## Commit 规范

使用中文描述，格式示例：

```text
feat(kernel): 收束世界内核路由守门
chore(audit): 增加世界内核架构审计
fix(boundary): 修复私密路由服务端拦截
```

## 提交前门禁

至少执行：

```bash
npm run check:world-kernel-audit
npm run check:product-release
npm run lint
npm run typecheck
npm run check
npm run check:routes
```

如涉及生产交付，还需要：

```bash
npm run build:verify-artifacts
npm run audit:report
```

## 权限原则

后端 / middleware / 数据层控制权限，前端只做体验呈现和显隐提示。不得把私密、vault、family、partner、internal、stage route 的安全边界只写在前端组件里。
