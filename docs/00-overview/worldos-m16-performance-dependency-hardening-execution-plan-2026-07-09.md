# WorldOS M16 性能与依赖硬化执行计划

## 1. 目标

确保 WorldOS 在加入场景、特效、感官、音频和 AI 后仍然轻量、可维护、可扩展，避免从“骨架”变成“臃肿的宇宙壳”。

## 2. 执行项

| 项 | 操作 | 验收 |
| --- | --- | --- |
| 依赖审计 | 对照技术栈调研列出新增依赖理由 | 无无主依赖 |
| 动态加载 | 重场景、音频、AI 面板按需加载 | 首屏不加载无关能力 |
| 预算复核 | JS、CSS、图片、音频、字体、AI 请求逐项对照预算 | 超预算必须移除或拆分 |
| 动画主控 | GSAP 负责场景编舞，Motion 负责局部 presence | 无重复控制同一转场 |
| 2D 优先 | CSS / SVG / D3 / PixiJS 按需评估 | 不全站 3D 化 |
| 移动端复核 | mobile 首屏、导航、正文、触控完整 | 无遮挡、无溢出 |
| 弱设备降级 | reduced-motion、reduced-sensory、无音频、无 AI 均可用 | 关闭增强后仍完整 |

## 3. 新依赖准入问题

每个新增依赖必须回答：

- 它解决哪个阶段、哪个场景、哪个不可替代的问题？
- 用 CSS / SVG / 原生 API 是否已经足够？
- 它是否能按需加载？
- 它的失败和关闭状态是什么？
- 它是否会影响移动端和本地 / LAN RC？

## 4. 检查命令

- `npm run check:lib-budget`
- `npm run check:performance-budget`
- `npm run check:performance`
- `npm run check:performance-implementation`
- `npm run check:performance-regression`
- `npm run check:mainline`
- `npm run release:local-rc`

## 5. 人工验收

- 首页不是先空白再加载世界。
- 移动端首屏和核心导航顺畅。
- 关掉动态增强后内容仍完整。
- 新增依赖能被一句话解释其必要性。

## 6. 边界

- 不为“高级感”引入重型 3D。
- 不同时引入多套动画主控。
- 不默认加载音频或 AI provider。
- 不让性能门禁被大量无意义报告淹没。

