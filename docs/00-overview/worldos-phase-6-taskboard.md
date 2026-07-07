# 阶段 6：工程治理与发布任务板

**目标：** 把项目从能跑，推进到可稳定发布、可回滚、可维护。

## 批次 6.1：命令主干收束

**目标：**
- [x] 精简繁杂的脚本体系，分为日常检查、阶段检查、发布检查。
- [x] 固定日常命令：`lint`、`typecheck`、`check:boundary`、`check:dynamic-world`、`build`。
- [x] 明确 commit 规则：每阶段或每批次提交，不再每个小组件随意提交。

**改动范围（执行留痕）：**
- [x] 数据层：维护脚本治理注册表与命令主干契约
- [x] 页面层：无
- [x] 组件层：无
- [x] 权限边界：`check:boundary` 串联 API、权限、脚本、动态世界和本地 runtime
- [x] 检查脚本：历史脚本纳入注册表治理，默认入口收束至 mainline / boundary / RC

**不做：**
- 不随意引入新的重量级 CI 工具链，依赖现有的 npm scripts 组合。

**验收命令：**
```bash
npm run check:mainline
npm run check:scripts
```

## 批次 6.2：发布前门禁

**目标：**
- [x] 建立发布前检查清单：涵盖 SEO、sitemap、robots、manifest、公开 JSON、性能。
- [x] 建立视觉 QA 机制：桌面端、移动端、暗色/亮色模式、低动效模式。
- [x] 处理依赖风险：如 Next/PostCSS audit 这类需要单独评估的安全警报。

**改动范围（执行留痕）：**
- [x] 数据层：维护发布检查报告元数据
- [x] 页面层：SEO 标签全面审核
- [x] 组件层：无
- [x] 权限边界：外部发布仍保持 `productionLive=false`
- [x] 检查脚本：整合发布门禁与本地可信 RC 链路

**不做：**
- 在没有外部真实部署证据前，不伪造 `productionLive=true`。

**验收命令：**
```bash
npm run check:release:rc
npm run check:rc:full
npm run release:local-rc
```

**2026-07-07 补充验收：**
- `release:local-rc` 已完成 fresh build、真实 `next build --turbopack`、产物校验、runtime smoke、LAN smoke、audit、摘要和证据策略。
- 本地 LAN RC 地址：`http://172.30.111.222:4320`。
- 当前状态保持：`local-rc-passed-external-release-blocked`。
