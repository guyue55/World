# C2 Gateway 真实视觉审查

审查时间：2026-07-10（Asia/Shanghai）

审查范围：production build、localhost、LAN、desktop、mobile、returning、text-hidden、image-failure、JavaScript disabled。

## Baseline 否决

| 画面 | 观察 | 结论 |
| --- | --- | --- |
| `baseline/home-desktop.png` | 大标题占左栏，关系线框、状态和统计占右栏；仍是通用双栏 hero | fail |
| `baseline/home-mobile.png` | 大标题、四个 CTA、运行状态与统计面板纵向堆叠 | fail |

## After 逐图审查

| 画面 | 观察 | 结论 |
| --- | --- | --- |
| `after/home-desktop-first.png` | 月门、观测桌、三条道路和浮屿占满首屏；首访只有“推开月门” | pass |
| `after/home-mobile-first.png` | 使用独立竖构图，纵向门框、主岛和道路清晰；底部罗盘未遮挡入口 | pass |
| `after/home-desktop-returning.png` | 月门已打开，三条方向与上次地点同时可见；回访面板不再遮挡路径热点 | pass |
| `after/home-text-hidden.png` | 隐藏文字后仍能凭月门、三路、群岛和三个热点理解为空间入口 | pass |
| `after/home-image-fallback.png` | 主图资源被主动阻断后，静态等价入口可见且含三条链接 | pass |
| `after/home-js-off.png` | 禁用脚本后，首屏仍有 Atlas、初访路径与 Archive 的直接链接 | pass |

## 修复循环

1. 首版截图发现 `SceneTransitionShell` 的 16px 浅色顶部缝隙，并发现旧迁移说明会在公开页面展示工程文案；移除公开面板，仅保留屏幕阅读器抵达提示。
2. 首版回访图发现“初访星路”被回访 dock 部分遮挡；将 desktop dock 下移到安全区，重建并重拍。
3. 浏览器日志发现 `/favicon.ico` 404；从自有 `favicon.svg` 转换本地图标，重新生产构建后 404 消失。
4. 证据工具首次关闭 Chrome 时出现 profile 清理竞态；增加进程退出等待与有限重试，整轮重跑退出码为 0。
5. 首次 JS-off 图永久停在根级 `loading.tsx` 的旧 M29 骨架；移除全局 streaming loading boundary，并增加同一 Gateway 模型驱动的服务端 `<noscript>` 入口。
6. 首次图片阻断被浏览器缓存掩盖，修正后又发现 `onError` 可在 hydration 前丢失；改为默认保留 fallback，只有 `complete + naturalWidth` 或 `load` 确认图片可用后才隐藏。

## 诚实结论

Gateway 已通过 C2 冻结 Gate，不再是旧双栏 hero。此结论只覆盖世界入口；Atlas、Timeline、Archive、Paths、Node、Lighthouse 尚未因此自动通过，深路由的无 JS 等价正文也仍待后续检查点完成，项目总状态继续为 `FOUNDATION_ONLY`。
