# WorldOS Phase 30 Journey Memory 与路径连续性执行计划

> 日期：2026-07-09  
> 范围：localhost / LAN IP，本阶段不考虑外部 Preview / Production。  
> 上游依据：`worldos-scene-universe-master-plan-after-research-2026-07-09.md` 的 M2、阶段 30 与权限边界。  
> 核心目标：让公开探索可以“继续上次旅程”，但本地记忆只影响体验恢复，不参与权限判断。

## 目标

建立轻量 Journey Memory：

- 记录最近公开场景。
- 记录最近公开节点。
- 记录最近公开路径。
- RuntimeSignalDock 能继续上次旅程。
- Path Detail 能说明当前路线进度。
- Node 页能提供回到来源场景/路径的下一步。

## 边界

- localStorage 只保存公开体验记忆。
- 不保存 owner/auth/permission/role/token。
- 不保存私密、vault、family、partner 内容。
- 不把本地记忆作为访问权限来源。
- 清空 localStorage 后系统仍完整可用。
- 移动端不能只依赖桌面 dock 才能继续。

## 执行项

- [x] 1. 复核 Phase 26/27/28/29 已完成且当前工作树干净。
- [x] 2. 新增 `journey-memory-policy.json`，声明存储键、公开字段、禁止字段和验收规则。
- [x] 3. 新增 `src/lib/journey-memory.ts`，提供公开旅程记忆摘要、路径分类和存储负载构建纯函数。
- [x] 4. 扩展 `WorldRuntimeProvider`，记录 currentScene、recentNode、recentPath 与最近公开旅程。
- [x] 5. 更新 `RuntimeSignalDock`，展示最近场景、节点、路径并提供继续入口。
- [x] 6. 更新移动可见入口，避免继续旅程只存在于桌面 dock。
- [x] 7. 更新 Path Detail 和 Node 页的下一步提示，体现路线进度与来源场景。
- [x] 8. 更新 `/status`，展示 Journey Memory 的公开边界和覆盖状态。
- [x] 9. 新增 `check:journey-memory` 并纳入 `check:mainline`。
- [x] 10. 运行边界检查：`check:journey-memory`、`check:mainline`、`check:daily`、`check:strict`、`release:local-rc`。
- [x] 11. 多轮深度复核：源码扫描、权限扫描、产物扫描、截图证据、计划勾选、工作树状态。
- [x] 12. 中文 commit 提交：`feat(journey): 建立公开旅程记忆`。

## 验收标准

- [x] Journey Memory 只记录公开场景、公开节点、公开路径和时间。
- [x] localStorage key 来自统一事实源或统一 lib，不在组件里散写多个键。
- [x] RuntimeSignalDock 可继续最近旅程。
- [x] 移动端有可见继续入口，不依赖桌面 dock。
- [x] Node 页和 Path Detail 有“下一站/返回来源”的公开体验提示。
- [x] 组件不包含 token、owner、auth、permission、role 等权限判断。
- [x] `check:daily`、`check:strict`、`release:local-rc` 通过。
- [x] 工作树提交后干净。

## 风险控制

- 本阶段不做账号同步、不做服务端存储。
- 不新增大型状态库。
- 不把 journey memory 写入 API guard。
- 记忆读写失败时静默降级到默认公开入口。
- 移动端优先保留清晰入口，不增加遮挡式浮层。
