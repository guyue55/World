# WorldOS 开发前准备审计

> [!IMPORTANT]
> 本文档记录 2026-07-09 的开发前放行检查结果。结论用于判断是否可以进入受管控执行计划的 M1 场景运行底座开发。

## 1. 结论

**可以开启专注开发，但必须从 `worldos-controlled-execution-plan-2026-07-09.md` 的 M1 开始。**

当前文档体系、质量门禁和本地检查已经足够支撑下一轮连续开发。仍需注意：音频资产、真实 AI Provider、外部 Preview / Production 都不是 M1 的前置条件，不应阻塞场景运行底座开发。

## 2. 已确认满足

| 项 | 状态 | 证据 |
| --- | --- | --- |
| 工作树 | 通过 | `git status --short` 无输出 |
| 文档注册 | 通过 | `npm run check:docs` 通过，docs=347, adr=6 |
| 开发前核心文档 | 通过 | 23 份 P0/P1/P2 文档存在且注册 |
| 主线质量 | 通过 | `npm run check:mainline` 通过 |
| Lint | 通过 | `npm run lint` 通过 |
| TypeScript | 通过 | `npm run typecheck` 通过 |
| JSON / 空白 | 通过 | `git diff --check` 通过 |
| 依赖预算 | 通过 | `check:lib-budget` 显示 99/130 |
| 场景基础 | 通过 | 9 scenes、6 transitions、5 motions |
| 内容生命 | 通过 | 200 public nodes、29 paths、398 relations |

## 3. 文档质量判断

| 维度 | 判断 |
| --- | --- |
| 目标高度 | 足够，已从“动态博客”提升为“本地 / LAN 可运行的个人数字世界运行时” |
| 阶段规划 | 足够，M0-M7 已定义 |
| 场景规格 | 足够，Home、Atlas、Node、Paths、Timeline、Archive、Lighthouse 均有规格 |
| 转场规格 | 足够，已定义来源、目标、抵达、回退和 reduced-motion |
| 氛围规格 | 足够，已定义时间、季节、AI 状态、声音状态和 sensory 降级 |
| AI 规格 | 足够进入 dry-run / server-only 试点，真实 Provider 可后置 |
| 音频规格 | 足够进入 opt-in 试点，实际音频资产需后续授权选择 |
| 性能与资产 | 足够作为开发约束 |
| 本地 / LAN 验收 | 足够作为当前阶段唯一发布口径 |

## 4. 非阻塞准备项

这些事项不阻塞 M1-M4，但在对应阶段前必须确认：

| 阶段 | 准备项 | 处理方式 |
| --- | --- | --- |
| M5 氛围 + 音频 | 授权音频素材或生成策略 | 先用无声 / opt-in 占位，素材进入资产管线后再启用 |
| M6 Lighthouse AI | Provider 选择与 Key 注入方式 | 继续保持 server-only 与 disabled / dry-run，真实 Provider 前再走安全配置 |
| M7 本地 / LAN RC | 最新 LAN IP 与设备环境 | 执行时动态检测，不写死 |
| 后续外部上线 | Preview / Production 策略 | 当前明确不做，不进入开发范围 |

## 5. 开发启动条件

进入 M1 前需要做到：

1. 从 `worldos-controlled-execution-plan-2026-07-09.md` 开始。
2. 先读 `worldos-scene-production-matrix-2026-07-09.md`。
3. 实现只覆盖 M1：场景壳、状态机、转场入口、观测点。
4. 不引入新运行时依赖，除非性能资产预算批准。
5. 每完成一项都用执行计划标记，并跑对应检查。

## 6. 放行判断

| 结论 | 说明 |
| --- | --- |
| 放行 M1 | 可以开始场景运行底座开发 |
| 谨慎放行 M2-M4 | 需按阶段依次完成，不能跳过 M1 |
| 暂不放行 M5-M6 的真实资产 / Provider | 需要音频素材与 AI Provider 安全配置 |
| 不放行外部 Preview / Production | 当前目标仍是 localhost / LAN |

