# 阶段 11：本地 Owner 工作台任务板

**目标：** 在 localhost / LAN IP 下准备 owner 工作流，但不允许本地访问绕过服务端权限。

## 批次 11.1：Owner 工作流契约

**目标：**
- [x] 明确本地 Owner 工作台仍必须经过服务端 guard。
- [x] owner-only API 使用 `requireOwner`。
- [x] permission-guarded API 使用 `requirePermission`。
- [x] AI 建议和维护伙伴只输出建议、提醒或警告，不自动执行。

**改动范围（执行留痕）：**
- [x] 数据层：新增 `worldos-local-owner-workbench-contract-v1.json`。
- [x] 权限边界：复核 owner token、403、no-store 和 API 注册表。
- [x] 检查脚本：新增 `check:local-owner-workbench`。
- [x] 主线门禁：`check:boundary` 纳入本地 Owner 工作台检查。

**验收命令：**
```bash
npm run check:local-owner-workbench
npm run check:api-boundary
npm run check:permission-boundary
npm run check:boundary
```

## 批次 11.2：本地 Owner UI 可用性

**目标：**
- [x] 把 owner 审核队列、导出任务、维护提醒整理成更清晰的本地工作台体验。
- [x] 继续保持未授权访问只能得到服务端拒绝或公开降级出口。

**改动范围（执行留痕）：**
- [x] 契约新增 `uiEvidence`，登记 AI 审核队列、AI 维护伙伴、权限守门、审计导出和维护队列。
- [x] `check:local-owner-workbench` 校验 5 个 UI 证据文件，不允许 owner token 或 localStorage 权限事实源进入前端。
- [x] 服务端仍以 `requireOwner` / `requirePermission` 和 API 注册表作为权限事实源，前端只展示状态。
