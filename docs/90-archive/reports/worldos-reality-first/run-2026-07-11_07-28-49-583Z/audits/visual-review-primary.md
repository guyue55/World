# Reality-First 主审记录

- Run：`run-2026-07-11_07-28-49-583Z`
- 审查顺序：先打开 10 组模式联系表，再逐段查看 9 条流程联系表与迁移、Node、Lighthouse 高频帧，最后读取 manifest 和自动审计。
- 结论范围：本记录只代表主审，不代替独立审查。

## 模式审查

| 模式 | 观察 | 结论 |
| --- | --- | --- |
| desktop | 七类空间以月门、群岛星图、时间河、档案大厅、旅程道路、内容房间、海上灯塔为主体；不是同一 hero 换文案 | pass |
| mobile | 七类空间主体均在首屏出现，底部罗盘未超过约 12% 视口；Node 阅读正文可继续滚动 | pass |
| reduced-motion | 空间构图和入口完整，未依赖长距离动画表达状态 | pass |
| reduced-sensory | 全部为 `390x844` mobile，声音关闭后场景、导航和状态仍可理解 | pass |
| keyboard | 七 route 均展示可见键盘焦点；结构化结果证明 skip link 首达且核心场景对象可达 | pass |
| storage-off | 七 route 在 Storage API 抛出 `SecurityError` 时均正常呈现，无白屏和控制台错误 | pass |
| text-hidden | Atlas、Timeline、Archive、Paths、Node、Lighthouse 的对象和空间构图可直接区分 | pass |
| JavaScript-off | 七 route 均保留服务端标题、公开事实、等价入口和链接；列表只作为静态替代，不冒充动态主体 | pass |
| LAN desktop/mobile | 七 route 通过真实 LAN IP 浏览器采集；联系表画面完整，不再出现旧审查中的大面积近黑 | pass |

## 九条流程

| Claim | 实际观察 | 主审 |
| --- | --- | --- |
| 首访像进入世界 | 月门开启后出现三条空间方向，再抵达 Atlas；不是直接落入目录 | pass |
| Atlas 是可探索地图 | 区域聚焦、节点 inspector、关系理由和返回全图连续出现 | pass |
| Timeline 是时间河 | 时间锚、河道事件、详情涟漪和河段恢复可见 | pass |
| Archive 是检索空间 | 馆内检索、卷宗聚焦、筛选与清除后馆藏恢复连续可见 | pass |
| Paths 是可走旅程 | 七个站点逐步抵达，Node 地点发生变化，完成后出现抵达仪式 | pass |
| Node 是内容地点 | 先抵达区域房间，再进入纸面正文、关系出口并迁移到相关地点 | pass |
| Lighthouse 是陪伴导览 | 从来源地点抵达灯塔，低光回答、依据和下一站均在同一观测空间中出现 | pass |
| 切换像空间迁移 | Atlas 星点收束，经具名对象与空间光洗抵达 Node 房间；迁移层自动释放 | pass |
| 回访可以继续 | 回访入口进入上次 Atlas，返回后清除记忆恢复首访入口 | pass |

## 缺陷复核

- 旧独立审查的 stale evidence 已由可复现公开索引和本 run 的 fresh 时间链闭合。
- keyboard、storage-off、mobile reduced-sensory 已扩为七 route 的 56 项 localhost 矩阵。
- 正常迁移由浏览器状态机记录为 `283-343ms`；`captureObservedAfterMs` 仅表示截 transit 图后证据脚本何时再次读取状态，不作为产品时长。
- Node 公开页已删除“正文宽度”“移动端优先”等实现说明，阅读概览收束为无大圆角的时长与章节横条。
- 作者事务报告包含 6 类负例、backup manifest/checksum、六个消费面影响与 rollback checksum。
- 音频资产报告包含各场景程序化 patch、频率、峰值、生命周期、用途和审查方法。

## 残余 P2

- Node 从夜间房间进入纸白正文时，材质与亮度变化仍较明显，但正文可读性、来源上下文和出口完整。
- 程序化声景完成离线频率、包络和峰值代理审查；尚无长期真人听感研究。
- 当前没有合法 Provider 凭据，Lighthouse 只能诚实运行低光模式。
- `npm audit` 有 Next 内嵌 PostCSS 的 2 个 moderate，当前无合理非破坏性修复；高危与严重均为 0，且不面向外部部署。
- 本地证据不能替代真实用户长期回访研究，也不代表外部 Preview / Production 就绪。

主审判定：九行暂列 `pass`，P0=0、P1=0；等待 fresh independent reviewer 复核。
