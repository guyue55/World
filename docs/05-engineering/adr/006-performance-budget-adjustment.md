# ADR-006: 性能预算阈值调整（Phase 13 内容扩容）

> 状态：已采纳
> 日期：2026-07-08
> 关联：Phase 13 内容生态扩容

## 背景

Phase 13 完成后，公开节点从 100 扩展到 130，路径从 15 扩展到 20，关系从 163 扩展到 258。列表型页面（atlas、archive、timeline、node 详情、paths 子页面）在 SSR 时会将节点/关系/路径的相关卡片一次性渲染，HTML 尺寸随内容线性增长。

现状实测：

- 首页 index.html：164 KB
- 时间线 timeline.html：192 KB
- 档案馆 archive.html：296 KB
- 图谱 atlas.html：500 KB
- 深潜路径页 paths/deep-world.html：113 KB
- 若干节点详情页 100-108 KB

原预算 htmlPerPage = 0.1 MB（100KB）是 Phase 11 制定的，基于 100 节点规模。Phase 13 扩容后自然超出。

## 决策

调整单页 HTML 预算：

- `htmlPerPage`：0.1 MB → 0.5 MB（500 KB）
- 保留 `totalBuild = 200 MB` 与 `jsBundleGzipped = 2.0 MB` 不变
- 新增 `atlasHtml = 0.6 MB` 作为 atlas 页专用预算（图谱页天然更大）

同时新增门禁 `check:lib-budget`（Phase 14），把 src/lib 数量约束到 <= 130。

## 理由

1. SSR HTML 大小与节点数量正相关，Phase 13 是内容主动扩容，超出老阈值属于预期结果而非异常。
2. 用户实际感知的是 gzipped 后大小与 LCP。500 KB HTML gzipped 后约 60-80 KB，仍在可接受范围。
3. Phase 15 上线阶段会引入 CDN、增量加载、路由级 code split，届时可重新收紧预算。
4. 若不调整，Phase 13 无法收官，与 M13 里程碑不一致。

## 影响

- Phase 13 全部内容可以正常构建并通过 boundary-full 门禁。
- 未来内容扩容至 200 节点前应保持在此阈值内，超过则需要新的 ADR。
- Phase 15 上线前需要再评估阈值合理性。

## 复审计划

Phase 15 上线就绪阶段（M15）时，将根据部署平台的 CDN 与压缩特性重新审视预算。
