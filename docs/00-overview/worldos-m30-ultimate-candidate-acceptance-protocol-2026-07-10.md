# WorldOS M30 终局候选验收协议

> [!CAUTION]
> 本协议及其生成的 `8.9 / 9/10` 结论已经被真实视觉审查否决，仅保留为历史反例。当前冻结验收标准为 `worldos-reality-first-experience-acceptance-2026-07-10.md`，不得再引用 M30 报告证明世界体验完成。

> [!IMPORTANT]
> M30 用于判断 WorldOS 是否达到 9/10 终局候选。它不能把“看起来不错”当作通过。

## 1. 验收范围

- Home
- Atlas
- Timeline
- Archive
- Paths
- Node
- Lighthouse
- Status / Maintenance
- Authoring
- Permission
- Audio / Atmosphere
- AI

## 2. 必须证据

| 证据 | 内容 |
| --- | --- |
| 截图 | desktop / mobile / reduced-motion |
| 录屏 | 首访、场景迁移、路径、节点、灯塔 |
| 自动检查 | typecheck、lint、build、mainline、local RC |
| 人工量表 | 八支柱逐项打分 |
| AI 评估 | grounded、拒答、推荐、fallback |
| 权限扫描 | public/private/owner 边界 |
| 资产审计 | 授权、体积、缺失 |
| 作者演练 | 新增内容、预览、回滚 |

## 3. 通过标准

| 等级 | 条件 |
| --- | --- |
| 7.5/10 | 本地成熟 MVP+ |
| 8/10 | 场景可探索、迁移连续、核心内容生命化 |
| 8.5/10 | AI、音频、作者流程、回访形成循环 |
| 9/10 | 八支柱均通过，无 P0/P1 阻塞 |

## 4. 否决项

- 场景仍同构。
- 切换仍像普通跳页。
- 内容仍像文章列表。
- AI 无依据或越权。
- 默认播放音频。
- 私密内容泄漏。
- 高级依赖无 ADR。
- 没有录屏和人工审查。

## 5. 最终报告格式

最终报告必须包含：

1. 当前评分。
2. 通过证据。
3. 未达 10/10 的缺口。
4. P0/P1/P2 缺陷清单。
5. 下一轮路线。
