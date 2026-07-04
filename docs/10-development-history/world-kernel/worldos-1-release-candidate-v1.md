# WorldOS 1.0 Release Candidate v1｜外部发布证据准备

## 定位

本轮不是新增功能，而是把 `World Kernel Consolidation v2` 冻结为 **WorldOS 1.0 RC**，并把下一步真实 Preview / Production 发布需要的证据链落到代码、脚本、CI 与文档中。

## 当前进度

```text
P0 发布冻结：已完成
P1 Preview 部署：已准备，等待真实外部部署环境
P2 Production 发布：未完成，依赖 Preview smoke、人工签收和回滚演练
P3 性能 / 可访问性证据：已准备模板，等待真实测量
P4 产品体验验收：已准备清单，等待人工验收
P5 运营闭环：已准备，生产上线后启用
P6 安全与隐私治理：策略保留，服务端权限治理进入 V2
```

## 本轮原则

- 不新增 R8.10 / V11 / 新动态宇宙 runtime。
- 不把 legacy、internal、private 页面重新暴露到公开入口。
- 不在缺少外部 URL、线上 smoke、人工签收、回滚演练前声明 `productionLive=true`。
- 权限边界仍以后端 / middleware / route policy 为准，前端只负责显隐和体验。

## 外部证据缺口

```text
真实 Preview URL
Preview smoke report
真实 Production URL
Production smoke report
域名 HTTPS 验证
robots / sitemap 在线验证
Web Vitals 快照
可访问性快照
人工签收
真实回滚演练
```

## 推荐执行顺序

1. 将当前包推送到 GitHub release 分支。
2. 在 Vercel 创建 Preview deployment。
3. 设置 `PREVIEW_URL` 执行 `npm run smoke:preview`。
4. 修复线上 smoke 阻断项。
5. 执行 Production deployment。
6. 设置 `PRODUCTION_URL` 执行 `npm run smoke:production`。
7. 完成 Web Vitals / 可访问性 / 移动端人工检查。
8. 完成回滚演练与人工签收。
9. 只有全部证据完成后，才允许将 `productionLive / releaseReady / cleanProductionReady` 置为 `true`。


## 本轮真实构建发现与修复

执行真实 `next build --turbopack` 时，首次暴露 `/world-map` 旧阶段页仍直接挂载 R8 runtime，构建阶段报 `useWorldRuntime must be used inside WorldRuntimeProvider`。这证明本轮不是只补文档，而是真实构建继续发现了边界遗漏。

已处理：

```text
/world -> /atlas
/world-map -> /atlas
/time-river -> /timeline
/r2-world -> /atlas
/r3-content-life -> /archive
/r4-creator -> /forbidden
/r5-lighthouse -> /ask
/r6-service -> /forbidden
/r7-evolution -> /forbidden
/r8-public -> /status
```

处理原则：legacy / private / internal 阶段页不再在构建中直接挂载 R8 动态 runtime，避免历史动态层污染 WorldOS 1.0 RC。

当前真实构建状态：`next build --turbopack` 已完成 compile 和 129 个静态页生成，并生成关键 `.next` artifacts；当前容器仍在 build trace 后段超时，因此继续保留 artifact verification wrapper 与外部 Preview 构建证据要求。
