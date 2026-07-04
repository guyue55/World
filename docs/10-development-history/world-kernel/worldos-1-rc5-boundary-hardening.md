# WorldOS 1.0 RC5｜API 与脚本边界治理收束

## 定位

本轮承接 RC4 全项目审查提出的两个重要后续项：

1. `middleware` 明确排除了 `/api`，因此 API 必须有独立的服务端边界注册表与可复跑门禁。
2. `package.json` 中历史阶段脚本仍然很多，因此需要 legacy script registry，避免默认开发入口继续被阶段线污染。

本轮不新增公开功能，不改变生产状态，只做边界治理、审查证据和长期门禁收束。

## Superpowers 工作流

已按以下流程执行：

```text
using-superpowers
writing-plans
executing-plans
verification-before-completion
finishing-a-development-branch
```

计划文件：

```text
docs/superpowers/plans/2026-07-04-worldos-rc5-boundary-hardening.md
```

## 新增 API 边界治理

新增文件：

```text
data/world-kernel/worldos-api-boundary-registry-v1.json
scripts/check-worldos-api-boundary.mjs
```

注册表覆盖当前全部 `src/app/api/**/route.ts`：

```text
API 路由总数：23
owner-only：4
permission-guarded：5
public-read：9
static-safe-public：5
写入 / 占位写入路由：2，均已服务端守门
```

边界原则：

```text
middleware 不覆盖 /api；API route 必须在服务端自身完成权限守门。
公开 API 只能 GET 且只能暴露 public / static-safe 数据。
写入型 API 必须 requireOwner 或 requirePermission。
当前 RC 不允许任何 API 声明 productionWrite=true。
当前 RC 不允许 API 依赖真实数据库或真实 AI 才能运行。
```

新增命令：

```bash
npm run check:api-boundary
```

## 新增脚本 legacy 治理

新增文件：

```text
data/world-kernel/worldos-script-legacy-registry-v1.json
scripts/check-worldos-script-legacy-registry.mjs
```

当前脚本快照：

```text
npm scripts：765
check scripts：567
阶段型 check scripts：439
长脚本：1（check:world-core）
```

这些历史脚本未被删除，但已经从“默认开发入口”降级为可审计 legacy/reference。日常入口固定为：

```bash
npm run check:mainline
npm run check:content
npm run check:experience:public
npm run check:api-boundary
npm run check:scripts
npm run check:release:rc
```

新增命令：

```bash
npm run check:scripts
```

## 审查结果

`npm run audit:project` 已更新为 RC5 边界治理复核，并输出：

```text
data/world-kernel/worldos-1-rc5-boundary-hardening-v1.json
```

当前结果：

```text
status: pass
checks: 13
findings: 0
warnings: 0
```

RC4 的两个 important followups 已关闭为可复跑治理项：

| RC4 后续项 | RC5 状态 |
|---|---|
| API 独立边界清单 | 已完成，`check:api-boundary` 可复跑 |
| 阶段脚本治理注册 | 已完成，`check:scripts` 可复跑 |

## 仍需保留的真实状态

```text
productionLive: false
releaseReady: false
cleanProductionReady: false
```

原因不变：仍缺真实外部 Preview / Production URL、线上 smoke、HTTPS / Web Vitals / 可访问性快照、人工签收和真实回滚演练。
