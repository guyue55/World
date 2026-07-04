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
npm run check:world-kernel-consolidation
npm run check:world-kernel-production
npm run smoke:kernel-local
npm run check:product-release
npm run lint
npm run typecheck
npm run check
npm run check:routes
```

如涉及生产交付，还需要：

```bash
npm run build:kernel-release
npm run build:verify-artifacts
npm run audit:report
npm run evidence:kernel-local
```

## 权限原则

后端 / middleware / 数据层控制权限，前端只做体验呈现和显隐提示。不得把私密、vault、family、partner、internal、stage route 的安全边界只写在前端组件里。

## 内核收束开发规则

1. 不新增 R8.x / V11 / 新动态宇宙 runtime。
2. 新公开页面必须先进入 `src/lib/product-routes.ts` 路由策略，并通过 `check:legacy-boundary`。
3. 正式公开页面不得直接 import `@/components/r8-*` 或 `@/features/r8-*`。
4. 私密、家庭、vault、AI 审计和创世台能力必须由服务端路由边界守门，前端只能做显隐体现。
5. 日常提交前优先运行：`npm run check:world-kernel-consolidation && npm run check:product-release`。
6. 任何真实上线声明必须有 Preview / Production URL、线上 smoke test、人工签收和回滚演练证据。


## K5 本地生产证据规则

1. 允许补齐本地 release evidence、local smoke、CI/部署说明和证据台账。
2. 不允许在没有真实外部 Preview / Production URL 的情况下把 `productionLive`、`releaseReady`、`cleanProductionReady` 改为 `true`。
3. `check:release` 是当前 World Kernel 本地发布门禁；旧阶段发布链路只能作为 `check:release:legacy` 参考。
4. 任何线上签收必须包含：Preview URL、Production URL、线上 smoke test、域名 HTTPS、sitemap/robots 在线验证、人工签收和回滚演练。

## RC2 内容与体验门禁规则

当暂时无法部署时，允许继续处理本地可验证的问题，但必须优先解决：

```text
内容密度
公开路径
关系解释
区域自解释
反迷路体验
legacy runtime 防回流
```

新增或修改公开内容时，需要运行：

```bash
npm run check:worldos-content-density
npm run check:worldos-public-experience
```

公开路径不得引用 private / family / partner / vault / sealed / silent 节点。强关系需要 `note` 解释为什么相连，避免星图只有连线没有语义。

## RC3 主线治理规则

RC3 后，日常开发优先使用短门禁：

```bash
npm run check:mainline
npm run lint
npm run typecheck
```

内容或体验变更分别运行：

```bash
npm run check:content
npm run check:experience:public
```

候选发布本地快检：

```bash
npm run check:release:rc:fast
```

新增页面、组件或脚本时遵守：

1. 正式公开页面不得直接导入 `@/components/r8-*`、`@/features/r8-*`、私密层或旧阶段 runtime。
2. 新检查能力优先接入 `check:mainline` / `check:content` / `check:experience:public`，不要继续扩展新的阶段聚合链。
3. 新公开节点必须有 `contentPath`、`worldTitle`、summary、权限、生命阶段和来源。
4. 强关系必须写 `note`，避免星图只有连线没有语义。
5. 新路径不得引用非公开节点。
6. production 状态只能由真实外部证据改变。
