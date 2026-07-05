# 阶段 6：工程治理与发布任务板

**目标：** 把项目从能跑，推进到可稳定发布、可回滚、可维护。

## 批次 6.1：命令主干收束

**目标：**
- [ ] 精简繁杂的脚本体系，分为日常检查、阶段检查、发布检查。
- [ ] 固定日常命令：`lint`、`typecheck`、`check:boundary`、`check:dynamic-world`、`build`。
- [ ] 明确 commit 规则：每阶段或每批次提交，不再每个小组件随意提交。

**改动范围（执行留痕）：**
- [ ] 数据层：无
- [ ] 页面层：无
- [ ] 组件层：无
- [ ] 权限边界：无
- [ ] 检查脚本：物理删除过时验证脚本，沉淀至归档区

**不做：**
- 不随意引入新的重量级 CI 工具链，依赖现有的 npm scripts 组合。

**验收命令：**
```bash
npm run check:mainline
npm run check:scripts
```

## 批次 6.2：发布前门禁

**目标：**
- [ ] 建立发布前检查清单：涵盖 SEO、sitemap、robots、manifest、公开 JSON、性能。
- [ ] 建立视觉 QA 机制：桌面端、移动端、暗色/亮色模式、低动效模式。
- [ ] 处理依赖风险：如 Next/PostCSS audit 这类需要单独评估的安全警报。

**改动范围（执行留痕）：**
- [ ] 数据层：维护发布检查报告元数据
- [ ] 页面层：SEO 标签全面审核
- [ ] 组件层：无
- [ ] 权限边界：无
- [ ] 检查脚本：整合发布门禁 `check:rc:full` 链路

**不做：**
- 在没有外部真实部署证据前，不伪造 `productionLive=true`。

**验收命令：**
```bash
npm run check:release:rc
npm run check:rc:full
```
