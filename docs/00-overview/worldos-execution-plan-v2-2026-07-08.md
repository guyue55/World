# 古月浮屿（WorldOS）执行计划 v2

> 制定日期：2026-07-08
> 上游文档：`worldos-future-master-plan-v2-2026-07-08.md`（战略地图）
> 范围：本地/局域网内可执行的体验精修与内容收尾
> 分支：codex/visual-overlay-qa
> 门禁标准：check:daily + check:boundary-full + check:strict + release:local-rc 四合一

---

## 一、执行原则

1. 降低门槛、提高体验、中文优先：每一项交付从"新访客能否读懂"出发
2. 权限后端为主、前端为辅：前端只根据数据表现显隐，不硬编码
3. 高内聚、低耦合、模块化：复用现有 lib/features/scripts，不复制粘贴
4. 门禁不破：每次提交前 check:daily，每个 Phase 结束四合一全过
5. 中文提交：xxx(xxx): 中文xxx
6. 动效/UI 遵循 gsap-core 与 ui-ux-pro-max，复用 motion-grammar.ts 与 MotionConfig
7. 设计风格一致：ink/paper/mist/moss/lake/night/gold 七色体系，world 圆角，soft 阴影

---

## 二、执行顺序

按"体验先行、内容随后、AI 补强"的策略：

1. Phase 20 体验精修（深色模式 -> 键盘导航 -> 构建收束）
2. Phase 19 内容生态收尾（节点扩展 -> 关系深化 -> 事件补齐）
3. Phase 21 AI 灯塔本地化增强

理由：体验基建先行，让后续内容扩展自动获得更好的呈现；内容是持续积累，不阻塞工程；AI 增强是锦上添花。

---

## 三、Phase 20 体验精修 - 详细任务

### T20.1 深色模式

| 子项 | 内容 | 验收 |
|---|---|---|
| T20.1.1 | tailwind.config.ts 启用 darkMode: 'class' | dark: 变体生效 |
| T20.1.2 | globals.css 定义深色 CSS 变量 | 无闪烁（SSR 时 html 即带 class） |
| T20.1.3 | 创建 ThemeToggle 组件（Lucide Sun/Moon 图标） | 前端体现，不硬编码权限 |
| T20.1.4 | layout.tsx 注入 theme 初始化脚本 | FOUC 零闪烁 |
| T20.1.5 | 全部公开页面适配 dark: 变体 | 视觉一致 |
| T20.1.6 | WorldShell 集成 ThemeToggle | 全局可切换 |

验收门禁：check:daily + check:boundary-full + check:strict 全绿

### T20.2 键盘导航与焦点管理

| 子项 | 内容 | 验收 |
|---|---|---|
| T20.2.1 | 全局 focus-visible 样式已在 globals.css | 确认覆盖 |
| T20.2.2 | CompassNav / MobileRouteNav 键盘可达 | Tab 顺序合理 |
| T20.2.3 | 卡片/链接/按钮 focus 状态可见 | :focus-visible 覆盖 |
| T20.2.4 | 模态/抽屉若有，焦点陷阱 | 无模态则跳过 |

验收门禁：check:daily 全绿

### T20.3 构建产物收束

| 子项 | 内容 | 验收 |
|---|---|---|
| T20.3.1 | 分析 .next/ 构建产物构成 | 识别大文件 |
| T20.3.2 | 评估 SVG/图片资源优化 | covers/ 目录 |
| T20.3.3 | 评估 dynamic import 减少 client bundle | 非首屏组件 |
| T20.3.4 | 更新性能预算契约 | check:performance-budget 通过 |

验收门禁：check:performance-budget 通过

---

## 四、Phase 19 内容生态收尾 - 详细任务

### T19.1 节点扩展（130 -> 200+）

分批扩展，每批 15-20 个节点：
- 第一批：思想/方法/工具（20 个）
- 第二批：项目/实践/工作流（20 个）
- 第三批：记忆/情感/日常（15 个）
- 第四批：时间/事件/回望（15 个）

每个节点：300+ 字符内容、中文 summary、至少 1 条关系、生命阶段标签

### T19.2 关系深化（258 -> 300+）

每批节点扩展时同步加密关系，确保孤岛率 < 5%

### T19.3 事件补齐（38 -> 50+）

补充世界事件，覆盖 2026 年 Q2/Q3 里程碑

### T19.4 路径优化（维持 20+）

检查现有 20 条路径的完整性，必要时新增跨区域路径

验收门禁：check:daily + check:content-life + check:content-jaccard 全绿

---

## 五、Phase 21 AI 灯塔本地化增强 - 详细任务

### T21.1 搜索结果排序优化
- 评估 Fuse.js 权重配置
- 增加标题/标签/摘要权重分级

### T21.2 推荐算法调优
- 检查 lighthouse-recommend.ts 的推荐逻辑
- 优化"为什么相关"的解释文案

### T21.3 AI 可用性状态面板完善
- 确认低光模式（AI_ENABLED=false）的优雅降级
- 状态页面展示 AI 可用性

验收门禁：check:ai-boundary + check:lighthouse 全绿

---

## 六、提交计划

每个子任务完成后提交，格式：
- feat(theme): 实现深色模式与主题切换
- feat(a11y): 键盘导航与焦点管理完善
- perf(build): 构建产物收束与资源优化
- feat(content): 扩展N个新节点与关系
- feat(ai): 灯塔搜索排序与推荐优化

---

## 七、验收清单

- [ ] T20.1 深色模式完成
- [ ] T20.2 键盘导航完成
- [ ] T20.3 构建收束完成
- [ ] T19.1 节点扩展到 200+
- [ ] T19.2 关系深化到 300+
- [ ] T19.3 事件补齐到 50+
- [ ] T19.4 路径维持 20+
- [ ] T21.1 搜索排序优化
- [ ] T21.2 推荐算法调优
- [ ] T21.3 AI 状态面板完善
- [ ] 四合一门禁最终全绿

---

本文档为 WorldOS v2 执行计划。每完成一项打勾，每完成一个 Phase 跑门禁。
