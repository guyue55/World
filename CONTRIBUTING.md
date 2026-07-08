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
npm run release:local-rc
```

使用约定：

1. 普通代码、内容、文档改动后运行 `npm run check:daily`。
2. 修改 API、脚本、治理注册表、默认入口时运行 `npm run check:boundary`。
3. 本地候选发布快检运行 `npm run check:rc:fast`。
4. 提交、打包、交付前优先运行 `npm run release:local-rc`；`npm run check:rc:full` 保留为兼容入口。
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
npm run release:local-rc
npm run check:rc:full
```

使用约定：

1. `check:runtime-local` 只检查本地运行时 smoke 的注册表、脚本、文档和生产状态诚实性。
2. `smoke:runtime-local` 会启动本地 `next start`，检查公开 HTML 路由、静态 JSON、robots、sitemap、legacy redirect、private guard 和 404。
3. `release:local-rc` 已接入 `build:production-ci`、`smoke:runtime-local` 和 `smoke:lan-local`，并会生成 `docs/90-archive/reports/worldos-local-rc-summary-report.json`，适合提交、打包、交付前执行；`check:rc:full` 保持兼容。
4. 本地 HTTP smoke 不等于真实外部部署证据，不得因此把 `productionLive`、`releaseReady`、`cleanProductionReady` 改为 true。
5. 修改公开路由、legacy redirect、private/internal guard、public JSON、robots、sitemap 时，必须同步更新 `data/world-kernel/worldos-local-runtime-smoke-v1.json`。
6. 前端显隐仍不是权限控制；private/internal 路由必须由服务端 route policy / middleware / API guard 约束。

## WorldOS 1.0 RC8 本地局域网 RC 规则

RC8 后，如果当前仍以本地部署为准，候选发布必须覆盖同一局域网内的真实访问：

```bash
npm run check:lan-local
npm run smoke:lan-local
npm run release:local-rc
npm run check:rc:full
```

使用约定：

1. `check:lan-local` 检查本地局域网 RC 注册表、脚本、命令入口、文档口径和 production 状态诚实性。
2. `smoke:lan-local` 会启动 `next start -H 0.0.0.0`，自动识别局域网 IP，并通过 `http://<局域网 IP>:<端口>` 检查公开路由、静态资源、legacy redirect、private/internal guard 和 404。
3. `smoke:lan-local` 会执行真实浏览器运行时巡检，覆盖桌面和移动端低动效，检查正文可读、H1、body 可见性、首页主 CTA、移动导航、核心状态卡、console/page error、网络失败、横向溢出和截图证据。
4. 修改公开路由、动态 surface、移动端布局、权限 guard、robots/sitemap/public JSON 后，必须同步更新 `data/world-kernel/worldos-local-lan-rc-v1.json` 并运行 `npm run check:lan-local`。
5. 本地局域网 RC 不等于真实外部部署证据，不得因此把 `productionLive`、`releaseReady`、`cleanProductionReady` 改为 true。
6. 前端显隐仍不是权限控制；LAN RC 只能验证服务端 guard 的结果，不能把隐藏按钮当作权限证明。
7. 验收产物策略以 `data/world-kernel/worldos-local-rc-evidence-policy-v1.json` 为准：提交规范化报告和截图，`reports/` 下的 next/chrome 日志只作为本地排障材料。

## 新维护者快速上手

### 环境准备

1. 安装 Node.js 20+ 和 npm
2. 克隆仓库后运行 `npm install`
3. 运行 `npm run check:daily` 确认门禁全绿
4. 运行 `npm run dev` 启动本地开发服务器（http://localhost:3000）

### 世界模型概览

古月浮屿的世界由五层数据组成：

- **节点（Node）**：最小知识单元，定义在 `data/domains/experience/nodes.json`
- **区域（Area）**：节点的容器，定义在 `data/domains/experience/areas.json`
- **关系（Relation）**：节点间的星线，定义在 `data/core/relations.json`
- **路径（Path）**：主题浏览序列，定义在 `data/domains/experience/paths.json`
- **事件（Event）**：世界时间线，定义在 `data/core/world-events.json`

每个节点的正文是独立的 Markdown 文件，路径在节点的 `contentPath` 字段中指定。

### 新增一个节点

1. 在 `nodes.json` 中添加节点定义（包含 id、slug、title、worldTitle、summary、areaId、tags、visibility、contentPath 等字段）
2. 在 `contentPath` 指定的路径创建 Markdown 文件（正文不少于 400 字符）
3. 在 `relations.json` 中为节点添加至少 1 条关系
4. 将节点 slug 加入至少 1 条公开路径的 `nodeSlugs`
5. 运行 `npm run check:daily` 验证

### 门禁体系

| 命令 | 用途 | 频率 |
|---|---|---|
| `npm run check:daily` | 日常门禁（类型 + lint + 内容 + 脚本） | 每次提交 |
| `npm run check:boundary` | 边界门禁（API + 权限 + 导入 + 交叉引用） | 涉及边界时 |
| `npm run release:local-rc` | 发布候选（日常 + 边界 + smoke + 构建） | 每 Phase |
| `npm run check:cross-references` | 交叉引用验证（断链 + 悬空引用） | 内容变更时 |
| `npm run audit:content-freshness` | 内容新鲜度审计（沉睡节点） | 每月 |

### 关键约束

1. 后端控制权限，前端只控制体现
2. 公开 API 只能用 GET，写入必须服务端守门
3. 新增脚本需注册到 legacy 注册表
4. 不动 `_legacy/` 目录中的代码
5. 提交格式：`xxx(xxx): 中文xxx`

### 架构决策记录

关键设计决策记录在 `docs/05-engineering/adr/` 目录下，包含 5 个 ADR：

- ADR-001: App Router 选型
- ADR-002: 世界模型设计
- ADR-003: 权限守门策略
- ADR-004: AI 边界策略
- ADR-005: 内容门禁体系

### API 文档

完整的 25 条 API 路由文档见 `docs/05-engineering/api-reference.md`。

### 局域网访问

局域网访问配置指南见 `docs/05-engineering/lan-access-guide.md`。
