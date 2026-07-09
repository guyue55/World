# WorldOS 本地与局域网运行手册

## 当前范围

当前只验收 localhost 与 LAN IP。外部 Preview、Production、域名、HTTPS、线上 Web Vitals、外部回滚演练不在本阶段。

## 启动

```bash
npm run start
```

若使用项目脚本启动本地服务，请以脚本输出的 LAN IP 为准。近期 RC 使用的 LAN 地址示例是 `http://172.30.111.222:4320`，实际地址以当前机器网络为准。

## 验收

```bash
npm run check:mainline
npm run release:local-rc
```

`release:local-rc` 应包含：

- RC 快检。
- lint 与 typecheck。
- fresh production build。
- 构建产物校验。
- 本地 production HTTP smoke。
- LAN HTTP 与 browser smoke。
- scene QA 与 human experience rubric。
- npm audit 摘要。
- 本地 RC summary。

## 常见故障

- 端口占用：换端口或停止旧服务。
- LAN 访问失败：确认同一局域网、防火墙、绑定 host、脚本输出 IP。
- 白屏：先看 `npm run build:production-ci` 与浏览器控制台，再跑 `npm run release:local-rc`。
- 移动端遮挡：看 `fixedOverlayIssues` 与 mobile reduced-motion 截图。
- 旧产物误导：必须用 fresh build，不接受旧 `.next` 碰巧通过。

## 完成标准

本地可访问、LAN 可访问、截图证据可读、报告状态为 `local-rc-passed-external-release-blocked`。其中 `external-release-blocked` 是正确状态，表示本阶段仍未进入外部发布。
