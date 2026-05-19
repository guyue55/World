# 古月浮屿｜V1 第十四批文档内核打磨说明

> 本文件说明第十四批变更：把文档、ADR、术语、运行手册纳入世界骨架。

## 本次重点

第十四批解决：

```text
相关文档完善
文档注册表
ADR 决策记录
术语一致性
内核运行手册
骨架阶段验收清单
文档完整性检查
```

## 新增数据

```text
data/documentation-registry.json
data/adr-index.json
data/glossary.json
```

## 新增代码

```text
src/lib/documentation-registry.ts
```

## 新增脚本

```text
scripts/check-documentation-registry.ts
scripts/print-world-docs.ts
```

## 新增命令

```bash
npm run check:docs
npm run docs:print
```

## 新增 ADR

```text
docs/09-adr/ADR-0001-static-first-protocol-first.md
docs/09-adr/ADR-0002-no-3d-core-in-v1.md
docs/09-adr/ADR-0003-ai-as-lighthouse.md
docs/09-adr/ADR-0004-public-private-build-separation.md
docs/09-adr/ADR-0005-markdown-json-world-protocol.md
docs/09-adr/ADR-0006-extension-registry.md
```

## 核心判断

```text
文档不是附属物，
文档是世界骨架的一部分。
```
