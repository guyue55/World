# WorldOS 1.0 RC4 全项目审查报告

> 本报告遵守 Superpowers 工作流：先建立计划，再进行系统化审查，最后以命令输出和数据扫描作为结论依据。本轮不新增公开功能，不改变生产状态，不伪造真实部署证据。

## 1. 审查结论

```text
审查状态：review-completed-with-important-followups
审查时间：2026-07-04
审查基线：worldos_1_rc3_mainline_governance_full-package.zip
productionLive: false
releaseReady: false
cleanProductionReady: false
```

总体判断：当前项目已经完成 WorldOS 1.0 RC3 的本地主线治理和内容门禁收束，公开主线边界、内容密度、节点正文、关系网络、路径数量、公开 JSON 边界、release honesty 均通过本轮审查。仍需重点处理两个长期工程问题：`/api` 独立边界注册表，以及历史阶段脚本/legacy 体量继续治理。

## 2. Superpowers 执行记录

本轮适用并落实的 Superpowers 技能：

```text
using-superpowers
writing-plans
verification-before-completion
finishing-a-development-branch
```

已新增计划文档：

```text
docs/superpowers/plans/2026-07-04-worldos-project-review.md
```

## 3. 项目规模快照

| 指标 | 数量 |
|---|---:|
| App 页面 | 81 |
| API route | 23 |
| npm scripts | 762 |
| check scripts | 564 |
| 阶段型 check scripts | 439 |
| 公开节点 | 52 |
| 有正文公开节点 | 52 |
| 公开路径 | 13 |
| 主区域 | 8 |
| 已覆盖区域 | 8 |
| 关系 | 82 |
| 世界事件 | 21 |
| 权限定义 | 8 |

### 文件分布

| 目录 | 文件数 |
|---|---:|
| `src/app` | 114 |
| `src/components` | 441 |
| `src/features` | 197 |
| `src/lib` | 161 |
| `src/platform` | 31 |
| `src/server` | 6 |
| `src/shared` | 1 |
| `data` | 1059 |
| `content` | 52 |
| `docs` | 863 |
| `scripts` | 762 |
| `public` | 12 |


## 4. 检查项结果

| 检查项 | 状态 | 结论 |
|---|---|---|
| content-density | pass | 公开节点 52，有正文公开节点 52，关系 82，公开路径 13 |
| content-files | pass | 所有公开正文 contentPath 均存在 |
| mainline-import-boundary | pass | 公开主线页面未直接导入 forbidden legacy/private 前缀 |
| route-boundary | pass | 产品路由策略与 middleware 统一走 World Kernel decision |
| api-write-boundary | pass | 写入型 API 均有 owner/permission 守门，受保护 API 9 个 |
| public-json-boundary | pass | 公开 JSON 未发现非 public 节点/路径/事件；private/vault 等仅作为边界说明词出现 |
| release-honesty | pass | 生产状态保持 false，未伪造真实外部证据 |
| script-taxonomy | pass | npm scripts 762 个，其中 check 脚本 564 个，阶段型 check 脚本 439 个 |
| legacy-footprint | pass | legacy imports 未进入公开主线；全 src legacy/private import 足迹 169 处 |
| chinese-first-ui | pass | 公开主线未发现大面积英文 UI 文案 |
| accessibility-basics | pass | WorldShell 保留 main-content 与旅程浮层基础 |
| git-working-tree-policy | pass | Git 工作区洁净性作为收尾门禁单独验证，不写入审查 JSON，避免报告随提交状态漂移 |

## 5. 关键发现

| 等级 | 范围 | 问题 | 证据 | 建议 |
|---|---|---|---|---|
| important | permission-boundary | middleware 明确排除了 /api，需要 API 独立守门清单 | middleware matcher 排除 api/；当前敏感 API 多数有 requireOwner 或 requirePermission，但路由边界策略不统一覆盖 API。 | 保留页面 middleware 策略，同时新增 API boundary registry/check，要求所有非公开 API 标注 public-read / owner-only / internal / forbidden。 |
| important | script-governance | 历史阶段脚本仍然占比很高，默认入口虽收束但仓库维护成本偏大 | 当前 npm scripts 762 个，check 脚本 564 个，阶段型 check 脚本 439 个，最长脚本长度 5311。 | 继续保留 check:mainline/check:release:rc 为默认入口；下一轮可把阶段脚本迁入 legacy script registry，不再让 check:world-core 作为日常入口。 |

## 6. 代码角度审查

### 6.1 主线结构

公开主线已经通过 `data/world-kernel/worldos-mainline-registry-v1.json` 注册，并由 `src/lib/product-routes.ts`、`src/lib/world-kernel-boundary.ts`、`middleware.ts` 组成路由边界。主线公开页面未发现直接导入 `@/components/r8-*`、`@/features/r8-*`、`@/components/private`、`@/features/private` 等 forbidden 前缀。

### 6.2 Legacy 风险

全 `src` 中仍有 169 处 legacy/private import 足迹，但本轮确认没有进入公开主线页面。短期可接受；中期应继续物理归档或建立 legacy registry，防止未来误用。

### 6.3 脚本治理

`package.json` 仍有 762 个脚本，其中 check 脚本 564 个，阶段型 check 脚本 439 个。当前已经有 `check:mainline`、`check:content`、`check:experience:public`、`check:release:rc` 等短入口，但历史脚本体量仍是维护风险。

## 7. 功能角度审查

公开内容已经达到 RC3 目标：52 个公开节点、52 个公开正文、82 条关系、13 条公开路径、21 条世界事件。内容密度已明显高于 RC1/RC2，足以支撑“可逛、可停留、可回访”的最小公开世界。

仍建议后续不要继续堆新 runtime，而是继续提升：

```text
节点内容质量
区域解释一致性
Atlas / Timeline / Archive 的真实沉浸感
移动端真机体验
节点推荐上限与反迷路体验
```

## 8. 权限与边界审查

页面级路由边界已经符合“后端/服务端控制权限，前端只负责显隐体现”的方向：private/internal/legacy 页面被服务端 middleware 重定向或阻断。

API 层审查结果：写入型 API 均有 `requireOwner` 或 `requirePermission` 守门，未发现未守门写入接口。但 middleware matcher 排除了 `/api`，因此 API 边界不能只依赖页面路由策略。下一轮应新增 API boundary registry/check，把每个 API 标记为：

```text
public-read
owner-only
permission-guarded
internal-reference
forbidden
```

## 9. 发布与生产状态审查

当前生产状态继续保持：

```text
productionLive: false
releaseReady: false
cleanProductionReady: false
```

这是正确的。当前仍缺真实外部 Preview URL、Production URL、线上 smoke、HTTPS、Web Vitals、可访问性快照、人工签收和真实回滚演练。任何本地 artifact verification 都不能替代真实外部生产证据。

## 10. 下一步建议

按优先级建议：

1. 新增 API boundary registry/check，补齐 `/api` 独立守门证据。
2. 建立 legacy script registry，降低 `package.json` 历史脚本认知负担。
3. 对 `src/components/r8-*`、`src/features/r8-*` 做物理归档计划，但不要在未完成导入边界门禁前大删。
4. 增加公开主线页面的移动端/可访问性静态门禁。
5. 准备真实部署时再执行 Preview/Production smoke，不在本地伪造通过。

## 11. 本轮产物

```text
data/world-kernel/worldos-1-rc4-project-review-v1.json
scripts/audit-worldos-project.mjs
docs/10-development-history/world-kernel/worldos-1-rc4-project-review.md
docs/superpowers/plans/2026-07-04-worldos-project-review.md
```
