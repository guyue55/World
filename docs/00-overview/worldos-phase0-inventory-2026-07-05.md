# WorldOS 阶段 0：冻结与主线盘点报告

日期：2026-07-05
状态：已完成
目标：盘点现有主线资产、废弃/隔离遗留代码、梳理检查命令。

## 1. 主线资产表 (Mainline Assets)

### 1.1 正式公开路由
当前提供给访客的核心体验链路：
- `/`：世界首页，入口分发
- `/atlas`：世界地图，区域纵览
- `/timeline`：时间流，按时间线查看世界变迁
- `/archive`：档案馆，搜索与分类索引
- `/paths`：精选路径，系统化的导览引导
- `/paths/[id]`：单条路径的沉浸式体验
- `/node/[slug]`：星体节点，核心内容阅读页
- `/ask`：灯塔问答，基于公开上下文的 AI 导览
- `/status`：世界运行状态

### 1.2 当前正式组件体系
在 `src/components` 目录下，构成上述路由的主体模块：
- `product` / `world`：首页和整体产品骨架
- `atlas` / `timeline` / `archive` / `paths` / `node` / `ask` / `status`：各路由的核心视图组件
- `common` / `layout` / `visual`：通用布局与基础视觉

## 2. Legacy 回流与隔离候选表

`src/components/_legacy` 下存放了大量的实验性、阶段性代码。为了不污染主线，采取以下隔离策略。

### 2.1 可作为未来阶段参考/回流的资产
- **动态宇宙 (阶段 2)**：`r8-dynamic-world` 及其衍生 (`r8-deep-dynamic-world`, `r8-living-universe` 等)。里面的动效思路可被提取为公共 Hook (如 `useGsapEntrance`) 并重新实现，但不直接挂载原组件。
- **AI 灯塔 (阶段 5)**：`r5-ai-lighthouse`, `v10-intelligence`。保留 Prompt、流式读取的逻辑参考。
- **内容生命 (阶段 3)**：`r3-content-life`, `content-ecosystem`。保留关于节点关系、数据注入的思路。
- **权限与私密 (阶段 4)**：`private-archive`, `private-ai-v6`。保留服务端鉴权的思路。

### 2.2 彻底废弃或仅作历史留档的资产
- 以 `v4`, `v5`, `v6`, `v7-release`, `v8-production`, `v9-platform` 等命名的旧架构迭代代码。
- `phase-three`, `phase-four` 等各类过渡期检查面板。
- `acceptance`, `production` 等硬编码的通过状态页面。
**原则**：严禁在 `src/app` 中直接 `import` 以上目录下的任何文件。

## 3. 检查命令分层表 (Script Taxonomy)

为了避免 `package.json` 中的执行疲劳，根据阶段与场景进行了脚本分层：

### 3.1 日常检查 (开发期高频运行)
用于提交前的基本安全网：
- `npm run lint`：确保没有 ESLint 报错或警告
- `npm run typecheck`：确保 TypeScript 类型严密
- `npm run check:dynamic-world`：确保主路由没有脱离服务端 surface 挂载
- `npm run check:boundary`：验证 API、脚本和动态宇宙边界无越权

### 3.2 内容与体验检查 (阶段性运行)
用于校验内容生产质量和基础用户体验：
- `npm run check:content`：验证节点的密度、关系等数据指标 (`check:worldos-content-density`)
- `npm run check:experience:public`：验证面向公众的阅读路径和体验闭环 (`check:worldos-public-experience`)

### 3.3 发布前门禁 (构建与上线前运行)
用于卡点阻止残次品进入生产环境：
- `npm run check:release:rc`：候选版本轻量检查 (`check:worldos-rc`, `check:mainline`)
- `npm run check:rc:full`：完整的发版级阻断检查，包含构建和测试
- `npm run build`：执行服务端验证、静态数据打包及 Next.js 产物生成

---
**结论**：阶段 0 盘点已完成。主线边界清晰，废弃组件已圈定，日常开发可以按照此任务板和检查分层进入后续批次。
