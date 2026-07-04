# WorldOS 1.0 RC6｜长期维护命令脊柱收束

## 定位

RC6 不新增公开功能，不改变外部生产状态。它继续承接 RC5 的边界治理结果，把日常开发、边界变更、候选发布和本地完整验证压缩为一组稳定、可复跑、易记忆的命令入口。

核心目标：

```text
让维护者不再面对 700+ npm scripts 迷路，默认只记住少量命令；历史阶段脚本保留为 legacy/reference，但不再作为新开发默认入口。
```

## 新增命令脊柱

| 场景 | 命令 | 用途 |
|---|---|---|
| 日常开发 | `npm run check:daily` | 运行主线治理、lint、typecheck。 |
| 边界变更 | `npm run check:boundary` | 运行 API 边界、脚本治理和命令脊柱检查。 |
| RC 快检 | `npm run check:rc:fast` | 运行本地候选发布快检。 |
| RC 别名 | `npm run check:rc` | 与 `check:release:rc` 保持一致。 |
| RC 完整本地验证 | `npm run check:rc:full` | 运行 RC 快检、构建产物验证、审计报告。 |
| 命令脊柱门禁 | `npm run check:maintenance-command-spine` | 验证别名、文档和生产状态没有漂移。 |

## 新增 / 更新文件

```text
data/world-kernel/worldos-maintenance-command-spine-v1.json
data/world-kernel/worldos-1-rc6-maintenance-command-spine-v1.json
scripts/check-worldos-maintenance-command-spine.mjs
docs/superpowers/plans/2026-07-04-worldos-rc6-maintenance-command-spine.md
docs/10-development-history/world-kernel/worldos-1-rc6-maintenance-command-spine.md
```

## 治理规则

```text
1. 新增检查能力优先接入 check:mainline 或 check:boundary。
2. 不再新增 check:r* / check:v* / check:phase* / check:round* 作为默认入口。
3. 历史阶段脚本仍由 worldos-script-legacy-registry-v1.json 跟踪。
4. 所有短入口都必须登记在 worldos-maintenance-command-spine-v1.json。
5. README / CONTRIBUTING 必须同步说明短入口。
6. 无真实外部证据前，productionLive / releaseReady / cleanProductionReady 必须为 false。
```

## 当前状态

```text
RC6 status: rc6-maintenance-command-spine-completed-external-deploy-still-blocked
productionLive: false
releaseReady: false
cleanProductionReady: false
```

仍然缺少：真实外部 Preview / Production URL、线上 smoke、HTTPS、Web Vitals / 可访问性快照、人工签收和真实回滚演练。
