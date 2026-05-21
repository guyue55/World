# word-life

`word-life` 是古月浮屿 / 我的博客的长期 GitHub 项目仓库。

它不是一次性封版包，而是后续所有代码、文档、版本记录、世界规则、产品设计、工程设计与体验兑现工作的统一根目录。

## 项目定位

```text
对外是宇宙
对内是工作台
对未来是档案
对 AI 是可读协议
AI 是灯塔，不是太阳
公开世界 ≠ 全部世界
```

## 快速开始

```bash
npm ci
npm run dev
```

## 本地门禁

```bash
npm run check:repo
npm run check:experience
npm run lint
npm run typecheck
npm run build
```

或一次性执行：

```bash
npm run check:local
```

## 目录

```text
src/       Next.js 应用源码
data/      世界数据、契约、阶段状态
scripts/   检查、报告、门禁脚本
public/    静态资源
docs/      长期文档中心
.github/   GitHub Actions
```

## 文档治理

文档统一放在 `docs/`，按阶段与属性拆分：

```text
docs/00-inception/               最初沟通、原始需求、原始素材
docs/01-world-design/            世界观、规则、AI 边界、术语
docs/02-product-design/          PRD、IA、交互、视觉、内容系统
docs/03-engineering-architecture/ 技术架构、系统设计、接口、安全、QA
docs/10-development-history/     V1-V6 与体验兑现开发过程
docs/20-research/                调研资料
docs/30-assets/                  视觉素材
docs/90-archive/                 历史报告和归档
```

## 当前状态

```text
V6 local-engineering-ready
体验兑现第一轮完成
word-life 长期仓库化完成
productionLive: false
```

生产上线仍需要真实部署、目标浏览器/真机 smoke、人工安全隐私签收。


## Round 02

Round 02 is the deep experience realization phase.

```bash
npm run check:round2
npm run check:local
```

Round 02 begins with batch 00: baseline freeze, planning contract, directory boundaries, and check skeleton.


## Round 03

Round 03 completes real content ingestion and production-readiness preparation.

```bash
npm run check:round3
```

Round 03 adds:

```text
/content-studio
/asset-library
/service-adapters
/production-readiness
/observability
```
