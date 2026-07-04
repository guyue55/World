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


## RC5 API 与脚本边界规则

新增或修改 API route 时必须遵守：

1. 所有 `src/app/api/**/route.ts` 必须登记到 `data/world-kernel/worldos-api-boundary-registry-v1.json`。
2. 公开 API 只能使用 `GET`，且只能暴露 public / static-safe 数据。
3. 任何写入、占位写入、运行态内存写入或未来持久化写入，必须由服务端 `requireOwner` 或 `requirePermission` 守门。
4. 前端显隐、按钮隐藏、世界语言提示都不能作为权限控制依据。
5. 修改 API 后必须运行：

```bash
npm run check:api-boundary
```

脚本治理规则：

1. 不再新增 `check:r*`、`check:v*`、`check:stage*`、`check:round*` 作为默认开发入口。
2. 历史阶段脚本保留为 legacy/reference，统一由 `data/world-kernel/worldos-script-legacy-registry-v1.json` 跟踪。
3. 新检查能力优先接入短入口：`check:mainline`、`check:content`、`check:experience:public`、`check:api-boundary`、`check:scripts`。
4. 修改脚本后必须运行：

```bash
npm run check:scripts
```

## WorldOS 1.0 RC6 长期维护命令脊柱规则

RC6 后，默认开发不要从 700+ 历史脚本里挑命令，优先使用稳定入口：

```bash
npm run check:daily
npm run check:boundary
npm run check:rc:fast
npm run check:rc:full
```

使用约定：

1. 普通代码、内容、文档改动后运行 `npm run check:daily`。
2. 修改 API、脚本、治理注册表、默认入口时运行 `npm run check:boundary`。
3. 本地候选发布快检运行 `npm run check:rc:fast`。
4. 提交、打包、交付前运行 `npm run check:rc:full`。
5. 新增短入口必须同步更新 `data/world-kernel/worldos-maintenance-command-spine-v1.json`。
6. 新增阶段型脚本默认不允许作为开发入口；历史阶段脚本只保留为 legacy/reference。
7. 没有真实外部证据时，不得把 `productionLive`、`releaseReady`、`cleanProductionReady` 改为 true。

RC6 的专用门禁：

```bash
npm run check:maintenance-command-spine
```

## WorldOS 1.0 RC7 本地运行时 HTTP Smoke 规则

RC7 后，打包或交付前的完整本地验证必须覆盖真实 HTTP 行为：

```bash
npm run check:runtime-local
npm run smoke:runtime-local
npm run check:rc:full
```

使用约定：

1. `check:runtime-local` 只检查本地运行时 smoke 的注册表、脚本、文档和生产状态诚实性。
2. `smoke:runtime-local` 会启动本地 `next start`，检查公开 HTML 路由、静态 JSON、robots、sitemap、legacy redirect、private guard 和 404。
3. `check:rc:full` 已接入 `smoke:runtime-local`，适合提交、打包、交付前执行。
4. 本地 HTTP smoke 不等于真实外部部署证据，不得因此把 `productionLive`、`releaseReady`、`cleanProductionReady` 改为 true。
5. 修改公开路由、legacy redirect、private/internal guard、public JSON、robots、sitemap 时，必须同步更新 `data/world-kernel/worldos-local-runtime-smoke-v1.json`。
6. 前端显隐仍不是权限控制；private/internal 路由必须由服务端 route policy / middleware / API guard 约束。
