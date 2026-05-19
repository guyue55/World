# 古月浮屿｜V1 预览部署冒烟与性能实测手册

> 阶段：V1
> 性质：真实预览部署与性能收口
> 目标：在真实环境验证核心路由、公开端点、隐私边界和性能指标。

## 1. 文件

```text
data/preview-smoke-checks.json
data/preview-deployment-record.json
data/performance-runbook.json
scripts/run-preview-smoke.mjs
```

## 2. 冒烟检查

```bash
GUYUE_PREVIEW_URL=https://your-preview-url.example npm run preview:smoke
```

会生成：

```text
reports/preview-smoke-report.json
```

## 3. 检查内容

```text
核心路由 2xx
/world-index.json
/world-manifest.json
RSS / sitemap
公开端点隐私 token 检查
```

## 4. 性能实测

```text
首页移动端
首页桌面端
归档页
节点详情
路径页
状态页
骨架页
```

## 5. 核心判断

```text
预览环境要先证明世界入口、安全边界和公开端点可用。
```
