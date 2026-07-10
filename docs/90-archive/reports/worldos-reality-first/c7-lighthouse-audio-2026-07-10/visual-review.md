# C7 灯塔与声景真实审查

审查时间：2026-07-11 01:40（Asia/Shanghai）

## 反基线

`baseline/lighthouse-desktop.png` 仍是共享双栏 portal：大标题、线框塔、统计格和三 CTA 占据首屏，真实灯塔只存在于说明文字中。该画面判定为 `fail`，只作为重构前证据。

## 最终视觉结论

- `lighthouse-arrival.png`：真实石塔、海面、三束光和被照亮的浮岛构成首屏主体；问路与回答只占底部从属区域，不再使用共享 hero。
- `lighthouse-mobile.png`：纵向塔体保留在上半屏，问路台和答案在下半屏形成可滚动导览区；底部世界导航未遮挡输入和来源。
- `lighthouse-grounded.png`：回答、公开依据和下一站在同一灯塔空间内变化，没有跳到工程控制台。
- `lighthouse-refusal.png`：私密问题明确拒答，来源区不出现私密或伪造内容，仍提供公开退路。
- `lighthouse-text-hidden.png`：隐藏主要文字后，塔体、光束、海面、浮岛和光点仍让该场景与 Atlas、Timeline、Archive 等空间明显不同。
- `lighthouse-image-fallback.png`：主视觉失败时只保留同事实源的静态导览和有效链接，不白屏、不叠加失效热点。
- `lighthouse-guide.mp4`：逐帧确认从 Node 的灯塔出口离开，抵达海上灯塔，完成问路后沿推荐进入 `/paths/first-visit`；不是截图拼接或普通页面淡入。

## 声景与 AI 边界

- 首次加载 `audioContext=none`、`audioRequests=0`、`soundMode=muted`。
- 只有带浏览器 user gesture 的点击才创建 AudioContext；开启后同时一个 ambience group，Gateway / Lighthouse 使用同音程变奏 cue；关闭后 context、loop 与 cue 均释放。
- 七类核心场景的程序化 ambience 频率组合不同，全部为项目运行时合成，0 字节外部音频，不存在来源不明音乐。
- 提交前复审发现音量变化会重复调用 `setScene()`，可能短暂形成双 loop；现改为同场景只调 Gain、仅场景变化才 crossfade，fresh build 后重新完成开启/关闭浏览器验证。
- 当前环境没有 `OPENAI_API_KEY`，最终 AI 模式只能是 `low-light`。公开问题 grounded、未知问题 no-evidence、私密问题 refusal；超时、取消、结构错误与限流均回退，不伪造 provider/model/usage。
- 客户端静态 bundle 首轮扫描发现旧运行时 registry 把 `OPENAI_API_KEY` 等“禁止词名称”打入公共 chunk；改为由权威 registry 生成无秘密字段的 public runtime projection 后，fresh bundle 名称和值扫描均为空。

## 未关闭的全局阻断

- fresh build 的 shared First Load JS 为 174 kB，仍高于冻结 130 kB。C7 不以灯塔视觉通过掩盖该问题；它继续作为 C8.11 的 P0 性能阻断项。
- 没有合法 Provider 凭据，因此没有验证实时模型的 usage、latency 和成本；这不阻塞低光本地世界，但禁止标记 `LOCAL_WORLD_COMPLETE_LIVE_AI`。
- 自动证据只能确认音频节点、频率、增益、生命周期和默认静音，不能替代真人对听感的最终主观签收；增益峰值已限制在 0.026，终局独立审查仍应把刺耳或抢占阅读判为失败。

## 新鲜度

运行时 public projection 与最终源码早于 `.next-reality/BUILD_ID`，构建产物早于 `final/browser-observations.json`，本审查又晚于最终证据。本结论只引用最后一次 fresh build 后生成的截图、录屏和浏览器记录。
