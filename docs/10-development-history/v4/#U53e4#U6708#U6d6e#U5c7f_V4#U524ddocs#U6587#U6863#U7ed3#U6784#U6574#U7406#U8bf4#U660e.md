# 古月浮屿｜V4 前 docs 文档结构整理说明

## 整理前问题

```text
顶层文档目录分散：
docs-v3/
docs-v3-concept/
docs-pre-v4/
docs-architecture/

问题：
文档入口不统一
版本文档、概念文档、架构文档、门禁文档混在顶层
未来进入 V4 后会继续膨胀
```

## 本轮整理结果

```text
已迁移文档数：31
docs/ 当前文件数：38
旧 docs-* 目录：保留 README 兼容说明
旧 docs-* 功能引用残留：0
```

## 新 docs 结构

```text
docs/
  00-index/              总目录、导航、文档规则
  10-architecture/       工程结构、src/data/docs 组织规范
  20-product/            产品、体验、信息架构、页面矩阵
  30-v3/                 V3 主阶段文档
  31-v3-concept/         V3 概念深化与任务拆解
  40-pre-v4/             V4 前补证、门禁、入口判定
  50-engineering/        工程检查、工具链、质量与发布证据
  60-operations/         运维、运营、长期治理
  90-archive/            历史阶段归档
```

## 已迁移

```text
docs-architecture/  -> docs/10-architecture/
docs-v3/            -> docs/30-v3/main-stages/
docs-v3-concept/    -> docs/31-v3-concept/
docs-pre-v4/        -> docs/40-pre-v4/
```

## 已保留兼容

```text
docs-architecture/README.md
docs-v3/README.md
docs-v3-concept/README.md
docs-pre-v4/README.md
```

这些旧目录只作为迁移提示，不再承载新文档。

## 新增命令

```bash
npm run check:pre-v4:docs-structure
```

## 检查结果

```text
JSON parse check passed.
Static docs structure logic check passed.
Old docs-* functional reference scan passed.
Markdown local link scan passed.
Basic format check passed.
Real command npm run check:pre-v4:docs-structure: blocked-or-failed
```

## 后续规则

```text
不要再新增分散的顶层文档目录。
新文档统一进入 docs/。
架构相关进入 docs/10-architecture。
V3 主阶段进入 docs/30-v3。
V3 概念深化进入 docs/31-v3-concept。
V4 前门禁进入 docs/40-pre-v4。
工程证据进入 docs/50-engineering。
运维运营进入 docs/60-operations。
历史文档进入 docs/90-archive。
```

## 本轮未打包

```text
没有要求无需打包。
```

## 变更文件数

```text
47
```
