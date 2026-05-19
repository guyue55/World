# 古月浮屿｜V1 CI 与预览发布准备

> 阶段：V1
> 性质：持续验证与真实环境预演
> 目标：让每次变更都能重新证明地基有效。

## 1. 关键文件

```text
.github/workflows/ci.yml
data/ci-readiness-contract.json
data/release-preview-checklist.json
```

## 2. CI 覆盖

```text
npm install / npm ci
npm run lint
npm run typecheck
npm run check:world-core
npm run build
```

## 3. 预览发布必查

```text
/
 /atlas
 /archive
 /node/[slug]
 /paths
 /ask
 /status
 /skeleton
 /world-index.json
 /world-manifest.json
RSS / sitemap / OG preview
```

## 4. 阻断问题

```text
私密内容进入公开构建
核心路由 404
首页移动端不可读
桌面宽屏布局过窄
/ask 依赖 AI 才能首屏可读
构建依赖未登记 secret
```
