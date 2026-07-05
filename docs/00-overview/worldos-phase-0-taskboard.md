# 阶段 0：冻结与盘点任务板

**状态：** 已完成
**目标：** 停止零散开发，形成当前项目事实源。
**执行结果：** 详见 `docs/00-overview/worldos-phase-0-inventory-2026-07-05.md` 和 `docs/00-overview/worldos-roadmap-execution-master-plan-2026-07-05.md`。

## 批次 0.1：主线资产盘点

**目标：**
- [x] 盘点正式公开路由：`/`、`/atlas`、`/timeline`、`/archive`、`/paths`、`/paths/[id]`、`/node/[slug]`、`/ask`、`/about`、`/manifesto`、`/status`。
- [x] 盘点当前正式组件：`product`、`world`、`atlas`、`timeline`、`archive`、`paths`、`node`、`ask`、`about`、`manifesto`、`status`。
- [x] 标记 `_legacy` 可回流资产：动态宇宙、世界入口、地图、时间河、AI 灯塔、私密档案、运营发布。
- [x] 标记废弃或仅参考资产，避免误接入正式主线。

**改动范围（执行留痕）：**
- [x] 数据层：梳理并输出资产清单（写入相应文档或配置文件）
- [x] 页面层：审查现有路由是否严格收束
- [x] 组件层：无新增组件
- [x] 权限边界：确认当前各路由的边界配置
- [x] 检查脚本：运行并验证基线脚本

**不做：**
- 不做任何代码逻辑修改与新功能开发。

**验收命令：**
```bash
npm run check:mainline
npm run check:boundary
```

## 批次 0.2：检查脚本分层

**目标：**
- [x] 将日常检查固化为：`lint`、`typecheck`、`check:dynamic-world`、`check:boundary`。
- [x] 将内容检查固化为：`check:content`、`check:experience:public`。
- [x] 将发布检查固化为：`check:release:rc`、`check:rc:full`。
- [x] 将“阶段任务对应检查命令”补充并写入任务板。

**改动范围（执行留痕）：**
- [x] 数据层：无
- [x] 页面层：无
- [x] 组件层：无
- [x] 权限边界：无
- [x] 检查脚本：梳理 `package.json` 中繁杂的脚本，归类为核心层

**不做：**
- 不写新的复杂测试用例，仅整理现有 npm scripts。

**验收命令：**
```bash
npm run lint
npm run typecheck
npm run check:dynamic-world
npm run check:boundary
```
