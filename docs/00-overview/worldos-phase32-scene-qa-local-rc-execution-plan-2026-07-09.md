# WorldOS Phase 32 Scene QA 与本地 RC 固化执行计划

> 日期：2026-07-09  
> 范围：localhost / LAN IP，本阶段不考虑外部 Preview / Production。  
> 上游依据：`worldos-scene-universe-master-plan-after-research-2026-07-09.md` 的 M5 与阶段 32。  
> 核心目标：把“世界感”纳入可信验收，而不是只靠主观截图和旧报告。

## 目标

建立 Scene QA 报告：

- 覆盖 desktop 与 mobile reduced-motion。
- 覆盖 Gateway、Atlas、Timeline、Archive、Paths、Path Detail、Node、Ask、Status。
- 验证首屏关键区、场景身份、空气层、转场壳、首次进入仪式、返回访客入口。
- 验证 DOM 非空、无横向溢出、无固定遮挡、无异常日志。
- 纳入 `release:local-rc`，确保每次本地 RC 都能生成场景证据。

## 边界

- 不新增浏览器框架。
- 复用现有 LAN RC 的 Chrome/CDP 截图证据。
- 不新增重型图片、视频或 3D。
- 不把 QA 报告当外部 Preview / Production 证据。
- 不降低现有 LAN RC 的失败标准。

## 执行项

- [x] 1. 复核 Phase 26-31 已完成且当前工作树干净。
- [x] 2. 新增 `scene-qa-checklist.json`，声明场景、视口、证据和失败标准。
- [x] 3. 增强 LAN RC DOM 指标，输出空气层、场景身份、首次进入、Journey Memory 等 scene QA 信号。
- [x] 4. 新增 `write-worldos-scene-qa-report.mjs`，从 LAN RC 报告生成 Scene QA 汇总。
- [x] 5. 新增 `check-worldos-scene-qa.mjs`，验证 Scene QA 报告、截图、视口、场景和降级证据。
- [x] 6. 将 `check:scene-qa` 纳入 `check:mainline` 和 `release:local-rc`。
- [x] 7. 运行边界检查：`check:scene-qa`、`check:mainline`、`check:daily`、`check:strict`、`release:local-rc`。
- [x] 8. 多轮深度复核：源码扫描、权限扫描、产物扫描、截图证据、计划勾选、工作树状态。
- [x] 9. 中文 commit 提交：`test(scene): 固化场景宇宙验收`。

## 验收标准

- [x] Scene QA 报告由最新 LAN RC 报告生成。
- [x] 每个核心场景有 desktop 与 mobile reduced-motion 截图证据。
- [x] 首页首次进入仪式有证据。
- [x] 返回访客 / Journey Memory 入口有证据。
- [x] reduced-motion、DOM 非空、无横向溢出、无固定遮挡被检查。
- [x] `release:local-rc` 包含 Scene QA。
- [x] `check:daily`、`check:strict`、`release:local-rc` 通过。
- [x] 工作树提交后干净。

## 风险控制

- Scene QA 只读报告和截图，不访问私密层。
- 报告状态必须与 LAN RC 状态一致。
- 截图文件必须存在且非空。
- productionLive / releaseReady / cleanProductionReady 继续保持 false。
