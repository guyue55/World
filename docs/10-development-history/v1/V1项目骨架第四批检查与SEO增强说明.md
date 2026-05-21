# CHANGELOG

## 2026-05-19｜V1 项目骨架第四批：SEO/RSS/JSON-LD 与检查脚本

本次为增量变更，仅包含本次新增或修改的文件。

主要内容：

- 新增 RSS 生成工具与 `/rss.xml` 路由
- 新增 JSON-LD 结构化数据组件
- 新增站点级 JSON-LD 与节点文章 JSON-LD
- 新增项目完整性检查脚本
- 新增基础格式检查脚本
- `package.json` 增加 `check`、`check:integrity`、`check:format`
- 修复 `data/*.json` 末尾换行
- 修复 `README.md` 尾随空格 / 末尾换行
- 新增第四批检查报告

检查结果：

```text
TS/TSX parse check passed for 59 files.
JSON/reference/contentPath/basic format checks passed.
```

说明：当前环境未安装项目依赖，因此未运行完整 Next.js lint / build；本地执行 `npm install` 后再运行 `npm run check && npm run lint && npm run build`。

## 变更文件清单

- `CHANGELOG.md`
- `README.md`
- `data/areas.json`
- `data/nodes.json`
- `data/paths.json`
- `data/permissions.json`
- `data/relations.json`
- `data/rules.json`
- `data/world-events.json`
- `data/world-state.json`
- `docs/00-overview/v1-project-skeleton-fourth-check-report.md`
- `docs/00-overview/v1-project-skeleton-fourth-implementation-note.md`
- `package.json`
- `scripts/check-basic-format.ts`
- `scripts/check-project-integrity.ts`
- `src/app/layout.tsx`
- `src/app/node/[slug]/page.tsx`
- `src/app/rss.xml/route.ts`
- `src/components/common/JsonLd.tsx`
- `src/lib/jsonld.ts`
- `src/lib/rss.ts`
