# C3 Atlas 真实视觉审查

审查时间：2026-07-10 17:53（Asia/Shanghai）

生产服务：`http://127.0.0.1:3411` / `http://192.168.1.200:3411`

结论范围：仅 C3 Atlas，不代表 C0-C9 或整个 WorldOS 已完成。

## 基线判定

- desktop 基线由超大标题、CTA、状态面板、统计区和右侧小地图构成，地图不是首屏主体。
- mobile 基线首屏只见标题、按钮和状态卡，地图在首屏之外。
- 结论：符合“大标题 + 卡片 + 简单动态”骨架特征，不满足冻结的 Atlas 标准。

## 最终逐图结果

| 证据 | 真实观察 | C3 结论 |
| --- | --- | --- |
| `final/atlas-arrival-desktop.png` | 浮屿、桥线、区域远近占据整个视口；8 个区域均可见 | pass |
| `final/atlas-area-focused.png` | 镜头实际缩放和平移到技术星域，3 个代表地点出现，关系目标可选 | pass |
| `final/atlas-node-focused.png` | inspector 解释地点、所属区域、关系理由并提供真实 Node 入口 | pass |
| `final/atlas-mobile.png` | 纵向地图为主体，8 个区域在视口内可见或部分露出，无横向溢出 | pass |
| `final/atlas-mobile-focused.png` | 底部 drawer 位于移动导航上方，正文不再被背景热点穿透，上方保留地图上下文 | pass |
| `final/atlas-reduced-motion.png` | 地图和层级静态可读，不依赖持续动画表达关系 | pass |
| `final/atlas-reduced-sensory.png` | 声景保持默认静音；运行态 sensory 仍为 `full`，完整感官档位留给 C7 | conditional-pass |
| `final/atlas-image-fallback.png` | 位图被阻断后，深色空间骨架和同事实源区域列表接管，没有空白页 | pass |
| `final/atlas-text-hidden.png` | 隐藏文字后仍能凭浮屿、桥线、区域环和空间层级辨认 Atlas | pass |
| `final/atlas-exploration.mp4` | 全图 -> 区域聚焦 -> 节点聚焦 -> 返回全图的镜头变化连续可见 | pass |

## 交互与边界

- `browser-observations.json` 的 9 个模式均无非预期 console/network error、横向溢出或公开工程验收文案。
- 实际流程通过：键盘方向键平移、Atlas -> Node、浏览器后退、返回全图、Atlas 区域 -> Timeline。
- DOM 保留 8 个区域按钮和 24 个代表地点；200 个公开节点不常驻首屏标签。
- desktop inspector 宽度不超过 32%；mobile drawer 不与底部导航重叠。
- 图片失败产生的网络失败是测试主动阻断，已与非预期网络故障分开记录。

## 性能

`final/performance-budget.json` 的 C3 场景测量：

- 位图传输：140,330 B / 700 KiB。
- 最大 long task：63 ms / 200 ms。
- LCP：228 ms；CLS：0.0009；交互代理：8 ms。
- 无新增运行时依赖；SVG + DOM 足以承载 8 区和 24 个代表地点。
- shared First Load JS 为 158 kB，仍高于冻结的 130 kB。它已从 193 kB 降低，但不得作为最终性能通过；C6-C8 必须继续收敛。

## 修复轮次

1. 发现用户 dev 与 production 共用 `.next`，生产静态资源全部 400；引入可选独立 dist 并统一 build/performance 脚本。
2. 静态列表外边距折叠把地图推到第二屏；改为舞台内降级覆盖层。
3. 图片在 hydration 前完成导致降级层常驻；加入 `complete/naturalWidth` 判定。
4. `gsap.matchMedia` 只有 false 条件，镜头未移动；加入 desktop/mobile 条件并用 computed transform 复核。
5. desktop inspector 被顶部导航遮挡；加入桌面安全区。
6. mobile drawer 被底部导航遮挡且背景文字穿透；抬高底边并改为近实色面板。
7. 证据器把隐藏移动导航误判为重叠；收紧为仅检查实际显示元素后全量重采。
8. 全局 Framer 常驻使 shared JS 193 kB；移除 layout 级 Framer 和全局氛围 Framer，降至 158 kB，残余继续保留。

## C3 判定

Atlas 的场景主体、交互语法和空间辨识已通过 C3 gate；它不再是右侧小窗或区域卡片网格。WorldOS 整体仍为 `WORLD_EXPERIENCE_IN_PROGRESS`，Timeline、Archive、Paths、Node、迁移、Lighthouse 和全局性能尚未据此完成。
