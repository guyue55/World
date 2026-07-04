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
npm run check:world-kernel-audit
npm run check:product-release
npm run lint
npm run typecheck
npm run check
npm run check:routes
npm run build:verify-artifacts
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
