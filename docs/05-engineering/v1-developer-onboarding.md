# 古月浮屿｜V1 开发者入门与交接指南

> 阶段：V1
> 性质：后来者开发准入说明
> 目标：让后来者先理解世界骨架，再修改世界表面。

## 1. 入门文件

```text
data/developer-onboarding.json
```

## 2. 推荐步骤

```bash
npm install
npm run docs:print
npm run kernel:report
npm run foundation:print
npm run audit:print
npm run check:world-core
npm run dev
```

## 3. 必读文档

```text
docs/00-overview/v1-world-kernel-doc-index.md
docs/05-engineering/v1-world-kernel.md
docs/05-engineering/v1-foundation-gate.md
docs/05-engineering/v1-change-admission-policy.md
docs/05-engineering/v1-world-kernel-runbook.md
docs/09-adr/ADR-0001-static-first-protocol-first.md
docs/09-adr/ADR-0003-ai-as-lighthouse.md
docs/09-adr/ADR-0004-public-private-build-separation.md
```

## 4. 第一项修改建议

```text
从 copy / content / projection 低风险层开始，
不要第一步修改 schema、visibility 或 kernel。
```
