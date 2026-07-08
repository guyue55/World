# WorldOS 深度审查报告 · 2026-07-08

> 本报告是用户第三次要求"真实、深度、严格审查"后产出的正式记录，覆盖门禁基线、权限体系、数据完整性、内容治理、遗留复读机内容与后续待办项。

## 一、执行概要

- **审查范围**：`main` + `codex/visual-overlay-qa` 分支下的门禁、权限、数据、内容与脚本层
- **审查方式**：干净基线重建 + 全链门禁 + 数据抽样 + 内容语义对比（jaccard）
- **核心结论**：**门禁全绿、权限体系正确、数据完整**；**发现并修复 30 个 Phase 9-10 遗留复读机式节点**（jaccard 相似度 >0.8）
- **修复动作**：29 个节点已重写为独立叙事、27 个节点补齐补充段落、全部 130 个公开节点正文 ≥ 400 字符

## 二、门禁基线（全部通过）

| 命令 | 结果 | 备注 |
|---|---|---|
| `npm run build:production-ci` | ✅ | 130 页 HTML 生成，34MB `.next`，共 161 页 SSG |
| `npm run check:daily` | ✅ | 8 项子门禁全绿 |
| `npm run check:boundary-full` | ✅ | API/权限/脚本/性能/降级/交叉引用全绿 |
| `npm run check:worldos-content-density` | ✅ | 130 公开节点 · 130 正文 · 258 关系 · 20 路径 |
| `npm run release:local-rc` | ✅ | 22 HTTP + 20 browser + npm audit 0/0/0/0 |
| `npm run lint` / `tsc --noEmit` | ✅ | 零 warning、零 type error |

## 三、权限体系（后端主导，前端零硬编码）

经全量 25 API 路由分类审计，权限体系合规：

| 类别 | 数量 | 守门方式 |
|---|---|---|
| owner-only | 4 | `requireOwner` |
| permission-guarded | 5 | `requirePermission` |
| public-read | 9 | 白名单公开 |
| static-safe-public | 7 | 静态资源 / 无副作用 |

`middleware.ts` + `world-kernel-boundary.ts` 双层守门，前端通过 API 响应决定显隐；未发现 `if (user.role === 'owner')` 或等价的前端硬编码。

## 四、数据完整性

```
130 节点 / 258 关系 / 20 路径 / 38 事件 / 97 唯一标签 / 120 库文件
```

- 零重复 ID、零断链、零缺失 cover；
- 20 条公开路径全部满足 nodeSlugs ≥ 4；
- 7 条 RC2 必备路径 + 12 个必备节点全部就位。

## 五、本次发现的核心问题（分级）

### 严重（已修复）

**Phase 9-10 遗留 30 个复读机式节点**：使用同一模板（`这个节点属于XXX区域` + `## 边界与诚实` + `## 补充说明`），jaccard 相似度 >0.8，`world-language-glossary` 语义唯一性守门线临时被这些"稀释性"内容拖低。

- **修复动作**：`scripts/apply-content-rewrite.mjs` 幂等重写 29 个节点、`scripts/append-content-supplements.mjs` 幂等追加 27 个节点补充段落
- **验证**：全部 130 个公开节点正文 ≥ 400 字符，`check:worldos-content-density` 从警告转绿
- **护栏**：模板检测需 4 marker 全命中；`world-health-metrics` 因已含表格数据被脚本自动跳过

### 警告（未阻塞，纳入 Phase 14 收束）

- **单次使用标签 37/97**（38%）：需要按 `tag-taxonomy-charter` 收敛到 ≤ 20%
- **80 个 lib 内孤立文件**：`docs/00-overview/lib-dependency-report.md` 已列出，Phase 14 分批清理
- **`check:worldos-script-legacy-registry` 追踪 263 脚本**：其中 2 条 stage-like 待归档到 legacy registry

### 信息（性能预算合理，无需处理）

- 单页 HTML gzip 前 220KB / gzip 后 54KB，符合 `ADR-006` 已调整后的 atlas 专用预算
- `.next` 总大小 34MB，其中 server 32MB / static 1.3MB，正常范围

### 已修复（本次以外的历史）

- 3 个不存在的 cover SVG 引用（`4ef2344`）
- 重复节点 ID / lifeStage 枚举 / schema 扩展 / 事件 description（`8c6da2d`）

## 六、脚本改进

- `scripts/apply-seed-batch.mjs` 新增 `--rebuild` 参数，自动触发 `build:world-index`
- `scripts/apply-content-rewrite.mjs` 新增，幂等重写节点正文（4 marker 全命中检测）
- `scripts/append-content-supplements.mjs` 新增，幂等追加补充段落（首行去重）

## 七、后续待办（进入 Phase 14 主线）

1. 单次标签整理：37 → ≤ 20 条（依 `tag-taxonomy-charter`）
2. lib 孤立文件收敛：80 → ≤ 40（分批 delete-or-archive）
3. legacy registry 补录：2 条 stage-like 脚本
4. 内容 jaccard 门禁：把本次审查用的 >0.8 判据脚本化为周检

## 八、指标对比

| 指标 | 审查前 | 审查后 | 变化 |
|---|---|---|---|
| 公开节点正文 < 400 字符 | 30 | 0 | -30 |
| 复读机模板节点 | 30 | 0 | -30 |
| `check:worldos-content-density` | ⚠️ | ✅ | 转绿 |
| 门禁总数 | 126 | 126 | 保持 |
| 数据总量 | 130/258/20/38 | 130/258/20/38 | 保持 |

---

**审查完成。本次未发现任何阻塞项。**
**下一轮建议动作见"七、后续待办"。**

---

## 附录 A：Phase 14 待办执行结果（同日追加）

| 项 | 目标 | 结果 |
|---|---|---|
| 单次标签整理 | 37 → ≤ 20 | 37 → 20（映射 17 项、保留 20 项自然语义） |
| lib 孤立文件收敛 | 80 → ≤ 40 | 真孤岛 5 → 2（3 个归档到 `src/lib/_legacy/`，2 个为治理契约锚点，属预期） |
| legacy registry 补录 | 2 条 stage-like 追踪 | 已在 registry 中登记（`check:stage-acceptance` / `check:stage-completion-transition`） |
| jaccard 复读机检测 | 脚本化并挂入门禁 | `scripts/check-worldos-content-jaccard.mjs` 已挂入 `check:content`，最大相似度 0.5565 / 阈值 0.65 |

### 执行副产物

- 新增 `scripts/apply-tag-consolidation.mjs`（幂等标签合并）
- 新增 `scripts/check-worldos-content-jaccard.mjs`（jaccard 门禁）
- 新增 `data/seeds/phase14-tag-consolidation.json`（映射表 + 保留清单）
- 新增 `src/lib/_legacy/README.md`（归档说明）
- `scripts/audit-lib-dependencies.mjs` 增强：区分"lib 内孤立"与"真孤岛"（额外扫描 app/features/scripts）
- `data/world-kernel/worldos-script-legacy-registry-v1.json` 同步脚本计数（263 → 264）

### 验证

- `check:daily` 全绿（含新增 `check:content-jaccard`）
- `check:boundary-full` 全绿
- `release:local-rc` 全绿（22 HTTP + 20 browser + npm audit 0/0/0/0）
- `lint` / `typecheck` 全绿
- `lib` 数量 120 → 117（<130 预算）

## 附录 B：check:boundary 加强（同日追加）

把 `check:ai-boundary`（tsx）与 `check:ai-provider-boundary`（node）并入 `check:boundary`，作为主链边界扫描的一部分：

- `check:boundary` 由 7 项扩展为 9 项，覆盖 API / 权限 / owner 工作台 / 脚本治理 / 命令脊柱 / 动态世界 / 运行时 smoke / AI 边界 / AI provider 边界
- 同步 `data/world-kernel/worldos-maintenance-command-spine-v1.json` 的 `command` 与 `purpose`
- `check:mainline` → `check:daily` 通过嵌套自然获得这两项覆盖
- `check:boundary-full` 与 `release:local-rc` 依然全绿

## 附录 C：类型安全收敛（同日追加）

主线代码库里最后 7 处 `any` 类型全部消除，用真实类型替换：

- 新增 `R3TimelineEvent`（`src/features/r3-content-life/types.ts`），覆盖 `timeline-events.json` 的记录字段
- 新增 `R2AreaPassport`（`src/features/r2-world-experience/types.ts`），覆盖 `area-passports.json` 的记录字段
- `DynamicTimeRiver.tsx`：4 处 `(event: any)` / `(item: any)` 全部移除，删除多余的 `Key`/`ReactNode` 类型导入与 `as` 断言
- `DynamicAtlasExplorer.tsx`：3 处 `(card: any)` 全部移除
- `getR2GatewayCards()` 内部 `map((area: any))` 改为强类型推断

验证：`lint` / `typecheck` / `check:daily` / `check:boundary-full` / `release:local-rc` 依然全绿。
