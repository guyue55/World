# WorldOS 1.0 RC7｜本地运行时 HTTP Smoke 闭环

## 定位

RC7 不新增公开功能，不改变真实生产状态。它解决 RC6 之后仍然存在的一个本地证据缺口：此前本地门禁主要验证源码、注册表和构建产物是否存在，但没有实际启动 production server 去检查 HTTP 行为。

RC7 的目标是：

```text
用本地 next start 验证 WorldOS 1.0 RC 的真实 HTTP 行为，
让公开路由、静态 JSON、SEO 文件、legacy redirect、private guard 和 404 都有可复跑证据。
```

## 新增文件

```text
data/world-kernel/worldos-local-runtime-smoke-v1.json
data/world-kernel/worldos-1-rc7-local-runtime-smoke-v1.json
scripts/run-worldos-local-runtime-smoke.mjs
scripts/check-worldos-local-runtime-smoke.mjs
docs/superpowers/plans/2026-07-04-worldos-rc7-local-runtime-smoke.md
docs/10-development-history/world-kernel/worldos-1-rc7-local-runtime-smoke.md
```

## 新增命令

```bash
npm run check:runtime-local
npm run smoke:runtime-local
```

`check:rc:full` 已更新为：

```bash
npm run check:release:rc && npm run build:kernel-release && npm run build:verify-artifacts && npm run smoke:runtime-local && npm run audit:report
```

## Smoke 覆盖范围

```text
public HTML routes：/, /about, /atlas, /timeline, /archive, /paths, /ask, /manifesto, /status, /node/world-manifesto
static assets：/world-index.json, /world-manifest.json, /robots.txt, /sitemap.xml
legacy redirects：/world, /world-map, /time-river, /lighthouse
private/internal guards：/r4-creator, /r6-service, /private-archive
negative route：/unknown-worldos-smoke-route
```

## 真实状态

```text
productionLive: false
releaseReady: false
cleanProductionReady: false
```

本地运行时 smoke 只能证明本地 Next production server 行为，不替代真实外部 Preview / Production URL、线上 smoke、HTTPS、Web Vitals / 可访问性快照、人工签收和真实回滚演练。
