# C6 场景迁移真实视觉审查

审查时间：2026-07-10 23:49（Asia/Shanghai）

审查对象：`final/` 中 7 条流程的 source / transit / arrival 截图、MP4 逐帧接触表及浏览器观察记录。

## 结论

- Gateway -> Atlas 的岛屿、Atlas -> Node 的星点、Timeline -> Node 的涟漪、Archive -> Node 的卷宗、Path -> Node 的站点与 Node -> Lighthouse 的光束，均从真实来源控件几何位置开始，并在路由切换前形成可见的对象迁移。
- 六条正常动态流程不是仅靠整页透明度变化表达；来源对象、途中形态和目标场景均可从画面辨认。
- Path -> Node 首轮发现迁移对象在 GSAP 尚未装载时短暂出现在左上角。将对象默认透明并由运行时定位后才显示，fresh build 后重录，最终证据未再出现该闪烁。
- reduced-motion 流程不保留飞行对象，直接完成上下文切换；最终状态为 `reduced` 且迁移层释放。
- 快速连点后退与 404 路由均释放迁移层；最终无持续遮罩、横向溢出或工程验收文字。
- 代码复审发现原生 View Transition 首版只包住了延迟定时器，GSAP 异步导入也存在旧 effect 晚到风险；修正为延迟后在 transition 回调内直接导航，并对晚到 context 立即回收，随后重新 build、重录和逐帧复查。

## 逐条判定

| 流程 | 来源对象 | 途中是否可见 | 抵达与上下文 | 判定 |
| --- | --- | --- | --- | --- |
| Gateway -> Atlas | 岛屿入口 | 岛屿轮廓从入口向中心聚合 | 抵达 Atlas，星图可交互 | pass |
| Atlas -> Node | 星点 | 发光星点从 inspector CTA 离开 | 抵达所选地点阅读室 | pass |
| Timeline -> Node | 涟漪 | 同心涟漪从事件 CTA 扩散 | 抵达对应地点 | pass |
| Archive -> Node | 卷宗 | 卷宗叠页从档案 CTA 移动 | 抵达所选卷宗地点 | pass |
| Path -> Node | 站点 | 航点从“进入地点”按钮迁移 | 抵达站点并保留路径进度 | pass |
| Node -> Lighthouse | 光束 | 光束从灯塔出口发出 | 路由抵达 Lighthouse | pass（Lighthouse 舞台质量由 C7 验收） |
| reduced Path -> Node | 无飞行对象 | 按降级规则省略 | 直接抵达并保留路径进度 | pass |

## 未冒充完成的边界

- C6 只证明连续迁移基础设施、真实共享对象和上下文延续成立。
- `/ask` 当前仍是旧 Lighthouse 体验；本轮只判定 Node -> Lighthouse 的迁移抵达，不把目标页视觉质量计作通过。C7 必须重新进行 Lighthouse、服务端 provider 边界与声景验收。
- shared First Load JS 仍高于冻结预算，继续作为 C8 的全局阻断项，不因本轮视觉通过而关闭。

## 新鲜度

- 最新迁移源码早于 `.next-reality/BUILD_ID`。
- `.next-reality/BUILD_ID` 早于 `final/browser-observations.json`。
- 本结论只引用该 fresh build 后生成的 `final/` 证据，不引用首轮旧截图或旧录屏。
