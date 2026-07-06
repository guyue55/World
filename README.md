# word-life｜古月浮屿 / WorldOS

`word-life` 是古月浮屿 / 我的博客 / WorldOS 的长期项目仓库。

它不是传统博客，而是一个正在收束为产品形态的个人数字世界：

```text
对外：可进入、可探索、可停留的公开世界
对内：可维护、可记录、可整理的创世台
对未来：可导出、可回望、可传承的生命档案
对 AI：可读、可审计、可边界化协作的世界协议
```

## 当前工程状态

```text
当前基线：WorldOS v1 产品化旅程基线
功能策略：feature freeze / World Kernel 收束期
productionLive: false
releaseReady: false
cleanProductionReady: false
```

当前阶段不再继续扩展 `R8.x / V / R` 新功能线，优先进行：

```text
架构审计
内核收束
路由守门
脚本合并
真实生产证据
```

## 快速开始

```bash
npm ci
npm run dev
```

## 推荐门禁

```bash
npm run audit:world-kernel
npm run check:world-kernel-consolidation
npm run check:world-kernel-production
npm run smoke:kernel-local
npm run check:product-release
npm run lint
npm run typecheck
npm run check
npm run check:routes
npm run build:kernel-release
npm run build:verify-artifacts
```

完整本地发布门禁：

```bash
npm run check:release
```

## World Kernel 约束

本仓库以 `data/world-kernel/kernel-freeze-policy.json` 作为功能冻结策略，以 `docs/10-development-history/world-kernel/world-kernel-architecture-audit-v1.md` 作为当前内核审计基线。

核心原则：

```text
不新增 R8.10 / V11 类扩展线
不新增重复动态宇宙 Runtime
不把私密权限交给前端硬编码
不把 build wrapper 当作真实生产证据
不让世界语言牺牲现实可理解性
```

公开产品路由由 `src/lib/world-kernel-boundary.ts` 与 `src/lib/product-routes.ts` 统一守门；私密、内部、阶段页必须经过 middleware 服务端边界。

## 目录

```text
src/        Next.js 应用源码
data/       世界数据、契约、阶段状态、World Kernel 审计
scripts/    检查、审计、报告、门禁脚本
public/     静态资源
content/    内容源
docs/       长期文档中心
.github/    GitHub Actions
```

## 生产说明

当前本地产品化门禁可以验证公开入口、路由守门、类型检查和构建产物存在性；但仍不能声明 `productionLive: true`。真实上线还需要外部 Preview / Production URL、线上 smoke test、域名 HTTPS、人工签收与真实回滚演练。

## World Kernel Consolidation v1

当前开发方式已经从“继续扩展新阶段”切换为“内核收束”。本轮完成 K1-K4 本地收束：

- K1：Node / Area / Relation / Path / WorldState / Permission 的唯一事实源登记。
- K2：正式公开 runtime 固定为 Product WorldShell，R8 动态宇宙系列降级为 legacy/reference。
- K3：公开、私密、legacy、internal 路由统一由 World Kernel route decision 守门。
- K4：新增长期门禁 `check:world-kernel-consolidation`，并接入 `check:product-release`。

仍未完成的是 K5：真实外部 Preview / Production、线上 smoke test、域名 HTTPS、人工签收和回滚演练。因此 `productionLive`、`releaseReady`、`cleanProductionReady` 仍必须保持 `false`。


## World Kernel Consolidation v2 / K5-local

本轮继续推进 K5，但只完成当前容器内可以真实验证的 **本地生产证据闭环**：

- `data/world-kernel/world-kernel-production-evidence-v1.json`：生产证据台账。
- `npm run check:world-kernel-production`：验证 K5-local 状态、外部阻断项和生产状态布尔值。
- `npm run smoke:kernel-local`：验证公开路由、公开 JSON、middleware、sitemap、robots、product route policy。
- `npm run evidence:kernel-local`：生成 `docs/90-archive/reports/world-kernel-local-evidence.json`。

K5-local 完成不等于真实上线。缺少 Preview / Production URL、线上 smoke test、域名 HTTPS、人工签收和回滚演练时，以下状态必须继续保持：

```text
productionLive: false
releaseReady: false
cleanProductionReady: false
```

## WorldOS 1.0 RC2 / Non-deploy Fixes

当前暂时不方便执行真实外部部署，因此 RC2 只处理本地可解决的问题：公开内容密度、反迷路体验、区域自解释和内容质量门禁。

新增门禁：

```bash
npm run check:worldos-content-density
npm run check:worldos-public-experience
npm run check:release:rc
```

RC2 的目标不是改变上线状态，而是避免公开世界退回“漂亮空壳”：

```text
公开节点 >= 30
有正文公开节点 >= 28
公开路径 >= 8
关系 >= 30
世界事件 >= 15
一级区域必须有 noAIFallback / aiEnhancement
首页必须有 8 分钟路径、反迷路罗盘、世界密度和公开边界说明
```

仍需保持：

```text
productionLive: false
releaseReady: false
cleanProductionReady: false
```

## WorldOS 1.0 RC3 / Mainline Governance

RC3 继续处理暂不方便部署时仍可本地解决的问题：主线代码可理解性、legacy 回流风险、脚本入口治理、内容厚度和项目口径诚实。

新增门禁：

```bash
npm run check:mainline
npm run check:content
npm run check:experience:public
npm run check:worldos-mainline-governance
npm run check:worldos-script-taxonomy
npm run check:release:rc:fast
```

RC3 的长期目标不是继续扩展阶段线，而是把项目压回可维护主线：

```text
正式主线：公开产品页 + World Kernel + product/world/node/common 组件
内容地基：experience nodes / paths / areas + core relations / events
治理门禁：worldos / world-kernel / product-release 检查
历史参考：V/R/R8 阶段线、旧 runtime 和阶段脚本，仅作为 legacy/reference
```

RC3 内容门禁提高到：

```text
公开节点 >= 50
有正文公开节点 >= 50
公开路径 >= 12
关系 >= 80
世界事件 >= 20
一级区域覆盖 >= 8
精选 / 代表节点 >= 14
```

仍需保持：

```text
productionLive: false
releaseReady: false
cleanProductionReady: false
```

原因不变：真实外部 Preview / Production URL、线上 smoke、HTTPS、Web Vitals、可访问性快照、人工签收和真实回滚演练仍未执行。


## WorldOS 1.0 RC5 / API 与脚本边界治理

RC5 关闭了 RC4 审查中的两个重要后续项：

```bash
npm run check:api-boundary
npm run check:scripts
npm run audit:project
```

新增治理能力：

```text
API 边界注册表：data/world-kernel/worldos-api-boundary-registry-v1.json
脚本 legacy 注册表：data/world-kernel/worldos-script-legacy-registry-v1.json
RC5 审查结果：data/world-kernel/worldos-1-rc5-boundary-hardening-v1.json
```

当前 `/api` 不由 middleware 统一拦截，因此必须由 API route 自身使用 `requireOwner` / `requirePermission` 或注册为 `public-read` / `static-safe-public`。新增 API 时必须同步更新注册表并通过 `check:api-boundary`。

脚本治理方面，历史阶段脚本保留为 legacy/reference；默认开发入口继续收束为：

```bash
npm run check:mainline
npm run check:content
npm run check:experience:public
npm run check:api-boundary
npm run check:scripts
npm run check:release:rc
```

RC5 不改变生产状态，仍必须保持：

```text
productionLive: false
releaseReady: false
cleanProductionReady: false
```

## WorldOS 1.0 RC6 / 长期维护命令脊柱

RC6 继续遵守 Superpowers 工作流，没有新增公开功能，也没有改变生产状态；本轮目标是把维护入口从大量历史脚本中收束成少量稳定命令。

新增稳定入口：

```bash
npm run check:daily
npm run check:boundary
npm run check:rc
npm run check:rc:fast
npm run check:rc:full
npm run release:local-rc
npm run check:maintenance-command-spine
```

推荐使用方式：

```text
日常开发：npm run check:daily
API / scripts / 治理注册表改动：npm run check:boundary
候选发布本地快检：npm run check:rc:fast
提交 / 打包前本地完整验证：npm run release:local-rc
兼容旧习惯：npm run check:rc:full
```

治理文件：

```text
data/world-kernel/worldos-maintenance-command-spine-v1.json
data/world-kernel/worldos-1-rc6-maintenance-command-spine-v1.json
scripts/check-worldos-maintenance-command-spine.mjs
docs/10-development-history/world-kernel/worldos-1-rc6-maintenance-command-spine.md
```

RC6 仍不改变生产状态：

```text
productionLive: false
releaseReady: false
cleanProductionReady: false
```

这些状态只能在真实外部 Preview / Production URL、线上 smoke、HTTPS、Web Vitals / 可访问性快照、人工签收和真实回滚演练完成后改变。

## WorldOS 1.0 RC7 / 本地运行时 HTTP Smoke

RC7 继续承接 RC6 的长期维护命令脊柱，不新增公开功能，不改变外部生产状态。本轮新增 **本地 production server HTTP smoke**：在没有真实 Preview / Production URL 的情况下，先用本地 `next start` 验证核心公开路由、静态 JSON、SEO 文件、legacy redirect、private guard 和 404 的真实 HTTP 行为。

新增命令：

```bash
npm run check:runtime-local
npm run smoke:runtime-local
```

更新后的完整本地候选发布验证：

```bash
npm run check:rc:full
```

`check:rc:full` 现在包含：

```text
RC 快检
lint / typecheck
build:production-ci 真实生产构建
构建产物验证
本地运行时 HTTP Smoke
本地局域网浏览器 Smoke
审计报告
```

RC7 仍必须保持：

```text
productionLive: false
releaseReady: false
cleanProductionReady: false
```

原因：本地 HTTP smoke 只能证明本地 production server 行为，不能替代真实外部 Preview / Production URL、线上 smoke、HTTPS、Web Vitals / 可访问性快照、人工签收和真实回滚演练。

## WorldOS 1.0 RC8 / 本地局域网 RC

RC8 仍不新增公开功能，也不改变外部生产状态。本轮把当前可接受的部署边界收束为 **本地启动 production server，同一局域网内通过局域网 IP 访问**。

新增命令：

```bash
npm run check:lan-local
npm run smoke:lan-local
```

使用方式：

```text
check:lan-local  只检查本地局域网 RC 的注册表、脚本、命令和文档口径
smoke:lan-local  启动 next start -H 0.0.0.0，通过局域网 IP 执行 HTTP 与浏览器运行时巡检
```

`check:rc:full` 已包含 `smoke:runtime-local` 和 `smoke:lan-local`，适合提交、打包、交付前执行。LAN RC 会记录桌面、移动端低动效、正文可读性、H1、首页主 CTA、移动导航、核心状态卡、console/page error、网络失败、横向溢出和截图证据。

推荐入口是 `release:local-rc`：它会执行 RC 快检、lint、typecheck、强制 fresh build、`build:production-ci`、构建产物时效验证、本地运行时 HTTP smoke、局域网浏览器 smoke、审计报告，并生成 `docs/90-archive/reports/worldos-local-rc-summary-report.json`。`check:rc:full` 保留为兼容别名。

验收产物策略记录在 `data/world-kernel/worldos-local-rc-evidence-policy-v1.json`：规范提交 `docs/90-archive/reports/` 下的汇总、runtime、LAN、audit、外部证据模板和截图；`reports/` 下的 next/chrome 日志只作为排障临时材料。

RC8 仍必须保持：

```text
productionLive: false
releaseReady: false
cleanProductionReady: false
```

原因：本地局域网 RC 只能证明同网访问、本地 production server、浏览器渲染和权限 guard；不能替代真实外部 Preview / Production、HTTPS、Web Vitals、人工签收和回滚演练。
