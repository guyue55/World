# 阶段 10：内容增长系统本地化任务板

**目标：** 让本地世界不只是骨架完整，而是拥有可阅读、可继续探索的真实正文。

## 批次 10.1：核心节点正文补强

**目标：**
- [x] 新手路径核心节点不再只是短句占位。
- [x] 技术与 AI 入口代表节点拥有完整解释。
- [x] 核心节点必须进入公开路径和关系星线。
- [x] 内容增长仍保持本地验收，不引入外部 Preview / Production。

**改动范围（执行留痕）：**
- [x] 数据层：新增 `worldos-local-content-growth-contract-v1.json`。
- [x] 内容层：补强 8 个核心公开节点正文。
- [x] 检查脚本：新增 `check:local-content-growth`。
- [x] 主线门禁：`check:content` 纳入本地内容增长检查。

**验收命令：**
```bash
npm run check:local-content-growth
npm run check:content
npm run check:local-product-maturity
```

## 批次 10.2：下一轮内容增长

**目标：**
- [x] 继续补强非核心但高频进入的公开节点。
- [x] 为每个一级区域至少补一篇更完整的代表正文。
- [x] 将“为什么相关”从关系 note 进一步扩展到正文中的上下文段落。

**改动范围（执行留痕）：**
- [x] 工坊：补强 `ai-website-audit-report-demo`，解释审计闭环、世界位置和后续生长。
- [x] 灵感云层：补强 `everything-is-node`，解释节点护照和跨区域关系。
- [x] 时间河：补强 `worldos-rc2-nondeploy-lessons`，记录本地成熟与非部署阶段经验。
- [x] 档案馆：补强 `worldos-mainline-code-map`，明确主线代码地图和维护方式。
- [x] 契约升级：`areaRepresentativeSlugs` 覆盖 8 个一级区域，并由 `check:local-content-growth` 验收。
