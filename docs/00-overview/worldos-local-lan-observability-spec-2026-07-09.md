# WorldOS 本地 / LAN 观测规格

> [!IMPORTANT]
> 当前阶段暂不考虑外部上线。本规格只服务 localhost 与局域网访问，目标是让每次验收真实、新鲜、可复现。

## 1. 目标

任何人执行本地 RC 后，都能知道当前世界是否可运行、可阅读、可探索、可降级，且证据不是旧构建或旧截图。

## 2. 观测范围

| 维度 | 证据 |
| --- | --- |
| 构建新鲜度 | fresh build、stale artifact 检查 |
| localhost | 首页、核心路由、白屏检查 |
| LAN | 局域网 IP 可访问性 |
| 场景 | Home、Atlas、Timeline、Archive、Paths、Node、Lighthouse |
| 动效 | full / reduced-motion |
| 感官 | sound off / opt-in / reduced-sensory |
| AI | disabled、dry-run、fallback、server-only |
| 权限 | 公开、私密、vault 排除 |

## 3. 报告要求

本地 RC 摘要必须包含：

- 执行命令。
- 构建时间。
- localhost URL。
- LAN URL 或不可用原因。
- 关键路由状态。
- 截图证据路径。
- AI 与音频状态。
- 失败项和下一步。

## 4. 临时证据策略

- 稳定报告可以提交。
- 大量临时截图不默认提交。
- 带时间戳的噪声产物必须进入忽略或临时目录。
- 证据必须区分 desktop、mobile、reduced-motion。

## 5. 验收

- `npm run release:local-rc` 是本地可信入口。
- 失败时能定位是构建、路由、权限、场景、AI、音频还是截图问题。
- LAN 不可用时必须说明网络原因，而不是误报通过。

